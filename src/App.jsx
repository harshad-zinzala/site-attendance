import AttendanceApp from './component/AttendanceApp';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-0 md:p-4 font-sans select-none">
      {/* 
        Responsive Wrapper for Mobile-First App Layout:
        - Mobile (Default): w-full h-screen (taking full screen real estate natively)
        - Tablet/Desktop (md: and up): w-full max-w-md h-[844px] centered with a phone chassis shadow and borders
        
        Future Extension to Tablet / Desktop:
        - When ready to design tablet & desktop layouts, simply change/expand the max-width and height classes 
          (e.g., md:max-w-3xl for tablet, lg:max-w-7xl for desktop) and add Tailwind's responsive prefixes 
          (md:grid-cols-2, lg:flex-row, etc.) inside the child components.
      */}
      <div className="w-full md:max-w-md h-screen md:h-[844px] bg-[#fbfbf9] md:rounded-[40px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] md:border-[8px] md:border-slate-950 relative overflow-hidden flex flex-col">
        {/* Application Inner Screen */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col relative">
          <AttendanceApp />
        </div>
      </div>
    </div>
  );
}

export default App;

