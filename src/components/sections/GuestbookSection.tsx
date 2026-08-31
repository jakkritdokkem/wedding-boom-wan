'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Send, Sparkles, Heart, Loader2, User } from 'lucide-react';
import { GuestbookEntry } from '@/types/wedding';
import { submitGuestbookAction, fetchGuestbookAction } from '@/app/actions/guestbook';
import { fireWeddingConfetti } from '@/components/ui/ConfettiBurst';
import { useToast } from '@/components/providers/ToastProvider';

export function GuestbookSection() {
  const { showToast } = useToast();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('เพื่อนสนิท');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadEntries = async () => {
      const res = await fetchGuestbookAction();
      if (res.success && res.data) {
        setEntries(res.data);
      }
    };
    loadEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast('กรุณากรอกชื่อและข้อความอวยพร', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitGuestbookAction(name, relationship, message);
      if (res.success && res.data) {
        setEntries([res.data, ...entries]);
        setMessage('');
        setName('');
        fireWeddingConfetti();
        showToast('ส่งคำอวยพรเรียบร้อยแล้ว ขอบคุณมากครับ/ค่ะ', 'success');
      } else {
        showToast(res.error || 'เกิดข้อผิดพลาด', 'error');
      }
    } catch (err) {
      showToast('ไม่สามารถส่งคำอวยพรได้ในขณะนี้', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook-section" className="py-24 px-4 sm:px-6 bg-[#f4f1ea] border-t border-[#d8decb]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/40 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Wishes &amp; Guestbook</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-3"
          >
            สมุดอวยพรออนไลน์
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#576543] text-sm sm:text-base font-thai-serif"
          >
            ร่วมส่งต่อความรัก คำอวยพร และความปรารถนาดีให้แก่คู่บ่าวสาว
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-thai-serif">
          {/* Write Wish Form (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#c9ceb8]/60 shadow-md">
              <h3 className="font-thai-serif text-xl font-semibold text-[#47572a] mb-1 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#66754e]" />
                <span>เขียนคำอวยพร</span>
              </h3>
              <p className="text-xs text-[#66754e] mb-6">
                ข้อความของท่านจะปรากฏบนกระดานอวยพรทันที
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#47572a] mb-1">
                    ชื่อของท่าน <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เพื่อนโบว์ &amp; อ้น"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-sm bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#47572a] mb-1">
                    ความสัมพันธ์
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-sm bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a]"
                  >
                    <option value="เพื่อนสนิท">เพื่อนสนิท</option>
                    <option value="เพื่อนร่วมงาน">เพื่อนร่วมงาน</option>
                    <option value="ครอบครัว / ญาติ">ครอบครัว / ญาติ</option>
                    <option value="แขกผู้ใหญ่">แขกผู้ใหญ่</option>
                    <option value="แขกผู้มีเกียรติ">แขกผู้มีเกียรติ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#47572a] mb-1">
                    ข้อความอวยพร <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="เขียนความรู้สึก ความยินดี และคำอวยพรให้บ่าวสาวที่นี่..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-sm bg-[#f4f1ea] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#47572a] hover:bg-[#374421] text-[#f4f1ea] font-semibold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ส่งคำอวยพร (Post Wish)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Wishes Feed Wall (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#47572a] text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#66754e]" />
                <span>คำอวยพรทั้งหมด ({entries.length})</span>
              </h3>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scroll">
              {entries.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c9ceb8]/60 shadow-sm hover:border-[#47572a]/50 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#c9ceb8]/40 border border-[#c9ceb8] flex items-center justify-center text-[#47572a] text-xs font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#47572a] text-sm">{item.name}</h4>
                        <span className="text-[11px] text-[#66754e] font-normal">{item.relationship}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-[#66754e]">
                      {new Date(item.createdAt).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>

                  <p className="text-[#576543] text-xs sm:text-sm leading-relaxed pl-10">
                    &quot;{item.message}&quot;
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
