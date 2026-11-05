'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Send, Sparkles, Heart, Loader2, User } from 'lucide-react';
import { GuestbookEntry } from '@/types/wedding';
import { submitGuestbookAction, fetchGuestbookAction, likeGuestbookAction } from '@/app/actions/guestbook';
import { fireWeddingConfetti } from '@/components/ui/ConfettiBurst';
import { useToast } from '@/components/providers/ToastProvider';

const STICKERS = ['✨', '💐', '🥂', '💍', '🌿', '🕊️'];

const CARD_THEMES: {
  key: 'cream' | 'olive' | 'sage' | 'white';
  label: string;
  bgClass: string;
  swatchColor: string;
}[] = [
  { key: 'white', label: 'ขาวบริสุทธิ์', bgClass: 'bg-white border-[#c9ceb8]/75 text-[#47572a]', swatchColor: '#ffffff' },
  { key: 'cream', label: 'ครีมสว่าง', bgClass: 'bg-[#f4f1ea] border-[#c9ceb8] text-[#47572a]', swatchColor: '#f4f1ea' },
  { key: 'sage', label: 'เขียวเซจละมุน', bgClass: 'bg-[#eef1e6] border-[#c9ceb8] text-[#47572a]', swatchColor: '#c9ceb8' },
  { key: 'olive', label: 'เขียวมะกอก', bgClass: 'bg-[#47572a] border-[#66754e] text-[#faf8f5]', swatchColor: '#47572a' },
];

export function GuestbookSection() {
  const { showToast } = useToast();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('เพื่อนสนิท');
  const [message, setMessage] = useState('');
  const [sticker, setSticker] = useState('✨');
  const [cardTheme, setCardTheme] = useState<'cream' | 'olive' | 'sage' | 'white'>('white');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
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
      const res = await submitGuestbookAction(name, relationship, message, sticker, cardTheme);
      if (res.success && res.data) {
        setEntries([res.data, ...entries]);
        setMessage('');
        setName('');
        fireWeddingConfetti();
        showToast('ส่งคำอวยพรเรียบร้อยแล้ว ขอบคุณมากครับ/ค่ะ', 'success');
      } else {
        showToast(res.error || 'เกิดข้อผิดพลาด', 'error');
      }
    } catch {
      showToast('ไม่สามารถส่งคำอวยพรได้ในขณะนี้', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    if (likedIds[id]) return;
    setLikedIds((prev) => ({ ...prev, [id]: true }));

    setEntries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likesCount: (item.likesCount || 0) + 1 } : item
      )
    );

    await likeGuestbookAction(id);
  };

  return (
    <section id="guestbook-section" className="py-20 px-4 sm:px-6 bg-[#fbfaf7]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#66754e]" />
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
            <div className="fabric-card fabric-stitch p-6 sm:p-9 rounded-[40px]">
              <h3 className="font-thai-serif text-xl font-semibold text-[#47572a] mb-1 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#66754e] fill-current" />
                <span>เขียนการ์ดอวยพร</span>
              </h3>
              <p className="text-xs text-[#66754e] mb-5">
                เลือกสติกเกอร์และสีการ์ดที่ชอบเพื่อส่งคำอวยพรขึ้นกระดานทันที
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
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-sm bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#47572a] mb-1">
                    ความสัมพันธ์
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-sm bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a]"
                  >
                    <option value="เพื่อนสนิท">เพื่อนสนิท</option>
                    <option value="เพื่อนร่วมงาน">เพื่อนร่วมงาน</option>
                    <option value="ครอบครัว / ญาติ">ครอบครัว / ญาติ</option>
                    <option value="แขกผู้ใหญ่">แขกผู้ใหญ่</option>
                    <option value="แขกผู้มีเกียรติ">แขกผู้มีเกียรติ</option>
                  </select>
                </div>

                {/* Sticker & Card Theme Picker */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#47572a] mb-1.5">
                      เลือกสติกเกอร์
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {STICKERS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSticker(s)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-base border transition cursor-pointer ${
                            sticker === s
                              ? 'bg-[#47572a] border-[#47572a] text-white scale-110 shadow-xs'
                              : 'bg-[#faf8f5] border-[#c9ceb8] hover:bg-[#f4f1ea]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#47572a] mb-1.5">
                      สีการ์ดอวยพร
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {CARD_THEMES.map((theme) => (
                        <button
                          key={theme.key}
                          type="button"
                          onClick={() => setCardTheme(theme.key)}
                          title={theme.label}
                          style={{ backgroundColor: theme.swatchColor }}
                          className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                            cardTheme === theme.key
                              ? 'border-[#47572a] ring-2 ring-[#47572a]/30 scale-110'
                              : 'border-[#c9ceb8]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#47572a] mb-1">
                    ข้อความอวยพร <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="เขียนความรู้สึก ความยินดี และคำอวยพรให้บูมและวันที่นี่..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9ceb8] text-sm bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#47572a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#47572a] hover:bg-[#374421] text-white font-semibold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
              <span className="text-xs text-[#66754e]">แตะหัวใจเพื่อส่งความรักให้คำอวยพร</span>
            </div>

            <div className="space-y-3.5 max-h-[560px] overflow-y-auto pr-2 custom-scroll">
              {entries.map((item, idx) => {
                const isOlive = item.cardTheme === 'olive';
                const themeObj =
                  CARD_THEMES.find((t) => t.key === item.cardTheme) || CARD_THEMES[0];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-5 rounded-2xl border shadow-xs transition space-y-2.5 ${themeObj.bgClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-full border flex items-center justify-center text-base shadow-2xs ${
                            isOlive
                              ? 'bg-[#66754e] border-[#c9ceb8]/40 text-white'
                              : 'bg-[#faf8f5] border-[#c9ceb8] text-[#47572a]'
                          }`}
                        >
                          {item.sticker || <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className={`font-semibold text-sm ${isOlive ? 'text-white' : 'text-[#47572a]'}`}>
                            {item.name}
                          </h4>
                          <span className={`text-[11px] font-normal ${isOlive ? 'text-[#c9ceb8]' : 'text-[#66754e]'}`}>
                            {item.relationship}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${isOlive ? 'text-[#c9ceb8]' : 'text-[#66754e]'}`}>
                          {new Date(item.createdAt).toLocaleDateString('th-TH', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleLike(item.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition cursor-pointer ${
                            likedIds[item.id]
                              ? 'bg-[#47572a] border-[#47572a] text-white font-semibold'
                              : isOlive
                              ? 'bg-[#66754e]/60 border-[#c9ceb8]/30 text-white hover:bg-[#66754e]'
                              : 'bg-white border-[#c9ceb8] text-[#576543] hover:border-[#47572a]'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              likedIds[item.id] ? 'text-[#c9ceb8] fill-current scale-110' : ''
                            }`}
                          />
                          <span>{item.likesCount || 0}</span>
                        </button>
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed pl-11 ${
                        isOlive ? 'text-[#f4f1ea]' : 'text-[#576543]'
                      }`}
                    >
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
