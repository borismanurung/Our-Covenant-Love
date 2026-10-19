export type VideoCategoryType = 'together' | 'solo';

export interface YouTubeVideoItem {
  id: string;
  title: string;
  titleEn?: string;
  categoryType: VideoCategoryType; // 'together' = Our Covenant Love (Boris & Wife together), 'solo' = Verse Of The Day (Boris alone speaking)
  speakerName: string;
  speakerNameEn?: string;
  category: string;
  categoryEn?: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
  isShort?: boolean;
  views?: string;
  viewsEn?: string;
  uploadedAt?: string;
  uploadedAtEn?: string;
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
 * 1. 'together' - "Our Covenant Love": Videos where Ps. Boris and his wife Meilita appear TOGETHER on camera.
 * 2. 'solo' - "Verse Of The Day": Videos where ONLY 1 PERSON (Ps. Boris alone) appears, holding an open Bible and declaring the verse of the day.
 * All items are fully localized in Indonesian and English with spoken narratives.
 */
export const BORIS_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  // ==========================================
  // CATEGORY 1: OUR COVENANT LOVE ('together' - Boris & Wife together on screen)
  // ==========================================
  {
    id: 'ifZtLBlGu20',
    title: 'Kalau sudah menikah tinggal berdua atau dgn org tua?',
    titleEn: 'Living alone as a couple vs living with parents after marriage?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Kemandirian Pernikahan Kudus',
    categoryEn: 'Marital Independence & Leave and Cleave',
    url: 'https://www.youtube.com/shorts/ifZtLBlGu20',
    embedUrl: 'https://www.youtube.com/embed/ifZtLBlGu20',
    thumbnail: 'https://i.ytimg.com/vi/ifZtLBlGu20/hqdefault.jpg',
    isShort: true,
    views: 'Video Terkini Bersama',
    viewsEn: 'Latest Couple Video',
    uploadedAt: 'Upload Terkini Bersama',
    uploadedAtEn: 'Latest Couple Upload',
    narrative: {
      id: 'Bersama istri tercinta, kami membagikan prinsip alkitabiah Kejadian 2:24 bahwa seorang pria harus meninggalkan ayah dan ibunya dan bersatu dengan istrinya sehingga keduanya menjadi satu daging. Tinggal mandiri berdua setelah menikah adalah langkah yang sangat sehat untuk membangun kebiasaan, ritme komunikasi, dan kepemimpinan rumah tangga sendiri tanpa campur tangan orang tua, seraya tetap menghormati mereka.',
      en: 'Together with my beloved wife, we share the biblical principle of Genesis 2:24: a man shall leave his father and mother and hold fast to his wife, and they shall become one flesh. Living independently as a couple after marriage fosters healthy marital rhythms, communication, and spiritual leadership without undue interference, while continuing to honor parents.',
    },
  },
  {
    id: 'i_Wk_Axmut4',
    title: 'Bagaimana ketika tertarik pada seseorang tapi merasa belum siap?',
    titleEn: 'Attracted to someone but feeling not yet ready?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Kesiapan Hati & Pranikah',
    categoryEn: 'Emotional & Spiritual Readiness',
    url: 'https://www.youtube.com/shorts/i_Wk_Axmut4',
    embedUrl: 'https://www.youtube.com/embed/i_Wk_Axmut4',
    thumbnail: 'https://i.ytimg.com/vi/i_Wk_Axmut4/hqdefault.jpg',
    isShort: true,
    views: 'Our Covenant Love Official',
    viewsEn: 'Our Covenant Love Official',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Mengenakan kaos resmi Our Covenant Love berdua, kami menegaskan bahwa rasa ketertarikan adalah hal yang wajar, namun jangan terburu-buru mengikat hubungan jika secara rohani, emosional, dan karakter belum siap. Fokuslah bertumbuh di dalam Tuhan dan mempersiapkan diri menjadi pribadi yang matang sebelum melangkah ke komitmen kovenan pernikahan kudus.',
      en: 'Wearing our official Our Covenant Love shirts together, we share that romantic attraction is natural, but one must never rush into a premature relationship without spiritual, emotional, and character readiness. Focus on maturing in Christ and preparing yourself to be a godly partner before entering a sacred marriage covenant.',
    },
  },
  {
    id: 'L9Q3k5N3DwU',
    title: 'Bagaimana jika suka dengan org yg sangat berbeda level dengan kita?',
    titleEn: 'What if you like someone from a very different life level?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Penyelarasan Nilai & Kesepadanan',
    categoryEn: 'Value Alignment & Equivalence',
    url: 'https://www.youtube.com/shorts/L9Q3k5N3DwU',
    embedUrl: 'https://www.youtube.com/embed/L9Q3k5N3DwU',
    thumbnail: 'https://i.ytimg.com/vi/L9Q3k5N3DwU/hqdefault.jpg',
    isShort: true,
    views: 'Our Covenant Love Official',
    viewsEn: 'Our Covenant Love Official',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Bersama istri dengan cangkir Our Covenant Love, kami mengupas bahwa perbedaan latar belakang ekonomi atau status sosial bukanlah penghalang utama, melainkan keselarasan iman, kedewasaan karakter, dan kerelaan saling merendahkan hati untuk belajar. Carilah pasangan yang sepadan di dalam Kristus dan memiliki komitmen kovenan yang teguh.',
      en: 'Together with my wife and our Our Covenant Love mugs, we explain that differences in social status or financial background are secondary to alignment in faith, Christlike humility, and godly character. Seek a partner who is spiritually equally yoked in Christ and committed to sacred covenant.',
    },
  },
  {
    id: '03yCsTpCF_I',
    title: 'Nonton film romantis berpengaruh kepada hubungan…',
    titleEn: 'Do romantic movies affect real relationships?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Ekspektasi & Romansa Realistis',
    categoryEn: 'Expectations & Realistic Romance',
    url: 'https://www.youtube.com/shorts/03yCsTpCF_I',
    embedUrl: 'https://www.youtube.com/embed/03yCsTpCF_I',
    thumbnail: 'https://i.ytimg.com/vi/03yCsTpCF_I/hqdefault.jpg',
    isShort: true,
    views: 'Shorts Pasutri',
    viewsEn: 'Couples Shorts',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami mendiskusikan bagaimana konsumsi film romantis fiktif dapat memicu perbandingan yang tidak realistis terhadap pasangan nyata. Keintiman sejati tidak dibangun dari alur cerita fantasi, melainkan dari penerimaan tulus, komunikasi harian, dan kerelaan saling mengampuni dalam dinamika rumah tangga nyata.',
      en: 'We discuss how consuming fictional romantic films can foster unrealistic comparisons against one’s real spouse. Genuine marital intimacy is not forged from fantasy scripts, but through unconditional acceptance, daily communication, and prompt forgiveness in everyday life.',
    },
  },
  {
    id: 'OlOgRx8LQ9Q',
    title: 'Pacaran lebih lama, lebih baik?',
    titleEn: 'Is dating longer always better?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Relasi & Masa Pranikah',
    categoryEn: 'Relationships & Courtship',
    url: 'https://www.youtube.com/shorts/OlOgRx8LQ9Q',
    embedUrl: 'https://www.youtube.com/embed/OlOgRx8LQ9Q',
    thumbnail: 'https://i.ytimg.com/vi/OlOgRx8LQ9Q/hqdefault.jpg',
    isShort: true,
    views: 'Nasihat Pasutri',
    viewsEn: 'Couples Advice',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Bersama istri, kami menegaskan bahwa pacaran bertahun-tahun bukanlah jaminan pernikahan akan sukses atau bahagia. Yang terpenting bukanlah "berapa lama" waktu berpacaran, melainkan "apa yang dibangun" selama masa pendekatan tersebut: keselarasan visi kovenan, keterbukaan karakter, kesepakatan iman, dan kesiapan memikul tanggung jawab.',
      en: 'Together with my wife, we emphasize that dating for a long duration is never a guarantee of marital happiness or success. What truly matters is not "how long" you date, but "what you build" during that season: alignment in covenant vision, character transparency, shared faith values, and readiness for responsibility.',
    },
  },
  {
    id: 'Q25XGaAGa74',
    title: 'Bagaimana cara melepaskan kecanduan?',
    titleEn: 'How to overcome and break free from addictions?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Pemulihan Jiwa & Pasangan',
    categoryEn: 'Healing & Marital Restoration',
    url: 'https://www.youtube.com/shorts/Q25XGaAGa74',
    embedUrl: 'https://www.youtube.com/embed/Q25XGaAGa74',
    thumbnail: 'https://i.ytimg.com/vi/Q25XGaAGa74/hqdefault.jpg',
    isShort: true,
    views: 'Populer Bersama',
    viewsEn: 'Popular Couple',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami membagikan bahwa belenggu kecanduan dalam kehidupan dan pernikahan tidak dapat dipatahkan hanya dengan tekad manusiawi. Dibutuhkan keberanian untuk jujur dan terbuka di hadapan Tuhan serta pasangan hidup (Yakobus 5:16). Kegelapan kehilangan kuasanya saat dibawa ke dalam terang kasih Kristus.',
      en: 'We share that breaking free from addictions in life and marriage cannot happen by sheer willpower alone. It requires courage to be completely transparent before God and spouse (James 5:16). Darkness loses its grip when brought into the light of Christ’s love and prayer support.',
    },
  },
  {
    id: 'nehFXuTivx4',
    title: 'Minum alkohol baik atau tidak?',
    titleEn: 'Is drinking alcohol permissible or wise?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Hikmat Hidup & Pengendalian Diri',
    categoryEn: 'Wisdom & Self-Control',
    url: 'https://www.youtube.com/shorts/nehFXuTivx4',
    embedUrl: 'https://www.youtube.com/embed/nehFXuTivx4',
    thumbnail: 'https://i.ytimg.com/vi/nehFXuTivx4/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Pasutri',
    viewsEn: 'Couples Education',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Bersama istri, kami mengupas prinsip Alkitab mengenai kebebasan Kristen dan hikmat hidup (Efesus 5:18). Yang terpenting bagi orang percaya bukanlah mencari pembenaran sejauh mana kita boleh minum tanpa berdosa, melainkan apakah tindakan kita menjaga kekudusan keluarga, memuliakan Kristus, dan menjauhkan orang lain dari batu sandungan.',
      en: 'Together with my wife, we examine biblical wisdom on Christian liberty and personal integrity (Ephesians 5:18). The Christian question is not how close we can get to the boundary without sinning, but whether our actions edify the family, glorify Christ, and protect others from stumbling.',
    },
  },
  {
    id: 'yGVMBsl3hBc',
    title: 'Laki laki sebagai provider..',
    titleEn: 'Men as providers in family and relationship',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Kepemimpinan Pria & Tanggung Jawab',
    categoryEn: 'Godly Manhood & Responsibility',
    url: 'https://www.youtube.com/shorts/yGVMBsl3hBc',
    embedUrl: 'https://www.youtube.com/embed/yGVMBsl3hBc',
    thumbnail: 'https://i.ytimg.com/vi/yGVMBsl3hBc/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Karakter Pasutri',
    viewsEn: 'Marital Roles',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami membahas bahwa menjadi seorang "provider" bagi suami bukan sekadar memiliki penghasilan besar atau membelikan barang mewah. Menjadi provider adalah panggilan kepemimpinan rohani di hadapan Allah: menghadirkan rasa aman rohani lewat doa, rasa aman emosional lewat kesetiaan, serta stabilitas ekonomi lewat kerja keras.',
      en: 'We discuss that being a provider as a husband is far more than having a big paycheck. Being a provider is a spiritual calling: establishing spiritual safety through prayer, emotional safety through steadfast faithfulness, and economic stability through honest diligence.',
    },
  },
  {
    id: '66y3bhWYEHA',
    title: 'Cari pasangan vs karir…',
    titleEn: 'Seeking a spouse vs career ambitions',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Arah Hidup & Prioritas Pemuda',
    categoryEn: 'Life Purpose & Youth Priorities',
    url: 'https://www.youtube.com/shorts/66y3bhWYEHA',
    embedUrl: 'https://www.youtube.com/embed/66y3bhWYEHA',
    thumbnail: 'https://i.ytimg.com/vi/66y3bhWYEHA/hqdefault.jpg',
    isShort: true,
    views: 'Konseling Pasutri',
    viewsEn: 'Couple Counseling',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami berdua menjawab pertanyaan kaum muda tentang kemapanan karir versus mencari pasangan hidup. Firman Tuhan mengajar kita mendahulukan Kerajaan Allah (Matius 6:33). Ketika Anda membangun karakter dan etos kerja, Anda sedang mempersiapkan diri menjadi pasangan yang bertanggung jawab untuk membangun masa depan bersama.',
      en: 'Together we address the dilemma between career establishment and seeking a spouse. Scripture teaches us to seek first God’s kingdom (Matthew 6:33). As you diligently develop godly character and work ethic, you naturally mature into a responsible spouse who can build an enduring marriage.',
    },
  },
  {
    id: 'niUZYxgUM2c',
    title: 'Pacar “red flag” itu tandanya apa aja?',
    titleEn: 'What are the red flags in a dating partner?',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Kearifan Relasi & Karakter',
    categoryEn: 'Relationship Wisdom & Character',
    url: 'https://www.youtube.com/shorts/niUZYxgUM2c',
    embedUrl: 'https://www.youtube.com/embed/niUZYxgUM2c',
    thumbnail: 'https://i.ytimg.com/vi/niUZYxgUM2c/hqdefault.jpg',
    isShort: true,
    views: 'Tips Berpacaran Sehat',
    viewsEn: 'Healthy Courtship Tips',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami membagikan tanda-tanda bahaya (red flags) dalam masa pendekatan: manipulasi emosional, kemarahan yang meledak-ledak dan merusak, ketidakjujuran kronis, serta ketiadaan rasa takut akan Tuhan. Jangan pernah berasumsi Anda sanggup mengubah pasangan setelah menikah; karakter yang tidak bertobat akan menjadi badai di dalam pernikahan.',
      en: 'We outline critical warning signs (red flags) in dating: emotional manipulation, uncontrolled explosive anger, chronic dishonesty, and lack of the fear of the Lord. Never assume you can reform someone after marriage; unrepentant character flaws turn into destructive storms in home life.',
    },
  },
  {
    id: 'tWIOdVB9YtE',
    title: 'Pacaran beda agama..',
    titleEn: 'Interfaith dating and unequal yokes',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Ketetapan Alkitab & Kesatuan Roh',
    categoryEn: 'Biblical Principles & Spiritual Unity',
    url: 'https://www.youtube.com/shorts/tWIOdVB9YtE',
    embedUrl: 'https://www.youtube.com/embed/tWIOdVB9YtE',
    thumbnail: 'https://i.ytimg.com/vi/tWIOdVB9YtE/hqdefault.jpg',
    isShort: true,
    views: 'Pengajaran Iman & Pasangan',
    viewsEn: 'Faith & Marriage Teaching',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami mengulas ketetapan 2 Korintus 6:14 tentang kesatuan iman. Pernikahan kovenan adalah kesatuan roh, jiwa, dan tubuh di hadapan Kristus. Ketika iman dasar berbeda, suami dan istri tidak memiliki mezbah doa bersama yang sejati, dan arah pendidikan iman anak akan terombang-ambing.',
      en: 'We examine the biblical principle of 2 Corinthians 6:14 regarding spiritual unity. Covenant marriage is a sacred union of spirit, soul, and body centered on Christ. When core faith is divided, husband and wife cannot establish a truly unified prayer altar.',
    },
  },
  {
    id: 'zltQF4ML3_g',
    title: 'Jangan cepat tersinggung kalau ditegur..',
    titleEn: 'Do not easily take offense when corrected',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Kerendahan Hati & Komunikasi',
    categoryEn: 'Humility & Communication',
    url: 'https://www.youtube.com/shorts/zltQF4ML3_g',
    embedUrl: 'https://www.youtube.com/embed/zltQF4ML3_g',
    thumbnail: 'https://i.ytimg.com/vi/zltQF4ML3_g/hqdefault.jpg',
    isShort: true,
    views: 'Harmonis Pasutri',
    viewsEn: 'Marital Harmony',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Dari pengalaman 25 tahun pernikahan kami, kami belajar bahwa kemampuan menerima teguran dengan lapang dada adalah kunci keharmonisan kovenan. Amsal 12:1 mengingatkan bahwa siapa mencintai didikan mencintai pengetahuan. Teguran yang tulus dari pasangan adalah instrumen kasih Allah untuk menyempurnakan kita.',
      en: 'From our 25-year marriage journey, we learned that humility in receiving correction is vital for covenant harmony. Proverbs 12:1 reminds us that whoever loves instruction loves knowledge. Loving correction from your spouse is God’s instrument to refine our character.',
    },
  },
  {
    id: 'MkyjbhwhL3k',
    title: 'Kalo seorang anak merasa tidak berharga..',
    titleEn: 'When a child feels unworthy or rejected',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Pengasuhan Anak & Kovenan Keluarga',
    categoryEn: 'Parenting & Covenant Heritage',
    url: 'https://www.youtube.com/shorts/MkyjbhwhL3k',
    embedUrl: 'https://www.youtube.com/embed/MkyjbhwhL3k',
    thumbnail: 'https://i.ytimg.com/vi/MkyjbhwhL3k/hqdefault.jpg',
    isShort: true,
    views: 'Konseling Keluarga',
    viewsEn: 'Family Counseling',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Sebagai orang tua dari lima orang anak, kami mengingatkan setiap orang tua bahwa anak bukanlah proyek pemuas ego kita, melainkan titipan pusaka kudus dari Tuhan (Mazmur 127:3). Sirami mereka dengan kasih tanpa syarat dan dengarkan jeritan hati mereka.',
      en: 'As parents of five children, we remind parents that children are not our vanity projects, but sacred heritages entrusted by God (Psalm 127:3). Express unconditional love, listen attentively to their hearts, and anchor their worth in Christ.',
    },
  },
  {
    id: 'fiopdzAF7zM',
    title: 'Kenalan utk cari pacar…',
    titleEn: 'Godly approach to meeting prospective partners',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Pergaulan Sehat & Hikmat Masa Muda',
    categoryEn: 'Healthy Friendships & Youth Wisdom',
    url: 'https://www.youtube.com/shorts/fiopdzAF7zM',
    embedUrl: 'https://www.youtube.com/embed/fiopdzAF7zM',
    thumbnail: 'https://i.ytimg.com/vi/fiopdzAF7zM/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Pergaulan',
    viewsEn: 'Fellowship Education',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami membagikan panduan praktis bagi kaum muda saat membuka pertemanan dengan lawan jenis. Memulai perkenalan jangan didasarkan pada rasa panik karena kesepian. Bukalah relasi dalam lingkungan komunitas rohani yang sehat dan amati bagaimana ia menghormati Tuhan (Amsal 3:5–6).',
      en: 'We share practical guidance for young believers entering initial friendships with the opposite sex. Initiating an acquaintance should never stem from desperate loneliness. Build friendships within healthy spiritual communities and observe how they reverence God (Proverbs 3:5–6).',
    },
  },
  {
    id: 'hi7uF80F-S4',
    title: 'Split bill … (Prinsip Keuangan & Kesatuan Suami Istri)',
    titleEn: 'Split bill … (Financial Unity in Marriage)',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Manajemen Keuangan Rumah Tangga',
    categoryEn: 'Marital Financial Stewardship',
    url: 'https://www.youtube.com/shorts/hi7uF80F-S4',
    embedUrl: 'https://www.youtube.com/embed/hi7uF80F-S4',
    thumbnail: 'https://i.ytimg.com/vi/hi7uF80F-S4/hqdefault.jpg',
    isShort: true,
    views: 'Edukasi Finansial Pasutri',
    viewsEn: 'Marital Finance Education',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kami membahas pandangan Alkitab mengenai keterbukaan keuangan suami istri. Di dalam ikatan kovenan kudus, dua orang telah dipersatukan menjadi satu daging—termasuk dalam perencanaan anggaran, keterbukaan penghasilan, dan pertanggungjawaban pengeluaran bersama.',
      en: 'We discuss biblical stewardship and transparency in marital finances. In holy covenant, two become one flesh—including budget planning, income transparency, and mutual accountability for household expenses.',
    },
  },
  {
    id: 'n2SaRK4mOGo',
    title: 'Ga boleh nikah kalau belum… (Kesiapan Menikah)',
    titleEn: 'Never marry until you are ready to… (Marriage Readiness)',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Fondasi Pranikah & Kesiapan',
    categoryEn: 'Premarital Readiness',
    url: 'https://www.youtube.com/shorts/n2SaRK4mOGo',
    embedUrl: 'https://www.youtube.com/embed/n2SaRK4mOGo',
    thumbnail: 'https://i.ytimg.com/vi/n2SaRK4mOGo/hqdefault.jpg',
    isShort: true,
    views: 'Nasihat Pasutri',
    viewsEn: 'Couples Advice',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Bersama istri, kami menekankan bahwa seseorang belum siap menikah jika belum siap mematikan keegoisan diri sendiri. Pernikahan bukan tempat mencari pemenuhan ego pribadi, melainkan tempat memberi hidup dan melayani dalam kovenan kudus.',
      en: 'Together with my wife, we stress that one is not ready to marry until one is ready to lay down personal selfishness. Marriage is not primarily where you extract personal happiness, but a sacred covenant where you give your life to serve.',
    },
  },
  {
    id: 'kV9DoWIEPAA',
    title: 'Pernikahan akan long lasting kalau …',
    titleEn: 'Marriage will be long-lasting if…',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Kesetiaan & Keharmonisan Kovenan',
    categoryEn: 'Covenant Faithfulness & Longevity',
    url: 'https://www.youtube.com/shorts/kV9DoWIEPAA',
    embedUrl: 'https://www.youtube.com/embed/kV9DoWIEPAA',
    thumbnail: 'https://i.ytimg.com/vi/kV9DoWIEPAA/hqdefault.jpg',
    isShort: true,
    views: 'Resep Pernikahan Langgeng',
    viewsEn: 'Enduring Marriage Wisdom',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Kunci pernikahan yang langgeng dan berbuah hingga puluhan tahun adalah kerelaan saling mengampuni setiap hari, memelihara keintiman mezbah doa berdua, dan menjadikan firman Kristus sebagai dasar dari seluruh keputusan rumah tangga.',
      en: 'The secret to an enduring, joyful marriage across decades is daily forgiveness, cultivating shared prayer intimacy, and keeping Christ’s Word at the center of every household decision.',
    },
  },
  {
    id: 'D1MGvmqvdeM',
    title: 'Pacaran setelah menikah🔥',
    titleEn: 'Dating and courting after marriage🔥',
    categoryType: 'together',
    speakerName: 'Ps. Boris & Meilita Manurung',
    speakerNameEn: 'Ps. Boris & Meilita Manurung',
    category: 'Romansa & Api Kovenan',
    categoryEn: 'Romance & Sustaining the Flame',
    url: 'https://www.youtube.com/shorts/D1MGvmqvdeM',
    embedUrl: 'https://www.youtube.com/embed/D1MGvmqvdeM',
    thumbnail: 'https://i.ytimg.com/vi/D1MGvmqvdeM/hqdefault.jpg',
    isShort: true,
    views: 'Romansa Pasutri',
    viewsEn: 'Marital Romance',
    uploadedAt: 'Video Bersama',
    uploadedAtEn: 'Couple Video',
    narrative: {
      id: 'Api cinta dan kencan tidak boleh padam setelah mengucap janji nikah! Bersama istri dengan kaos God Loves Indonesia, kami membagikan pentingnya terus berpacaran, menciptakan waktu berkualitas berdua, dan merawat binar romansa di sepanjang perjalanan kovenan.',
      en: 'Dating must never stop once you say "I do"! Together with my wife, we highlight the vital importance of intentional couple dates, continuous courtship, and nurturing romance throughout your lifelong covenant journey.',
    },
  },

  // ==========================================
  // CATEGORY 2: VERSE OF THE DAY ('solo' - Boris ALONE speaking & declaring the verse of the day)
  // Ps. Boris Manurung holding an open Bible declaring Scripture from Proverbs
  // ==========================================
  {
    id: '_PYTVqhx7KM',
    title: 'Iron Sharpens Iron #godlyfriends #wisdom',
    titleEn: 'Iron Sharpens Iron (Proverbs 27:17)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Hikmat Amsal & Persahabatan Ilahi',
    categoryEn: 'Proverbs Wisdom & Godly Friends',
    url: 'https://www.youtube.com/shorts/_PYTVqhx7KM',
    embedUrl: 'https://www.youtube.com/embed/_PYTVqhx7KM',
    thumbnail: 'https://i.ytimg.com/vi/_PYTVqhx7KM/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Video Terkini Solo',
    uploadedAtEn: 'Latest Solo Video',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:17 — "Besi menajamkan besi, orang menajamkan sesamanya." Dalam pesan firman hari ini, saya menegaskan pentingnya memiliki sahabat rohani yang berani menegur dan menajamkan karakter kita dalam kebenaran. Persahabatan sejati di dalam Kristus bukanlah yang saling memanjakan kelemahan, melainkan yang saling membangun iman, kekudusan, dan ketabahan hidup.',
      en: 'The verse of the day today: Proverbs 27:17 — "As iron sharpens iron, so one person sharpens another." In this message today, I emphasize the vital need for godly friendships that sharpen our character and faith in truth. True Christian friendship does not indulge spiritual weakness, but provokes us to love, holiness, and righteous endurance.',
    },
  },
  {
    id: 'hw1xh4kAnq0',
    title: 'A Constant Leak #godlyfriends #wisdom',
    titleEn: 'A Constant Leak (Proverbs 27:15)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Hikmat Kata & Kedamaian Hati',
    categoryEn: 'Words of Wisdom & Peace',
    url: 'https://www.youtube.com/shorts/hw1xh4kAnq0',
    embedUrl: 'https://www.youtube.com/embed/hw1xh4kAnq0',
    thumbnail: 'https://i.ytimg.com/vi/hw1xh4kAnq0/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:15 — "Tiris yang tiris terus-menerus pada waktu hujan lebat dan perkataan yang suka bertengkar adalah sama." Dalam pesan firman hari ini, saya mengingatkan bahaya perselisihan dan omelan yang mengikis kedamaian jiwa. Belajarlah mengendalikan lidah dan membawa kata-kata yang menyejukkan serta membangun kehidupan.',
      en: 'The verse of the day today: Proverbs 27:15 — "A continual dripping on a rainy day and a quarrelsome tongue are alike." In this message today, I caution against the draining effects of constant contention and complaining. Learn to tame the tongue and speak life-giving words that minister peace and grace.',
    },
  },
  {
    id: 'rsNohsUKVU0',
    title: 'Mind Your Flock #responsibility #diligence',
    titleEn: 'Mind Your Flock (Proverbs 27:23)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Tanggung Jawab & Ketekunan',
    categoryEn: 'Responsibility & Diligence',
    url: 'https://www.youtube.com/shorts/rsNohsUKVU0',
    embedUrl: 'https://www.youtube.com/embed/rsNohsUKVU0',
    thumbnail: 'https://i.ytimg.com/vi/rsNohsUKVU0/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:23 — "Kenallah baik-baik keadaan kambing dombamu, perhatikanlah kawanan hewanmu." Dalam pesan firman hari ini, saya mengajak setiap kita untuk setia dan teliti memperhatikan tanggung jawab yang Tuhan percayakan, baik keluarga, pekerjaan, maupun pelayanan. Ketekunan harian adalah cermin hati hamba yang berkenan bagi Allah.',
      en: 'The verse of the day today: Proverbs 27:23 — "Be sure you know the condition of your flocks, give careful attention to your herds." In this message today, I urge every believer to exercise faithful stewardship over what God has entrusted—our families, vocations, and callings. Daily diligence reflects a heart pleasing to our Master.',
    },
  },
  {
    id: 'p3b6tuve0Zg',
    title: 'Nothing Last #thingschange #eternal',
    titleEn: 'Nothing Last (Proverbs 27:24)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Kekekalan & Nilai Hidup Sejati',
    categoryEn: 'Eternity & Eternal Values',
    url: 'https://www.youtube.com/shorts/p3b6tuve0Zg',
    embedUrl: 'https://www.youtube.com/embed/p3b6tuve0Zg',
    thumbnail: 'https://i.ytimg.com/vi/p3b6tuve0Zg/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:24 — "Karena harta benda tidaklah abadi; apakah mahkota tetap turun-temurun?" Dalam pesan firman hari ini, saya mengingatkan bahwa hal-hal duniawi bersifat sementara. Jangan menaruh rasa aman pada materi fana, melainkan bangunlah hidup di atas fondasi Kerajaan Allah yang kekal.',
      en: 'The verse of the day today: Proverbs 27:24 — "For riches do not endure forever, and a crown is not secure for all generations." In this message today, I remind us that worldly wealth and accolades are transient. Anchor your ultimate security not in temporal possessions, but in the unshakeable Kingdom of God.',
    },
  },
  {
    id: 'VKN_45ioQPM',
    title: 'Bold As A Lion #conscience #repentant',
    titleEn: 'Bold As A Lion (Proverbs 28:1)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Keberanian Iman & Hati Nurani Bersih',
    categoryEn: 'Spiritual Boldness & Clean Conscience',
    url: 'https://www.youtube.com/shorts/VKN_45ioQPM',
    embedUrl: 'https://www.youtube.com/embed/VKN_45ioQPM',
    thumbnail: 'https://i.ytimg.com/vi/VKN_45ioQPM/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 28:1 — "Orang fasik lari, walaupun tidak ada yang mengejarnya, tetapi orang benar merasa aman seperti singa muda." Dalam pesan firman hari ini, saya membagikan bahwa keberanian sejati lahir dari hati nurani yang bersih di hadapan Tuhan dan sesama. Ketika dosa dibereskan lewat pertobatan sejati, Roh Kudus memenuhi kita dengan keberanian iman seperti singa.',
      en: 'The verse of the day today: Proverbs 28:1 — "The wicked flee though no one pursues, but the righteous are as bold as a lion." In this message today, I share that genuine spiritual boldness flows from a cleansed conscience through Christ. When sin is renounced, the Holy Spirit empowers us to stand tall and uncompromised in faith.',
    },
  },
  {
    id: '3yThIP7WZ34',
    title: 'Unteachable Heart #fools #teachable',
    titleEn: 'Unteachable Heart (Proverbs 27:22)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Kerendahan Hati & Sikap Rela Diajar',
    categoryEn: 'Humility & Teachable Spirit',
    url: 'https://www.youtube.com/shorts/3yThIP7WZ34',
    embedUrl: 'https://www.youtube.com/embed/3yThIP7WZ34',
    thumbnail: 'https://i.ytimg.com/vi/3yThIP7WZ34/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:22 — "Sekalipun engkau menumbuk orang bodoh dalam lesung, kebodohannya tidak akan lenyap dari padanya." Dalam pesan firman hari ini, saya memperingatkan bahaya hati yang keras kepala dan menolak didikan. Milikilah hati seorang murid yang senantiasa terbuka menerima teguran firman Tuhan agar hidup kita terus bertumbuh bijaksana.',
      en: 'The verse of the day today: Proverbs 27:22 — "Though you grind a fool in a mortar with a pestle, you will not remove their folly from them." In this message today, I warn against the danger of a stubborn, unteachable heart. Cultivate a disciple’s heart that welcomes godly correction and continually pursues wisdom.',
    },
  },
  {
    id: 'yRjqoDBXEiQ',
    title: 'Test of Praise #humility #grateful',
    titleEn: 'Test of Praise (Proverbs 27:21)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Ujian Pujian & Kemurnian Hati',
    categoryEn: 'The Test of Praise & Pure Heart',
    url: 'https://www.youtube.com/shorts/yRjqoDBXEiQ',
    embedUrl: 'https://www.youtube.com/embed/yRjqoDBXEiQ',
    thumbnail: 'https://i.ytimg.com/vi/yRjqoDBXEiQ/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:21 — "Kowi adalah untuk melebur perak dan perapian adalah untuk emas, dan orang dinilai menurut pujian yang diterimanya." Dalam pesan firman hari ini, saya menantang setiap kita tentang bagaimana merespons pujian: apakah kita menjadi sombong atau mengembalikan segala kemuliaan kepada Tuhan yang memberi anugerah.',
      en: 'The verse of the day today: Proverbs 27:21 — "The crucible for silver and the furnace for gold, but people are tested by their praise." In this message today, I challenge us on how we handle praise: does admiration feed pride, or do we swiftly redirect all honor and glory to God our Father?',
    },
  },
  {
    id: 'RZ_T4iGv8v4',
    title: 'Never Enough #satisfied #contentment',
    titleEn: 'Never Enough (Proverbs 27:20)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Rasa Cukup & Kepuasan Sejati',
    categoryEn: 'True Contentment & Joy in God',
    url: 'https://www.youtube.com/shorts/RZ_T4iGv8v4',
    embedUrl: 'https://www.youtube.com/embed/RZ_T4iGv8v4',
    thumbnail: 'https://i.ytimg.com/vi/RZ_T4iGv8v4/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:20 — "Dunia orang mati dan kebinasaan tak akan puas, demikianlah mata manusia tak akan puas." Dalam pesan firman hari ini, saya membagikan bahwa hawa nafsu duniawi tak pernah memberi kepuasan sejati. Hanya di dalam Kristus jiwa kita menemukan kepuasan yang penuh dan rasa cukup yang memerdekakan.',
      en: 'The verse of the day today: Proverbs 27:20 — "Death and Destruction are never satisfied, and neither are human eyes." In this message today, I share that fleshly desires can never quench the longing of the soul. Only in Christ do we discover authentic contentment and joy that liberates.',
    },
  },
  {
    id: 'pP9C9K9aiCI',
    title: 'Heart’s Mirror #understandself #grace',
    titleEn: 'Heart’s Mirror (Proverbs 27:19)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Cermin Hati & Kejujuran Diri',
    categoryEn: 'Mirror of the Heart & Self-Examination',
    url: 'https://www.youtube.com/shorts/pP9C9K9aiCI',
    embedUrl: 'https://www.youtube.com/embed/pP9C9K9aiCI',
    thumbnail: 'https://i.ytimg.com/vi/pP9C9K9aiCI/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:19 — "Seperti air mencerminkan wajah, demikianlah hati manusia mencerminkan manusia itu." Dalam pesan firman hari ini, saya mengajak kita memeriksa kondisi batin di hadapan cermin firman Allah. Apa yang keluar dari perkataan dan reaksi hidup kita adalah cerminan dari isi hati kita yang sesungguhnya.',
      en: 'The verse of the day today: Proverbs 27:19 — "As water reflects the face, so one’s life reflects the heart." In this message today, I encourage self-examination before the mirror of Scripture. Our daily speech and spontaneous reactions reveal the true condition of our inner heart.',
    },
  },
  {
    id: 'laodY6Qmx5U',
    title: 'Faithfulness Brings Reward #dependable',
    titleEn: 'Faithfulness Brings Reward (Proverbs 27:18)',
    categoryType: 'solo',
    speakerName: 'Ps. Boris Manurung',
    speakerNameEn: 'Ps. Boris Manurung',
    category: 'Kesetiaan Berbuah & Upah Ilahi',
    categoryEn: 'Fruitful Faithfulness & Godly Reward',
    url: 'https://www.youtube.com/shorts/laodY6Qmx5U',
    embedUrl: 'https://www.youtube.com/embed/laodY6Qmx5U',
    thumbnail: 'https://i.ytimg.com/vi/laodY6Qmx5U/hqdefault.jpg',
    isShort: true,
    views: 'The Verse of The Day',
    viewsEn: 'The Verse of The Day',
    uploadedAt: 'Upload Solo',
    uploadedAtEn: 'Solo Upload',
    narrative: {
      id: 'Ayat firman hari ini: Amsal 27:18 — "Siapa memelihara pohon ara akan makan buahnya, dan siapa menjaga tuannya akan dihormati." Dalam pesan firman hari ini, saya menegaskan bahwa kesetiaan dalam perkara-perkara kecil tidak akan pernah sia-sia di mata Tuhan. Siapa yang setia menabur dan merawat tugasnya dengan tulus, Tuhan sendiri yang akan mempromosikan dan memahkotainya.',
      en: 'The verse of the day today: Proverbs 27:18 — "The one who guards a fig tree will eat its fruit, and whoever protects their master will be honored." In this message today, I emphasize that quiet faithfulness in small responsibilities is never forgotten by God. Stay faithful where you are planted, and the Lord Himself will reward and honor you in His time.',
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
 * Fetch videos where Boris and his wife are together (Our Covenant Love)
 */
export async function getTogetherYouTubeVideos(): Promise<YouTubeVideoItem[]> {
  return BORIS_YOUTUBE_VIDEOS.filter((v) => v.categoryType === 'together');
}

/**
 * Fetch videos of Ps. Boris Manurung speaking alone (Verse Of The Day)
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
