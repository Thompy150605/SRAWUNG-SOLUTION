export type Lang = 'id' | 'en';
export type PackageItemKey = 'villa' | 'forest' | 'workshop' | 'heritage';

export const CONTACT = {
  waNumber: '6281234567890',
  domain: 'srawung-bulaksalak.com',
  address: 'Dusun Bulaksalak, Kalurahan Wukirsari, Kapanewon Cangkringan, Kabupaten Sleman, DI Yogyakarta 55583',
  maps: {
    villa: 'https://www.google.com/maps/search/?api=1&query=Villa+Ndalem+Riyartan+Bulaksalak+Wukirsari+Cangkringan+Sleman',
    bamboo: 'https://www.google.com/maps/search/?api=1&query=Hutan+Bambu+Bulaksalak+Wukirsari+Cangkringan+Sleman',
    pasar: 'https://www.google.com/maps/search/?api=1&query=Pasar+Sor+Pring+Bulaksalak+Wukirsari+Cangkringan+Sleman',
    village: 'https://www.google.com/maps/search/?api=1&query=Bulaksalak+Wukirsari+Cangkringan+Sleman+Yogyakarta',
  },
  natgeoUrl:
    'https://nationalgeographic.grid.id/read/134291808/pasar-sorpring-dari-bambu-ke-bumbu-upaya-warga-untuk-pangan-lokal',
  instagramUrl: 'https://www.instagram.com/explore/tags/bulaksalak/',
};

export const PHOTOS = {
  merapiCorridor: import.meta.env.BASE_URL + 'assets/bulaksalak/merapi-corridor.jpg',
  villaPool: import.meta.env.BASE_URL + 'assets/bulaksalak/villa-pool.jpg',
  villaAerial: import.meta.env.BASE_URL + 'assets/bulaksalak/villa-aerial.jpg',
  bambooForest: import.meta.env.BASE_URL + 'assets/bulaksalak/bamboo-forest.jpg',
  bambooTrail: import.meta.env.BASE_URL + 'assets/bulaksalak/bamboo-trail.jpg',
  heritageWalk: import.meta.env.BASE_URL + 'assets/bulaksalak/heritage-walk.jpg',
  pasarMarket: import.meta.env.BASE_URL + 'assets/bulaksalak/pasar-sor-pring.jpg',
  pasarCulinary: import.meta.env.BASE_URL + 'assets/bulaksalak/pasar-culinary.jpg',
};

export interface BookingCatalogItem {
  key: PackageItemKey;
  price: number;
  billing: 'room_night' | 'person';
  id: {
    title: string;
    short: string;
    subtitle: string;
    unit: string;
    features: string[];
  };
  en: {
    title: string;
    short: string;
    subtitle: string;
    unit: string;
    features: string[];
  };
}

export const BOOKING_ITEMS: Record<PackageItemKey, BookingCatalogItem> = {
  villa: {
    key: 'villa',
    price: 450000,
    billing: 'room_night',
    id: {
      title: 'Menginap di Villa Ndalem Riyartan',
      short: 'Ndalem Stay',
      subtitle: 'Vila Joglo & Limasan vintage (hingga 8 tamu)',
      unit: 'kamar / malam',
      features: [
        'Arsitektur vintage perpaduan Bali & Yogyakarta',
        '2–3 kamar tidur + area mezanin terbuka',
        '3 kamar mandi (bathtub & shower), dapur & BBQ',
        'Akses Pendopo, kolam taman, Wi-Fi & parkir privat',
      ],
    },
    en: {
      title: 'Stay at Villa Ndalem Riyartan',
      short: 'Ndalem Stay',
      subtitle: 'Vintage Joglo & Limasan villa (up to 8 guests)',
      unit: 'room / night',
      features: [
        'Vintage Bali–Yogyakarta Joglo & Limasan architecture',
        '2–3 bedrooms plus open mezzanine loft',
        '3 bathrooms (bathtub & shower), private kitchen & BBQ',
        'Pendopo pavilion, courtyard pool, Wi-Fi & private parking',
      ],
    },
  },
  forest: {
    key: 'forest',
    price: 35000,
    billing: 'person',
    id: {
      title: 'Tur Edukasi Hutan Bambu Bulaksalak',
      short: 'Hutan Bambu',
      subtitle: 'Arboretum 35+ jenis bambu di jalur 87 m',
      unit: 'orang',
      features: [
        'Pemandu lokal dari KTH Bambu Lestari',
        'Menjelajah 3 hektare konservasi 35+ spesies bambu',
        'Kisah restorasi bekas tambang pasir & batu',
        'Berjarak ±87 meter jalan kaki dari Villa',
      ],
    },
    en: {
      title: 'Bulaksalak Bamboo Forest Guided Tour',
      short: 'Bamboo Forest',
      subtitle: '35+ species bamboo arboretum along the 87m trail',
      unit: 'person',
      features: [
        'Guided by local stewards from KTH Bambu Lestari',
        'Explore 3 hectares of 35+ local & international bamboo species',
        'Ex-sand & stone mining restoration story',
        'Just 87 meters on foot from Villa Ndalem Riyartan',
      ],
    },
  },
  workshop: {
    key: 'workshop',
    price: 75000,
    billing: 'person',
    id: {
      title: 'Lokakarya Kerajinan & Anyaman Bambu',
      short: 'Lokakarya Bambu',
      subtitle: 'Praktik langsung bersama pengrajin desa',
      unit: 'orang',
      features: [
        'Bahan baku bambu lokal & peralatan lengkap disediakan',
        'Didampingi langsung pengrajin Wukirsari',
        'Mengenal pengolahan & konstruksi bambu hulu–hilir',
        'Hasil karya anyaman dapat dibawa pulang',
      ],
    },
    en: {
      title: 'Bamboo Craft & Weaving Workshop',
      short: 'Craft Workshop',
      subtitle: 'Hands-on session with village artisans',
      unit: 'person',
      features: [
        'All bamboo materials and craft tools provided',
        'Mentored directly by Wukirsari community artisans',
        'Learn traditional bamboo joinery & weaving techniques',
        'Take home your handcrafted bamboo keepsake',
      ],
    },
  },
  heritage: {
    key: 'heritage',
    price: 55000,
    billing: 'person',
    id: {
      title: 'Heritage Walk & Jelajah Desa Wukirsari',
      short: 'Heritage Walk',
      subtitle: 'Jalan pagi menyusuri pedesaan lereng Merapi',
      unit: 'orang',
      features: [
        'Rute jalan kaki santai melewati pemukiman & kebun warga',
        'Sesi cerita pangan lokal & budaya pedesaan Cangkringan',
        'Kudapan tradisional & minuman herbal hangat',
        'Ideal untuk tamu vila, keluarga & rombongan komunitas',
      ],
    },
    en: {
      title: 'Wukirsari Village Heritage Walk',
      short: 'Heritage Walk',
      subtitle: 'Guided morning stroll across Merapi foothills',
      unit: 'person',
      features: [
        'Scenic walking loop through village lanes and gardens',
        'Stories of Cangkringan rural heritage & local foodways',
        'Includes traditional village snacks & warm herbal drink',
        'Ideal for villa guests, families & study groups',
      ],
    },
  },
};

