'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Heart,
  Calendar,
  MapPin,
  Palette,
  CalendarCheck,
  MessageSquareQuote,
  Gift,
  Camera,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero-section', label: 'หน้าแรก', icon: Sparkles },
  { id: 'story-section', label: 'เรื่องราว', icon: Heart },
  { id: 'schedule-section', label: 'กำหนดการ', icon: Calendar },
  { id: 'venue-section', label: 'สถานที่', icon: MapPin },
  { id: 'dress-code-section', label: 'ธีมสี', icon: Palette },
  { id: 'rsvp-section', label: 'RSVP', icon: CalendarCheck },
  { id: 'guestbook-section', label: 'อวยพร', icon: MessageSquareQuote },
  { id: 'blessing-box-section', label: 'ของขวัญ', icon: Gift },
  { id: 'gallery-section', label: 'แกลเลอรี', icon: Camera },
];

export function SectionNav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeId, setActiveId] = useState('hero-section');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
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
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9ceb8] via-[#66754e] to-[#47572a] origin-left z-50"
      />

      {/* Desktop Floating Pill Navigation */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: scrolled ? 0 : -80,
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.35 }}
        aria-label="Wedding Sections Navigation"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-[#c9ceb8] shadow-md font-thai-serif"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'text-[#f4f1ea]'
                  : 'text-[#47572a] hover:bg-[#f4f1ea]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSectionPill"
                  className="absolute inset-0 rounded-full bg-[#47572a] -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </motion.nav>
    </>
  );
}
