import { CheckCircle, Send, Save } from 'lucide-react';

export default function SubmitBar({ 
  deptProgress, 
  onSubmit, 
  onSaveDraft 
}) {
  const completionPercentage = (deptProgress.marked / deptProgress.total) * 100;

  return (
    <div className="absolute bottom-[76px] left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-100 p-3.5 flex flex-col gap-2.5 z-40 shadow-lg select-none">
      {/* Top Status */}
      <div className="flex items-center justify-between text-xs font-bold px-1">
        <div className="flex items-center gap-1.5 text-slate-600">
          <CheckCircle size={15} className="text-[#27ae60]" />
          <span>{deptProgress.marked} of {deptProgress.total} departments marked</span>
        </div>
        {deptProgress.pending > 0 ? (
          <span className="text-[#e67e22] font-extrabold">{deptProgress.pending} pending</span>
        ) : (
          <span className="text-[#27ae60] font-extrabold">All complete!</span>
        )}
      </div>

      {/* Completion Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-[#27ae60] h-full rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={onSubmit}
          className="flex-1 bg-gradient-to-r from-[#ea580c] to-[#e67e22] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 active:scale-98 transition"
        >
          <Send size={16} className="-rotate-45" />
          Submit All Attendance
        </button>
        <button
          onClick={onSaveDraft}
          className="p-3.5 bg-[#fdf3e7] border border-[#fbe5cb]/40 hover:bg-[#fbe5cb]/30 rounded-2xl text-[#d35400] transition"
          title="Save Draft"
        >
          <Save size={18} />
        </button>
      </div>
    </div>
  );
}
