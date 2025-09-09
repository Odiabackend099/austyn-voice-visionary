-- Create payment_confirmations table with proper RLS
CREATE TABLE IF NOT EXISTS public.payment_confirmations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_ref TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    amount NUMERIC,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_confirmations ENABLE ROW LEVEL SECURITY;

-- Only admins can view payment confirmations
CREATE POLICY "Only admins can view payment confirmations"
ON public.payment_confirmations
FOR SELECT
USING (
    auth.uid() IS NOT NULL 
    AND has_role(auth.uid(), 'admin'::app_role)
);

-- Only admins can manage payment confirmations
CREATE POLICY "Only admins can manage payment confirmations"
ON public.payment_confirmations
FOR ALL
USING (
    auth.uid() IS NOT NULL 
    AND has_role(auth.uid(), 'admin'::app_role)
);

-- Add trigger for updated_at
CREATE TRIGGER update_payment_confirmations_updated_at
    BEFORE UPDATE ON public.payment_confirmations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();