import { 
  CheckCircle, AlertTriangle, Clock, TrendingUp, Calendar, 
  ArrowUpRight, Award
} from 'lucide-react';

export default function DashboardView({ departments, stats, showToast, selectedDate }) {
  // Present percentage
  const presentRate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  const monthYearStr = selectedDate ? selectedDate.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric'
  }) : 'June 2025';

  return (
    <div className="p-5 space-y-6 animate-fade-in bg-slate-50/30 pb-[150px]">
      
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg">Site Analytics</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live attendance reporting metrics</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
          <Calendar size={13} className="text-orange-600" />
          <span>{monthYearStr}</span>
        </div>
      </div>

      {/* Grid of Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Attendance Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp size={14} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-extrabold text-slate-800 leading-none">{presentRate}%</h4>
            <div className="flex items-center gap-0.5 mt-1.5 text-emerald-600 font-bold text-[10px]">
              <ArrowUpRight size={10} />
              <span>+2.4% vs last week</span>
            </div>
          </div>
        </div>

        {/* Unassigned Staff */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unassigned</span>
            <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
              <Clock size={14} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-extrabold text-slate-850 leading-none">{stats.unassigned}</h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-1.5">
              {stats.unassigned > 0 ? `${stats.unassigned} workers pending mark` : 'All staff accounted for'}
            </p>
          </div>
        </div>

        {/* Present Workers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Present Today</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle size={14} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-extrabold text-slate-800 leading-none">{stats.present} <span className="text-xs text-slate-400 font-medium">/ {stats.total}</span></h4>
            <p className="text-[9px] text-slate-400 font-semibold mt-1">Confirmed on-site</p>
          </div>
        </div>

        {/* Leave */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Away Today</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <AlertTriangle size={14} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-extrabold text-slate-800 leading-none">{stats.leave} <span className="text-xs text-slate-400 font-medium">workers</span></h4>
            <p className="text-[9px] text-slate-400 font-semibold mt-1">On leave</p>
          </div>
        </div>
      </div>

      {/* Custom SVG Bar Chart - Department Attendance Rates */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Attendance by Department</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Percentage of present workers</p>
          </div>
          <button 
            onClick={() => showToast("Detailed report download started.")}
            className="text-[10px] text-orange-600 font-bold hover:underline"
          >
            Download PDF
          </button>
        </div>

        {/* SVG Graph rendering */}
        <div className="space-y-3 pt-2">
          {departments.map((dept) => {
            const rate = dept.totalWorkers > 0 ? Math.round((dept.present / dept.totalWorkers) * 100) : 0;
            
            return (
              <div key={dept.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{dept.name}</span>
                  <span className="font-bold text-slate-800">{rate}% ({dept.present}/{dept.totalWorkers})</span>
                </div>
                
                {/* Custom bar indicator */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                  {/* Present segments */}
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${(dept.present / dept.totalWorkers) * 100}%` }}
                    title={`Present: ${dept.present}`}
                  ></div>
                  {/* Halfday segments */}
                  <div 
                    className="bg-amber-400 h-full transition-all duration-500" 
                    style={{ width: `${(dept.halfDay / dept.totalWorkers) * 100}%` }}
                    title={`Half Day: ${dept.halfDay}`}
                  ></div>

                  {/* Leave segments */}
                  <div 
                    className="bg-slate-400 h-full transition-all duration-500" 
                    style={{ width: `${(dept.leave / dept.totalWorkers) * 100}%` }}
                    title={`Leave: ${dept.leave}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard/Highlights */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Award size={15} className="text-amber-200" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Top Department Today</span>
          </div>
          <h4 className="font-bold text-sm">Plumbing Department</h4>
          <p className="text-[10px] text-white/80">100% attendance marked by Head Amit Singh</p>
        </div>
        <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 shrink-0">
          <span className="text-xl font-black">100%</span>
        </div>
      </div>

    </div>
  );
}
