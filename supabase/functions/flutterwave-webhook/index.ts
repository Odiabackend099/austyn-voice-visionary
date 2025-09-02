import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, verif-hash",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const FLW_WEBHOOK_HASH = Deno.env.get("FLUTTERWAVE_WEBHOOK_HASH");

if (!SUPABASE_URL) console.warn("SUPABASE_URL is not set");
if (!SERVICE_ROLE_KEY) console.warn("SUPABASE_SERVICE_ROLE_KEY is not set");
if (!FLW_WEBHOOK_HASH) console.warn("FLUTTERWAVE_WEBHOOK_HASH is not set");

const supabase = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("verif-hash");
    if (!signature || signature !== FLW_WEBHOOK_HASH) {
      console.warn("Invalid webhook signature");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = await req.json();
    // Flutterwave typically sends event and data objects
    const event = payload?.event ?? payload?.status ?? "unknown";
    const data = payload?.data ?? payload;

    const txRef: string | undefined = data?.tx_ref;
    const status: string | undefined = data?.status;
    const amount: number | undefined = data?.amount;
    const customerEmail: string | undefined = data?.customer?.email ?? data?.customer?.email_address;

    console.log("Webhook received", { event, status, txRef, amount });

    if (!txRef) {
      return new Response(JSON.stringify({ error: "Missing tx_ref" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isSuccessful = (status?.toLowerCase?.() === "successful") || (event === "charge.completed" && data?.status === "successful");

    // Update payment_confirmations row
    const { error: upsertErr } = await supabase
      .from("payment_confirmations")
      .update({
        payment_status: isSuccessful ? "successful" : (status ?? "failed"),
        verified_at: new Date().toISOString(),
      })
      .eq("flutterwave_tx_ref", txRef);

    if (upsertErr) {
      console.error("Error updating payment_confirmations:", upsertErr);
    }

    // Optionally: handle user upgrades here. Left as a no-op until plan mapping is confirmed.
    // Example mapping (commented out):
    // if (isSuccessful) {
    //   const planSlug = (await supabase.from('payment_confirmations').select('plan_upgrade, user_id').eq('flutterwave_tx_ref', txRef).single()).data?.plan_upgrade;
    //   // Map planSlug to desired user updates
    //   await supabase.from('users').update({ api_tier: 'pro' }).eq('id', userId);
    // }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("flutterwave-webhook error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
