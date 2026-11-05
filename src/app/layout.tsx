import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes, Mitr } from 'next/font/google';
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

// Mitr: Soft, friendly, modern rounded Thai & Latin typeface
const mitr = Mitr({
  subsets: ['thai', 'latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-mitr',
  display: 'swap',
});

const { couple, venue } = WEDDING_DATA;

export const metadata: Metadata = {
  metadataBase: new URL('https://boom-wan-wedding.vercel.app'),
  title: `${couple.bride.nicknameEn} & ${couple.groom.nicknameEn} Wedding Invitation | ${couple.hashtag}`,
  description: `ขอเรียนเชิญร่วมงานมงคลสมรสระหว่าง ${couple.bride.nameTh} (${couple.bride.nicknameTh}) & ${couple.groom.nameTh} (${couple.groom.nicknameTh}) ${couple.weddingDateThaiDisplay} ณ ${venue.name}`,
  openGraph: {
    title: `${couple.bride.nicknameEn} & ${couple.groom.nicknameEn} Wedding Invitation`,
    description: `ขอเรียนเชิญร่วมเป็นเกียรติในพิธีมงคลสมรส ${couple.weddingDateThaiDisplay} ณ ${venue.name}`,
    url: 'https://boom-wan-wedding.vercel.app',
    siteName: `${couple.bride.nicknameEn} & ${couple.groom.nicknameEn} Wedding`,
    images: [
      {
        url: '/images/prewedding/cs-613.jpg',
        width: 1000,
        height: 1500,
        alt: `${couple.bride.nicknameEn} & ${couple.groom.nicknameEn} Wedding Invitation`,
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${couple.bride.nicknameEn} & ${couple.groom.nicknameEn} Wedding Invitation`,
    description: `ขอเรียนเชิญร่วมงานมงคลสมรส ${couple.weddingDateThaiDisplay}`,
    images: ['/images/prewedding/cs-613.jpg'],
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
      className={`${cormorant.variable} ${greatVibes.variable} ${mitr.variable} scroll-smooth`}
    >
      <body className="font-thai-serif font-light bg-[#fbfaf7] text-[#2d381c] antialiased selection:bg-[#47572a]/15 selection:text-[#47572a]">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
