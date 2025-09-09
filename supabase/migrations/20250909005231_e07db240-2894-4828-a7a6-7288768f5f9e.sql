-- Drop existing SELECT policy and recreate with explicit restrictive access
DROP POLICY IF EXISTS "Admins can view waitlist" ON public.waitlist;

-- Create a more restrictive SELECT policy that explicitly denies public access
CREATE POLICY "Only admins can view waitlist" 
ON public.waitlist 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
);