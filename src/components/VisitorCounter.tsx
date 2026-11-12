'use client';

import { useEffect, useState } from 'react';
import { Locale } from '@/i18n/config';
import { Users } from 'lucide-react';

interface VisitorCounterProps {
  locale: Locale;
}

interface StatsData {
  uniqueVisitors: number;
  totalVisits: number;
  pageViews: number;
}

export default function VisitorCounter({ locale }: VisitorCounterProps) {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function recordVisit() {
      try {
        const res = await fetch('/api/stats/visit', {
          method: 'POST',
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStats(data);
          }
        }
      } catch {
        // Silently ignore to avoid disruption
      }
    }

    recordVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!stats || (stats.uniqueVisitors === 0 && stats.totalVisits === 0)) {
    return null;
  }

  const numberLocale = locale === 'id' ? 'id-ID' : 'en-US';
  const totalVisitsCount = Math.max(stats.totalVisits, stats.uniqueVisitors);
  const formattedTotal = totalVisitsCount.toLocaleString(numberLocale);
  const formattedUnique = (stats.uniqueVisitors || 1).toLocaleString(numberLocale);
  const formattedViews = (stats.pageViews || totalVisitsCount).toLocaleString(numberLocale);

  const tooltipText =
    locale === 'id'
      ? `Statistik Akumulatif: ${formattedTotal} total kunjungan • ${formattedUnique} pengunjung unik • ${formattedViews} tayangan halaman`
      : `Cumulative Statistics: ${formattedTotal} total visits • ${formattedUnique} unique visitors • ${formattedViews} page views`;

  return (
    <div
      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-300 text-xs tracking-tight transition-colors cursor-default select-none"
      title={tooltipText}
    >
      <span className="hidden sm:inline text-slate-700">•</span>
      <Users className="w-3.5 h-3.5 text-covenant-400 opacity-90 shrink-0" />
      <span>
        <span className="text-slate-400">
          {locale === 'id' ? 'Total Kunjungan:' : 'Total Visits:'}{' '}
        </span>
        <strong className="font-semibold text-slate-200">{formattedTotal}</strong>
        <span className="hidden md:inline text-slate-500 ml-1">
          ({formattedUnique} {locale === 'id' ? 'pengunjung unik' : 'unique'})
        </span>
      </span>
    </div>
  );
}
