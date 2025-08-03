-- Create waitlist table for AI School signups
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled'))
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for public email signup (no auth required)
CREATE POLICY "Anyone can sign up for waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view waitlist (for future admin features)
CREATE POLICY "Authenticated users can view waitlist" 
ON public.waitlist 
FOR SELECT 
USING (auth.role() = 'authenticated');