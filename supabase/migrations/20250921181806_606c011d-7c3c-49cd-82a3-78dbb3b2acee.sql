-- Create app role enum for user types
CREATE TYPE public.app_role AS ENUM ('user', 'counselor', 'admin');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_counselor(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'counselor'::app_role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role);
$$;

-- Create trigger function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'display_name',
    COALESCE(new.raw_user_meta_data ->> 'role', 'user')
  );
  
  -- Create default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    new.id, 
    COALESCE((new.raw_user_meta_data ->> 'role')::app_role, 'user'::app_role)
  );
  
  RETURN new;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS POLICIES

-- Profiles: Users can only access their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Profiles are created automatically" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- User Roles: Users can view their own roles, admins can manage all roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Only admins can manage roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- Screening Results: Students see their own, counselors see assigned students
CREATE POLICY "Students can view their own screening results" 
ON public.screening_results FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Counselors can view screening results" 
ON public.screening_results FOR SELECT 
USING (public.is_counselor() OR public.is_admin());

CREATE POLICY "Students can create their own screening results" 
ON public.screening_results FOR INSERT 
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Only counselors and admins can update screening results" 
ON public.screening_results FOR UPDATE 
USING (public.is_counselor() OR public.is_admin());

-- Appointments: Students see their appointments, counselors see assigned ones
CREATE POLICY "Students can view their own appointments" 
ON public.appointments FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Counselors can view their assigned appointments" 
ON public.appointments FOR SELECT 
USING (
  public.is_counselor() AND EXISTS (
    SELECT 1 FROM public.counselors c 
    WHERE c.id = appointments.counselor_id AND c.id = auth.uid()
  )
  OR public.is_admin()
);

CREATE POLICY "Students can create their own appointments" 
ON public.appointments FOR INSERT 
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Counselors and admins can update appointments" 
ON public.appointments FOR UPDATE 
USING (
  public.is_counselor() AND EXISTS (
    SELECT 1 FROM public.counselors c 
    WHERE c.id = appointments.counselor_id AND c.id = auth.uid()
  )
  OR public.is_admin()
);

-- Forum Threads: Authenticated users can read all, edit their own
CREATE POLICY "Authenticated users can view all forum threads" 
ON public.forum_threads FOR SELECT 
TO authenticated USING (true);

CREATE POLICY "Users can create forum threads" 
ON public.forum_threads FOR INSERT 
TO authenticated WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own forum threads" 
ON public.forum_threads FOR UPDATE 
USING (auth.uid() = author_id OR public.is_admin());

CREATE POLICY "Users can delete their own forum threads" 
ON public.forum_threads FOR DELETE 
USING (auth.uid() = author_id OR public.is_admin());

-- Forum Posts: Authenticated users can read all, edit their own
CREATE POLICY "Authenticated users can view all forum posts" 
ON public.forum_posts FOR SELECT 
TO authenticated USING (true);

CREATE POLICY "Users can create forum posts" 
ON public.forum_posts FOR INSERT 
TO authenticated WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own forum posts" 
ON public.forum_posts FOR UPDATE 
USING (auth.uid() = author_id OR public.is_admin());

CREATE POLICY "Users can delete their own forum posts" 
ON public.forum_posts FOR DELETE 
USING (auth.uid() = author_id OR public.is_admin());

-- Counselors: Public read access for booking appointments
CREATE POLICY "Anyone can view active counselors" 
ON public.counselors FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage counselors" 
ON public.counselors FOR ALL 
USING (public.is_admin());

-- Resources: Public read access
CREATE POLICY "Anyone can view resources" 
ON public.resources FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage resources" 
ON public.resources FOR ALL 
USING (public.is_admin());