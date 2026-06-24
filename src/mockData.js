export const INITIAL_DEPARTMENTS = [
  {
    id: 'mason',
    name: 'Mason',
    iconColor: 'bg-orange-100 text-orange-700',
    head: {
      name: 'Ramesh Kumar',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  },
  {
    id: 'electrical',
    name: 'Electrical',
    iconColor: 'bg-amber-100 text-amber-700',
    head: {
      name: 'Suresh Patel',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    iconColor: 'bg-blue-100 text-blue-700',
    head: {
      name: 'Amit Singh',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  },
  {
    id: 'fabrication',
    name: 'Fabrication',
    iconColor: 'bg-teal-100 text-teal-700',
    head: {
      name: 'Vikram Rao',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  },
  {
    id: 'waterproofing',
    name: 'Waterproofing',
    iconColor: 'bg-emerald-100 text-emerald-700',
    head: {
      name: 'Karan Johar',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    iconColor: 'bg-yellow-100 text-yellow-850',
    head: {
      name: 'Rajesh Sharma',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  },
  {
    id: 'painting',
    name: 'Painting',
    iconColor: 'bg-rose-100 text-rose-700',
    head: {
      name: 'Anil Mehta',
      role: 'Dept. Head',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    },
    present: 0,
    halfDay: 0,
    leave: 0
  }
];

export const INITIAL_WORKERS = [];

export const INITIAL_REPORTS = [
  {
    id: '1',
    date: '08 Jun 2025',
    marked: 36,
    present: 32,
    halfDay: 4,
    leave: 0,
    status: 'Submitted',
    details: [
      { id: 'mason', present: 5, halfDay: 1, leave: 0 },
      { id: 'electrical', present: 5, halfDay: 1, leave: 0 },
      { id: 'plumbing', present: 5, halfDay: 0, leave: 0 },
      { id: 'fabrication', present: 5, halfDay: 1, leave: 0 },
      { id: 'waterproofing', present: 4, halfDay: 1, leave: 0 },
      { id: 'carpentry', present: 4, halfDay: 0, leave: 0 },
      { id: 'painting', present: 4, halfDay: 0, leave: 0 }
    ]
  },
  {
    id: '2',
    date: '07 Jun 2025',
    marked: 34,
    present: 30,
    halfDay: 2,
    leave: 2,
    status: 'Submitted',
    details: [
      { id: 'mason', present: 4, halfDay: 1, leave: 0 },
      { id: 'electrical', present: 4, halfDay: 0, leave: 1 },
      { id: 'plumbing', present: 5, halfDay: 0, leave: 0 },
      { id: 'fabrication', present: 4, halfDay: 1, leave: 0 },
      { id: 'waterproofing', present: 5, halfDay: 0, leave: 0 },
      { id: 'carpentry', present: 4, halfDay: 0, leave: 1 },
      { id: 'painting', present: 4, halfDay: 0, leave: 0 }
    ]
  },
  {
    id: '3',
    date: '06 Jun 2025',
    marked: 37,
    present: 34,
    halfDay: 3,
    leave: 0,
    status: 'Submitted',
    details: [
      { id: 'mason', present: 5, halfDay: 1, leave: 0 },
      { id: 'electrical', present: 5, halfDay: 0, leave: 0 },
      { id: 'plumbing', present: 5, halfDay: 1, leave: 0 },
      { id: 'fabrication', present: 5, halfDay: 0, leave: 0 },
      { id: 'waterproofing', present: 5, halfDay: 1, leave: 0 },
      { id: 'carpentry', present: 5, halfDay: 0, leave: 0 },
      { id: 'painting', present: 4, halfDay: 0, leave: 0 }
    ]
  },
  {
    id: '4',
    date: '05 Jun 2025',
    marked: 33,
    present: 29,
    halfDay: 4,
    leave: 0,
    status: 'Submitted',
    details: [
      { id: 'mason', present: 4, halfDay: 1, leave: 0 },
      { id: 'electrical', present: 4, halfDay: 1, leave: 0 },
      { id: 'plumbing', present: 5, halfDay: 0, leave: 0 },
      { id: 'fabrication', present: 4, halfDay: 1, leave: 0 },
      { id: 'waterproofing', present: 4, halfDay: 1, leave: 0 },
      { id: 'carpentry', present: 4, halfDay: 0, leave: 0 },
      { id: 'painting', present: 4, halfDay: 0, leave: 0 }
    ]
  },
  {
    id: '5',
    date: '04 Jun 2025',
    marked: 35,
    present: 31,
    halfDay: 2,
    leave: 2,
    status: 'Submitted',
    details: [
      { id: 'mason', present: 5, halfDay: 1, leave: 0 },
      { id: 'electrical', present: 4, halfDay: 0, leave: 1 },
      { id: 'plumbing', present: 5, halfDay: 0, leave: 0 },
      { id: 'fabrication', present: 4, halfDay: 1, leave: 0 },
      { id: 'waterproofing', present: 5, halfDay: 0, leave: 0 },
      { id: 'carpentry', present: 4, halfDay: 0, leave: 1 },
      { id: 'painting', present: 4, halfDay: 0, leave: 0 }
    ]
  }
];
