import { useState, useMemo } from 'react';
import { 
  Calendar, ChevronRight, FileSpreadsheet, File
} from 'lucide-react';


const parseReportDate = (dateStr) => {
  // Format: "23 Jun 2026" or similar
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames.indexOf(parts[1]);
    const year = parseInt(parts[2], 10);
    if (month !== -1) {
      return new Date(year, month, day);
    }
  }
  return new Date(dateStr); // Fallback
};

export default function ReportsView({ reports = [], showToast }) {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter reports depending on selected range
  const filteredReports = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return reports.filter(r => {
      const rDate = parseReportDate(r.date);
      if (selectedRange === '7d') {
        const past7 = new Date();
        past7.setDate(today.getDate() - 7);
        past7.setHours(0, 0, 0, 0);
        return rDate >= past7 && rDate <= today;
      }
      if (selectedRange === '30d') {
        const past30 = new Date();
        past30.setDate(today.getDate() - 30);
        past30.setHours(0, 0, 0, 0);
        return rDate >= past30 && rDate <= today;
      }
      if (selectedRange === 'custom') {
        const start = customStartDate ? new Date(customStartDate) : null;
        const end = customEndDate ? new Date(customEndDate) : null;
        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);
        
        if (start && end) {
          return rDate >= start && rDate <= end;
        }
        if (start) {
          return rDate >= start;
        }
        if (end) {
          return rDate <= end;
        }
      }
      return true;
    });
  }, [reports, selectedRange, customStartDate, customEndDate]);

  // Export functions
  const handleExportExcel = () => {
    if (filteredReports.length === 0) {
      showToast("⚠️ No reports to export.");
      return;
    }
    // Generate CSV content (which Excel opens)
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Present,Half Day,Leave,Status\n";
    filteredReports.forEach(r => {
      csvContent += `${r.date},${r.present},${r.halfDay},${r.leave},${r.status}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_Report_${selectedRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("📊 Excel sheet (.csv) exported and downloading!");
  };

  const handleExportPDF = () => {
    if (filteredReports.length === 0) {
      showToast("⚠️ No reports to export.");
      return;
    }
    const printWindow = window.open("", "_blank");
    const htmlContent = `
      <html>
        <head>
          <title>Attendance Report - Prestige Heights</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 35px; color: #1e293b; background: #fff; }
            h1 { color: #ea580c; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 6px; font-size: 26px; }
            .meta { margin-bottom: 30px; font-size: 13px; color: #64748b; font-weight: 500; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px 16px; text-align: left; font-size: 13px; }
            th { background: #f8fafc; font-weight: 700; color: #475569; }
            td { color: #334155; }
            .status { background: #dcfce7; color: #15803d; border-radius: 9999px; padding: 3px 10px; font-size: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Attendance Report</h1>
          <div class="meta">Generated on ${new Date().toLocaleDateString('en-GB')} | Filter Range: ${selectedRange === '7d' ? 'Past 7 Days' : selectedRange === '30d' ? 'Past 30 Days' : 'Custom Date Range'}</div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Present</th>
                <th>Half Day</th>
                <th>Leave</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredReports.map(r => `
                <tr>
                  <td><strong>${r.date}</strong></td>
                  <td style="color:#16a34a; font-weight:600;">${r.present}</td>
                  <td style="color:#ca8a04; font-weight:600;">${r.halfDay}</td>
                  <td style="color:#475569; font-weight:600;">${r.leave}</td>
                  <td><span class="status">${r.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    showToast("📄 PDF Report template generated! Triggering print dialog.");
  };

  return (
    <div className="p-5 space-y-6 animate-fade-in bg-slate-50/30 pb-[150px]">
      <div>
        <h3 className="font-extrabold text-slate-800 text-lg">Attendance Reports</h3>
        <p className="text-xs text-slate-500 mt-0.5">Access history and export records</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
        <button
          onClick={() => setSelectedRange('7d')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition ${
            selectedRange === '7d' ? 'bg-[#ea580c] text-white shadow' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past 7 Days
        </button>
        <button
          onClick={() => setSelectedRange('30d')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition ${
            selectedRange === '30d' ? 'bg-[#ea580c] text-white shadow' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past 30 Days
        </button>
        <button
          onClick={() => setSelectedRange('custom')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition ${
            selectedRange === 'custom' ? 'bg-[#ea580c] text-white shadow' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom range date inputs */}
      {selectedRange === 'custom' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3 animate-fade-in">
          <h4 className="font-bold text-slate-800 text-xs tracking-wide uppercase">Custom Date Range</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase">From</label>
              <input 
                type="date" 
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 text-slate-800 transition"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase">To</label>
              <input 
                type="date" 
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 text-slate-800 transition"
              />
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <h4 className="font-bold text-slate-800 text-xs tracking-wide uppercase">Quick Exports</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleExportExcel}
            className="flex items-center justify-center gap-2 p-3 border border-emerald-100 bg-emerald-50/30 rounded-xl text-emerald-800 hover:bg-emerald-50/60 active:scale-98 transition font-bold text-xs"
          >
            <FileSpreadsheet size={15} />
            Excel sheet (.xlsx)
          </button>
          
          <button 
            onClick={handleExportPDF}
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
          <span className="text-slate-400 font-semibold">{filteredReports.length} reports submitted</span>
        </div>

        <div className="space-y-2.5">
          {filteredReports.map((report, idx) => (
            <div 
              key={report.id || idx}
              onClick={() => setSelectedReport(report)}
              className="bg-white border border-slate-200 hover:border-slate-350 rounded-2xl p-4 shadow-xs flex items-center justify-between cursor-pointer transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-[#ea580c]" />
                  <span className="font-bold text-slate-800 text-xs">{report.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                  <span className="text-emerald-700">P:{report.present}</span>
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
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No reports found. Submit attendance to generate a report.
            </div>
          )}
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[80vh] animate-fade-in">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Attendance Summary</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{selectedReport.date}</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {selectedReport.status}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 text-center">
                  <span className="text-xs text-slate-400 font-bold uppercase block tracking-wider">Present</span>
                  <span className="text-xl font-extrabold text-emerald-600 block mt-1">{selectedReport.present}</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3 text-center">
                  <span className="text-xs text-slate-400 font-bold uppercase block tracking-wider">Half Day</span>
                  <span className="text-xl font-extrabold text-amber-600 block mt-1">{selectedReport.halfDay}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                  <span className="text-xs text-slate-400 font-bold uppercase block tracking-wider">Leave</span>
                  <span className="text-xl font-extrabold text-slate-700 block mt-1">{selectedReport.leave}</span>
                </div>
              </div>

              {/* Department Breakdown */}
              <div className="space-y-3">
                <h5 className="font-bold text-slate-800 text-xs tracking-wider uppercase">Department breakdown</h5>
                <div className="space-y-2">
                  {[
                    { id: 'mason', name: "Mason", iconColor: "bg-orange-100 text-orange-700", head: "Ramesh Kumar" },
                    { id: 'electrical', name: "Electrical", iconColor: "bg-amber-100 text-amber-700", head: "Suresh Patel" },
                    { id: 'plumbing', name: "Plumbing", iconColor: "bg-blue-100 text-blue-700", head: "Amit Singh" },
                    { id: 'fabrication', name: "Fabrication", iconColor: "bg-teal-100 text-teal-700", head: "Vikram Rao" },
                    { id: 'waterproofing', name: "Waterproofing", iconColor: "bg-emerald-100 text-emerald-700", head: "Karan Johar" },
                    { id: 'carpentry', name: "Carpentry", iconColor: "bg-yellow-100 text-yellow-850", head: "Rajesh Sharma" },
                    { id: 'painting', name: "Painting", iconColor: "bg-rose-100 text-rose-700", head: "Anil Mehta" }
                  ].map((dept, index) => {
                    // Check if report has details for this department
                    const detail = selectedReport.details?.find(d => d.id === dept.id);
                    const actualP = detail ? (detail.present ?? 0) : Math.max(0, Math.ceil(selectedReport.present * (0.3 - index * 0.05)));
                    const actualH = detail ? (detail.halfDay ?? 0) : Math.max(0, Math.ceil(selectedReport.halfDay * (0.25 - index * 0.05)));
                    const actualL = detail ? (detail.leave ?? 0) : Math.max(0, Math.ceil(selectedReport.leave * (0.2 - index * 0.05)));

                    return (
                      <div key={index} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${dept.iconColor}`}>
                            {dept.name[0]}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-xs block">{dept.name}</span>
                            <span className="text-[9px] text-slate-400 font-semibold block">{dept.head}</span>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold space-x-1.5">
                          <span className="text-emerald-600">P{actualP}</span>
                          <span className="text-amber-600">H{actualH}</span>
                          <span className="text-slate-500">L{actualL}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
