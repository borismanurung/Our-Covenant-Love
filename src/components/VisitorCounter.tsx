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

  const countDisplay = (stats.uniqueVisitors || stats.totalVisits || 1).toLocaleString(
    locale === 'id' ? 'id-ID' : 'en-US'
  );

  const tooltipText =
    locale === 'id'
      ? `Pengunjung Unik: ${stats.uniqueVisitors.toLocaleString('id-ID')} • Total Kunjungan: ${stats.totalVisits.toLocaleString('id-ID')}`
      : `Unique Visitors: ${stats.uniqueVisitors.toLocaleString('en-US')} • Total Visits: ${stats.totalVisits.toLocaleString('en-US')}`;

  return (
    <div
      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-400 text-[11px] tracking-tight transition-colors cursor-default select-none"
      title={tooltipText}
    >
      <span className="hidden sm:inline text-slate-700">•</span>
      <Users className="w-3 h-3 text-slate-500 opacity-60" />
      <span>
        {countDisplay} {locale === 'id' ? 'pengunjung' : 'visitors'}
      </span>
    </div>
  );
}
