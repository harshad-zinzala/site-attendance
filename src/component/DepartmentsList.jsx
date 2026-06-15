import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import AttendanceEditor from './AttendanceEditor';

export default function DepartmentsList({
  filteredDepartments,
  expandedDeptId,
  handleToggleAccordion,
  renderDepartmentStatus,
  step1Count,
  step2Status,
  setStep2Status,
  adjustCount,
  handleMarkAttendance
}) {
  return (
    <>
      {/* 5. Notice Info Box */}


      {/* 6. Departments Accordion List */}
      <div className="flex-1 px-4 pb-[240px] space-y-3">
        {filteredDepartments.map((dept) => {
          const isExpanded = expandedDeptId === dept.id;

          return (
            <div
              key={dept.id}
              className={`border border-slate-200/80 rounded-2xl overflow-hidden transition-all ${isExpanded
                ? 'bg-slate-50/60 shadow-lg border-orange-150 shadow-orange-900/5'
                : 'bg-white hover:bg-slate-50/30'
                }`}
            >
              {/* Header Summary Row */}
              <div
                onClick={() => handleToggleAccordion(dept.id)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  {/* Dept Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner ${dept.iconColor}`}>
                    {dept.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{dept.name}</span>
                      {/* <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {dept.totalWorkers} workers
                      </span> */}
                    </div>

                    {/* Unassigned Indicator */}
                    <div className="flex items-center gap-1.5 mt-1">
                      {dept.unassigned > 0 ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                          <span className="text-[11px] text-orange-605 font-semibold">{dept.unassigned} unassigned</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-[11px] text-emerald-650 font-semibold">All marked</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right summary states and chevron */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center text-xs">
                    {renderDepartmentStatus(dept)}
                  </div>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {/* Accordion Body Editor */}
              {isExpanded && (
                <AttendanceEditor
                  dept={dept}
                  step1Count={step1Count}
                  step2Status={step2Status}
                  setStep2Status={setStep2Status}
                  adjustCount={adjustCount}
                  handleMarkAttendance={handleMarkAttendance}
                />
              )}
            </div>
          );
        })}

        {filteredDepartments.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No departments found matching your search.
          </div>
        )}
      </div>
    </>
  );
}
