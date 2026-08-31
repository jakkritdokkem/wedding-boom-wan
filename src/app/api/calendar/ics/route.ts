import { NextResponse } from 'next/server';
import { WEDDING_DATA } from '@/lib/wedding-data';

export async function GET() {
  const { couple, venue } = WEDDING_DATA;
  
  // Format for iCalendar: YYYYMMDDTHHMMSS
  // Start: 2027-01-09 07:09:00 (UTC+7 -> UTC 20270109T000900Z)
  // End: 2027-01-09 15:00:00 (UTC+7 -> UTC 20270109T080000Z)
  const dtStart = '20270109T000900Z';
  const dtEnd = '20270109T080000Z';
  const summary = `Wedding Celebration: ${couple.groom.nicknameEn} & ${couple.bride.nicknameEn} (${couple.groom.nameTh} & ${couple.bride.nameTh})`;
  const description = `พิธีมงคลสมรสระหว่าง ${couple.groom.nameTh} (${couple.groom.nicknameTh}) และ ${couple.bride.nameTh} (${couple.bride.nicknameTh})\\n\\nกำหนดการ:\\n07:09 น. พิธีเจริญพระพุทธมนต์\\n08:19 น. พิธีแห่ขันหมาก\\n09:09 น. พิธีสวมแหวนหมั้น\\n09:49 น. พิธีหลั่งน้ำพระพุทธมนต์\\n11:30 น. งานเลี้ยงฉลองมงคลสมรส\\n\\nสถานที่: ${venue.name} (${venue.hall})\\nHashtag: ${couple.hashtag}`;
  const location = `${venue.name}, ${venue.hall} (${venue.address})`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Boom & Wan Wedding//TH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${couple.groom.nicknameEn.toLowerCase()}-${couple.bride.nicknameEn.toLowerCase()}-2027`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Reminder: Wedding Celebration Tomorrow',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="wedding-boom-wan.ics"',
    },
  });
}
