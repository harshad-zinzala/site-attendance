import { useState } from 'react';
import { Smartphone, Tablet, Monitor, Info } from 'lucide-react';

export default function DeviceWrapper({ children, activeMode, setActiveMode }) {
  const [showTips, setShowTips] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      {/* Device Switcher Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white shadow-inner">
            A
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight leading-none text-white">ATPL Attendance System</h1>
            <p className="text-xs text-slate-400 mt-1">Multi-Device Preview Mode</p>
          </div>
        </div>

        {/* Mode Switchers */}
        <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 shadow-lg">
          <button
            onClick={() => setActiveMode('mobile')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'mobile'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Mobile View"
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Mobile (390px)</span>
          </button>
          <button
            onClick={() => setActiveMode('tablet')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'tablet'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Tablet View"
          >
            <Tablet size={14} />
            <span className="hidden sm:inline">Tablet (768px)</span>
          </button>
          <button
            onClick={() => setActiveMode('desktop')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'desktop'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Desktop View"
          >
            <Monitor size={14} />
            <span className="hidden sm:inline">Desktop (Full)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-400 font-medium">Fully Interactive</span>
        </div>
      </header>

      {/* Info Banner */}
      {showTips && (
        <div className="bg-orange-950/40 border-b border-orange-900/50 px-4 py-2 flex items-center justify-between text-xs text-orange-200">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-orange-400 shrink-0" />
            <span>
              <strong>Tip:</strong> Double-click the <strong>"-" or "+"</strong> buttons to step, or tap <strong>P / A / H / L</strong> and hit the orange action button. Try searching workers too!
            </span>
          </div>
          <button 
            onClick={() => setShowTips(false)}
            className="text-orange-400 hover:text-orange-200 font-semibold px-1 rounded transition"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Frame Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-900 overflow-auto">
        {activeMode === 'mobile' && (
          /* Realistic Smartphone Wrapper (iPhone-like) */
          <div className="relative mx-auto my-2 animate-fade-in">
            {/* Phone Chassis Outer */}
            <div className="w-[390px] h-[844px] bg-slate-950 rounded-[50px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[3px] border-slate-700/80 flex flex-col overflow-hidden ring-1 ring-slate-800">
              
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-slate-900/60 rounded-full ml-auto mr-4 border border-slate-850"></div>
              </div>

              {/* Status bar spacers and indicators */}
              <div className="h-9 bg-white text-slate-900 flex items-center justify-between px-8 text-[11px] font-semibold select-none rounded-t-[40px] shrink-0 pt-1">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 12V3z" opacity="0.3"/>
                    <path d="M12 3v9l7.03 5.61C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
                  </svg>
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-slate-800 rounded-sm p-[1px] flex items-center">
                    <div className="bg-slate-800 h-full w-3.5 rounded-2xs"></div>
                  </div>
                </div>
              </div>

              {/* Main application screen wrapper */}
              <div className="flex-1 bg-[#fbfbf9] text-slate-800 overflow-y-auto overflow-x-hidden relative rounded-b-[40px] flex flex-col">
                {children}
              </div>
            </div>
            {/* Decorative home bar/indicator at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800/80 rounded-full z-50 pointer-events-none"></div>
          </div>
        )}

        {activeMode === 'tablet' && (
          /* Tablet Wrapper */
          <div className="relative mx-auto animate-fade-in">
            <div className="w-[768px] h-[1024px] bg-slate-950 rounded-[32px] p-[16px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[3px] border-slate-700/80 flex flex-col overflow-hidden ring-1 ring-slate-800">
              {/* Tablet screen wrapper */}
              <div className="flex-1 bg-[#fbfbf9] text-slate-800 overflow-y-auto overflow-x-hidden relative rounded-xl flex flex-col">
                {children}
              </div>
            </div>
            {/* Tablet Camera notch */}
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rounded-full z-50"></div>
          </div>
        )}

        {activeMode === 'desktop' && (
          /* Full Desktop View, takes up container width */
          <div className="w-full max-w-6xl h-[85vh] bg-[#fbfbf9] rounded-2xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden text-slate-800 animate-fade-in">
            <div className="flex-1 overflow-auto flex flex-col">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
