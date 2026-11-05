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
import { EnvelopeSplash } from '@/components/ui/EnvelopeSplash';
import { FloatingPetals } from '@/components/ui/FloatingPetals';
import { SectionNav } from '@/components/ui/SectionNav';
import { FabricDrapeDivider, BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';
import { Sparkles, Heart, Lock } from 'lucide-react';
import Link from 'next/link';
import { WEDDING_DATA } from '@/lib/wedding-data';

interface HomePageProps {
  searchParams: Promise<{ to?: string; guest?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { couple } = WEDDING_DATA;
  const resolvedParams = await searchParams;
  const guestName = resolvedParams?.to || resolvedParams?.guest || null;

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#2d381c] selection:bg-[#47572a]/15 selection:text-[#47572a] relative overflow-x-hidden">
      {/* Interactive Draped Silk Curtain & Ribbon Splash */}
      <EnvelopeSplash guestName={guestName} />

      {/* Romantic Ambient Ivory Petals & Olive Leaves */}
      <FloatingPetals />

      {/* Top Scroll Progress & Desktop Quick Navigation */}
      <SectionNav />

      {/* Background Audio Player Toggle */}
      <AudioPlayer />

      {/* 1. Hero Section with Hanging Silk Swags & Arch Portrait */}
      <HeroSection guestName={guestName} />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider />

      {/* 2. Our Story & Welcome */}
      <OurStorySection />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider flip />

      {/* 3. Event Schedule & Timeline */}
      <ScheduleSection />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider />

      {/* 4. Venue & Map */}
      <VenueSection />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider flip />

      {/* 5. Dress Code & Satin Swatches */}
      <DressCodeSection />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider />

      {/* 6. RSVP Form */}
      <RsvpSection guestName={guestName} />

      {/* 7. Wishes & Guestbook */}
      <GuestbookSection />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider flip />

      {/* 8. Blessing Box / Gift Registry */}
      <BlessingBoxSection />

      {/* Flowing Silk Wave Transition */}
      <FabricDrapeDivider />

      {/* 9. Photo Gallery */}
      <GallerySection />

      {/* Footer with Draped Fabric Top */}
      <FabricDrapeDivider flip />
      <footer className="py-16 px-4 text-center bg-[#f4f1ea]/80 text-[#47572a] relative z-10">
        <div className="max-w-md mx-auto space-y-3 font-thai-serif">
          <div className="flex items-center justify-center gap-2 text-[#66754e]">
            <Sparkles className="w-4 h-4 text-[#66754e]" />
            <span className="font-serif-luxury text-2xl tracking-[0.15em] uppercase font-normal text-[#47572a]">
              {couple.bride.nicknameEn} &amp; {couple.groom.nicknameEn}
            </span>
            <Sparkles className="w-4 h-4 text-[#66754e]" />
          </div>

          <BotanicalFlourish />

          <p className="text-xs text-[#576543]">
            Thank you for being part of our special beginning
          </p>

          <div className="flex items-center justify-center gap-1 text-[11px] text-[#66754e] pt-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#66754e] fill-current" />
            <span>for our beloved family &amp; friends</span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3 text-[10px] text-[#66754e] font-mono">
            <span>{couple.hashtag} • 2027</span>
            <span>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 hover:text-[#47572a] transition underline underline-offset-2"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>สำหรับบ่าวสาว (Admin)</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* 10. Sticky Floating Bar (Mobile View) */}
      <StickyFloatingBar />
    </main>
  );
}
