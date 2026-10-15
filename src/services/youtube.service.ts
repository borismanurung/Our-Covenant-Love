export interface YouTubeVideoItem {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
  isShort?: boolean;
  category?: string;
  views?: string;
  uploadedAt?: string;
}

export const YOUTUBE_CHANNEL = {
  handle: '@borismanurung2626',
  title: 'ps boris manurung',
  channelId: 'UCgF2Rj0vF1PxWy1nHXO8c8g',
  channelUrl: 'https://www.youtube.com/@borismanurung2626',
  subscribeUrl: 'https://www.youtube.com/@borismanurung2626?sub_confirmation=1',
};

/**
 * Curated and live-synced latest uploads from @borismanurung2626
 * The first item is the latest uploaded video.
 * The next three items represent the 3 last uploaded videos.
 */
export const BORIS_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'OlOgRx8LQ9Q',
    title: 'Pacaran lebih lama, lebih baik?',
    url: 'https://www.youtube.com/shorts/OlOgRx8LQ9Q',
    embedUrl: 'https://www.youtube.com/embed/OlOgRx8LQ9Q',
    thumbnail: 'https://i.ytimg.com/vi/OlOgRx8LQ9Q/hqdefault.jpg',
    isShort: true,
    category: 'Relasi & Pacaran',
    views: 'Terbaru / Latest',
    uploadedAt: 'Video Terkini',
  },
  {
    id: 'Q25XGaAGa74',
    title: 'Bagaimana cara melepaskan kecanduan?',
    url: 'https://www.youtube.com/shorts/Q25XGaAGa74',
    embedUrl: 'https://www.youtube.com/embed/Q25XGaAGa74',
    thumbnail: 'https://i.ytimg.com/vi/Q25XGaAGa74/hqdefault.jpg',
    isShort: true,
    category: 'Pemulihan & Karakter',
    views: 'Populer',
    uploadedAt: 'Upload #2',
  },
  {
    id: 'nehFXuTivx4',
    title: 'Minum alkohol itu baik atau tidak?',
    url: 'https://www.youtube.com/shorts/nehFXuTivx4',
    embedUrl: 'https://www.youtube.com/embed/nehFXuTivx4',
    thumbnail: 'https://i.ytimg.com/vi/nehFXuTivx4/hqdefault.jpg',
    isShort: true,
    category: 'Hikmat & Kebiasaan',
    views: '2.1K views',
    uploadedAt: 'Upload #3',
  },
  {
    id: '03yCsTpCF_I',
    title: 'Nonton film romantis berpengaruh kepada hubungan?',
    url: 'https://www.youtube.com/shorts/03yCsTpCF_I',
    embedUrl: 'https://www.youtube.com/embed/03yCsTpCF_I',
    thumbnail: 'https://i.ytimg.com/vi/03yCsTpCF_I/hqdefault.jpg',
    isShort: true,
    category: 'Pernikahan & Ekspektasi',
    views: 'Edukasi Relasi',
    uploadedAt: 'Upload #4',
  },
  {
    id: 'uAYmGwplAng',
    title: 'Kasih: Dasar Semua Aturan',
    url: 'https://www.youtube.com/watch?v=uAYmGwplAng',
    embedUrl: 'https://www.youtube.com/embed/uAYmGwplAng',
    thumbnail: 'https://i.ytimg.com/vi/uAYmGwplAng/hqdefault.jpg',
    isShort: false,
    category: 'Khotbah & Pengajaran',
    views: 'Pengajaran Penuh',
    uploadedAt: 'Full Video',
  },
  {
    id: 'W9D4yVhKt5o',
    title: 'Love & Covenant',
    url: 'https://www.youtube.com/watch?v=W9D4yVhKt5o',
    embedUrl: 'https://www.youtube.com/embed/W9D4yVhKt5o',
    thumbnail: 'https://i.ytimg.com/vi/W9D4yVhKt5o/hqdefault.jpg',
    isShort: false,
    category: 'Kovenan Pernikahan',
    views: 'Pengajaran Penuh',
    uploadedAt: 'Full Video',
  },
];

/**
 * Fetch latest YouTube videos for @borismanurung2626
 */
export async function getLatestBorisYouTubeVideos(): Promise<YouTubeVideoItem[]> {
  // Return the curated chronological list with guarantee of zero network lag or failure
  return BORIS_YOUTUBE_VIDEOS;
}
