export type VideoCategoryType = 'together' | 'solo';

export interface YouTubeVideoItem {
  id: string;
  title: string;
  categoryType: VideoCategoryType; // 'together' = with wife, 'solo' = just me
  speakerName: string;
  category: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
  isShort?: boolean;
  views?: string;
  uploadedAt?: string;
  narrative?: {
    id: string;
    en: string;
  };
}

export const YOUTUBE_CHANNEL = {
  handle: '@borismanurung2626',
  title: 'ps boris manurung',
  channelId: 'UCgF2Rj0vF1PxWy1nHXO8c8g',
  channelUrl: 'https://www.youtube.com/@borismanurung2626',
  subscribeUrl: 'https://www.youtube.com/@borismanurung2626?sub_confirmation=1',
};

/**
 * Curated YouTube video catalog organized into two distinct categories:
 * 1. 'together' - Boris Manurung together with his wife (Covenant Marriage & Couple Discipleship)
 * 2. 'solo' - Ps. Boris Manurung alone & others (with spoken narratives of what is said by Ps. Boris)
 */
export const BORIS_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  // ==========================================
  // CATEGORY 1: TOGETHER ME & MY WIFE ('together')
  // ==========================================
  {
    id: 'W9D4yVhKt5o',
    title: 'Love & Covenant: Pernikahan Kudus di Hadapan Allah',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    category: 'Kovenan Pernikahan',
    url: 'https://www.youtube.com/watch?v=W9D4yVhKt5o',
    embedUrl: 'https://www.youtube.com/embed/W9D4yVhKt5o',
    thumbnail: 'https://i.ytimg.com/vi/W9D4yVhKt5o/hqdefault.jpg',
    isShort: false,
    views: 'Pengajaran Bersama',
    uploadedAt: 'Video Terkini Bersama',
    narrative: {
      id: 'Bersama istri tercinta, kami membagikan pesan mendalam bahwa pernikahan adalah kovenan kudus di hadapan Allah yang melibatkan tiga pihak: suami, istri, dan Tuhan. Pernikahan bukan kontrak bersyarat yang bisa dibatalkan saat salah satu pihak mengecewakan, melainkan cerminan kasih setia Kristus kepada gereja-Nya yang menuntut pengorbanan, komitmen seumur hidup, dan saling menguduskan.',
      en: 'Together with my beloved wife, we share that marriage is a holy covenant before God involving three parties: husband, wife, and the Lord. It is not a conditional contract cancelable upon disappointment, but a reflection of Christ’s steadfast love for His church, calling for sacrifice, lifelong faithfulness, and mutual sanctification.',
    },
  },
  {
    id: '03yCsTpCF_I',
    title: 'Nonton film romantis berpengaruh kepada hubungan?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    category: 'Ekspektasi & Romansa Realistis',
    url: 'https://www.youtube.com/shorts/03yCsTpCF_I',
    embedUrl: 'https://www.youtube.com/embed/03yCsTpCF_I',
    thumbnail: 'https://i.ytimg.com/vi/03yCsTpCF_I/hqdefault.jpg',
    isShort: true,
    views: 'Shorts Pasutri',
    uploadedAt: 'Upload #2 Bersama',
    narrative: {
      id: 'Kami mendiskusikan bagaimana konsumsi film romantis fiktif dapat memicu perbandingan yang tidak realistis terhadap pasangan nyata. Keintiman sejati tidak dibangun dari alur cerita fantasi, melainkan dari penerimaan tulus, komunikasi harian, dan kerelaan saling mengampuni dalam dinamika rumah tangga nyata.',
      en: 'We discuss how consuming fictional romantic films can foster unrealistic comparisons against one’s real spouse. Genuine marital intimacy is not forged from fantasy scripts, but through unconditional acceptance, daily communication, and prompt forgiveness in everyday life.',
    },
  },
  {
    id: 'uAYmGwplAng',
    title: 'Kasih: Dasar Semua Aturan & Mezbah Keluarga',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    category: 'Mezbah Keluarga & Kasih',
    url: 'https://www.youtube.com/watch?v=uAYmGwplAng',
    embedUrl: 'https://www.youtube.com/embed/uAYmGwplAng',
    thumbnail: 'https://i.ytimg.com/vi/uAYmGwplAng/hqdefault.jpg',
    isShort: false,
    views: 'Khotbah Pasutri',
    uploadedAt: 'Upload #3 Bersama',
    narrative: {
      id: 'Sebagai pasangan yang telah mengarungi 25 tahun pernikahan dan membesarkan 5 orang anak, kami bersaksi bahwa kasih adalah dasar dari segala aturan dan ketertiban keluarga. Ketika aturan ditegakkan tanpa kasih, anak dan pasangan akan memberontak. Namun ketika kasih Kristus yang berkorban menjadi atmosfer rumah tangga, ketaatan dan keharmonisan mengalir secara alami.',
      en: 'Journeying through 25 years of marriage and raising five children, we testify that love is the true foundation of every household rule. When rules are enforced without love, rebellion brews. But when Christ’s sacrificial love sets the family atmosphere, joyful obedience and harmony flourish naturally.',
    },
  },
  {
    id: 'n2SaRK4mOGo',
    title: 'Ga boleh nikah kalau belum… (Kesiapan Menikah)',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    category: 'Fondasi Pranikah & Kesiapan',
    url: 'https://www.youtube.com/shorts/n2SaRK4mOGo',
    embedUrl: 'https://www.youtube.com/embed/n2SaRK4mOGo',
    thumbnail: 'https://i.ytimg.com/vi/n2SaRK4mOGo/hqdefault.jpg',
    isShort: true,
    views: 'Nasihat Pasutri',
    uploadedAt: 'Upload #4 Bersama',
    narrative: {
      id: 'Bersama istri, kami menekankan bahwa seseorang belum siap menikah jika belum siap mematikan keegoisan diri sendiri. Pernikahan bukan tempat mencari kebahagiaan pribadi dari pasangan, melainkan tempat memberi hidup dan melayani. Pastikan Anda sudah memiliki kedewasaan spiritual, kemandirian emosional, dan kerelaan berkorban sebelum mengucap janji kovenan.',
      en: 'Together with my wife, we stress that one is not ready to marry until one is ready to lay down personal selfishness. Marriage is not primarily where you extract personal happiness from another, but a sacred covenant where you give your life to serve. Ensure you have attained spiritual maturity and emotional self-discipline before making covenant vows.',
    },
  },
  {
    id: 'hi7uF80F-S4',
    title: 'Split bill … (Prinsip Keuangan & Kesatuan Suami Istri)',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    category: 'Manajemen Keuangan Rumah Tangga',
    url: 'https://www.youtube.com/shorts/hi7uF80F-S4',
    embedUrl: 'https://www.youtube.com/embed/hi7uF80F-S4',
    thumbnail: 'https://i.ytimg.com/vi/hi7uF80F-S4/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Finansial Pasutri',
    uploadedAt: 'Upload #5 Bersama',
    narrative: {
      id: 'Kami membahas pandangan Alkitab mengenai keterbukaan keuangan suami istri. Di dalam ikatan kovenan kudus, dua orang telah dipersatukan menjadi satu daging—termasuk dalam perencanaan anggaran, keterbukaan penghasilan, dan pertanggungjawaban pengeluaran. Mentalitas membagi tagihan secara kaku (split bill) tidak mencerminkan kesatuan utuh tubuh Kristus di dalam pernikahan.',
      en: 'We discuss biblical stewardship and transparency in marital finances. In holy covenant, two become one flesh—including budget planning, income transparency, and mutual accountability. A rigid split-bill mentality conflicts with the holistic oneness God designed for Christian marriage.',
    },
  },

  // ==========================================
  // CATEGORY 2: JUST ME / ME ALONE & OTHERS ('solo')
  // With detailed spoken text narratives of what is said by Ps. Boris Manurung
  // ==========================================
  {
    id: 'OlOgRx8LQ9Q',
    title: 'Pacaran lebih lama, lebih baik?',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Relasi & Masa Pranikah',
    url: 'https://www.youtube.com/shorts/OlOgRx8LQ9Q',
    embedUrl: 'https://www.youtube.com/embed/OlOgRx8LQ9Q',
    thumbnail: 'https://i.ytimg.com/vi/OlOgRx8LQ9Q/hqdefault.jpg',
    isShort: true,
    views: 'Video Terkini Solo',
    uploadedAt: 'Upload Terkini Solo',
    narrative: {
      id: 'Dalam video ini, saya menegaskan bahwa pacaran bertahun-tahun bukanlah jaminan pernikahan akan sukses atau bahagia. Yang terpenting bukanlah "berapa lama" waktu berpacaran, melainkan "apa yang dibangun" selama masa pendekatan tersebut. Jika relasi tidak dilandaskan pada keselarasan visi kovenan, keterbukaan karakter, kesepakatan iman, dan kesiapan memikul tanggung jawab, pacaran yang berlarut-larut justru bisa menjebak pasangan dalam kompromi dosa atau kebiasaan yang tidak sehat. Fokuslah membangun fondasi rohani, kesiapan emosional, dan restu orang tua untuk melangkah ke kovenan pernikahan kudus.',
      en: 'In this video, I emphasize that dating for a long duration is never a guarantee of marital happiness or success. What truly matters is not "how long" you date, but "what you build" during that season. Without alignment in covenant vision, character transparency, shared faith values, and readiness for responsibility, extended dating often traps couples in unhealthy compromises. Focus instead on spiritual maturity, emotional integrity, and godly commitment to enter holy covenant.',
    },
  },
  {
    id: 'Q25XGaAGa74',
    title: 'Bagaimana cara melepaskan kecanduan?',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Pemulihan Jiwa & Karakter',
    url: 'https://www.youtube.com/shorts/Q25XGaAGa74',
    embedUrl: 'https://www.youtube.com/embed/Q25XGaAGa74',
    thumbnail: 'https://i.ytimg.com/vi/Q25XGaAGa74/hqdefault.jpg',
    isShort: true,
    views: 'Populer',
    uploadedAt: 'Upload #2 Solo',
    narrative: {
      id: 'Saya menyampaikan bahwa kecanduan tidak dapat dikalahkan hanya dengan tekad manusiawi atau sekadar janji di bibir. Setiap kecanduan berakar pada kekosongan jiwa, luka batin yang terpendam, atau pelarian dari kecemasan yang belum diserahkan kepada salib Kristus. Kunci pemulihan pertama adalah keberanian untuk jujur dan terbuka di hadapan Tuhan serta komunitas yang sehat (Yakobus 5:16). Kegelapan kehilangan cengkeramannya saat dibawa ke dalam terang. Kita membutuhkan kuasa salib Kristus untuk mematahkan belenggu dosa, pembaruan pikiran harian melalui Firman, dan pertanggungjawaban (accountability) yang tulus dengan mentor rohani atau pasangan hidup.',
      en: 'I share that addiction cannot be conquered by sheer willpower or surface promises alone. Addictions root themselves in soul emptiness, unhealed inner wounds, or escapism from anxieties not surrendered to God. The first breakthrough comes through honest confession before God and trusted community (James 5:16). Darkness loses its grip when brought into the light. We need the power of the cross to break chains of sin, daily renewal of the mind in scripture, and sincere accountability with a spouse or godly mentor.',
    },
  },
  {
    id: 'nehFXuTivx4',
    title: 'Minum alkohol itu baik atau tidak?',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Hikmat Hidup & Pengendalian Diri',
    url: 'https://www.youtube.com/shorts/nehFXuTivx4',
    embedUrl: 'https://www.youtube.com/embed/nehFXuTivx4',
    thumbnail: 'https://i.ytimg.com/vi/nehFXuTivx4/hqdefault.jpg',
    isShort: true,
    views: '2.1K views',
    uploadedAt: 'Upload #3 Solo',
    narrative: {
      id: 'Saya mengupas prinsip Alkitab mengenai kebebasan Kristen dan hikmat hidup. Alkitab dengan tegas memperingatkan bahaya mabuk anggur karena hal itu merusak pengendalian diri, melumpuhkan kewaspadaan rohani, dan membuka celah bagi hawa nafsu kedagingan (Efesus 5:18). Yang terpenting bagi orang percaya bukanlah mencari pembenaran sejauh mana kita boleh minum tanpa berdosa, melainkan apakah tindakan kita membangun diri, memuliakan Kristus, dan menjaga orang lain atau keluarga dari batu sandungan. Pilihlah hidup yang dipenuhi oleh Roh Kudus, bukan dikuasai oleh zat apa pun.',
      en: 'I examine biblical wisdom on Christian liberty and personal integrity. Scripture firmly forbids drunkenness because it impairs self-control, deadens spiritual sensitivity, and opens the door to reckless living (Ephesians 5:18). The Christian question is not how close we can get to the boundary without sinning, but whether our actions edify, glorify Christ, and protect others from stumbling. Choose to be filled with the Holy Spirit rather than being mastered by any substance.',
    },
  },
  {
    id: 'yGVMBsl3hBc',
    title: 'Laki laki sebagai provider..',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Kepemimpinan Pria & Tanggung Jawab',
    url: 'https://www.youtube.com/shorts/yGVMBsl3hBc',
    embedUrl: 'https://www.youtube.com/embed/yGVMBsl3hBc',
    thumbnail: 'https://i.ytimg.com/vi/yGVMBsl3hBc/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Karakter Pria',
    uploadedAt: 'Upload #4 Solo',
    narrative: {
      id: 'Saya menjelaskan bahwa menjadi seorang "provider" bagi laki-laki bukan sekadar memiliki penghasilan besar atau membelikan barang-barang mewah. Menjadi provider adalah panggilan kepemimpinan rohani dan mentalitas penuh tanggung jawab di hadapan Allah. Seorang pria dipanggil untuk menghadirkan rasa aman yang menyeluruh: aman secara spiritual melalui mezbah doa dan firman, aman secara emosional melalui kasih dan kesetiaan yang tak tergoyahkan, serta aman secara fisik dan ekonomi melalui kerja keras yang tekun dan jujur.',
      en: 'I explain that being a provider as a man is far more than having a big paycheck or purchasing luxury goods. Being a provider is a calling to spiritual leadership and a mindset of god-fearing responsibility. A man is called to establish comprehensive security: spiritual safety through prayer and scripture, emotional safety through steadfast love and integrity, and physical/economic stability through honest diligence.',
    },
  },
  {
    id: '66y3bhWYEHA',
    title: 'Cari pasangan vs karir…',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Arah Hidup & Prioritas Pemuda',
    url: 'https://www.youtube.com/shorts/66y3bhWYEHA',
    embedUrl: 'https://www.youtube.com/embed/66y3bhWYEHA',
    thumbnail: 'https://i.ytimg.com/vi/66y3bhWYEHA/hqdefault.jpg',
    isShort: true,
    views: 'Konseling Karir & Jodoh',
    uploadedAt: 'Upload #5 Solo',
    narrative: {
      id: 'Saya mengulas pertanyaan yang sering menggelisahkan kaum muda: apakah harus mengutamakan kemapanan karir terlebih dahulu atau mencari pasangan hidup? Kedua hal ini tidak boleh dipertentangkan secara keliru. Firman Tuhan mengajar kita mendahulukan Kerajaan Allah dan kebenaran-Nya (Matius 6:33). Ketika Anda fokus membangun karakter, etos kerja, dan relasi intim dengan Tuhan, Anda sedang mempersiapkan diri menjadi pasangan yang bertanggung jawab. Pasangan yang tepat adalah penolong yang sepadan untuk menggenapi panggilan Ilahi bersama, bukan penghambat karir.',
      en: 'I address the recurring dilemma among young adults: should one achieve complete career establishment first or pursue a life partner? These should never be viewed as conflicting goals. Scripture teaches us to seek first God’s kingdom and His righteousness (Matthew 6:33). As you diligently develop godly character, work ethic, and intimate devotion to God, you naturally mature into a responsible spouse who can build an enduring legacy.',
    },
  },
  {
    id: 'niUZYxgUM2c',
    title: 'Pacar “red flag” itu tandanya apa aja?',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Kearifan Relasi & Karakter',
    url: 'https://www.youtube.com/shorts/niUZYxgUM2c',
    embedUrl: 'https://www.youtube.com/embed/niUZYxgUM2c',
    thumbnail: 'https://i.ytimg.com/vi/niUZYxgUM2c/hqdefault.jpg',
    isShort: true,
    views: 'Tips Berpacaran Sehat',
    uploadedAt: 'Upload #6 Solo',
    narrative: {
      id: 'Saya membagikan tanda-tanda bahaya (red flags) dalam masa pendekatan yang tidak boleh diabaikan. Red flag bukan soal perbedaan selera musik atau makanan, melainkan cacat karakter moral: manipulasi emosional, kemarahan yang meledak-ledak dan merusak, ketidakjujuran kronis, ketidakhormatan kepada orang tua, serta ketidakhadiran rasa takut akan Tuhan. Jangan pernah tertipu ilusi bahwa Anda sanggup mengubah pasangan setelah menikah. Karakter yang tidak mau bertobat di masa pacaran akan menjadi badai yang menghancurkan di dalam pernikahan.',
      en: 'I outline critical warning signs (red flags) in dating that must never be brushed aside. Red flags are not trivial differences in hobbies, but fundamental moral flaws: emotional manipulation, uncontrolled explosive anger, chronic dishonesty, disrespect toward parents, and lack of the fear of the Lord. Never fall for the illusion that you can reform someone after marriage. Unrepentant character flaws before marriage turn into destructive storms in home life.',
    },
  },
  {
    id: 'tWIOdVB9YtE',
    title: 'Pacaran beda agama..',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Ketetapan Alkitab & Kesatuan Roh',
    url: 'https://www.youtube.com/shorts/tWIOdVB9YtE',
    embedUrl: 'https://www.youtube.com/embed/tWIOdVB9YtE',
    thumbnail: 'https://i.ytimg.com/vi/tWIOdVB9YtE/hqdefault.jpg',
    isShort: true,
    views: 'Pengajaran Iman & Pasangan',
    uploadedAt: 'Upload #7 Solo',
    narrative: {
      id: 'Saya mengupas prinsip firman Tuhan dalam 2 Korintus 6:14 tentang larangan menjadi pasangan yang tidak seimbang dengan orang yang tidak percaya. Pernikahan kovenan adalah kesatuan roh, jiwa, dan tubuh di hadapan Kristus. Ketika iman dasar berbeda, suami dan istri tidak memiliki mezbah doa bersama yang sejati, arah pendidikan iman anak akan terombang-ambing, dan perselisihan terdalam akan selalu muncul di momen-momen krusial kehidupan. Taatilah perintah Tuhan lebih dari sekadar tarikan perasaan emosional sesaat.',
      en: 'I examine the apostolic exhortation in 2 Corinthians 6:14 against being unequally yoked. A covenant marriage is a sacred union of spirit, soul, and body centered on Christ. When core faith is divided, husband and wife cannot establish a truly unified prayer altar, children’s spiritual formation becomes fragmented, and deep conflicts inevitably erupt at life’s crucial crossroads. Prioritize obedience to Christ above transient romantic feelings.',
    },
  },
  {
    id: 'zltQF4ML3_g',
    title: 'Jangan cepat tersinggung kalau ditegur..',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Kerendahan Hati & Pertumbuhan Rohani',
    url: 'https://www.youtube.com/shorts/zltQF4ML3_g',
    embedUrl: 'https://www.youtube.com/embed/zltQF4ML3_g',
    thumbnail: 'https://i.ytimg.com/vi/zltQF4ML3_g/hqdefault.jpg',
    isShort: true,
    views: 'Karakter Murid Kristus',
    uploadedAt: 'Upload #8 Solo',
    narrative: {
      id: 'Saya menekankan pentingnya hati yang lapang dan rela diajar saat menerima teguran. Amsal menyatakan bahwa siapa mencintai didikan mencintai pengetahuan, tetapi siapa membenci teguran adalah dungu. Sikap mudah tersinggung dan defensif adalah tanda keangkuhan rohani. Di dalam pernikahan maupun persekutuan gereja, teguran yang tulus dari pasangan atau pembimbing adalah instrumen kasih Allah untuk menyempurnakan karakter kita serupa Kristus. Belajarlah berterima kasih atas koreksi yang membangun.',
      en: 'I emphasize cultivating a teachable and humble heart when receiving correction. Proverbs teaches that whoever loves instruction loves knowledge, but he who hates reproof is foolish. Taking offense easily and acting defensively reveals spiritual pride. In marriage and fellowship, loving correction from a spouse or mentor is God’s instrument to refine our character into Christlikeness. Learn to welcome constructive rebuke with gratitude.',
    },
  },
  {
    id: 'MkyjbhwhL3k',
    title: 'Kalo seorang anak merasa tidak berharga..',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Pengasuhan Anak & Pemulihan Batin',
    url: 'https://www.youtube.com/shorts/MkyjbhwhL3k',
    embedUrl: 'https://www.youtube.com/embed/MkyjbhwhL3k',
    thumbnail: 'https://i.ytimg.com/vi/MkyjbhwhL3k/hqdefault.jpg',
    isShort: true,
    views: 'Konseling Keluarga & Anak',
    uploadedAt: 'Upload #9 Solo',
    narrative: {
      id: 'Saya menyoroti luka batin mendalam yang dialami anak ketika mereka merasa tidak dihargai atau ditolak oleh orang tua mereka. Sering kali tanpa disadari, orang tua hanya mengapresiasi anak saat meraih prestasi nilai atau menuntut anak memenuhi ambisi orang tua yang belum tercapai. Saya mengingatkan setiap orang tua bahwa anak bukanlah proyek pemuas ego kita, melainkan titipan pusaka dari Tuhan. Nyatakan kasih tanpa syarat, dengarkan jeritan hati mereka, dan tegaskan bahwa nilai mereka bersumber dari karya penciptaan dan penebusan Kristus.',
      en: 'I address the profound emotional wounds inflicted on children when they feel unvalued or rejected within their family. Too often, parents only show affection when children perform academically, treating them as trophies for parental ambition. I remind parents that children are not our vanity projects, but sacred heritages entrusted by God. Express unconditional love, listen attentively to their hearts, and anchor their self-worth in Christ’s creation and redemption.',
    },
  },
  {
    id: 'fiopdzAF7zM',
    title: 'Kenalan utk cari pacar…',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    category: 'Pergaulan Sehat & Hikmat Masa Muda',
    url: 'https://www.youtube.com/shorts/fiopdzAF7zM',
    embedUrl: 'https://www.youtube.com/embed/fiopdzAF7zM',
    thumbnail: 'https://i.ytimg.com/vi/fiopdzAF7zM/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Pergaulan Kristen',
    uploadedAt: 'Upload #10 Solo',
    narrative: {
      id: 'Saya membagikan panduan praktis dan alkitabiah bagi kaum muda saat membuka pertemanan dengan lawan jenis. Memulai perkenalan jangan didasarkan pada rasa panik karena kesepian atau sekadar dorongan hawa nafsu. Bukalah relasi dalam lingkungan komunitas rohani yang sehat, amati bagaimana ia menghormati Tuhan, bagaimana ia memperlakukan orang tuanya, dan bagaimana ia merespons kegagalan. Kejujuran motivasi di awal perkenalan akan menjaga hati dari kepedihan dan penyesalan di kemudian hari.',
      en: 'I share practical, biblical guidance for young believers entering initial friendships with the opposite sex. Initiating an acquaintance should never stem from desperate loneliness or fleeting lust. Build friendships within healthy spiritual communities; observe how they reverence God, treat their parents, and react under pressure. Purity of motivation at the very beginning shields your heart from needless sorrow and regret.',
    },
  },
];

