import { useState, useEffect, useMemo } from 'react';
import {
  X,
  Check,
  Minus,
  Plus,
  MessageCircle,
  Copy,
  CalendarDays,
} from 'lucide-react';
import { BOOKING_ITEMS, COPY, Lang, PackageItemKey } from '../data/content';
import {
  PACKAGE_ORDER,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calculateQuote,
  formatIdr,
  getPackageTitle,
} from '../utils/booking';
import {
  getUpcomingMingguKliwon,
  getWibYmd,
  isMingguKliwonDate,
} from '../utils/mingguKliwon';

interface BookingModalProps {
  open: boolean;
  preset: PackageItemKey[];
  lang: Lang;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export function BookingModal({
  open,
  preset,
  lang,
  onClose,
  onNotify,
}: BookingModalProps) {
  const t = COPY[lang].modal;
  const [selected, setSelected] = useState<Set<PackageItemKey>>(
    () => new Set(preset.length ? preset : ['villa', 'forest'])
  );
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);
  const [visitDate, setVisitDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestNote, setGuestNote] = useState('');

  const todayYmd = getWibYmd(Date.now());

  useEffect(() => {
    if (!open) return;
    setSelected(new Set(preset.length ? preset : ['villa', 'forest']));
    if (!visitDate) {
      const nextKliwon = getUpcomingMingguKliwon(Date.now(), 1)[0];
      setVisitDate(getWibYmd(nextKliwon));
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, preset, onClose]);

  const quote = useMemo(
    () => calculateQuote(selected, guests, nights, lang),
    [selected, guests, nights, lang]
  );

  const waMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        selected,
        guests,
        nights,
        date: visitDate,
        name: guestName,
        note: guestNote,
        lang,
        quote,
      }),
    [selected, guests, nights, visitDate, guestName, guestNote, lang, quote]
  );

  const coincidesKliwon = useMemo(() => {
    if (!visitDate) return false;
    const [y, m, d] = visitDate.split('-').map(Number);
    if (!y || !m || !d) return false;
    return isMingguKliwonDate(y, m, d);
  }, [visitDate]);

  if (!open) return null;

  const toggleItem = (key: PackageItemKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const hasVilla = selected.has('villa');
  const hasSelection = selected.size > 0;

  const handleCopy = async () => {
    if (!hasSelection) return;
    try {
      await navigator.clipboard.writeText(waMessage);
    } catch {
      const area = document.createElement('textarea');
      area.value = waMessage;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    onNotify(t.copiedToast);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#1D1D1D]/55 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full sm:w-[min(980px,96vw)] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#FBF7F2] border border-[#E6D6C8] shadow-2xl">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-white border-b border-[#E6D6C8]">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#A94332]">
              {t.eyebrow}
            </p>
            <h3
              id="booking-modal-title"
              className="font-display text-lg sm:text-xl font-extrabold text-[#1D1D1D]"
            >
              {t.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-lg border border-[#E6D6C8] bg-[#FBF7F2] hover:border-[#8E0002] text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-12">
          {/* Left Form Column */}
          <div className="lg:col-span-7 p-5 sm:p-7 space-y-6">
            <div>
              <div className="font-display text-xs font-bold uppercase tracking-wider text-[#541F2B]">
                {t.step1}
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {PACKAGE_ORDER.map((key) => {
                  const item = BOOKING_ITEMS[key];
                  const loc = item[lang];
                  const isOn = selected.has(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleItem(key)}
                      aria-pressed={isOn}
                      className={`text-left rounded-xl border p-3.5 transition-colors cursor-pointer ${
                        isOn
                          ? 'bg-[#FFF4E6] border-[#8E0002]'
                          : 'bg-white border-[#E6D6C8] hover:border-[#CF7440]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-display text-sm font-bold text-[#1D1D1D]">
                          {loc.short}
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full inline-flex items-center justify-center border shrink-0 ${
                            isOn
                              ? 'bg-[#8E0002] border-[#8E0002] text-white'
                              : 'border-[#D8C7B6] bg-white text-transparent'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#7D6D57] leading-snug">
                        {loc.subtitle}
                      </p>
                      <div className="mt-2 font-display text-xs font-bold text-[#8E0002] tabular-nums">
                        {formatIdr(item.price)}{' '}
                        <span className="font-normal text-[#7D6D57]">/ {loc.unit}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-display text-xs font-bold uppercase tracking-wider text-[#541F2B]">
                {t.step2}
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3.5">
                <div className="rounded-xl bg-white border border-[#E6D6C8] p-3">
                  <div className="text-xs font-medium text-[#7D6D57]">{t.guestsLabel}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-lg bg-[#F3ECE4] hover:bg-[#8E0002] hover:text-white disabled:opacity-40 text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Decrease guests"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-display text-base font-extrabold text-[#1D1D1D] tabular-nums">
                      {guests}{' '}
                      <span className="text-xs font-medium text-[#7D6D57]">
                        {t.guestsUnit}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(20, g + 1))}
                      disabled={guests >= 20}
                      className="w-8 h-8 rounded-lg bg-[#F3ECE4] hover:bg-[#8E0002] hover:text-white disabled:opacity-40 text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Increase guests"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div
                  className={`rounded-xl bg-white border border-[#E6D6C8] p-3 transition-opacity ${
                    !hasVilla ? 'opacity-45' : ''
                  }`}
                >
                  <div className="text-xs font-medium text-[#7D6D57]">{t.nightsLabel}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.max(1, n - 1))}
                      disabled={!hasVilla || nights <= 1}
                      className="w-8 h-8 rounded-lg bg-[#F3ECE4] hover:bg-[#8E0002] hover:text-white disabled:opacity-40 text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Decrease nights"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-display text-base font-extrabold text-[#1D1D1D] tabular-nums">
                      {nights}{' '}
                      <span className="text-xs font-medium text-[#7D6D57]">
                        {t.nightsUnit}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.min(7, n + 1))}
                      disabled={!hasVilla || nights >= 7}
                      className="w-8 h-8 rounded-lg bg-[#F3ECE4] hover:bg-[#8E0002] hover:text-white disabled:opacity-40 text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Increase nights"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <label className="block">
                  <span className="text-xs font-medium text-[#7D6D57]">{t.dateLabel}</span>
                  <input
                    type="date"
                    min={todayYmd}
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E6D6C8] bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D1D1D] outline-none focus:border-[#8E0002]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-[#7D6D57]">{t.nameLabel}</span>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#E6D6C8] bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D1D1D] outline-none focus:border-[#8E0002]"
                  />
                </label>
              </div>

              {coincidesKliwon && (
                <div className="mt-3.5 rounded-xl bg-[#FFF4E6] border border-[#E5A04B] px-3.5 py-2.5 text-xs font-semibold text-[#4B3B03] flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#C0700F] shrink-0" />
                  <span>{t.kliwonAlert}</span>
                </div>
              )}

              <label className="block mt-3.5">
                <span className="text-xs font-medium text-[#7D6D57]">{t.noteLabel}</span>
                <textarea
                  rows={2}
                  value={guestNote}
                  onChange={(e) => setGuestNote(e.target.value)}
                  placeholder={t.notePlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#E6D6C8] bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D1D1D] outline-none focus:border-[#8E0002] resize-none"
                />
              </label>
            </div>
          </div>

          {/* Right Summary & Preview Column */}
          <div className="lg:col-span-5 bg-[#F3ECE4] p-5 sm:p-7 border-t lg:border-t-0 lg:border-l border-[#E6D6C8] flex flex-col justify-between">
            <div>
              <div className="font-display text-xs font-bold uppercase tracking-wider text-[#541F2B]">
                {t.step3}
              </div>

              <div className="mt-3 rounded-xl bg-white border border-[#E6D6C8] p-4">
                <div className="text-[11px] font-medium text-[#7D6D57]">{t.pkgLabel}</div>
                <div className="font-display text-sm font-bold text-[#1D1D1D] mt-0.5">
                  {getPackageTitle(selected, lang)}
                </div>

                {hasSelection ? (
                  <div className="mt-3 space-y-2 text-xs">
                    {quote.lines.map((line) => (
                      <div
                        key={line.key}
                        className="flex items-start justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-[#1D1D1D]">{line.title}</div>
                          <div className="text-[#7D6D57]">
                            {line.detail} × {formatIdr(line.unitPrice)}
                          </div>
                        </div>
                        <span className="font-display font-bold text-[#541F2B] tabular-nums shrink-0">
                          {formatIdr(line.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-[#D9443A] font-medium">
                    {t.emptySelection}
                  </p>
                )}

                <div className="my-3 border-t border-dashed border-[#E6D6C8]" />

                {quote.discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs font-display font-semibold text-[#C0700F] mb-1.5">
                    <span>
                      {t.discountLabel} ({Math.round(quote.discountRate * 100)}%)
                    </span>
                    <span className="tabular-nums">− {formatIdr(quote.discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-[#7D6D57]">{t.totalLabel}</span>
                  <span className="font-display text-2xl font-extrabold text-[#8E0002] tabular-nums">
                    {formatIdr(quote.total)}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-[#7D6D57] leading-snug">
                  {t.estimateNote}
                </p>
              </div>

              {/* Message Preview */}
              <div className="mt-4 rounded-xl bg-[#FBF7F2] border border-[#E6D6C8] p-3.5">
                <div className="text-[11px] font-display font-semibold text-[#7D6D57] mb-2">
                  {t.previewLabel}
                </div>
                <pre className="whitespace-pre-wrap font-body text-xs text-[#1D1D1D]/85 leading-relaxed max-h-40 overflow-y-auto">
                  {hasSelection ? waMessage : '—'}
                </pre>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto] gap-2.5">
              <a
                href={hasSelection ? buildWhatsAppUrl(waMessage) : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!hasSelection) {
                    e.preventDefault();
                    return;
                  }
                  onNotify(t.openingWaToast);
                }}
                className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white font-display font-semibold text-sm px-4 py-3 transition-colors ${
                  !hasSelection ? 'opacity-45 pointer-events-none' : ''
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                {t.sendBtn}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!hasSelection}
                className="w-12 rounded-lg border border-[#E6D6C8] bg-white hover:border-[#8E0002] disabled:opacity-45 text-[#541F2B] inline-flex items-center justify-center transition-colors cursor-pointer"
                title={t.copyBtn}
                aria-label={t.copyBtn}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
