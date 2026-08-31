'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

export function HeroSection() {
  const { couple, venue } = WEDDING_DATA;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden bg-[#47572a] px-4 py-12 sm:py-16">
      {/* Background Image with Deep Olive Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&auto=format&fit=crop&q=85"
          alt="Pre-wedding signature"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 transform animate-pulse-glow"
        />
        {/* Exact Palette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#47572a]/85 via-[#47572a]/60 to-[#47572a]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#47572a]/40 to-[#47572a]/95" />
      </div>

      {/* Top Wedding Invitation Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-4 sm:pt-6"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f4f1ea]/15 backdrop-blur-md border border-[#c9ceb8]/40 text-[#f4f1ea] text-xs sm:text-sm tracking-[0.2em] uppercase font-light">
          <Sparkles className="w-3.5 h-3.5 text-[#c9ceb8]" />
          <span className="font-serif-luxury tracking-widest text-sm">The Wedding Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-[#c9ceb8]" />
        </div>
      </motion.div>

      {/* Main Content: Couple Names & Date */}
      <div className="relative z-10 max-w-3xl w-full my-auto py-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#f5ebe2] font-script text-2xl sm:text-3xl tracking-wide mb-1"
        >
          We invite you to celebrate the wedding of
        </motion.p>

        {/* English Names with Elegant Classical Serif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="my-3 sm:my-5"
        >
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-white">
            <span className="text-[#f4f1ea] drop-shadow-md block sm:inline">{couple.bride.nicknameEn}</span>
            <span className="text-[#c9ceb8] font-script font-normal mx-3 text-3xl sm:text-5xl">&</span>
            <span className="text-[#f4f1ea] drop-shadow-md block sm:inline">{couple.groom.nicknameEn}</span>
          </h1>
        </motion.div>

        {/* Thai Full Names with Noto Serif Thai */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#f4f1ea]/90 text-sm sm:text-base font-thai-serif tracking-wide space-y-1 mt-3"
        >
          <p>{couple.bride.nameTh} &amp; {couple.groom.nameTh}</p>
          <p className="text-xs sm:text-sm text-[#c9ceb8] font-mono tracking-widest">{couple.hashtag}</p>
        </motion.div>

        {/* Date & Venue Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-[#f4f1ea] text-xs sm:text-sm font-thai-serif"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#66754e]/60 border border-[#c9ceb8]/30 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-[#c9ceb8]" />
            <span>{couple.weddingDateThaiDisplay}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#66754e]/60 border border-[#c9ceb8]/30 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[#c9ceb8]" />
            <span>{venue.nameEn.split(',')[0]}</span>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <div className="mt-6">
          <CountdownTimer targetDate={couple.weddingDate} />
        </div>

        {/* Call to Actions (CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 max-w-md mx-auto"
        >
          <button
            onClick={() => scrollToSection('rsvp-section')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#f4f1ea] text-[#47572a] font-semibold text-sm sm:text-base shadow-lg shadow-black/20 hover:bg-[#f5ebe2] hover:scale-105 active:scale-95 transition duration-300 font-thai-serif"
          >
            <CheckCircle2 className="w-4 h-4 text-[#47572a]" />
            <span>ตอบรับการร่วมงาน (RSVP)</span>
          </button>

          <button
            onClick={() => scrollToSection('schedule-section')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#66754e]/80 hover:bg-[#66754e] border border-[#c9ceb8]/40 text-[#f4f1ea] text-sm sm:text-base backdrop-blur-md hover:scale-105 active:scale-95 transition duration-300 font-thai-serif"
          >
            <Calendar className="w-4 h-4 text-[#c9ceb8]" />
            <span>กำหนดการ &amp; แผนที่</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 pb-2 cursor-pointer"
        onClick={() => scrollToSection('story-section')}
      >
        <div className="flex flex-col items-center gap-1 text-[#c9ceb8] hover:text-white transition">
          <span className="text-[11px] uppercase tracking-widest font-thai-serif">เลื่อนลงเพื่อดูเรื่องราว</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#c9ceb8]" />
        </div>
      </motion.div>
    </section>
  );
}
