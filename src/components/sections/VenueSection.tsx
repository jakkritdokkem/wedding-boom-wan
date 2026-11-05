'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Train, Building2, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { BotanicalFlourish } from '@/components/ui/FabricDrapeDivider';

export function VenueSection() {
  const { venue } = WEDDING_DATA;

  return (
    <section id="venue-section" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3 font-thai-serif"
        >
          <MapPin className="w-3.5 h-3.5 text-[#66754e]" />
          <span>Venue &amp; Location</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-2"
        >
          สถานที่จัดงาน &amp; แผนที่
        </motion.h2>

        <BotanicalFlourish />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base font-thai-serif"
        >
          ร่วมฉลองวันสำคัญท่ามกลางบรรยากาศธรรมชาติอันอบอุ่น
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Venue Information Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="fabric-card fabric-stitch p-7 sm:p-9 rounded-[40px] space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#66754e] mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider font-thai-serif">สถานที่จัดพิธี</span>
              </div>
              <h3 className="text-2xl font-bold text-[#47572a] font-serif-luxury">
                {venue.nameEn}
              </h3>
              <p className="text-[#47572a] text-base font-semibold font-thai-serif mt-1">
                {venue.name}
              </p>
              <p className="text-xs text-[#66754e] font-medium mt-1 font-thai-serif">
                {venue.hall} ({venue.floor})
              </p>
            </div>

            <div className="h-[1px] border-t border-dashed border-[#c9ceb8]" />

            <div className="space-y-4 text-xs sm:text-sm text-[#576543] font-thai-serif">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#66754e] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#47572a] block">ที่อยู่:</span>
                  <p>{venue.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-[#66754e] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#47572a] block">การจอดรถ:</span>
                  <p>{venue.parkingInfo}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-[#66754e] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#47572a] block">การเดินทาง:</span>
                  <p>{venue.transitInfo}</p>
                </div>
              </div>
            </div>

            {/* GPS Navigation Button */}
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#47572a] text-white font-semibold text-sm shadow-[0_12px_25px_rgba(71,87,42,0.2)] hover:bg-[#374421] hover:scale-105 active:scale-95 transition duration-300 group font-thai-serif"
            >
              <Navigation className="w-4 h-4 text-[#c9ceb8] group-hover:rotate-45 transition-transform" />
              <span>นำทางด้วย Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </a>
          </div>
        </motion.div>

        {/* Interactive Map Embed in Soft Arch/Rounded Frame */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="relative w-full h-[380px] sm:h-[460px] rounded-[44px] overflow-hidden shadow-[0_24px_60px_rgba(71,87,42,0.1)] border-[6px] border-white bg-[#f4f1ea]">
            <iframe
              src={venue.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location Map"
              className="grayscale-[0.08] contrast-[1.01]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
