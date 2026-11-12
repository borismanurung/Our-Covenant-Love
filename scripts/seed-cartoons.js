const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Cartoon Dialogue materials into dev.db...');

  // Ensure 'komik-dialog' category exists
  let catComic = await prisma.category.findUnique({
    where: { slug: 'komik-dialog' },
  });

  if (!catComic) {
    catComic = await prisma.category.create({
      data: {
        slug: 'komik-dialog',
        nameId: 'Komik & Dialog Renungan',
        nameEn: 'Comic & Dialogue Reflections',
        descriptionId: 'Renungan dan dialog inspiratif dalam format komik visual untuk keluarga dan pernikahan.',
        descriptionEn: 'Inspiring devotionals and dialogues in visual comic strip format for marriages and families.',
      },
    });
    console.log('Category created:', catComic.slug);
  }

  const catCovenant = await prisma.category.findUnique({ where: { slug: 'covenant-marriage' } });
  const catIntimacy = await prisma.category.findUnique({ where: { slug: 'emotional-intimacy' } });

  const cartoonsData = [
    {
      slug: 'love-and-covenant-duo-yang-harus-bareng',
      categoryIds: [catComic.id, catCovenant ? catCovenant.id : null].filter(Boolean),
      author: 'Ps. Boris & Ita Manurung',
      scriptureRef: 'Pengkhotbah 4:12, Maleakhi 2:14, 1 Korintus 13:7, Efesus 5:32',
      coverImage: '/images/cartoons/love-and-covenant/1.jpg',
      images: [
        '/images/cartoons/love-and-covenant/1.jpg',
        '/images/cartoons/love-and-covenant/2.jpg',
        '/images/cartoons/love-and-covenant/3.jpg',
        '/images/cartoons/love-and-covenant/4.jpg',
      ],
      translations: {
        id: {
          title: 'Love & Covenant: Duo Yang Harus Bareng',
          excerpt: 'Banyak orang menikah karena cinta, tapi banyak juga yang stres karena cinta. Mengapa cinta saja belum tentu cukup? Simak dialog komik reflektif Boris & Ita tentang mengapa Love (gas) dan Covenant (rem & setir) harus berjalan bersama.',
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
        },
        en: {
          title: 'Love & Covenant: The Duo That Belongs Together',
          excerpt: 'Many marry for love, yet many experience deep stress in love. Why isn\'t romance alone enough? Explore Boris & Ita\'s comic dialogue on why Love (the accelerator) and Covenant (brakes & steering) must go hand-in-hand.',
          body: `Many marry for love. And... many also face deep emotional exhaustion because of love. Why? Because love can make you soar, make you weep, and make you overthink every interaction. And what few realize early on: emotional feelings of love alone are not enough to sustain a lifelong marriage.

If affection alone were enough, no spouse would ever say: *"I still love you... but I'm completely drained."*

A thriving marriage requires two inseparable pillars: **Love & Covenant**.

---

### The World\'s Definition vs God\'s Word
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
        },
      },
    },

    {
      slug: 'love-dasar-semua-aturan',
      categoryIds: [catComic.id, catCovenant ? catCovenant.id : null].filter(Boolean),
      author: 'Ps. Boris & Ita Manurung',
      scriptureRef: 'Matius 11:30, 1 Korintus 13:1-3, Galatia 5:14',
      coverImage: '/images/cartoons/love-dasar-semua-aturan/1.jpg',
      images: [
        '/images/cartoons/love-dasar-semua-aturan/1.jpg',
        '/images/cartoons/love-dasar-semua-aturan/2.jpg',
        '/images/cartoons/love-dasar-semua-aturan/3.jpg',
        '/images/cartoons/love-dasar-semua-aturan/4.jpg',
        '/images/cartoons/love-dasar-semua-aturan/5.jpg',
      ],
      translations: {
        id: {
          title: 'LOVE: Dasar Semua Aturan',
          excerpt: 'Pernikahan terasa capek bukan karena kekurangan aturan, melainkan saat kita terjebak dalam daftar \'do\'s & don\'ts\' tanpa kasih. Kasih bukan hasil dari aturan; kasih adalah dasar yang meringankan segala kuk dan beban rumah tangga.',
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
        },
        en: {
          title: 'LOVE: The Foundation of Every Rule',
          excerpt: 'Marriage feels exhausting not from a lack of rules, but when trapped under legalistic checklists without love. Love is not the byproduct of rules—it is the very foundation that makes every yoke light and joyful.',
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
        },
      },
    },

    {
      slug: 'love-dimulai-dari-allah',
      categoryIds: [catComic.id, catIntimacy ? catIntimacy.id : null].filter(Boolean),
      author: 'Ps. Boris & Ita Manurung',
      scriptureRef: '1 Yohanes 4:19, Roma 5:8, Kolose 3:13, Galatia 5:22',
      coverImage: '/images/cartoons/love-dimulai-dari-allah/1.jpg',
      images: [
        '/images/cartoons/love-dimulai-dari-allah/1.jpg',
        '/images/cartoons/love-dimulai-dari-allah/2.jpg',
        '/images/cartoons/love-dimulai-dari-allah/3.jpg',
        '/images/cartoons/love-dimulai-dari-allah/4.jpg',
        '/images/cartoons/love-dimulai-dari-allah/5.jpg',
        '/images/cartoons/love-dimulai-dari-allah/6.jpg',
      ],
      translations: {
        id: {
          title: 'LOVE: Dimulai dari Allah',
          excerpt: 'Tidak semua jenis cinta punya daya tahan untuk menopang pernikahan jangka panjang. Refleksi komik dialog Boris & Ita tentang mengapa pernikahan baru menjadi kuat dan damai saat kasih berakar dari Allah yang terlebih dahulu mengasihi kita.',
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
        },
        en: {
          title: 'LOVE: Initiated by God',
          excerpt: 'Not all forms of love possess the endurance for a lifelong covenant. In this comic dialogue, Boris & Ita reflect on why marriage only gains unshakeable strength when rooted in God, who loved us first.',
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
        },
      },
    },
  ];

  for (const item of cartoonsData) {
    // Check if content translation with slug already exists
    let existingItem = await prisma.contentItem.findFirst({
      where: {
        translations: {
          some: { slug: item.slug },
        },
      },
      include: { translations: true },
    });

    if (existingItem) {
      console.log(`Updating existing content item for slug: ${item.slug}`);
      await prisma.contentItem.update({
        where: { id: existingItem.id },
        data: {
          type: 'ARTICLE',
          status: 'PUBLISHED',
          isFeatured: true,
          author: item.author,
          seriesTitle: 'KARTUN_DIALOG',
          coverImage: item.coverImage,
          chordSheet: JSON.stringify(item.images),
          scriptureRef: item.scriptureRef,
          categories: {
            set: item.categoryIds.map(id => ({ id })),
          },
        },
      });

      // Update or create translations
      for (const loc of ['id', 'en']) {
        const transData = item.translations[loc];
        const existingTrans = existingItem.translations.find(t => t.locale === loc);
        if (existingTrans) {
          await prisma.contentTranslation.update({
            where: { id: existingTrans.id },
            data: {
              title: transData.title,
              excerpt: transData.excerpt,
              body: transData.body,
              readingTimeMinutes: item.images.length,
            },
          });
        } else {
          await prisma.contentTranslation.create({
            data: {
              contentItemId: existingItem.id,
              locale: loc,
              title: transData.title,
              slug: item.slug,
              excerpt: transData.excerpt,
              body: transData.body,
              readingTimeMinutes: item.images.length,
            },
          });
        }
      }
    } else {
      console.log(`Creating new content item for slug: ${item.slug}`);
      await prisma.contentItem.create({
        data: {
          type: 'ARTICLE',
          status: 'PUBLISHED',
          isFeatured: true,
          author: item.author,
          seriesTitle: 'KARTUN_DIALOG',
          coverImage: item.coverImage,
          chordSheet: JSON.stringify(item.images),
          scriptureRef: item.scriptureRef,
          categories: {
            connect: item.categoryIds.map(id => ({ id })),
          },
          translations: {
            create: [
              {
                locale: 'id',
                title: item.translations.id.title,
                slug: item.slug,
                excerpt: item.translations.id.excerpt,
                body: item.translations.id.body,
                readingTimeMinutes: item.images.length,
              },
              {
                locale: 'en',
                title: item.translations.en.title,
                slug: item.slug,
                excerpt: item.translations.en.excerpt,
                body: item.translations.en.body,
                readingTimeMinutes: item.images.length,
              },
            ],
          },
        },
      });
    }
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
