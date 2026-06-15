import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';

export default function WorkersView({ departments, workers, updateWorkerStatus, showToast }) {
  const [searchText, setSearchText] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Handle status update of a single worker
  const handleWorkerStatusChange = (workerId, newStatus) => {
    updateWorkerStatus(workerId, newStatus);
    const wName = workers.find(w => w.id === workerId)?.name;
    const statusLabel = { P: 'Present', A: 'Absent', H: 'Half Day', L: 'Leave', unassigned: 'Unassigned' }[newStatus];
    showToast(`Marked ${wName} as ${statusLabel}`);
  };

  // Filter workers based on search and drop-downs
  const filteredWorkers = useMemo(() => {
    return workers.filter(w => {
      const matchesSearch = w.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesDept = filterDept === 'all' || w.deptId === filterDept;
      const matchesStatus = filterStatus === 'all' || w.status === filterStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [workers, searchText, filterDept, filterStatus]);

  // Dept helper name
  const getDeptName = (deptId) => {
    return departments.find(d => d.id === deptId)?.name || 'Unknown';
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in bg-slate-50/30 min-h-full pb-[100px]">
      <div>
        <h3 className="font-extrabold text-slate-800 text-lg">Workers Directory</h3>
        <p className="text-xs text-slate-500 mt-0.5">Manage attendance at worker level</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search workers by name..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-orange-500 transition text-slate-800 shadow-sm"
        />
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 text-xs">
        <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-xl px-2 py-1.5 shadow-sm">
          <Filter size={12} className="text-slate-400 mr-1.5 shrink-0" />
          <select 
            value={filterDept} 
            onChange={(e) => setFilterDept(e.target.value)}
            className="w-full bg-transparent border-0 focus:ring-0 text-slate-700 outline-none font-medium text-[11px]"
          >
            <option value="all">All Depts</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-xl px-2 py-1.5 shadow-sm">
          <Filter size={12} className="text-slate-400 mr-1.5 shrink-0" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-transparent border-0 focus:ring-0 text-slate-700 outline-none font-medium text-[11px]"
          >
            <option value="all">All Statuses</option>
            <option value="P">Present (P)</option>
            <option value="A">Absent (A)</option>
            <option value="H">Half Day (H)</option>
            <option value="L">Leave (L)</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      {/* Workers List */}
      <div className="space-y-2.5">
        {filteredWorkers.map(w => (
          <div 
            key={w.id}
            className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {w.avatar ? (
                <img 
                  src={w.avatar} 
                  alt={w.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200">
                  {w.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 text-xs truncate">{w.name}</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{getDeptName(w.deptId)} Dept</p>
              </div>
            </div>

            {/* Attendance Toggle Switches */}
            <div className="flex items-center gap-1 select-none shrink-0">
              {/* P present */}
              <button 
                onClick={() => handleWorkerStatusChange(w.id, w.status === 'P' ? 'unassigned' : 'P')}
                className={`w-7 h-7 rounded-lg text-xs font-black transition flex items-center justify-center ${
                  w.status === 'P'
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/10'
                    : 'bg-slate-50 border border-slate-200 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100'
                }`}
                title="Mark Present"
              >
                P
              </button>
              
              {/* A absent */}
              <button 
                onClick={() => handleWorkerStatusChange(w.id, w.status === 'A' ? 'unassigned' : 'A')}
                className={`w-7 h-7 rounded-lg text-xs font-black transition flex items-center justify-center ${
                  w.status === 'A'
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/10'
                    : 'bg-slate-50 border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100'
                }`}
                title="Mark Absent"
              >
                A
              </button>

              {/* H half day */}
              <button 
                onClick={() => handleWorkerStatusChange(w.id, w.status === 'H' ? 'unassigned' : 'H')}
                className={`w-7 h-7 rounded-lg text-xs font-black transition flex items-center justify-center ${
                  w.status === 'H'
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-550/10'
                    : 'bg-slate-50 border border-slate-200 text-slate-400 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-100'
                }`}
                title="Mark Half Day"
              >
                H
              </button>

              {/* L leave */}
              <button 
                onClick={() => handleWorkerStatusChange(w.id, w.status === 'L' ? 'unassigned' : 'L')}
                className={`w-7 h-7 rounded-lg text-xs font-black transition flex items-center justify-center ${
                  w.status === 'L'
                    ? 'bg-slate-600 text-white shadow-sm shadow-slate-600/10'
                    : 'bg-slate-50 border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                }`}
                title="Mark Leave"
              >
                L
              </button>
            </div>
          </div>
        ))}

        {filteredWorkers.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-xs">
            No workers found matching the filters.
          </div>
        )}
      </div>
    </div>
  );
}
