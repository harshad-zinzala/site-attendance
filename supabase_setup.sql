-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_color TEXT NOT NULL,
    head_name TEXT NOT NULL,
    head_role TEXT NOT NULL,
    head_avatar TEXT NOT NULL
);

-- Create workers table
CREATE TABLE IF NOT EXISTS workers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    dept_id TEXT REFERENCES departments(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'unassigned',
    avatar TEXT
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    date TEXT NOT NULL,
    marked INTEGER NOT NULL,
    present INTEGER NOT NULL,
    absent INTEGER NOT NULL,
    half_day INTEGER NOT NULL,
    leave INTEGER NOT NULL,
    status TEXT NOT NULL
);

-- Seed departments
INSERT INTO departments (id, name, icon_color, head_name, head_role, head_avatar) VALUES
('mason', 'Mason', 'bg-orange-100 text-orange-700', 'Ramesh Kumar', 'Dept. Head', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'),
('electrical', 'Electrical', 'bg-amber-100 text-amber-700', 'Suresh Patel', 'Dept. Head', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'),
('plumbing', 'Plumbing', 'bg-blue-100 text-blue-700', 'Amit Singh', 'Dept. Head', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'),
('fabrication', 'Fabrication', 'bg-teal-100 text-teal-700', 'Vikram Rao', 'Dept. Head', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'),
('waterproofing', 'Waterproofing', 'bg-emerald-100 text-emerald-700', 'Karan Johar', 'Dept. Head', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'),
('carpentry', 'Carpentry', 'bg-yellow-100 text-yellow-850', 'Rajesh Sharma', 'Dept. Head', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'),
('painting', 'Painting', 'bg-rose-100 text-rose-700', 'Anil Mehta', 'Dept. Head', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    icon_color = EXCLUDED.icon_color,
    head_name = EXCLUDED.head_name,
    head_role = EXCLUDED.head_role,
    head_avatar = EXCLUDED.head_avatar;

-- Seed workers (fully aligned with totals)
INSERT INTO workers (id, name, dept_id, status, avatar) VALUES
-- Mason (10 workers: 7 P, 1 A, 1 H, 1 unassigned)
('w1', 'Ramesh Kumar', 'mason', 'P', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'),
('w2', 'Suresh Kumar', 'mason', 'P', NULL),
('w3', 'Mahesh Chandra', 'mason', 'P', NULL),
('w4', 'Dinesh Sharma', 'mason', 'P', NULL),
('w5', 'Rajesh Verma', 'mason', 'P', NULL),
('w6', 'Naresh Pal', 'mason', 'P', NULL),
('w7', 'Umesh Singh', 'mason', 'P', NULL),
('w8', 'Kamlesh Yadav', 'mason', 'A', NULL),
('w9', 'Rakesh Gupta', 'mason', 'H', NULL),
('w10', 'Somesh Roy', 'mason', 'unassigned', NULL),

-- Electrical (5 workers: 3 P, 1 A, 1 unassigned)
('w11', 'Suresh Patel', 'electrical', 'P', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'),
('w12', 'Vijay Kumar', 'electrical', 'P', NULL),
('w13', 'Ajay Sen', 'electrical', 'P', NULL),
('w14', 'Sanjay Jha', 'electrical', 'A', NULL),
('w15', 'Vijay Patel', 'electrical', 'unassigned', NULL),

-- Plumbing (4 workers: 3 P, 1 H)
('w16', 'Amit Singh', 'plumbing', 'P', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'),
('w17', 'Rohit Singh', 'plumbing', 'P', NULL),
('w18', 'Sumit Mishra', 'plumbing', 'P', NULL),
('w19', 'Rahul Dev', 'plumbing', 'H', NULL),

-- Fabrication (7 workers: 5 P, 1 L, 1 unassigned)
('w20', 'Vikram Rao', 'fabrication', 'P', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'),
('w21', 'Arjun Mehta', 'fabrication', 'P', NULL),
('w22', 'Abhinav Shukla', 'fabrication', 'P', NULL),
('w23', 'Aditya Birla', 'fabrication', 'P', NULL),
('w24', 'Aman Gupta', 'fabrication', 'P', NULL),
('w25', 'Akshat Rana', 'fabrication', 'L', NULL),
('w26', 'Alok Nath', 'fabrication', 'unassigned', NULL),

-- Waterproofing (5 workers: 5 unassigned)
('w27', 'Karan Johar', 'waterproofing', 'unassigned', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'),
('w28', 'Kabir Singh', 'waterproofing', 'unassigned', NULL),
('w29', 'Kartik Aryan', 'waterproofing', 'unassigned', NULL),
('w30', 'Kiara Advani', 'waterproofing', 'unassigned', NULL),
('w31', 'Kriti Sanon', 'waterproofing', 'unassigned', NULL),

-- Carpentry (6 workers: 5 P, 1 A)
('w32', 'Rajesh Sharma', 'carpentry', 'P', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'),
('w33', 'Sonu Sood', 'carpentry', 'P', NULL),
('w34', 'Salman Khan', 'carpentry', 'P', NULL),
('w35', 'Shah Rukh Khan', 'carpentry', 'P', NULL),
('w36', 'Aamir Khan', 'carpentry', 'P', NULL),
('w37', 'Akshay Kumar', 'carpentry', 'A', NULL),

-- Painting (5 workers: 2 P, 1 H, 2 unassigned)
('w38', 'Anil Mehta', 'painting', 'P', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'),
('w39', 'Hrithik Roshan', 'painting', 'P', NULL),
('w40', 'Ranbir Kapoor', 'painting', 'H', NULL),
('w41', 'Ranveer Singh', 'painting', 'unassigned', NULL),
('w42', 'Varun Dhawan', 'painting', 'unassigned', NULL)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    dept_id = EXCLUDED.dept_id,
    status = EXCLUDED.status,
    avatar = EXCLUDED.avatar;

-- Seed reports
INSERT INTO reports (date, marked, present, absent, half_day, leave, status) VALUES
('08 Jun 2025', 42, 32, 6, 4, 0, 'Submitted'),
('07 Jun 2025', 42, 30, 8, 2, 2, 'Submitted'),
('06 Jun 2025', 42, 34, 5, 3, 0, 'Submitted'),
('05 Jun 2025', 42, 29, 9, 4, 0, 'Submitted'),
('04 Jun 2025', 42, 31, 7, 2, 2, 'Submitted')
ON CONFLICT DO NOTHING;
