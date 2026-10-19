import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 66 Books of the Protestant Bible
const BOOKS = [
  // Old Testament (39 books, 929 chapters)
  { id: 'GEN', nameEn: 'Genesis', nameId: 'Kejadian', chapters: 50, testament: 'OT', order: 1 },
  { id: 'EXO', nameEn: 'Exodus', nameId: 'Keluaran', chapters: 40, testament: 'OT', order: 2 },
  { id: 'LEV', nameEn: 'Leviticus', nameId: 'Imamat', chapters: 27, testament: 'OT', order: 3 },
  { id: 'NUM', nameEn: 'Numbers', nameId: 'Bilangan', chapters: 36, testament: 'OT', order: 4 },
  { id: 'DEU', nameEn: 'Deuteronomy', nameId: 'Ulangan', chapters: 34, testament: 'OT', order: 5 },
  { id: 'JOS', nameEn: 'Joshua', nameId: 'Yosua', chapters: 24, testament: 'OT', order: 6 },
  { id: 'JDG', nameEn: 'Judges', nameId: 'Hakim-hakim', chapters: 21, testament: 'OT', order: 7 },
  { id: 'RUT', nameEn: 'Ruth', nameId: 'Rut', chapters: 4, testament: 'OT', order: 8 },
  { id: '1SA', nameEn: '1 Samuel', nameId: '1 Samuel', chapters: 31, testament: 'OT', order: 9 },
  { id: '2SA', nameEn: '2 Samuel', nameId: '2 Samuel', chapters: 24, testament: 'OT', order: 10 },
  { id: '1KI', nameEn: '1 Kings', nameId: '1 Raja-raja', chapters: 22, testament: 'OT', order: 11 },
  { id: '2KI', nameEn: '2 Kings', nameId: '2 Raja-raja', chapters: 25, testament: 'OT', order: 12 },
  { id: '1CH', nameEn: '1 Chronicles', nameId: '1 Tawarikh', chapters: 29, testament: 'OT', order: 13 },
  { id: '2CH', nameEn: '2 Chronicles', nameId: '2 Tawarikh', chapters: 36, testament: 'OT', order: 14 },
  { id: 'EZR', nameEn: 'Ezra', nameId: 'Ezra', chapters: 10, testament: 'OT', order: 15 },
  { id: 'NEH', nameEn: 'Nehemiah', nameId: 'Nehemia', chapters: 13, testament: 'OT', order: 16 },
  { id: 'EST', nameEn: 'Esther', nameId: 'Ester', chapters: 10, testament: 'OT', order: 17 },
  { id: 'JOB', nameEn: 'Job', nameId: 'Ayub', chapters: 42, testament: 'OT', order: 18 },
  { id: 'PSA', nameEn: 'Psalms', nameId: 'Mazmur', chapters: 150, testament: 'OT', order: 19 },
  { id: 'PRO', nameEn: 'Proverbs', nameId: 'Amsal', chapters: 31, testament: 'OT', order: 20 },
  { id: 'ECC', nameEn: 'Ecclesiastes', nameId: 'Pengkhotbah', chapters: 12, testament: 'OT', order: 21 },
  { id: 'SNG', nameEn: 'Song of Solomon', nameId: 'Kidung Agung', chapters: 8, testament: 'OT', order: 22 },
  { id: 'ISA', nameEn: 'Isaiah', nameId: 'Yesaya', chapters: 66, testament: 'OT', order: 23 },
  { id: 'JER', nameEn: 'Jeremiah', nameId: 'Yeremia', chapters: 52, testament: 'OT', order: 24 },
  { id: 'LAM', nameEn: 'Lamentations', nameId: 'Ratapan', chapters: 5, testament: 'OT', order: 25 },
  { id: 'EZK', nameEn: 'Ezekiel', nameId: 'Yehezkiel', chapters: 48, testament: 'OT', order: 26 },
  { id: 'DAN', nameEn: 'Daniel', nameId: 'Daniel', chapters: 12, testament: 'OT', order: 27 },
  { id: 'HOS', nameEn: 'Hosea', nameId: 'Hosea', chapters: 14, testament: 'OT', order: 28 },
  { id: 'JOL', nameEn: 'Joel', nameId: 'Yoel', chapters: 3, testament: 'OT', order: 29 },
  { id: 'AMO', nameEn: 'Amos', nameId: 'Amos', chapters: 9, testament: 'OT', order: 30 },
  { id: 'OBA', nameEn: 'Obadiah', nameId: 'Obaja', chapters: 1, testament: 'OT', order: 31 },
  { id: 'JON', nameEn: 'Jonah', nameId: 'Yunus', chapters: 4, testament: 'OT', order: 32 },
  { id: 'MIC', nameEn: 'Micah', nameId: 'Mikha', chapters: 7, testament: 'OT', order: 33 },
  { id: 'NAM', nameEn: 'Nahum', nameId: 'Nahum', chapters: 3, testament: 'OT', order: 34 },
  { id: 'HAB', nameEn: 'Habakkuk', nameId: 'Habakuk', chapters: 3, testament: 'OT', order: 35 },
  { id: 'ZEP', nameEn: 'Zephaniah', nameId: 'Zefanya', chapters: 3, testament: 'OT', order: 36 },
  { id: 'HAG', nameEn: 'Haggai', nameId: 'Hagai', chapters: 2, testament: 'OT', order: 37 },
  { id: 'ZEC', nameEn: 'Zechariah', nameId: 'Zakharia', chapters: 14, testament: 'OT', order: 38 },
  { id: 'MAL', nameEn: 'Malachi', nameId: 'Maleakhi', chapters: 4, testament: 'OT', order: 39 },

  // New Testament (27 books, 260 chapters)
  { id: 'MAT', nameEn: 'Matthew', nameId: 'Matius', chapters: 28, testament: 'NT', order: 40 },
  { id: 'MRK', nameEn: 'Mark', nameId: 'Markus', chapters: 16, testament: 'NT', order: 41 },
  { id: 'LUK', nameEn: 'Luke', nameId: 'Lukas', chapters: 24, testament: 'NT', order: 42 },
  { id: 'JHN', nameEn: 'John', nameId: 'Yohanes', chapters: 21, testament: 'NT', order: 43 },
  { id: 'ACT', nameEn: 'Acts', nameId: 'Kisah Para Rasul', chapters: 28, testament: 'NT', order: 44 },
  { id: 'ROM', nameEn: 'Romans', nameId: 'Roma', chapters: 16, testament: 'NT', order: 45 },
  { id: '1CO', nameEn: '1 Corinthians', nameId: '1 Korintus', chapters: 16, testament: 'NT', order: 46 },
  { id: '2CO', nameEn: '2 Corinthians', nameId: '2 Korintus', chapters: 13, testament: 'NT', order: 47 },
  { id: 'GAL', nameEn: 'Galatians', nameId: 'Galatia', chapters: 6, testament: 'NT', order: 48 },
  { id: 'EPH', nameEn: 'Ephesians', nameId: 'Efesus', chapters: 6, testament: 'NT', order: 49 },
  { id: 'PHP', nameEn: 'Philippians', nameId: 'Filipi', chapters: 4, testament: 'NT', order: 50 },
  { id: 'COL', nameEn: 'Colossians', nameId: 'Kolose', chapters: 4, testament: 'NT', order: 51 },
  { id: '1TH', nameEn: '1 Thessalonians', nameId: '1 Tesalonika', chapters: 5, testament: 'NT', order: 52 },
  { id: '2TH', nameEn: '2 Thessalonians', nameId: '2 Tesalonika', chapters: 3, testament: 'NT', order: 53 },
  { id: '1TI', nameEn: '1 Timothy', nameId: '1 Timotius', chapters: 6, testament: 'NT', order: 54 },
  { id: '2TI', nameEn: '2 Timothy', nameId: '2 Timotius', chapters: 4, testament: 'NT', order: 55 },
  { id: 'TIT', nameEn: 'Titus', nameId: 'Titus', chapters: 3, testament: 'NT', order: 56 },
  { id: 'PHM', nameEn: 'Philemon', nameId: 'Filemon', chapters: 1, testament: 'NT', order: 57 },
  { id: 'HEB', nameEn: 'Hebrews', nameId: 'Ibrani', chapters: 13, testament: 'NT', order: 58 },
  { id: 'JAS', nameEn: 'James', nameId: 'Yakobus', chapters: 5, testament: 'NT', order: 59 },
  { id: '1PE', nameEn: '1 Peter', nameId: '1 Petrus', chapters: 5, testament: 'NT', order: 60 },
  { id: '2PE', nameEn: '2 Peter', nameId: '2 Petrus', chapters: 3, testament: 'NT', order: 61 },
  { id: '1JN', nameEn: '1 John', nameId: '1 Yohanes', chapters: 5, testament: 'NT', order: 62 },
  { id: '2JN', nameEn: '2 John', nameId: '2 Yohanes', chapters: 1, testament: 'NT', order: 63 },
  { id: '3JN', nameEn: '3 John', nameId: '3 Yohanes', chapters: 1, testament: 'NT', order: 64 },
  { id: 'JUD', nameEn: 'Jude', nameId: 'Yudas', chapters: 1, testament: 'NT', order: 65 },
  { id: 'REV', nameEn: 'Revelation', nameId: 'Wahyu', chapters: 22, testament: 'NT', order: 66 },
];

