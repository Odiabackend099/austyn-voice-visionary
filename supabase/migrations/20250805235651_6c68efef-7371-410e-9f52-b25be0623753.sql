-- Fix security issues
-- Set OTP expiry to recommended duration (10 minutes = 600 seconds)
ALTER DATABASE postgres SET app.jwt_exp TO '600';

-- Note: Leaked password protection needs to be enabled in Supabase dashboard
-- This cannot be done via SQL migration