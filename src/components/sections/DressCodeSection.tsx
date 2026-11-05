'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, Check, Shirt, Copy } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { copyTextToClipboard } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

export function DressCodeSection() {
  const { dressCode } = WEDDING_DATA;
  const { showToast } = useToast();
  const [selectedColor, setSelectedColor] = useState(dressCode.palette[0]);

  const handleSelectAndCopyHex = async (color: (typeof dressCode.palette)[number]) => {
    setSelectedColor(color);
    const success = await copyTextToClipboard(color.hex);
    if (success) {
      showToast(`เลือกเนื้อผ้าโทนสี "${color.name}" และคัดลอกรหัส ${color.hex} แล้ว`, 'success');
    }
  };

  return (
    <section id="dress-code-section" className="py-20 px-4 sm:px-6 bg-[#f4f1ea]/55 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <Palette className="w-3.5 h-3.5 text-[#66754e]" />
          <span>Dress Code &amp; Fabric Swatches</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-2"
        >
          ธีมสีและการแต่งกาย
        </motion.h2>

        <BotanicalFlourish />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base max-w-xl mx-auto font-thai-serif"
        >
          {dressCode.descriptionTh}
        </motion.p>

        {/* Woven Ribbon Attire Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-block my-6 px-8 py-4 rounded-full fabric-card fabric-stitch"
        >
          <p className="text-xs text-[#66754e] font-medium font-thai-serif">รูปแบบการแต่งกาย</p>
          <p className="text-[#47572a] font-semibold text-sm sm:text-base mt-0.5 font-thai-serif">
            {dressCode.styleTh}
          </p>
          <p className="text-xs text-[#66754e] font-serif-luxury italic tracking-wide">
            ({dressCode.styleEn})
          </p>
        </motion.div>

        {/* Draped Silk / Satin Fabric Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mt-6">
          {dressCode.palette.map((color, index) => {
            const isSelected = selectedColor.hex === color.hex;
            return (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => handleSelectAndCopyHex(color)}
                className={`flex flex-col items-center p-4 rounded-t-[80px] rounded-b-[28px] transition duration-300 cursor-pointer group ${
                  isSelected
                    ? 'bg-white ring-2 ring-[#66754e]/40 shadow-[0_20px_40px_rgba(71,87,42,0.12)] -translate-y-2'
                    : 'fabric-card hover:-translate-y-1'
                }`}
              >
                {/* Organic Draped Fabric Swatch */}
                <div
                  className="relative w-20 h-24 rounded-t-full rounded-b-[22px] shadow-inner mb-3 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center overflow-hidden border border-black/5"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Realistic Satin Fold Overlay */}
                  <div className="absolute inset-0 satin-swatch pointer-events-none" />
                  <svg
                    viewBox="0 0 100 120"
                    className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
                    fill="none"
                  >
                    <path
                      d="M-10 20C30 50 70 0 110 40M-10 70C40 100 65 40 110 85"
                      stroke={color.textDark ? '#47572A' : '#FFFFFF'}
                      strokeWidth="1.5"
                    />
                  </svg>

                  <span
                    className={`relative z-10 transition-opacity text-xs font-mono font-bold ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ color: color.textDark ? '#2d381c' : '#ffffff' }}
                  >
                    <Check className="w-5 h-5" />
                  </span>
                </div>

                {/* Color Labels */}
                <span className="font-semibold text-[#47572a] text-xs sm:text-sm text-center font-thai-serif">
                  {color.name}
                </span>
                <span className="text-[11px] text-[#66754e] font-serif-luxury italic">
                  {color.nameEn}
                </span>
                <span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#faf8f5] font-mono text-[10px] text-[#576543] flex items-center gap-1">
                  <Copy className="w-2.5 h-2.5" />
                  {color.hex}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Selected Fabric Lookbook Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedColor.hex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-8 max-w-2xl mx-auto p-6 sm:p-7 rounded-[36px] fabric-card fabric-stitch flex flex-col sm:flex-row items-center gap-5 text-left font-thai-serif"
          >
            <div
              className="relative w-16 h-16 rounded-2xl shrink-0 shadow-inner border border-black/10 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: selectedColor.hex }}
            >
              <div className="absolute inset-0 satin-swatch pointer-events-none" />
              <Shirt
                className="w-6 h-6 relative z-10"
                style={{ color: selectedColor.textDark ? '#2d381c' : '#ffffff' }}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-semibold text-[#47572a] text-sm sm:text-base">
                  ไอเดียแมตช์ชุดเนื้อผ้าโทนสี {selectedColor.name} ({selectedColor.nameEn})
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#faf8f5] text-[#66754e]">
                  {selectedColor.hex}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#576543] mt-1 leading-relaxed">
                {selectedColor.styleHintTh}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-[#66754e] mt-6 flex items-center justify-center gap-1.5 font-thai-serif">
          <Sparkles className="w-3.5 h-3.5 text-[#66754e]" />
          <span>แตะที่ตัวอย่างเนื้อผ้าเพื่อดูคำแนะนำการแต่งกายและคัดลอกรหัสสี</span>
        </p>
      </div>
    </section>
  );
}
