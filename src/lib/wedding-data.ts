import { CoupleInfo, TimelineEvent, StoryMilestone, DressCodeColor, VenueInfo, GalleryPhoto } from '@/types/wedding';

export const WEDDING_DATA: {
  couple: CoupleInfo;
  schedule: TimelineEvent[];
  story: StoryMilestone[];
  dressCode: {
    descriptionTh: string;
    descriptionEn: string;
    styleTh: string;
    styleEn: string;
    palette: DressCodeColor[];
  };
  venue: VenueInfo;
  gallery: GalleryPhoto[];
  rsvpDeadline: string;
  rsvpDeadlineTh: string;
} = {
  couple: {
    groom: {
      nameTh: 'นายจักรกฤษณ์ ดอกเข็ม',
      nameEn: 'Mr. Jakkrit Dokkrm',
      nicknameTh: 'บูม',
      nicknameEn: 'Boom',
      parentTh: 'บุตรของ นายกฤษณะ ดอกเข็ม และ นางสาวสกุล ก้านเหลือง',
    },
    bride: {
      nameTh: 'นางสาววรรณิตา ปัญญาศิล',
      nameEn: 'Miss Wannita Panyasin',
      nicknameTh: 'วัน',
      nicknameEn: 'Wan',
      parentTh: 'บุตรีของ นายพาย ปัญญาศิล และ นางสาวมิลอ ปัญญาศิล',
    },
    weddingDate: '2027-01-09T07:09:00+07:00', // 9 มกราคม 2570
    weddingDateDisplay: 'Saturday, January 9, 2027',
    weddingDateThaiDisplay: 'วันเสาร์ที่ 9 มกราคม 2570',
    hashtag: '#BWWedding2027',
    welcomeMessage: 'มีความยินดีและเป็นเกียรติอย่างยิ่งที่จะขอเรียนเชิญท่านผู้มีเกียรติทุกท่าน ร่วมเป็นสักขีพยานและเฉลิมฉลองในพิธีมงคลสมรสของเราทั้งสอง',
    bankAccounts: [
      {
        bankName: 'ธนาคารกสิกรไทย (KBANK)',
        accountNumber: '098-2-34567-8',
        accountName: 'นายจักรกฤษณ์ ดอกเข็ม และ น.ส.วรรณิตา ปัญญาศิล',
        promptPayId: '0891234567',
        qrCodeUrl: '/images/promptpay-qr.svg',
      },
      {
        bankName: 'ธนาคารไทยพาณิชย์ (SCB)',
        accountNumber: '408-9-87654-3',
        accountName: 'นายจักรกฤษณ์ ดอกเข็ม',
        promptPayId: '0891234567',
        qrCodeUrl: '/images/promptpay-qr.svg',
      },
    ],
  },
  schedule: [
    {
      id: 'monk-blessing',
      time: '07:09 น.',
      title: 'พิธีเจริญพระพุทธมนต์',
      titleEn: 'Buddhist Blessing Ceremony',
      description: 'ร่วมทำบุญตักบาตรและถวายภัตตาหารแด่พระสงฆ์ เพื่อความเป็นสิริมงคล',
      iconName: 'sun',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'khan-maak',
      time: '08:19 น.',
      title: 'พิธีแห่ขันหมากและกั้นประตูเงินประตูทอง',
      titleEn: 'Khan Maak & Gate Ceremony',
      description: 'ขบวนขันหมากเจ้าบ่าวผ่านประตูเงินประตูทองเพื่อสู่ขอเจ้าสาว',
      iconName: 'sparkles',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'engagement-ring',
      time: '09:09 น.',
      title: 'พิธีสวมแหวนหมั้น & รับไหว้ผู้ใหญ่',
      titleEn: 'Ring Exchange & Respect Ceremony',
      description: 'พิธีแลกแหวนหมั้นและไหว้ผู้ใหญ่เพื่อรับพรอันศักดิ์สิทธิ์',
      iconName: 'gem',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'water-pouring',
      time: '09:49 น.',
      title: 'พิธีหลั่งน้ำพระพุทธมนต์และประสาทพร',
      titleEn: 'Water Pouring Ceremony',
      description: 'แขกผู้มีเกียรติร่วมหลั่งน้ำสังข์และอวยพรแก่คู่บ่าวสาว',
      iconName: 'heart',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'lunch-reception',
      time: '11:30 น.',
      title: 'งานเลี้ยงฉลองมงคลสมรส (ฉลองเที่ยง)',
      titleEn: 'Wedding Lunch Celebration & Toast',
      description: 'ร่วมรับประทานอาหาร ดื่มฉลอง ตัดเค้ก และโยนช่อดอกไม้แห่งความสุข',
      iconName: 'utensils',
      location: 'ห้องประชุมรันตี',
    },
  ],
  story: [
    {
      id: 'first-meet',
      year: '2020',
      date: '14 กุมภาพันธ์ 2020',
      title: 'จุดเริ่มต้นแห่งความบังเอิญ',
      description: 'จากวันแรกที่เราได้พบและพูดคุยกัน สู่มิตรภาพที่เริ่มเบ่งบานและกลายเป็นความผูกพันที่แสนพิเศษ',
      imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
      location: 'Thailand',
    },
    {
      id: 'first-trip',
      year: '2023',
      date: '10 ธันวาคม 2023',
      title: 'การเดินทางและเติบโตไปด้วยกัน',
      description: 'ทุกทริปและการเดินทางร่วมกัน เราได้เรียนรู้การแก้ปัญหา การดูแล และเข้าใจกันในทุกมิติของชีวิต',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
      location: 'Kanchanaburi, Thailand',
    },
    {
      id: 'proposal',
      year: '2026',
      date: '14 กุมภาพันธ์ 2026',
      title: 'คำตอบคือ "ตกลง" (She said YES!)',
      description: 'ท่ามกลางบรรยากาศแสนอบอุ่น ในวันที่เราสัญญาว่าจะจับมือและดูแลกันตลอดไป',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      location: 'Pung-Waan Resort',
    },
    {
      id: 'the-forever',
      year: '2027',
      date: '9 มกราคม 2570',
      title: 'การเริ่มต้นบทใหม่ของคำว่า "ครอบครัว"',
      description: 'วันที่เราพร้อมจะก้าวเข้าสู่อีกขั้นของชีวิต ด้วยความรักและเกียรติที่พร้อมมอบให้แก่กัน',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      location: 'Pung-Waan Resort, Kanchanaburi',
    },
  ],
  dressCode: {
    descriptionTh: 'เพื่อให้ภาพถ่ายในวันสำคัญงดงามและอบอุ่น ขอความกรุณาทุกท่านร่วมแต่งกายในโทนสีของงาน',
    descriptionEn: 'To create warm and harmonious memories, we kindly invite you to dress within our curated wedding palette.',
    styleTh: 'สากลนิยม / ชุดไทยประยุกต์ / Smart Casual สุภาพ',
    styleEn: 'Formal / Elegant Attire / Smart Casual',
    palette: [
      { name: 'เขียวมะกอกเข้ม', nameEn: 'Deep Olive Moss', hex: '#47572A' },
      { name: 'เขียวโอลีฟคลาสสิก', nameEn: 'Olive Green', hex: '#66754E' },
      { name: 'เขียวเซจหมอก', nameEn: 'Sage Mist', hex: '#C9CEB8', textDark: true },
      { name: 'ครีมอลาบาสเตอร์', nameEn: 'Alabaster Cream', hex: '#F4F1EA', textDark: true },
      { name: 'ครีมลินินอบอุ่น', nameEn: 'Warm Linen', hex: '#F5EBE2', textDark: true },
    ],
  },
  venue: {
    name: 'ผึ้ง – หวาน รีสอร์ท',
    nameEn: 'Pung-Waan Resort, Kanchanaburi',
    hall: 'ห้องประชุมรันตี',
    floor: 'ชั้น 1',
    address: '123/3 หมู่ 3 ตำบลท่าเสา อำเภอไทรโยค จังหวัดกาญจนบุรี 71150',
    parkingInfo: 'มีที่จอดรถสะดวกสบายบริเวณด้านหน้าห้องประชุมรันตี รองรับรถยนต์ได้จำนวนมาก',
    transitInfo: 'เดินทางโดยรถยนต์ส่วนตัวมุ่งหน้าสู่อำเภอไทรโยค หรือเดินทางด้วยรถตู้/รถไฟสายกาญจนบุรี',
    googleMapsUrl: 'https://maps.google.com/?q=Pung-Waan+Resort+Kanchanaburi',
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15474.348259021206!2d99.0609207!3d14.2054796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e4808698512489%3A0xd42d354342686028!2sPung%20-%20Waan%20Resort!5e0!3m2!1sen!2sth!4v1709281234567!5m2!1sen!2sth',
    latitude: 14.2054796,
    longitude: 99.0609207,
  },
  gallery: [
    {
      id: 'g-1',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
      alt: 'Boom & Wan Pre-wedding Romantic Portrait in nature',
      width: 1200,
      height: 800,
      caption: 'ในสายตาของฉัน มีเพียงเธอเสมอ',
    },
    {
      id: 'g-2',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=80',
      alt: 'Boom & Wan Wedding Rings & Close-up smile',
      width: 800,
      height: 1200,
      caption: 'สัญญาแห่งรักนิรันดร์',
    },
    {
      id: 'g-3',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80',
      alt: 'Couple looking at each other with deep affection',
      width: 1200,
      height: 800,
      caption: 'ทุกรอยยิ้มที่มีเธอ คือช่วงเวลาที่สวยงามที่สุด',
    },
    {
      id: 'g-4',
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&auto=format&fit=crop&q=80',
      alt: 'Holding hands wedding prewedding close-up',
      width: 800,
      height: 1200,
      caption: 'กุมมือนี้ไว้... ตลอดไป',
    },
    {
      id: 'g-5',
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&auto=format&fit=crop&q=80',
      alt: 'Sunset romance bride and groom silhouette',
      width: 1200,
      height: 800,
      caption: 'แสงตะวันยามเย็นกับรักของเรา',
    },
    {
      id: 'g-6',
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&auto=format&fit=crop&q=80',
      alt: 'Couple laughter outdoor garden prewedding',
      width: 1200,
      height: 800,
      caption: 'หัวเราะและมีความสุขไปด้วยกัน',
    },
  ],
  rsvpDeadline: '2026-11-30',
  rsvpDeadlineTh: '30 พฤศจิกายน 2569',
};
