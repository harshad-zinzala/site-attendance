import { MapPin } from 'lucide-react';

export default function Header({ notificationCount, onClearNotifications, isDbMode, selectedDate, setSelectedDate }) {
  const localDateStr = selectedDate ? selectedDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : '';

  const year = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
  const month = selectedDate ? String(selectedDate.getMonth() + 1).padStart(2, '0') : String(new Date().getMonth() + 1).padStart(2, '0');
  const day = selectedDate ? String(selectedDate.getDate()).padStart(2, '0') : String(new Date().getDate()).padStart(2, '0');
  const inputDateVal = `${year}-${month}-${day}`;

  return (
    <header className="p-4 pb-3 bg-white select-none">
      {/* Row 1: Logo & Title on Left, Bell & Avatar on Right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[18px] bg-[#e67e22] flex items-center justify-center text-white shadow-sm shrink-0">
            {/* HardHat SVG */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
              <path d="M10.3 8.3a2 2 0 0 1 3.4 0" />
              <path d="M5 15V9a7 7 0 0 1 14 0v6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ATPL Sec-6</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications bell */}
          <button
            onClick={onClearNotifications}
            className="relative p-1.5 rounded-full hover:bg-slate-100 transition"
          >
            {/* Bell SVG */}
            <svg className="w-7 h-7 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#e67e22] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white translate-x-1/3 -translate-y-1/3">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="w-11 h-11 rounded-full overflow-hidden cursor-pointer shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Location */}
      <div className="flex items-center gap-1.5 mt-4 text-[#e67e22] font-semibold text-lg">
        <MapPin size={20} className="text-[#e67e22] fill-transparent stroke-[2.5]" />
        <span className="text-slate-800 text-[19px] font-bold tracking-tight">Prestige Heights — Site B</span>
      </div>

      {/* Row 3: Date & Open status */}
      <div className="flex items-center justify-between mt-2.5">
        <div className="relative flex items-center gap-1.5 cursor-pointer group px-2 py-1 -ml-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition duration-150">
          <span className="text-slate-500 font-semibold text-base group-hover:text-orange-600 transition-colors">
            {localDateStr}
          </span>
          <svg
            className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <input
            type="date"
            value={inputDateVal}
            onChange={(e) => {
              if (e.target.value) {
                setSelectedDate(new Date(e.target.value));
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

      </div>
    </header>
  );
}
