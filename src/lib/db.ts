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
    message: 'ยินดีด้วยมากๆ เลยน้องกายและน้องแพรว ขอให้ชีวิตคู่เต็มไปด้วยความสุข ความเข้าใจ และรักกันหวานชื่นตลอดไปนะครับ!',
    createdAt: '2026-08-20T10:15:00Z',
    likesCount: 12,
  },
  {
    id: 'gb-2',
    name: 'กลุ่มเพื่อนสนิท Chula Art #15',
    relationship: 'เพื่อนสนิทเจ้าสาว',
    message: 'ในที่สุดเพื่อนแพรวของเราก็มีวันนี้แล้ว ดีใจด้วยที่สุด เจ้าสาวสวยมาก เจ้าบ่าวหล่อมาก รักกันนานๆ มีหลานไวๆ น้า',
    createdAt: '2026-08-22T14:30:00Z',
    likesCount: 24,
  },
  {
    id: 'gb-3',
    name: 'คุณอาเกริกเกียรติ และครอบครัว',
    relationship: 'แขกผู้ใหญ่',
    message: 'ขออวยพรให้หลานทั้งสองครองเรือนด้วยความมั่นคง สุขุม และร่วมสร้างครอบครัวที่เปี่ยมด้วยความอบอุ่นและเจริญรุ่งเรืองยิ่งๆ ขึ้นไป',
    createdAt: '2026-08-25T09:00:00Z',
    likesCount: 8,
  },
  {
    id: 'gb-4',
    name: 'ทีมบาสเกตบอล Sunday Warriors',
    relationship: 'เพื่อนเจ้าบ่าว',
    message: 'กัปตันกายสละโสดแล้ว! ยินดีกับทั้งสองคนจากใจจริง ขอให้มีความสุขในทุกๆ วัน เป็นคู่ที่น่ารักที่สุดเลย!',
    createdAt: '2026-08-28T18:45:00Z',
    likesCount: 19,
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
