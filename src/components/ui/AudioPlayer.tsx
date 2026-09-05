'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // พยายามโหลดเพลง Those Eyes - New West จาก /audio/those-eyes.mp3
    // หากผู้ใช้ยังไม่ได้ใส่ไฟล์ จะ fallback กลับไปเพลงบรรเลงสำรอง
    const primarySrc = '/audio/those-eyes.mp3';
    const fallbackSrc = 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c89d97a9f7.mp3?filename=acoustic-guitar-ambient-wedding-love-113540.mp3';

    const audio = new Audio(primarySrc);
    audio.loop = true;
    audio.volume = 0.45;

    audio.addEventListener('error', () => {
      // เมื่อไม่พบไฟล์ local ให้สลับไปใช้สำรอง
      if (audio.src !== fallbackSrc && !audio.src.includes('pixabay')) {
        audio.src = fallbackSrc;
      }
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f4f1ea]/90 backdrop-blur-md border border-[#c9ceb8] shadow-lg text-[#47572a] hover:bg-[#47572a] hover:text-[#f4f1ea] transition duration-300 group"
        title={isPlaying ? 'หยุดเพลง (Those Eyes - New West)' : 'เปิดเพลง (Those Eyes - New West)'}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#47572a] group-hover:text-[#f4f1ea] animate-pulse" />
            <span className="text-xs font-medium pr-1 hidden sm:inline font-thai-serif">Those Eyes ♫</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#66754e] group-hover:text-[#f4f1ea]" />
            <span className="text-xs font-medium pr-1 hidden sm:inline font-thai-serif">Music</span>
          </>
        )}
      </button>
    </div>
  );
}