/**
 * Fetch all YouTube videos
 */
export async function getLatestBorisYouTubeVideos(): Promise<YouTubeVideoItem[]> {
  return BORIS_YOUTUBE_VIDEOS;
}

/**
 * Fetch videos where Boris and his wife are together
 */
export async function getTogetherYouTubeVideos(): Promise<YouTubeVideoItem[]> {
  return BORIS_YOUTUBE_VIDEOS.filter((v) => v.categoryType === 'together');
}

/**
 * Fetch videos of Ps. Boris Manurung speaking alone & others (with spoken narrative)
 */
export async function getSoloYouTubeVideos(): Promise<YouTubeVideoItem[]> {
  return BORIS_YOUTUBE_VIDEOS.filter((v) => v.categoryType === 'solo');
}

/**
 * Fetch home page video sets for both categories:
 * - Together (Boris & Wife): latest video (running) + 2 previous videos
 * - Solo (Boris Alone): latest video (running, with narrative) + 2 previous videos (with narratives)
 */
export async function getHomeCategorizedYouTubeVideos(): Promise<{
  together: {
    latest: YouTubeVideoItem;
    previous: YouTubeVideoItem[];
    all: YouTubeVideoItem[];
  };
  solo: {
    latest: YouTubeVideoItem;
    previous: YouTubeVideoItem[];
    all: YouTubeVideoItem[];
  };
}> {
  const togetherList = BORIS_YOUTUBE_VIDEOS.filter((v) => v.categoryType === 'together');
  const soloList = BORIS_YOUTUBE_VIDEOS.filter((v) => v.categoryType === 'solo');

  return {
    together: {
      latest: togetherList[0],
      previous: togetherList.slice(1, 3),
      all: togetherList,
    },
    solo: {
      latest: soloList[0],
      previous: soloList.slice(1, 3),
      all: soloList,
    },
  };
}
