'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Send,
  Loader2,
  CalendarCheck,
  AlertCircle,
  Ticket,
  MapPin,
  Calendar,
  QrCode,
  Heart,
} from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { RsvpFormData, RelationshipType, DietaryRequirement, CeremonySession } from '@/types/wedding';
import { submitRsvpAction } from '@/app/actions/rsvp';
import { fireWeddingConfetti } from '@/components/ui/ConfettiBurst';
import { useToast } from '@/components/providers/ToastProvider';

interface RsvpSectionProps {
  guestName?: string | null;
}

export function RsvpSection({ guestName }: RsvpSectionProps) {
  const { rsvpDeadlineTh, couple, venue } = WEDDING_DATA;
  const { showToast } = useToast();

  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    phone: '',
    relationship: 'groom_guest',
    attendance: 'attending',
    guestCount: 1,
    dietary: 'none',
    dietaryDetails: '',
    session: 'both',
    wishesNote: '',
  });

  useEffect(() => {
    if (guestName && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: guestName }));
    }
  }, [guestName]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<string>('BW-2027');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('กรุณาระบุชื่อ-นามสกุลของท่าน');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMessage('กรุณาระบุเบอร์โทรศัพท์ที่ติดต่อได้');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitRsvpAction(formData);
      if (res.success) {
        if (res.data?.id) {
          setTicketId(res.data.id.slice(-6).toUpperCase());
        }
        setIsSuccess(true);
        fireWeddingConfetti();
        showToast('บันทึกการตอบรับเรียบร้อยแล้ว ขอบพระคุณเป็นอย่างยิ่งครับ/ค่ะ', 'success');
      } else {
        setErrorMessage(res.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
      }
    } catch {
      setErrorMessage('ไม่สามารถเชื่อมต่อระบบได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: guestName || '',
      phone: '',
      relationship: 'groom_guest',
      attendance: 'attending',
      guestCount: 1,
      dietary: 'none',
      dietaryDetails: '',
      session: 'both',
      wishesNote: '',
    });
  };

  return (
    <section id="rsvp-section" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#c9ceb8] text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif shadow-2xs"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#66754e]" />
          <span>RSVP Confirmation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-3"
        >
          ตอบรับการร่วมงาน
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base font-thai-serif"
        >
          เพื่อความสะดวกในการจัดเตรียมที่นั่งและการต้อนรับ กรุณาตอบรับภายในวันที่{' '}
          <span className="font-semibold text-[#47572a] underline underline-offset-4">
            {rsvpDeadlineTh}
          </span>
        </motion.p>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="fabric-card fabric-stitch rounded-[44px] p-6 sm:p-11 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* VIP Digital Wedding Pass View */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-6 space-y-6 font-thai-serif"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5] border border-[#c9ceb8] text-[#47572a] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#47572a]" />
                <span>บันทึกข้อมูลการตอบรับสำเร็จ</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-thai-serif text-2xl sm:text-3xl font-semibold text-[#47572a]">
                  ขอบพระคุณเป็นอย่างยิ่ง
                </h3>
                <p className="text-[#576543] text-xs sm:text-sm max-w-md mx-auto">
                  {formData.attendance === 'attending'
                    ? 'ท่านสามารถแคปหน้าจอบัตรเชิญดิจิทัลด้านล่างนี้เพื่อเก็บไว้เป็นข้อมูลในวันงานได้ทันที'
                    : 'ขอบคุณสำหรับความปรารถนาดีที่มอบให้บ่าวสาวเสมอมาครับ/ค่ะ'}
                </p>
              </div>

              {/* Digital E-Ticket / VIP Wedding Pass */}
              <div className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-md border-2 border-[#c9ceb8] bg-[#faf8f5] text-left relative">
                {/* Ticket Top Header */}
                <div className="bg-gradient-to-r from-[#47572a] via-[#5a6d3c] to-[#66754e] p-5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9ceb8] block font-serif-luxury">
                      VIP Wedding Pass
                    </span>
                    <h4 className="font-serif-luxury text-2xl font-normal tracking-wide">
                      {couple.bride.nicknameEn} &amp; {couple.groom.nicknameEn}
                    </h4>
                  </div>
                  <div className="text-right">
                    <Ticket className="w-6 h-6 text-[#c9ceb8] ml-auto mb-0.5" />
                    <span className="font-mono text-[10px] text-[#c9ceb8]">#{ticketId}</span>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-dashed border-[#c9ceb8] pb-4">
                    <div>
                      <span className="text-[11px] text-[#66754e] block">แขกผู้มีเกียรติ (Guest Name)</span>
                      <p className="text-base sm:text-lg font-bold text-[#47572a]">{formData.fullName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#66754e] block">สถานะ</span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#47572a] text-white text-xs font-medium mt-0.5">
                        {formData.attendance === 'attending' ? `${formData.guestCount} ที่นั่ง` : 'ส่งคำอวยพร'}
                      </span>
                    </div>
                  </div>

                  {formData.attendance === 'attending' && (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-[#c9ceb8]/60">
                        <span className="text-[#66754e] block text-[11px]">รอบพิธีการ</span>
                        <span className="font-semibold text-[#47572a]">
                          {formData.session === 'both'
                            ? 'พิธีเช้า & ฉลองเที่ยง'
                            : formData.session === 'morning_only'
                            ? 'เฉพาะพิธีเช้า (07:09)'
                            : 'งานฉลองเที่ยง (11:30)'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#c9ceb8]/60">
                        <span className="text-[#66754e] block text-[11px]">อาหาร</span>
                        <span className="font-semibold text-[#47572a]">
                          {formData.dietary === 'none'
                            ? 'ทานได้ปกติ'
                            : formData.dietary === 'vegetarian'
                            ? 'มังสวิรัติ'
                            : formData.dietary === 'halal'
                            ? 'ฮาลาล'
                            : `แพ้: ${formData.dietaryDetails || 'ระบุแล้ว'}`}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-[#576543]">
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#47572a]" />
                        <span>{couple.weddingDateThaiDisplay}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#47572a]" />
                        <span>{venue.name} ({venue.hall})</span>
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-[#c9ceb8] text-[#47572a]">
                      <QrCode className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-[#c9ceb8] text-[#47572a] text-xs sm:text-sm hover:bg-[#faf8f5] transition font-thai-serif cursor-pointer"
              >
                แก้ไขหรือส่งคำตอบใหม่อีกครั้ง
              </button>
            </motion.div>
          ) : (
            /* RSVP Form View */
            <form key="rsvp-form" onSubmit={handleSubmit} className="space-y-6 font-thai-serif">
              {errorMessage && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-2">
                  ท่านสะดวกมาร่วมงานหรือไม่? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                    className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border text-sm font-medium transition duration-200 cursor-pointer ${
                      formData.attendance === 'attending'
                        ? 'bg-[#47572a] text-white border-[#47572a] shadow-sm font-semibold'
                        : 'bg-[#faf8f5] text-[#576543] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>สะดวกมาร่วมงาน</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'not_attending' })}
                    className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border text-sm font-medium transition duration-200 cursor-pointer ${
                      formData.attendance === 'not_attending'
                        ? 'bg-[#66754e] text-white border-[#66754e] shadow-sm font-semibold'
                        : 'bg-[#faf8f5] text-[#576543] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>ไม่สะดวกมาร่วมงาน</span>
                  </button>
                </div>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5">
                    ชื่อ-นามสกุล หรือ ชื่อเล่น <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณสมศักดิ์ สุขใจ"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#c9ceb8]/80 bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] text-sm text-[#47572a] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5">
                    เบอร์โทรศัพท์ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08x-xxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#c9ceb8]/80 bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] text-sm text-[#47572a] transition"
                  />
                </div>
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5">
                  ความสัมพันธ์กับบ่าวสาว <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { key: 'groom_guest', label: 'แขกเจ้าบ่าว (บูม)' },
                    { key: 'bride_guest', label: 'แขกเจ้าสาว (วัน)' },
                    { key: 'vip_guest', label: 'แขกผู้ใหญ่' },
                    { key: 'relative', label: 'ญาติ / ครอบครัว' },
                  ].map((rel) => (
                    <button
                      key={rel.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, relationship: rel.key as RelationshipType })}
                      className={`py-2.5 px-3 rounded-xl border text-center font-medium transition cursor-pointer ${
                        formData.relationship === rel.key
                          ? 'bg-[#47572a] text-white border-[#47572a] shadow-2xs'
                          : 'bg-[#faf8f5] text-[#576543] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                      }`}
                    >
                      {rel.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional fields if attending */}
              {formData.attendance === 'attending' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 pt-2 border-t border-[#e2e6d8]"
                >
                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5">
                      จำนวนผู้เข้าร่วม (รวมตัวท่านเอง)
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, guestCount: num })}
                          className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-semibold text-sm transition cursor-pointer ${
                            formData.guestCount === num
                              ? 'bg-[#47572a] text-white border-[#47572a] shadow-2xs'
                              : 'bg-[#faf8f5] text-[#576543] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sessions */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5">
                      เลือกรอบพิธีการที่เข้าร่วม
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { key: 'both', label: 'ทั้งพิธีเช้า และ งานฉลองเที่ยง' },
                        { key: 'morning_only', label: 'เฉพาะพิธีเช้า (07:09 น.)' },
                        { key: 'evening_only', label: 'เฉพาะงานฉลองเที่ยง (11:30 น.)' },
                      ].map((sess) => (
                        <button
                          key={sess.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, session: sess.key as CeremonySession })}
                          className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                            formData.session === sess.key
                              ? 'bg-[#47572a] text-white border-[#47572a]'
                              : 'bg-[#faf8f5] text-[#576543] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                          }`}
                        >
                          {sess.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5">
                      ข้อจำกัดทางอาหาร
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { key: 'none', label: 'ทานได้ปกติ' },
                        { key: 'vegetarian', label: 'มังสวิรัติ' },
                        { key: 'halal', label: 'ฮาลาล (Halal)' },
                        { key: 'allergic', label: 'มีอาหารที่แพ้' },
                      ].map((diet) => (
                        <button
                          key={diet.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, dietary: diet.key as DietaryRequirement })}
                          className={`py-2 px-3 rounded-xl border text-center font-medium transition cursor-pointer ${
                            formData.dietary === diet.key
                              ? 'bg-[#66754e] text-white border-[#66754e]'
                              : 'bg-[#faf8f5] text-[#576543] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                          }`}
                        >
                          {diet.label}
                        </button>
                      ))}
                    </div>

                    {formData.dietary === 'allergic' && (
                      <input
                        type="text"
                        placeholder="ระบุสิ่งที่แพ้ เช่น ถั่ว, อาหารทะเล, แป้งสาลี"
                        value={formData.dietaryDetails}
                        onChange={(e) => setFormData({ ...formData, dietaryDetails: e.target.value })}
                        className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-xs bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#47572a]"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Additional Wishes or Note to Couple */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#47572a] mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#66754e]" />
                  <span>ข้อความฝากถึงบ่าวสาว หรือ หมายเหตุเพิ่มเติม (ถ้ามี)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น มีเด็กเล็กมาด้วย 1 คน / ขอแสดงความยินดีล่วงหน้าครับ..."
                  value={formData.wishesNote || ''}
                  onChange={(e) => setFormData({ ...formData, wishesNote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#c9ceb8]/80 bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] text-sm text-[#47572a] transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#47572a] hover:bg-[#374421] text-white font-semibold text-base shadow-md shadow-[#47572a]/15 hover:scale-[1.01] active:scale-[0.99] transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-thai-serif"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>กำลังบันทึกข้อมูล...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ยืนยันการตอบรับ (Submit RSVP)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
