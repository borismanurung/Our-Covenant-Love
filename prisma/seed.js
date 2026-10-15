const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Seeding Our Covenant Love database...');

  // 1. Clean existing records for idempotent seed
  await prisma.auditLog.deleteMany({});
  await prisma.contactInquiry.deleteMany({});
  await prisma.contentTranslation.deleteMany({});
  await prisma.contentItem.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Admin User
  const adminPasswordHash = hashPassword('Covenant2026!');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ourcovenantlove.org',
      passwordHash: adminPasswordHash,
      name: 'Our Covenant Love Team',
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded: admin@ourcovenantlove.org');

  // 3. Create Categories
  const catCovenant = await prisma.category.create({
    data: {
      slug: 'covenant-marriage',
      nameId: 'Kovenan Pernikahan',
      nameEn: 'Covenant Marriage',
      descriptionId: 'Fondasi alkitabiah mengenai pernikahan sebagai kovenan kudus di hadapan Allah.',
      descriptionEn: 'Biblical foundations of marriage as a holy covenant before God.',
    },
  });

  const catIntimacy = await prisma.category.create({
    data: {
      slug: 'emotional-intimacy',
      nameId: 'Keintiman Emosional',
      nameEn: 'Emotional Intimacy',
      descriptionId: 'Membangun komunikasi yang aman, keterbukaan hati, dan pengertian timbal balik.',
      descriptionEn: 'Cultivating emotional safety, open hearts, and mutual understanding.',
    },
  });

  const catFamily = await prisma.category.create({
    data: {
      slug: 'parenting-discipleship',
      nameId: 'Pola Asuh & Pemuridan',
      nameEn: 'Parenting & Discipleship',
      descriptionId: 'Membimbing dan memuridkan generasi anak-anak untuk mengenal dan mengasihi Tuhan.',
      descriptionEn: 'Guiding and discipling the next generation to know and love God.',
    },
  });

  const catMusic = await prisma.category.create({
    data: {
      slug: 'worship-music',
      nameId: 'Pujian & Musik Orisinal',
      nameEn: 'Worship & Original Music',
      descriptionId: 'Lagu-lagu penyembahan orisinal yang lahir dari doa dan perjalanan iman keluarga.',
      descriptionEn: 'Original worship compositions birthed from prayer and family walk of faith.',
    },
  });

  // 4. Articles
  // Article 1: Covenant vs Contract
  const article1 = await prisma.contentItem.create({
    data: {
      type: 'ARTICLE',
      status: 'PUBLISHED',
      isFeatured: true,
      author: 'Our Covenant Love Team',
      scriptureRef: 'Kejadian 2:24, Maleakhi 2:14, Efesus 5:31-32',
      coverImage: '/images/infographic.png',
      categories: { connect: [{ id: catCovenant.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Pernikahan adalah Kovenan, Bukan Sekadar Kontrak',
            slug: 'pernikahan-adalah-kovenan-bukan-kontrak',
            excerpt: 'Dunia memandang pernikahan sebagai kontrak bersyarat yang bisa dibatalkan saat tidak lagi menguntungkan. Namun Allah merancangnya sebagai kovenan suci yang memancarkan kasih Kristus yang tak berkesudahan.',
            readingTimeMinutes: 5,
            body: `## Fondasi yang Tak Tergoyahkan

Di tengah budaya modern, pernikahan sering kali diperlakukan seperti kesepakatan bisnis atau kontrak hukum bersyarat: *"Aku akan mengasihimu selama engkau memenuhi kebutuhanku, membuatku bahagia, dan tidak mengecewakanku."* Ketika salah satu pihak merasa tidak lagi mendapatkan keuntungan yang diharapkan, kontrak itu dianggap boleh dibatalkan.

Namun Alkitab menyatakan kebenaran yang jauh lebih mulia: **Pernikahan adalah Kovenan (Perjanjian Kudus) di hadapan Allah.**

Dalam **Maleakhi 2:14**, firman Tuhan mengingatkan bahwa istri masa muda kita adalah *"teman sekutumu dan istrimu seperjanjian (covenant)."*

### Kontrak vs Kovenan

1. **Kontrak didasari oleh kecurigaan dan perlindungan diri.** Kovenan didasari oleh penyerahan diri dan kepercayaan penuh pada pemeliharaan Allah.
2. **Kontrak berfokus pada apa yang bisa saya dapatkan.** Kovenan berfokus pada apa yang dapat saya berikan demi mencerminkan kasih Kristus.
3. **Kontrak bersyarat (conditional).** Kovenan tidak bersyarat (unconditional)—mengikat dua orang berdosa di dalam anugerah Allah yang mengubahkan.

### Mencerminkan Kasih Kristus dan Jemaat

Rasul Paulus dalam **Efesus 5:31-32** menyebut misteri pernikahan ini sebagai cerminan hubungan Kristus dengan jemaat-Nya. Kristus tidak meninggalkan kita saat kita gagal; sebaliknya, Ia mengorbankan nyawa-Nya demi menguduskan dan memulihkan kita.

Ketika suami dan istri memilih untuk memegang teguh kovenan pernikahan mereka—bahkan di saat-saat badai, kelemahan, dan perbedaan—mereka sedang menjadi panggung berjalan yang memperlihatkan karakter Allah yang setia kepada dunia.`,
            metaTitle: 'Pernikahan adalah Kovenan, Bukan Sekadar Kontrak | Our Covenant Love',
            metaDescription: 'Pelajari perbedaan esensial antara kontrak duniawi dan kovenan ilahi dalam pernikahan Kristen.',
          },
          {
            locale: 'en',
            title: 'Marriage is a Covenant, Not Just a Contract',
            slug: 'marriage-is-a-covenant-not-a-contract',
            excerpt: 'The secular world views marriage as a conditional contract to be revoked when convenient. God designed marriage as a holy covenant reflecting Christ’s unfailing love.',
            readingTimeMinutes: 5,
            body: `## An Unshakeable Foundation

In modern society, marriage is frequently treated as a commercial agreement: *"I will love you as long as you meet my expectations, keep me fulfilled, and avoid disappointing me."* When feelings fade or conflict escalates, the contract is dissolved.

Yet Scripture reveals a far higher calling: **Marriage is a Holy Covenant before God.**

In **Malachi 2:14**, Scripture reminds us that your spouse is *"your companion and your wife by covenant."*

### Contract vs. Covenant

1. **Contracts are anchored in self-preservation.** Covenants are anchored in self-giving love and trust in God’s sovereign grace.
2. **Contracts focus on personal benefit.** Covenants focus on mutual sacrificial service for God’s glory.
3. **Contracts are conditional.** Covenants are permanent commitments between two repentant sinners held together by divine grace.

### Mirroring Christ and the Church

The Apostle Paul writes in **Ephesians 5:31-32** that Christian marriage is a living mystery displaying the covenant bond between Christ and His church. Christ never abandons His bride in her weakness; instead, He gave Himself up for her to sanctify and cherish her.

When a husband and wife honor their vows through seasons of hardship and growth, they become a living gospel—demonstrating God’s unwavering faithfulness to an watching world.`,
            metaTitle: 'Marriage is a Covenant, Not Just a Contract | Our Covenant Love',
            metaDescription: 'Discover the profound distinction between human contracts and divine covenant in Christian marriage.',
          },
        ],
      },
    },
  });

  // Article 2: Emotional Intimacy
  const article2 = await prisma.contentItem.create({
    data: {
      type: 'ARTICLE',
      status: 'PUBLISHED',
      isFeatured: false,
      author: 'Our Covenant Love Team',
      scriptureRef: 'Yakobus 1:19, 1 Korintus 13:4-7',
      coverImage: '/images/ocl-logo1.jpg',
      categories: { connect: [{ id: catIntimacy.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Membangun Keintiman Emosional di Tengah Kesibukan',
            slug: 'membangun-keintiman-emosional-di-tengah-kesibukan',
            excerpt: 'Banyak pasangan hidup serumah namun merasa seperti orang asing. Bagaimana kita memulihkan rasa aman dan percakapan hati ke hati yang sejati?',
            readingTimeMinutes: 4,
            body: `## Dari Sekadar Serumah Menuju Satu Hati

Rutinitas pekerjaan, mengurus anak, dan tekanan ekonomi sering kali mencuri waktu percakapan yang mendalam antara suami dan istri. Tanpa disadari, interaksi harian kita menyusut menjadi sekadar koordinasi logistik rumah tangga: *"Siapa yang jemput anak?", "Sudah bayar tagihan?", "Mau masak apa hari ini?"*

Keintiman emosional tidak terjadi secara otomatis hanya karena kita tidur di ranjang yang sama. Keintiman emosional membutuhkan kesengajaan (**intentionality**).

### Tiga Kunci Membangun Rasa Aman Emosional

1. **Cepat Mendengar, Lambat Berkata-kata (Yakobus 1:19)**
   Ketika pasangan menceritakan harinya atau rasa lelahnya, tahan dorongan untuk langsung memberikan solusi atau menilai. Sering kali yang ia butuhkan bukanlah kuliah pemecahan masalah, melainkan telinga yang mau memahami perasaannya.

2. **Membuat Ritual Keintiman Harian (Daily Check-in)**
   Sediakan waktu 15 menit setiap malam tanpa gawai (smartphone). Tanyakan dua pertanyaan sederhana:
   - *"Apa momen yang paling menyenangkan atau melegakan hatimu hari ini?"*
   - *"Apa beban atau kekhawatiran yang sedang engkau pikul hari ini, dan bagaimana aku bisa berdoa untukmu?"*

3. **Menciptakan Lingkungan Bebas Penghakiman**
   Pasangan kita hanya akan mau membuka luka dan kerapuhannya jika ia tahu bahwa kerapuhan tersebut tidak akan dipakai sebagai senjata untuk menyerangnya di kemudian hari. Kasih kovenan menutupi banyak sekali pelanggaran (1 Petrus 4:8).`,
            metaTitle: 'Membangun Keintiman Emosional di Tengah Kesibukan | Our Covenant Love',
            metaDescription: 'Langkah praktis membangun kembali percakapan hati ke hati dan keintiman emosional suami-istri.',
          },
          {
            locale: 'en',
            title: 'Cultivating Emotional Intimacy in the Rhythms of Daily Life',
            slug: 'cultivating-emotional-intimacy-daily-life',
            excerpt: 'Many married couples share a roof but feel like roommates. How do we rebuild emotional safety and genuine heart-to-heart attunement?',
            readingTimeMinutes: 4,
            body: `## From Roommates to Soul Companions

Work deadlines, parenting responsibilities, and financial pressures easily crowd out meaningful communication between husband and wife. Without intentional care, daily conversations degrade into operational checklists: *"Did you pick up the groceries?", "Who is picking up the children?", "Are the bills paid?"*

True emotional oneness does not happen automatically simply by cohabitation. It requires purposeful stewardship.

### Three Pillars of Emotional Safety

1. **Quick to Listen, Slow to Speak (James 1:19)**
   When your spouse expresses exhaustion or emotional weight, resist the urge to immediately offer fixes or critique. Often, what your partner needs most is not an efficiency lecture, but an empathetic presence that hears the heart.

2. **Establish a Daily 15-Minute Unplugged Check-in**
   Put away phones and digital distractions before bedtime. Ask two simple, connecting questions:
   - *"What was the most refreshing moment of your day today?"*
   - *"What burden is weighing on your mind, and how may I pray for you tonight?"*

3. **Cultivate a Zero-Contempt Sanctuary**
   Your spouse will only risk vulnerability if they know their weaknesses will not be weaponized in a future argument. Covenant love covers and heals (1 Peter 4:8).`,
            metaTitle: 'Cultivating Emotional Intimacy in Daily Life | Our Covenant Love',
            metaDescription: 'Practical biblical guidance to restore heart connection and emotional safety in your marriage.',
          },
        ],
      },
    },
  });

  // 5. Video Sermons & Teachings
  const sermon1 = await prisma.contentItem.create({
    data: {
      type: 'SERMON',
      status: 'PUBLISHED',
      isFeatured: true,
      speaker: 'Our Covenant Love Ministry',
      scriptureRef: 'Kejadian 1:26-28; Yohanes 17:20-23',
      seriesTitle: 'The Glory Between Us',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed link
      coverImage: '/images/infographic.png',
      categories: { connect: [{ id: catCovenant.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Memancarkan Gambar dan Kemuliaan Allah Melalui Keluarga',
            slug: 'memancarkan-gambar-dan-kemuliaan-allah-melalui-keluarga',
            excerpt: 'Pernikahan bukan semata-mata tentang kenyamanan pribadi, melainkan tentang penyingkapan karakter Allah Tritunggal kepada generasi dan bangsa-bangsa.',
            readingTimeMinutes: 6,
            body: `Pengajaran ini mengupas tuntas mengapa pernikahan dan keluarga adalah mahakarya Allah. 

Tuhan tidak menciptakan manusia sebagai individu yang terisolasi, melainkan *"laki-laki dan perempuan diciptakan-Nya mereka menurut gambar-Nya"* (Kejadian 1:27). Ketika suami dan istri hidup dalam kesatuan kovenan yang kudus, mereka sedang merefleksikan persekutuan kasih abadi dalam Allah Tritunggal.

Tonton khotbah lengkap ini untuk menemukan kembali panggilan sorgawi bagi rumah tangga Anda.`,
          },
          {
            locale: 'en',
            title: 'Reflecting the Image and Glory of God Through Family',
            slug: 'reflecting-image-and-glory-of-god-family',
            excerpt: 'Marriage is not primarily about self-fulfillment, but about revealing the holy character and unity of the Triune God to the world.',
            readingTimeMinutes: 6,
            body: `This teaching unpacks why marriage and family stand as God’s covenantal masterpiece.

God did not create humanity to live in isolated autonomy, but *"in the image of God He created them; male and female He created them"* (Genesis 1:27). When husband and wife walk in faithful oneness, they reflect the sacrificial love and fellowship of the Triune God.

Watch this full message to rediscover God's eternal mandate for your home.`,
          },
        ],
      },
    },
  });

  // 6. Original Music
  const song1 = await prisma.contentItem.create({
    data: {
      type: 'SONG',
      status: 'PUBLISHED',
      isFeatured: true,
      author: 'Our Covenant Love Worship',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample royalty-free audio stream
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      chordSheet: `[Bait 1]
C                 G/B
Di hadapan altar-Mu yang kudus
Am                Em
Dua hati Kau satukan dalam kasih
F            C/E
Bukan karena kuat gagah kami
Dm           G
Namun anugerah-Mu yang memimpin

[Reff]
C                G/B
Kasih kovenan-Mu tak pernah pudar
Am               Em
Menjaga janji yang telah terucap
F             C/E
Jadikan kami cerminan kemuliaan-Mu
Dm           G          C
Nyatakan karakter-Mu di dunia

[Bait 2]
C                 G/B
Saat badai dan ujian menerpa
Am                Em
Tangan-Mu yang setia menopang
F            C/E
Kami memilih saling mengampuni
Dm           G
Sebagaimana Kau ampuni kami`,
      coverImage: '/images/ocl-logo.jpg',
      categories: { connect: [{ id: catMusic.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Kasih Kovenan-Mu (Your Covenant Love)',
            slug: 'kasih-kovenan-mu',
            excerpt: 'Lagu pujian orisinal yang ditulis dari refleksi mendalam mengenai kesetiaan Allah yang memegang janji kovenan pernikahan di tengah berbagai musim kehidupan.',
            readingTimeMinutes: 3,
            lyrics: `[Bait 1]
Di hadapan altar-Mu yang kudus
Dua hati Kau satukan dalam kasih
Bukan karena kuat gagah kami
Namun anugerah-Mu yang memimpin

[Reff]
Kasih kovenan-Mu tak pernah pudar
Menjaga janji yang telah terucap
Jadikan kami cerminan kemuliaan-Mu
Nyatakan karakter-Mu di dunia

[Bait 2]
Saat badai dan ujian menerpa
Tangan-Mu yang setia menopang
Kami memilih saling mengampuni
Sebagaimana Kau ampuni kami

[Bridge]
Tak terpisahkan, oleh manusia
Apa yang telah Allah persatukan
Selamanya, bagi kemuliaan-Mu`,
            songStory: 'Lagu ini digubah dalam saat teduh perenungan perjalanan pernikahan kami. Kami menyadari bahwa cinta manusia bisa surut dan terbatas, tetapi ketika sebuah pernikahan diletakkan di atas fondasi Kovenan Allah, anugerah-Nya memampukan kita untuk terus memilih mengasihi, mengampuni, dan berjalan bersama dalam kesetiaan.',
            body: 'Sebuah lagu pujian orisinal untuk memperkaya mezbah penyembahan di rumah dan ibadah keluarga.',
          },
          {
            locale: 'en',
            title: 'Your Covenant Love',
            slug: 'your-covenant-love',
            excerpt: 'An original worship song born from personal reflection on God’s unfailing faithfulness upholding marriage vows through every season of life.',
            readingTimeMinutes: 3,
            lyrics: `[Verse 1]
Before Your holy altar, Lord
Two lives joined together by Your grace
Not by human strength or wisdom
Led by Your steadfast guiding hand

[Chorus]
Your covenant love will never fail
Guarding the sacred vows we swore
May our home reflect Your sacred glory
Making Your character known on earth

[Verse 2]
When storms and testing seasons rise
Your righteous hand upholds our stride
We choose each day to forgive and heal
Just as You first forgave our soul

[Bridge]
Let no man break what God has joined
United in Your holy name
Forevermore, to praise Your glory`,
            songStory: 'Written during personal devotional time reflecting on our family journey. Human romance can waver, but when marriage is anchored in God’s covenant, His divine grace empowers husband and wife to keep choosing forgiveness and covenant faithfulness.',
            body: 'An original song composed to encourage personal family worship and strengthen marital vows.',
          },
        ],
      },
    },
  });

  // 7. Ministry Events
  const event1 = await prisma.contentItem.create({
    data: {
      type: 'EVENT',
      status: 'PUBLISHED',
      isFeatured: true,
      eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // in 20 days
      eventEndDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      eventLocation: 'VMM Serpong & Online Hybrid Session',
      registrationUrl: 'https://forms.gle/ourcovenantlove-sample',
      coverImage: '/images/infographic.png',
      categories: { connect: [{ id: catCovenant.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Seminar Pembinaan Pasangan: The Glory Between Us',
            slug: 'seminar-pembinaan-the-glory-between-us',
            excerpt: 'Dua hari lokakarya intensif bagi pasangan suami-istri dan pranikah untuk memulihkan keintiman kovenan, komunikasi, dan visi ilahi keluarga.',
            readingTimeMinutes: 4,
            body: `### Tentang Acara Ini

Seminar **The Glory Between Us** dirancang khusus untuk membawa pasangan kembali kepada rancangan orisinal Allah atas pernikahan mereka. Melalui kombinasi pengajaran firman yang mendalam, panduan praktis (Gottman-informed communication), dan sesi refleksi doa berdua.

#### Materi yang Akan Dipelajari:
- Memahami Kovenan vs Kontrak dalam Praktik Keseharian
- Mengidentifikasi 4 Pola Komunikasi yang Merusak dan Penangkalnya
- Membangun Mezbah Doa Suami-Istri
- Date Night Challenge Pack dan Praktik Kartu Rekonsiliasi

**Biaya & Pendaftaran:**
Tempat terbatas untuk 25 pasangan demi menjaga interaksi dan kedalaman mentoring. Silakan daftar melalui tombol registrasi di bawah.`,
          },
          {
            locale: 'en',
            title: 'Couples Formation Seminar: The Glory Between Us',
            slug: 'couples-formation-seminar-glory-between-us',
            excerpt: 'A 2-day intensive workshop for married and engaged couples to renew their covenant intimacy, communication, and divine purpose.',
            readingTimeMinutes: 4,
            body: `### About This Seminar

The **The Glory Between Us** seminar is crafted to reconnect couples with God’s foundational blueprint for marriage. Blending biblical theology with practical communication frameworks and guided couple prayer moments.

#### Core Workshop Modules:
- Living the Covenant: Daily Practices That Guard Your Vows
- De-escalating Reactivity and Resolving Hidden Grievances
- Establishing the Spousal Prayer Altar
- Date Night Challenge Cards and Guided Reconciliation

**Registration & Capacity:**
Registration is limited to 25 couples to allow personalized mentoring and meaningful discussions.`,
          },
        ],
      },
    },
  });

  console.log('Database seeded successfully with rich authentic bilingual content!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
