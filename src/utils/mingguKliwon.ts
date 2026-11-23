// Authentic 35-day Javanese Selapanan calendar engine for Pasar Sor Pring (Minggu Kliwon)
// Verified 2026 Minggu Kliwon dates: Jan 18, Feb 22, Mar 29, May 3, Jun 7, Jul 12, Aug 16, Sep 20, Oct 25, Nov 29 (2026), Jan 3 (2027)
// Pasar Sor Pring operating hours: 07:00 – 12:00 WIB (UTC+7)

export const DAY_MS = 86_400_000;
export const CYCLE_DAYS = 35;
export const CYCLE_MS = CYCLE_DAYS * DAY_MS;
export const OPEN_DURATION_MS = 5 * 3_600_000; // 07:00 to 12:00 WIB

// Anchor: Sunday, 18 January 2026 at 07:00 WIB (= 00:00 UTC)
export const MINGGU_KLIWON_ANCHOR_UTC = Date.UTC(2026, 0, 18, 0, 0, 0);

// Javanese Pasaran sequence starting from Kliwon on anchor day (18 Jan 2026 = Minggu Kliwon)
const PASARAN_NAMES = ['Kliwon', 'Legi', 'Pahing', 'Pon', 'Wage'] as const;

export type PasaranName = (typeof PASARAN_NAMES)[number];

export interface MarketState {
  isOpen: boolean;
  startMs: number;
  endMs: number;
  targetMs: number;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Returns the next `count` Minggu Kliwon start timestamps (07:00 WIB in UTC ms).
 */
export function getUpcomingMingguKliwon(nowMs: number, count: number): number[] {
  const results: number[] = [];
  let k = Math.floor((nowMs - MINGGU_KLIWON_ANCHOR_UTC) / CYCLE_MS);
  while (results.length < count) {
    const start = MINGGU_KLIWON_ANCHOR_UTC + k * CYCLE_MS;
    if (start + OPEN_DURATION_MS > nowMs) {
      results.push(start);
    }
    k++;
  }
  return results;
}

/**
 * Computes whether Pasar Sor Pring is currently open (07:00–12:00 WIB on Minggu Kliwon)
 * and the exact target timestamp for the live countdown.
 */
export function getMarketState(nowMs: number = Date.now()): MarketState {
  const nextStart = getUpcomingMingguKliwon(nowMs, 1)[0];
  const endMs = nextStart + OPEN_DURATION_MS;
  const isOpen = nowMs >= nextStart && nowMs < endMs;
  return {
    isOpen,
    startMs: nextStart,
    endMs,
    targetMs: isOpen ? endMs : nextStart,
  };
}

/**
 * Checks whether a given calendar date (year, 1-based month, day) falls on Minggu Kliwon.
 */
export function isMingguKliwonDate(year: number, month: number, day: number): boolean {
  const targetUtc = Date.UTC(year, month - 1, day, 0, 0, 0);
  const diffDays = Math.round((targetUtc - MINGGU_KLIWON_ANCHOR_UTC) / DAY_MS);
  const mod = ((diffDays % CYCLE_DAYS) + CYCLE_DAYS) % CYCLE_DAYS;
  return mod === 0;
}

/**
 * Returns the Javanese Pasaran name for any calendar date (year, 1-based month, day).
 */
export function getPasaranForDate(year: number, month: number, day: number): PasaranName {
  const targetUtc = Date.UTC(year, month - 1, day, 0, 0, 0);
  const diffDays = Math.round((targetUtc - MINGGU_KLIWON_ANCHOR_UTC) / DAY_MS);
  const idx = ((diffDays % 5) + 5) % 5;
  return PASARAN_NAMES[idx];
}

export function splitDuration(ms: number): CountdownParts {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatWibDate(
  ms: number,
  lang: 'id' | 'en',
  options: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    timeZone: 'Asia/Jakarta',
    ...options,
  }).format(new Date(ms));
}

export function getWibYmd(ms: number): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(ms));
}

export function buildGoogleCalendarUrl(startMs: number, lang: 'id' | 'en'): string {
  const toGCal = (ms: number) =>
    new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const title =
    lang === 'id'
      ? 'Pasar Sor Pring (Minggu Kliwon) — Bulaksalak'
      : 'Pasar Sor Pring (Minggu Kliwon Market) — Bulaksalak';
  const details =
    lang === 'id'
      ? 'Pasar Seni & Kuliner Tradisional di bawah rimbun Hutan Bambu Bulaksalak (Minggu Kliwon, 07:00–12:00 WIB). Transaksi menggunakan koin bambu Girik. Info: srawung-bulaksalak.com'
      : 'Traditional Culinary & Cultural Art Market beneath Bulaksalak Bamboo Forest (Minggu Kliwon, 07:00–12:00 WIB). Uses Girik bamboo tokens. Info: srawung-bulaksalak.com';
  const location = 'Hutan Bambu Bulaksalak, Wukirsari, Cangkringan, Sleman, DI Yogyakarta 55583';

  return (
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${toGCal(startMs)}/${toGCal(startMs + OPEN_DURATION_MS)}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(location)}`
  );
}
