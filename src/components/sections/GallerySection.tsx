'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ZoomIn, Heart, LayoutGrid, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { LightboxModal } from '@/components/ui/LightboxModal';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

export function GallerySection() {
  const { gallery } = WEDDING_DATA;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'bento' | 'polaroid'>('bento');

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length);
  };

  return (
    <section id="gallery-section" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <Camera className="w-3.5 h-3.5 text-[#66754e]" />
          <span>Pre-wedding Gallery</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-2"
        >
          ภาพแห่งความทรงจำ
        </motion.h2>

        <BotanicalFlourish />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base font-thai-serif"
        >
          บันทึกช่วงเวลาแห่งความสุข รอยยิ้ม และความอบอุ่นก่อนวันสำคัญ
        </motion.p>

        {/* View Mode Switcher */}
        <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white shadow-sm mt-6 font-thai-serif">
          <button
            type="button"
            onClick={() => setViewMode('bento')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
              viewMode === 'bento'
                ? 'bg-[#47572a] text-white shadow-xs'
                : 'text-[#47572a] hover:bg-[#faf8f5]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>ซุ้มภาพโค้ง (Draped Arches)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('polaroid')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
              viewMode === 'polaroid'
                ? 'bg-[#47572a] text-white shadow-xs'
                : 'text-[#47572a] hover:bg-[#faf8f5]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>โปสการ์ดผ้าลินิน (Linen Cards)</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === 'bento' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {gallery.map((photo, index) => {
            // Alternate arch shapes and vertical offset so it looks organic & editorial
            const shapeClass =
              index % 3 === 0
                ? 'rounded-t-[160px] rounded-b-[36px]'
                : index % 3 === 1
                ? 'rounded-[44px] sm:mt-8'
                : 'rounded-t-[44px] rounded-b-[140px]';

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => handleOpenLightbox(index)}
                className={`group relative h-80 sm:h-96 overflow-hidden shadow-[0_20px_50px_rgba(71,87,42,0.1)] cursor-pointer border-[6px] border-white bg-white ${shapeClass}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d381c]/80 via-[#47572a]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="p-2.5 rounded-full bg-white/90 text-[#47572a] shadow-sm">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <p className="text-white text-sm font-medium font-thai-serif mb-1">
                      {photo.caption}
                    </p>
                    <span className="text-[11px] text-[#c9ceb8] font-mono flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current text-[#c9ceb8]" />
                      <span>แตะเพื่อชมภาพขยาย</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9 pt-4">
          {gallery.map((photo, index) => {
            const rotation = index % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0';
            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleOpenLightbox(index)}
                className={`fabric-card fabric-stitch p-5 pb-7 rounded-[36px] cursor-pointer transition-all duration-300 hover:-translate-y-2 ${rotation}`}
              >
                <div className="relative h-72 w-full rounded-t-[100px] rounded-b-[24px] overflow-hidden bg-[#faf8f5] mb-4 border-2 border-white">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="font-thai-serif text-center text-sm text-[#47572a] font-medium">
                  &ldquo;{photo.caption}&rdquo;
                </p>
                <p className="font-script text-center text-lg text-[#66754e] mt-0.5">
                  Wan &amp; Boom • 2027
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        photos={gallery}
        currentIndex={selectedPhotoIndex}
        onClose={handleCloseLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
