'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VolumeX, Disc3 } from 'lucide-react';

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
    const videoId = 'GDND88fqt1o';

    const playAudioSafely = () => {
      try {
        if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } catch {
        // Browser policy block fallback
      }
    };

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
            event.target.setVolume(55);
            playAudioSafely();

            const startOnFirstInteraction = () => {
              playAudioSafely();
              window.removeEventListener('click', startOnFirstInteraction);
              window.removeEventListener('touchstart', startOnFirstInteraction);
            };

            window.addEventListener('click', startOnFirstInteraction, { once: true, passive: true });
            window.addEventListener('touchstart', startOnFirstInteraction, { once: true, passive: true });
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    const handleOpenInvitation = () => {
      playAudioSafely();
    };

    window.addEventListener('wedding:open-invitation', handleOpenInvitation);

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
      window.removeEventListener('wedding:open-invitation', handleOpenInvitation);
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
      <div className="hidden" aria-hidden="true">
        <div id="youtube-audio-player" />
      </div>

      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#c9ceb8] shadow-md text-[#47572a] hover:bg-[#47572a] hover:text-[#f4f1ea] transition duration-300 group cursor-pointer"
          title={isPlaying ? 'หยุดเพลง (Those Eyes - New West)' : 'เปิดเพลง (Those Eyes - New West)'}
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <>
              <Disc3 className="w-4 h-4 text-[#47572a] group-hover:text-[#f4f1ea] animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-medium hidden sm:inline font-thai-serif">Those Eyes</span>
              {/* Equalizer animated bars */}
              <span className="flex items-end gap-0.5 h-3 pr-0.5">
                <span className="w-0.5 h-2.5 bg-[#47572a] group-hover:bg-[#f4f1ea] animate-pulse rounded-full" />
                <span className="w-0.5 h-3.5 bg-[#66754e] group-hover:bg-[#c9ceb8] animate-bounce rounded-full" />
                <span className="w-0.5 h-2 bg-[#47572a] group-hover:bg-[#f4f1ea] animate-pulse rounded-full" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#66754e] group-hover:text-[#f4f1ea]" />
              <span className="text-xs font-medium pr-1 hidden sm:inline font-thai-serif">
                {isReady ? 'เปิดเพลง ♫' : 'กำลังโหลด...'}
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
