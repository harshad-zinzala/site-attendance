export const INITIAL_DEPARTMENTS = [
  {
    id: 'mason',
    name: 'Mason',
    iconColor: 'bg-orange-100 text-orange-700',
    head: {
      name: 'Ramesh Kumar',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'electrical',
    name: 'Electrical',
    iconColor: 'bg-amber-100 text-amber-700',
    head: {
      name: 'Suresh Patel',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    iconColor: 'bg-blue-100 text-blue-700',
    head: {
      name: 'Amit Singh',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'fabrication',
    name: 'Fabrication',
    iconColor: 'bg-teal-100 text-teal-700',
    head: {
      name: 'Vikram Rao',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'waterproofing',
    name: 'Waterproofing',
    iconColor: 'bg-emerald-100 text-emerald-700',
    head: {
      name: 'Karan Johar',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    iconColor: 'bg-yellow-100 text-yellow-850',
    head: {
      name: 'Rajesh Sharma',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'painting',
    name: 'Painting',
    iconColor: 'bg-rose-100 text-rose-700',
    head: {
      name: 'Anil Mehta',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    }
  }
];

export const INITIAL_WORKERS = [
  // Mason (10 workers)
  { id: 'w1', name: 'Ramesh Kumar', deptId: 'mason', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { id: 'w2', name: 'Suresh Kumar', deptId: 'mason', status: 'unassigned' },
  { id: 'w3', name: 'Mahesh Chandra', deptId: 'mason', status: 'unassigned' },
  { id: 'w4', name: 'Dinesh Sharma', deptId: 'mason', status: 'unassigned' },
  { id: 'w5', name: 'Rajesh Verma', deptId: 'mason', status: 'unassigned' },
  { id: 'w6', name: 'Naresh Pal', deptId: 'mason', status: 'unassigned' },
  { id: 'w7', name: 'Umesh Singh', deptId: 'mason', status: 'unassigned' },
  { id: 'w8', name: 'Kamlesh Yadav', deptId: 'mason', status: 'unassigned' },
  { id: 'w9', name: 'Rakesh Gupta', deptId: 'mason', status: 'unassigned' },
  { id: 'w10', name: 'Somesh Roy', deptId: 'mason', status: 'unassigned' },

  // Electrical (5 workers)
  { id: 'w11', name: 'Suresh Patel', deptId: 'electrical', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: 'w12', name: 'Vijay Kumar', deptId: 'electrical', status: 'unassigned' },
  { id: 'w13', name: 'Ajay Sen', deptId: 'electrical', status: 'unassigned' },
  { id: 'w14', name: 'Sanjay Jha', deptId: 'electrical', status: 'unassigned' },
  { id: 'w15', name: 'Vijay Patel', deptId: 'electrical', status: 'unassigned' },

  // Plumbing (4 workers)
  { id: 'w16', name: 'Amit Singh', deptId: 'plumbing', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { id: 'w17', name: 'Rohit Singh', deptId: 'plumbing', status: 'unassigned' },
  { id: 'w18', name: 'Sumit Mishra', deptId: 'plumbing', status: 'unassigned' },
  { id: 'w19', name: 'Rahul Dev', deptId: 'plumbing', status: 'unassigned' },

  // Fabrication (7 workers)
  { id: 'w20', name: 'Vikram Rao', deptId: 'fabrication', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
  { id: 'w21', name: 'Arjun Mehta', deptId: 'fabrication', status: 'unassigned' },
  { id: 'w22', name: 'Abhinav Shukla', deptId: 'fabrication', status: 'unassigned' },
  { id: 'w23', name: 'Aditya Birla', deptId: 'fabrication', status: 'unassigned' },
  { id: 'w24', name: 'Aman Gupta', deptId: 'fabrication', status: 'unassigned' },
  { id: 'w25', name: 'Akshat Rana', deptId: 'fabrication', status: 'unassigned' },
  { id: 'w26', name: 'Alok Nath', deptId: 'fabrication', status: 'unassigned' },

  // Waterproofing (5 workers)
  { id: 'w27', name: 'Karan Johar', deptId: 'waterproofing', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80' },
  { id: 'w28', name: 'Kabir Singh', deptId: 'waterproofing', status: 'unassigned' },
  { id: 'w29', name: 'Kartik Aryan', deptId: 'waterproofing', status: 'unassigned' },
  { id: 'w30', name: 'Kiara Advani', deptId: 'waterproofing', status: 'unassigned' },
  { id: 'w31', name: 'Kriti Sanon', deptId: 'waterproofing', status: 'unassigned' },

  // Carpentry (6 workers)
  { id: 'w32', name: 'Rajesh Sharma', deptId: 'carpentry', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80' },
  { id: 'w33', name: 'Sonu Sood', deptId: 'carpentry', status: 'unassigned' },
  { id: 'w34', name: 'Salman Khan', deptId: 'carpentry', status: 'unassigned' },
  { id: 'w35', name: 'Shah Rukh Khan', deptId: 'carpentry', status: 'unassigned' },
  { id: 'w36', name: 'Aamir Khan', deptId: 'carpentry', status: 'unassigned' },
  { id: 'w37', name: 'Akshay Kumar', deptId: 'carpentry', status: 'unassigned' },

  // Painting (5 workers)
  { id: 'w38', name: 'Anil Mehta', deptId: 'painting', status: 'unassigned', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { id: 'w39', name: 'Hrithik Roshan', deptId: 'painting', status: 'unassigned' },
  { id: 'w40', name: 'Ranbir Kapoor', deptId: 'painting', status: 'unassigned' },
  { id: 'w41', name: 'Ranveer Singh', deptId: 'painting', status: 'unassigned' },
  { id: 'w42', name: 'Varun Dhawan', deptId: 'painting', status: 'unassigned' }
];

export const INITIAL_REPORTS = [
  { id: '1', date: '08 Jun 2025', marked: 42, present: 32, absent: 6, halfDay: 4, leave: 0, status: 'Submitted' },
  { id: '2', date: '07 Jun 2025', marked: 42, present: 30, absent: 8, halfDay: 2, leave: 2, status: 'Submitted' },
  { id: '3', date: '06 Jun 2025', marked: 42, present: 34, absent: 5, halfDay: 3, leave: 0, status: 'Submitted' },
  { id: '4', date: '05 Jun 2025', marked: 42, present: 29, absent: 9, halfDay: 4, leave: 0, status: 'Submitted' },
  { id: '5', date: '04 Jun 2025', marked: 42, present: 31, absent: 7, halfDay: 2, leave: 2, status: 'Submitted' }
];
