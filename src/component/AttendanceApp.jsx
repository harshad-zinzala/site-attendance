import { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, ChevronDown, Sparkles, Trash2, Plus, LogOut, Users, ShieldAlert
} from 'lucide-react';
import DashboardView from './DashboardView';
import ReportsView from './ReportsView';
import Home from './Home';
import BottomNav from './BottomNav';
import Login from './Login';

import { supabase } from '../supabaseClient';
import { createClient } from '@supabase/supabase-js';
import { INITIAL_DEPARTMENTS, INITIAL_REPORTS } from '../mockData';


export default function AttendanceApp() {
  // Navigation: 'attendance' | 'dashboard' | 'reports' | 'more'
  const [activeTab, setActiveTab] = useState('attendance');
  const [rawDepartments, setRawDepartments] = useState(INITIAL_DEPARTMENTS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [toastMessage, setToastMessage] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Additional state for date-wise attendance
  const [dailyAttendance, setDailyAttendance] = useState({});
  const [liveTodayDepartments, setLiveTodayDepartments] = useState(null);

  // Authentication and Roles State
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'master_admin' | 'sub_admin'
  const [subAdmins, setSubAdmins] = useState([]);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubPassword, setNewSubPassword] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Session persistence and auth state listener
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        supabase
          .from('user_roles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data: roleData }) => {
            setUserRole(roleData?.role || 'sub_admin');
          });
      }
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          setUserRole(roleData?.role || 'sub_admin');
        } else {
          setUser(null);
          setUserRole(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Sub Admins
  const fetchSubAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'sub_admin');
      if (error) throw error;
      setSubAdmins(data || []);
    } catch (err) {
      console.error("Failed to fetch sub admins:", err.message);
    }
  };

  useEffect(() => {
    if (userRole === 'master_admin') {
      fetchSubAdmins();
    }
  }, [userRole]);

  const handleLoginSuccess = (userData, role) => {
    setUser(userData);
    setUserRole(role);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    showToast("👋 Logged out successfully!");
  };

  const handleAddSubAdmin = async (e) => {
    e.preventDefault();
    if (!newSubEmail) return;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      // Create secondary client to register sub-admin without swapping the current admin session
      const tempClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false }
      });

      const { data, error } = await tempClient.auth.signUp({
        email: newSubEmail,
        password: newSubPassword || 'sub123'
      });

      if (error) throw error;
      
      showToast(`👤 Sub Admin ${newSubEmail} registered successfully!`);
      setNewSubEmail('');
      setNewSubPassword('');
      fetchSubAdmins();
    } catch (err) {
      console.error("Failed to create sub admin:", err.message);
      showToast(`⚠️ Failed to create Sub Admin: ${err.message}`);
    }
  };

  const handleDeleteSubAdmin = async (subId, subEmail) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', subId);
      if (error) throw error;
      showToast(`Deleted Sub Admin: ${subEmail}`);
      fetchSubAdmins();
    } catch (err) {
      console.error("Failed to delete sub admin:", err.message);
      showToast(`⚠️ Failed to delete Sub Admin.`);
    }
  };

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        // Fetch departments
        const { data: dbDepts, error: deptsError } = await supabase
          .from('departments')
          .select('*');

        if (deptsError) throw deptsError;

        // Fetch reports
        const { data: dbReports, error: reportsError } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;

        let mappedDepts = INITIAL_DEPARTMENTS;
        if (dbDepts && dbDepts.length > 0) {
          mappedDepts = dbDepts.map(d => ({
            id: d.id,
            name: d.name,
            iconColor: d.icon_color,
            head: {
              name: d.head_name,
              role: d.head_role,
              avatar: d.head_avatar
            },
            present: d.present || 0,
            halfDay: d.half_day || 0,
            leave: d.leave || 0
          }));
          setRawDepartments(mappedDepts);
        }
        setLiveTodayDepartments(mappedDepts);

        if (dbReports) {
          const mappedReports = dbReports.map(r => ({
            id: r.id,
            date: r.date,
            marked: r.marked,
            present: r.present,
            halfDay: r.half_day,
            leave: r.leave,
            status: r.status,
            details: r.details
          }));
          setReports(mappedReports);
        }

        console.log("Successfully connected to Supabase and loaded live data!");
      } catch (err) {
        console.error("Failed to load data from Supabase:", err.message);
        setLiveTodayDepartments(INITIAL_DEPARTMENTS);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [resetKey]);

  // Listen to selectedDate changes to load corresponding department attendance
  useEffect(() => {
    if (isLoading || !liveTodayDepartments) return;

    const dateStr = selectedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // 1. Check if we already have dailyAttendance for this date
    if (dailyAttendance[dateStr]) {
      setRawDepartments(dailyAttendance[dateStr]);
      return;
    }

    // 2. Check if there is a report for this date
    const report = reports.find(r => r.date === dateStr);
    if (report) {
      const details = report.details || [];
      const loadedDepts = liveTodayDepartments.map(dept => {
        const detail = details.find(d => d.id === dept.id);
        if (detail) {
          return {
            ...dept,
            present: detail.present ?? 0,
            halfDay: detail.halfDay ?? 0,
            leave: detail.leave ?? 0
          };
        } else {
          // Proportional fallback
          const index = INITIAL_DEPARTMENTS.findIndex(d => d.id === dept.id);
          const p = Math.ceil(report.present * (0.3 - index * 0.05));
          const h = Math.ceil(report.halfDay * (0.25 - index * 0.05));
          const l = Math.ceil(report.leave * (0.2 - index * 0.05));
          return {
            ...dept,
            present: Math.max(0, p),
            halfDay: Math.max(0, h),
            leave: Math.max(0, l)
          };
        }
      });
      setRawDepartments(loadedDepts);
      setDailyAttendance(prev => ({ ...prev, [dateStr]: loadedDepts }));
      return;
    }

    // 3. Check if it's today
    const todayStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    if (dateStr === todayStr) {
      setRawDepartments(liveTodayDepartments);
      return;
    }

    // 4. Otherwise, it's a previous date with no report/draft, so reset counts to 0
    const zeroDepts = liveTodayDepartments.map(dept => ({
      ...dept,
      present: 0,
      halfDay: 0,
      leave: 0
    }));
    setRawDepartments(zeroDepts);
    setDailyAttendance(prev => ({ ...prev, [dateStr]: zeroDepts }));
  }, [selectedDate, reports, isLoading, liveTodayDepartments]);

  // Compute departments list dynamically
  const departments = useMemo(() => {
    return rawDepartments.map(dept => {
      const total = (dept.present || 0) + (dept.halfDay || 0) + (dept.leave || 0);
      return {
        ...dept,
        totalWorkers: total,
        present: dept.present || 0,
        halfDay: dept.halfDay || 0,
        leave: dept.leave || 0,
        unassigned: 0
      };
    });
  }, [rawDepartments]);

  const isSelectedDateToday = () => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  // Bulk update statuses for a department
  const bulkUpdateWorkerStatus = async (deptId, count, status) => {
    const dateStr = selectedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // 1. Update local state
    let updatedDepts = [];
    setRawDepartments(prev => {
      const updated = prev.map(d => {
        if (d.id === deptId) {
          const update = {};
          if (status === 'P') update.present = count;
          else if (status === 'H') update.halfDay = count;
          else if (status === 'L') update.leave = count;
          return { ...d, ...update };
        }
        return d;
      });
      updatedDepts = updated;

      // Update dailyAttendance map
      setDailyAttendance(prevDaily => ({
        ...prevDaily,
        [dateStr]: updated
      }));

      // If today is selected, sync liveTodayDepartments
      if (isSelectedDateToday()) {
        setLiveTodayDepartments(updated);
      }

      return updated;
    });

    // 2. Sync to DB if today is selected
    if (isSelectedDateToday()) {
      try {
        const dbField = { P: 'present', H: 'half_day', L: 'leave' }[status];
        const { error } = await supabase
          .from('departments')
          .update({ [dbField]: count })
          .eq('id', deptId);
        
        if (error) throw error;
      } catch (err) {
        console.error("Failed to update department attendance:", err.message);
        showToast("⚠️ Sync failed: Could not update database.");
      }
    }
  };

  // Reset statuses of a specific status type in a department to 0
  const resetStatusForDept = async (deptId, status) => {
    const dateStr = selectedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // 1. Update local state
    setRawDepartments(prev => {
      const updated = prev.map(d => {
        if (d.id === deptId) {
          const update = {};
          if (status === 'P') update.present = 0;
          else if (status === 'H') update.halfDay = 0;
          else if (status === 'L') update.leave = 0;
          return { ...d, ...update };
        }
        return d;
      });

      // Update dailyAttendance map
      setDailyAttendance(prevDaily => ({
        ...prevDaily,
        [dateStr]: updated
      }));

      // If today is selected, sync liveTodayDepartments
      if (isSelectedDateToday()) {
        setLiveTodayDepartments(updated);
      }

      return updated;
    });

    // 2. Sync to DB if today is selected
    if (isSelectedDateToday()) {
      try {
        const dbField = { P: 'present', H: 'half_day', L: 'leave' }[status];
        const { error } = await supabase
          .from('departments')
          .update({ [dbField]: 0 })
          .eq('id', deptId);
        
        if (error) throw error;
      } catch (err) {
        console.error(`Failed to reset attendance for ${deptId}:`, err.message);
        showToast("⚠️ Sync failed: Could not update database.");
      }
    }
  };

  // Submit attendance and save a new report record
  const submitAttendance = async (overallStats) => {
    const dateStr = selectedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newReport = {
      date: dateStr,
      marked: overallStats.total,
      present: overallStats.present,
      halfDay: overallStats.halfDay,
      leave: overallStats.leave,
      status: 'Submitted',
      details: departments.map(d => ({
        id: d.id,
        present: d.present,
        halfDay: d.halfDay,
        leave: d.leave
      }))
    };

    // 1. Update local state - replace if existing to prevent duplicates
    setReports(prev => {
      const filtered = prev.filter(r => r.date !== dateStr);
      return [newReport, ...filtered];
    });

    // Cache in dailyAttendance
    setDailyAttendance(prev => ({
      ...prev,
      [dateStr]: departments
    }));

    // 2. Save to Supabase
    try {
      const { data: existingReports, error: selectError } = await supabase
        .from('reports')
        .select('id')
        .eq('date', dateStr);

      if (selectError) throw selectError;

      if (existingReports && existingReports.length > 0) {
        const { error: updateError } = await supabase
          .from('reports')
          .update({
            marked: newReport.marked,
            present: newReport.present,
            half_day: newReport.halfDay,
            leave: newReport.leave,
            status: newReport.status,
            details: newReport.details
          })
          .eq('id', existingReports[0].id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('reports')
          .insert([{
            date: newReport.date,
            marked: newReport.marked,
            present: newReport.present,
            half_day: newReport.halfDay,
            leave: newReport.leave,
            status: newReport.status,
            details: newReport.details
          }]);

        if (insertError) throw insertError;
      }
      showToast("🎉 Attendance submitted and saved to cloud database!");
    } catch (err) {
      console.error("Failed to save report:", err.message);
      showToast("⚠️ Attendance submitted, but failed to save to database.");
    }
  };

  // Calculations for overall counts
  const overallStats = useMemo(() => {
    return departments.reduce((acc, dept) => {
      acc.total += dept.totalWorkers;
      acc.present += dept.present;
      acc.halfDay += dept.halfDay;
      acc.leave += dept.leave;
      acc.unassigned += dept.unassigned;
      return acc;
    }, { total: 0, present: 0, halfDay: 0, leave: 0, unassigned: 0 });
  }, [departments]);

  if (!user) {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-white relative">
        {/* Toast Alert Box */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-80 bg-slate-900/95 text-white py-3 px-4 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium border border-slate-700 animate-fade-in">
            <Sparkles size={16} className="text-orange-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
        <Login onLoginSuccess={handleLoginSuccess} showToast={showToast} />
      </div>
    );
  }

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
      <div className="flex-1 min-h-0 overflow-y-auto">
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
                bulkUpdateWorkerStatus={bulkUpdateWorkerStatus}
                resetStatusForDept={resetStatusForDept}
                submitAttendance={submitAttendance}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                userRole={userRole}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView 
                departments={departments} 
                stats={overallStats} 
                showToast={showToast} 
                selectedDate={selectedDate} 
              />
            )}

            {activeTab === 'reports' && (
              <ReportsView reports={reports} showToast={showToast} />
            )}

            {activeTab === 'more' && (
              <div className="p-5 space-y-4 h-full bg-slate-50/20 pb-[150px]">
                <h3 className="font-extrabold text-slate-800 text-lg">Settings & More</h3>
                
                <div className="space-y-2">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Site Details</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Prestige Heights — Site B</p>
                    </div>
                    <MapPin size={18} className="text-orange-600" />
                  </div>
                </div>

                {/* Account Details Info */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs tracking-wider uppercase">Active Session</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Authorized Email:</span>
                    <span className="font-semibold text-slate-850">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Privilege Level:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                      userRole === 'master_admin' ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {userRole === 'master_admin' ? 'Master Admin' : 'Sub Admin'}
                    </span>
                  </div>
                </div>

                {/* Sub Admin Management Panel (Master Admin Only) */}
                {userRole === 'master_admin' && (
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Users size={16} className="text-orange-600" />
                      <h4 className="font-bold text-slate-850 text-sm">Manage Sub Admins</h4>
                    </div>

                    {/* Add Sub Admin Form */}
                    <form onSubmit={handleAddSubAdmin} className="space-y-2">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Add Sub Admin Account</div>
                      <input 
                        type="email" 
                        placeholder="subadmin@company.com" 
                        value={newSubEmail}
                        onChange={(e) => setNewSubEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 text-slate-800"
                      />
                      <input 
                        type="password" 
                        placeholder="Password (default: sub123)" 
                        value={newSubPassword}
                        onChange={(e) => setNewSubPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 text-slate-800"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition"
                      >
                        <Plus size={13} />
                        <span>Register Sub Admin</span>
                      </button>
                    </form>

                    {/* List of Sub Admins */}
                    <div className="space-y-2.5 pt-2">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Registered Sub Admins ({subAdmins.length})</div>
                      <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1">
                        {subAdmins.map((admin) => (
                          <div key={admin.id} className="flex items-center justify-between bg-slate-50 border border-slate-150 p-2.5 rounded-xl text-xs">
                            <span className="font-medium text-slate-700 truncate mr-2">{admin.email}</span>
                            <button 
                              onClick={() => handleDeleteSubAdmin(admin.id, admin.email)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition shrink-0 cursor-pointer"
                              title="Delete sub admin"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                        {subAdmins.length === 0 && (
                          <div className="text-center py-4 text-[10px] text-slate-400 font-semibold italic">
                            No Sub Admins registered.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Device Configurations & Sign Out */}
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
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-700 hover:bg-slate-50 font-bold"
                  >
                    <span className="flex items-center gap-1 text-slate-800"><LogOut size={13} /> Sign Out</span>
                    <ChevronDown size={14} className="-rotate-90 text-slate-400" />
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
