'use server';

import { getRsvps, saveRsvp } from '@/lib/db';
import { RsvpFormData, RsvpRecord } from '@/types/wedding';
import { revalidatePath } from 'next/cache';

export async function submitRsvpAction(formData: RsvpFormData): Promise<{ success: boolean; error?: string; data?: RsvpRecord }> {
  try {
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      return { success: false, error: 'กรุณาระบุชื่อ-นามสกุล' };
    }
    if (!formData.phone || formData.phone.trim().length < 8) {
      return { success: false, error: 'กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้อง' };
    }

    const newRecord: RsvpRecord = {
      ...formData,
      id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };

    saveRsvp(newRecord);
    revalidatePath('/');
    return { success: true, data: newRecord };
  } catch (error) {
    console.error('RSVP Server Action Error:', error);
    return { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง' };
  }
}

export async function fetchRsvpsAction() {
  try {
    return { success: true, data: getRsvps() };
  } catch (error) {
    return { success: false, data: [] };
  }
}
