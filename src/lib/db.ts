import { RsvpRecord, GuestbookEntry } from "@/types/wedding";
import fs from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DB_DIR, "rsvps.json");
const GUESTBOOK_FILE = path.join(DB_DIR, "guestbook.json");

const INITIAL_GUESTBOOK: GuestbookEntry[] = [];

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(RSVP_FILE)) {
    fs.writeFileSync(RSVP_FILE, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(GUESTBOOK_FILE)) {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(INITIAL_GUESTBOOK, null, 2), "utf-8");
  } else {
    try {
      const currentRaw = fs.readFileSync(GUESTBOOK_FILE, "utf-8").trim();
      const parsed = currentRaw ? JSON.parse(currentRaw) : [];
      if (Array.isArray(parsed) && parsed.length === 0) {
        fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(INITIAL_GUESTBOOK, null, 2), "utf-8");
      }
    } catch {
      fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(INITIAL_GUESTBOOK, null, 2), "utf-8");
    }
  }
}

export function getRsvps(): RsvpRecord[] {
  ensureDb();
  try {
    const raw = fs.readFileSync(RSVP_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading RSVP DB:", error);
    return [];
  }
}

export function saveRsvp(record: RsvpRecord): void {
  ensureDb();
  const current = getRsvps();
  current.unshift(record);
  fs.writeFileSync(RSVP_FILE, JSON.stringify(current, null, 2), "utf-8");
}

export function getGuestbook(): GuestbookEntry[] {
  ensureDb();
  try {
    const raw = fs.readFileSync(GUESTBOOK_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading Guestbook DB:", error);
    return INITIAL_GUESTBOOK;
  }
}

export function saveGuestbookEntry(entry: GuestbookEntry): void {
  ensureDb();
  const current = getGuestbook();
  current.unshift(entry);
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(current, null, 2), "utf-8");
}

export function likeGuestbookEntry(id: string): GuestbookEntry | null {
  ensureDb();
  const current = getGuestbook();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return null;

  current[index].likesCount = (current[index].likesCount || 0) + 1;
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(current, null, 2), "utf-8");
  return current[index];
}
