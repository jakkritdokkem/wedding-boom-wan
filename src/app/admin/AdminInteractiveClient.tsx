'use client';

import React, { useState, useMemo } from 'react';
import { RsvpRecord, GuestbookEntry } from '@/types/wedding';
import {
  Search,
  Download,
  Link2,
  Copy,
  Check,
  UserCheck,
  Sparkles,
  Filter,
} from 'lucide-react';
import { copyTextToClipboard } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';

interface AdminInteractiveClientProps {
  rsvps: RsvpRecord[];
  guestbook: GuestbookEntry[];
}

export function AdminInteractiveClient({ rsvps }: AdminInteractiveClientProps) {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState<string>('all');
  const [attendanceFilter, setAttendanceFilter] = useState<string>('all');

  // Invitation Link Generator State
  const [guestInviteName, setGuestInviteName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        (item.wishesNote && item.wishesNote.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRel =
        relationshipFilter === 'all' || item.relationship === relationshipFilter;

      const matchesAtt =
        attendanceFilter === 'all' || item.attendance === attendanceFilter;

      return matchesSearch && matchesRel && matchesAtt;
    });
  }, [rsvps, searchQuery, relationshipFilter, attendanceFilter]);

  const handleCopyInviteLink = async () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const trimmed = guestInviteName.trim();
    const link = trimmed
      ? `${baseUrl}/?to=${encodeURIComponent(trimmed)}`
      : `${baseUrl}/`;

    const ok = await copyTextToClipboard(link);
    if (ok) {
      setCopiedLink(true);
      showToast(`คัดลอกลิงก์เชิญสำหรับ "${trimmed || 'แขกทั่วไป'}" แล้ว`, 'success');
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleExportCsv = () => {
    if (rsvps.length === 0) {
      showToast('ยังไม่มีข้อมูลสำหรับส่งออกไฟล์ CSV', 'info');
      return;
    }

    const headers = [
      'เวลาที่ตอบรับ',
      'ชื่อ-นามสกุล',
      'เบอร์โทรศัพท์',
      'ความสัมพันธ์',
      'สถานะ',
      'จำนวนแขก',
      'รอบที่ร่วม',
      'อาหาร',
      'รายละเอียดอาหารที่แพ้',
      'ข้อความเพิ่มเติม',
    ];

    const rows = rsvps.map((r) => [
      new Date(r.createdAt).toLocaleString('th-TH'),
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${r.phone || ''}"`,
      r.relationship,
      r.attendance === 'attending' ? 'สะดวกมาร่วมงาน' : 'ไม่สะดวก',
      r.attendance === 'attending' ? r.guestCount : 0,
      r.session,
      r.dietary,
      `"${(r.dietaryDetails || '').replace(/"/g, '""')}"`,
      `"${(r.wishesNote || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wedding-rsvps-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ดาวน์โหลดไฟล์ CSV สำหรับเปิดใน Excel เรียบร้อยแล้ว', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Personalized Invitation Link Generator Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#c9ceb8] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#47572a] flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#66754e]" />
              <span>สร้างลิงก์การ์ดเชิญระบุชื่อแขก (Personalized Invite Link)</span>
            </h3>
            <p className="text-xs text-[#576543] mt-0.5">
              พิมพ์ชื่อแขกเพื่อสร้างลิงก์พิเศษ เมื่อแขกเปิดลิงก์จะเห็นชื่อตัวเองบนหน้าซองจดหมายและในฟอร์ม RSVP ทันที
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <input
              type="text"
              placeholder="พิมพ์ชื่อแขก เช่น พี่เอก และครอบครัว"
              value={guestInviteName}
              onChange={(e) => setGuestInviteName(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-[#c9ceb8] bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] text-xs sm:text-sm min-w-[240px]"
            />
            <button
              type="button"
              onClick={handleCopyInviteLink}
              className="px-5 py-2.5 rounded-xl bg-[#47572a] hover:bg-[#374421] text-[#f4f1ea] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer shrink-0 shadow-xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>คัดลอกลิงก์แล้ว!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>คัดลอกลิงก์ส่ง LINE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RSVP Table with Search, Filter & Export */}
      <div className="bg-white rounded-3xl border border-[#c9ceb8]/60 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#c9ceb8]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-[#47572a] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#66754e]" />
            <span>รายชื่อผู้ตอบรับทั้งหมด ({filteredRsvps.length} / {rsvps.length})</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-[#66754e] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ หรือ เบอร์โทร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-52 pl-9 pr-3 py-2 rounded-xl border border-[#c9ceb8] bg-[#f4f1ea] text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#47572a]"
              />
            </div>

            {/* Filter by Relationship */}
            <div className="flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#66754e] hidden sm:inline" />
              <select
                value={relationshipFilter}
                onChange={(e) => setRelationshipFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#c9ceb8] bg-[#f4f1ea] text-xs text-[#47572a] focus:outline-none"
              >
                <option value="all">ทุกฝ่าย</option>
                <option value="groom_guest">แขกเจ้าบ่าว</option>
                <option value="bride_guest">แขกเจ้าสาว</option>
                <option value="vip_guest">แขกผู้ใหญ่</option>
                <option value="relative">ญาติ / ครอบครัว</option>
              </select>
            </div>

            {/* Filter by Attendance */}
            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#c9ceb8] bg-[#f4f1ea] text-xs text-[#47572a] focus:outline-none"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="attending">สะดวกมาร่วมงาน</option>
              <option value="not_attending">ไม่สะดวก</option>
            </select>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-[#f5ebe2] hover:bg-[#47572a] text-[#47572a] hover:text-[#f4f1ea] border border-[#c9ceb8] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel (CSV)</span>
            </button>
          </div>
        </div>

        {filteredRsvps.length === 0 ? (
          <div className="py-16 text-center text-[#576543]">
            <Sparkles className="w-6 h-6 text-[#c9ceb8] mx-auto mb-2" />
            <p className="text-sm">ยังไม่มีข้อมูลที่ตรงกับการค้นหาในขณะนี้</p>
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
                  <th className="p-4">หมายเหตุ / ข้อความ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5ebe2]">
                {filteredRsvps.map((rsvp) => (
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
                    <td className="p-4 text-stone-600 text-xs max-w-[200px] truncate">
                      {rsvp.wishesNote || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

