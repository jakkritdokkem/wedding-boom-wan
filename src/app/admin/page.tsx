import React from 'react';
import { getRsvps, getGuestbook } from '@/lib/db';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { Users, CheckCircle, XCircle, Utensils, Clock, MessageSquareQuote, Heart, Calendar, Phone, UserCheck } from 'lucide-react';
import Link from 'next/link';

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
              {couple.bride.nicknameEn} &amp; {couple.groom.nicknameEn} — รายชื่อแขก &amp; คำอวยพร
            </h1>
            <p className="text-xs sm:text-sm text-[#576543] mt-1">
              ข้อมูลการตอบรับเข้าร่วมงาน (RSVP) และคำอวยพรทั้งหมด
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

        {/* RSVP Table */}
        <div className="bg-white rounded-3xl border border-[#c9ceb8]/60 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#c9ceb8]/40 flex items-center justify-between">
            <h2 className="font-bold text-lg text-[#47572a] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#66754e]" />
              <span>รายชื่อผู้ตอบรับทั้งหมด ({rsvps.length})</span>
            </h2>
          </div>

          {rsvps.length === 0 ? (
            <div className="py-16 text-center text-[#576543]">
              <p className="text-sm">ยังไม่มีผู้ตอบรับการร่วมงานในขณะนี้</p>
              <p className="text-xs text-[#66754e] mt-1">เมื่อแขกกรอกฟอร์ม RSVP ข้อมูลจะปรากฏที่นี่ทันที</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#f5ebe2] text-[#47572a] font-semibold border-b border-[#c9ceb8]/40">
                  <tr>
                    <th className="p-4">เวลาที่ตอบรับ</th>
                    <th className="p-4">ชื่อ-นามสกุล</th>
                    <th className="p-4">เบอร์โทรศัพท์</th>
                    <th className="p-4">ความสัมพันธ์</th>
                    <th className="p-4 text-center">สถานะ</th>
                    <th className="p-4 text-center">จำนวน (ท่าน)</th>
                    <th className="p-4">รอบที่ร่วม</th>
                    <th className="p-4">อาหาร</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5ebe2]">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-[#f4f1ea]/50 transition">
                      <td className="p-4 text-stone-500 font-mono text-[11px] whitespace-nowrap">
                        {new Date(rsvp.createdAt).toLocaleString('th-TH', {
                          day: 'numeric',
                          month: 'short',
                          year: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-4 font-semibold text-[#47572a]">{rsvp.fullName}</td>
                      <td className="p-4 font-mono text-stone-700">{rsvp.phone}</td>
                      <td className="p-4 text-stone-600">
                        {rsvp.relationship === 'groom_guest'
                          ? 'แขกเจ้าบ่าว'
                          : rsvp.relationship === 'bride_guest'
                          ? 'แขกเจ้าสาว'
                          : rsvp.relationship === 'vip_guest'
                          ? 'แขกผู้ใหญ่'
                          : 'ญาติ / ครอบครัว'}
                      </td>
                      <td className="p-4 text-center">
                        {rsvp.attendance === 'attending' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                            สะดวก
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-semibold">
                            ไม่สะดวก
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center font-bold tabular-nums">
                        {rsvp.attendance === 'attending' ? rsvp.guestCount : '-'}
                      </td>
                      <td className="p-4 text-stone-600 text-xs">
                        {rsvp.attendance === 'attending'
                          ? rsvp.session === 'both'
                            ? 'ทั้งสองช่วง'
                            : rsvp.session === 'morning_only'
                            ? 'พิธีเช้า'
                            : 'งานเลี้ยงฉลอง'
                          : '-'}
                      </td>
                      <td className="p-4 text-stone-600 text-xs">
                        {rsvp.dietary === 'allergic' && rsvp.dietaryDetails
                          ? `แพ้: ${rsvp.dietaryDetails}`
                          : rsvp.dietary === 'vegetarian'
                          ? 'มังสวิรัติ'
                          : rsvp.dietary === 'halal'
                          ? 'ฮาลาล'
                          : 'ปกติ'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
