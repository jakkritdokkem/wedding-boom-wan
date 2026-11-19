import { RsvpRecord, GuestbookEntry } from "@/types/wedding";
import fs from "fs";
import os from "os";
import path from "path";

const BUNDLED_DB_DIR = path.join(process.cwd(), "data");
const TMP_DB_DIR = path.join(os.tmpdir(), "wedding-data");

const INITIAL_GUESTBOOK: GuestbookEntry[] = [];

function resolveDbDir(): string {
  try {
    if (!fs.existsSync(BUNDLED_DB_DIR)) {
      fs.mkdirSync(BUNDLED_DB_DIR, { recursive: true });
    }
    fs.accessSync(BUNDLED_DB_DIR, fs.constants.W_OK);
    return BUNDLED_DB_DIR;
  } catch {
    try {
      if (!fs.existsSync(TMP_DB_DIR)) {
        fs.mkdirSync(TMP_DB_DIR, { recursive: true });
      }
      return TMP_DB_DIR;
    } catch {
      return BUNDLED_DB_DIR;
    }
  }
}

function getFilePath(filename: string): string {
  const dir = resolveDbDir();
  const target = path.join(dir, filename);

  // If using /tmp fallback, seed from bundled data/ if present
  if (dir !== BUNDLED_DB_DIR && !fs.existsSync(target)) {
    const bundled = path.join(BUNDLED_DB_DIR, filename);
    if (fs.existsSync(bundled)) {
      try {
        fs.copyFileSync(bundled, target);
      } catch {
        // Ignore copy errors
      }
    }
  }

  return target;
}

function readJsonArray<T>(filename: string, fallback: T[]): T[] {
  const filePath = getFilePath(filename);
  try {
    if (!fs.existsSync(filePath)) {
      try {
        fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      } catch {
        // Ignore write error on read-only filesystem
      }
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8").trim();
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return fallback;
  }
}

function writeJsonArray<T>(filename: string, data: T[]): void {
  const filePath = getFilePath(filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

export function getRsvps(): RsvpRecord[] {
  return readJsonArray<RsvpRecord>("rsvps.json", []);
}

export function saveRsvp(record: RsvpRecord): void {
  const current = getRsvps();
  current.unshift(record);
  writeJsonArray("rsvps.json", current);
}

export function getGuestbook(): GuestbookEntry[] {
  return readJsonArray<GuestbookEntry>("guestbook.json", INITIAL_GUESTBOOK);
}

export function saveGuestbookEntry(entry: GuestbookEntry): void {
  const current = getGuestbook();
  current.unshift(entry);
  writeJsonArray("guestbook.json", current);
}

export function likeGuestbookEntry(id: string): GuestbookEntry | null {
  const current = getGuestbook();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return null;

  current[index].likesCount = (current[index].likesCount || 0) + 1;
  writeJsonArray("guestbook.json", current);
  return current[index];
}
