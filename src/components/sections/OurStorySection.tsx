'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Quote } from 'lucide-react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/wedding-data';

export function OurStorySection() {
  const { story, couple } = WEDDING_DATA;

  return (
    <section id="story-section" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/35 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <Heart className="w-3.5 h-3.5 text-[#66754e]" />
          <span>Our Journey &amp; Welcome</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-4"
        >
          เส้นทางแห่งความรัก
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[#66754e] text-sm sm:text-base leading-relaxed font-thai-serif"
        >
          จากวันแรกที่ได้พบ สู่การเดินทางที่เติมเต็มหัวใจ และก้าวสู่คำมั่นสัญญาตลอดไป
        </motion.p>
      </div>

      {/* Official Welcome & Parents Message Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-panel-cream p-6 sm:p-10 rounded-3xl mb-16 relative overflow-hidden shadow-lg border border-[#c9ceb8]"
      >
        <Quote className="w-12 h-12 text-[#66754e]/20 absolute -top-2 -left-2 rotate-180" />
        
        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-[#47572a] text-base sm:text-lg leading-relaxed font-thai-serif">
            &quot;{couple.welcomeMessage}&quot;
          </p>

          <div className="h-[1px] w-24 bg-[#c9ceb8] mx-auto my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#47572a]">
            <div className="p-4 bg-white/85 rounded-2xl border border-[#c9ceb8]/50 shadow-sm">
              <p className="font-semibold text-[#47572a] font-thai-serif">{couple.bride.parentTh}</p>
              <p className="text-[#66754e] mt-0.5 font-thai-serif">บิดา-มารดา เจ้าสาว</p>
            </div>
            <div className="p-4 bg-white/85 rounded-2xl border border-[#c9ceb8]/50 shadow-sm">
              <p className="font-semibold text-[#47572a] font-thai-serif">{couple.groom.parentTh}</p>
              <p className="text-[#66754e] mt-0.5 font-thai-serif">บิดา-มารดา เจ้าบ่าว</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical Love Timeline */}
      <div className="relative border-l-2 border-[#c9ceb8] ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
        {story.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="relative group"
          >
            {/* Timeline Dot with Year */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#47572a] border-4 border-[#f4f1ea] shadow-md flex items-center justify-center group-hover:scale-125 transition duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f4f1ea]" />
            </div>

            {/* Desktop Year Label on Left */}
            <span className="hidden sm:block absolute -left-32 top-1 text-sm font-serif-luxury font-semibold text-[#47572a] text-right w-20 tracking-wider">
              {item.year}
            </span>

            {/* Card Content */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#c9ceb8]/60 hover:border-[#66754e] hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row gap-5 items-center">
                <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-[#f5ebe2]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#47572a]/85 backdrop-blur-sm text-[11px] text-[#f4f1ea] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c9ceb8]" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#47572a] tracking-wider uppercase font-thai-serif">
                      {item.date}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#66754e]" />
                  </div>

                  <h3 className="font-thai-serif text-xl sm:text-2xl font-semibold text-[#47572a] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[#576543] text-sm leading-relaxed font-thai-serif">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
