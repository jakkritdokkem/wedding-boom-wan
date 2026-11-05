import React from 'react';
import { getRsvps, getGuestbook } from '@/lib/db';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { Users, CheckCircle, XCircle, Utensils, Clock, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';
import { AdminInteractiveClient } from './AdminInteractiveClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const rsvps = getRsvps();
  const guestbook = getGuestbook();
  const { couple } = WEDDING_DATA;

  const attendingList = rsvps.filter((r) => r.attendance === 'attending');
  const notAttendingList = rsvps.filter((r) => r.attendance === 'not_attending');
  const totalGuests = attendingList.reduce((acc, curr) => acc + (Number(curr.guestCount) || 1), 0);

  // Dietary Breakdown
  const dietaryCounts = attendingList.reduce((acc, curr) => {
    const key = curr.dietary || 'none';
    acc[key] = (acc[key] || 0) + (Number(curr.guestCount) || 1);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#2d381c] p-4 sm:p-8 font-thai-serif">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c9ceb8]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#66754e]">
              <span>Wedding Dashboard</span>
              <span>•</span>
              <span>{couple.hashtag}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#47572a] mt-1 font-serif-luxury">
              {couple.bride.nicknameEn} &amp; {couple.groom.nicknameEn} — ระบบจัดการรายชื่อแขก &amp; การ์ดเชิญ
            </h1>
            <p className="text-xs sm:text-sm text-[#576543] mt-1">
              ข้อมูลการตอบรับเข้าร่วมงาน (RSVP), เครื่องมือสร้างลิงก์เชิญรายบุคคล และคำอวยพรทั้งหมด
            </p>
          </div>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-[#47572a] text-[#f4f1ea] text-xs sm:text-sm font-semibold hover:bg-[#374421] transition shadow-sm"
          >
            ← กลับหน้าการ์ดแต่งงาน
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#c9ceb8]/60 shadow-sm">
            <div className="flex items-center justify-between text-[#66754e] mb-2">
              <span className="text-xs font-semibold">สะดวกมาร่วมงาน</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#47572a] tabular-nums">
              {attendingList.length} <span className="text-xs font-normal text-[#576543]">กลุ่ม</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#c9ceb8]/60 shadow-sm">
            <div className="flex items-center justify-between text-[#66754e] mb-2">
              <span className="text-xs font-semibold">จำนวนแขกรวมทั้งหมด</span>
              <Users className="w-4 h-4 text-[#47572a]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#47572a] tabular-nums">
              {totalGuests} <span className="text-xs font-normal text-[#576543]">ท่าน</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#c9ceb8]/60 shadow-sm">
            <div className="flex items-center justify-between text-[#66754e] mb-2">
              <span className="text-xs font-semibold">ไม่สะดวกมาร่วมงาน</span>
              <XCircle className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#47572a] tabular-nums">
              {notAttendingList.length} <span className="text-xs font-normal text-[#576543]">ท่าน</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#c9ceb8]/60 shadow-sm">
            <div className="flex items-center justify-between text-[#66754e] mb-2">
              <span className="text-xs font-semibold">คำอวยพรทั้งหมด</span>
              <MessageSquareQuote className="w-4 h-4 text-[#66754e]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#47572a] tabular-nums">
              {guestbook.length} <span className="text-xs font-normal text-[#576543]">ข้อความ</span>
            </p>
          </div>
        </div>

        {/* Dietary and Session Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#c9ceb8]/60 shadow-sm">
            <h3 className="font-semibold text-base text-[#47572a] mb-4 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#66754e]" />
              <span>สรุปข้อจำกัดทางอาหาร (สำหรับห้องจัดเลี้ยง)</span>
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-[#576543]">
              <div className="flex justify-between py-1.5 border-b border-[#f5ebe2]">
                <span>ทานได้ปกติ</span>
                <span className="font-semibold text-[#47572a]">{dietaryCounts['none'] || 0} ท่าน</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f5ebe2]">
                <span>มังสวิรัติ (Vegetarian)</span>
                <span className="font-semibold text-[#47572a]">{dietaryCounts['vegetarian'] || 0} ท่าน</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f5ebe2]">
                <span>ฮาลาล (Halal)</span>
                <span className="font-semibold text-[#47572a]">{dietaryCounts['halal'] || 0} ท่าน</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>มีอาหารที่แพ้ (Allergies)</span>
                <span className="font-semibold text-[#47572a]">{dietaryCounts['allergic'] || 0} ท่าน</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#c9ceb8]/60 shadow-sm">
            <h3 className="font-semibold text-base text-[#47572a] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#66754e]" />
              <span>สรุปรอบพิธีการที่แขกเข้าร่วม</span>
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-[#576543]">
              <div className="flex justify-between py-1.5 border-b border-[#f5ebe2]">
                <span>ทั้งสองช่วง (พิธีเช้า &amp; ฉลองเที่ยง)</span>
                <span className="font-semibold text-[#47572a]">
                  {attendingList.filter((r) => r.session === 'both').length} กลุ่ม
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f5ebe2]">
                <span>เฉพาะพิธีเช้า</span>
                <span className="font-semibold text-[#47572a]">
                  {attendingList.filter((r) => r.session === 'morning_only').length} กลุ่ม
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>เฉพาะงานเลี้ยงฉลอง</span>
                <span className="font-semibold text-[#47572a]">
                  {attendingList.filter((r) => r.session === 'evening_only').length} กลุ่ม
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Interactive Tools: Link Generator + Filterable RSVP Table + CSV Export */}
        <AdminInteractiveClient rsvps={rsvps} guestbook={guestbook} />
      </div>
    </div>
  );
}
