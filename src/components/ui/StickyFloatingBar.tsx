'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin } from 'lucide-react';

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
          className="fixed bottom-4 left-4 right-4 z-40 sm:hidden"
        >
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#47572a]/92 backdrop-blur-lg border border-[#c9ceb8]/50 shadow-2xl font-thai-serif">
            <button
              onClick={() => scrollTo('rsvp-section')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f4f1ea] text-[#47572a] font-semibold text-sm shadow-md active:scale-95 transition"
            >
              <CheckCircle className="w-4 h-4 text-[#47572a]" />
              <span>RSVP ตอบรับ</span>
            </button>

            <button
              onClick={() => scrollTo('venue-section')}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#66754e] text-[#f4f1ea] border border-[#c9ceb8]/30 text-sm font-medium active:scale-95 transition hover:text-[#f5ebe2]"
            >
              <MapPin className="w-4 h-4 text-[#c9ceb8]" />
              <span>แผนที่</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
