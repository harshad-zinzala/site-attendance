import { useState } from 'react';
import { 
  Calendar, ChevronRight, FileSpreadsheet, File
} from 'lucide-react';


export default function ReportsView({ reports = [], showToast }) {
  const [selectedRange, setSelectedRange] = useState('7d');

  return (
    <div className="p-5 space-y-6 animate-fade-in bg-slate-50/30 min-h-full pb-[100px]">
      <div>
        <h3 className="font-extrabold text-slate-800 text-lg">Attendance Reports</h3>
        <p className="text-xs text-slate-500 mt-0.5">Access history and export records</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
        <button
          onClick={() => setSelectedRange('7d')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition ${
            selectedRange === '7d' ? 'bg-orange-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past 7 Days
        </button>
        <button
          onClick={() => setSelectedRange('30d')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition ${
            selectedRange === '30d' ? 'bg-orange-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past 30 Days
        </button>
        <button
          onClick={() => {
            setSelectedRange('custom');
            showToast("Custom Date Range filter selected.");
          }}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition ${
            selectedRange === 'custom' ? 'bg-orange-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Custom
        </button>
      </div>

      {/* Export Options */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <h4 className="font-bold text-slate-800 text-xs tracking-wide uppercase">Quick Exports</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => showToast("Exporting Excel report...")}
            className="flex items-center justify-center gap-2 p-3 border border-emerald-100 bg-emerald-50/30 rounded-xl text-emerald-800 hover:bg-emerald-50/60 active:scale-98 transition font-bold text-xs"
          >
            <FileSpreadsheet size={15} />
            Excel sheet (.xlsx)
          </button>
          
          <button 
            onClick={() => showToast("Exporting PDF report...")}
            className="flex items-center justify-center gap-2 p-3 border border-rose-100 bg-rose-50/30 rounded-xl text-rose-800 hover:bg-rose-50/60 active:scale-98 transition font-bold text-xs"
          >
            <File size={15} />
            PDF Report (.pdf)
          </button>
        </div>
      </div>

      {/* Historical Logs List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold text-slate-800">History Log</span>
          <span className="text-slate-400 font-semibold">{reports.length} reports submitted</span>
        </div>

        <div className="space-y-2.5">
          {reports.map((report, idx) => (
            <div 
              key={report.id || idx}
              onClick={() => showToast(`Opening details for report dated ${report.date}...`)}
              className="bg-white border border-slate-200 hover:border-slate-350 rounded-2xl p-4 shadow-xs flex items-center justify-between cursor-pointer transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-orange-600" />
                  <span className="font-bold text-slate-800 text-xs">{report.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                  <span className="text-emerald-700">P:{report.present}</span>
                  <span>•</span>
                  <span className="text-rose-605">A:{report.absent}</span>
                  <span>•</span>
                  <span className="text-amber-600">H:{report.halfDay}</span>
                  <span>•</span>
                  <span className="text-slate-500">L:{report.leave}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  {report.status}
                </span>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No reports found. Submit attendance to generate a report.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
