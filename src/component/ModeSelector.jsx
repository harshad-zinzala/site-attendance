import { User, Layers, Info } from 'lucide-react';

export default function ModeSelector({ 
  isBulkMode, 
  setIsBulkMode, 
  totalDepts 
}) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-slate-105 bg-white select-none">
      <div className="flex items-center bg-[#ebeae4]/45 border border-slate-200/80 rounded-2xl p-1 w-full max-w-[220px]">
        <button
          onClick={() => setIsBulkMode(false)}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            !isBulkMode 
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User size={15} />
          Individual
        </button>
        <button
          onClick={() => setIsBulkMode(true)}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isBulkMode 
              ? 'bg-[#e67e22] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers size={15} />
          Bulk / Dept
        </button>
      </div>

      <div className="bg-[#fdf3e7] border border-[#fbe5cb] text-[#d35400] px-2.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 shrink-0">
        <Info size={14} className="text-[#d35400] shrink-0" />
        <span>{totalDepts} depts</span>
      </div>
    </div>
  );
}
