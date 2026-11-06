import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Sparkles, 
  Share2, 
  QrCode, 
  Wifi, 
  Edit3, 
  FolderLock, 
  BarChart2, 
  Camera, 
  Check, 
  Globe, 
  Plus, 
  ChevronRight,
  Download,
  Copy
} from 'lucide-react';
import { CardData, SavedContact, AppTab, Language } from './types/card';
import { INITIAL_CARDS, INITIAL_SAVED_CONTACTS, CARD_THEMES } from './utils/mockData';
import { AndroidFrame } from './components/AndroidFrame';
import { DigitalVisitingCard } from './components/DigitalVisitingCard';
import { CardEditorDrawer } from './components/CardEditorDrawer';
import { NfcShareModal } from './components/NfcShareModal';
import { QRCodeModal } from './components/QRCodeModal';
import { ContactsWallet } from './components/ContactsWallet';
import { ScannerSimulator } from './components/ScannerSimulator';
import { AnalyticsView } from './components/AnalyticsView';
import { downloadVCard } from './utils/vcard';
import { useTranslation } from './utils/translations';

export default function App() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>(INITIAL_CARDS[0].id);
  const [savedContacts, setSavedContacts] = useState<SavedContact[]>(INITIAL_SAVED_CONTACTS);
  
  const [currentTab, setCurrentTab] = useState<AppTab>('cards');
  const [lang, setLang] = useState<Language>('bn');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  
  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isNfcOpen, setIsNfcOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = useTranslation(lang);
  const activeCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCard = (updated: CardData) => {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    setIsEditorOpen(false);
    showToast(t.cardUpdated);
  };

  const handleNfcSuccess = () => {
    // Increment NFC tap counter
    setCards(prev => prev.map(c => {
      if (c.id === activeCard.id) {
        return {
          ...c,
          stats: {
            ...c.stats,
            taps: c.stats.taps + 1,
            views: c.stats.views + 1
          }
        };
      }
      return c;
    }));
    showToast(t.nfcSuccess);
  };

  const handleQrScanCount = () => {
    setCards(prev => prev.map(c => {
      if (c.id === activeCard.id) {
        return {
          ...c,
          stats: {
            ...c.stats,
            qrScans: c.stats.qrScans + 1,
            views: c.stats.views + 1
          }
        };
      }
      return c;
    }));
  };

  const handleAddScannedContact = (contact: SavedContact) => {
    setSavedContacts(prev => [contact, ...prev]);
    setCurrentTab('wallet');
    showToast(lang === 'bn' ? 'কন্ট্যাক্ট ওয়ালেটে যুক্ত হয়েছে!' : 'Contact added to wallet!');
  };

  const handleDeleteContact = (id: string) => {
    setSavedContacts(prev => prev.filter(c => c.id !== id));
    showToast(lang === 'bn' ? 'কার্ড সরানো হয়েছে' : 'Contact removed');
  };

  const handleShareGeneral = () => {
    if (navigator.share) {
      navigator.share({
        title: `${activeCard.name} - Digital Business Card`,
        text: `Connect with ${activeCard.name} (${activeCard.title} at ${activeCard.company})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setIsQrOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20">
      
      {/* ================= TOP BAR CONTRACT (Strict 3-zone, one line, gap-8) ================= */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950/95 sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          <span className="text-base font-bold tracking-tight text-white">
            DigiCard Android
          </span>
        </div>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button 
            onClick={() => setCurrentTab('cards')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${currentTab === 'cards' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            {t.myCards}
          </button>
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.cardStudio}
          </button>
          <button 
            onClick={() => setCurrentTab('wallet')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${currentTab === 'wallet' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            {t.wallet}
          </button>
          <button 
            onClick={() => setCurrentTab('analytics')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${currentTab === 'analytics' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            {t.analytics}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Bengali / English language toggle */}
          <button
            onClick={() => setLang(l => l === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <button
            onClick={() => downloadVCard(activeCard)}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>vCard</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN WORKSPACE AREA ================= */}
      <main className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center p-4 md:p-8 gap-8 max-w-7xl mx-auto w-full">
        
        {/* Left / Center: Android Phone Mockup Frame */}
        <div className="flex-1 flex flex-col items-center w-full max-w-md">
          {/* Card Selector Pills for quick switching between profiles */}
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === 'bn' ? 'কার্ড প্রোফাইল নির্বাচন:' : 'Select Card Profile:'}
            </span>
            <div className="flex items-center gap-1.5">
              {cards.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCardId(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    c.id === selectedCardId
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-neutral-900 text-slate-400 hover:text-slate-200 border border-neutral-800'
                  }`}
                >
                  {c.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Android Phone Shell */}
          <AndroidFrame
            isPhoneFrame={isPhoneFrame}
            onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
            themeColor={activeCard.accentColor}
          >
            {/* Inside Android Phone Viewport */}
            <div className="flex-1 flex flex-col justify-between min-h-[700px] bg-slate-950 text-slate-100">
              
              {/* Android App Internal Top Header */}
              <div className="px-5 py-3 flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    DC
                  </div>
                  <div>
                    <h1 className="text-xs font-bold text-white leading-none">
                      {t.appTitle}
                    </h1>
                    <span className="text-[10px] text-slate-400 leading-none">
                      {currentTab === 'cards' ? t.myCards : currentTab === 'wallet' ? t.wallet : currentTab === 'analytics' ? t.analytics : t.scannerTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-300 transition-colors cursor-pointer"
                    title={t.cardStudio}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => setIsQrOpen(true)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-300 transition-colors cursor-pointer"
                    title={t.qrCode}
                  >
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>

              {/* Dynamic Viewport Tabs Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-3">
                {currentTab === 'cards' && (
                  <div className="px-3 py-2 flex flex-col items-center">
                    <DigitalVisitingCard
                      card={activeCard}
                      lang={lang}
                      onOpenQR={() => setIsQrOpen(true)}
                      onOpenNFC={() => setIsNfcOpen(true)}
                      onShare={handleShareGeneral}
                    />
                  </div>
                )}

                {currentTab === 'wallet' && (
                  <ContactsWallet
                    contacts={savedContacts}
                    lang={lang}
                    onAddContact={(c) => {
                      setSavedContacts(prev => [c, ...prev]);
                      showToast(lang === 'bn' ? 'কার্ড সংরক্ষিত হয়েছে!' : 'Card saved!');
                    }}
                    onDeleteContact={handleDeleteContact}
                  />
                )}

                {currentTab === 'nfc' && (
                  <ScannerSimulator
                    lang={lang}
                    onSaveScannedContact={handleAddScannedContact}
                  />
                )}

                {currentTab === 'analytics' && (
                  <AnalyticsView
                    card={activeCard}
                    lang={lang}
                  />
                )}
              </div>

              {/* Android Bottom Navigation Bar */}
              <div className="sticky bottom-0 z-30 bg-neutral-900/90 backdrop-blur-md border-t border-neutral-800 px-2 py-1.5 grid grid-cols-4 items-center">
                <button
                  onClick={() => setCurrentTab('cards')}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
                    currentTab === 'cards' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px]">{t.myCards}</span>
                </button>

                <button
                  onClick={() => setCurrentTab('nfc')}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
                    currentTab === 'nfc' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Camera className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px]">{lang === 'bn' ? 'স্ক্যানার' : 'Scanner'}</span>
                </button>

                <button
                  onClick={() => setCurrentTab('wallet')}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
                    currentTab === 'wallet' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FolderLock className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px]">{t.wallet}</span>
                </button>

                <button
                  onClick={() => setCurrentTab('analytics')}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
                    currentTab === 'analytics' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BarChart2 className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px]">{t.analytics}</span>
                </button>
              </div>
            </div>
          </AndroidFrame>

          {/* Toggle Phone Frame button */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="mt-3 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isPhoneFrame ? t.previewResponsive : t.previewAndroid}</span>
          </button>
        </div>

        {/* Right Side: Desktop Companion Studio & Quick Control Panel */}
        <div className="flex-1 w-full max-w-xl space-y-6">
          
          {/* Card Overview Banner */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {lang === 'bn' ? 'অ্যান্ড্রয়েড ই-ভিজিটিং কার্ড' : 'Android E-Visiting Card'}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {lang === 'bn' && activeCard.nameBn ? activeCard.nameBn : activeCard.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeCard.title} · <span className="text-slate-300 font-medium">{activeCard.company}</span>
                </p>
              </div>

              <button
                onClick={() => setIsEditorOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.cardStudio}</span>
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
              <button
                onClick={() => setIsNfcOpen(true)}
                className="p-3 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer flex flex-col justify-between"
              >
                <Wifi className="w-4 h-4 rotate-90 text-emerald-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-white">NFC Beam</div>
                  <div className="text-[10px] text-slate-400">{lang === 'bn' ? 'ট্যাপ শেয়ার' : 'Tap to share'}</div>
                </div>
              </button>

              <button
                onClick={() => setIsQrOpen(true)}
                className="p-3 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer flex flex-col justify-between"
              >
                <QrCode className="w-4 h-4 text-amber-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-white">QR Code</div>
                  <div className="text-[10px] text-slate-400">{lang === 'bn' ? 'স্ক্যান করুন' : 'Scan to save'}</div>
                </div>
              </button>

              <button
                onClick={() => {
                  downloadVCard(activeCard);
                  showToast(t.contactDownloaded);
                }}
                className="p-3 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer flex flex-col justify-between"
              >
                <Download className="w-4 h-4 text-sky-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-white">Export vCard</div>
                  <div className="text-[10px] text-slate-400">.vcf file</div>
                </div>
              </button>

              <button
                onClick={handleShareGeneral}
                className="p-3 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer flex flex-col justify-between"
              >
                <Share2 className="w-4 h-4 text-purple-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-white">Share Link</div>
                  <div className="text-[10px] text-slate-400">{lang === 'bn' ? 'হোয়াটসঅ্যাপ/লিঙ্ক' : 'WhatsApp/URL'}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Android Material Themes Showcase */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {lang === 'bn' ? 'অ্যান্ড্রয়েড কার্ড থিম সিলেক্টর' : 'Material You Themes & Finishes'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'যেকোনো থিমে ক্লিক করে কার্ডের লুক পরিবর্তন করুন' : 'Click any preset to switch card theme live'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CARD_THEMES.map((th) => {
                const isActive = activeCard.themeId === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => {
                      handleUpdateCard({
                        ...activeCard,
                        themeId: th.id,
                        accentColor: th.accent
                      });
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive 
                        ? 'border-emerald-400 bg-neutral-800 ring-2 ring-emerald-500/30' 
                        : 'border-neutral-800 bg-neutral-950/60 hover:bg-neutral-850'
                    }`}
                  >
                    <div 
                      className="w-full h-8 rounded-xl mb-2 shadow-inner"
                      style={{ backgroundColor: th.accent }}
                    />
                    <div className="text-xs font-bold text-white truncate">
                      {lang === 'bn' ? th.nameBn : th.nameEn}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {th.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Android Feature Highlights */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white">
              {lang === 'bn' ? 'অ্যাপ্লিকেশনের মূল সুবিধাসমূহ' : 'Android App Core Features'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 rotate-90" />
                  {lang === 'bn' ? 'NFC ট্যাপ-টু-শেয়ার' : 'NFC Tap-to-Share'}
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === 'bn' ? 'অন্যান্য অ্যান্ড্রয়েড বা আইফোনের সাথে কোনো অ্যাপ ছাড়াই টাচ করে কার্ড শেয়ার।' : 'Transmit contact credentials wirelessly via Android NFC Beam.'}
                </p>
              </div>

              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5" />
                  {lang === 'bn' ? 'স্মার্ট কিউআর কোড' : 'Instant vCard QR'}
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === 'bn' ? 'যেকোনো ক্যামেরা স্ক্যান করে সরাসরি গুগল কনট্যাক্টসে সেভ করার সুবিধা।' : 'Direct import to Android Google Contacts with one tap.'}
                </p>
              </div>

              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <div className="font-bold text-sky-400 mb-1 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  {lang === 'bn' ? '৩ডি ফ্লিপ কার্ড ইন্টারফেস' : '3D Flippable Card'}
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === 'bn' ? 'বাস্তব কার্ডের মতো সামনে-পেছনে উল্টে দেখার ইন্টারঅ্যাক্টিভ অ্যানিমেশন।' : 'Physics-based 3D rotation with front and back business profiles.'}
                </p>
              </div>

              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <div className="font-bold text-purple-400 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {lang === 'bn' ? 'বাংলা ও ইংরেজি সাপোর্ট' : 'Bilingual Support'}
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === 'bn' ? 'সহজেই বাংলা এবং ইংরেজি ভাষায় কার্ডের তথ্য তৈরি ও প্রদর্শন।' : 'Full Bengali (বাংলা) & English localization and typography.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ================= MODALS & DRAWERS ================= */}
      {isEditorOpen && (
        <CardEditorDrawer
          card={activeCard}
          lang={lang}
          onSave={handleUpdateCard}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

      {isNfcOpen && (
        <NfcShareModal
          card={activeCard}
          lang={lang}
          onClose={() => setIsNfcOpen(false)}
          onSuccess={handleNfcSuccess}
        />
      )}

      {isQrOpen && (
        <QRCodeModal
          card={activeCard}
          lang={lang}
          onClose={() => setIsQrOpen(false)}
          onScanCount={handleQrScanCount}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
