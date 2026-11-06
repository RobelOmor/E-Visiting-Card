import React, { useState } from 'react';
import { Wifi, X, Smartphone, CheckCircle, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CardData, Language } from '../types/card';
import { useTranslation } from '../utils/translations';

interface NfcShareModalProps {
  card: CardData;
  lang: Language;
  onClose: () => void;
  onSuccess: () => void;
}

export const NfcShareModal: React.FC<NfcShareModalProps> = ({
  card,
  lang,
  onClose,
  onSuccess,
}) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslation(lang);

  const triggerNfcBeam = () => {
    setIsTransmitting(true);

    // Audio feedback using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 880Hz beep
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext not available or blocked
    }

    // Vibration API if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    setTimeout(() => {
      setIsTransmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl p-6 text-slate-100 flex flex-col items-center shadow-2xl relative animate-in slide-in-from-bottom duration-300"
      >
        {/* Android Sheet Top Drag Handle */}
        <div className="w-10 h-1 bg-neutral-700 rounded-full mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2 text-emerald-400">
          <Wifi className="w-5 h-5 rotate-90" />
          <span className="text-xs font-semibold tracking-wider uppercase">Android NFC Beam</span>
        </div>

        <h3 className="text-lg font-bold text-center text-white mb-1">
          {t.nfcTitle}
        </h3>
        <p className="text-xs text-slate-400 text-center max-w-[260px] mb-6">
          {t.nfcInstruction}
        </p>

        {/* Animated NFC Phone Waves Simulation */}
        <div className="relative w-44 h-44 flex items-center justify-center my-2">
          {/* Pulsing Concentric Radar Rings */}
          <div className={`absolute inset-0 rounded-full border border-emerald-500/20 ${isTransmitting ? 'animate-ping' : ''}`} />
          <div className="absolute inset-4 rounded-full border border-emerald-500/30 animate-pulse" />
          <div className="absolute inset-10 rounded-full bg-emerald-500/10 backdrop-blur-sm" />

          {/* Central Phone Device Icon */}
          <div className="relative z-10 w-20 h-32 bg-neutral-800 border-2 border-emerald-400/80 rounded-2xl p-1.5 flex flex-col items-center justify-between shadow-lg shadow-emerald-500/20">
            <div className="w-3 h-0.5 bg-neutral-600 rounded-full" />
            
            <div className="flex flex-col items-center">
              {isSuccess ? (
                <CheckCircle className="w-7 h-7 text-emerald-400 animate-bounce" />
              ) : isTransmitting ? (
                <Radio className="w-7 h-7 text-emerald-400 animate-spin" />
              ) : (
                <Smartphone className="w-7 h-7 text-emerald-400" />
              )}
              <span className="text-[9px] font-bold text-slate-300 mt-1">
                {isSuccess ? 'Transmitted' : isTransmitting ? 'Beaming...' : 'Ready'}
              </span>
            </div>

            <div className="w-4 h-0.5 bg-neutral-600 rounded-full" />
          </div>
        </div>

        {/* Status Message */}
        {isSuccess ? (
          <div className="my-3 py-2 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-medium">
            {t.nfcSuccess}
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 mt-2">
            Target: <span className="text-slate-200 font-mono font-medium">{card.name}</span> ({card.company})
          </div>
        )}

        {/* Action Button */}
        <div className="w-full mt-6 space-y-2">
          {!isSuccess ? (
            <button
              onClick={triggerNfcBeam}
              disabled={isTransmitting}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Wifi className="w-4 h-4 rotate-90" />
              <span>{isTransmitting ? 'Transmitting via NFC...' : t.nfcSimulateTap}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Done / বন্ধ করুন
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
