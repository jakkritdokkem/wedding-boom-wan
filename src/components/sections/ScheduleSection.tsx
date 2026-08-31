'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Download, Sun, Sparkles, Gem, Heart, Utensils, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { useToast } from '@/components/providers/ToastProvider';

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
    const title = encodeURIComponent(`งานมงคลสมรส: ${couple.groom.nicknameEn} & ${couple.bride.nicknameEn}`);
    const details = encodeURIComponent(`พิธีมงคลสมรสระหว่าง ${couple.groom.nameTh} และ ${couple.bride.nameTh}\nHashtag: ${couple.hashtag}`);
    const location = encodeURIComponent(`${venue.name}, ${venue.hall}`);
    const dates = '20261128T000900Z/20261128T080000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(url, '_blank');
  };

  const handleDownloadIcs = () => {
    window.location.href = '/api/calendar/ics';
    showToast('กำลังดาวน์โหลดไฟล์ปฏิทิน .ics สำหรับ Apple/Outlook', 'success');
  };

  return (
    <section id="schedule-section" className="py-24 px-4 sm:px-6 bg-[#f5ebe2]/50 border-y border-[#d8decb]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/40 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Itinerary &amp; Ceremonies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-3"
          >
            กำหนดการพิธีการ
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#576543] text-sm sm:text-base font-thai-serif"
          >
            วันเสาร์ที่ 28 พฤศจิกายน 2569 ณ {venue.name}
          </motion.p>
        </div>

        {/* Schedule Cards Grid */}
        <div className="space-y-4 sm:space-y-5">
          {schedule.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName as keyof typeof ICON_MAP] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#c9ceb8]/60 shadow-sm hover:border-[#47572a] hover:shadow-md transition duration-300 gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#f4f1ea] border border-[#c9ceb8] text-[#47572a] shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#47572a] text-[#f4f1ea] font-mono text-xs font-medium">
                        {item.time}
                      </span>
                      <h3 className="font-semibold text-[#47572a] text-base sm:text-lg font-thai-serif">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#66754e] font-serif-luxury italic mt-0.5 tracking-wide">
                      {item.titleEn}
                    </p>
                    <p className="text-[#576543] text-xs sm:text-sm mt-1.5 leading-relaxed font-thai-serif">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#66754e] shrink-0 self-start sm:self-center pl-14 sm:pl-0 font-thai-serif">
                  <MapPin className="w-3.5 h-3.5 text-[#47572a]" />
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
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-thai-serif"
        >
          <button
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#f5ebe2] border border-[#c9ceb8] text-[#47572a] text-sm font-medium shadow-sm transition hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#47572a]" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#f5ebe2] border border-[#c9ceb8] text-[#47572a] text-sm font-medium shadow-sm transition hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4 text-[#47572a]" />
            <span>Download .ics (Apple / Outlook)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
