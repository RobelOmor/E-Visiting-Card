import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle, UserPlus, Sparkles, Scan, Flashlight } from 'lucide-react';
import { Language, SavedContact } from '../types/card';
import { useTranslation } from '../utils/translations';

interface ScannerSimulatorProps {
  lang: Language;
  onSaveScannedContact: (contact: SavedContact) => void;
}

export const ScannerSimulator: React.FC<ScannerSimulatorProps> = ({
  lang,
  onSaveScannedContact,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [hasScanned, setHasScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const t = useTranslation(lang);

  const sampleDetected = {
    name: 'Kazi Naimur Rahman',
    title: 'Managing Director & CEO',
    company: 'Fintech Genesis Global',
    phone: '+880 1715-998877',
    email: 'naimur@genesisglobal.net',
    address: 'Gulshan Avenue, Dhaka',
    themeColor: '#0EA5E9'
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning && !hasScanned) {
      timer = setTimeout(() => {
        setIsScanning(false);
        setHasScanned(true);
      }, 2400);
    }
    return () => clearTimeout(timer);
  }, [isScanning, hasScanned]);

  const handleRescan = () => {
    setHasScanned(false);
    setIsScanning(true);
  };

  const handleSaveToWallet = () => {
    const contact: SavedContact = {
      id: `scanned_${Date.now()}`,
      name: sampleDetected.name,
      title: sampleDetected.title,
      company: sampleDetected.company,
      phone: sampleDetected.phone,
      email: sampleDetected.email,
      whatsapp: sampleDetected.phone,
      themeColor: sampleDetected.themeColor,
      metAt: 'Scanned Card via AI OCR',
      savedDate: new Date().toISOString().split('T')[0]
    };
    onSaveScannedContact(contact);
  };

  return (
    <div className="w-full flex flex-col p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            {t.scannerTitle}
          </h2>
          <p className="text-[11px] text-slate-400">
            {t.scannerInstruction}
          </p>
        </div>

        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`p-2 rounded-xl transition-colors cursor-pointer ${
            flashOn ? 'bg-amber-400 text-slate-950' : 'bg-neutral-800 text-slate-300'
          }`}
          title="Flashlight"
        >
          <Flashlight className="w-4 h-4" />
        </button>
      </div>

      {/* Simulated Camera Viewfinder */}
      <div className="relative w-full h-64 bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 flex items-center justify-center shadow-inner">
        {/* Mock camera background grain/pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Physical Visiting Card under camera */}
        <div className="relative z-10 w-64 h-36 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 rounded-xl p-3 shadow-2xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                {sampleDetected.company}
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {sampleDetected.name}
              </div>
              <div className="text-[10px] text-slate-400">
                {sampleDetected.title}
              </div>
            </div>
            <div className="w-6 h-6 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">
              FG
            </div>
          </div>

          <div className="text-[9px] text-slate-400 space-y-0.5 font-mono">
            <div>{sampleDetected.phone}</div>
            <div>{sampleDetected.email}</div>
          </div>
        </div>

        {/* Viewfinder Target Reticle Frame */}
        <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
            <div className="w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
          </div>
          <div className="flex justify-between">
            <div className="w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
            <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />
          </div>
        </div>

        {/* Animated Laser Scanning Beam */}
        {isScanning && (
          <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10B981] animate-[bounce_2s_infinite]" />
        )}

        {/* Status Pill Badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-slate-200 border border-white/10 flex items-center gap-1.5">
          {isScanning ? (
            <>
              <Scan className="w-3 h-3 text-emerald-400 animate-spin" />
              <span>{t.scanningCard}</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300">{t.scanComplete}</span>
            </>
          )}
        </div>
      </div>

      {/* OCR Result Card */}
      {hasScanned && (
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'স্বয়ংক্রিয় কার্ড ডিটেকশন' : 'AI OCR Detected Details'}
            </span>
            <button
              onClick={handleRescan}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{lang === 'bn' ? 'আবার স্ক্যান' : 'Rescan'}</span>
            </button>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs space-y-1">
            <div className="font-bold text-white text-sm">{sampleDetected.name}</div>
            <div className="text-slate-400">{sampleDetected.title} · {sampleDetected.company}</div>
            <div className="text-slate-300 font-mono text-[11px]">{sampleDetected.phone}</div>
            <div className="text-slate-300 text-[11px]">{sampleDetected.email}</div>
          </div>

          <button
            onClick={handleSaveToWallet}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t.addToContacts}</span>
          </button>
        </div>
      )}
    </div>
  );
};
