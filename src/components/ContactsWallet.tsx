import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  Mail, 
  MessageCircle, 
  UserPlus, 
  Trash2, 
  Briefcase, 
  Download, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { SavedContact, Language } from '../types/card';
import { useTranslation } from '../utils/translations';

interface ContactsWalletProps {
  contacts: SavedContact[];
  lang: Language;
  onAddContact: (contact: SavedContact) => void;
  onDeleteContact: (id: string) => void;
}

export const ContactsWallet: React.FC<ContactsWalletProps> = ({
  contacts,
  lang,
  onAddContact,
  onDeleteContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState<Partial<SavedContact>>({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    metAt: 'Networking Event'
  });

  const t = useTranslation(lang);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;

    const contact: SavedContact = {
      id: `contact_${Date.now()}`,
      name: newContact.name,
      title: newContact.title || 'Professional',
      company: newContact.company || 'Company',
      phone: newContact.phone,
      email: newContact.email || 'contact@example.com',
      whatsapp: newContact.phone,
      themeColor: '#10B981',
      metAt: newContact.metAt || 'Business Meeting',
      savedDate: new Date().toISOString().split('T')[0]
    };

    onAddContact(contact);
    setShowAddForm(false);
    setNewContact({ name: '', title: '', company: '', phone: '', email: '', metAt: '' });
  };

  return (
    <div className="w-full flex flex-col p-4 space-y-4">
      {/* Wallet Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            {t.wallet}
          </h2>
          <p className="text-[11px] text-slate-400">
            {t.totalSavedCards}: <span className="text-emerald-400 font-bold">{contacts.length}</span>
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'কার্ড যোগ করুন' : 'Add Card'}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchContacts}
          className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Contact List */}
      <div className="space-y-2.5">
        {filteredContacts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            <p>{t.noContactsFound}</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3.5 bg-neutral-900/90 border border-neutral-800/90 rounded-2xl flex flex-col gap-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow"
                    style={{ backgroundColor: contact.themeColor || '#10B981' }}
                  >
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{contact.name}</h4>
                    <p className="text-[11px] text-slate-400">{contact.title}</p>
                    <p className="text-[10px] text-emerald-400 font-medium">{contact.company}</p>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  title="Remove card"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Event / Meeting metadata */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-neutral-800">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {contact.metAt}
                </span>
                <span className="font-mono">{contact.savedDate}</span>
              </div>

              {/* Action Buttons Strip */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <a
                  href={`tel:${contact.phone}`}
                  className="py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-slate-200 rounded-lg text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{t.call}</span>
                </a>

                <a
                  href={`https://wa.me/${(contact.whatsapp || contact.phone).replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-slate-200 rounded-lg text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-slate-200 rounded-lg text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <Mail className="w-3 h-3 text-sky-400" />
                  <span>{t.email}</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-5 text-slate-100 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-3">
              {lang === 'bn' ? 'নতুন কার্ড যুক্ত করুন' : 'Add New Business Card'}
            </h3>
            
            <form onSubmit={handleAddNew} className="space-y-2.5">
              <input
                type="text"
                placeholder={t.fullName}
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder={t.jobTitle}
                value={newContact.title}
                onChange={(e) => setNewContact(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder={t.companyName}
                value={newContact.company}
                onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white"
              />
              <input
                type="tel"
                placeholder={t.phoneNumber}
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white font-mono"
              />
              <input
                type="email"
                placeholder={t.emailAddress}
                value={newContact.email}
                onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder={lang === 'bn' ? 'কোথায় পরিচয় হয়েছিল? (যেমন: সামিট)' : 'Met At (e.g. Dhaka Expo)'}
                value={newContact.metAt}
                onChange={(e) => setNewContact(prev => ({ ...prev, metAt: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="w-1/2 py-2 rounded-xl bg-neutral-800 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow cursor-pointer"
                >
                  Save / সেভ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