export const BUNDLE_DISCOUNTS: Record<number, number> = {
  2: 0.1,
  3: 0.15,
  4: 0.15,
};

export const NEARBY_LANDMARKS = [
  {
    name: 'Merapi Golf Club',
    distanceId: '± 10 menit berkendara',
    distanceEn: '~10 min drive',
    categoryId: 'Lapangan Golf Lereng Merapi',
    categoryEn: 'Volcano Slope Golf Course',
  },
  {
    name: 'The World Landmarks Merapi Park',
    distanceId: '± 15 menit berkendara',
    distanceEn: '~15 min drive',
    categoryId: 'Taman Rekreasi Keluarga',
    categoryEn: 'Family Recreation Park',
  },
  {
    name: 'Museum Gunung Merapi',
    distanceId: '± 16 menit berkendara',
    distanceEn: '~16 min drive',
    categoryId: 'Edukasi Geologi & Sejarah',
    categoryEn: 'Volcano & Geology Museum',
  },
  {
    name: 'The Lost World Castle & Stonehenge',
    distanceId: '± 18 menit berkendara',
    distanceEn: '~18 min drive',
    categoryId: 'Wisata Panorama Merapi',
    categoryEn: 'Merapi Scenic Landmarks',
  },
  {
    name: 'Museum Ullen Sentalu & Kaliurang',
    distanceId: '± 22 menit berkendara',
    distanceEn: '~22 min drive',
    categoryId: 'Museum Budaya Jawa',
    categoryEn: 'Javanese Culture Museum',
  },
];

