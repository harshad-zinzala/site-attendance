
export default function AttendanceStats({ stats }) {
  return (
    <div className="px-4 h-[75px] bg-white border-y border-slate-100 flex items-center gap-3 overflow-x-auto select-none no-scrollbar shrink-0">
      <div className="flex items-center gap-2 bg-[#e2f4e8] px-[18px] py-[9px] rounded-full text-[13px] shrink-0 font-medium">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1f8a4c] shrink-0"></span>
        <span className="font-extrabold text-[#116936] ml-0.5">{stats.present}</span>
        <span className="text-[#64748b] ml-0.5 font-normal">Present</span>
      </div>
      <div className="flex items-center gap-2 bg-[#fef3d6] px-[18px] py-[9px] rounded-full text-[13px] shrink-0 font-medium">
        <span className="w-2.5 h-2.5 rounded-full bg-[#b28900] shrink-0"></span>
        <span className="font-extrabold text-[#8f6e00] ml-0.5">{stats.halfDay}</span>
        <span className="text-[#64748b] ml-0.5 font-normal">Half Day</span>
      </div>
      <div className="flex items-center gap-2 bg-[#f1f5f9] px-[18px] py-[9px] rounded-full text-[13px] shrink-0 font-medium">
        <span className="w-2.5 h-2.5 rounded-full bg-[#64748b] shrink-0"></span>
        <span className="font-extrabold text-[#475569] ml-0.5">{stats.leave}</span>
        <span className="text-[#64748b] ml-0.5 font-normal">Leave</span>
      </div>
    </div>
  );
}
