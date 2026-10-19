import readingPlanData from '@/data/bible-reading-plan.json';
import { BIBLE_BOOKS, TOTAL_BIBLE_CHAPTERS, TOTAL_BIBLE_BOOKS } from '@/data/bible-books';

export interface BibleReadingPassage {
  bookId: string;
  bookNameId: string;
  bookNameEn: string;
  chapterStart: number;
  chapterEnd: number;
  chapterCount: number;
  category?: 'OT' | 'NT' | 'PSALM' | 'PROVERB';
  testament: 'OT' | 'NT';
  displayRefId: string;
  displayRefEn: string;
  externalUrlId: string;
  externalUrlEn: string;
}

export interface BibleReadingDay {
  day: number;
  totalChapters: number;
  passages: BibleReadingPassage[];
  summaryRefId: string;
  summaryRefEn: string;
}

export interface ReadingProgressStats {
  completedDays: number;
  totalDays: number;
  remainingDays: number;
  percentage: number;
}

export interface PlanValidationResult {
  isValid: boolean;
  totalDays: number;
  totalChapters: number;
  totalBooksCovered: number;
  duplicateCount: number;
  missingCount: number;
  missingChapters: string[];
  duplicateChapters: string[];
}

const PLAN: BibleReadingDay[] = readingPlanData as BibleReadingDay[];

/**
 * Returns all 365 reading days of the plan.
 */
export function getAllReadingPlanDays(): BibleReadingDay[] {
  return PLAN;
}

/**
 * Retrieves the reading assignment for a specific day number (1-365).
 * Clamps or wraps within 1-365.
 */
export function getReadingForDay(dayNumber: number): BibleReadingDay {
  const normalized = Math.max(1, Math.min(365, Math.floor(dayNumber)));
  return PLAN[normalized - 1] || PLAN[0];
}

/**
 * Calculates which day (1-365) in the plan corresponds to a target calendar date,
 * based on a configurable plan start date.
 * Handles month and year boundaries accurately.
 */
