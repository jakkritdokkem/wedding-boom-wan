'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Users,
  UtensilsCrossed,
  Sparkles,
  HeartHandshake,
  Send,
  Loader2,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { RsvpFormData, RelationshipType, AttendanceStatus, DietaryRequirement, CeremonySession } from '@/types/wedding';
import { submitRsvpAction } from '@/app/actions/rsvp';
import { fireWeddingConfetti } from '@/components/ui/ConfettiBurst';
import { useToast } from '@/components/providers/ToastProvider';

export function RsvpSection() {
  const { rsvpDeadlineTh, couple } = WEDDING_DATA;
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
        setIsSuccess(true);
        fireWeddingConfetti();
        showToast('บันทึกการตอบรับเรียบร้อยแล้ว ขอบพระคุณเป็นอย่างยิ่งครับ/ค่ะ', 'success');
      } else {
        setErrorMessage(res.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
      }
    } catch (err) {
      setErrorMessage('ไม่สามารถเชื่อมต่อระบบได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
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
  };

  return (
    <section id="rsvp-section" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/40 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
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
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#c9ceb8] relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* Success State View */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#c9ceb8]/40 text-[#47572a] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-thai-serif text-2xl sm:text-3xl font-semibold text-[#47572a]">
                  ขอบพระคุณเป็นอย่างยิ่ง
                </h3>
                <p className="text-[#576543] text-sm sm:text-base max-w-md mx-auto font-thai-serif">
                  เราได้รับข้อมูลการตอบรับของ <span className="font-semibold text-[#47572a]">{formData.fullName}</span> เรียบร้อยแล้ว
                  {formData.attendance === 'attending'
                    ? ' แล้วพบกันในวันสำคัญของเราทั้งสองครับ/ค่ะ'
                    : ' ขอบคุณสำหรับความปรารถนาดีที่มอบให้บ่าวสาวเสมอมา'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f1ea] border border-[#c9ceb8] max-w-sm mx-auto text-left text-xs sm:text-sm space-y-1.5 text-[#47572a] font-thai-serif">
                <p><span className="font-medium text-[#66754e]">สถานะ:</span> {formData.attendance === 'attending' ? 'สะดวกมาร่วมงาน' : 'ไม่สะดวกมาร่วมงาน'}</p>
                {formData.attendance === 'attending' && (
                  <>
                    <p><span className="font-medium text-[#66754e]">จำนวน:</span> {formData.guestCount} ท่าน</p>
                    <p><span className="font-medium text-[#66754e]">รอบพิธีการ:</span> {formData.session === 'both' ? 'ทั้งสองช่วง' : formData.session === 'morning_only' ? 'พิธีเช้า' : 'งานเลี้ยงฉลอง'}</p>
                  </>
                )}
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-[#c9ceb8] text-[#47572a] text-xs sm:text-sm hover:bg-[#f4f1ea] transition font-thai-serif"
              >
                ส่งคำตอบใหม่อีกครั้ง
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
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-sm font-medium transition duration-200 ${
                      formData.attendance === 'attending'
                        ? 'bg-[#47572a] text-[#f4f1ea] border-[#47572a] shadow-md font-semibold'
                        : 'bg-[#f4f1ea] text-[#576543] border-[#c9ceb8] hover:bg-[#c9ceb8]/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>สะดวกมาร่วมงาน</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'not_attending' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-sm font-medium transition duration-200 ${
                      formData.attendance === 'not_attending'
                        ? 'bg-[#66754e] text-[#f4f1ea] border-[#66754e] shadow-md font-semibold'
                        : 'bg-[#f4f1ea] text-[#576543] border-[#c9ceb8] hover:bg-[#c9ceb8]/30'
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
                    ชื่อ-นามสกุล <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณสมศักดิ์ สุขใจ"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#c9ceb8]/80 bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] text-sm text-[#47572a] transition"
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
                    className="w-full px-4 py-3 rounded-2xl border border-[#c9ceb8]/80 bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] text-sm text-[#47572a] transition"
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
                    { key: 'groom_guest', label: 'แขกเจ้าบ่าว' },
                    { key: 'bride_guest', label: 'แขกเจ้าสาว' },
                    { key: 'vip_guest', label: 'แขกผู้ใหญ่' },
                    { key: 'relative', label: 'ญาติ / ครอบครัว' },
                  ].map((rel) => (
                    <button
                      key={rel.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, relationship: rel.key as RelationshipType })}
                      className={`py-2.5 px-3 rounded-xl border text-center font-medium transition ${
                        formData.relationship === rel.key
                          ? 'bg-[#47572a] text-white border-[#47572a] shadow-sm'
                          : 'bg-[#f4f1ea] text-[#576543] border-[#c9ceb8] hover:bg-[#c9ceb8]/30'
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
                  className="space-y-6 pt-2 border-t border-[#d8decb]"
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
                          className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-semibold text-sm transition ${
                            formData.guestCount === num
                              ? 'bg-[#47572a] text-white border-[#47572a] shadow-sm'
                              : 'bg-[#f4f1ea] text-[#576543] border-[#c9ceb8] hover:bg-[#c9ceb8]/30'
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
                          className={`p-3 rounded-xl border text-left font-medium transition ${
                            formData.session === sess.key
                              ? 'bg-[#47572a] text-white border-[#47572a]'
                              : 'bg-[#f4f1ea] text-[#576543] border-[#c9ceb8] hover:bg-[#c9ceb8]/30'
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
                          className={`py-2 px-3 rounded-xl border text-center font-medium transition ${
                            formData.dietary === diet.key
                              ? 'bg-[#66754e] text-white border-[#66754e]'
                              : 'bg-[#f4f1ea] text-[#576543] border-[#c9ceb8] hover:bg-[#c9ceb8]/30'
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
                        className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-xs bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#47572a]"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#47572a] hover:bg-[#374421] text-[#f4f1ea] font-semibold text-base shadow-lg shadow-[#47572a]/20 hover:scale-[1.01] active:scale-[0.99] transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-thai-serif"
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
