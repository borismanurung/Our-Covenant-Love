'use client';

import { useState, useEffect, useMemo } from 'react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import {
  getAllReadingPlanDays,
  getReadingForDay,
  getDayForDate,
  getDateForDay,
  calculateProgress,
  BibleReadingDay,
  BibleReadingPassage,
} from '@/services/bible-reading.service';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Settings,
  Filter,
  Check,
  Clock,
  BookmarkCheck,
  Compass,
} from 'lucide-react';

interface BibleReadingViewProps {
  locale: Locale;
  dict: Dictionary;
}

export default function BibleReadingView({ locale, dict }: BibleReadingViewProps) {
  const isId = locale === 'id';
  const t = dict.bibleReadingPlan;

  // Default start date: Jan 1 of current year
  const currentYear = new Date().getFullYear();
  const defaultStartDateStr = `${currentYear}-01-01`;

  // State
  const [startDateStr, setStartDateStr] = useState<string>(defaultStartDateStr);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isStartDateModalOpen, setIsStartDateModalOpen] = useState<boolean>(false);
  const [tempStartDateInput, setTempStartDateInput] = useState<string>(defaultStartDateStr);
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showCalendarGrid, setShowCalendarGrid] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const planDays = useMemo(() => getAllReadingPlanDays(), []);

  // Parse start date safely
  const parsedStartDate = useMemo(() => {
    const d = new Date(startDateStr);
    return isNaN(d.getTime()) ? new Date(defaultStartDateStr) : d;
  }, [startDateStr, defaultStartDateStr]);

  // Today's corresponding plan day
  const todayPlanDay = useMemo(() => {
    return getDayForDate(new Date(), parsedStartDate);
  }, [parsedStartDate]);

  // Load progress and settings on mount
  useEffect(() => {
    setIsMounted(true);

    // 1. Try local storage first for quick optimistic hydration
    let localCompleted: number[] = [];
    try {
      const stored = localStorage.getItem('ocl_reading_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          localCompleted = parsed.filter((n) => typeof n === 'number');
          setCompletedDays(new Set(localCompleted));
        }
      }

      const storedStartDate = localStorage.getItem('ocl_reading_start_date');
      if (storedStartDate && !isNaN(Date.parse(storedStartDate))) {
        setStartDateStr(storedStartDate);
        setTempStartDateInput(storedStartDate);
        setSelectedDay(getDayForDate(new Date(), new Date(storedStartDate)));
      } else {
        setSelectedDay(getDayForDate(new Date(), new Date(defaultStartDateStr)));
      }
    } catch {
      // Fallback
    }

    // 2. Fetch authenticated backend status
    fetch('/api/reading-plan/progress')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;

        if (data.authenticated) {
          setIsAuthenticated(true);
          const serverDays: number[] = Array.isArray(data.completedDays) ? data.completedDays : [];
          // Merge local and server days
          const merged = Array.from(new Set([...localCompleted, ...serverDays]));
          setCompletedDays(new Set(merged));
          try {
            localStorage.setItem('ocl_reading_progress', JSON.stringify(merged));
          } catch {}

          if (data.startDate) {
            const serverDateStr = data.startDate.split('T')[0];
            setStartDateStr(serverDateStr);
            setTempStartDateInput(serverDateStr);
            setSelectedDay(getDayForDate(new Date(), new Date(serverDateStr)));
          }
        }
      })
      .catch(() => {});
  }, [defaultStartDateStr]);

  // Toggle completion of selected day
  const toggleDayCompletion = async (dayNumber: number) => {
    const nextCompleted = new Set(completedDays);
    const willBeCompleted = !nextCompleted.has(dayNumber);

    if (willBeCompleted) {
      nextCompleted.add(dayNumber);
    } else {
      nextCompleted.delete(dayNumber);
    }

    // Optimistic UI update
    setCompletedDays(nextCompleted);
    try {
      localStorage.setItem('ocl_reading_progress', JSON.stringify(Array.from(nextCompleted)));
    } catch {}

    // Background sync with API
    try {
      await fetch('/api/reading-plan/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayNumber,
          completed: willBeCompleted,
        }),
      });
    } catch {
      // Offline fallback already in localStorage
    }
  };

  // Save updated plan start date
  const handleSaveStartDate = async () => {
    if (!tempStartDateInput || isNaN(Date.parse(tempStartDateInput))) return;

    setStartDateStr(tempStartDateInput);
    setIsStartDateModalOpen(false);

    try {
      localStorage.setItem('ocl_reading_start_date', tempStartDateInput);
    } catch {}

    // Sync to API
    try {
      await fetch('/api/reading-plan/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: tempStartDateInput }),
      });
    } catch {}

    // Recalculate today's day number under new start date
    const newToday = getDayForDate(new Date(), new Date(tempStartDateInput));
    setSelectedDay(newToday);
  };

  // Progress stats
  const progressStats = useMemo(() => {
    return calculateProgress(Array.from(completedDays));
  }, [completedDays]);

  // Current reading day data
  const currentReading: BibleReadingDay = useMemo(() => {
    return getReadingForDay(selectedDay);
  }, [selectedDay]);

  // Formatted date for currently selected plan day
  const selectedDayDate = useMemo(() => {
    return getDateForDay(selectedDay, parsedStartDate);
  }, [selectedDay, parsedStartDate]);

  const formattedDayDate = useMemo(() => {
    if (!isMounted) return '';
    return selectedDayDate.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDayDate, isId, isMounted]);

  const isCurrentDayCompleted = completedDays.has(selectedDay);
  const isSelectedToday = selectedDay === todayPlanDay;

  // Filtered calendar days for grid browser
  const filteredCalendarDays = useMemo(() => {
    if (calendarFilter === 'completed') {
      return planDays.filter((d) => completedDays.has(d.day));
    }
    if (calendarFilter === 'pending') {
      return planDays.filter((d) => !completedDays.has(d.day));
    }
    return planDays;
  }, [planDays, completedDays, calendarFilter]);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Header Hero Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold tracking-wide shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-royalPurple-600" />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          {t.heroTitle}
        </h1>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Start Date & Status Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-covenant-600" />
            <span>
              {t.planStartDate}: <strong>{startDateStr}</strong>
            </span>
          </span>

          <button
            type="button"
            onClick={() => {
              setTempStartDateInput(startDateStr);
              setIsStartDateModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-covenant-50 hover:bg-covenant-100 border border-covenant-200 text-covenant-800 font-semibold transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t.changeStartDate}</span>
          </button>
        </div>
      </section>

      {/* 2. Progress Overview Banner */}
      <section className="bg-gradient-to-br from-navy-950 via-slate-900 to-covenant-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-covenant-400" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                {t.progressTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.revisitNotice}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-3xl sm:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-covenant-300 via-white to-royalPurple-300">
              {progressStats.percentage}%
            </span>
            <span className="block text-[11px] uppercase tracking-wider text-covenant-300 font-semibold">
              {t.percentageLabel}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar with Royal Blue & Purple Gradient */}
        <div className="space-y-2">
          <div className="w-full bg-slate-800/80 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
            <div
              className="bg-gradient-to-r from-covenant-500 via-indigo-500 to-royalPurple-500 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.min(100, Math.max(0.5, progressStats.percentage))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>
              <strong>{progressStats.completedDays}</strong> {t.completedCount}
            </span>
            <span>
              <strong>{progressStats.remainingDays}</strong> {t.remainingCount} ({t.ofDays})
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Reading Card (Focused Daily Experience) */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 space-y-8 relative">
        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedDay((prev) => (prev > 1 ? prev - 1 : 365))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title={t.previousDay}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.previousDay}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedDay(todayPlanDay)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isSelectedToday
                  ? 'bg-covenant-600 text-white border-covenant-600 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {t.todayButton}
            </button>

            <button
              type="button"
              onClick={() => setSelectedDay((prev) => (prev < 365 ? prev + 1 : 1))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title={t.nextDay}
            >
              <span className="hidden sm:inline">{t.nextDay}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Jump Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="jumpDaySelect" className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:inline">
              {t.jumpToDay}:
            </label>
            <select
              id="jumpDaySelect"
              value={selectedDay}
              onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-covenant-500 cursor-pointer"
            >
              {planDays.map((d) => (
                <option key={d.day} value={d.day}>
                  {t.dayLabel} {d.day} — {isId ? d.summaryRefId : d.summaryRefEn} {completedDays.has(d.day) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Day Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-covenant-100 text-covenant-900 text-xs font-bold tracking-wide">
                {t.dayLabel} {currentReading.day} {t.ofDays}
              </span>

              {isCurrentDayCompleted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.completedBadge}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t.pendingBadge}</span>
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {isId ? currentReading.summaryRefId : currentReading.summaryRefEn}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {formattedDayDate} &bull; {currentReading.totalChapters} {t.chaptersLabel}
            </p>
          </div>

          {/* Reading Completion Toggle Button */}
          <div>
            <button
              type="button"
              onClick={() => toggleDayCompletion(selectedDay)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md active:scale-95 ${
                isCurrentDayCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-gradient-to-r from-covenant-600 to-indigo-600 hover:from-covenant-700 hover:to-indigo-700 text-white shadow-covenant-600/20'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isCurrentDayCompleted ? t.markIncomplete : t.markComplete}</span>
            </button>
          </div>
        </div>

        {/* Scripture Passages List */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t.todayBadge} ({currentReading.passages.length} {isId ? 'Bagian' : 'Passages'})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentReading.passages.map((passage: BibleReadingPassage, idx: number) => {
              const displayRef = isId ? passage.displayRefId : passage.displayRefEn;
              const externalUrl = isId ? passage.externalUrlId : passage.externalUrlEn;
              const testamentLabel = passage.testament === 'OT' ? t.oldTestament : t.newTestament;

              return (
                <div
                  key={`${passage.bookId}-${passage.chapterStart}-${idx}`}
                  className="rounded-2xl p-5 bg-gradient-to-b from-covenant-50/50 via-white to-slate-50/70 border border-covenant-200/80 hover:border-covenant-400 transition-all shadow-xs flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-covenant-700">
                        {testamentLabel}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {passage.chapterCount} {t.chaptersLabel}
                      </span>
                    </div>

                    <h5 className="font-serif font-bold text-xl text-slate-900 group-hover:text-covenant-800 transition-colors">
                      {displayRef}
                    </h5>
                  </div>

                  {/* Authorized External Reader Links */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60">
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-covenant-50 text-covenant-800 border border-covenant-300 hover:border-covenant-500 shadow-2xs transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-covenant-600" />
                      <span>{isId ? t.sabdaBible : t.bibleGatewayBible}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    {/* Secondary Authorized Provider (YouVersion) */}
                    <a
                      href={`https://www.bible.com/bible/${isId ? '306' : '59'}/${passage.bookId}.${passage.chapterStart}.${isId ? 'TB' : 'ESV'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <span>{t.youVersionBible}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Licensing Disclaimer Notice */}
        <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed flex items-start gap-3">
          <Compass className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <p>{t.licenseNotice}</p>
            <p className="mt-1 text-slate-400">
              {isAuthenticated ? t.authenticatedNotice : t.guestNotice}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Full 365-Day Plan Browser & Catch-Up Section */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              {t.calendarView}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.revisitNotice}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setCalendarFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  calendarFilter === 'all' ? 'bg-white text-covenant-800 shadow-2xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                {t.showAll}
              </button>
              <button
                type="button"
                onClick={() => setCalendarFilter('completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  calendarFilter === 'completed' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                {t.showCompleted} ({progressStats.completedDays})
              </button>
              <button
                type="button"
                onClick={() => setCalendarFilter('pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  calendarFilter === 'pending' ? 'bg-white text-slate-800 shadow-2xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                {t.showPending} ({progressStats.remainingDays})
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowCalendarGrid(!showCalendarGrid)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {showCalendarGrid ? t.close : 'Tampilkan / Show Grid'}
            </button>
          </div>
        </div>

        {/* 365 Days Grid (collapsible for performance & cleanliness) */}
        {showCalendarGrid && (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 pt-2 max-h-[500px] overflow-y-auto p-1">
            {filteredCalendarDays.map((d) => {
              const isCompleted = completedDays.has(d.day);
              const isSelected = selectedDay === d.day;
              const isToday = todayPlanDay === d.day;

              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => {
                    setSelectedDay(d.day);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl text-center text-xs transition-all relative border ${
                    isSelected
                      ? 'bg-covenant-700 text-white border-covenant-800 shadow-md font-bold scale-105 z-10'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`${t.dayLabel} ${d.day}: ${isId ? d.summaryRefId : d.summaryRefEn}`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-0.5 opacity-80">
                    <span>{d.day}</span>
                    {isCompleted && <Check className="w-3 h-3 text-emerald-600" />}
                  </div>
                  <div className="truncate text-[10px] font-medium leading-tight">
                    {isId ? d.summaryRefId.split(';')[0] : d.summaryRefEn.split(';')[0]}
                  </div>
                  {isToday && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Configurable Start Date Modal */}
      {isStartDateModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsStartDateModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-covenant-800">
                <Calendar className="w-5 h-5 text-covenant-600" />
                <h4 className="font-serif text-xl font-bold text-slate-900">
                  {t.changeStartDate}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Atur tanggal hari pertama (Hari ke-1) rencana baca Alkitab Anda. Sistem akan secara otomatis menghitung bacaan harian yang sesuai.'
                  : 'Configure the day 1 start date for your 365-day reading plan. The platform will automatically map calendar dates accordingly.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="startDateInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t.selectDate}
              </label>
              <input
                id="startDateInput"
                type="date"
                value={tempStartDateInput}
                onChange={(e) => setTempStartDateInput(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 outline-none font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsStartDateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleSaveStartDate}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-covenant-600 hover:bg-covenant-700 text-white shadow-xs transition-colors"
              >
                {t.saveStartDate}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
