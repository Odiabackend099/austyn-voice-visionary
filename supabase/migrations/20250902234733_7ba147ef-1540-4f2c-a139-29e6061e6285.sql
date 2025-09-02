-- Fix the function search path warning by updating the has_role function with CASCADE
DROP FUNCTION IF EXISTS public.has_role(_user_id UUID, _role app_role) CASCADE;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Recreate the dropped policies
-- RLS policies for leads table
CREATE POLICY "Admins can view all leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for cases table
CREATE POLICY "Admins can view all cases" 
ON public.cases 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert cases" 
ON public.cases 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cases" 
ON public.cases 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cases" 
ON public.cases 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for user_roles table
CREATE POLICY "Admins can manage user roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Courses - admin write
CREATE POLICY "Admins can manage courses" 
ON public.courses 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Lessons - admin write
CREATE POLICY "Admins can manage lessons" 
ON public.lessons 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Waitlist - admins can manage
CREATE POLICY "Admins can view waitlist" 
ON public.waitlist 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage waitlist" 
ON public.waitlist 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials - admin write
CREATE POLICY "Admins can manage testimonials" 
ON public.testimonials 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));