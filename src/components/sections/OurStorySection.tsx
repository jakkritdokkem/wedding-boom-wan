'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin } from 'lucide-react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

export function OurStorySection() {
  const { story, couple } = WEDDING_DATA;

  return (
    <section id="story-section" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <Heart className="w-3.5 h-3.5 text-[#66754e] fill-current" />
          <span>Our Journey &amp; Welcome</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-2"
        >
          เส้นทางแห่งความรัก
        </motion.h2>

        <BotanicalFlourish />

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

      {/* Draped Fabric Banner for Parents & Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="fabric-card fabric-stitch rounded-[44px] p-7 sm:p-12 mb-20 relative overflow-hidden"
      >
        {/* Soft Silk Corner Swags */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#e8ece0]/60 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#f5ebe2]/80 blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
          <p className="text-[#47572a] text-base sm:text-xl leading-relaxed font-thai-serif italic">
            &ldquo;{couple.welcomeMessage}&rdquo;
          </p>

          <BotanicalFlourish />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs sm:text-sm text-[#47572a]">
            <div className="p-6 bg-white/80 rounded-[28px] shadow-[0_10px_30px_rgba(71,87,42,0.04)]">
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#f4f1ea] text-[#66754e] text-[11px] mb-2 font-thai-serif">
                ฝ่ายเจ้าสาว ({couple.bride.nicknameTh})
              </span>
              <p className="font-semibold text-[#47572a] text-base font-thai-serif">{couple.bride.nameTh}</p>
              <p className="text-[#66754e] text-xs mt-1 font-thai-serif">{couple.bride.parentTh}</p>
            </div>
            <div className="p-6 bg-white/80 rounded-[28px] shadow-[0_10px_30px_rgba(71,87,42,0.04)]">
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#f4f1ea] text-[#66754e] text-[11px] mb-2 font-thai-serif">
                ฝ่ายเจ้าบ่าว ({couple.groom.nicknameTh})
              </span>
              <p className="font-semibold text-[#47572a] text-base font-thai-serif">{couple.groom.nameTh}</p>
              <p className="text-[#66754e] text-xs mt-1 font-thai-serif">{couple.groom.parentTh}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editorial Alternating Arch Story Milestones (No boxy timeline) */}
      <div className="space-y-16 sm:space-y-24 relative">
        {/* Center Delicate Silk Thread Line (Desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-12 bottom-12 -translate-x-1/2 w-[1px] border-l border-dashed border-[#c9ceb8]"
          aria-hidden="true"
        />

        {story.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-14 relative`}
            >
              {/* Arch Photo Frame */}
              <div className="w-full md:w-5/12 flex justify-center">
                <div className="relative w-64 sm:w-72 h-80 group">
                  {/* Soft Fabric Backdrop Layer */}
                  <div
                    className={`absolute -inset-2.5 rounded-t-full rounded-b-[36px] bg-[#e8ece0]/70 transition-transform duration-500 ${
                      isEven ? '-rotate-3 group-hover:rotate-0' : 'rotate-3 group-hover:rotate-0'
                    }`}
                  />
                  <div className="relative w-full h-full rounded-t-full rounded-b-[32px] overflow-hidden shadow-[0_20px_50px_rgba(71,87,42,0.12)] border-4 border-white bg-[#f4f1ea]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] text-[#47572a] font-medium flex items-center gap-1 shadow-xs whitespace-nowrap">
                      <MapPin className="w-3 h-3 text-[#66754e]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Year Silk Knot (Desktop) */}
              <div className="hidden md:flex w-2/12 justify-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_25px_rgba(71,87,42,0.1)] border border-[#e6e9de] flex items-center justify-center font-serif-luxury font-bold text-lg text-[#47572a]">
                  {item.year}
                </div>
              </div>

              {/* Story Description Card */}
              <div className="w-full md:w-5/12">
                <div className="fabric-card fabric-stitch rounded-[36px] p-6 sm:p-8 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4f1ea] text-xs font-semibold text-[#66754e] mb-3 font-thai-serif">
                    <Sparkles className="w-3.5 h-3.5 text-[#66754e]" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-thai-serif text-xl sm:text-2xl font-semibold text-[#47572a] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-[#576543] text-sm sm:text-base leading-relaxed font-thai-serif">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
