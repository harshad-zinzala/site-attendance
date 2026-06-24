-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_color TEXT NOT NULL,
    head_name TEXT NOT NULL,
    head_role TEXT NOT NULL,
    head_avatar TEXT NOT NULL,
    present INTEGER DEFAULT 0,
    half_day INTEGER DEFAULT 0,
    leave INTEGER DEFAULT 0
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    date TEXT NOT NULL,
    marked INTEGER NOT NULL,
    present INTEGER NOT NULL,
    half_day INTEGER NOT NULL,
    leave INTEGER NOT NULL,
    status TEXT NOT NULL,
    details JSONB DEFAULT '[]'::jsonb
);

-- Seed departments
INSERT INTO departments (id, name, icon_color, head_name, head_role, head_avatar, present, half_day, leave) VALUES
('mason', 'Mason', 'bg-orange-100 text-orange-700', 'Ramesh Kumar', 'Dept. Head', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', 0, 0, 0),
('electrical', 'Electrical', 'bg-amber-100 text-amber-700', 'Suresh Patel', 'Dept. Head', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', 0, 0, 0),
('plumbing', 'Plumbing', 'bg-blue-100 text-blue-700', 'Amit Singh', 'Dept. Head', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', 0, 0, 0),
('fabrication', 'Fabrication', 'bg-teal-100 text-teal-700', 'Vikram Rao', 'Dept. Head', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80', 0, 0, 0),
('waterproofing', 'Waterproofing', 'bg-emerald-100 text-emerald-700', 'Karan Johar', 'Dept. Head', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', 0, 0, 0),
('carpentry', 'Carpentry', 'bg-yellow-100 text-yellow-850', 'Rajesh Sharma', 'Dept. Head', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80', 0, 0, 0),
('painting', 'Painting', 'bg-rose-100 text-rose-700', 'Anil Mehta', 'Dept. Head', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', 0, 0, 0)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    icon_color = EXCLUDED.icon_color,
    head_name = EXCLUDED.head_name,
    head_role = EXCLUDED.head_role,
    head_avatar = EXCLUDED.head_avatar,
    present = EXCLUDED.present,
    half_day = EXCLUDED.half_day,
    leave = EXCLUDED.leave;

-- Seed reports
INSERT INTO reports (date, marked, present, half_day, leave, status, details) VALUES
('08 Jun 2025', 36, 32, 4, 0, 'Submitted', '[{"id": "mason", "present": 5, "halfDay": 1, "leave": 0}, {"id": "electrical", "present": 5, "halfDay": 1, "leave": 0}, {"id": "plumbing", "present": 5, "halfDay": 0, "leave": 0}, {"id": "fabrication", "present": 5, "halfDay": 1, "leave": 0}, {"id": "waterproofing", "present": 4, "halfDay": 1, "leave": 0}, {"id": "carpentry", "present": 4, "halfDay": 0, "leave": 0}, {"id": "painting", "present": 4, "halfDay": 0, "leave": 0}]'::jsonb),
('07 Jun 2025', 34, 30, 2, 2, 'Submitted', '[{"id": "mason", "present": 4, "halfDay": 1, "leave": 0}, {"id": "electrical", "present": 4, "halfDay": 0, "leave": 1}, {"id": "plumbing", "present": 5, "halfDay": 0, "leave": 0}, {"id": "fabrication", "present": 4, "halfDay": 1, "leave": 0}, {"id": "waterproofing", "present": 5, "halfDay": 0, "leave": 0}, {"id": "carpentry", "present": 4, "halfDay": 0, "leave": 1}, {"id": "painting", "present": 4, "halfDay": 0, "leave": 0}]'::jsonb),
('06 Jun 2025', 37, 34, 3, 0, 'Submitted', '[{"id": "mason", "present": 5, "halfDay": 1, "leave": 0}, {"id": "electrical", "present": 5, "halfDay": 0, "leave": 0}, {"id": "plumbing", "present": 5, "halfDay": 1, "leave": 0}, {"id": "fabrication", "present": 5, "halfDay": 0, "leave": 0}, {"id": "waterproofing", "present": 5, "halfDay": 1, "leave": 0}, {"id": "carpentry", "present": 5, "halfDay": 0, "leave": 0}, {"id": "painting", "present": 4, "halfDay": 0, "leave": 0}]'::jsonb),
('05 Jun 2025', 33, 29, 4, 0, 'Submitted', '[{"id": "mason", "present": 4, "halfDay": 1, "leave": 0}, {"id": "electrical", "present": 4, "halfDay": 1, "leave": 0}, {"id": "plumbing", "present": 5, "halfDay": 0, "leave": 0}, {"id": "fabrication", "present": 4, "halfDay": 1, "leave": 0}, {"id": "waterproofing", "present": 4, "halfDay": 1, "leave": 0}, {"id": "carpentry", "present": 4, "halfDay": 0, "leave": 0}, {"id": "painting", "present": 4, "halfDay": 0, "leave": 0}]'::jsonb),
('04 Jun 2025', 35, 31, 2, 2, 'Submitted', '[{"id": "mason", "present": 5, "halfDay": 1, "leave": 0}, {"id": "electrical", "present": 4, "halfDay": 0, "leave": 1}, {"id": "plumbing", "present": 5, "halfDay": 0, "leave": 0}, {"id": "fabrication", "present": 4, "halfDay": 1, "leave": 0}, {"id": "waterproofing", "present": 5, "halfDay": 0, "leave": 0}, {"id": "carpentry", "present": 4, "halfDay": 0, "leave": 1}, {"id": "painting", "present": 4, "halfDay": 0, "leave": 0}]'::jsonb)
ON CONFLICT DO NOTHING;

-- Create user roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('master_admin', 'sub_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Select policy: Allow authenticated users to view profiles
CREATE POLICY "Allow select for authenticated users" ON public.user_roles
    FOR SELECT TO authenticated USING (true);

-- Insert policy: Allow inserts
CREATE POLICY "Allow inserts" ON public.user_roles
    FOR INSERT WITH CHECK (true);

-- Delete policy: Allow delete
CREATE POLICY "Allow delete" ON public.user_roles
    FOR DELETE USING (true);

-- Update policy: Allow update
CREATE POLICY "Allow update" ON public.user_roles
    FOR UPDATE USING (true);

-- Create a trigger function to assign default roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    role_to_assign TEXT;
BEGIN
    -- If this is the first user, make them master_admin, otherwise sub_admin
    IF (SELECT COUNT(*) FROM public.user_roles) = 0 THEN
        role_to_assign := 'master_admin';
    ELSE
        role_to_assign := 'sub_admin';
    END IF;

    INSERT INTO public.user_roles (id, email, role)
    VALUES (new.id, new.email, role_to_assign);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
