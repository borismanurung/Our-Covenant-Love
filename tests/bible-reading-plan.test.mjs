import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load reading plan and books metadata
const planPath = path.resolve(__dirname, '../src/data/bible-reading-plan.json');
const plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));

// Canonical 66 Books of the Protestant Bible
const EXPECTED_BOOKS = [
  { id: 'GEN', nameEn: 'Genesis', chapters: 50, testament: 'OT' },
  { id: 'EXO', nameEn: 'Exodus', chapters: 40, testament: 'OT' },
  { id: 'LEV', nameEn: 'Leviticus', chapters: 27, testament: 'OT' },
  { id: 'NUM', nameEn: 'Numbers', chapters: 36, testament: 'OT' },
  { id: 'DEU', nameEn: 'Deuteronomy', chapters: 34, testament: 'OT' },
  { id: 'JOS', nameEn: 'Joshua', chapters: 24, testament: 'OT' },
  { id: 'JDG', nameEn: 'Judges', chapters: 21, testament: 'OT' },
  { id: 'RUT', nameEn: 'Ruth', chapters: 4, testament: 'OT' },
  { id: '1SA', nameEn: '1 Samuel', chapters: 31, testament: 'OT' },
  { id: '2SA', nameEn: '2 Samuel', chapters: 24, testament: 'OT' },
  { id: '1KI', nameEn: '1 Kings', chapters: 22, testament: 'OT' },
  { id: '2KI', nameEn: '2 Kings', chapters: 25, testament: 'OT' },
  { id: '1CH', nameEn: '1 Chronicles', chapters: 29, testament: 'OT' },
  { id: '2CH', nameEn: '2 Chronicles', chapters: 36, testament: 'OT' },
  { id: 'EZR', nameEn: 'Ezra', chapters: 10, testament: 'OT' },
  { id: 'NEH', nameEn: 'Nehemiah', chapters: 13, testament: 'OT' },
  { id: 'EST', nameEn: 'Esther', chapters: 10, testament: 'OT' },
  { id: 'JOB', nameEn: 'Job', chapters: 42, testament: 'OT' },
  { id: 'PSA', nameEn: 'Psalms', chapters: 150, testament: 'OT' },
  { id: 'PRO', nameEn: 'Proverbs', chapters: 31, testament: 'OT' },
  { id: 'ECC', nameEn: 'Ecclesiastes', chapters: 12, testament: 'OT' },
  { id: 'SNG', nameEn: 'Song of Solomon', chapters: 8, testament: 'OT' },
  { id: 'ISA', nameEn: 'Isaiah', chapters: 66, testament: 'OT' },
  { id: 'JER', nameEn: 'Jeremiah', chapters: 52, testament: 'OT' },
  { id: 'LAM', nameEn: 'Lamentations', chapters: 5, testament: 'OT' },
  { id: 'EZK', nameEn: 'Ezekiel', chapters: 48, testament: 'OT' },
  { id: 'DAN', nameEn: 'Daniel', chapters: 12, testament: 'OT' },
  { id: 'HOS', nameEn: 'Hosea', chapters: 14, testament: 'OT' },
  { id: 'JOL', nameEn: 'Joel', chapters: 3, testament: 'OT' },
  { id: 'AMO', nameEn: 'Amos', chapters: 9, testament: 'OT' },
  { id: 'OBA', nameEn: 'Obadiah', chapters: 1, testament: 'OT' },
  { id: 'JON', nameEn: 'Jonah', chapters: 4, testament: 'OT' },
  { id: 'MIC', nameEn: 'Micah', chapters: 7, testament: 'OT' },
  { id: 'NAM', nameEn: 'Nahum', chapters: 3, testament: 'OT' },
  { id: 'HAB', nameEn: 'Habakkuk', chapters: 3, testament: 'OT' },
  { id: 'ZEP', nameEn: 'Zephaniah', chapters: 3, testament: 'OT' },
  { id: 'HAG', nameEn: 'Haggai', chapters: 2, testament: 'OT' },
  { id: 'ZEC', nameEn: 'Zechariah', chapters: 14, testament: 'OT' },
  { id: 'MAL', nameEn: 'Malachi', chapters: 4, testament: 'OT' },
  { id: 'MAT', nameEn: 'Matthew', chapters: 28, testament: 'NT' },
  { id: 'MRK', nameEn: 'Mark', chapters: 16, testament: 'NT' },
  { id: 'LUK', nameEn: 'Luke', chapters: 24, testament: 'NT' },
  { id: 'JHN', nameEn: 'John', chapters: 21, testament: 'NT' },
  { id: 'ACT', nameEn: 'Acts', chapters: 28, testament: 'NT' },
  { id: 'ROM', nameEn: 'Romans', chapters: 16, testament: 'NT' },
  { id: '1CO', nameEn: '1 Corinthians', chapters: 16, testament: 'NT' },
  { id: '2CO', nameEn: '2 Corinthians', chapters: 13, testament: 'NT' },
  { id: 'GAL', nameEn: 'Galatians', chapters: 6, testament: 'NT' },
  { id: 'EPH', nameEn: 'Ephesians', chapters: 6, testament: 'NT' },
  { id: 'PHP', nameEn: 'Philippians', chapters: 4, testament: 'NT' },
  { id: 'COL', nameEn: 'Colossians', chapters: 4, testament: 'NT' },
  { id: '1TH', nameEn: '1 Thessalonians', chapters: 5, testament: 'NT' },
  { id: '2TH', nameEn: '2 Thessalonians', chapters: 3, testament: 'NT' },
  { id: '1TI', nameEn: '1 Timothy', chapters: 6, testament: 'NT' },
  { id: '2TI', nameEn: '2 Timothy', chapters: 4, testament: 'NT' },
  { id: 'TIT', nameEn: 'Titus', chapters: 3, testament: 'NT' },
  { id: 'PHM', nameEn: 'Philemon', chapters: 1, testament: 'NT' },
  { id: 'HEB', nameEn: 'Hebrews', chapters: 13, testament: 'NT' },
  { id: 'JAS', nameEn: 'James', chapters: 5, testament: 'NT' },
  { id: '1PE', nameEn: '1 Peter', chapters: 5, testament: 'NT' },
  { id: '2PE', nameEn: '2 Peter', chapters: 3, testament: 'NT' },
  { id: '1JN', nameEn: '1 John', chapters: 5, testament: 'NT' },
  { id: '2JN', nameEn: '2 John', chapters: 1, testament: 'NT' },
  { id: '3JN', nameEn: '3 John', chapters: 1, testament: 'NT' },
  { id: 'JUD', nameEn: 'Jude', chapters: 1, testament: 'NT' },
  { id: 'REV', nameEn: 'Revelation', chapters: 22, testament: 'NT' },
];

