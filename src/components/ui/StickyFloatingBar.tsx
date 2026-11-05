'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin, MessageSquareQuote, Gift } from 'lucide-react';

export function StickyFloatingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-3 right-3 z-40 lg:hidden"
        >
          <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-white/95 backdrop-blur-lg border border-[#c9ceb8] shadow-xl font-thai-serif">
            <button
              onClick={() => scrollTo('rsvp-section')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#47572a] text-white font-semibold text-xs sm:text-sm shadow-sm active:scale-95 transition cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-[#c9ceb8]" />
              <span>RSVP ตอบรับ</span>
            </button>

            <button
              onClick={() => scrollTo('guestbook-section')}
              className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#faf8f5] text-[#47572a] border border-[#c9ceb8] text-xs sm:text-sm font-medium active:scale-95 transition cursor-pointer"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#66754e]" />
              <span>อวยพร</span>
            </button>

            <button
              onClick={() => scrollTo('blessing-box-section')}
              className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#faf8f5] text-[#47572a] border border-[#c9ceb8] text-xs sm:text-sm font-medium active:scale-95 transition cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#66754e]" />
              <span>ใส่ซอง</span>
            </button>

            <button
              onClick={() => scrollTo('venue-section')}
              className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#faf8f5] text-[#47572a] border border-[#c9ceb8] text-xs sm:text-sm font-medium active:scale-95 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#66754e]" />
              <span>แผนที่</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
