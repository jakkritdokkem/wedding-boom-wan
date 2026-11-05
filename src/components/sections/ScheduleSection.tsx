'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Download, Sun, Sparkles, Gem, Heart, Utensils, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { useToast } from '@/components/providers/ToastProvider';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

const ICON_MAP = {
  sun: Sun,
  sparkles: Sparkles,
  gem: Gem,
  heart: Heart,
  utensils: Utensils,
};

export function ScheduleSection() {
  const { schedule, couple, venue } = WEDDING_DATA;
  const { showToast } = useToast();

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(
      `งานมงคลสมรส: ${couple.bride.nicknameEn} & ${couple.groom.nicknameEn} (${couple.hashtag})`
    );
    const details = encodeURIComponent(
      `พิธีมงคลสมรสระหว่าง ${couple.bride.nameTh} (${couple.bride.nicknameTh}) และ ${couple.groom.nameTh} (${couple.groom.nicknameTh})\nสถานที่: ${venue.name} (${venue.hall})\nHashtag: ${couple.hashtag}`
    );
    const location = encodeURIComponent(`${venue.name}, ${venue.hall}, ${venue.address}`);
    const dates = '20270109T000900Z/20270109T080000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(url, '_blank');
  };

  const handleDownloadIcs = () => {
    window.location.href = '/api/calendar/ics';
    showToast('กำลังดาวน์โหลดไฟล์ปฏิทิน .ics สำหรับ Apple/Outlook', 'success');
  };

  return (
    <section id="schedule-section" className="py-20 px-4 sm:px-6 bg-[#f4f1ea]/55 relative overflow-hidden">
      {/* Ambient Silk Wave Highlight */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-64 rounded-full bg-white/70 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
          >
            <Clock className="w-3.5 h-3.5 text-[#66754e]" />
            <span>Itinerary &amp; Ceremonies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-2"
          >
            กำหนดการพิธีการ
          </motion.h2>

          <BotanicalFlourish />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#576543] text-sm sm:text-base font-thai-serif"
          >
            {couple.weddingDateThaiDisplay} ณ {venue.name} ({venue.hall})
          </motion.p>
        </div>

        {/* Soft Arch Ceremony Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {schedule.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName as keyof typeof ICON_MAP] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group fabric-card fabric-stitch rounded-t-[100px] rounded-b-[32px] pt-8 pb-6 px-5 text-center flex flex-col items-center justify-between hover:-translate-y-2 transition duration-300"
              >
                <div className="flex flex-col items-center">
                  {/* Medallion Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#faf8f5] shadow-inner border border-[#e2e6d8] text-[#47572a] group-hover:bg-[#47572a] group-hover:text-white transition duration-300 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Time Ribbon Pill */}
                  <span className="px-3.5 py-1 rounded-full bg-[#47572a] text-white font-mono text-xs font-medium mb-3 shadow-xs">
                    {item.time}
                  </span>

                  <h3 className="font-semibold text-[#47572a] text-base font-thai-serif leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#66754e] font-serif-luxury italic mt-0.5">
                    {item.titleEn}
                  </p>
                  <p className="text-[#576543] text-xs mt-2.5 leading-relaxed font-thai-serif">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-[#c9ceb8]/60 w-full flex items-center justify-center gap-1 text-[11px] text-[#66754e] font-thai-serif">
                  <MapPin className="w-3 h-3 text-[#66754e]" />
                  <span>{item.location}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add to Calendar CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-thai-serif"
        >
          <button
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#47572a] hover:bg-[#374421] text-white text-sm font-medium shadow-[0_10px_25px_rgba(71,87,42,0.18)] transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#c9ceb8]" />
            <span>บันทึกใน Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#faf8f5] text-[#47572a] text-sm font-medium shadow-[0_8px_25px_rgba(71,87,42,0.08)] transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#66754e]" />
            <span>ดาวน์โหลด .ics (Apple / Outlook)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