// Helper: Calculate day number for target date given start date
function getDayForDate(targetDate, planStartDate) {
  const start = new Date(planStartDate.getFullYear(), planStartDate.getMonth(), planStartDate.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffMs = target.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return ((diffDays % 365) + 365) % 365 + 1;
}

// Helper: Calculate progress statistics
function calculateProgress(completedDays) {
  const unique = new Set(completedDays.filter((d) => typeof d === 'number' && d >= 1 && d <= 365));
  const completedCount = unique.size;
  const totalDays = 365;
  const remainingDays = Math.max(0, totalDays - completedCount);
  const percentage = Math.round((completedCount / totalDays) * 1000) / 10;
  return { completedDays: completedCount, totalDays, remainingDays, percentage };
}

// 1. Quality Check 1: All 66 books and expected chapters are represented
test('Quality Check 1: All 66 canonical books are represented with correct chapter counts', () => {
  assert.strictEqual(EXPECTED_BOOKS.length, 66, 'Must have exactly 66 books');
  
  const totalExpectedChapters = EXPECTED_BOOKS.reduce((sum, b) => sum + b.chapters, 0);
  assert.strictEqual(totalExpectedChapters, 1189, 'Total canonical chapters must be 1189');

  const otBooks = EXPECTED_BOOKS.filter((b) => b.testament === 'OT');
  assert.strictEqual(otBooks.length, 39, 'Old Testament must have 39 books');
  assert.strictEqual(otBooks.reduce((sum, b) => sum + b.chapters, 0), 929, 'OT must have 929 chapters');

  const ntBooks = EXPECTED_BOOKS.filter((b) => b.testament === 'NT');
  assert.strictEqual(ntBooks.length, 27, 'New Testament must have 27 books');
  assert.strictEqual(ntBooks.reduce((sum, b) => sum + b.chapters, 0), 260, 'NT must have 260 chapters');
});

// 2. Quality Check 2: 4 Streams Coverage (OT 748 ch, NT 260 ch, Psalms 2x, Proverbs 4x)
test('Quality Check 2: 4 distinct streams with full canonical coverage, Psalms 2x, and Proverbs 4x', () => {
  const otChaptersSeen = new Map();
  const ntChaptersSeen = new Map();
  const psalmsCycle1 = new Set();
  const psalmsCycle2 = new Set();
  const proverbsQ1 = new Set();
  const proverbsQ2 = new Set();
  const proverbsQ3 = new Set();
  const proverbsQ4 = new Set();
  const booksSeen = new Set();

  for (const day of plan) {
    const categoriesOnDay = new Set();

    for (const passage of day.passages) {
      assert.ok(passage.bookId, `Day ${day.day} passage must have bookId`);
      assert.ok(passage.chapterStart >= 1, `Day ${day.day} chapterStart must be >= 1`);
      assert.ok(passage.chapterEnd >= passage.chapterStart, `Day ${day.day} chapterEnd must be >= chapterStart`);
      booksSeen.add(passage.bookId);
      categoriesOnDay.add(passage.category);

      for (let ch = passage.chapterStart; ch <= passage.chapterEnd; ch++) {
        const key = `${passage.bookId}:${ch}`;

        if (passage.category === 'OT') {
          assert.strictEqual(otChaptersSeen.has(key), false, `OT Duplicate detected: ${key} on day ${day.day}`);
          otChaptersSeen.set(key, 1);
        } else if (passage.category === 'NT') {
          ntChaptersSeen.set(key, (ntChaptersSeen.get(key) || 0) + 1);
        } else if (passage.category === 'PSALM') {
          if (day.day <= 182) {
            psalmsCycle1.add(ch);
          } else {
            psalmsCycle2.add(ch);
          }
        } else if (passage.category === 'PROVERB') {
          if (day.day <= 91) {
            proverbsQ1.add(ch);
          } else if (day.day <= 182) {
            proverbsQ2.add(ch);
          } else if (day.day <= 273) {
            proverbsQ3.add(ch);
          } else {
            proverbsQ4.add(ch);
          }
        }
      }
    }

    // Every day must have all 4 streams present
    assert.ok(categoriesOnDay.has('OT'), `Day ${day.day} missing OT stream`);
    assert.ok(categoriesOnDay.has('NT'), `Day ${day.day} missing NT stream`);
    assert.ok(categoriesOnDay.has('PSALM'), `Day ${day.day} missing PSALM stream`);
    assert.ok(categoriesOnDay.has('PROVERB'), `Day ${day.day} missing PROVERB stream`);
  }

  // A. All 66 canonical books represented
  assert.strictEqual(booksSeen.size, 66, 'All 66 books must be represented in the plan');

  // B. OT (excl PSA/PRO): Exactly 37 books and 748 chapters with zero omissions
  const otExpected = EXPECTED_BOOKS.filter((b) => b.testament === 'OT' && b.id !== 'PSA' && b.id !== 'PRO');
  assert.strictEqual(otExpected.length, 37, 'OT excluding PSA/PRO must have 37 books');
  assert.strictEqual(otChaptersSeen.size, 748, 'OT must cover exactly 748 chapters');
  for (const b of otExpected) {
    for (let ch = 1; ch <= b.chapters; ch++) {
      const key = `${b.id}:${ch}`;
      assert.ok(otChaptersSeen.has(key), `Missing OT chapter: ${key}`);
    }
  }

  // C. NT: All 27 books and 260 chapters covered
  const ntExpected = EXPECTED_BOOKS.filter((b) => b.testament === 'NT');
  assert.strictEqual(ntChaptersSeen.size, 260, 'NT must cover all 260 chapters');
  for (const b of ntExpected) {
    for (let ch = 1; ch <= b.chapters; ch++) {
      const key = `${b.id}:${ch}`;
      assert.ok(ntChaptersSeen.has(key), `Missing NT chapter: ${key}`);
    }
  }

  // D. Psalms: Exactly 2 complete cycles of 150 chapters
  assert.strictEqual(psalmsCycle1.size, 150, 'Psalms Cycle 1 (Days 1-182) must cover all 150 chapters');
  assert.strictEqual(psalmsCycle2.size, 150, 'Psalms Cycle 2 (Days 183-365) must cover all 150 chapters');

  // E. Proverbs: Exactly 4 complete cycles of 31 chapters
  assert.strictEqual(proverbsQ1.size, 31, 'Proverbs Q1 (Days 1-91) must cover all 31 chapters');
  assert.strictEqual(proverbsQ2.size, 31, 'Proverbs Q2 (Days 92-182) must cover all 31 chapters');
  assert.strictEqual(proverbsQ3.size, 31, 'Proverbs Q3 (Days 183-273) must cover all 31 chapters');
  assert.strictEqual(proverbsQ4.size, 31, 'Proverbs Q4 (Days 274-365) must cover all 31 chapters');
});

// 3. Quality Check 3: Exactly 365 reading days for the plan
test('Quality Check 3: Exactly 365 reading days with manageable daily reading loads', () => {
  assert.strictEqual(plan.length, 365, 'Must have exactly 365 days');

  for (let i = 0; i < plan.length; i++) {
    const day = plan[i];
    assert.strictEqual(day.day, i + 1, `Day number must match index + 1 (day ${day.day})`);
    assert.ok(day.passages.length >= 4, `Day ${day.day} must have at least 4 passages (4 streams)`);
    assert.ok(day.totalChapters >= 5 && day.totalChapters <= 6, `Day ${day.day} has ${day.totalChapters} chapters (expected 5-6)`);
    assert.ok(day.summaryRefId, `Day ${day.day} must have Indonesian summary reference`);
    assert.ok(day.summaryRefEn, `Day ${day.day} must have English summary reference`);
  }
});

// 4. Quality Check 4: Progress percentages are calculated correctly
test('Quality Check 4: Progress statistics and percentage calculations', () => {
  const p0 = calculateProgress([]);
  assert.strictEqual(p0.completedDays, 0);
  assert.strictEqual(p0.totalDays, 365);
  assert.strictEqual(p0.remainingDays, 365);
  assert.strictEqual(p0.percentage, 0);

  const pHalf = calculateProgress(Array.from({ length: 182 }, (_, i) => i + 1));
  assert.strictEqual(pHalf.completedDays, 182);
  assert.strictEqual(pHalf.remainingDays, 183);
  assert.strictEqual(pHalf.percentage, 49.9);

  const pFull = calculateProgress(Array.from({ length: 365 }, (_, i) => i + 1));
  assert.strictEqual(pFull.completedDays, 365);
  assert.strictEqual(pFull.remainingDays, 0);
  assert.strictEqual(pFull.percentage, 100);

  // Test deduplication and out-of-range filtering
  const pDedup = calculateProgress([1, 1, 1, 2, 2, 0, -5, 366, 999]);
  assert.strictEqual(pDedup.completedDays, 2);
  assert.strictEqual(pDedup.remainingDays, 363);
  assert.strictEqual(pDedup.percentage, 0.5);
});

// 5. Quality Check 5: Date navigation works across month and year boundaries
test('Quality Check 5: Date navigation across month and year boundaries', () => {
  const startDate = new Date(2026, 0, 1); // Jan 1, 2026

  // Same day
  assert.strictEqual(getDayForDate(new Date(2026, 0, 1), startDate), 1);
  
  // Month boundary (Jan 31 to Feb 1)
  assert.strictEqual(getDayForDate(new Date(2026, 0, 31), startDate), 31);
  assert.strictEqual(getDayForDate(new Date(2026, 1, 1), startDate), 32);

  // Mid-year month boundary (July 31 to Aug 1)
  assert.strictEqual(getDayForDate(new Date(2026, 6, 31), startDate), 212);
  assert.strictEqual(getDayForDate(new Date(2026, 7, 1), startDate), 213);

  // Year boundary (Dec 31 to Jan 1 next year)
  assert.strictEqual(getDayForDate(new Date(2026, 11, 31), startDate), 365);
  assert.strictEqual(getDayForDate(new Date(2027, 0, 1), startDate), 1);
});

// 6. Quality Check 6: Changing plan start date produces correct daily assignment
test('Quality Check 6: Custom start date correctly shifts daily assignments', () => {
  const customStartDate = new Date(2026, 2, 15); // March 15, 2026

  // Day 1 must fall on March 15
  assert.strictEqual(getDayForDate(new Date(2026, 2, 15), customStartDate), 1);

  // Day 2 must fall on March 16
  assert.strictEqual(getDayForDate(new Date(2026, 2, 16), customStartDate), 2);

  // Day 1 has Genesis 1–3, Matthew 1, Psalm 1, Proverbs 1
  const day1 = plan[0];
  assert.strictEqual(day1.day, 1);
  assert.strictEqual(day1.passages[0].bookId, 'GEN');
  assert.strictEqual(day1.passages[0].chapterStart, 1);
  assert.strictEqual(day1.passages[0].chapterEnd, 3);
  assert.strictEqual(day1.passages[1].bookId, 'MAT');
  assert.strictEqual(day1.passages[2].bookId, 'PSA');
  assert.strictEqual(day1.passages[3].bookId, 'PRO');

  // Day 365 must fall on March 14, 2027
  assert.strictEqual(getDayForDate(new Date(2027, 2, 14), customStartDate), 365);
  const day365 = plan[364];
  assert.strictEqual(day365.day, 365);
  assert.strictEqual(day365.passages[0].bookId, 'MAL');
  assert.strictEqual(day365.passages[1].bookId, 'REV');
  assert.strictEqual(day365.passages[2].bookId, 'PSA');
  assert.strictEqual(day365.passages[2].chapterStart, 150);
  assert.strictEqual(day365.passages[3].bookId, 'PRO');
  assert.strictEqual(day365.passages[3].chapterStart, 31);
});

// 7. Quality Check 7: Authorized external Bible links are well-formed
test('Quality Check 7: Authorized Bible links format check for both ID and EN', () => {
  for (const day of plan.slice(0, 30)) {
    for (const passage of day.passages) {
      assert.ok(passage.externalUrlId.startsWith('https://alkitab.sabda.org/'), 'ID link must point to SABDA Alkitab');
      assert.ok(passage.externalUrlEn.startsWith('https://www.biblegateway.com/'), 'EN link must point to BibleGateway');
    }
  }
});
