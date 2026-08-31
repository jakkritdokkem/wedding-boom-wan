'use server';

import { getGuestbook, saveGuestbookEntry } from '@/lib/db';
import { GuestbookEntry } from '@/types/wedding';
import { revalidatePath } from 'next/cache';

export async function submitGuestbookAction(
  name: string,
  relationship: string,
  message: string
): Promise<{ success: boolean; error?: string; data?: GuestbookEntry }> {
  try {
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'กรุณาระบุชื่อของท่าน' };
    }
    if (!message || message.trim().length < 3) {
      return { success: false, error: 'กรุณากรอกข้อความอวยพรอย่างน้อย 3 ตัวอักษร' };
    }

    const newEntry: GuestbookEntry = {
      id: 'gb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      relationship: relationship.trim() || 'แขกผู้มีเกียรติ',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };

    saveGuestbookEntry(newEntry);
    revalidatePath('/');
    return { success: true, data: newEntry };
  } catch (error) {
    console.error('Guestbook Server Action Error:', error);
    return { success: false, error: 'ไม่สามารถบันทึกคำอวยพรได้ กรุณาลองใหม่อีกครั้ง' };
  }
}

export async function fetchGuestbookAction() {
  try {
    return { success: true, data: getGuestbook() };
  } catch (error) {
    return { success: false, data: [] };
  }
}