// Helper to create passage object
function createPassage(book, chapterStart, chapterEnd, category) {
  const count = chapterEnd - chapterStart + 1;
  const isSingle = chapterStart === chapterEnd;
  const displayRefId = isSingle ? `${book.nameId} ${chapterStart}` : `${book.nameId} ${chapterStart}–${chapterEnd}`;
  const displayRefEn = isSingle ? `${book.nameEn} ${chapterStart}` : `${book.nameEn} ${chapterStart}–${chapterEnd}`;
  const passageQueryEn = isSingle ? `${book.nameEn} ${chapterStart}` : `${book.nameEn} ${chapterStart}-${chapterEnd}`;

  return {
    bookId: book.id,
    bookNameId: book.nameId,
    bookNameEn: book.nameEn,
    chapterStart,
    chapterEnd,
    chapterCount: count,
    category,
    testament: book.testament,
    displayRefId,
    displayRefEn,
    externalUrlId: `https://alkitab.sabda.org/bible.php?book=${encodeURIComponent(book.nameId)}&chapter=${chapterStart}`,
    externalUrlEn: `https://www.biblegateway.com/passage/?search=${encodeURIComponent(passageQueryEn)}&version=ESV`,
  };
}

// 1. Prepare OT chapters list (excluding PSA and PRO)
const otBooks = BOOKS.filter((b) => b.testament === 'OT' && b.id !== 'PSA' && b.id !== 'PRO');
const otChaptersList = [];
for (const b of otBooks) {
  for (let c = 1; c <= b.chapters; c++) {
    otChaptersList.push({ book: b, chapter: c });
  }
}
console.log(`OT Chapters count (excl PSA/PRO): ${otChaptersList.length} (expected 748)`);

