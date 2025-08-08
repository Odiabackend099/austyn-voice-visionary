import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FLW_SECRET = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!FLW_SECRET) console.warn("FLUTTERWAVE_SECRET_KEY is not set");
if (!SUPABASE_URL) console.warn("SUPABASE_URL is not set");
if (!SERVICE_ROLE_KEY) console.warn("SUPABASE_SERVICE_ROLE_KEY is not set");

const supabase = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!);

type PlanSlug = "odia15" | "odia40" | "odia75";

const PLAN_MAP: Record<PlanSlug, { amount: number; title: string; description: string }> = {
  odia15: { amount: 15000, title: "Odia Plan - ₦15,000", description: "Standard payment via Odia" },
  odia40: { amount: 40000, title: "Odia Plan - ₦40,000", description: "Standard payment via Odia" },
  odia75: { amount: 75000, title: "Odia Plan - ₦75,000", description: "Standard payment via Odia" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { planSlug, userId, userEmail, userName, redirectUrl }: {
      planSlug: PlanSlug;
      userId: string;
      userEmail: string;
      userName?: string;
      redirectUrl: string;
    } = body;

    if (!planSlug || !PLAN_MAP[planSlug]) {
      return new Response(JSON.stringify({ error: "Invalid or missing planSlug" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!userId || !userEmail) {
      return new Response(JSON.stringify({ error: "Missing userId or userEmail" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!redirectUrl) {
      return new Response(JSON.stringify({ error: "Missing redirectUrl" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { amount, title, description } = PLAN_MAP[planSlug];
    const txRef = `odia_${planSlug}_${userId}_${Date.now()}`;

    // Pre-create a pending payment confirmation for traceability
    await supabase.from("payment_confirmations").insert({
      user_id: userId,
      user_email: userEmail,
      amount_naira: amount,
      plan_upgrade: planSlug,
      payment_status: "pending",
      flutterwave_tx_ref: txRef,
    });

    const flwRes = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount,
        currency: "NGN",
        redirect_url: redirectUrl,
        payment_options: "card,banktransfer,ussd",
        meta: { user_id: userId, plan_slug: planSlug },
        customer: { email: userEmail, name: userName ?? "Odia User" },
        customizations: {
          title,
          description,
        },
      }),
    });

    const flwData = await flwRes.json();
    if (!flwRes.ok) {
      console.error("Flutterwave error:", flwData);
      return new Response(JSON.stringify({ error: "Failed to create payment", details: flwData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const link = flwData?.data?.link;
    if (!link) {
      return new Response(JSON.stringify({ error: "No payment link returned from Flutterwave" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ link, tx_ref: txRef, amount }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("initiate-flw-payment error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
