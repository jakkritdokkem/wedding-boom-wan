'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { formatTimeLeft } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(formatTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(formatTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto my-6 opacity-0">
        <div className="h-20 bg-white/20 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const items = [
    { label: 'วัน (Days)', value: timeLeft.days },
    { label: 'ชั่วโมง (Hours)', value: timeLeft.hours },
    { label: 'นาที (Mins)', value: timeLeft.minutes },
    { label: 'วินาที (Secs)', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-lg mx-auto my-6 px-2">
      <div className="flex items-center justify-center gap-2 mb-3 text-xs tracking-widest uppercase text-[#c9ceb8] font-thai-serif">
        <Clock className="w-3.5 h-3.5 text-[#c9ceb8]" />
        <span>Counting Down To The Big Day</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#f4f1ea] backdrop-blur-md border border-[#c9ceb8] shadow-lg shadow-black/10 transition-transform duration-300 hover:scale-105"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal text-[#47572a] tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#66754e] font-thai-serif mt-1 text-center">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