// 2. Prepare NT chapters list (260 chapters)
const ntBooks = BOOKS.filter((b) => b.testament === 'NT');
const ntChaptersList = [];
for (const b of ntBooks) {
  for (let c = 1; c <= b.chapters; c++) {
    ntChaptersList.push({ book: b, chapter: c });
  }
}
console.log(`NT Chapters count: ${ntChaptersList.length} (expected 260)`);

// 3. Prepare PSA chapters list (150 chapters)
const psaBook = BOOKS.find((b) => b.id === 'PSA');
const psaChaptersList = [];
for (let c = 1; c <= psaBook.chapters; c++) {
  psaChaptersList.push({ book: psaBook, chapter: c });
}

// 4. Prepare PRO chapters list (31 chapters)
const proBook = BOOKS.find((b) => b.id === 'PRO');
const proChaptersList = [];
for (let c = 1; c <= proBook.chapters; c++) {
  proChaptersList.push({ book: proBook, chapter: c });
}

// Calculate daily OT chapter allocations across 365 days
// 748 = 365 * 2 + 18 (18 days with 3 chapters, 347 days with 2 chapters)
const otDayLengths = [];
let extraDaysCount = 0;
for (let d = 0; d < 365; d++) {
  // Distribute 18 extra chapters evenly every ~20 days
  const hasExtra = (d * 18) % 365 < 18;
  const len = hasExtra ? 3 : 2;
  if (hasExtra) extraDaysCount++;
  otDayLengths.push(len);
}
console.log(`Extra days count: ${extraDaysCount} (expected 18)`);
const totalOTAllocated = otDayLengths.reduce((a, b) => a + b, 0);
console.log(`Total OT chapters allocated: ${totalOTAllocated} (expected 748)`);

