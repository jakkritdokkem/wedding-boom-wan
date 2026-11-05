import { RsvpRecord, GuestbookEntry } from '@/types/wedding';
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const RSVP_FILE = path.join(DB_DIR, 'rsvps.json');
const GUESTBOOK_FILE = path.join(DB_DIR, 'guestbook.json');

const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'พี่เอก & พี่เมย์',
    relationship: 'เพื่อนร่วมงานเจ้าบ่าว',
    message: 'ยินดีด้วยมากๆ เลยน้องบูมและน้องวัน ขอให้ชีวิตคู่เต็มไปด้วยความสุข ความเข้าใจ และรักกันหวานชื่นตลอดไปนะครับ!',
    createdAt: '2026-10-20T10:15:00Z',
    likesCount: 14,
    sticker: '🥂',
    cardTheme: 'white',
  },
  {
    id: 'gb-2',
    name: 'แก๊งเพื่อนสนิทมัธยม & มหาลัย',
    relationship: 'เพื่อนสนิทเจ้าสาว',
    message: 'ในที่สุดเพื่อนวันของเราก็มีวันนี้แล้ว ดีใจด้วยที่สุด เจ้าสาวสวยละมุนมาก เจ้าบ่าวก็อบอุ่นสุดๆ รักกันนานๆ มีหลานไวๆ น้า 🌿',
    createdAt: '2026-10-22T14:30:00Z',
    likesCount: 28,
    sticker: '💐',
    cardTheme: 'cream',
  },
  {
    id: 'gb-3',
    name: 'คุณอาเกริกเกียรติ และครอบครัว',
    relationship: 'แขกผู้ใหญ่',
    message: 'ขออวยพรให้หลานบูมและหลานวันครองเรือนด้วยความมั่นคง สุขุม และร่วมสร้างครอบครัวที่เปี่ยมด้วยความอบอุ่นและเจริญรุ่งเรืองยิ่งๆ ขึ้นไป',
    createdAt: '2026-10-25T09:00:00Z',
    likesCount: 11,
    sticker: '✨',
    cardTheme: 'sage',
  },
  {
    id: 'gb-4',
    name: 'ทีมเพื่อนเจ้าบ่าวสายลุย',
    relationship: 'เพื่อนสนิท',
    message: 'ยินดีกับบูมและวันจากใจจริงครับ! ขอให้ทุกๆ วันเป็นวันที่แสนพิเศษ จับมือกันเดินผ่านทุกเรื่องราวด้วยรอยยิ้มเสมอไปนะ!',
    createdAt: '2026-10-28T18:45:00Z',
    likesCount: 19,
    sticker: '💍',
    cardTheme: 'olive',
  },
];

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(RSVP_FILE)) {
    fs.writeFileSync(RSVP_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
  if (!fs.existsSync(GUESTBOOK_FILE)) {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(INITIAL_GUESTBOOK, null, 2), 'utf-8');
  } else {
    try {
      const currentRaw = fs.readFileSync(GUESTBOOK_FILE, 'utf-8').trim();
      const parsed = currentRaw ? JSON.parse(currentRaw) : [];
      if (Array.isArray(parsed) && parsed.length === 0) {
        fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(INITIAL_GUESTBOOK, null, 2), 'utf-8');
      }
    } catch {
      fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(INITIAL_GUESTBOOK, null, 2), 'utf-8');
    }
  }
}

export function getRsvps(): RsvpRecord[] {
  ensureDb();
  try {
    const raw = fs.readFileSync(RSVP_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading RSVP DB:', error);
    return [];
  }
}

export function saveRsvp(record: RsvpRecord): void {
  ensureDb();
  const current = getRsvps();
  current.unshift(record);
  fs.writeFileSync(RSVP_FILE, JSON.stringify(current, null, 2), 'utf-8');
}

export function getGuestbook(): GuestbookEntry[] {
  ensureDb();
  try {
    const raw = fs.readFileSync(GUESTBOOK_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading Guestbook DB:', error);
    return INITIAL_GUESTBOOK;
  }
}

export function saveGuestbookEntry(entry: GuestbookEntry): void {
  ensureDb();
  const current = getGuestbook();
  current.unshift(entry);
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(current, null, 2), 'utf-8');
}

export function likeGuestbookEntry(id: string): GuestbookEntry | null {
  ensureDb();
  const current = getGuestbook();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return null;

  current[index].likesCount = (current[index].likesCount || 0) + 1;
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(current, null, 2), 'utf-8');
  return current[index];
}
