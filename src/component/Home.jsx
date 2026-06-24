import { useState, useMemo } from 'react';
import Header from './Header';
import AttendanceStats from './AttendanceStats';
import SearchBar from './SearchBar';
import ModeSelector from './ModeSelector';
import DepartmentsList from './DepartmentsList';
import SubmitBar from './SubmitBar';

export default function Home({
  departments,
  overallStats,
  showToast,
  bulkUpdateWorkerStatus,
  resetStatusForDept,
  submitAttendance,
  isDbMode,
  selectedDate,
  setSelectedDate,
  userRole
}) {
  const [expandedDeptId, setExpandedDeptId] = useState('mason');
  const [searchText, setSearchText] = useState('');

  // Selection/editing state for the expanded department
  const [step1Count, setStep1Count] = useState(0);
  const [step2Status, setStep2Status] = useState('P'); // 'P' | 'A' | 'H' | 'L'
  const [isBulkMode, setIsBulkMode] = useState(true); // Individual vs Bulk/Dept

  // Sync step 1 count with the expanded department's unassigned count when changed
  const handleToggleAccordion = (deptId) => {
    if (expandedDeptId === deptId) {
      setExpandedDeptId(null);
    } else {
      setExpandedDeptId(deptId);
      const dept = departments.find(d => d.id === deptId);
      if (dept) {
        // Default count to 0
        setStep1Count(0);
      }
    }
  };

  // Stepper buttons in Step 1
  const adjustCount = (delta) => {
    setStep1Count(prev => {
      const next = prev + delta;
      if (next < 0) return 0;
      return next;
    });
  };

  const handleStatusChange = (status) => {
    setStep2Status(status);
    setStep1Count(0);
    if (expandedDeptId) {
      resetStatusForDept(expandedDeptId, status);
    }
  };

  // Action: Mark worker counts as selected status
  const handleMarkAttendance = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    if (!dept) return;

    if (step1Count === 0) {
      showToast("Please select at least 1 worker to mark.");
      return;
    }

    bulkUpdateWorkerStatus(deptId, step1Count, step2Status);

    const statusNames = { P: 'Present', H: 'Half Day', L: 'Leave' };
    showToast(`Successfully marked ${step1Count} workers as ${statusNames[step2Status]} in ${dept.name}!`);

    // Reset step 1 count to 0
    setStep1Count(0);
  };

  // Submit all attendance action
  const handleSubmitAllAttendance = () => {
    submitAttendance(overallStats);
  };

  // Department completion rates
  const deptProgress = useMemo(() => {
    const totalDepts = departments.length;
    const markedDepts = departments.filter(d => (d.present + d.halfDay + d.leave) > 0).length;
    return {
      marked: markedDepts,
      total: totalDepts,
      pending: totalDepts - markedDepts
    };
  }, [departments]);

  // Filtering list based on search text
  const filteredDepartments = useMemo(() => {
    return departments.filter(d =>
      d.name.toLowerCase().includes(searchText.toLowerCase()) ||
      d.head.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [departments, searchText]);

  // Status mapping helper
  const renderDepartmentStatus = (dept) => {
    return (
      <>
        <span className="text-emerald-600 font-semibold mr-1.5">P{dept.present}</span>
        <span className="text-amber-600 font-semibold mr-1.5">H{dept.halfDay}</span>
        <span className="text-slate-500 font-semibold">L{dept.leave}</span>
      </>
    );
  };

  return (
    <>
      {/* 1. Header Section */}
      <Header
        isDbMode={isDbMode}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* 2. Overall Counts Chips */}
      <AttendanceStats stats={overallStats} />

      {/* 3. Search and Actions bar */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onBulkClick={() => showToast("Bulk edit mode toggled.")}
      />

      {/* 4. Individual vs Bulk Tabs */}


      {/* 5. Notice and Departments Accordion List */}
      <DepartmentsList
        filteredDepartments={filteredDepartments}
        expandedDeptId={expandedDeptId}
        handleToggleAccordion={handleToggleAccordion}
        renderDepartmentStatus={renderDepartmentStatus}
        step1Count={step1Count}
        step2Status={step2Status}
        setStep2Status={handleStatusChange}
        adjustCount={adjustCount}
        handleMarkAttendance={handleMarkAttendance}
      />

      {/* 7. Bottom Sticky Global Action Progress and Submit Buttons */}
      <SubmitBar
        deptProgress={deptProgress}
        onSubmit={handleSubmitAllAttendance}
      />
    </>
  );
}
