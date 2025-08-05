-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_url TEXT,
  trailer_url_opus_16kbps TEXT,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT,
  duration INTEGER,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create purchases table
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  paid BOOLEAN DEFAULT false,
  amount NUMERIC,
  payment_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
CREATE POLICY "Courses are viewable by authenticated users" 
ON public.courses FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Courses can be managed by service role" 
ON public.courses FOR ALL 
USING (auth.role() = 'service_role');

-- RLS Policies for lessons
CREATE POLICY "Lessons are viewable by authenticated users" 
ON public.lessons FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Lessons can be managed by service role" 
ON public.lessons FOR ALL 
USING (auth.role() = 'service_role');

-- RLS Policies for purchases
CREATE POLICY "Users can view their own purchases" 
ON public.purchases FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases" 
ON public.purchases FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Purchases can be updated by service role" 
ON public.purchases FOR UPDATE 
USING (auth.role() = 'service_role');

-- RLS Policies for testimonials
CREATE POLICY "Testimonials are viewable by authenticated users" 
ON public.testimonials FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Testimonials can be managed by service role" 
ON public.testimonials FOR ALL 
USING (auth.role() = 'service_role');

-- Create indexes for performance
CREATE INDEX idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_course_id ON public.purchases(course_id);
CREATE INDEX idx_testimonials_course_id ON public.testimonials(course_id);
CREATE INDEX idx_courses_slug ON public.courses(slug);

-- Create trigger for updating timestamps
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.courses (title, slug, description, cover_url, price) VALUES
('Founder Mindset Mastery', 'founder-mindset', 'Transform your thinking from employee to entrepreneur. Learn the mental frameworks that separate successful founders from the rest.', '/courses/founder-mindset.jpg', 15000),
('Sales Psychology for Startups', 'sales-psychology', 'Master the art of selling without being salesy. Understand customer psychology and close deals consistently.', '/courses/sales-psychology.jpg', 25000),
('Building Systems That Scale', 'systems-scale', 'Create processes and systems that work without you. Build a business that runs itself.', '/courses/systems-scale.jpg', 35000),
('Fundraising for African Startups', 'fundraising-africa', 'Navigate the unique challenges of raising capital in Africa. Connect with the right investors.', '/courses/fundraising.jpg', 45000);

INSERT INTO public.lessons (course_id, title, video_url, duration, order_index) VALUES
((SELECT id FROM public.courses WHERE slug = 'founder-mindset'), 'The Employee vs Entrepreneur Mind', '/videos/lesson-1.mp4', 1200, 1),
((SELECT id FROM public.courses WHERE slug = 'founder-mindset'), 'Embracing Uncertainty', '/videos/lesson-2.mp4', 1500, 2),
((SELECT id FROM public.courses WHERE slug = 'founder-mindset'), 'Building Mental Resilience', '/videos/lesson-3.mp4', 1800, 3);

INSERT INTO public.testimonials (course_id, user_name, content, rating) VALUES
((SELECT id FROM public.courses WHERE slug = 'founder-mindset'), 'Kemi Adebayo', 'This course completely changed how I approach my business. Austyn''s insights are gold!', 5),
((SELECT id FROM public.courses WHERE slug = 'sales-psychology'), 'Tunde Okafor', 'My sales increased by 300% after implementing these strategies. Highly recommended!', 5);