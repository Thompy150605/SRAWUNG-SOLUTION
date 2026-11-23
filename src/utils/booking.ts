import { BOOKING_ITEMS, BUNDLE_DISCOUNTS, CONTACT, Lang, PackageItemKey } from '../data/content';
import { formatWibDate, isMingguKliwonDate } from './mingguKliwon';

export const PACKAGE_ORDER: PackageItemKey[] = ['villa', 'forest', 'workshop', 'heritage'];

export interface QuoteLine {
  key: PackageItemKey;
  title: string;
  detail: string;
  unitPrice: number;
  amount: number;
}

export interface QuoteResult {
  lines: QuoteLine[];
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  total: number;
}

export function formatIdr(amount: number): string {
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

export function calculateQuote(
  selected: Set<PackageItemKey>,
  guests: number,
  nights: number,
  lang: Lang
): QuoteResult {
  const rooms = Math.ceil(guests / 2);
  const lines: QuoteLine[] = [];
  let subtotal = 0;

  for (const key of PACKAGE_ORDER) {
    if (!selected.has(key)) continue;
    const item = BOOKING_ITEMS[key];
    const loc = item[lang];
    const qty = item.billing === 'room_night' ? rooms * nights : guests;
    const amount = item.price * qty;

    const detail =
      item.billing === 'room_night'
        ? lang === 'id'
          ? `${rooms} kamar × ${nights} malam`
          : `${rooms} ${rooms > 1 ? 'rooms' : 'room'} × ${nights} ${nights > 1 ? 'nights' : 'night'}`
        : lang === 'id'
          ? `${guests} orang`
          : `${guests} ${guests > 1 ? 'guests' : 'guest'}`;

    lines.push({
      key,
      title: loc.title,
      detail,
      unitPrice: item.price,
      amount,
    });
    subtotal += amount;
  }

  const discountRate = BUNDLE_DISCOUNTS[selected.size] ?? 0;
  const discountAmount = Math.round((subtotal * discountRate) / 1000) * 1000;

  return {
    lines,
    subtotal,
    discountRate,
    discountAmount,
    total: subtotal - discountAmount,
  };
}

export function getPackageTitle(selected: Set<PackageItemKey>, lang: Lang): string {
  const keys = PACKAGE_ORDER.filter((k) => selected.has(k));
  if (keys.length === 0) return '—';
  if (keys.length === 3 && selected.has('villa') && selected.has('forest') && selected.has('workshop')) {
    return lang === 'id'
      ? 'Paket Srawung Weekend (Ndalem Stay + Hutan Bambu + Lokakarya)'
      : 'Srawung Weekend Bundle (Ndalem Stay + Bamboo Forest + Workshop)';
  }
  const joined = keys.map((k) => BOOKING_ITEMS[k][lang].short).join(' + ');
  return lang === 'id' ? `Paket ${joined}` : `${joined} Package`;
}

export function buildWhatsAppMessage(params: {
  selected: Set<PackageItemKey>;
  guests: number;
  nights: number;
  date: string;
  name: string;
  note: string;
  lang: Lang;
  quote: QuoteResult;
}): string {
  const { selected, guests, date, name, note, lang, quote } = params;
  const pkgTitle = getPackageTitle(selected, lang);
  const lines: string[] = [];

  if (lang === 'id') {
    lines.push(`Halo SRAWUNG Bulaksalak, saya tertarik memesan ${pkgTitle}.`, '');
    if (name.trim()) lines.push(`Nama: ${name.trim()}`);
    if (date) {
      const [y, m, d] = date.split('-').map(Number);
      const formatted = formatWibDate(Date.UTC(y, m - 1, d, 5), 'id', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const isKliwon = isMingguKliwonDate(y, m, d);
      lines.push(
        `Tanggal kunjungan: ${formatted}${isKliwon ? ' (bertepatan Pasar Sor Pring — Minggu Kliwon)' : ''}`
      );
    }
    lines.push(`Jumlah tamu: ${guests} orang`, 'Rincian pengalaman:');
    quote.lines.forEach((l) => lines.push(`- ${l.title} (${l.detail})`));
    lines.push(
      `Estimasi total: ${formatIdr(quote.total)}${
        quote.discountAmount ? ` (termasuk hemat paket ${Math.round(quote.discountRate * 100)}%)` : ''
      }`
    );
    if (note.trim()) lines.push(`Catatan: ${note.trim()}`);
    lines.push('', 'Mohon informasi ketersediaannya. Terima kasih.', `(${CONTACT.domain})`);
  } else {
    lines.push(`Hello SRAWUNG Bulaksalak, I would like to book the ${pkgTitle}.`, '');
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    if (date) {
      const [y, m, d] = date.split('-').map(Number);
      const formatted = formatWibDate(Date.UTC(y, m - 1, d, 5), 'en', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const isKliwon = isMingguKliwonDate(y, m, d);
      lines.push(
        `Visit date: ${formatted}${isKliwon ? ' (coincides with Pasar Sor Pring — Minggu Kliwon)' : ''}`
      );
    }
    lines.push(`Guests: ${guests}`, 'Selected experiences:');
    quote.lines.forEach((l) => lines.push(`- ${l.title} (${l.detail})`));
    lines.push(
      `Estimated total: ${formatIdr(quote.total)}${
        quote.discountAmount ? ` (includes ${Math.round(quote.discountRate * 100)}% bundle savings)` : ''
      }`
    );
    if (note.trim()) lines.push(`Notes: ${note.trim()}`);
    lines.push('', 'Please share availability and confirmation details. Thank you.', `(${CONTACT.domain})`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(message)}`;
}