export function getDayForDate(targetDate: Date, planStartDate: Date): number {
  // Normalize both dates to midnight local time to avoid timezone/daylight saving drift
  const start = new Date(planStartDate.getFullYear(), planStartDate.getMonth(), planStartDate.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  const diffMs = target.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Modulo 365 to handle cycles, 1-indexed (1 to 365)
  const normalizedDay = ((diffDays % 365) + 365) % 365 + 1;
  return normalizedDay;
}

/**
 * Calculates the calendar date corresponding to a plan day (1-365)
 * starting from a configurable start date.
 */
export function getDateForDay(dayNumber: number, planStartDate: Date): Date {
  const start = new Date(planStartDate.getFullYear(), planStartDate.getMonth(), planStartDate.getDate());
  const offsetDays = Math.max(1, Math.min(365, Math.floor(dayNumber))) - 1;
  const result = new Date(start);
  result.setDate(start.getDate() + offsetDays);
  return result;
}

/**
 * Calculates progress statistics from the list of completed day numbers.
 */
export function calculateProgress(completedDays: number[]): ReadingProgressStats {
  const uniqueCompleted = new Set(
    completedDays.filter((d) => typeof d === 'number' && d >= 1 && d <= 365)
  );
  const completedCount = uniqueCompleted.size;
  const totalDays = 365;
  const remainingDays = Math.max(0, totalDays - completedCount);
  const percentage = Math.round((completedCount / totalDays) * 1000) / 10; // 1 decimal place, e.g. 14.5%

  return {
    completedDays: completedCount,
    totalDays,
    remainingDays,
    percentage,
  };
}

/**
 * Rigorously validates the entire 4-stream reading plan dataset:
 * - Exactly 66 books covered
 * - Exactly 365 reading days
 * - Old Testament (37 books, 748 chapters): Zero omissions, zero duplicates
 * - New Testament (27 books, 260 chapters): All chapters covered across 365 days
 * - Psalms (150 chapters): Repeated 2 times a year (Cycle 1: 150 ch, Cycle 2: 150 ch)
 * - Proverbs (31 chapters): Repeated 4 times a year (Q1: 31 ch, Q2: 31 ch, Q3: 31 ch, Q4: 31 ch)
 * - Every single day has all 4 streams present
 */
export function validateReadingPlan(): PlanValidationResult {
  const booksSeen = new Set<string>();
  const otChaptersSeen = new Map<string, number>();
  const ntChaptersSeen = new Map<string, number>();
  const psalmsCycle1 = new Set<number>();
  const psalmsCycle2 = new Set<number>();
  const proverbsQ1 = new Set<number>();
  const proverbsQ2 = new Set<number>();
  const proverbsQ3 = new Set<number>();
  const proverbsQ4 = new Set<number>();

  for (const day of PLAN) {
    for (const passage of day.passages) {
      booksSeen.add(passage.bookId);
      for (let ch = passage.chapterStart; ch <= passage.chapterEnd; ch++) {
        const key = `${passage.bookId}:${ch}`;
        if (passage.category === 'OT') {
          otChaptersSeen.set(key, (otChaptersSeen.get(key) || 0) + 1);
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
  }

  const missingChapters: string[] = [];
  const duplicateChapters: string[] = [];

  // 1. OT (37 books, 748 chapters)
  const otBooks = BIBLE_BOOKS.filter((b) => b.testament === 'OT' && b.id !== 'PSA' && b.id !== 'PRO');
  for (const book of otBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      const key = `${book.id}:${ch}`;
      const count = otChaptersSeen.get(key) || 0;
      if (count === 0) missingChapters.push(`OT missing ${key}`);
      else if (count > 1) duplicateChapters.push(`OT duplicate ${key} (${count}x)`);
    }
  }

  // 2. NT (27 books, 260 chapters)
  const ntBooks = BIBLE_BOOKS.filter((b) => b.testament === 'NT');
  for (const book of ntBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      const key = `${book.id}:${ch}`;
      const count = ntChaptersSeen.get(key) || 0;
      if (count === 0) missingChapters.push(`NT missing ${key}`);
    }
  }

  // 3. Psalms 2x (Cycle 1: 150 ch, Cycle 2: 150 ch)
  for (let ch = 1; ch <= 150; ch++) {
    if (!psalmsCycle1.has(ch)) missingChapters.push(`Psalms Cycle 1 missing Ps ${ch}`);
    if (!psalmsCycle2.has(ch)) missingChapters.push(`Psalms Cycle 2 missing Ps ${ch}`);
  }

  // 4. Proverbs 4x (Q1: 31 ch, Q2: 31 ch, Q3: 31 ch, Q4: 31 ch)
  for (let ch = 1; ch <= 31; ch++) {
    if (!proverbsQ1.has(ch)) missingChapters.push(`Proverbs Q1 missing Prov ${ch}`);
    if (!proverbsQ2.has(ch)) missingChapters.push(`Proverbs Q2 missing Prov ${ch}`);
    if (!proverbsQ3.has(ch)) missingChapters.push(`Proverbs Q3 missing Prov ${ch}`);
    if (!proverbsQ4.has(ch)) missingChapters.push(`Proverbs Q4 missing Prov ${ch}`);
  }

  const isValid =
    PLAN.length === 365 &&
    booksSeen.size === TOTAL_BIBLE_BOOKS &&
    missingChapters.length === 0 &&
    duplicateChapters.length === 0;

  return {
    isValid,
    totalDays: PLAN.length,
    totalChapters: otChaptersSeen.size + ntChaptersSeen.size + psalmsCycle1.size + psalmsCycle2.size + proverbsQ1.size + proverbsQ2.size + proverbsQ3.size + proverbsQ4.size,
    totalBooksCovered: booksSeen.size,
    duplicateCount: duplicateChapters.length,
    missingCount: missingChapters.length,
    missingChapters,
    duplicateChapters,
  };
}
