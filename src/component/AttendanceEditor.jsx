import { AlertCircle, Plus, Minus, CheckCircle } from 'lucide-react';

export default function AttendanceEditor({
  dept,
  step1Count,
  step2Status,
  setStep2Status,
  adjustCount,
  handleMarkAttendance
}) {
  const statusLabels = { P: 'Present', A: 'Absent', H: 'Half Day', L: 'Leave' };

  return (
    <div className="border-t border-slate-200/50 p-4 bg-white space-y-5">
      {/* Profile Dept Head Info */}
      <div className="flex items-center gap-3 bg-[#fffaf5] border border-[#fbe5cb]/40 rounded-2xl p-3.5">
        <img
          src={dept.head.avatar}
          alt={dept.head.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-sm">{dept.head.name}</span>
            <span className="bg-[#e67e22] text-white font-extrabold px-2 py-0.5 rounded-md text-[9px] tracking-wide uppercase">
              {dept.head.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Marking attendance for {dept.name} dept.
          </p>
        </div>
      </div>

      {/* STEP 1: SELECT WORKER COUNT */}
      <div>
        {/* <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase select-none">
          Step 1 — Select Worker Count
        </h4> */}

        <div className="flex items-center gap-3 mt-2.5">
          <button
            onClick={() => adjustCount(-1, dept.totalWorkers)}
            className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition"
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>

          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-3 flex flex-col items-center justify-center shadow-inner">
            <span className="text-3xl font-bold text-slate-800 leading-none">{step1Count}</span>
            {/* <span className="text-xs text-slate-400 font-semibold mt-1">of {dept.totalWorkers} workers</span> */}
          </div>

          <button
            onClick={() => adjustCount(1, dept.totalWorkers)}
            className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Progress bar count */}
        <div className="mt-3.5">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#e67e22] h-full rounded-full transition-all duration-300"
              style={{ width: `${(step1Count / dept.totalWorkers) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-end mt-1.5">
            <span className="text-xs text-slate-400 font-semibold">
              {dept.totalWorkers - step1Count} workers remaining
            </span>
          </div>
        </div>
      </div>

      {/* STEP 2: MARK AS */}
      <div>
        {/* <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase select-none">
          Step 2 — Mark As
        </h4> */}

        <div className="grid grid-cols-4 gap-2.5 mt-2.5">
          {/* Present P Button */}
          <button
            onClick={() => setStep2Status('P')}
            className={`rounded-2xl py-3.5 px-1 flex flex-col items-center border transition-all ${step2Status === 'P'
              ? 'bg-[#007a48] border-[#007a48] text-white shadow-md shadow-emerald-700/10'
              : 'bg-emerald-50/20 border-emerald-100 text-[#007a48] hover:bg-emerald-50/50'
              }`}
          >
            <span className="text-lg font-extrabold leading-none">P</span>
            <span className="text-xs font-bold mt-1.5">Present</span>
          </button>

          {/* Absent A Button */}
          <button
            onClick={() => setStep2Status('A')}
            className={`rounded-2xl py-3.5 px-1 flex flex-col items-center border transition-all ${step2Status === 'A'
              ? 'bg-[#c53030] border-[#c53030] text-white shadow-md shadow-rose-700/10'
              : 'bg-rose-50/20 border-rose-100 text-[#c53030] hover:bg-rose-50/50'
              }`}
          >
            <span className="text-lg font-extrabold leading-none">A</span>
            <span className="text-xs font-bold mt-1.5">Absent</span>
          </button>

          {/* Half Day H Button */}
          <button
            onClick={() => setStep2Status('H')}
            className={`rounded-2xl py-3.5 px-1 flex flex-col items-center border transition-all ${step2Status === 'H'
              ? 'bg-[#b7791f] border-[#b7791f] text-white shadow-md shadow-amber-600/10'
              : 'bg-amber-50/20 border-amber-100 text-[#b7791f] hover:bg-amber-50/50'
              }`}
          >
            <span className="text-lg font-extrabold leading-none">H</span>
            <span className="text-xs font-bold mt-1.5">Half Day</span>
          </button>

          {/* Leave L Button */}
          <button
            onClick={() => setStep2Status('L')}
            className={`rounded-2xl py-3.5 px-1 flex flex-col items-center border transition-all ${step2Status === 'L'
              ? 'bg-[#4a5568] border-[#4a5568] text-white shadow-md'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
          >
            <span className="text-lg font-extrabold leading-none">L</span>
            <span className="text-xs font-bold mt-1.5">Leave</span>
          </button>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={() => handleMarkAttendance(dept.id)}
        className="w-full bg-[#ea580c] hover:bg-[#d946ef] hover:from-[#ea580c] hover:to-[#ea580c] bg-gradient-to-r from-[#ea580c] to-[#e67e22] text-white py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition shadow-md shadow-orange-500/10"
      >
        <CheckCircle size={18} />
        Mark {step1Count} workers as {statusLabels[step2Status]}
      </button>

      {/* ACCORDION FOOTER SUMMARY */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-slate-500 font-medium">
        <AlertCircle size={15} className="text-slate-400 shrink-0 mt-0.5" />
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-left">
          <span className="font-bold text-slate-600">Marked so far:</span>
          {dept.present > 0 && <span className="text-emerald-700 font-semibold">• {dept.present} Present</span>}
          {dept.absent > 0 && <span className="text-rose-700 font-semibold">• {dept.absent} Absent</span>}
          {dept.halfDay > 0 && <span className="text-amber-700 font-semibold">• {dept.halfDay} Half Day</span>}
          {dept.leave > 0 && <span className="text-slate-600 font-semibold">• {dept.leave} Leave</span>}
          {dept.unassigned > 0 && <span className="text-orange-600 font-bold">• {dept.unassigned} Unassigned</span>}
        </div>
      </div>
    </div>
  );
}
