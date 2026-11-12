const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  const existingUserCount = await prisma.user.count().catch(() => 0);
  const existingContentCount = await prisma.contentItem.count().catch(() => 0);

  if (existingUserCount > 0 && existingContentCount > 0) {
    console.log('Database already initialized and seeded. Skipping seed.');
    return;
  }

  console.log('Seeding Our Covenant Love database...');

  // 1. Clean existing records for idempotent seed
  await prisma.siteStat.deleteMany({});
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

  const catComic = await prisma.category.create({
    data: {
      slug: 'komik-dialog',
      nameId: 'Komik & Dialog Renungan',
      nameEn: 'Comic & Dialogue Reflections',
      descriptionId: 'Renungan dan dialog inspiratif dalam format komik visual untuk keluarga dan pernikahan.',
      descriptionEn: 'Inspiring devotionals and dialogues in visual comic strip format for marriages and families.',
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

  // Article 3: Comic Dialogue - Love & Covenant
  const articleComic1 = await prisma.contentItem.create({
    data: {
      type: 'ARTICLE',
      status: 'PUBLISHED',
      isFeatured: true,
      author: 'Ps. Boris & Ita Manurung',
      seriesTitle: 'KARTUN_DIALOG',
      scriptureRef: 'Pengkhotbah 4:12, Maleakhi 2:14, 1 Korintus 13:7, Efesus 5:32',
      coverImage: '/images/cartoons/love-and-covenant/1.jpg',
      chordSheet: JSON.stringify([
        '/images/cartoons/love-and-covenant/1.jpg',
        '/images/cartoons/love-and-covenant/2.jpg',
        '/images/cartoons/love-and-covenant/3.jpg',
        '/images/cartoons/love-and-covenant/4.jpg',
      ]),
      categories: { connect: [{ id: catComic.id }, { id: catCovenant.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Love & Covenant: Duo Yang Harus Bareng',
            slug: 'love-and-covenant-duo-yang-harus-bareng',
            excerpt: 'Banyak orang menikah karena cinta, tapi banyak juga yang stres karena cinta. Mengapa cinta saja belum tentu cukup? Simak dialog komik reflektif Boris & Ita tentang mengapa Love (gas) dan Covenant (rem & setir) harus berjalan bersama.',
            readingTimeMinutes: 4,
            body: `Banyak orang menikah karena cinta. Dan... banyak juga yang stres karena cinta. Mengapa demikian? Karena ternyata cinta itu bisa bikin terbang, bisa bikin nangis, dan bisa bikin salah kirim chat. Dan yang jarang disadari: cinta saja belum tentu cukup untuk menopang pernikahan seumur hidup.

Kalau cinta saja cukup, tidak akan ada pasangan yang berkata: *"Aku masih cinta sih... tapi capek."*

Pernikahan yang kokoh membutuhkan dua pilar yang berjalan berdampingan: **Love & Covenant** (Kasih & Perjanjian).

---

### Versi Dunia vs Versi Alkitab
- **Versi Dunia:** Mengartikan cinta sebagai ledakan emosi romantis—seperti di drama Korea, berjalan di bawah hujan, pegangan tangan, hingga lupa makan. Namun perasaan manusia sangat mudah berubah: hilang saat capek, drop saat lapar, dan sensitif saat kurang tidur.
- **Versi Alkitab (1 Yohanes 4:8):** *"Allah adalah kasih."* Kasih bukan sekadar perasaan temporer, melainkan karakter konsisten Allah. Kasih versi Alkitab tetap mengasihi walau disakiti, tetap memberi walau tak dibalas, dan tetap setia walau kecewa (1 Korintus 13:7).

---

### Mindset Kontrak vs Mindset Covenant
- **Mindset Kontrak (Paket Data):** *"Aku bahagia selama kamu bikin aku bahagia. Begitu sinyal hilang, paket dibatalkan!"* Kontrak berfokus pada hak pribadi dan untung-rugi.
- **Mindset Covenant (Maleakhi 2:14):** Pernikahan adalah perjanjian kudus di hadapan Allah. Covenant berfokus pada kesetiaan tanpa batas waktu, tanpa klausul *"kalau capek boleh keluar"*, dan tidak memakai masa percobaan.

---

### Duo Yang Harus Bareng: Gas & Rem
Lebih penting Love atau Covenant? Seperti bertanya: lebih penting gas atau rem mobil?
- **Love itu GAS:** Memberikan dorongan, kehangatan, dan gairah agar pernikahan hidup.
- **Covenant itu REM & SETIR:** Menjaga arah, mengendalikan laju, dan mencegah agar tidak tergelincir menabrak tebing kehancuran.
- *Tanpa Love:* Pernikahan menjadi dingin, hampa, dan sekadar rutinitas formalitas.
- *Tanpa Covenant:* Pernikahan menjadi liar, rapuh, dan mudah hancur saat badai tiba.

---

### Tali Tiga Lembar (Pengkhotbah 4:12)
*"Tali tiga lembar tidak mudah diputuskan."*
Suami, Istri, dan Allah di tengah-tengahnya. Ketika salah satu merasa lelah atau goyah, yang lain bersama Tuhan tetap memegang teguh tali perjanjian itu. Covenant bukan pagar pembatas yang mengekang, melainkan benteng pelindung cinta di masa-masa sulit.

Cinta itu dipilih setiap hari. Janji itu dijaga seumur hidup. Bersama Tuhan, kita membangun pernikahan yang tidak sekadar bertahan, tetapi bersinar memancarkan kemuliaan Kristus!`,
            metaTitle: 'Love & Covenant: Duo Yang Harus Bareng | Our Covenant Love',
            metaDescription: 'Dialog komik reflektif Boris & Ita tentang mengapa Love (gas) dan Covenant (rem & setir) harus berjalan bersama menopang pernikahan.',
          },
          {
            locale: 'en',
            title: 'Love & Covenant: The Duo That Belongs Together',
            slug: 'love-and-covenant-duo-yang-harus-bareng',
            excerpt: 'Many marry for love, yet many experience deep stress in love. Why isn\'t romance alone enough? Explore Boris & Ita\'s comic dialogue on why Love (the accelerator) and Covenant (brakes & steering) must go hand-in-hand.',
            readingTimeMinutes: 4,
            body: `Many marry for love. And... many also face deep emotional exhaustion because of love. Why? Because love can make you soar, make you weep, and make you overthink every interaction. And what few realize early on: emotional feelings of love alone are not enough to sustain a lifelong marriage.

If affection alone were enough, no spouse would ever say: *"I still love you... but I'm completely drained."*

A thriving marriage requires two inseparable pillars: **Love & Covenant**.

---

### The World's Definition vs God's Word
- **The World's View:** Love is often portrayed as romantic intoxication—hand-holding in the rain, butterflies, and emotional highs. But human emotion changes quickly: it fades when exhausted, dips when hungry, and turns irritable with lack of sleep.
- **The Biblical Revelation (1 John 4:8):** *"God is love."* Love is not a fleeting feeling; it is God's enduring character. Biblical love continues to give, forgives deeply, and remains steadfast even through disappointment (1 Corinthians 13:7).

---

### Contract Mindset vs Covenant Commitment
- **The Contract Mindset:** *"I stay as long as you make me happy. When the benefit expires, I cancel the deal."*
- **The Covenant Foundation (Malachi 2:14):** Marriage is a sacred covenant before God. It doesn't hinge on flawless daily performance, has no escape clauses for exhaustion, and requires unconditional faithfulness.

---

### The Dynamic Duo: Gas & Brakes
Is Love more important, or Covenant? That is like asking: what is more crucial in a car—the gas pedal or the steering and brakes?
- **Love is the GAS:** Providing warmth, joy, and forward motion.
- **Covenant is the STEERING & BRAKES:** Providing direction, security, and preventing reckless crashes.
- *Without Love:* Marriage turns cold, sterile, and mechanical.
- *Without Covenant:* Marriage becomes volatile and prone to sudden shipwreck.

---

### A Cord of Three Strands (Ecclesiastes 4:12)
*"A cord of three strands is not quickly broken."*
Husband, Wife, and God woven together. When one grows weary, the other holds fast through the covenant grace of God. Love is chosen every day. Covenant is guarded for a lifetime!`,
            metaTitle: 'Love & Covenant: The Duo That Belongs Together | Our Covenant Love',
            metaDescription: 'Boris & Ita\'s comic dialogue exploring why Love and Covenant are both essential for a resilient marriage.',
          },
        ],
      },
    },
  });

  // Article 4: Comic Dialogue - Love: Dasar Semua Aturan
  const articleComic2 = await prisma.contentItem.create({
    data: {
      type: 'ARTICLE',
      status: 'PUBLISHED',
      isFeatured: true,
      author: 'Ps. Boris & Ita Manurung',
      seriesTitle: 'KARTUN_DIALOG',
      scriptureRef: 'Matius 11:30, 1 Korintus 13:1-3, Galatia 5:14',
      coverImage: '/images/cartoons/love-dasar-semua-aturan/1.jpg',
      chordSheet: JSON.stringify([
        '/images/cartoons/love-dasar-semua-aturan/1.jpg',
        '/images/cartoons/love-dasar-semua-aturan/2.jpg',
        '/images/cartoons/love-dasar-semua-aturan/3.jpg',
        '/images/cartoons/love-dasar-semua-aturan/4.jpg',
        '/images/cartoons/love-dasar-semua-aturan/5.jpg',
      ]),
      categories: { connect: [{ id: catComic.id }, { id: catCovenant.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'LOVE: Dasar Semua Aturan',
            slug: 'love-dasar-semua-aturan',
            excerpt: 'Pernikahan terasa capek bukan karena kekurangan aturan, melainkan saat kita terjebak dalam daftar \'do\'s & don\'ts\' tanpa kasih. Kasih bukan hasil dari aturan; kasih adalah dasar yang meringankan segala kuk dan beban rumah tangga.',
            readingTimeMinutes: 5,
            body: `Pernahkah pernikahan Anda terasa... capek? Bukan capek karena lelah bekerja di kantor, melainkan capek mengikuti begitu banyak aturan: *"Boleh ini, tidak boleh itu. Harus begini, jangan begitu."*

Padahal pernikahan Kristen tidak dimulai dengan daftar buku peraturan *(rulebook)* yang membebani. Pernikahan dimulai dengan kasih karunia dan jatuh cinta.

Tuhan Yesus sendiri mengingatkan dalam **Matius 11:30**:
> *"Sebab kuk yang Kupasang itu enak dan beban-Ku pun ringan."*

Lalu mengapa hubungan suami istri kerap terasa seperti medan kepatuhan hukum yang melelahkan? Karena seringkali kita membalik urutannya: kita mengira aturan akan menghasilkan kasih, padahal sesungguhnya **Kasih adalah dasar dari semua aturan**.

---

### 1. Allah Tidak Memulai dengan Aturan, Tetapi Kasih
Allah menciptakan Taman Eden dan menempatkan manusia di dalamnya dengan limpahan kasih dan persekutuan yang intim, sebelum memberikan satu instruksi.
Bahkan ketika memberikan Sepuluh Hukum Taurat, Allah mengawalinya dengan pernyataan: *"Akulah TUHAN, Allahmu, yang membawa engkau keluar dari tanah Mesir, dari tempat perbudakan."* (Keluaran 20:2). Allah memerdekakan dan mengasihi kita terlebih dahulu, baru kemudian memberikan panduan hidup.

---

### 2. Aturan Tanpa Kasih = Beban Melelahkan (Legalisme)
Ketika suami atau istri menuntut pasangannya hanya berdasarkan aturan:
- Hubungan berubah menjadi pengadilan rumah tangga.
- Muncul kepura-puraan dan rasa tertekan.
- Komunikasi dipenuhi kritik dan saling menyalahkan.

Rasul Paulus menegaskan dalam **1 Korintus 13:1-3**: Sekalipun kita melakukan segala kewajiban rohani dan memenuhi segala standar etika, jika kita tidak mempunyai kasih, semuanya itu sia-sia dan sama sekali tidak berguna.

---

### 3. Kasih Membuat Ketaatan Terasa Manis dan Ringan
Ketika kasih Kristus melandasi hati kita:
- Membantu pasangan bukan lagi karena paksaan *"kewajiban suami/istri"*, melainkan kerinduan memberkati.
- Mengampuni bukan karena *"harus patuh aturan"*, melainkan karena hati kita telah lebih dulu dipenuhi pengampunan Tuhan.
- Batasan moral dan kesetiaan bukan pagar penjara, melainkan pelindung keintiman yang kita jaga dengan sukacita.

Kembalikan kasih ke tempat yang terutama. Bukan aturan yang melahirkan cinta, melainkan kasih karunia Kristus yang memampukan kita hidup rukun, saling menghormati, dan saling melayani dengan hati yang tulus!`,
            metaTitle: 'LOVE: Dasar Semua Aturan | Our Covenant Love',
            metaDescription: 'Dialog komik Boris & Ita tentang mengapa kasih harus menjadi dasar dari semua aturan dalam pernikahan.',
          },
          {
            locale: 'en',
            title: 'LOVE: The Foundation of Every Rule',
            slug: 'love-dasar-semua-aturan',
            excerpt: 'Marriage feels exhausting not from a lack of rules, but when trapped under legalistic checklists without love. Love is not the byproduct of rules—it is the very foundation that makes every yoke light and joyful.',
            readingTimeMinutes: 5,
            body: `Have you ever felt marriage becoming deeply exhausting? Not from the physical strain of your daily career, but from maintaining endless relational checklists: *"Do this, don't do that. Must be like this, never like that."*

A godly marriage was never intended to operate like a bureaucratic rulebook. It began with grace, mutual covenant, and sacrificial love.

Jesus reminds us in **Matthew 11:30**:
> *"For my yoke is easy and my burden is light."*

Why do marriages so often feel like an exhausting legalistic trial? Because couples often reverse God's order: we assume rules will produce love, when in truth, **Love is the foundation of every rule**.

---

### 1. God Never Began with Regulations, But with Relational Love
In the Garden of Eden, God walked with humanity in intimate friendship before giving commands. Even before delivering the Ten Commandments, God reminded Israel: *"I am the LORD your God, who brought you out of Egypt, out of the land of slavery."* (Exodus 20:2). He redeemed them first in love, then guided them with His wisdom.

---

### 2. Rules Without Love Create Resentment and Legalism
When spouses interact purely through performance expectations and rigid standards:
- The home resembles a courtroom rather than a sanctuary of grace.
- Resentment, pretension, and emotional disconnection take root.
- Communication degenerates into continuous fault-finding.

As the Apostle Paul wrote in **1 Corinthians 13:1-3**: Even if we perform all external duties flawlessly, without genuine love, we gain nothing.

---

### 3. Love Transforms Duty Into Delight
When Christ's love anchors our hearts:
- Serving your spouse is no longer a grudging chore, but a joy.
- Forgiveness flows freely because we remember how generously Christ forgave us.
- Moral boundaries and fidelity are not suffocating restrictions, but joyful protections of our sacred intimacy.

Restore love to first place. Rules never generate love; it is Christ's unfailing love that empowers a joyful, enduring home!`,
            metaTitle: 'LOVE: The Foundation of Every Rule | Our Covenant Love',
            metaDescription: 'A comic reflection on how marriages thrive when rules are rooted in genuine Christ-like love.',
          },
        ],
      },
    },
  });

  // Article 5: Comic Dialogue - Love: Dimulai dari Allah
  const articleComic3 = await prisma.contentItem.create({
    data: {
      type: 'ARTICLE',
      status: 'PUBLISHED',
      isFeatured: true,
      author: 'Ps. Boris & Ita Manurung',
      seriesTitle: 'KARTUN_DIALOG',
      scriptureRef: '1 Yohanes 4:19, Roma 5:8, Kolose 3:13, Galatia 5:22',
      coverImage: '/images/cartoons/love-dimulai-dari-allah/1.jpg',
      chordSheet: JSON.stringify([
        '/images/cartoons/love-dimulai-dari-allah/1.jpg',
        '/images/cartoons/love-dimulai-dari-allah/2.jpg',
        '/images/cartoons/love-dimulai-dari-allah/3.jpg',
        '/images/cartoons/love-dimulai-dari-allah/4.jpg',
        '/images/cartoons/love-dimulai-dari-allah/5.jpg',
        '/images/cartoons/love-dimulai-dari-allah/6.jpg',
      ]),
      categories: { connect: [{ id: catComic.id }, { id: catIntimacy.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'LOVE: Dimulai dari Allah',
            slug: 'love-dimulai-dari-allah',
            excerpt: 'Tidak semua jenis cinta punya daya tahan untuk menopang pernikahan jangka panjang. Refleksi komik dialog Boris & Ita tentang mengapa pernikahan baru menjadi kuat dan damai saat kasih berakar dari Allah yang terlebih dahulu mengasihi kita.',
            readingTimeMinutes: 6,
            body: `Semua orang membicarakan cinta. Lagu-lagu bernyanyi tentang cinta, film-film laris mengisahkan cinta, dan janji suci di altar diucapkan atas nama cinta. Namun sebuah pertanyaan penting yang perlu kita renungkan: **Cinta yang mana?**

Tidak semua cinta manusiawi memiliki daya tahan untuk menopang bahtera pernikahan menghadapi badai, kekecewaan, dan rutinitas puluhan tahun.

Pernikahan menjadi kuat bukan karena cinta dimulai dari kapasitas emosi manusia, melainkan karena **Kasih Dimulai dari Allah**.

**1 Yohanes 4:19**:
> *"Kita mengasihi, karena Allah lebih dahulu mengasihi kita."*

---

### 1. Mengapa Cinta Manusia Cepat Lelah?
Cinta manusia kerap bersyarat: *"Aku mengasihimu selama kamu menghargaiku, memperlakukanku dengan baik, dan memenuhi ekspektasiku."*
Ketika pasangan lelah, salah berucap, atau gagal memenuhi harapan, tangki cinta manusiawi menjadi kering. Akibatnya rumah tangga dipenuhi dinginnya keheningan atau panasnya pertengkaran.

---

### 2. Inisiatif Kasih Allah yang Mengubah Segalanya
Hal paling agung dari kasih Allah adalah: **Dia yang berinisiatif memulai lebih dulu**.
Allah tidak menunggu kita menjadi sempurna baru mengasihi kita. Sebagaimana tertulis dalam **Roma 5:8**:
> *"Akan tetapi Allah menunjukkan kasih-Nya kepada kita, oleh karena Kristus telah mati untuk kita, ketika kita masih berdosa."*

Dalam pernikahan kovenan, ketika kita terhubung dengan sumber kasih ilahi:
- Kita tidak lagi menunggu pasangan berbuat manis baru kita bersikap ramah.
- Kita berani mengambil langkah pertama untuk menyapa, meminta maaf, dan memeluk.
- Kita menjadi penyalur kasih Kristus, bukan penagih hak pribadi.

---

### 3. Kasih yang Berani Mengampuni dan Berkorban
Kasih Allah di kayu salib adalah kasih yang membayar harga. Mengampuni pasangan bukan berarti menyetujui kesalahan, melainkan melepaskan hak untuk menghukum demi membuka jalan pemulihan.
Sebagaimana firman Tuhan dalam **Kolose 3:13**:
> *"Sabarlah kamu seorang terhadap yang lain, dan ampunilah seorang akan yang lain apabila yang seorang menaruh dendam terhadap yang lain; sama seperti Tuhan telah mengampuni kamu, kamu perbuat jugalah demikian."*

---

### 4. Menjadikan Rumah Tangga Sumber Damai dan Keceriaan
Damai dan keceriaan dalam pernikahan bukan sekadar hasil teknik komunikasi psikologis, melainkan buah dari Roh Kudus yang bekerja di hati kita (Galatia 5:22). Ketika Allah menjadi mata air kasih yang tak pernah kering, pernikahan kita tidak akan lagi bergantung pada suasana hati manusia, melainkan teguh berakar dalam anugerah-Nya!`,
            metaTitle: 'LOVE: Dimulai dari Allah | Our Covenant Love',
            metaDescription: 'Refleksi komik dialog mengapa kasih dalam pernikahan baru dapat bertahan kokoh saat bersumber dari Allah yang terlebih dahulu mengasihi kita.',
          },
          {
            locale: 'en',
            title: 'LOVE: Initiated by God',
            slug: 'love-dimulai-dari-allah',
            excerpt: 'Not all forms of love possess the endurance for a lifelong covenant. In this comic dialogue, Boris & Ita reflect on why marriage only gains unshakeable strength when rooted in God, who loved us first.',
            readingTimeMinutes: 6,
            body: `Everyone talks about love. Songs serenade love, cinema celebrates love, and vows are proclaimed in love's name. Yet an essential question remains: **Which love are we depending upon?**

Natural human affection lacks the spiritual endurance to sustain a covenant through decades of unforeseen storms, physical exhaustion, and human flaws.

A Christian marriage endures not because affection began with human strength, but because **Love Began with God**.

**1 John 4:19**:
> *"We love because He first loved us."*

---

### 1. Why Human Romance Runs Dry
Human love often remains conditional: *"I will treasure you as long as you meet my desires, affirm my worth, and don't disappoint me."*
When fatigue sets in, careless words are exchanged, or expectations are shattered, human emotional wells quickly run empty.

---

### 2. God's Initiating Grace Changes Everything
The defining glory of God's love is this: **He takes the initiative**.
God did not wait for humanity to achieve righteousness before offering His redemption:
> *"God demonstrates His own love for us in this: While we were still sinners, Christ died for us."* (Romans 5:8).

When anchored in Christ's initiating love:
- We don't wait for our spouse to change before extending gentleness.
- We have the courage to take the first step toward reconciliation, forgiveness, and healing.
- We become conduits of Christ's unconditional mercy rather than debt collectors.

---

### 3. Love That Sacrifices and Restores
Forgiving in marriage does not minimize wrongdoing; it releases vengeance into God's hands to pave the way for true restoration.
As Paul wrote in **Colossians 3:13**:
> *"Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."*

---

### 4. A Sanctuary of Peace and Joy
Peace and genuine joy in your home are not merely the products of behavioral techniques; they are the fruit of the Holy Spirit (Galatians 5:22). When God is the living fountain of your home, your covenant no longer swings with human moods, but stands secure upon His unfailing grace!`,
            metaTitle: 'LOVE: Initiated by God | Our Covenant Love',
            metaDescription: 'Reflecting on why marriage only gains enduring strength when rooted in God, who loved us first.',
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
      videoUrl: 'https://www.youtube.com/embed/7vAGf2R9Yyc', // Placeholder embed link
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
      author: 'Boris Manurung',
      audioUrl: '/audio/good-guy.mp3',
      videoUrl: 'https://www.youtube.com/embed/7vAGf2R9Yyc',
      coverImage: '/images/good-guy-cover.jpg',
      categories: { connect: [{ id: catMusic.id }] },
      translations: {
        create: [
          {
            locale: 'id',
            title: 'Good Guy (by Boris Manurung)',
            slug: 'good-guy',
            excerpt: 'Karya musik orisinal "Good Guy" yang digubah oleh Boris Manurung menceritakan tentang kasih pengorbanan Kristus bagi kita.',
            readingTimeMinutes: 3,
            lyrics: `[Verse 1]
I heard a lot of people talking about the movies
They said it's a shame that the good guy has to die
And it would have been nice if only the bad guys had died
But I'm telling you friend that this good guy has died for the bad guys

[Chorus 1]
The movie started where there were many unbelievers
And there were more and more bad guys
Listening to what they're saying you wish they never exist
Seeing what they're doing you are hoping they perish
You know what you're talking, what you're thinking, what you're wishing, what you're hoping
We are the bad guys

[Chorus]
You and I were the one who made the mess
You and I were the one who set the cross
We are the reason why this good guy left his place
You and I were the one who drove them nails
We're the ones who should have taken the blame
He loves us, he really do care, as he came down, coming down here

[Chorus 2]
The movie started where there were many unbelievers
And there were more and more bad guys
Listening to what they're saying you wish they never exist
Seeing what they're doing you are hoping they perish
You know what you're talking, what you're thinking, what you're wishing, what you're hoping
We are the bad guys

You and I were the one who made the mess
You and I were the one who set the cross
We are the reason why this good guy left his place
You and I were the one who drove them nails
We're the ones who should have taken the blame
He loves us, he really do care, as he came down, coming down here

[Outro]
I can only give him thanks
I can only praise his name
I will follow and obey
From now on until the end

You and I were the one who made the mess
You and I were the one who set the cross
We are the reason why this good guy left his place
You and I were the one who drove them nails
We're the one who should have taken the blame
He loves us, he really do care, and he came down, coming down here
Coming down here
Coming down here`,
            songStory: 'Lagu "Good Guy" merefleksikan kebenaran injil yang mendalam: Kristus, Sang Pribadi yang Benar, rela mati menggantikan kita orang-orang berdosa.',
            body: 'Sebuah karya musik orisinal dari Boris Manurung untuk memperkaya mezbah penyembahan dan refleksi rohani.',
          },
          {
            locale: 'en',
            title: 'Good Guy (by Boris Manurung)',
            slug: 'good-guy',
            excerpt: 'An original musical work composed by Boris Manurung depicting the sacrificial love of Christ for humanity.',
            readingTimeMinutes: 3,
            lyrics: `[Verse 1]
I heard a lot of people talking about the movies
They said it's a shame that the good guy has to die
And it would have been nice if only the bad guys had died
But I'm telling you friend that this good guy has died for the bad guys

[Chorus 1]
The movie started where there were many unbelievers
And there were more and more bad guys
Listening to what they're saying you wish they never exist
Seeing what they're doing you are hoping they perish
You know what you're talking, what you're thinking, what you're wishing, what you're hoping
We are the bad guys

[Chorus]
You and I were the one who made the mess
You and I were the one who set the cross
We are the reason why this good guy left his place
You and I were the one who drove them nails
We're the ones who should have taken the blame
He loves us, he really do care, as he came down, coming down here

[Chorus 2]
The movie started where there were many unbelievers
And there were more and more bad guys
Listening to what they're saying you wish they never exist
Seeing what they're doing you are hoping they perish
You know what you're talking, what you're thinking, what you're wishing, what you're hoping
We are the bad guys

You and I were the one who made the mess
You and I were the one who set the cross
We are the reason why this good guy left his place
You and I were the one who drove them nails
We're the ones who should have taken the blame
He loves us, he really do care, as he came down, coming down here

[Outro]
I can only give him thanks
I can only praise his name
I will follow and obey
From now on until the end

You and I were the one who made the mess
You and I were the one who set the cross
We are the reason why this good guy left his place
You and I were the one who drove them nails
We're the one who should have taken the blame
He loves us, he really do care, and he came down, coming down here
Coming down here
Coming down here`,
            songStory: 'The song "Good Guy" reflects on the profound truth of the Gospel: Christ, the true Good Guy, died to redeem and restore the broken.',
            body: 'An original musical composition by Boris Manurung to encourage personal devotion and worship.',
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

  // 9. Initialize Site Stats
  await prisma.siteStat.createMany({
    data: [
      { key: 'unique_visitors', value: 0 },
      { key: 'total_visits', value: 0 },
      { key: 'page_views', value: 0 },
    ],
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
