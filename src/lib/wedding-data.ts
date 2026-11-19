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
      nameEn: 'Mr. Jakkrit Dokkem',
      nicknameTh: 'บูม',
      nicknameEn: 'Boom',
      parentTh: 'บุตรของ นางสาวสกุล ก้านเหลือง และ นายอธิวัฒน์ ใจแก้ว',
    },
    bride: {
      nameTh: 'นางสาววรรณิตา ปัญญาศีล',
      nameEn: 'Miss Wannita Panyasin',
      nicknameTh: 'วัน',
      nicknameEn: 'Wan',
      parentTh: 'บุตรีของ นางมิลอ ปัญญาศีล และ นายพาย ปัญญาศีล',
    },
    weddingDate: '2027-01-09T07:09:00+07:00', // 9 มกราคม 2570
    weddingDateDisplay: 'Saturday, January 9, 2027',
    weddingDateThaiDisplay: 'วันเสาร์ที่ 9 มกราคม 2570',
    hashtag: '#BWWedding2027',
    welcomeMessage: 'มีความยินดีและเป็นเกียรติอย่างยิ่งที่จะขอเรียนเชิญท่านผู้มีเกียรติทุกท่าน ร่วมเป็นสักขีพยานและเฉลิมฉลองในพิธีมงคลสมรสของเราทั้งสอง',
    bankAccounts: [
      {
        bankName: 'ธนาคารไทยพาณิชย์ (SCB)',
        accountNumber: '438-1-15356-2',
        accountName: 'นายจักรกฤษณ์ ดอกเข็ม',
      },
      {
        bankName: 'ธนาคารกรุงไทย (KTB)',
        accountNumber: '663-9-38054-4',
        accountName: 'นางสาววรรณิตา ปัญญาศิล',
      },
    ],
  },
  schedule: [
    {
      id: 'monk-blessing',
      time: '07.09 น.',
      title: 'พิธีเจริญพระพุทธมนต์',
      titleEn: 'Buddhist Blessing Ceremony',
      description: 'ร่วมทำบุญตักบาตรและถวายภัตตาหารแด่พระสงฆ์ เพื่อความเป็นสิริมงคล',
      iconName: 'sun',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'khan-maak',
      time: '08.39 น.',
      title: 'พิธีแห่ขบวนขันหมาก',
      titleEn: 'Khan Maak Procession',
      description: 'ขบวนขันหมากเจ้าบ่าวผ่านประตูเงินประตูทองเพื่อสู่ขอเจ้าสาว',
      iconName: 'sparkles',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'respect-ceremony',
      time: '09.09 น.',
      title: 'พิธีรับไหว้ผู้ใหญ่',
      titleEn: 'Respect & Blessing Ceremony',
      description: 'พิธีไหว้ผู้ใหญ่ทั้งสองฝ่ายเพื่อความเป็นสิริมงคลและรับพรอันศักดิ์สิทธิ์',
      iconName: 'heart',
      location: 'ห้องประชุมรันตี',
    },
    {
      id: 'lunch-reception',
      time: '11.30 น.',
      title: 'พิธีฉลองมงคลสมรส',
      titleEn: 'Wedding Celebration & Reception',
      description: 'ร่วมรับประทานอาหาร ดื่มฉลอง ตัดเค้ก และร่วมแสดงความยินดีแก่คู่บ่าวสาว',
      iconName: 'utensils',
      location: 'ห้องประชุมรันตี',
    },
  ],
  story: [
    {
      id: 'first-meet',
      year: '2014',
      date: 'ปี 2014',
      title: 'จุดเริ่มต้นของคำว่า "เรา"',
      description: 'จากคนสองคนในวันนั้น สู่จุดเริ่มต้นของความผูกพันในปี 2014 วันที่เราได้เริ่มรู้จัก พูดคุย และค่อยๆ เปิดใจให้กันอย่างเป็นธรรมชาติ',
      imageUrl: '/images/prewedding/cs-524.jpg',
      location: 'จุดเริ่มต้น (2014)',
    },
    {
      id: 'growing-together',
      year: '12 ปี',
      date: '2014 – 2025',
      title: 'เติบโตและผ่านทุกฤดูกาลไปด้วยกัน',
      description: 'ตลอดระยะเวลากว่าทศวรรษ เราได้เรียนรู้การปรับตัว เข้าใจ และจับมือกันผ่านทั้งวันที่สดใสและวันที่ท้าทาย จนความรักกลายเป็นความสบายใจที่สุดของกันและกัน',
      imageUrl: '/images/prewedding/cs-542.jpg',
      location: 'กว่า 12 ปีที่เคียงข้าง',
    },
    {
      id: 'decision-2026',
      year: '2026',
      date: 'ปี 2026',
      title: 'วันที่หัวใจพร้อมก้าวไปอีกขั้น',
      description: 'จากความรักที่บ่มเพาะมาอย่างยาวนาน ในปี 2026 เราทั้งสองต่างมั่นใจแล้วว่า อยากให้คนตรงหน้าเป็นคู่ชีวิตที่เดินเคียงข้างกันไปในทุกๆ วันต่อจากนี้',
      imageUrl: '/images/prewedding/cs-115.jpg',
      location: 'คำสัญญาแห่งรัก (2026)',
    },
    {
      id: 'the-forever',
      year: '2027',
      date: '9 มกราคม 2570',
      title: 'เริ่มต้นบทใหม่ของคำว่า "ครอบครัว"',
      description: '12 ปีที่ผ่านมาคือบทนำอันแสนอบอุ่น และในวันที่ 9 มกราคม 2027 เราพร้อมแล้วที่จะเริ่มต้นบทใหม่ในฐานะคู่ชีวิตและครอบครัวอย่างสมบูรณ์',
      imageUrl: '/images/prewedding/cs-985.jpg',
      location: 'ผึ้งหวานรีสอร์ท ไทรโยค',
    },
  ],
  dressCode: {
    descriptionTh: 'เพื่อให้ภาพถ่ายในวันสำคัญงดงามและอบอุ่น ขอความกรุณาทุกท่านร่วมแต่งกายในโทนสีของงาน',
    descriptionEn: 'To create warm and harmonious memories, we kindly invite you to dress within our curated wedding palette.',
    styleTh: 'สากลนิยม / ชุดไทยประยุกต์ / Smart Casual สุภาพ',
    styleEn: 'Formal / Elegant Attire / Smart Casual',
    palette: [
      {
        name: 'ขาวบริสุทธิ์',
        nameEn: 'Pure Ivory White',
        hex: '#FFFFFF',
        textDark: true,
        styleHintTh: 'โทนสีขาวสว่างสะอาดตา ให้ความรู้สึกบริสุทธิ์หรูหรา เหมาะกับชุดสูท เชิ้ต หรือเดรสลูกไม้เรียบหรู',
      },
      {
        name: 'ครีมอลาบาสเตอร์',
        nameEn: 'Alabaster Cream',
        hex: '#F4F1EA',
        textDark: true,
        styleHintTh: 'โทนสีครีมสว่างละมุนตา แมตช์ง่ายกับเครื่องประดับสีทองมุกและชุดผ้าซาตินพริ้วไหว',
      },
      {
        name: 'ครีมลินินอบอุ่น',
        nameEn: 'Warm Linen',
        hex: '#F5EBE2',
        textDark: true,
        styleHintTh: 'โทนสีเบจอมครีมสุดคลาสสิก เหมาะกับชุดสูทลินิน ชุดไทยประยุกต์ หรือเดรสยาว',
      },
      {
        name: 'เขียวเซจหมอก',
        nameEn: 'Sage Mist',
        hex: '#C9CEB8',
        textDark: true,
        styleHintTh: 'โทนสีเขียวอ่อนพาสเทลสบายตา เหมาะสำหรับชุดเพื่อนเจ้าสาว เสื้อเชิ้ต หรือเบลเซอร์ลำลอง',
      },
      {
        name: 'เขียวโอลีฟคลาสสิก',
        nameEn: 'Olive Green',
        hex: '#66754E',
        styleHintTh: 'ให้ความรู้สึกอบอุ่นเป็นธรรมชาติ เหมาะกับทั้งชุดเดรสผ้าซาตินและเนคไทสุภาพบุรุษ',
      },
      {
        name: 'เขียวมะกอกเข้ม',
        nameEn: 'Deep Olive Moss',
        hex: '#47572A',
        styleHintTh: 'เหมาะสำหรับสูทสุภาพบุรุษ หรือชุดราตรียาวที่ดูสง่างามและตัดกับฉากสีขาวครีมอย่างลงตัว',
      },
    ],
  },
  venue: {
    name: 'ผึ้งหวานรีสอร์ท ไทรโยค',
    nameEn: 'Pung-Waan Resort Saiyok, Kanchanaburi',
    hall: 'ห้องประชุมรันตี',
    floor: 'ชั้น 1',
    address: '123/3 หมู่ 3 ตำบลท่าเสา อำเภอไทรโยค จังหวัดกาญจนบุรี 71150',
    parkingInfo: 'มีที่จอดรถสะดวกสบายบริเวณด้านหน้าห้องประชุมรันตี รองรับรถยนต์ได้จำนวนมาก',
    transitInfo: 'เดินทางโดยรถยนต์ส่วนตัวมุ่งหน้าสู่อำเภอไทรโยค หรือเดินทางด้วยรถตู้/รถไฟสายกาญจนบุรี',
    googleMapsUrl: 'https://www.google.com/maps/place/%E0%B8%9C%E0%B8%B6%E0%B9%89%E0%B8%87-%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99+%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97/@14.2054848,99.0583458,1470m/data=!3m2!1e3!4b1!4m9!3m8!1s0x30e4808698512489:0xd42d354342686028!5m2!4m1!1i2!8m2!3d14.2054796!4d99.0609207!16s%2Fg%2F1wzs_t_r?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D',
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15474.348259021206!2d99.0609207!3d14.2054796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e4808698512489%3A0xd42d354342686028!2sPung%20-%20Waan%20Resort!5e0!3m2!1sen!2sth!4v1709281234567!5m2!1sen!2sth',
    latitude: 14.2054796,
    longitude: 99.0609207,
  },
  gallery: [
    {
      id: 'g-1',
      src: '/images/prewedding/cs-613.jpg',
      alt: 'Boom & Wan Romantic Seaside Portrait',
      width: 1000,
      height: 1500,
      caption: 'ในสายตาของฉัน มีเพียงเธอเสมอ',
    },
    {
      id: 'g-2',
      src: '/images/prewedding/cs-524.jpg',
      alt: 'Boom & Wan Walking Hand in Hand on White Pier',
      width: 1000,
      height: 1500,
      caption: 'กุมมือนี้ไว้... ก้าวเดินไปด้วยกันทุกเส้นทาง',
    },
    {
      id: 'g-3',
      src: '/images/prewedding/cs-542.jpg',
      alt: 'Wan & Boom Smiling Together on the Pier',
      width: 1000,
      height: 1500,
      caption: 'ทุกรอยยิ้มที่มีเธอ คือช่วงเวลาที่สวยงามที่สุด',
    },
    {
      id: 'g-4',
      src: '/images/prewedding/cs-985.jpg',
      alt: 'Boom Twirling Wan at Sunset Beach',
      width: 1000,
      height: 1500,
      caption: 'ทุกจังหวะชีวิตที่มีเธอ คือช่วงเวลาแห่งความสุข',
    },
    {
      id: 'g-5',
      src: '/images/prewedding/cs-98.jpg',
      alt: 'Groom Kissing Bride Hand in Studio',
      width: 1000,
      height: 1500,
      caption: 'สัญญาแห่งรักและการดูแลกันตลอดไป',
    },
    {
      id: 'g-6',
      src: '/images/prewedding/cs-115.jpg',
      alt: 'Boom & Wan Holding Hands in Studio',
      width: 1000,
      height: 1500,
      caption: 'ไม่ว่าวันไหน ก็พร้อมจับมือดูแลกันตลอดไป',
    },
    {
      id: 'g-7',
      src: '/images/prewedding/cs-146.jpg',
      alt: 'Boom Embracing Wan in Studio Portrait',
      width: 1000,
      height: 1500,
      caption: 'อ้อมกอดที่อบอุ่นและรอยยิ้มที่มีให้กันเสมอ',
    },
    {
      id: 'g-8',
      src: '/images/prewedding/cs-55.jpg',
      alt: 'Boom & Wan Classic Studio Gaze',
      width: 1000,
      height: 1500,
      caption: 'เคียงข้างกันด้วยความรักในวันสำคัญที่สุด',
    },
    {
      id: 'g-9',
      src: '/images/prewedding/cs-79.jpg',
      alt: 'Boom & Wan Arm in Arm Studio Portrait',
      width: 1000,
      height: 1500,
      caption: 'ความสุขและเสียงหัวเราะที่เติมเต็มหัวใจ',
    },
    {
      id: 'g-10',
      src: '/images/prewedding/cs-38.jpg',
      alt: 'Bride Wan Studio Portrait with White Bouquet',
      width: 1000,
      height: 1500,
      caption: 'เจ้าสาวในชุดขาวบริสุทธิ์พร้อมช่อดอกไม้แสนสวย',
    },
    {
      id: 'g-11',
      src: '/images/prewedding/cs-683.jpg',
      alt: 'Bride Wan Full Length Beach Portrait',
      width: 1000,
      height: 1500,
      caption: 'งดงามและอ่อนโยนท่ามกลางสายลมทะเล',
    },
    {
      id: 'g-12',
      src: '/images/prewedding/cs-685.jpg',
      alt: 'Bride Wan Close-up Portrait by the Sea',
      width: 1000,
      height: 1500,
      caption: 'รอยยิ้มแห่งความสุขก่อนเริ่มต้นบทใหม่ของชีวิต',
    },
  ],
  rsvpDeadline: '2026-11-30',
  rsvpDeadlineTh: '30 พฤศจิกายน 2569',
};
