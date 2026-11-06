import React from 'react';
import { Eye, Wifi, QrCode, Download, TrendingUp, BarChart3, Smartphone, Share2 } from 'lucide-react';
import { CardData, Language } from '../types/card';
import { useTranslation } from '../utils/translations';

interface AnalyticsViewProps {
  card: CardData;
  lang: Language;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  card,
  lang,
}) => {
  const t = useTranslation(lang);

  const stats = [
    {
      label: t.totalViews,
      value: card.stats.views.toLocaleString(),
      sub: '+14% this week',
      icon: Eye,
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20'
    },
    {
      label: t.nfcTaps,
      value: card.stats.taps.toLocaleString(),
      sub: '+22% vs last week',
      icon: Wifi,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20'
    },
    {
      label: t.qrScans,
      value: card.stats.qrScans.toLocaleString(),
      sub: '42 scans in Dhaka',
      icon: QrCode,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20'
    },
    {
      label: t.contactsDownloaded,
      value: card.stats.vCardDownloads.toLocaleString(),
      sub: '64% conversion',
      icon: Download,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10 border-purple-400/20'
    }
  ];

  // 7-day bar chart mock data
  const days = [
    { day: 'Sat', val: 45 },
    { day: 'Sun', val: 62 },
    { day: 'Mon', val: 95 },
    { day: 'Tue', val: 120 },
    { day: 'Wed', val: 88 },
    { day: 'Thu', val: 140 },
    { day: 'Fri', val: 75 }
  ];
  const maxVal = Math.max(...days.map(d => d.val));

  return (
    <div className="w-full flex flex-col p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          {t.analytics}
        </h2>
        <p className="text-[11px] text-slate-400">
          {lang === 'bn' ? 'আপনার কার্ডের রিয়েল-টাইম এনগেজমেন্ট ও শেয়ার ডেটা' : 'Real-time card engagement & visitor insights'}
        </p>
      </div>

      {/* 2x2 Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-slate-400">{stat.label}</span>
                <div className={`p-1.5 rounded-lg border ${stat.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${stat.color} ${stat.icon === Wifi ? 'rotate-90' : ''}`} />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-white font-mono tracking-tight">{stat.value}</div>
                <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{stat.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 7-Day Activity Chart */}
      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            {t.viewsOverTime}
          </span>
          <span className="text-[10px] text-slate-400">Total 625</span>
        </div>

        <div className="h-28 flex items-end justify-between gap-2 pt-4 px-1">
          {days.map((item, idx) => {
            const heightPercent = Math.round((item.val / maxVal) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="text-[9px] font-mono text-slate-400">{item.val}</div>
                <div 
                  className="w-full max-w-[20px] rounded-t-lg bg-emerald-500/80 hover:bg-emerald-400 transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[9px] text-slate-400">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel Share Breakdown */}
      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-2.5">
        <span className="text-xs font-bold text-white block">
          {t.channelDistribution}
        </span>

        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Wifi className="w-3 h-3 rotate-90 text-emerald-400" />
                NFC Tap Beams
              </span>
              <span className="font-mono text-emerald-400">46%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '46%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <QrCode className="w-3 h-3 text-amber-400" />
                Camera QR Scans
              </span>
              <span className="font-mono text-amber-400">38%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '38%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Share2 className="w-3 h-3 text-sky-400" />
                WhatsApp & Web Links
              </span>
              <span className="font-mono text-sky-400">16%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-sky-400 rounded-full" style={{ width: '16%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
