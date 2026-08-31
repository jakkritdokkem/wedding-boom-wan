'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ZoomIn, Heart } from 'lucide-react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { LightboxModal } from '@/components/ui/LightboxModal';

export function GallerySection() {
  const { gallery } = WEDDING_DATA;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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
    <section id="gallery-section" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/40 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <Camera className="w-3.5 h-3.5 text-[#47572a]" />
          <span>Pre-wedding Gallery</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-3"
        >
          ภาพแห่งความทรงจำ
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base font-thai-serif"
        >
          บันทึกช่วงเวลาแห่งความสุข รอยยิ้ม และความอบอุ่นก่อนวันสำคัญ
        </motion.p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {gallery.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => handleOpenLightbox(index)}
            className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md cursor-pointer border border-[#c9ceb8]/60"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-110 transition duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Hover Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#47572a]/85 via-[#47572a]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
              <div className="flex justify-end">
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div>
                <p className="text-[#f4f1ea] text-sm font-medium font-thai-serif mb-1">
                  {photo.caption}
                </p>
                <span className="text-[11px] text-[#c9ceb8] font-mono flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current text-[#c9ceb8]" />
                  <span>Click to expand</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
