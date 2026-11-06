import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Sparkles } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
  appName?: string;
  themeColor?: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isPhoneFrame,
  onToggleFrame,
  appName = 'DigiCard',
  themeColor = '#10B981'
}) => {
  const [timeStr, setTimeStr] = useState('10:35');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12 || 12;
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isPhoneFrame) {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-slate-100">
        {/* Floating control bar to toggle back to phone frame */}
        <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-slate-200">Android Responsive View</span>
            <span className="hidden sm:inline">· Material You OS 15</span>
          </div>
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Switch to Android Phone Shell
          </button>
        </div>
        <div className="w-full max-w-md mx-auto min-h-[calc(100vh-45px)] pb-16">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-4 md:py-8 flex flex-col items-center justify-center">
      {/* Smartphone Outer Casing */}
      <div className="relative w-[390px] h-[810px] max-w-[96vw] max-h-[92vh] bg-neutral-900 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-[5px] border-neutral-800 flex flex-col overflow-hidden">
        
        {/* Outer Phone Hardware Buttons Simulation */}
        <div className="absolute -left-[9px] top-28 w-[4px] h-12 bg-neutral-700 rounded-l-md" />
        <div className="absolute -left-[9px] top-44 w-[4px] h-12 bg-neutral-700 rounded-l-md" />
        <div className="absolute -right-[9px] top-32 w-[4px] h-16 bg-neutral-700 rounded-r-md" />

        {/* Screen Bezel & Display Screen */}
        <div className="relative flex-1 bg-slate-950 text-slate-100 rounded-[38px] overflow-hidden flex flex-col border border-neutral-800/80">
          
          {/* Android Status Bar */}
          <div className="relative z-30 h-8 px-6 pt-1 flex items-center justify-between text-[11px] font-medium text-slate-300 bg-transparent select-none shrink-0">
            {/* Left: Clock */}
            <span className="font-semibold tracking-tight text-white">{timeStr}</span>

            {/* Center: Punch-Hole Camera Cutout & Speaker */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-black rounded-full ring-2 ring-neutral-800/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
              </div>
            </div>

            {/* Right: Connectivity Icons & Battery */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold tracking-tighter text-emerald-400">5G</span>
              <Signal className="w-3 h-3 text-slate-300" />
              <Wifi className="w-3 h-3 text-slate-300" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">92%</span>
                <BatteryMedium className="w-3.5 h-3.5 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Android App Viewport Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Android Gesture Navigation Bar */}
          <div className="h-4 bg-transparent flex items-center justify-center shrink-0 z-30 pointer-events-none select-none">
            <div className="w-32 h-1 bg-slate-500/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
