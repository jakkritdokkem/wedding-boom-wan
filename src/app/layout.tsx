import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes, Noto_Serif_Thai, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { ToastProvider } from '@/components/providers/ToastProvider';

// Classical English Serif for Elegant Headline & Titles
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Romantic Script / Calligraphy for subtle couple signatures
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

// Premium Thai Serif for headings (ราชพิธี/งานมงคล เรียบหรู)
const notoSerifThai = Noto_Serif_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-thai',
  display: 'swap',
});

// Clean, modern, highly readable body font
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const { couple, venue } = WEDDING_DATA;

export const metadata: Metadata = {
  title: `${couple.groom.nicknameEn} & ${couple.bride.nicknameEn} Wedding Invitation | ${couple.hashtag}`,
  description: `ขอเรียนเชิญร่วมงานมงคลสมรสระหว่าง ${couple.groom.nameTh} (${couple.groom.nicknameTh}) & ${couple.bride.nameTh} (${couple.bride.nicknameTh}) ${couple.weddingDateThaiDisplay} ณ ${venue.name}`,
  openGraph: {
    title: `${couple.groom.nicknameEn} & ${couple.bride.nicknameEn} Wedding Invitation`,
    description: `ขอเรียนเชิญร่วมเป็นเกียรติในพิธีมงคลสมรส วันเสาร์ที่ 28 พฤศจิกายน 2569 ณ ${venue.name}`,
    url: 'https://guy-praew-wedding.com',
    siteName: `${couple.groom.nicknameEn} & ${couple.bride.nicknameEn} Wedding`,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: `${couple.groom.nicknameEn} & ${couple.bride.nicknameEn} Wedding Invitation`,
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${couple.groom.nicknameEn} & ${couple.bride.nicknameEn} Wedding Invitation`,
    description: `ขอเรียนเชิญร่วมงานมงคลสมรส ${couple.weddingDateThaiDisplay}`,
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f9f8f4',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${cormorant.variable} ${greatVibes.variable} ${notoSerifThai.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="font-thai-serif bg-[#FAF9F5] text-[#2C3E2D] antialiased selection:bg-[#5C715E]/20 selection:text-[#233324]">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
