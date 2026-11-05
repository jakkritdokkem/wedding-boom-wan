'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types/wedding';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null) return null;
  const currentPhoto = photos[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#232b15]/90 backdrop-blur-lg p-4 sm:p-6"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#47572a] transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#47572a] transition cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#47572a] transition cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <motion.div
          key={currentPhoto.id}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) onPrev();
            else if (info.offset.x < -80) onNext();
          }}
          className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[60vh] sm:h-[74vh]">
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              className="object-contain rounded-2xl"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
          {currentPhoto.caption && (
            <p className="mt-4 text-[#47572a] font-thai-serif text-sm sm:text-base text-center bg-white/95 px-5 py-2 rounded-full border border-[#c9ceb8] flex items-center gap-2 shadow-md">
              <Heart className="w-3.5 h-3.5 text-[#66754e] fill-current" />
              <span>{currentPhoto.caption}</span>
            </p>
          )}
          <span className="text-[#c9ceb8] text-xs mt-2 font-mono">
            {currentIndex + 1} / {photos.length}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
