import { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, ChevronDown, Sparkles
} from 'lucide-react';
import DashboardView from './DashboardView';
import ReportsView from './ReportsView';
import WorkersView from './WorkersView';
import Home from './Home';
import BottomNav from './BottomNav';

import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { INITIAL_DEPARTMENTS, INITIAL_WORKERS, INITIAL_REPORTS } from '../mockData';


export default function AttendanceApp() {
  // Navigation: 'attendance' | 'dashboard' | 'reports' | 'workers' | 'more'
  const [activeTab, setActiveTab] = useState('attendance');
  const [rawDepartments, setRawDepartments] = useState(INITIAL_DEPARTMENTS);
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [isDbMode, setIsDbMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [toastMessage, setToastMessage] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load data from Supabase or fallback to mockData
  useEffect(() => {
    async function loadData() {
      if (!isSupabaseConfigured) {
        console.log("Supabase is not configured. Running in Demo Mode with local mock data.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch departments
        const { data: dbDepts, error: deptsError } = await supabase
          .from('departments')
          .select('*');

        if (deptsError) throw deptsError;

        // Fetch workers
        const { data: dbWorkers, error: workersError } = await supabase
          .from('workers')
          .select('*');

        if (workersError) throw workersError;

        // Fetch reports
        const { data: dbReports, error: reportsError } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;

        if (dbDepts && dbDepts.length > 0) {
          const mappedDepts = dbDepts.map(d => ({
            id: d.id,
            name: d.name,
            iconColor: d.icon_color,
            head: {
              name: d.head_name,
              role: d.head_role,
              avatar: d.head_avatar
            }
          }));
          setRawDepartments(mappedDepts);
        }

        if (dbWorkers && dbWorkers.length > 0) {
          const mappedWorkers = dbWorkers.map(w => ({
            id: w.id,
            name: w.name,
            deptId: w.dept_id,
            status: w.status,
            avatar: w.avatar
          }));
          setWorkers(mappedWorkers);
        }

        if (dbReports) {
          const mappedReports = dbReports.map(r => ({
            id: r.id,
            date: r.date,
            marked: r.marked,
            present: r.present,
            absent: r.absent,
            halfDay: r.half_day,
            leave: r.leave,
            status: r.status
          }));
          setReports(mappedReports);
        }

        setIsDbMode(true);
        console.log("Successfully connected to Supabase and loaded live data!");
      } catch (err) {
        console.error("Failed to load data from Supabase. Falling back to local mock data:", err.message);
        setIsDbMode(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [resetKey]);

  // Compute departments list dynamically based on workers state
  const departments = useMemo(() => {
    return rawDepartments.map(dept => {
      const deptWorkers = workers.filter(w => w.deptId === dept.id);
      
      const present = deptWorkers.filter(w => w.status === 'P').length;
      const absent = deptWorkers.filter(w => w.status === 'A').length;
      const halfDay = deptWorkers.filter(w => w.status === 'H').length;
      const leave = deptWorkers.filter(w => w.status === 'L').length;
      const unassigned = deptWorkers.filter(w => w.status === 'unassigned').length;

      return {
        ...dept,
        totalWorkers: deptWorkers.length,
        present,
        absent,
        halfDay,
        leave,
        unassigned
      };
    });
  }, [rawDepartments, workers]);

  // Update a single worker's status
  const updateWorkerStatus = async (workerId, newStatus) => {
    // 1. Update local state
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, status: newStatus } : w));

    // 2. Sync to DB if enabled
    if (isDbMode) {
      try {
        const { error } = await supabase
          .from('workers')
          .update({ status: newStatus })
          .eq('id', workerId);
        
        if (error) throw error;
      } catch (err) {
        console.error(`Failed to update worker status for ${workerId}:`, err.message);
        showToast("⚠️ Sync failed: Could not update database.");
      }
    }
  };

  // Bulk update worker statuses for a department
  const bulkUpdateWorkerStatus = async (deptId, count, status) => {
    const deptWorkers = workers.filter(w => w.deptId === deptId);
    
    // Prioritize updating unassigned workers first, then others if needed
    const unassigned = deptWorkers.filter(w => w.status === 'unassigned');
    const others = deptWorkers.filter(w => w.status !== 'unassigned');
    
    const workersToUpdate = [...unassigned, ...others].slice(0, count);
    const workerIdsToUpdate = workersToUpdate.map(w => w.id);

    if (workerIdsToUpdate.length === 0) return;

    // 1. Update local state
    setWorkers(prev => prev.map(w => {
      if (workerIdsToUpdate.includes(w.id)) {
        return { ...w, status };
      }
      return w;
    }));

    // 2. Sync to DB if enabled
    if (isDbMode) {
      try {
        const { error } = await supabase
          .from('workers')
          .update({ status })
          .in('id', workerIdsToUpdate);
        
        if (error) throw error;
      } catch (err) {
        console.error("Failed to bulk update worker statuses:", err.message);
        showToast("⚠️ Sync failed: Bulk update not saved to cloud.");
      }
    }
  };

  // Submit attendance and save a new report record
  const submitAttendance = async (overallStats) => {
    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newReport = {
      date: dateStr,
      marked: overallStats.total - overallStats.unassigned,
      present: overallStats.present,
      absent: overallStats.absent,
      halfDay: overallStats.halfDay,
      leave: overallStats.leave,
      status: 'Submitted'
    };

    // 1. Update local state
    setReports(prev => [newReport, ...prev]);

    // 2. Save to Supabase
    if (isDbMode) {
      try {
        const { error } = await supabase
          .from('reports')
          .insert([{
            date: newReport.date,
            marked: newReport.marked,
            present: newReport.present,
            absent: newReport.absent,
            half_day: newReport.halfDay,
            leave: newReport.leave,
            status: newReport.status
          }]);
        
        if (error) throw error;
        showToast("🎉 Attendance submitted and saved to cloud database!");
      } catch (err) {
        console.error("Failed to save report:", err.message);
        showToast("⚠️ Attendance submitted, but failed to save to database.");
      }
    } else {
      showToast("🎉 Attendance submitted successfully (Demo Mode)!");
    }
  };

  // Reset database state to defaults
  const resetDemoState = async () => {
    // 1. Reset local state
    setRawDepartments(INITIAL_DEPARTMENTS);
    setWorkers(INITIAL_WORKERS);
    setReports(INITIAL_REPORTS);
    setNotificationCount(3);

    // 2. Reset Supabase
    if (isDbMode) {
      try {
        showToast("🔄 Syncing defaults to database...");
        
        // Reset worker statuses to default
        for (const initialWorker of INITIAL_WORKERS) {
          await supabase
            .from('workers')
            .update({ status: initialWorker.status })
            .eq('id', initialWorker.id);
        }

        // Clean up excess reports
        const initialDates = INITIAL_REPORTS.map(r => r.date);
        await supabase
          .from('reports')
          .delete()
          .not('date', 'in', `(${initialDates.map(d => `'${d}'`).join(',')})`);

        showToast("🔄 Database reset to default demo state!");
      } catch (err) {
        console.error("Failed to reset database:", err.message);
        showToast("⚠️ State reset locally, but database sync failed.");
      }
    } else {
      showToast("🔄 App state reset to defaults (Demo Mode).");
    }

    setResetKey(prev => prev + 1);
  };

  // Calculations for overall counts
  const overallStats = useMemo(() => {
    return departments.reduce((acc, dept) => {
      acc.total += dept.totalWorkers;
      acc.present += dept.present;
      acc.absent += dept.absent;
      acc.halfDay += dept.halfDay;
      acc.leave += dept.leave;
      acc.unassigned += dept.unassigned;
      return acc;
    }, { total: 0, present: 0, absent: 0, halfDay: 0, leave: 0, unassigned: 0 });
  }, [departments]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white relative">
      {/* Toast Alert Box */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-80 bg-slate-900/95 text-white py-3 px-4 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium border border-slate-700 animate-fade-in">
          <Sparkles size={16} className="text-orange-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* RENDER VIEW BASED ON TAB */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-3">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider animate-pulse">Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'attendance' && (
              <Home 
                key={resetKey}
                departments={departments}
                overallStats={overallStats}
                showToast={showToast}
                notificationCount={notificationCount}
                setNotificationCount={setNotificationCount}
                bulkUpdateWorkerStatus={bulkUpdateWorkerStatus}
                submitAttendance={submitAttendance}
                isDbMode={isDbMode}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView departments={departments} stats={overallStats} showToast={showToast} />
            )}

            {activeTab === 'reports' && (
              <ReportsView reports={reports} showToast={showToast} />
            )}

            {activeTab === 'workers' && (
              <WorkersView 
                departments={departments} 
                workers={workers} 
                updateWorkerStatus={updateWorkerStatus} 
                showToast={showToast} 
              />
            )}

            {activeTab === 'more' && (
              <div className="p-5 space-y-4 h-full">
                <h3 className="font-extrabold text-slate-800 text-lg">Settings & More</h3>
                
                <div className="space-y-2">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Site Details</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Prestige Heights — Site B</p>
                    </div>
                    <MapPin size={18} className="text-orange-600" />
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Global Sync State</h4>
                      <p className={`text-xs mt-0.5 font-bold ${isDbMode ? 'text-emerald-600' : 'text-slate-505'}`}>
                        {isDbMode ? 'Connected to Supabase DB' : 'Demo Mode (Offline/Local)'}
                      </p>
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full ${isDbMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => showToast("Profile settings opened.")}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-700 hover:bg-slate-50 border-b border-slate-100"
                  >
                    <span className="font-semibold">User Profile Settings</span>
                    <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                  </button>
                  <button 
                    onClick={() => showToast("Device configurations updated.")}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-700 hover:bg-slate-50 border-b border-slate-100"
                  >
                    <span className="font-semibold">Device Configuration</span>
                    <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                  </button>
                  <button 
                    onClick={resetDemoState}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs text-rose-600 hover:bg-rose-50/50 font-bold"
                  >
                    <span>Reset Demo State</span>
                    <ChevronDown size={14} className="-rotate-90 text-rose-400" />
                  </button>
                </div>

                <div className="text-center py-6">
                  <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                    ATPL Sec-6 • v1.0.0
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 8. Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
