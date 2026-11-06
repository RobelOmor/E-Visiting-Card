import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  QrCode, 
  Download, 
  RotateCw, 
  CheckCircle2, 
  Wifi, 
  Share2, 
  Linkedin, 
  Github, 
  Twitter, 
  Facebook, 
  Send,
  CreditCard,
  MessageCircle
} from 'lucide-react';
import { CardData, Language } from '../types/card';
import { CARD_THEMES } from '../utils/mockData';
import { downloadVCard, generateQRSVGMatrix } from '../utils/vcard';
import { useTranslation } from '../utils/translations';

interface DigitalVisitingCardProps {
  card: CardData;
  lang: Language;
  onOpenQR: () => void;
  onOpenNFC: () => void;
  onShare: () => void;
}

export const DigitalVisitingCard: React.FC<DigitalVisitingCardProps> = ({
  card,
  lang,
  onOpenQR,
  onOpenNFC,
  onShare,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const t = useTranslation(lang);

  const currentTheme = CARD_THEMES.find(t => t.id === card.themeId) || CARD_THEMES[0];
  const qrMatrix = generateQRSVGMatrix(`BEGIN:VCARD\nFN:${card.name}\nTEL:${card.phone}\nEMAIL:${card.email}`);

  // Display bilingual name & title based on selected language
  const displayName = lang === 'bn' && card.nameBn ? card.nameBn : card.name;
  const displayTitle = lang === 'bn' && card.titleBn ? card.titleBn : card.title;
  const displayCompany = lang === 'bn' && card.companyBn ? card.companyBn : card.company;

  const handleFlip = (e: React.MouseEvent) => {
    // Only flip if not clicking a button/link inside card
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadVCard(card);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Flippable Card Container */}
      <div 
        className="w-full max-w-[340px] h-[490px] cursor-pointer perspective-1000 select-none"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= CARD FRONT ================= */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-3xl p-6 shadow-2xl border flex flex-col justify-between overflow-hidden backface-hidden ${currentTheme.frontBg} ${currentTheme.borderClass}`}
          >
            {/* Background Texture Overlay */}
            {card.themeId === 'executive_obsidian' ? (
              <div 
                className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url('/src/assets/images/card_bg_abstract_1793990041643.jpg')` }}
              />
            ) : (
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            )}

            {/* Glowing Accent Ambient Light */}
            <div 
              className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{ backgroundColor: card.accentColor }}
            />

            {/* Card Header: Brand, NFC Chip & Verified status */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider shadow-inner"
                  style={{ backgroundColor: `${card.accentColor}25`, color: card.accentColor }}
                >
                  {card.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className={`text-xs font-semibold tracking-wide uppercase ${currentTheme.textColor}`}>
                    {displayCompany}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Wifi className="w-2.5 h-2.5 rotate-90 text-emerald-400" />
                    <span>NFC Enabled</span>
                  </div>
                </div>
              </div>

              {/* NFC Contactless Symbol & Flip Button */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                  title={t.tapToFlip}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Middle Section: Avatar & Profile Bio */}
            <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
              <div className="relative mb-3">
                <div 
                  className="w-24 h-24 rounded-2xl overflow-hidden p-0.5 shadow-xl border-2"
                  style={{ borderColor: `${card.accentColor}90` }}
                >
                  <img
                    src={card.avatarUrl}
                    alt={card.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[14px]"
                    onError={(e) => {
                      // Fallback avatar if URL fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                {card.isVerified && (
                  <div 
                    className="absolute -bottom-1 -right-1 p-1 bg-neutral-900 rounded-full shadow"
                    title="Verified Professional"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <h2 className={`text-xl font-bold tracking-tight ${currentTheme.textColor}`}>
                {displayName}
              </h2>
              <p className={`text-xs font-medium mt-1 ${currentTheme.accentClass}`}>
                {displayTitle}
              </p>
              <p className={`text-[11px] mt-2 px-4 line-clamp-2 leading-relaxed ${currentTheme.subTextColor}`}>
                {card.tagline}
              </p>
            </div>

            {/* Bottom Section: Quick Touch Actions */}
            <div className="relative z-10 pt-2 border-t border-white/10">
              <div className="grid grid-cols-4 gap-2">
                <a
                  href={`tel:${card.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-slate-200 group cursor-pointer"
                >
                  <Phone className="w-4 h-4 mb-1 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium">{t.call}</span>
                </a>

                <a
                  href={`https://wa.me/${card.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-slate-200 group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mb-1 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium">{t.whatsapp}</span>
                </a>

                <a
                  href={`mailto:${card.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-slate-200 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 mb-1 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium">{t.email}</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onOpenQR(); }}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-slate-200 group cursor-pointer"
                >
                  <QrCode className="w-4 h-4 mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium">{t.qrCode}</span>
                </button>
              </div>

              {/* Flip Hint Bar */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400/80">
                <RotateCw className="w-3 h-3 animate-spin [animation-duration:8s]" />
                <span>{t.tapToFlip}</span>
              </div>
            </div>
          </div>

          {/* ================= CARD BACK ================= */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-3xl p-6 shadow-2xl border flex flex-col justify-between overflow-hidden backface-hidden rotate-y-180 ${currentTheme.backBg} ${currentTheme.borderClass}`}
          >
            {/* Top Bar with back flip trigger */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span className={`text-xs font-semibold ${currentTheme.textColor}`}>
                  {lang === 'bn' ? 'স্ক্যান ও কানেক্ট' : 'Scan & Connect'}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                title={t.tapToFlipBack}
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* QR Code Matrix Centerpiece */}
            <div className="my-auto flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center relative">
                {/* SVG Rendered QR Matrix */}
                <svg viewBox="0 0 25 25" className="w-36 h-36 shape-rendering-crispEdges">
                  {qrMatrix.map((row, r) =>
                    row.map((val, c) =>
                      val ? (
                        <rect
                          key={`${r}-${c}`}
                          x={c}
                          y={r}
                          width={1}
                          height={1}
                          fill="#0F172A"
                        />
                      ) : null
                    )
                  )}
                </svg>
                {/* Center Monogram Stamp */}
                <div 
                  className="absolute inset-0 m-auto w-8 h-8 rounded-lg bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow"
                >
                  {card.company.slice(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Direct Download vCard Button */}
              <button
                onClick={handleDownload}
                className="mt-3.5 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadVCard}</span>
              </button>
            </div>

            {/* Social Links & Payment Strip */}
            <div className="border-t border-white/10 pt-2 space-y-2">
              {/* Social Icon Pills */}
              <div className="flex items-center justify-center gap-3 text-slate-300">
                {card.socials.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${card.socials.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 hover:text-sky-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {card.socials.github && (
                  <a
                    href={`https://github.com/${card.socials.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {card.socials.twitter && (
                  <a
                    href={`https://twitter.com/${card.socials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 hover:text-sky-400 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {card.website && (
                  <a
                    href={card.website.startsWith('http') ? card.website : `https://${card.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 hover:text-emerald-400 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* bKash / Payment Badge */}
              {card.payment.bkash && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-rose-400 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    bKash
                  </span>
                  <span className="text-rose-200 font-mono">{card.payment.bkash}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Strip Underneath Card */}
      <div className="w-full max-w-[340px] mt-4 grid grid-cols-2 gap-2.5">
        <button
          onClick={onOpenNFC}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-medium text-xs border border-slate-700/80 active:scale-98 transition-all cursor-pointer shadow"
        >
          <Wifi className="w-4 h-4 rotate-90 text-emerald-400" />
          <span>{t.nfcBeam}</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-medium text-xs border border-slate-700/80 active:scale-98 transition-all cursor-pointer shadow"
        >
          <Share2 className="w-4 h-4 text-sky-400" />
          <span>{t.shareCard}</span>
        </button>
      </div>
    </div>
  );
};
