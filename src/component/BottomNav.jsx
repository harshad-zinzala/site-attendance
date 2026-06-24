import { LayoutGrid, CalendarCheck, BarChart2, Users, MoreHorizontal } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'more', label: 'More', icon: MoreHorizontal }
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[76px] bg-white border-t border-slate-100 flex items-center justify-around z-40 select-none pb-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center w-16 h-full transition relative"
          >
            <div className={`px-5 py-2 rounded-2xl transition-all flex items-center justify-center ${
              isActive 
                ? 'bg-[#fdf3e7] text-[#e67e22]' 
                : 'text-[#8c857b] hover:text-[#5c5750]'
            }`}>
              <Icon size={22} className={isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
            </div>
            <span className={`text-[11px] mt-1 tracking-tight ${
              isActive 
                ? 'text-[#e67e22] font-bold' 
                : 'text-[#8c857b] font-medium'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
