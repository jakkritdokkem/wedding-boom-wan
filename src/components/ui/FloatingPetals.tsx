'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'ivory' | 'sparkle' | 'leaf';
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.1 + (i % 3) * 3) % 98}%`,
      size: 6 + (i % 4) * 3,
      duration: 15 + (i % 5) * 4,
      delay: (i % 7) * 1.8,
      opacity: 0.25 + (i % 3) * 0.14,
      type: i % 3 === 0 ? 'ivory' : i % 3 === 1 ? 'leaf' : 'sparkle',
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, p.id % 2 === 0 ? 35 : -35, 0],
            rotate: [0, p.id % 2 === 0 ? 220 : -220],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          className="absolute top-0"
        >
          {p.type === 'ivory' && (
            <div className="w-full h-full rounded-tl-full rounded-br-full bg-white border border-[#c9ceb8]/70 shadow-2xs" />
          )}
          {p.type === 'leaf' && (
            <div className="w-full h-full rounded-tr-full rounded-bl-full bg-[#66754e]/40" />
          )}
          {p.type === 'sparkle' && (
            <div className="w-full h-full rounded-full bg-[#c9ceb8]/75 shadow-[0_0_8px_rgba(201,206,184,0.85)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
