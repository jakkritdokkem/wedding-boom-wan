import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { VenueSection } from '@/components/sections/VenueSection';
import { DressCodeSection } from '@/components/sections/DressCodeSection';
import { RsvpSection } from '@/components/sections/RsvpSection';
import { GuestbookSection } from '@/components/sections/GuestbookSection';
import { BlessingBoxSection } from '@/components/sections/BlessingBoxSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { StickyFloatingBar } from '@/components/ui/StickyFloatingBar';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';

export default function Home() {
  const { couple } = WEDDING_DATA;

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#2d381c] selection:bg-[#47572a]/20 selection:text-[#47572a] relative">
      {/* Background Audio Player Toggle */}
      <AudioPlayer />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Our Story & Welcome */}
      <OurStorySection />

      {/* 3. Event Schedule & Timeline */}
      <ScheduleSection />

      {/* 4. Venue & Map */}
      <VenueSection />

      {/* 5. Dress Code */}
      <DressCodeSection />

      {/* 6. RSVP Form */}
      <RsvpSection />

      {/* 7. Wishes & Guestbook */}
      <GuestbookSection />

      {/* 8. Blessing Box / Gift Registry */}
      <BlessingBoxSection />

      {/* 9. Photo Gallery */}
      <GallerySection />

      {/* Footer */}
      <footer className="py-14 px-4 text-center bg-[#47572a] text-[#f4f1ea] border-t border-[#66754e]">
        <div className="max-w-md mx-auto space-y-3 font-thai-serif">
          <div className="flex items-center justify-center gap-2 text-[#c9ceb8]">
            <Sparkles className="w-4 h-4" />
            <span className="font-serif-luxury text-xl tracking-[0.15em] uppercase font-light text-[#f4f1ea]">
              {couple.bride.nicknameEn} &amp; {couple.groom.nicknameEn}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <p className="text-xs text-[#f5ebe2]/80">
            Thank you for being part of our special beginning
          </p>

          <div className="flex items-center justify-center gap-1 text-[11px] text-[#c9ceb8] pt-3">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#c9ceb8] fill-current" />
            <span>for our beloved family &amp; friends</span>
          </div>

          <p className="text-[10px] text-[#c9ceb8]/70 font-mono">
            {couple.hashtag} • 2026
          </p>
        </div>
      </footer>

      {/* 10. Sticky Floating Bar (Mobile View) */}
      <StickyFloatingBar />
    </main>
  );
}
