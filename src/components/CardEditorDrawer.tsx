import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Image as ImageIcon, 
  Palette, 
  User, 
  Phone, 
  Globe, 
  Check, 
  CreditCard, 
  Briefcase,
  Share2
} from 'lucide-react';
import { CardData, CardThemeId, Language } from '../types/card';
import { CARD_THEMES } from '../utils/mockData';
import { useTranslation } from '../utils/translations';

interface CardEditorDrawerProps {
  card: CardData;
  lang: Language;
  onSave: (updatedCard: CardData) => void;
  onClose: () => void;
}

export const CardEditorDrawer: React.FC<CardEditorDrawerProps> = ({
  card,
  lang,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<CardData>({ ...card });
  const [activeSection, setActiveSection] = useState<'profile' | 'theme' | 'contact' | 'social'>('profile');
  const t = useTranslation(lang);

  const sampleAvatars = [
    '/src/assets/images/avatar_businessman_1793990040277.jpg',
    '/src/assets/images/avatar_businesswoman_1793990041508.jpg',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  ];

  const handleInputChange = (field: keyof CardData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (network: keyof typeof formData.socials, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [network]: value
      }
    }));
  };

  const handlePaymentChange = (channel: keyof typeof formData.payment, value: string) => {
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [channel]: value
      }
    }));
  };

  const handleThemeSelect = (themeId: CardThemeId) => {
    const theme = CARD_THEMES.find(th => th.id === themeId);
    setFormData(prev => ({
      ...prev,
      themeId,
      accentColor: theme ? theme.accent : prev.accentColor
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-100 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Top Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              {t.cardStudio}
            </h3>
            <p className="text-[11px] text-slate-400">
              {lang === 'bn' ? 'কার্ডের তথ্য ও ডিজাইন পরিবর্তন করুন' : 'Customize visiting card content & styling'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 p-1 gap-1 text-xs font-medium shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSection('profile')}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === 'profile'
                ? 'bg-neutral-800 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.personalInfo}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('theme')}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === 'theme'
                ? 'bg-neutral-800 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.theme}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('contact')}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-neutral-800 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.contactDetails}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('social')}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === 'social'
                ? 'bg-neutral-800 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'bn' ? 'সোশ্যাল' : 'Socials'}</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          
          {/* Section 1: Profile & Avatar */}
          {activeSection === 'profile' && (
            <div className="space-y-3.5">
              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  {t.avatarSelection}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-emerald-500/50 shrink-0">
                    <img 
                      src={formData.avatarUrl} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] text-slate-400 mb-1.5">
                      {lang === 'bn' ? 'নমুনা ছবি বেছে নিন:' : 'Choose preset portrait:'}
                    </div>
                    <div className="flex items-center gap-2">
                      {sampleAvatars.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, avatarUrl: url }))}
                          className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            formData.avatarUrl === url ? 'border-emerald-400 scale-105' : 'border-neutral-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={url} alt="preset" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name (English & Bangla) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    {t.fullName} (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    নাম (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={formData.nameBn || ''}
                    onChange={(e) => handleInputChange('nameBn', e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Job Title & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    {t.jobTitle}
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    {t.companyName}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Tagline / Bio */}
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  {t.tagline}
                </label>
                <textarea
                  rows={2}
                  value={formData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Section 2: Theme Selector */}
          {activeSection === 'theme' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">
                {lang === 'bn' ? 'অ্যান্ড্রয়েড কার্ড থিম সিলেক্ট করুন' : 'Select Android Card Theme & Material Style'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CARD_THEMES.map((theme) => {
                  const isSelected = formData.themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-emerald-400 bg-neutral-800 shadow-md ring-1 ring-emerald-400/50' 
                          : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-850'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-8 h-8 rounded-xl shadow-inner border border-white/10 shrink-0"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <div>
                          <div className="text-xs font-bold text-white">
                            {lang === 'bn' ? theme.nameBn : theme.nameEn}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {theme.badge}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: Contact Details */}
          {activeSection === 'contact' && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  {t.whatsappNumber}
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="+8801700000000"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  {t.websiteUrl}
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="example.com"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  {t.officeAddress}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Section 4: Social & Payment */}
          {activeSection === 'social' && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  LinkedIn Username
                </label>
                <input
                  type="text"
                  value={formData.socials.linkedin || ''}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  placeholder="username"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={formData.socials.github || ''}
                  onChange={(e) => handleSocialChange('github', e.target.value)}
                  placeholder="username"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Twitter / X Handle
                </label>
                <input
                  type="text"
                  value={formData.socials.twitter || ''}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  placeholder="@handle"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* bKash Payment Field */}
              <div className="pt-2 border-t border-neutral-800">
                <label className="text-[11px] font-medium text-rose-400 flex items-center gap-1.5 mb-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  {t.bkashNumber}
                </label>
                <input
                  type="text"
                  value={formData.payment.bkash || ''}
                  onChange={(e) => handlePaymentChange('bkash', e.target.value)}
                  placeholder="017xxxxxxxx (Merchant/Personal)"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* Sticky Submit Button */}
          <div className="pt-3 border-t border-neutral-800 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
