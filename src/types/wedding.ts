export interface CoupleInfo {
  groom: {
    nameTh: string;
    nameEn: string;
    nicknameTh: string;
    nicknameEn: string;
    parentTh: string;
  };
  bride: {
    nameTh: string;
    nameEn: string;
    nicknameTh: string;
    nicknameEn: string;
    parentTh: string;
  };
  weddingDate: string; // ISO string e.g. "2026-11-28T09:00:00+07:00"
  weddingDateDisplay: string;
  weddingDateThaiDisplay: string;
  hashtag: string;
  welcomeMessage: string;
  bankAccounts: BankAccount[];
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  promptPayId: string;
  qrCodeUrl: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  titleEn: string;
  description: string;
  iconName: 'sun' | 'gem' | 'heart' | 'sparkles' | 'glass-water' | 'music' | 'utensils';
  location: string;
}

export interface StoryMilestone {
  id: string;
  year: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

export interface DressCodeColor {
  name: string;
  nameEn: string;
  hex: string;
  textDark?: boolean;
}

export interface VenueInfo {
  name: string;
  nameEn: string;
  hall: string;
  floor: string;
  address: string;
  parkingInfo: string;
  transitInfo: string;
  googleMapsUrl: string;
  embedMapUrl: string;
  latitude: number;
  longitude: number;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export type RelationshipType = 'groom_guest' | 'bride_guest' | 'vip_guest' | 'relative' | 'colleague';
export type AttendanceStatus = 'attending' | 'not_attending';
export type DietaryRequirement = 'none' | 'vegetarian' | 'halal' | 'vegan' | 'allergic';
export type CeremonySession = 'both' | 'morning_only' | 'evening_only';

export interface RsvpFormData {
  fullName: string;
  phone: string;
  relationship: RelationshipType;
  attendance: AttendanceStatus;
  guestCount: number;
  dietary: DietaryRequirement;
  dietaryDetails?: string;
  session: CeremonySession;
  wishesNote?: string;
}

export interface RsvpRecord extends RsvpFormData {
  id: string;
  createdAt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
  likesCount?: number;
}
