import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function Header({ notificationCount, onClearNotifications, isDbMode, selectedDate, setSelectedDate }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentViewDate, setCurrentViewDate] = useState(() => selectedDate || new Date());
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const localDateStr = selectedDate ? selectedDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : '';

  const viewYear = currentViewDate.getFullYear();
  const viewMonth = currentViewDate.getMonth(); // 0-indexed

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentViewDate(new Date(viewYear, viewMonth - 1, 1));
  };
  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const generateDays = () => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const currentMonthDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      days.push({
        day: d,
        date: new Date(viewYear, viewMonth - 1, d),
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= currentMonthDays; i++) {
      days.push({
        day: i,
        date: new Date(viewYear, viewMonth, i),
        isCurrentMonth: true
      });
    }

    // Next month days
    const totalSlots = 42; // 6 rows
    const nextMonthDaysNeeded = totalSlots - days.length;
    for (let i = 1; i <= nextMonthDaysNeeded; i++) {
      days.push({
        day: i,
        date: new Date(viewYear, viewMonth + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const isDateEditable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 4);

    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate >= minDate && compareDate <= today;
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
      <div className="flex items-center justify-between mt-2.5 relative" ref={calendarRef}>
        <div 
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="flex items-center gap-1.5 cursor-pointer group px-2 py-1 -ml-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition duration-150"
        >
          <span className="text-[#ea580c] font-bold text-base group-hover:text-orange-600 transition-colors">
            {localDateStr}
          </span>
          <svg
            className="w-4 h-4 text-orange-500 group-hover:text-orange-600 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {isCalendarOpen && (
          <div className="absolute top-10 left-0 z-50 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100/80 p-4 animate-fade-in">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-800 text-sm">
                {monthNames[viewMonth]} {viewYear}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-50 active:bg-slate-100 rounded-lg text-slate-500 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-50 active:bg-slate-100 rounded-lg text-slate-500 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Weekdays Names Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                <span key={dayName} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {dayName}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {generateDays().map(({ day, date, isCurrentMonth }, idx) => {
                const editable = isDateEditable(date);
                const active = isSelected(date);
                const todayMark = isToday(date);

                return (
                  <button
                    key={idx}
                    disabled={!editable}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    className={`w-9 h-9 flex flex-col items-center justify-center text-xs rounded-xl font-bold relative transition duration-150 ${
                      !isCurrentMonth ? 'text-slate-350 opacity-40' : ''
                    } ${
                      editable
                        ? active
                          ? 'bg-gradient-to-br from-[#ea580c] to-[#e67e22] text-white shadow-md shadow-orange-500/20'
                          : 'text-slate-800 hover:bg-orange-50 hover:text-[#ea580c] cursor-pointer'
                        : 'text-slate-200 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <span>{day}</span>
                    {todayMark && (
                      <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : 'bg-orange-500'}`}></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick helper buttons */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDate(new Date());
                  setCurrentViewDate(new Date());
                  setIsCalendarOpen(false);
                }}
                className="font-bold text-orange-600 hover:underline"
              >
                Go to Today
              </button>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                Today + Past 4 Days
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
