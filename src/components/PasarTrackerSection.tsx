import { useState, useMemo } from 'react';
import {
  CalendarPlus,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
} from 'lucide-react';
import { COPY, Lang } from '../data/content';
import {
  CountdownParts,
  MarketState,
  buildGoogleCalendarUrl,
  formatWibDate,
  getPasaranForDate,
  getUpcomingMingguKliwon,
  getWibYmd,
  isMingguKliwonDate,
  pad2,
} from '../utils/mingguKliwon';
import { buildWhatsAppUrl } from '../utils/booking';

interface PasarTrackerSectionProps {
  lang: Lang;
  nowMs: number;
  marketState: MarketState;
  countdown: CountdownParts;
  onNotify: (msg: string) => void;
}

export function PasarTrackerSection({
  lang,
  nowMs,
  marketState,
  countdown,
  onNotify,
}: PasarTrackerSectionProps) {
  const t = COPY[lang].market;
  const upcomingDates = useMemo(() => getUpcomingMingguKliwon(nowMs, 4), [nowMs]);
  const [todayY, todayM, todayD] = getWibYmd(nowMs).split('-').map(Number);

  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>({
    year: todayY,
    month: todayM,
  });

  const shiftMonth = (delta: number) => {
    setViewMonth((prev) => {
      const d = new Date(Date.UTC(prev.year, prev.month - 1 + delta, 1));
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 };
    });
  };

  const monthLabel = formatWibDate(
    Date.UTC(viewMonth.year, viewMonth.month - 1, 15),
    lang,
    { month: 'long', year: 'numeric' }
  );

  const firstDayUtc = new Date(Date.UTC(viewMonth.year, viewMonth.month - 1, 1)).getUTCDay();
  const leadingEmpty = (firstDayUtc + 6) % 7; // Monday-first
  const totalDays = new Date(Date.UTC(viewMonth.year, viewMonth.month, 0)).getUTCDate();

  const gcalUrl = buildGoogleCalendarUrl(upcomingDates[0], lang);
  const waMarketMsg = COPY[lang].quickSheet.templates[2].msg;

  const nextStartLabel = formatWibDate(marketState.startMs, lang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section
      id="pasar"
      className="relative py-18 lg:py-24 bg-wine-maroon-h text-[#FBF7F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Live Countdown + Girik Guide */}
        <div className="lg:col-span-6">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[#E5A04B]">
            {t.kicker}
          </p>
          <h2 className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.1] tracking-tight text-white text-balance">
            {t.heading}
          </h2>
          <p className="mt-4 text-[15px] text-[#F3ECE4]/85 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          {/* Status line (unboxed typography, no pulsing dot) */}
          <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm font-display font-semibold text-[#FFF4E6]">
            <Clock className="w-4 h-4 text-[#E5A04B] shrink-0" aria-hidden="true" />
            <span>
              {marketState.isOpen
                ? t.statusOpen
                : `${t.statusUpcomingPrefix} ${nextStartLabel} · ${t.statusUpcomingSuffix}`}
            </span>
          </div>

          {/* 4-Tile Tabular Countdown */}
          <div className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-lg">
            {[
              { value: pad2(countdown.days), label: t.units.days, accent: false },
              { value: pad2(countdown.hours), label: t.units.hours, accent: false },
              { value: pad2(countdown.minutes), label: t.units.minutes, accent: false },
              { value: pad2(countdown.seconds), label: t.units.seconds, accent: true },
            ].map((tile) => (
              <div
                key={tile.label}
                className={`rounded-xl py-4 px-2 text-center border ${
                  tile.accent
                    ? 'bg-[#CF7440] border-[#E5A04B]/40 text-white'
                    : 'bg-[#FBF7F2] border-[#E6D6C8] text-[#541F2B]'
                }`}
              >
                <div className="font-display text-2xl sm:text-4xl font-extrabold tabular-nums leading-none">
                  {tile.value}
                </div>
                <div
                  className={`mt-1.5 font-display text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${
                    tile.accent ? 'text-[#FFF4E6]' : 'text-[#7D6D57]'
                  }`}
                >
                  {tile.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FBF7F2] hover:bg-[#FFF4E6] text-[#541F2B] font-display font-semibold text-sm px-5 py-3 transition-colors whitespace-nowrap"
            >
              <CalendarPlus className="w-4 h-4 text-[#8E0002]" aria-hidden="true" />
              {t.saveGcal}
            </a>
            <a
              href={buildWhatsAppUrl(waMarketMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onNotify(COPY[lang].modal.openingWaToast)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#FBF7F2]/35 hover:border-[#E5A04B] hover:text-[#E5A04B] text-[#FBF7F2] font-display font-semibold text-sm px-5 py-3 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t.askWa}
            </a>
          </div>

          {/* Girik Bamboo Token Guide */}
          <div className="mt-9 pt-7 border-t border-white/15">
            <div className="flex items-center gap-2 font-display text-sm font-bold text-[#E5A04B]">
              <Coins className="w-4 h-4" aria-hidden="true" />
              <h3>{t.girikTitle}</h3>
            </div>
            <ol className="mt-4 space-y-3">
              {t.girikSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#F3ECE4]/90">
                  <span className="w-6 h-6 rounded-full bg-[#A94332] border border-[#E5A04B]/40 text-white font-display text-xs font-bold inline-flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: Upcoming Minggu Kliwon Dates + Interactive Month Calendar */}
        <div className="lg:col-span-6 space-y-6">
          {/* Next 4 Minggu Kliwon List */}
          <div className="rounded-2xl bg-[#FBF7F2] text-[#1D1D1D] border border-[#E6D6C8] p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-[#541F2B]">
              {t.upcomingTitle}
            </h3>
            <ol className="mt-4 divide-y divide-[#E6D6C8]">
              {upcomingDates.map((ms, idx) => {
                const isTodayOpen = idx === 0 && marketState.isOpen;
                const dayNum = formatWibDate(ms, lang, { day: 'numeric' });
                const monthShort = formatWibDate(ms, lang, { month: 'short' });
                const fullDate = formatWibDate(ms, lang, {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });

                return (
                  <li
                    key={ms}
                    className={`py-3.5 first:pt-1 last:pb-1 flex items-center gap-4 ${
                      idx === 0 ? 'bg-[#FFF4E6] -mx-3 px-3 rounded-xl border-b-0' : ''
                    }`}
                  >
                    <div
                      className={`w-13 h-13 rounded-xl flex flex-col items-center justify-center shrink-0 leading-none ${
                        idx === 0
                          ? 'bg-[#8E0002] text-white'
                          : 'bg-[#F3ECE4] text-[#541F2B] border border-[#E6D6C8]'
                      }`}
                    >
                      <span className="font-display text-lg font-extrabold tabular-nums">
                        {dayNum}
                      </span>
                      <span className="font-display text-[10px] font-semibold uppercase mt-0.5">
                        {monthShort}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-bold text-[#1D1D1D] truncate">
                        {fullDate}
                      </div>
                      <div className="text-xs text-[#7D6D57] mt-0.5">
                        Minggu Kliwon · 07:00 – 12:00 WIB
                      </div>
                    </div>
                    <span
                      className={`font-display text-[11px] font-bold shrink-0 ${
                        isTodayOpen
                          ? 'text-[#8E0002]'
                          : idx === 0
                            ? 'text-[#C0700F]'
                            : 'text-[#7D6D57]'
                      }`}
                    >
                      {isTodayOpen ? t.openTag : idx === 0 ? t.nextTag : t.futureTag}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Interactive Monthly Javanese Pasaran Calendar */}
          <div className="rounded-2xl bg-[#FBF7F2] text-[#1D1D1D] border border-[#E6D6C8] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-bold text-[#541F2B]">
                  {t.calendarTitle}
                </h3>
                <p className="text-xs text-[#7D6D57] mt-0.5">{monthLabel}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  className="w-8 h-8 rounded-lg border border-[#E6D6C8] bg-white hover:border-[#8E0002] text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  className="w-8 h-8 rounded-lg border border-[#E6D6C8] bg-white hover:border-[#8E0002] text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-display font-semibold text-[#7D6D57]">
              {t.dayHeaders.map((dh) => (
                <div key={dh} className="py-1">
                  {dh}
                </div>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: leadingEmpty }).map((_, i) => (
                <div key={`empty-${i}`} className="h-11" />
              ))}
              {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1;
                const isKliwon = isMingguKliwonDate(viewMonth.year, viewMonth.month, day);
                const pasaran = getPasaranForDate(viewMonth.year, viewMonth.month, day);
                const isToday =
                  viewMonth.year === todayY &&
                  viewMonth.month === todayM &&
                  day === todayD;

                return (
                  <div
                    key={day}
                    title={`${day} ${monthLabel} — ${pasaran}${isKliwon ? ' (Pasar Sor Pring)' : ''}`}
                    className={`h-11 rounded-lg flex flex-col items-center justify-center leading-tight border transition-colors ${
                      isKliwon
                        ? 'bg-[#8E0002] border-[#8E0002] text-white'
                        : isToday
                          ? 'bg-[#FFF4E6] border-[#CF7440] text-[#541F2B]'
                          : 'bg-white border-[#E6D6C8]/70 text-[#1D1D1D]'
                    }`}
                  >
                    <span className="font-display text-xs font-bold tabular-nums">
                      {day}
                    </span>
                    <span
                      className={`text-[9px] font-medium ${
                        isKliwon ? 'text-[#E5A04B]' : 'text-[#7D6D57]'
                      }`}
                    >
                      {pasaran}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E6D6C8] flex flex-wrap items-center gap-4 text-[11.5px] text-[#7D6D57]">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#8E0002]" />
                {t.calendarLegend}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#FFF4E6] border border-[#CF7440]" />
                {t.todayLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
