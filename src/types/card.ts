export type CardThemeId = 
  | 'material_emerald'
  | 'executive_obsidian'
  | 'royal_sapphire'
  | 'crimson_heritage'
  | 'minimal_ceramic'
  | 'cyber_neon';

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  behance?: string;
  youtube?: string;
}

export interface PaymentDetails {
  bkash?: string;
  nagad?: string;
  upi?: string;
  bankDetails?: string;
}

export interface CardData {
  id: string;
  name: string;
  nameBn?: string;
  title: string;
  titleBn?: string;
  company: string;
  companyBn?: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  locationMapUrl?: string;
  avatarUrl: string;
  companyLogo?: string;
  themeId: CardThemeId;
  accentColor: string;
  badgeText?: string;
  isVerified: boolean;
  socials: SocialLinks;
  payment: PaymentDetails;
  notes?: string;
  qrCodeUrl?: string;
  stats: {
    views: number;
    taps: number;
    qrScans: number;
    vCardDownloads: number;
  };
  createdAt: string;
}

export interface SavedContact {
  id: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  whatsapp?: string;
  avatarUrl?: string;
  themeColor: string;
  metAt: string;
  savedDate: string;
  notes?: string;
}

export type AppTab = 'cards' | 'editor' | 'nfc' | 'wallet' | 'analytics';
export type Language = 'bn' | 'en';
