'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/16/audio_c89d97a9f7.mp3?filename=acoustic-guitar-ambient-wedding-love-113540.mp3');
    audio.loop = true;
    audio.volume = 0.4;
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
        title={isPlaying ? 'ปิดเสียงเพลง' : 'เปิดเพลงบรรเลง'}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#47572a] group-hover:text-[#f4f1ea] animate-pulse" />
            <span className="text-xs font-medium pr-1 hidden sm:inline font-thai-serif">Playing</span>
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