export const COPY = {
  id: {
    topBar: {
      nextLabel: 'Pasar Sor Pring (Minggu Kliwon) berikutnya dalam',
      openLabel: 'Pasar Sor Pring sedang buka! Tutup dalam',
      viewSchedule: 'Lihat Jadwal',
    },
    nav: {
      destinations: 'Destinasi',
      story: 'Kisah Kami',
      market: 'Pasar Sor Pring',
      trail: 'Peta 87 m',
      packages: 'Paket',
      bookCta: 'Pesan Paket',
    },
    hero: {
      kicker: 'Dusun Bulaksalak · Wukirsari · Cangkringan · Sleman, Yogyakarta',
      titleLine1: 'Warisan Jawa &',
      titleLine2: 'Hutan Bambu Lereng Merapi',
      subtitle:
        'Menginap di rumah Joglo vintage Villa Ndalem Riyartan, melangkah 87 meter menuju 3 hektare konservasi Desa Wisata Bambu, dan merayakan kuliner tradisi di Pasar Sor Pring setiap Minggu Kliwon.',
      primaryCta: 'Eksplorasi Paket Wisata',
      secondaryCta: 'Jadwal Minggu Kliwon',
      walkJump: 'Telusuri Jalur Jalan Kaki 87 m',
      photoCaption: 'Villa Ndalem Riyartan · Berjarak 87 meter dari Hutan Bambu Bulaksalak',
      stats: [
        { value: '87 m', label: 'Jarak jalan kaki Villa ke Hutan Bambu' },
        { value: '35+', label: 'Spesies bambu lokal & mancanegara' },
        { value: '4.8 ★', label: 'Rating Google Maps Villa (22 ulasan)' },
        { value: '35 Hari', label: 'Siklus Minggu Kliwon Pasar Sor Pring' },
      ],
    },
    destinations: {
      kicker: 'Destinasi Bulaksalak',
      heading: 'Tiga Ruang Hidup dalam Satu Langkah',
      subheading:
        'Menginap, belajar konservasi bambu, hingga mencicipi kuliner desa — seluruh pengalaman terhubung alami di satu dusun sejuk di kaki Gunung Merapi.',
      openMaps: 'Buka di Google Maps',
      bookThis: 'Pesan Pengalaman Ini',
      showDetails: 'Lihat Fasilitas & Detail',
      hideDetails: 'Tutup Detail',
      cards: {
        villa: {
          meta: 'Akomodasi · 4.8 ★ Google Maps (22 ulasan) · Hingga 8 Tamu',
          title: 'Villa Ndalem Riyartan',
          summary:
            'Hunian tradisional Joglo & Limasan bernuansa vintage perpaduan Bali dan Yogyakarta. Dikelilingi rumpun bambu yang tenang — tempat beristirahat privat untuk keluarga maupun rombongan kecil.',
          highlights: [
            'Kapasitas hingga 8 tamu (2–3 kamar tidur + mezanin terbuka)',
            '3 kamar mandi lengkap dengan bathtub & shower air hangat',
            'Pendopo untuk berkumpul, kolam taman privat, dapur & alat BBQ',
            'Wi-Fi gratis, area parkir luas, hanya 87 meter ke Hutan Bambu',
          ],
          pricePrefix: 'Mulai',
        },
        bamboo: {
          meta: 'Ekowisata & Konservasi · 3 Hektare · 87 m dari Villa',
          title: 'Desa Wisata Bambu Bulaksalak',
          summary:
            'Lahan bekas tambang pasir dan batu yang dipulihkan warga bersama KTH Bambu Lestari menjadi arboretum hidup berisi lebih dari 35 jenis bambu lokal dan mancanegara.',
          highlights: [
            'Konservasi 35+ spesies bambu (termasuk varietas Jepang & Thailand)',
            'Edukasi budidaya, anyaman, hingga teknik konstruksi bambu',
            'Area camping ground, outbound & jalur trekking teduh',
            'Fasilitas parkir, musholla, toilet umum & saung belajar',
          ],
          pricePrefix: 'Tur mulai',
        },
        pasar: {
          meta: 'Pasar Budaya · Setiap Minggu Kliwon · 07:00 – 12:00 WIB',
          title: 'Pasar Sor Pring',
          summary:
            'Berasal dari bahasa Jawa "ngisor pring" (di bawah pohon bambu). Hadir setiap 35 hari sekali dengan transaksi koin bambu Girik, kuliner pangan lokal, seni tradisi, dan panahan Jemparingan.',
          highlights: [
            'Kuliner tempo dulu: Sego Jagung Putih, Tiwul, olahan rebung & jamu',
            'Alat tukar unik berupa lempengan koin bambu (Girik)',
            'Pentas seni budaya, dolanan anak tradisional & Jemparingan',
            'Diliput National Geographic Indonesia untuk kedaulatan pangan lokal',
          ],
          scheduleCta: 'Lihat Kalender Minggu Kliwon',
        },
      },
    },
    story: {
      kicker: 'Kisah & Koridor Merapi',
      heading: 'Dari Bekas Tambang Menuju Hutan Bambu yang Hidup',
      lead:
        'Sebelum rimbun seperti hari ini, kawasan Bulaksalak pernah menjadi lahan bekas galian pasir dan batu. Gotong royong warga Kalurahan Wukirsari dan Kelompok Tani Hutan Bambu Lestari mengubahnya menjadi ruang konservasi, sumber ekonomi kerajinan & ekspor bambu (2–3 kontainer per bulan bersama PT Bambubos), serta panggung kedaulatan pangan lokal.',
      natgeoLabel: 'Liputan Editorial · National Geographic Indonesia',
      natgeoTitle: '“Pasar Sorpring: Dari Bambu ke Bumbu, Upaya Warga untuk Pangan Lokal”',
      natgeoBody:
        'Pasar Sor Pring bukan sekadar pasar wisata kuliner, melainkan ruang hidup tempat warga merawat benih pangan lokal, mengurangi plastik sekali pakai, dan menggerakkan ekonomi dusun di bawah naungan bambu.',
      natgeoCta: 'Baca Artikel National Geographic',
      corridorHeading: 'Berada di Koridor Wisata Lereng Merapi',
      corridorSub:
        'Jadikan Bulaksalak tempat bermalam yang tenang sekaligus titik berangkat strategis menuju destinasi unggulan Sleman Utara.',
      galleryCaptions: {
        corridor: 'Panorama lereng selatan Gunung Merapi dan kawasan hijau Cangkringan',
        aerial: 'Villa Ndalem Riyartan menyatu langsung dengan kanopi Hutan Bambu',
        culinary: 'Warga menjajakan Sego Jagung Putih dan jajanan desa di Pasar Sor Pring',
      },
    },
    market: {
      kicker: 'Kalender Selapanan · Setiap 35 Hari',
      heading: 'Pasar Sor Pring · Minggu Kliwon',
      subtitle:
        'Digelar khusus setiap Minggu Kliwon pukul 07:00 – 12:00 WIB di bawah rimbun Hutan Bambu Bulaksalak. Datang lebih pagi untuk menikmati udara sejuk lereng Merapi dan menukar koin bambu Girik.',
      statusOpen: 'Sedang Berlangsung · Tutup dalam',
      statusUpcomingPrefix: 'Dibuka',
      statusUpcomingSuffix: '07:00 WIB · Hitung mundur',
      units: { days: 'Hari', hours: 'Jam', minutes: 'Menit', seconds: 'Detik' },
      saveGcal: 'Simpan ke Google Calendar',
      askWa: 'Tanya Info Pasar via WhatsApp',
      girikTitle: 'Cara Bertransaksi dengan Girik',
      girikSteps: [
        'Tiba di pintu masuk Hutan Bambu mulai pukul 07:00 WIB.',
        'Tukarkan uang Rupiah menjadi koin bambu Girik di loket warga.',
        'Nikmati kuliner Sego Jagung, olahan rebung, jamu & panahan Jemparingan.',
      ],
      upcomingTitle: '4 Jadwal Minggu Kliwon Mendatang',
      calendarTitle: 'Kalender Pasaran Bulan Ini',
      calendarLegend: 'Minggu Kliwon (Pasar Sor Pring Buka)',
      todayLabel: 'Hari Ini',
      nextTag: 'Berikutnya',
      openTag: 'Buka Hari Ini',
      futureTag: 'Mendatang',
      dayHeaders: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    },
    trail: {
      kicker: 'Panduan Jalur 87 Meter & Fasilitas',
      heading: 'Dari Tangga Villa Menuju Rimbun Bambu dalam 1 Menit',
      subtitle:
        'Villa Ndalem Riyartan dan Hutan Bambu Bulaksalak hanya terpisah ±87 meter jalan kaki. Simulasikan rutenya, tandai titik lokasi yang ingin dikunjungi, atau buka petunjuk arah langsung di Google Maps.',
      simulateBtn: 'Simulasikan Jalan 87 m',
      walkingBtn: 'Sedang Menyusuri Jalur…',
      replayBtn: 'Ulangi Simulasi 87 m',
      routeLabel: 'Villa Ndalem Riyartan → Hutan Bambu Bulaksalak',
      stepsUnit: 'langkah',
      checkinsTitle: 'Titik Lokasi & Fasilitas Desa',
      checkinsHint: 'Ketuk pin di peta atau tombol di bawah untuk menandai rencana kunjungan',
      scaleNote: '50 m · Sketsa jalur 87 m Bulaksalak',
      realMapsTitle: 'Navigasi Google Maps Resmi',
      pins: {
        villa: { label: 'Villa Ndalem Riyartan', desc: 'Akomodasi Joglo · Parkir Privat · 4.8 ★' },
        bambu: { label: 'Hutan Bambu Bulaksalak', desc: 'Arboretum 35+ Spesies · Area Lokakarya' },
        pasar: { label: 'Arena Pasar Sor Pring', desc: 'Kuliner Tradisional · Jemparingan (Minggu Kliwon)' },
        parkir: { label: 'Area Parkir Desa', desc: 'Akses Mobil & Bus Kecil · Dekat Gerbang' },
        fasilitas: { label: 'Musholla & Toilet Umum', desc: 'Fasilitas Bersih Dekat Jalur Utama' },
      },
      walkCompleteToast: 'Tiba di Hutan Bambu! 87 m · ±121 langkah · ±1 menit berjalan santai',
      allCheckedToast: 'Seluruh 5 titik lokasi Bulaksalak telah ditandai.',
    },
    packages: {
      kicker: 'Katalog Paket & Reservasi',
      heading: 'Rencanakan Kunjungan Sesuai Ritme Anda',
      subheading:
        'Pilih satu pengalaman atau gabungkan menginap, tur hutan bambu, lokakarya, dan heritage walk. Dapatkan potongan paket otomatis 10% untuk 2 aktivitas dan 15% untuk 3+ aktivitas.',
      customCta: 'Kustomisasi & Hitung Estimasi',
      popularLabel: 'Paling Diminati',
      bookPkgBtn: 'Pesan Paket Ini',
      weekendTitle: 'Paket Srawung Weekend Lengkap',
      weekendSub: 'Ndalem Stay + Tur Hutan Bambu + Lokakarya Kerajinan',
      weekendMeta: 'Estimasi 2 tamu · 1 malam · Sudah termasuk hemat 15%',
      weekendFeatures: [
        'Menginap 1 malam di Villa Ndalem Riyartan (hingga 8 tamu tersedia)',
        'Tur edukasi 35+ spesies bambu bersama pemandu KTH Bambu Lestari',
        'Sesi praktik anyaman bambu & hasil karya dibawa pulang',
        'Rekomendasi jadwal kunjungan jika bertepatan Minggu Kliwon',
      ],
      savingsTitle: 'Keuntungan Paket Terpadu',
      savingsBullets: [
        'Hemat 10% otomatis saat menggabungkan 2 pengalaman',
        'Hemat 15% otomatis untuk 3 pengalaman atau lebih',
        'Deteksi otomatis tanggal Pasar Sor Pring (Minggu Kliwon)',
        'Konfirmasi jadwal & ketersediaan langsung melalui WhatsApp resmi',
      ],
    },
    faq: {
      kicker: 'Informasi Pengunjung',
      heading: 'Pertanyaan Sebelum Berkunjung',
      items: [
        {
          q: 'Di mana lokasi persis Bulaksalak dan bagaimana akses dari pusat Yogyakarta?',
          a: 'Terletak di Dusun Bulaksalak, Kalurahan Wukirsari, Kapanewon Cangkringan, Kabupaten Sleman, DI Yogyakarta 55583 — sekitar 45–55 menit berkendara ke arah utara dari pusat Kota Yogyakarta melalui jalur Kaliurang atau Cangkringan.',
        },
        {
          q: 'Kapan Pasar Sor Pring buka dan apakah perlu tiket masuk?',
          a: 'Pasar Sor Pring buka setiap 35 hari sekali pada hari Minggu Kliwon pukul 07:00–12:00 WIB. Tidak ada tiket masuk mahal; pengunjung cukup menukarkan uang Rupiah menjadi koin bambu Girik di gerbang pasar untuk berbelanja kuliner dan kerajinan warga.',
        },
        {
          q: 'Berapa kapasitas tamu di Villa Ndalem Riyartan?',
          a: 'Villa Ndalem Riyartan dapat menampung hingga 8 tamu dengan 2–3 kamar tidur, area mezanin terbuka, 3 kamar mandi (termasuk bathtub), Pendopo, dapur lengkap dengan alat BBQ, Wi-Fi, dan parkir privat — sangat nyaman untuk keluarga maupun rombongan kecil.',
        },
        {
          q: 'Seberapa jauh jarak dari Villa Ndalem Riyartan ke Hutan Bambu Bulaksalak?',
          a: 'Hanya sekitar 87 meter berjalan kaki (±1–2 menit santai). Tamu yang menginap di vila dapat langsung melangkah ke kawasan konservasi bambu, mengikuti lokakarya, atau menuju Pasar Sor Pring di pagi hari Minggu Kliwon.',
        },
        {
          q: 'Apakah Desa Wisata Bambu menerima kunjungan rombongan sekolah, kampus, atau komunitas?',
          a: 'Ya. Kawasan hutan bambu seluas 3 hektare ini memiliki area belajar, camping ground, dan outbound yang kerap digunakan untuk studi lapangan pelajar, mahasiswa arsitektur/pertanian, komunitas sepeda, hingga kegiatan heritage walk.',
        },
      ],
    },
    footer: {
      tagline: 'Connecting Local Potentials, Growing Together',
      quote: '“Menyatu dengan hangatnya rumah Jawa, sejuknya hutan bambu, dan denyut pangan lokal lereng Merapi.”',
      exploreTitle: 'Navigasi',
      visitTitle: 'Lokasi & Reservasi',
      waCta: 'Hubungi via WhatsApp',
      copyright: 'SRAWUNG Bulaksalak · Wukirsari, Cangkringan, Sleman, Yogyakarta',
    },
    modal: {
      eyebrow: 'Reservasi WhatsApp',
      title: 'Susun Paket Kunjungan Anda',
      step1: '1. Pilih Pengalaman',
      step2: '2. Detail Kunjungan',
      step3: '3. Ringkasan & Pratinjau Pesan',
      guestsLabel: 'Jumlah Tamu',
      guestsUnit: 'orang',
      nightsLabel: 'Lama Menginap',
      nightsUnit: 'malam',
      dateLabel: 'Tanggal Kunjungan',
      nameLabel: 'Nama Pemesan',
      namePlaceholder: 'Nama lengkap Anda',
      noteLabel: 'Catatan Tambahan (Opsional)',
      notePlaceholder: 'Mis. rombongan keluarga dengan anak, butuh peralatan BBQ, atau studi kampus…',
      kliwonAlert: 'Tanggal pilihan Anda bertepatan dengan Pasar Sor Pring (Minggu Kliwon, 07:00–12:00 WIB)!',
      pkgLabel: 'Paket Dipilih',
      emptySelection: 'Pilih minimal satu pengalaman di sebelah kiri.',
      discountLabel: 'Hemat paket',
      totalLabel: 'Estimasi Total',
      estimateNote: 'Estimasi awal — ketersediaan & harga final dikonfirmasi admin SRAWUNG melalui WhatsApp.',
      previewLabel: 'Pratinjau Pesan WhatsApp',
      sendBtn: 'Kirim Pesan via WhatsApp',
      copyBtn: 'Salin Pesan',
      copiedToast: 'Pesan reservasi disalin ke clipboard.',
      openingWaToast: 'Membuka WhatsApp…',
    },
    quickSheet: {
      title: 'Tanya Cepat via WhatsApp',
      subtitle: 'Pilih topik atau susun paket lengkap',
      customBtn: 'Buka Kalkulator Paket',
      templates: [
        {
          id: 'stay',
          title: 'Ketersediaan Villa Ndalem Riyartan',
          preview: 'Tanya kamar, kapasitas hingga 8 tamu & tarif menginap',
          msg: 'Halo SRAWUNG Bulaksalak, saya ingin menanyakan ketersediaan menginap di Villa Ndalem Riyartan beserta paket wisata Hutan Bambu. Terima kasih.',
        },
        {
          id: 'tour',
          title: 'Tur Hutan Bambu & Lokakarya',
          preview: 'Jadwal pemandu KTH Bambu Lestari & kunjungan kelompok',
          msg: 'Halo SRAWUNG Bulaksalak, saya ingin tanya jadwal Tur Edukasi Hutan Bambu dan Lokakarya Kerajinan Bambu di Bulaksalak. Terima kasih.',
        },
        {
          id: 'pasar',
          title: 'Info Pasar Sor Pring (Minggu Kliwon)',
          preview: 'Jam buka 07:00–12:00 WIB, lokasi parkir & penukaran Girik',
          msg: 'Halo SRAWUNG Bulaksalak, saya ingin menanyakan informasi Pasar Sor Pring pada Minggu Kliwon mendatang (parkir, koin Girik, dan rangkaian acara). Terima kasih.',
        },
      ],
    },
  },
  en: {
    topBar: {
      nextLabel: 'Next Pasar Sor Pring (Minggu Kliwon) in',
      openLabel: 'Pasar Sor Pring is open now! Closes in',
      viewSchedule: 'View Schedule',
    },
    nav: {
      destinations: 'Destinations',
      story: 'Our Story',
      market: 'Pasar Sor Pring',
      trail: '87m Trail Map',
      packages: 'Packages',
      bookCta: 'Book Package',
    },
    hero: {
      kicker: 'Bulaksalak Hamlet · Wukirsari · Cangkringan · Sleman, Yogyakarta',
      titleLine1: 'Javanese Heritage &',
      titleLine2: 'Living Bamboo Sanctuary',
      subtitle:
        'Unwind at vintage Joglo Villa Ndalem Riyartan, walk 87 meters into a 3-hectare community bamboo forest of 35+ species, and celebrate local food sovereignty at Pasar Sor Pring every Minggu Kliwon.',
      primaryCta: 'Explore Experience Packages',
      secondaryCta: 'Minggu Kliwon Schedule',
      walkJump: 'Trace the 87m Walking Path',
      photoCaption: 'Villa Ndalem Riyartan · Located 87 meters on foot from Bulaksalak Bamboo Forest',
      stats: [
        { value: '87 m', label: 'Walking trail from Villa to Bamboo Forest' },
        { value: '35+', label: 'Local & international bamboo species' },
        { value: '4.8 ★', label: 'Google Maps Villa rating (22 reviews)' },
        { value: '35 Days', label: 'Javanese Minggu Kliwon market cycle' },
      ],
    },
    destinations: {
      kicker: 'Bulaksalak Destinations',
      heading: 'Three Living Experiences Connected on Foot',
      subheading:
        'Stay in a tranquil Javanese villa, explore a restored bamboo arboretum, and gather for heritage culinary mornings — all nestled in one cool highland hamlet on Mount Merapi’s southern slope.',
      openMaps: 'Open in Google Maps',
      bookThis: 'Book This Experience',
      showDetails: 'View Facilities & Details',
      hideDetails: 'Hide Details',
      cards: {
        villa: {
          meta: 'Stay · 4.8 ★ Google Maps (22 reviews) · Up to 8 Guests',
          title: 'Villa Ndalem Riyartan',
          summary:
            'A vintage Joglo and Limasan retreat blending Balinese calm with classic Yogyakarta craftsmanship. Surrounded by swaying bamboo groves for private family getaways and intimate retreats.',
          highlights: [
            'Accommodates up to 8 guests (2–3 bedrooms + open mezzanine loft)',
            '3 bathrooms equipped with bathtub & hot-water shower',
            'Traditional Pendopo pavilion, courtyard pool, full kitchen & BBQ',
            'Free Wi-Fi, private parking, just 87 meters from Bamboo Forest',
          ],
          pricePrefix: 'From',
        },
        bamboo: {
          meta: 'Nature & Conservation · 3 Hectares · 87m from Villa',
          title: 'Bulaksalak Bamboo Tourism Village',
          summary:
            'Once an active sand and stone excavation site, restored by local farmers of KTH Bambu Lestari into a thriving 3-hectare living arboretum conserving over 35 bamboo species.',
          highlights: [
            'Living arboretum of 35+ local, Japanese & Thai bamboo species',
            'Hands-on cultivation, weaving & sustainable bamboo joinery classes',
            'Shaded trekking trails, camping ground & group outbound space',
            'Visitor parking, prayer room (musholla), restrooms & study gazebos',
          ],
          pricePrefix: 'Tours from',
        },
        pasar: {
          meta: 'Cultural Market · Every Minggu Kliwon · 07:00 – 12:00 WIB',
          title: 'Pasar Sor Pring',
          summary:
            'Named after Javanese "ngisor pring" (beneath the bamboo). Convening once every 35 days with Girik bamboo coin currency, heirloom village cuisine, folk arts, and traditional Jemparingan archery.',
          highlights: [
            'Heirloom local food: Sego Jagung Putih, Tiwul, bamboo shoot dishes & jamu',
            'Cashless village commerce using handcrafted Girik bamboo tokens',
            'Cultural performances, heritage games & Mataraman Jemparingan archery',
            'Featured by National Geographic Indonesia for local food sovereignty',
          ],
          scheduleCta: 'View Minggu Kliwon Calendar',
        },
      },
    },
    story: {
      kicker: 'Origin Story & Merapi Corridor',
      heading: 'From Former Quarry to Living Bamboo Forest',
      lead:
        'Decades ago, parts of Bulaksalak were scarred by sand and stone mining. Through collective stewardship by Wukirsari residents and Kelompok Tani Hutan Bambu Lestari, the land was regenerated into a lush bamboo sanctuary that now sustains conservation, artisan exports (2–3 containers monthly via PT Bambubos), and local food culture.',
      natgeoLabel: 'Editorial Feature · National Geographic Indonesia',
      natgeoTitle: '“Pasar Sorpring: From Bamboo to Spice, a Community’s Effort for Local Food”',
      natgeoBody:
        'More than a weekend culinary attraction, Pasar Sor Pring represents an active grassroots movement keeping heritage ingredients alive, eliminating single-use plastics, and strengthening rural livelihoods beneath the bamboo canopy.',
      natgeoCta: 'Read National Geographic Feature',
      corridorHeading: 'Ideally Positioned Along the Merapi Tourism Corridor',
      corridorSub:
        'Use peaceful Bulaksalak as your highland base while exploring northern Sleman’s iconic volcanic and cultural landmarks.',
      galleryCaptions: {
        corridor: 'Aerial view of Mount Merapi rising above green Cangkringan farmlands',
        aerial: 'Villa Ndalem Riyartan nestled directly beside the bamboo canopy',
        culinary: 'Village hosts serving Sego Jagung Putih and traditional dishes beneath bamboo',
      },
    },
    market: {
      kicker: 'Javanese Selapanan Calendar · Every 35 Days',
      heading: 'Pasar Sor Pring · Minggu Kliwon',
      subtitle:
        'Open strictly on Javanese Minggu Kliwon mornings from 07:00 to 12:00 WIB beneath the Bulaksalak bamboo canopy. Arrive early for crisp Merapi mountain air and exchange Rupiah for Girik bamboo tokens.',
      statusOpen: 'Open Right Now · Closes in',
      statusUpcomingPrefix: 'Opens',
      statusUpcomingSuffix: '07:00 WIB · Countdown',
      units: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
      saveGcal: 'Save to Google Calendar',
      askWa: 'Ask Market Info via WhatsApp',
      girikTitle: 'How to Trade with Girik Bamboo Coins',
      girikSteps: [
        'Arrive at the Bamboo Forest gate starting 07:00 WIB on Minggu Kliwon.',
        'Exchange Indonesian Rupiah for handcrafted Girik bamboo tokens at the village desk.',
        'Savor Sego Jagung Putih, bamboo shoot specialties, herbal jamu & watch Jemparingan archery.',
      ],
      upcomingTitle: 'Next 4 Minggu Kliwon Market Dates',
      calendarTitle: 'This Month’s Javanese Market Calendar',
      calendarLegend: 'Minggu Kliwon (Pasar Sor Pring Open)',
      todayLabel: 'Today',
      nextTag: 'Next Up',
      openTag: 'Open Today',
      futureTag: 'Upcoming',
      dayHeaders: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    trail: {
      kicker: '87-Meter Walking Trail & Facilities Guide',
      heading: 'From Villa Steps to Bamboo Canopy in 1 Minute',
      subtitle:
        'Villa Ndalem Riyartan sits just 87 meters on foot from Bulaksalak Bamboo Forest. Simulate the walk, check off village stops you plan to explore, or launch real turn-by-turn navigation on Google Maps.',
      simulateBtn: 'Simulate 87m Walk',
      walkingBtn: 'Walking the Trail…',
      replayBtn: 'Replay 87m Walk',
      routeLabel: 'Villa Ndalem Riyartan → Bulaksalak Bamboo Forest',
      stepsUnit: 'steps',
      checkinsTitle: 'Village Stops & Visitor Facilities',
      checkinsHint: 'Tap map pins or stops below to mark places on your visit checklist',
      scaleNote: '50 m · Bulaksalak 87m trail guide',
      realMapsTitle: 'Direct Google Maps Directions',
      pins: {
        villa: { label: 'Villa Ndalem Riyartan', desc: 'Joglo Heritage Stay · Private Parking · 4.8 ★' },
        bambu: { label: 'Bulaksalak Bamboo Forest', desc: '35+ Species Arboretum · Craft Workshops' },
        pasar: { label: 'Pasar Sor Pring Grounds', desc: 'Local Cuisine · Jemparingan (Minggu Kliwon)' },
        parkir: { label: 'Village Parking Area', desc: 'Cars & Minibuses · Near Main Entrance' },
        fasilitas: { label: 'Musholla & Public Restrooms', desc: 'Clean Visitor Facilities Along Main Path' },
      },
      walkCompleteToast: 'Arrived at Bamboo Forest! 87 m · ~121 steps · ~1 min stroll',
      allCheckedToast: 'All 5 Bulaksalak village stops checked off.',
    },
    packages: {
      kicker: 'Packages & Direct Booking',
      heading: 'Plan Your Visit at Your Own Pace',
      subheading:
        'Book a single highlight or combine a villa stay, bamboo forest tour, weaving workshop, and village heritage walk. Enjoy automatic 10% bundle savings on 2 activities or 15% on 3+ activities.',
      customCta: 'Customize & Estimate Package',
      popularLabel: 'Most Popular',
      bookPkgBtn: 'Book This Package',
      weekendTitle: 'Complete Srawung Weekend Bundle',
      weekendSub: 'Ndalem Stay + Bamboo Forest Tour + Craft Workshop',
      weekendMeta: 'Sample for 2 guests · 1 night · Includes 15% bundle savings',
      weekendFeatures: [
        '1-night stay at Villa Ndalem Riyartan (accommodates up to 8 guests)',
        'Guided 35+ species bamboo conservation tour with KTH Bambu Lestari',
        'Hands-on bamboo weaving workshop with keepsake to take home',
        'Aligned itinerary tips if visiting on a Minggu Kliwon morning',
      ],
      savingsTitle: 'Integrated Package Benefits',
      savingsBullets: [
        'Automatic 10% savings when combining any 2 experiences',
        'Automatic 15% savings for 3 or more experiences',
        'Automatic Minggu Kliwon Pasar Sor Pring date detection',
        'Direct schedule & availability confirmation via official WhatsApp',
      ],
    },
    faq: {
      kicker: 'Visitor Information',
      heading: 'Frequently Asked Questions',
      items: [
        {
          q: 'Where exactly is Bulaksalak and how far is it from central Yogyakarta?',
          a: 'Bulaksalak is located in Wukirsari Village, Cangkringan District, Sleman Regency, Yogyakarta 55583 — roughly a 45–55 minute scenic drive north of Yogyakarta city via Kaliurang or Cangkringan roads.',
        },
        {
          q: 'When is Pasar Sor Pring open and how does payment work?',
          a: 'Pasar Sor Pring opens once every 35 days on Javanese Minggu Kliwon mornings from 07:00 to 12:00 WIB. Visitors exchange Rupiah at the entrance for Girik bamboo coins to purchase traditional foods, herbal drinks, and village crafts.',
        },
        {
          q: 'How many guests can stay at Villa Ndalem Riyartan?',
          a: 'Villa Ndalem Riyartan comfortably hosts up to 8 guests across 2–3 bedrooms plus an open mezzanine loft, with 3 bathrooms (including a bathtub), Pendopo gathering pavilion, full kitchen with BBQ tools, Wi-Fi, and private parking.',
        },
        {
          q: 'How close is Villa Ndalem Riyartan to the Bamboo Forest?',
          a: 'They are only about 87 meters apart — an easy 1 to 2 minute walk. Overnight villa guests can stroll straight into the bamboo arboretum, workshops, or Pasar Sor Pring on Minggu Kliwon mornings.',
        },
        {
          q: 'Can schools, universities, or communities arrange group study visits?',
          a: 'Yes. The 3-hectare bamboo conservation village features learning gazebos, a camping ground, and outbound areas regularly used by school field trips, architecture and forestry students, cycling clubs, and heritage walking groups.',
        },
      ],
    },
    footer: {
      tagline: 'Connecting Local Potentials, Growing Together',
      quote: '“Where Javanese hospitality, restored bamboo forests, and Merapi local food culture meet.”',
      exploreTitle: 'Explore',
      visitTitle: 'Location & Reservations',
      waCta: 'Message on WhatsApp',
      copyright: 'SRAWUNG Bulaksalak · Wukirsari, Cangkringan, Sleman, Yogyakarta',
    },
    modal: {
      eyebrow: 'WhatsApp Reservation',
      title: 'Build Your Bulaksalak Package',
      step1: '1. Select Experiences',
      step2: '2. Visit Details',
      step3: '3. Summary & Message Preview',
      guestsLabel: 'Guests',
      guestsUnit: 'guests',
      nightsLabel: 'Length of Stay',
      nightsUnit: 'nights',
      dateLabel: 'Visit Date',
      nameLabel: 'Your Name',
      namePlaceholder: 'Full name',
      noteLabel: 'Notes (Optional)',
      notePlaceholder: 'e.g. family trip with kids, BBQ request, or university group visit…',
      kliwonAlert: 'Your chosen date coincides with Pasar Sor Pring (Minggu Kliwon, 07:00–12:00 WIB)!',
      pkgLabel: 'Selected Package',
      emptySelection: 'Select at least one experience on the left.',
      discountLabel: 'Bundle savings',
      totalLabel: 'Estimated Total',
      estimateNote: 'Initial estimate — final availability & rates are confirmed directly via WhatsApp.',
      previewLabel: 'WhatsApp Message Preview',
      sendBtn: 'Send via WhatsApp',
      copyBtn: 'Copy Message',
      copiedToast: 'Reservation message copied to clipboard.',
      openingWaToast: 'Opening WhatsApp…',
    },
    quickSheet: {
      title: 'Quick WhatsApp Inquiry',
      subtitle: 'Pick a quick topic or build a custom bundle',
      customBtn: 'Open Package Calculator',
      templates: [
        {
          id: 'stay',
          title: 'Villa Ndalem Riyartan Availability',
          preview: 'Check dates, up to 8-guest capacity & stay packages',
          msg: 'Hello SRAWUNG Bulaksalak, I would like to inquire about availability at Villa Ndalem Riyartan along with the Bamboo Forest experience. Thank you.',
        },
        {
          id: 'tour',
          title: 'Bamboo Forest Tour & Workshop',
          preview: 'Guided KTH Bambu Lestari tours & group visits',
          msg: 'Hello SRAWUNG Bulaksalak, I would like information about scheduling a Bamboo Forest Guided Tour and Craft Workshop in Bulaksalak. Thank you.',
        },
        {
          id: 'pasar',
          title: 'Pasar Sor Pring (Minggu Kliwon) Info',
          preview: '07:00–12:00 WIB hours, parking & Girik bamboo coins',
          msg: 'Hello SRAWUNG Bulaksalak, I would like to ask about the upcoming Minggu Kliwon Pasar Sor Pring schedule, parking, and Girik token exchange. Thank you.',
        },
      ],
    },
  },
} as const;
