import React, { useState } from 'react';
import { X, Copy, Check, Download, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { CardData, Language } from '../types/card';
import { generateQRSVGMatrix, downloadVCard } from '../utils/vcard';
import { useTranslation } from '../utils/translations';

interface QRCodeModalProps {
  card: CardData;
  lang: Language;
  onClose: () => void;
  onScanCount: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  card,
  lang,
  onClose,
  onScanCount
}) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslation(lang);
  const qrMatrix = generateQRSVGMatrix(`MECARD:N:${card.name};TEL:${card.phone};EMAIL:${card.email};URL:${card.website};NOTE:${card.company};;`);

  const cardShareUrl = `${window.location.origin}?card=${card.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cardShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `Here is the digital visiting card for ${card.name} (${card.company}):\nPhone: ${card.phone}\nEmail: ${card.email}\n${cardShareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    onScanCount();
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
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-emerald-400/50">
            <img 
              src={card.avatarUrl} 
              alt={card.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{card.name}</h3>
            <p className="text-[11px] text-slate-400">{card.company}</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center my-3 max-w-[260px]">
          {t.scanQrToSave}
        </p>

        {/* Crisp QR Code with Monogram */}
        <div className="p-4 bg-white rounded-2xl shadow-xl flex items-center justify-center relative my-2">
          <svg viewBox="0 0 25 25" className="w-48 h-48 shape-rendering-crispEdges">
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
          <div className="absolute inset-0 m-auto w-9 h-9 rounded-xl bg-slate-950 border-2 border-white flex items-center justify-center font-bold text-xs text-white shadow-md">
            {card.company.slice(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Actions Grid */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => {
              downloadVCard(card);
              onScanCount();
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-98"
          >
            <Download className="w-3.5 h-3.5" />
            <span>vCard (.vcf)</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-medium text-xs transition-all cursor-pointer active:scale-98"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full mt-2 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">{t.linkCopied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
