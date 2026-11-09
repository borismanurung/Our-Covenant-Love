export interface MusicVideoItem {
  id: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  category: 'original' | 'worship' | 'rally-choir';
  categoryLabel: string;
  categoryLabelEn: string;
  author: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
  description: string;
  descriptionEn: string;
  isFeatured?: boolean;
  hasAudio?: boolean;
  audioUrl?: string;
  hasLyrics?: boolean;
  hasChords?: boolean;
  slug?: string;
  publishedDate?: string;
}

export const MUSIC_VIDEOS: MusicVideoItem[] = [
  // ========================================================
  // KARYA MUSIK ORISINAL (ORIGINAL COMPOSITIONS)
  // ========================================================
  {
    id: 'good-guy-mv',
    youtubeId: '7vAGf2R9Yyc',
    title: 'Good Guy - Official Music Video (Original by Ps. Boris Manurung)',
    titleEn: 'Good Guy - Official Music Video (Original by Ps. Boris Manurung)',
    category: 'original',
    categoryLabel: 'Karya Orisinal',
    categoryLabelEn: 'Original Song',
    author: 'Ps. Boris Manurung',
    url: 'https://www.youtube.com/watch?v=7vAGf2R9Yyc',
    embedUrl: 'https://www.youtube.com/embed/7vAGf2R9Yyc',
    thumbnail: 'https://i.ytimg.com/vi/7vAGf2R9Yyc/maxresdefault.jpg',
    description:
      'Karya musik orisinal ciptaan Ps. Boris Manurung yang melukiskan kebenaran injil yang mendalam: Kristus, Sang Pribadi yang Benar, rela mati di kayu salib menggantikan kita orang-orang berdosa.',
    descriptionEn:
      'An original musical composition by Ps. Boris Manurung portraying the profound truth of the Gospel: Christ, the true Good Guy, willingly laid down His life on the cross for broken humanity.',
    isFeatured: true,
    hasAudio: true,
    audioUrl: '/audio/good-guy.mp3',
    hasLyrics: true,
    hasChords: true,
    slug: 'good-guy',
    publishedDate: '26 Okt 2026',
  },
  {
    id: 'good-guy-teaser',
    youtubeId: 'pkaQkK8fHGw',
    title: 'GOOD GUY - Acoustic Highlight & Story Teaser',
    titleEn: 'GOOD GUY - Acoustic Highlight & Story Teaser',
    category: 'original',
    categoryLabel: 'Karya Orisinal',
    categoryLabelEn: 'Original Song',
    author: 'Ps. Boris Manurung',
    url: 'https://www.youtube.com/shorts/pkaQkK8fHGw',
    embedUrl: 'https://www.youtube.com/embed/pkaQkK8fHGw',
    thumbnail: 'https://i.ytimg.com/vi/pkaQkK8fHGw/hqdefault.jpg',
    description:
      'Cuplikan reflektif dan sorotan lirik lagu Good Guy: "You and I were the one who made the mess, we are the reason why this good guy left His place."',
    descriptionEn:
      'Reflective highlights and lyric preview of Good Guy: "You and I were the one who made the mess, we are the reason why this good guy left His place."',
    isFeatured: false,
    hasAudio: false,
    hasLyrics: true,
    hasChords: false,
    slug: 'good-guy',
    publishedDate: '29 Okt 2026',
  },

  // ========================================================
  // PUJIAN & PENYEMBAHAN (WORSHIP MINISTRY & COVERS)
  // ========================================================
  {
    id: 'thank-you-lord',
    youtubeId: 'JwUHptSU_4s',
    title: 'Worship Cover | Thank You Lord - Don Moen',
    titleEn: 'Worship Cover | Thank You Lord - Don Moen',
    category: 'worship',
    categoryLabel: 'Penyembahan & Pujian',
    categoryLabelEn: 'Worship Ministry',
    author: 'Ps. Boris Manurung (ES GBI WTC Serpong)',
    url: 'https://www.youtube.com/watch?v=JwUHptSU_4s',
    embedUrl: 'https://www.youtube.com/embed/JwUHptSU_4s',
    thumbnail: 'https://i.ytimg.com/vi/JwUHptSU_4s/hqdefault.jpg',
    description:
      'Pelayanan penyembahan membawakan lagu syukur "Thank You Lord" di English Service GBI WTC Serpong, membawa hati jemaat bersyukur atas kasih dan anugerah-Nya.',
    descriptionEn:
      'Worship cover of Don Moen\'s classic "Thank You Lord" at GBI WTC Serpong English Service, leading the congregation in deep gratitude and worship.',
    isFeatured: false,
    publishedDate: 'English Service GBI WTC',
  },
  {
    id: 'i-could-sing',
    youtubeId: 'wXImrFGi09E',
    title: 'Worship Cover | I Could Sing of Your Love Forever',
    titleEn: 'Worship Cover | I Could Sing of Your Love Forever',
    category: 'worship',
    categoryLabel: 'Penyembahan & Pujian',
    categoryLabelEn: 'Worship Ministry',
    author: 'Ps. Boris Manurung (ES GBI WTC Serpong)',
    url: 'https://www.youtube.com/watch?v=wXImrFGi09E',
    embedUrl: 'https://www.youtube.com/embed/wXImrFGi09E',
    thumbnail: 'https://i.ytimg.com/vi/wXImrFGi09E/hqdefault.jpg',
    description:
      'Penyembahan pengagungan kasih kekal Tuhan "I Could Sing of Your Love Forever" di English Service GBI WTC Serpong.',
    descriptionEn:
      'Worship cover celebrating the everlasting love of Christ "I Could Sing of Your Love Forever" at GBI WTC English Service.',
    isFeatured: false,
    publishedDate: 'English Service GBI WTC',
  },
  {
    id: 'holy-spirit-medley',
    youtubeId: '6zCzs5-jB-k',
    title: 'Worship Medley | Holy Spirit Rain Down - Fall in This Place - O Praise The Name',
    titleEn: 'Worship Medley | Holy Spirit Rain Down - Fall in This Place - O Praise The Name',
    category: 'worship',
    categoryLabel: 'Penyembahan & Pujian',
    categoryLabelEn: 'Worship Ministry',
    author: 'Ps. Boris Manurung (ES GBI WTC Serpong)',
    url: 'https://www.youtube.com/watch?v=6zCzs5-jB-k',
    embedUrl: 'https://www.youtube.com/embed/6zCzs5-jB-k',
    thumbnail: 'https://i.ytimg.com/vi/6zCzs5-jB-k/hqdefault.jpg',
    description:
      'Rangkaian medley penyembahan hadirat Roh Kudus dan penghormatan akan karya penebusan Kristus di kayu salib.',
    descriptionEn:
      'Worship medley inviting the presence of the Holy Spirit and exalting the victorious resurrection of Jesus Christ.',
    isFeatured: false,
    publishedDate: 'English Service GBI WTC',
  },
  {
    id: 'joy-to-the-world',
    youtubeId: 'Q10yp5dPaMA',
    title: 'Joy to the World - Chris Tomlin Cover',
    titleEn: 'Joy to the World - Chris Tomlin Cover',
    category: 'worship',
    categoryLabel: 'Penyembahan & Pujian',
    categoryLabelEn: 'Worship Ministry',
    author: 'Ps. Boris Manurung',
    url: 'https://www.youtube.com/watch?v=Q10yp5dPaMA',
    embedUrl: 'https://www.youtube.com/embed/Q10yp5dPaMA',
    thumbnail: 'https://i.ytimg.com/vi/Q10yp5dPaMA/hqdefault.jpg',
    description:
      'Pujian sukacita Natal memuji kedatangan Sang Raja Damai dan Juruselamat yang menebus bumi.',
    descriptionEn:
      'Joyful Christmas worship cover celebrating the arrival of the King of Peace and Savior of humanity.',
    isFeatured: false,
    publishedDate: 'Christmas Praise',
  },

  // ========================================================
  // RALLY PPW & PADUAN SUARA (LIVE RALLIES & CHORAL WORSHIP)
  // ========================================================
  {
    id: 'worthy-is-the-lamb',
    youtubeId: 'pBoGp3OxOdQ',
    title: 'Live Report Rally PPW | Worthy is the Lamb (Hillsong Cover)',
    titleEn: 'Live Report Rally PPW | Worthy is the Lamb (Hillsong Cover)',
    category: 'rally-choir',
    categoryLabel: 'Rally PPW & Paduan Suara',
    categoryLabelEn: 'Rally & Choral Worship',
    author: 'Ps. Boris Manurung & Tim PPW Rayon 1E',
    url: 'https://www.youtube.com/watch?v=pBoGp3OxOdQ',
    embedUrl: 'https://www.youtube.com/embed/pBoGp3OxOdQ',
    thumbnail: 'https://i.ytimg.com/vi/pBoGp3OxOdQ/hqdefault.jpg',
    description:
      'Dokumentasi live penyembahan bersama tim Doa, Pujian, dan Penyembahan (PPW) Rayon 1E membawakan lagu "Worthy is the Lamb".',
    descriptionEn:
      'Live documentation of corporate Praise and Prayer Watch Rally Rayon 1E exalting the Lamb of God.',
    isFeatured: false,
    publishedDate: 'Rally PPW Rayon 1E',
  },
  {
    id: 'mighty-to-save',
    youtubeId: 'SB_yVaNrge4',
    title: 'Live Report Rally PPW | Mighty to Save (Hillsong Cover)',
    titleEn: 'Live Report Rally PPW | Mighty to Save (Hillsong Cover)',
    category: 'rally-choir',
    categoryLabel: 'Rally PPW & Paduan Suara',
    categoryLabelEn: 'Rally & Choral Worship',
    author: 'Ps. Boris Manurung & Tim PPW Rayon 1E',
    url: 'https://www.youtube.com/watch?v=SB_yVaNrge4',
    embedUrl: 'https://www.youtube.com/embed/SB_yVaNrge4',
    thumbnail: 'https://i.ytimg.com/vi/SB_yVaNrge4/hqdefault.jpg',
    description:
      'Pujian penuh kuasa "Mighty to Save" pada persekutuan akbar Rally PPW Rayon 1E, memperkatakan bahwa Tuhan sanggup memulihkan.',
    descriptionEn:
      'Powerful corporate praise declaring "Mighty to Save" at the Praise & Prayer Watch Rally.',
    isFeatured: false,
    publishedDate: 'Rally PPW Rayon 1E',
  },
  {
    id: 'pax-let-there-be-praise',
    youtubeId: 'Pdwityd3WG8',
    title: 'Paduan Suara PAX SMANSA | Let There Be Praise',
    titleEn: 'Paduan Suara PAX SMANSA | Let There Be Praise',
    category: 'rally-choir',
    categoryLabel: 'Rally PPW & Paduan Suara',
    categoryLabelEn: 'Rally & Choral Worship',
    author: 'Paduan Suara PAX SMANSA Medan',
    url: 'https://www.youtube.com/watch?v=Pdwityd3WG8',
    embedUrl: 'https://www.youtube.com/embed/Pdwityd3WG8',
    thumbnail: 'https://i.ytimg.com/vi/Pdwityd3WG8/hqdefault.jpg',
    description:
      'Harmoni vokal paduan suara klasik "Let There Be Praise", mengagungkan keagungan Allah dalam paduan suara persekutuan alumni SMANSA.',
    descriptionEn:
      'Choral praise anthem "Let There Be Praise" exalting God\'s majesty in beautiful four-part choral harmony.',
    isFeatured: false,
    publishedDate: 'Paduan Suara PAX',
  },
  {
    id: 'pax-hai-mari-berhimpun',
    youtubeId: 'HeRmXdWc8t4',
    title: 'Paduan Suara PAX | Hai Mari Berhimpun (O Come All Ye Faithful)',
    titleEn: 'Paduan Suara PAX | Hai Mari Berhimpun (O Come All Ye Faithful)',
    category: 'rally-choir',
    categoryLabel: 'Rally PPW & Paduan Suara',
    categoryLabelEn: 'Rally & Choral Worship',
    author: 'Paduan Suara PAX',
    url: 'https://www.youtube.com/watch?v=HeRmXdWc8t4',
    embedUrl: 'https://www.youtube.com/embed/HeRmXdWc8t4',
    thumbnail: 'https://i.ytimg.com/vi/HeRmXdWc8t4/hqdefault.jpg',
    description:
      'Penampilan paduan suara agung menyambut Hari Natal membawakan "Hai Mari Berhimpun" dalam penghormatan kepada Sang Raja.',
    descriptionEn:
      'Christmas choral performance presenting "O Come All Ye Faithful" in reverent worship of the King.',
    isFeatured: false,
    publishedDate: 'Paduan Suara PAX',
  },
];
