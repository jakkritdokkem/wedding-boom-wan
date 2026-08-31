'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Check } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { copyTextToClipboard } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';

export function DressCodeSection() {
  const { dressCode } = WEDDING_DATA;
  const { showToast } = useToast();

  const handleCopyHex = async (hex: string, name: string) => {
    const success = await copyTextToClipboard(hex);
    if (success) {
      showToast(`คัดลอกรหัสสี ${name} (${hex}) เรียบร้อยแล้ว`, 'success');
    }
  };

  return (
    <section id="dress-code-section" className="py-24 px-4 sm:px-6 bg-[#f5ebe2]/60 border-y border-[#d8decb]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/40 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Dress Code &amp; Theme</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-3"
        >
          ธีมสีและการแต่งกาย
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base max-w-xl mx-auto font-thai-serif"
        >
          {dressCode.descriptionTh}
        </motion.p>

        {/* Attire Formality Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-block my-6 px-6 py-3 rounded-2xl bg-white border border-[#c9ceb8] shadow-sm"
        >
          <p className="text-xs text-[#66754e] font-medium font-thai-serif">รูปแบบการแต่งกาย</p>
          <p className="text-[#47572a] font-semibold text-sm sm:text-base mt-0.5 font-thai-serif">
            {dressCode.styleTh}
          </p>
          <p className="text-xs text-[#66754e] font-serif-luxury italic tracking-wide">
            ({dressCode.styleEn})
          </p>
        </motion.div>

        {/* Color Palette Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-8">
          {dressCode.palette.map((color, index) => (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => handleCopyHex(color.hex, color.name)}
              className="flex flex-col items-center p-4 rounded-2xl bg-white border border-[#c9ceb8]/60 shadow-sm hover:shadow-md hover:border-[#47572a] transition duration-300 cursor-pointer group"
            >
              {/* Color Circle Swatch */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-inner mb-3 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center border-2 border-[#f4f1ea]"
                style={{ backgroundColor: color.hex }}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono font-bold"
                  style={{ color: color.textDark ? '#2d381c' : '#ffffff' }}
                >
                  <Check className="w-4 h-4" />
                </span>
              </div>

              {/* Color Labels */}
              <span className="font-semibold text-[#47572a] text-xs sm:text-sm text-center font-thai-serif">
                {color.name}
              </span>
              <span className="text-[11px] text-[#66754e] font-serif-luxury italic">
                {color.nameEn}
              </span>
              <span className="mt-1 px-2.5 py-0.5 rounded bg-[#f4f1ea] font-mono text-[10px] text-[#576543] group-hover:bg-[#c9ceb8]/40 group-hover:text-[#47572a] transition">
                {color.hex}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-[#66754e] mt-8 flex items-center justify-center gap-1.5 font-thai-serif">
          <Sparkles className="w-3.5 h-3.5" />
          <span>แตะที่แถบสีเพื่อคัดลอกรหัสสี (Copy Hex Code)</span>
        </p>
      </div>
    </section>
  );
}
