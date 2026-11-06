import { CardData, SavedContact } from '../types/card';

export const INITIAL_CARDS: CardData[] = [
  {
    id: 'card_tanvir',
    name: 'Tanvir Ahmed',
    nameBn: 'তানভীর আহমেদ',
    title: 'Lead Product Architect & Tech Lead',
    titleBn: 'লিড প্রোডাক্ট আর্কিটেক্ট ও টেক লিড',
    company: 'Apex Innovations Ltd.',
    companyBn: 'অ্যাপেক্স ইনোভেশনস লিমিটেড',
    tagline: 'Building next-gen digital experiences & high-scale mobile platforms',
    phone: '+880 1711-234567',
    whatsapp: '+8801711234567',
    email: 'tanvir.ahmed@apexinnovations.io',
    website: 'apexinnovations.io',
    address: 'Gulshan 2, Dhaka 1212, Bangladesh',
    locationMapUrl: 'https://maps.google.com/?q=Gulshan+2+Dhaka',
    avatarUrl: '/src/assets/images/avatar_businessman_1793990040277.jpg',
    themeId: 'executive_obsidian',
    accentColor: '#F59E0B',
    badgeText: 'Verified Founder',
    isVerified: true,
    socials: {
      linkedin: 'tanvir-ahmed-dev',
      github: 'tanvir-apex',
      twitter: 'tanvir_tech',
      facebook: 'tanvir.innovate',
      telegram: 'tanvir_io'
    },
    payment: {
      bkash: '01711234567 (Merchant)',
      nagad: '01711234567',
      bankDetails: 'BRAC Bank | A/C: 1501204892001'
    },
    notes: 'Available for keynote speaking & architecture consulting.',
    stats: {
      views: 1482,
      taps: 326,
      qrScans: 419,
      vCardDownloads: 278
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'card_farhana',
    name: 'Farhana Karim',
    nameBn: 'ফারহানা করিম',
    title: 'Founder & Managing Director',
    titleBn: 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক',
    company: 'Karisma Creative Studio',
    companyBn: 'কারিশমা ক্রিয়েটিভ স্টুডিও',
    tagline: 'Brand identity, creative direction & luxury UI/UX strategy',
    phone: '+880 1822-987654',
    whatsapp: '+8801822987654',
    email: 'farhana@karismastudio.com',
    website: 'karismastudio.com',
    address: 'Banani Block D, Dhaka 1213, Bangladesh',
    locationMapUrl: 'https://maps.google.com/?q=Banani+Dhaka',
    avatarUrl: '/src/assets/images/avatar_businesswoman_1793990041508.jpg',
    themeId: 'material_emerald',
    accentColor: '#10B981',
    badgeText: 'Design Partner',
    isVerified: true,
    socials: {
      linkedin: 'farhana-karim-design',
      behance: 'farhanakarim',
      instagram: 'karisma_creative',
      twitter: 'farhana_ux'
    },
    payment: {
      bkash: '01822987654 (Personal)',
      nagad: '01822987654'
    },
    notes: 'Creative consultations by appointment.',
    stats: {
      views: 940,
      taps: 215,
      qrScans: 280,
      vCardDownloads: 194
    },
    createdAt: '2026-02-10'
  },
  {
    id: 'card_rakib',
    name: 'Rakib Hasan',
    nameBn: 'রাকিব হাসান',
    title: 'Mobile App Developer',
    titleBn: 'মোবাইল অ্যাপ ডেভেলপার',
    company: 'Nexus Software',
    companyBn: 'নেক্সাস সফটওয়্যার',
    tagline: 'Flutter & Kotlin Native Android specialist',
    phone: '+880 1912-345678',
    whatsapp: '+8801912345678',
    email: 'rakib@nexussoftware.dev',
    website: 'nexussoftware.dev',
    address: 'Dhanmondi 27, Dhaka 1209, Bangladesh',
    locationMapUrl: 'https://maps.google.com/?q=Dhanmondi+27+Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    themeId: 'royal_sapphire',
    accentColor: '#3B82F6',
    badgeText: 'Pro Dev',
    isVerified: true,
    socials: {
      github: 'rakib-hasan-dev',
      linkedin: 'rakib-hasan-android',
      twitter: 'rakib_codes'
    },
    payment: {
      bkash: '01912345678'
    },
    notes: 'Open for remote contracts.',
    stats: {
      views: 610,
      taps: 130,
      qrScans: 195,
      vCardDownloads: 110
    },
    createdAt: '2026-03-01'
  }
];

export const INITIAL_SAVED_CONTACTS: SavedContact[] = [
  {
    id: 'contact_1',
    name: 'Mahir Chowdhury',
    title: 'Vice President of Engineering',
    company: 'Fintech South Asia',
    phone: '+880 1712-445566',
    email: 'mahir.c@fintechsa.com',
    whatsapp: '+8801712445566',
    themeColor: '#0EA5E9',
    metAt: 'BASIS SoftExpo 2026',
    savedDate: '2026-02-28',
    notes: 'Discussed API integration & payment gateway partnership'
  },
  {
    id: 'contact_2',
    name: 'Sadia Rahman',
    title: 'Chief Marketing Officer',
    company: 'Bengal Brands Agency',
    phone: '+880 1819-778899',
    email: 'sadia@bengalbrands.com',
    whatsapp: '+8801819778899',
    themeColor: '#EC4899',
    metAt: 'Dhaka Tech Summit',
    savedDate: '2026-03-02',
    notes: 'Interested in digital marketing audit'
  },
  {
    id: 'contact_3',
    name: 'Anisul Huq',
    title: 'Managing Director',
    company: 'Green Horizon Solar',
    phone: '+880 1911-332211',
    email: 'anisul@greenhorizon.org',
    whatsapp: '+8801911332211',
    themeColor: '#10B981',
    metAt: 'Renewable Energy Expo',
    savedDate: '2026-03-12',
    notes: 'Requested proposal for smart monitoring IoT cards'
  },
  {
    id: 'contact_4',
    name: 'Tasnim Jahan',
    title: 'Senior UX Researcher',
    company: 'UserFirst Labs',
    phone: '+880 1622-554433',
    email: 'tasnim@userfirst.design',
    whatsapp: '+8801622554433',
    themeColor: '#8B5CF6',
    metAt: 'Design System Meetup Dhaka',
    savedDate: '2026-03-18',
    notes: 'Shared user testing insights on mobile accessibility'
  }
];

export const CARD_THEMES = [
  {
    id: 'executive_obsidian' as const,
    nameBn: 'এক্সিকিউটিভ অবসিবিয়ান ও গোল্ড',
    nameEn: 'Executive Obsidian & Gold',
    badge: 'Luxury Matte',
    frontBg: 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-stone-900',
    backBg: 'bg-gradient-to-br from-stone-900 via-neutral-900 to-black',
    accent: '#F59E0B',
    accentClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    tagClass: 'bg-amber-400/10 text-amber-300 border border-amber-400/20',
    textColor: 'text-stone-100',
    subTextColor: 'text-stone-400',
    pattern: 'mesh'
  },
  {
    id: 'material_emerald' as const,
    nameBn: 'ম্যাটেরিয়াল ইউ এমারেল্ড',
    nameEn: 'Material You Emerald',
    badge: 'Android 15',
    frontBg: 'bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950',
    backBg: 'bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950',
    accent: '#10B981',
    accentClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    tagClass: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
    textColor: 'text-slate-100',
    subTextColor: 'text-emerald-200/70',
    pattern: 'dots'
  },
  {
    id: 'royal_sapphire' as const,
    nameBn: 'রয়্যাল স্যাফায়ার ব্লু',
    nameEn: 'Royal Sapphire Blue',
    badge: 'Modern Tech',
    frontBg: 'bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900',
    backBg: 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950',
    accent: '#3B82F6',
    accentClass: 'text-blue-400',
    borderClass: 'border-blue-500/30',
    tagClass: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
    textColor: 'text-slate-100',
    subTextColor: 'text-blue-200/70',
    pattern: 'waves'
  },
  {
    id: 'crimson_heritage' as const,
    nameBn: 'জামদানি হেরিটেজ ক্রিমসন',
    nameEn: 'Jamdani Heritage Crimson',
    badge: 'Cultural Rich',
    frontBg: 'bg-gradient-to-br from-rose-950 via-red-950 to-neutral-950',
    backBg: 'bg-gradient-to-br from-neutral-950 via-rose-950 to-red-950',
    accent: '#F43F5E',
    accentClass: 'text-rose-400',
    borderClass: 'border-rose-500/30',
    tagClass: 'bg-rose-500/10 text-rose-300 border border-rose-500/20',
    textColor: 'text-rose-50',
    subTextColor: 'text-rose-200/70',
    pattern: 'heritage'
  },
  {
    id: 'minimal_ceramic' as const,
    nameBn: 'সিরামিক হোয়াইট মিনিমাল',
    nameEn: 'Ceramic White Minimal',
    badge: 'Swiss Clean',
    frontBg: 'bg-gradient-to-br from-white via-slate-50 to-slate-100',
    backBg: 'bg-gradient-to-br from-slate-100 via-white to-slate-50',
    accent: '#0F172A',
    accentClass: 'text-slate-900',
    borderClass: 'border-slate-300',
    tagClass: 'bg-slate-200/70 text-slate-800 border border-slate-300',
    textColor: 'text-slate-900',
    subTextColor: 'text-slate-600',
    pattern: 'grid'
  },
  {
    id: 'cyber_neon' as const,
    nameBn: 'সাইবার নিয়ন ভায়োলেট',
    nameEn: 'Cyber Neon Violet',
    badge: 'Futuristic',
    frontBg: 'bg-gradient-to-br from-purple-950 via-violet-950 to-neutral-950',
    backBg: 'bg-gradient-to-br from-neutral-950 via-violet-950 to-purple-950',
    accent: '#A855F7',
    accentClass: 'text-purple-400',
    borderClass: 'border-purple-500/30',
    tagClass: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
    textColor: 'text-white',
    subTextColor: 'text-purple-200/70',
    pattern: 'circuit'
  }
];
