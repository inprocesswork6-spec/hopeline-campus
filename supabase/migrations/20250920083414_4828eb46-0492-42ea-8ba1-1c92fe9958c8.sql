-- Fix RLS policies for all tables

-- Profiles policies  
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view all user roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Users can manage own roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Counselors policies (public readable)
CREATE POLICY "Anyone can view counselors" ON public.counselors FOR SELECT USING (true);
CREATE POLICY "Only admins can manage counselors" ON public.counselors FOR ALL USING (
  public.has_role(auth.uid(), 'admin')
);

-- Resources policies (public readable)
CREATE POLICY "Anyone can view resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Only admins can manage resources" ON public.resources FOR ALL USING (
  public.has_role(auth.uid(), 'admin')
);

-- Forum threads policies
CREATE POLICY "Anyone can view forum threads" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create threads" ON public.forum_threads FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_id);
CREATE POLICY "Authors can update own threads" ON public.forum_threads FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own threads" ON public.forum_threads FOR DELETE USING (auth.uid() = author_id);

-- Forum posts policies
CREATE POLICY "Anyone can view forum posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own posts" ON public.forum_posts FOR DELETE USING (auth.uid() = author_id);

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON public.appointments FOR SELECT USING (
  auth.uid() = student_id OR auth.uid() = counselor_id OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Students can create appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Counselors and admins can update appointments" ON public.appointments FOR UPDATE USING (
  auth.uid() = counselor_id OR public.has_role(auth.uid(), 'admin')
);

-- Screening results policies  
CREATE POLICY "Users can view own screening results" ON public.screening_results FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can create own screening results" ON public.screening_results FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Counselors and admins can view all screening results" ON public.screening_results FOR SELECT USING (
  public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin')
);

-- Insert sample counselor data
INSERT INTO public.counselors (full_name, specialization, bio, is_active) VALUES
('Dr. Sarah Johnson', 'Anxiety & Depression', 'Dr. Johnson has over 10 years of experience helping students overcome anxiety and depression. She specializes in cognitive behavioral therapy and mindfulness techniques.', true),
('Dr. Michael Chen', 'Stress Management', 'A licensed therapist with expertise in stress management and academic pressure. Dr. Chen uses evidence-based approaches to help students develop healthy coping strategies.', true),
('Dr. Emily Rodriguez', 'Trauma & PTSD', 'Dr. Rodriguez is a trauma specialist who provides compassionate care for students dealing with PTSD and other trauma-related conditions using EMDR and somatic therapy.', true),
('Dr. James Wilson', 'Relationship Issues', 'Specializing in interpersonal relationships, Dr. Wilson helps students navigate social anxiety, relationship conflicts, and communication challenges.', true),
('Dr. Lisa Thompson', 'Eating Disorders', 'A certified eating disorder specialist with 15 years of experience. Dr. Thompson provides comprehensive treatment for students struggling with body image and eating concerns.', true),
('Dr. David Kim', 'ADHD & Learning Disabilities', 'Dr. Kim specializes in neurodevelopmental conditions and helps students with ADHD, learning disabilities, and executive functioning challenges develop effective strategies.', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample resources
INSERT INTO public.resources (title, type, description, content_url, tags) VALUES
('Managing Exam Stress', 'article', 'Evidence-based techniques for managing stress during exam periods', 'https://example.com/exam-stress', ARRAY['stress', 'academic', 'coping']),
('Mindfulness Meditation Guide', 'video', 'A 10-minute guided meditation for beginners', 'https://example.com/mindfulness', ARRAY['mindfulness', 'meditation', 'relaxation']),
('Sleep Hygiene Tips', 'infographic', 'Essential tips for better sleep quality and mental health', 'https://example.com/sleep-tips', ARRAY['sleep', 'wellness', 'health']),
('Crisis Hotline Numbers', 'resource', 'Emergency contacts and crisis support resources', 'https://example.com/crisis-help', ARRAY['crisis', 'emergency', 'support']),
('Building Self-Esteem Workbook', 'pdf', 'Interactive exercises to boost confidence and self-worth', 'https://example.com/self-esteem', ARRAY['confidence', 'self-help', 'exercises'])
ON CONFLICT (id) DO NOTHING;