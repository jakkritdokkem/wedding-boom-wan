'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Sparkles, CheckCircle2, ChevronDown, Heart } from 'lucide-react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

interface HeroSectionProps {
  guestName?: string | null;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  const { couple, venue } = WEDDING_DATA;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const archY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden px-4 pt-12 pb-16 sm:py-16"
    >
      {/* Top Hanging Draped Silk Swags (SVG Ceiling Drapery) */}
      <div className="absolute top-0 inset-x-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-28 sm:h-44 md:h-52"
          preserveAspectRatio="none"
        >
          {/* Left & Right Solid Satin Swags */}
          <path
            d="M0 0H720C580 180 260 220 0 140V0Z"
            fill="url(#leftSilk)"
          />
          <path
            d="M1440 0H720C860 180 1180 220 1440 140V0Z"
            fill="url(#rightSilk)"
          />
          {/* Center Solid Linen Valance */}
          <path
            d="M280 0H1160C1020 140 420 140 280 0Z"
            fill="#EDE9DF"
          />
          <defs>
            <linearGradient id="leftSilk" x1="0" y1="0" x2="720" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4F1EA" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E6E9DE" />
            </linearGradient>
            <linearGradient id="rightSilk" x1="1440" y1="0" x2="720" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4F1EA" />
              <stop offset="60%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E6E9DE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient Soft Sunlight Glows behind the Fabric Arch */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-white/90 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#c9ceb8]/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#f5ebe2]/70 blur-3xl pointer-events-none z-0" />

      {/* Top Woven Ribbon Invitation Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-4 sm:pt-6"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(71,87,42,0.06)] text-[#47572a] text-xs sm:text-sm tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#66754e]" />
          <span className="font-serif-luxury tracking-widest font-medium">The Wedding Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-[#66754e]" />
        </div>
      </motion.div>

      {/* Main Content: Editorial Draped Arch Portrait + Couple Names */}
      <div className="relative z-10 max-w-4xl w-full my-auto py-6">
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 text-[#47572a] shadow-sm mb-6 font-thai-serif text-xs sm:text-sm"
          >
            <Heart className="w-3.5 h-3.5 text-[#66754e] fill-current" />
            <span>
              เรียนเชิญ <strong className="font-semibold">คุณ{guestName.replace(/^คุณ/, '')}</strong> ร่วมเป็นเกียรติในวันสำคัญของเรา
            </span>
          </motion.div>
        )}

        {/* Centerpiece Draped Archway Frame */}
        <motion.div
          style={{ y: archY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto w-64 sm:w-80 h-80 sm:h-96 mb-8"
        >
          {/* Back Offset Olive/Sage Arch Shadow */}
          <div className="absolute -inset-3 rounded-t-full rounded-b-[48px] bg-gradient-to-b from-[#e8ece0]/80 via-[#f4f1ea] to-white/60 -rotate-2 animate-breeze" />

          {/* Main Arch Portrait Window */}
          <div className="relative w-full h-full rounded-t-full rounded-b-[42px] overflow-hidden shadow-[0_25px_60px_rgba(71,87,42,0.14)] border-[6px] border-white bg-[#f4f1ea]">
            <Image
              src="/images/prewedding/cs-613.jpg"
              alt={`${couple.bride.nicknameEn} & ${couple.groom.nicknameEn}`}
              fill
              priority
              className="object-cover object-top scale-105 hover:scale-110 transition duration-1000"
              sizes="(max-width: 768px) 320px, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#47572a]/20 via-transparent to-white/5" />
          </div>

          {/* Sheer Silk Veil Swag Overlapping Top-Right of Arch */}
          <svg
            viewBox="0 0 180 180"
            className="absolute -top-5 -right-7 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none drop-shadow-sm"
            fill="none"
          >
            <path
              d="M10 15C75 -5 160 40 165 140C125 110 75 65 10 15Z"
              fill="white"
              fillOpacity="0.88"
            />
            <path
              d="M25 10C80 15 135 60 150 125"
              stroke="#C9CEB8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>

          {/* Floating Monogram Linen Seal at Bottom of Arch */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-white shadow-md text-[#47572a] font-serif-luxury text-xs tracking-[0.25em] uppercase border border-[#e6e9de]">
            {couple.hashtag}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#66754e] font-script text-2xl sm:text-3xl tracking-wide mt-2"
        >
          We invite you to celebrate the wedding of
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="my-2 sm:my-3"
        >
          <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#47572a]">
            <span>{couple.bride.nicknameEn}</span>
            <span className="text-[#66754e] font-script font-normal mx-4 text-3xl sm:text-5xl">&amp;</span>
            <span>{couple.groom.nicknameEn}</span>
          </h1>
        </motion.div>

        <p className="text-[#2d381c] text-sm sm:text-lg font-thai-serif font-medium">
          {couple.bride.nameTh} &amp; {couple.groom.nameTh}
        </p>

        <BotanicalFlourish />

        {/* Soft Pill Date & Venue Tags (No hard borders) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 text-[#47572a] text-xs sm:text-sm font-thai-serif"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 shadow-[0_8px_25px_rgba(71,87,42,0.06)]">
            <Calendar className="w-4 h-4 text-[#66754e]" />
            <span>{couple.weddingDateThaiDisplay}</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 shadow-[0_8px_25px_rgba(71,87,42,0.06)]">
            <MapPin className="w-4 h-4 text-[#66754e]" />
            <span>{venue.name} ({venue.hall})</span>
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
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 max-w-md mx-auto"
        >
          <button
            onClick={() => scrollToSection('rsvp-section')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#47572a] text-white font-semibold text-sm sm:text-base shadow-[0_12px_30px_rgba(71,87,42,0.22)] hover:bg-[#374421] hover:scale-105 active:scale-95 transition duration-300 font-thai-serif cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#c9ceb8]" />
            <span>ตอบรับการร่วมงาน (RSVP)</span>
          </button>

          <button
            onClick={() => scrollToSection('schedule-section')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#47572a] text-sm sm:text-base shadow-[0_8px_25px_rgba(71,87,42,0.08)] hover:scale-105 active:scale-95 transition duration-300 font-thai-serif cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#66754e]" />
            <span>กำหนดการ &amp; แผนที่</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-10 pt-2 cursor-pointer"
        onClick={() => scrollToSection('story-section')}
      >
        <div className="flex flex-col items-center gap-1 text-[#66754e] hover:text-[#47572a] transition">
          <span className="text-[11px] uppercase tracking-widest font-thai-serif">เลื่อนลงเพื่อดูเรื่องราว</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#47572a]" />
        </div>
      </motion.div>
    </section>
  );
}
