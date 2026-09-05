'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // วิดีโอ ID จาก https://www.youtube.com/watch?v=GDND88fqt1o
    const videoId = 'GDND88fqt1o';

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            event.target.setVolume(50);
            
            // พยายามสั่งเล่นอัตโนมัติทันที
            try {
              event.target.playVideo();
            } catch {
              // Browser policy may block
            }

            // ในกรณีที่ Browser บล็อก autoplay โดยไม่มี gesture ให้เล่นทันทีที่มีการแตะ/คลิก/เลื่อนหน้าเว็บครั้งแรก
            const startOnFirstInteraction = () => {
              try {
                if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
                  playerRef.current.playVideo();
                }
              } catch {}
              window.removeEventListener('click', startOnFirstInteraction);
              window.removeEventListener('touchstart', startOnFirstInteraction);
              window.removeEventListener('scroll', startOnFirstInteraction);
            };

            window.addEventListener('click', startOnFirstInteraction, { once: true, passive: true });
            window.addEventListener('touchstart', startOnFirstInteraction, { once: true, passive: true });
            window.addEventListener('scroll', startOnFirstInteraction, { once: true, passive: true });
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    // โหลด YouTube IFrame API ถ้ายั่งไม่มี
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch {
      // fallback handling
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame Container */}
      <div className="hidden" aria-hidden="true">
        <div id="youtube-audio-player" />
      </div>

      {/* Floating Control Button */}
      <div className="fixed top-5 right-5 z-40">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f4f1ea]/90 backdrop-blur-md border border-[#c9ceb8] shadow-lg text-[#47572a] hover:bg-[#47572a] hover:text-[#f4f1ea] transition duration-300 group cursor-pointer"
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
              <span className="text-xs font-medium pr-1 hidden sm:inline font-thai-serif">
                {isReady ? 'Music' : 'Loading...'}
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