// Build the 365-day plan
const plan = [];
let otCursor = 0;

for (let d = 1; d <= 365; d++) {
  const dayPassages = [];

  // A. Stream 1: Old Testament (2-3 chapters)
  const otLen = otDayLengths[d - 1];
  const otBatch = otChaptersList.slice(otCursor, otCursor + otLen);
  otCursor += otLen;

  // Group contiguous chapters of the same book
  let currentGroup = null;
  for (const item of otBatch) {
    if (!currentGroup || currentGroup.book.id !== item.book.id) {
      if (currentGroup) {
        dayPassages.push(createPassage(currentGroup.book, currentGroup.start, currentGroup.end, 'OT'));
      }
      currentGroup = { book: item.book, start: item.chapter, end: item.chapter };
    } else {
      currentGroup.end = item.chapter;
    }
  }
  if (currentGroup) {
    dayPassages.push(createPassage(currentGroup.book, currentGroup.start, currentGroup.end, 'OT'));
  }

  // B. Stream 2: New Testament (1 chapter per day, mapped across 365 days)
  const ntIndex = Math.floor(((d - 1) * 260) / 365);
  const ntItem = ntChaptersList[ntIndex];
  dayPassages.push(createPassage(ntItem.book, ntItem.chapter, ntItem.chapter, 'NT'));

  // C. Stream 3: Mazmur (Psalms, repeated 2x a year)
  // Cycle 1: Days 1-182 (182 days for 150 psalms)
  // Cycle 2: Days 183-365 (183 days for 150 psalms)
  let psaIndex;
  if (d <= 182) {
    psaIndex = Math.floor(((d - 1) * 150) / 182);
  } else {
    psaIndex = Math.floor(((d - 183) * 150) / 183);
  }
  const psaItem = psaChaptersList[psaIndex];
  dayPassages.push(createPassage(psaItem.book, psaItem.chapter, psaItem.chapter, 'PSALM'));

  // D. Stream 4: Amsal (Proverbs, repeated 4x a year)
  // Q1: Days 1-91 (91 days for 31 chapters)
  // Q2: Days 92-182 (91 days for 31 chapters)
  // Q3: Days 183-273 (91 days for 31 chapters)
  // Q4: Days 274-365 (92 days for 31 chapters)
  let proIndex;
  if (d <= 91) {
    proIndex = Math.floor(((d - 1) * 31) / 91);
  } else if (d <= 182) {
    proIndex = Math.floor(((d - 92) * 31) / 91);
  } else if (d <= 273) {
    proIndex = Math.floor(((d - 183) * 31) / 91);
  } else {
    proIndex = Math.floor(((d - 274) * 31) / 92);
  }
  const proItem = proChaptersList[proIndex];
  dayPassages.push(createPassage(proItem.book, proItem.chapter, proItem.chapter, 'PROVERB'));

  // Summary references: join each distinct stream displayRef
  const summaryRefId = dayPassages.map((p) => p.displayRefId).join('; ');
  const summaryRefEn = dayPassages.map((p) => p.displayRefEn).join('; ');
  const totalChapters = dayPassages.reduce((sum, p) => sum + p.chapterCount, 0);

  plan.push({
    day: d,
    totalChapters,
    passages: dayPassages,
    summaryRefId,
    summaryRefEn,
  });
}

// Write the output file
const outputPath = path.resolve(__dirname, '../src/data/bible-reading-plan.json');
fs.writeFileSync(outputPath, JSON.stringify(plan, null, 2), 'utf-8');
console.log(`Plan written successfully to ${outputPath}. Total days: ${plan.length}`);
