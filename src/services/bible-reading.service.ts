import readingPlanData from '@/data/bible-reading-plan.json';
import { BIBLE_BOOKS, TOTAL_BIBLE_CHAPTERS, TOTAL_BIBLE_BOOKS } from '@/data/bible-books';

export interface BibleReadingPassage {
  bookId: string;
  bookNameId: string;
  bookNameEn: string;
  chapterStart: number;
  chapterEnd: number;
  chapterCount: number;
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
 * Rigorously validates the entire reading plan dataset:
 * - Exactly 66 books covered
 * - Exactly 1,189 chapters covered from Genesis 1 to Revelation 22
 * - Zero duplicates
 * - Zero omissions
 * - Exactly 365 reading days
 */
export function validateReadingPlan(): PlanValidationResult {
  const chapterSeen = new Map<string, number>();
  const booksSeen = new Set<string>();

  for (const day of PLAN) {
    for (const passage of day.passages) {
      booksSeen.add(passage.bookId);
      for (let ch = passage.chapterStart; ch <= passage.chapterEnd; ch++) {
        const key = `${passage.bookId}:${ch}`;
        chapterSeen.set(key, (chapterSeen.get(key) || 0) + 1);
      }
    }
  }

  const missingChapters: string[] = [];
  const duplicateChapters: string[] = [];

  // Check expected chapters for all 66 canonical books
  for (const book of BIBLE_BOOKS) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      const key = `${book.id}:${ch}`;
      const count = chapterSeen.get(key) || 0;
      if (count === 0) {
        missingChapters.push(key);
      } else if (count > 1) {
        duplicateChapters.push(`${key} (seen ${count} times)`);
      }
    }
  }

  const isValid =
    PLAN.length === 365 &&
    booksSeen.size === TOTAL_BIBLE_BOOKS &&
    chapterSeen.size === TOTAL_BIBLE_CHAPTERS &&
    missingChapters.length === 0 &&
    duplicateChapters.length === 0;

  return {
    isValid,
    totalDays: PLAN.length,
    totalChapters: chapterSeen.size,
    totalBooksCovered: booksSeen.size,
    duplicateCount: duplicateChapters.length,
    missingCount: missingChapters.length,
    missingChapters,
    duplicateChapters,
  };
}
