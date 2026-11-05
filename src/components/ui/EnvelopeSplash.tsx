'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Heart } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { fireWeddingConfetti } from '@/components/ui/ConfettiBurst';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

interface EnvelopeSplashProps {
  guestName?: string | null;
  onOpen?: () => void;
}

export function EnvelopeSplash({ guestName, onOpen }: EnvelopeSplashProps) {
  const { couple, venue } = WEDDING_DATA;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Always reset scroll position to the very top on page load / refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleUntieRibbon = () => {
    if (isOpening) return;
    setIsOpening(true);

    window.dispatchEvent(new CustomEvent('wedding:open-invitation'));

    setTimeout(() => {
      fireWeddingConfetti();
    }, 350);

    setTimeout(() => {
      setIsOpen(true);
      onOpen?.();
    }, 1350);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="curtain-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
        >
          {/* Solid Opaque Backdrop before curtains part so 0% of background leaks through */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="absolute inset-0 bg-[#f4f1ea] pointer-events-none"
          />

          {/* Left Heavy Opaque Satin & Linen Curtain Panel */}
          <motion.div
            initial={{ x: '0%' }}
            animate={isOpening ? { x: '-104%' } : { x: '0%' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 w-[51%] bg-[#f4f1ea] shadow-[25px_0_70px_rgba(45,56,28,0.22)] border-r border-[#d8decb]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #f4f1ea 0px, #fbfaf7 22px, #ffffff 42px, #ebe6db 68px, #f4f1ea 92px)',
            }}
          >
            {/* Top Curtain Pelmet / Valance Shadow */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#d8decb]/50 to-transparent pointer-events-none" />
            {/* Deep Fabric Fold Shadows */}
            <div className="absolute inset-y-0 right-4 w-10 bg-gradient-to-r from-transparent via-[#c9ceb8]/40 to-transparent" />
            <div className="absolute inset-y-0 right-20 w-14 bg-gradient-to-r from-transparent via-[#c9ceb8]/30 to-transparent" />
            <div className="absolute inset-y-0 left-1/3 w-16 bg-gradient-to-r from-transparent via-[#c9ceb8]/25 to-transparent" />
          </motion.div>

          {/* Right Heavy Opaque Satin & Linen Curtain Panel */}
          <motion.div
            initial={{ x: '0%' }}
            animate={isOpening ? { x: '104%' } : { x: '0%' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 w-[51%] bg-[#f4f1ea] shadow-[-25px_0_70px_rgba(45,56,28,0.22)] border-l border-[#d8decb]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #f4f1ea 0px, #ebe6db 24px, #ffffff 50px, #fbfaf7 70px, #f4f1ea 92px)',
            }}
          >
            {/* Top Curtain Pelmet / Valance Shadow */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#d8decb]/50 to-transparent pointer-events-none" />
            {/* Deep Fabric Fold Shadows */}
            <div className="absolute inset-y-0 left-4 w-10 bg-gradient-to-l from-transparent via-[#c9ceb8]/40 to-transparent" />
            <div className="absolute inset-y-0 left-20 w-14 bg-gradient-to-l from-transparent via-[#c9ceb8]/30 to-transparent" />
            <div className="absolute inset-y-0 right-1/3 w-16 bg-gradient-to-l from-transparent via-[#c9ceb8]/25 to-transparent" />
          </motion.div>

          {/* Horizontal Olive Satin Ribbon Tie Across Curtain */}
          <motion.div
            animate={
              isOpening
                ? { scaleX: 1.3, opacity: 0, y: 20 }
                : { scaleX: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.65 }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-r from-[#47572a] via-[#66754e] to-[#47572a] shadow-md pointer-events-none"
          />

          {/* Center Solid Arch Linen Keepsake Invitation Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={
              isOpening
                ? { opacity: 0, scale: 1.08, y: -25 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onClick={handleUntieRibbon}
            className="relative z-10 w-full max-w-md mx-4 cursor-pointer group"
          >
            {/* 100% Opaque Solid Ivory & Cream Arch Card */}
            <div className="bg-[#ffffff] fabric-stitch rounded-t-[180px] rounded-b-[40px] pt-14 pb-8 px-6 sm:px-10 text-center relative overflow-hidden border-2 border-[#e2e6d8] shadow-[0_30px_80px_rgba(45,56,28,0.18)]">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f4f1ea] text-[#66754e] text-[11px] tracking-[0.25em] uppercase font-serif-luxury mb-3">
                <Sparkles className="w-3 h-3 text-[#66754e]" />
                <span>Wedding Invitation</span>
                <Sparkles className="w-3 h-3 text-[#66754e]" />
              </div>

              <p className="font-script text-2xl sm:text-3xl text-[#66754e]">
                Together with our families
              </p>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#47572a] tracking-wide font-normal my-2">
                {couple.bride.nicknameEn}{' '}
                <span className="font-script text-3xl text-[#66754e]">&amp;</span>{' '}
                {couple.groom.nicknameEn}
              </h1>

              <p className="font-thai-serif text-xs sm:text-sm text-[#576543]">
                {couple.bride.nameTh} &amp; {couple.groom.nameTh}
              </p>

              <BotanicalFlourish />

              {/* Guest Name Woven Linen Label */}
              <div className="py-3.5 px-5 rounded-3xl bg-[#f4f1ea] border border-dashed border-[#c9ceb8] my-4">
                <p className="text-[11px] uppercase tracking-widest text-[#66754e] font-thai-serif mb-1">
                  ขอเรียนเชิญแขกผู้มีเกียรติ
                </p>
                <p className="font-thai-serif text-base sm:text-lg font-semibold text-[#47572a]">
                  {guestName ? `คุณ${guestName.replace(/^คุณ/, '')}` : 'ท่านผู้มีเกียรติและครอบครัว'}
                </p>
              </div>

              {/* Interactive Satin Ribbon Knot & Botanical Seal */}
              <div className="relative flex flex-col items-center justify-center mt-5">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex items-center justify-center"
                >
                  {/* Left & Right Solid Satin Ribbon Tails */}
                  <div className="w-14 h-5 bg-gradient-to-r from-[#47572a] to-[#66754e] rounded-l-full -mr-2 rotate-[-12deg] shadow-xs group-hover:rotate-[-20deg] transition-transform" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#66754e] via-[#47572a] to-[#364320] shadow-[0_12px_30px_rgba(71,87,42,0.35)] border-4 border-[#fbfaf7] flex flex-col items-center justify-center text-white group-hover:scale-110 transition-transform z-10">
                    <span className="font-serif-luxury text-lg font-semibold tracking-widest">
                      W&amp;B
                    </span>
                    <Heart className="w-3 h-3 text-[#c9ceb8] fill-current mt-0.5" />
                  </div>
                  <div className="w-14 h-5 bg-gradient-to-l from-[#47572a] to-[#66754e] rounded-r-full -ml-2 rotate-[12deg] shadow-xs group-hover:rotate-[20deg] transition-transform" />
                </motion.div>

                <span className="font-thai-serif text-xs sm:text-sm font-medium text-[#47572a] mt-3 group-hover:text-[#66754e] transition">
                  {isOpening ? 'กำลังแหวกม่านเข้าสู่งาน...' : 'แตะที่โบว์ผ้าเพื่อเปิดม่านการ์ดเชิญ'}
                </span>
              </div>

              {/* Date & Venue Footer */}
              <div className="mt-5 pt-4 border-t border-[#e6e9de] flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#576543] font-thai-serif">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#66754e]" />
                  {couple.weddingDateThaiDisplay}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#66754e]" />
                  {venue.name}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
