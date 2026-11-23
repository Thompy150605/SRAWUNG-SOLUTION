import { useState } from 'react';
import { ChevronDown, Check, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { BOOKING_ITEMS, COPY, Lang, PackageItemKey } from '../data/content';
import { PACKAGE_ORDER, calculateQuote, formatIdr } from '../utils/booking';

interface PackagesFaqSectionProps {
  lang: Lang;
  onOpenBooking: (preset?: PackageItemKey[]) => void;
}

export function PackagesFaqSection({ lang, onOpenBooking }: PackagesFaqSectionProps) {
  const tp = COPY[lang].packages;
  const tf = COPY[lang].faq;
  const [openPkg, setOpenPkg] = useState<string>('weekend');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const weekendQuote = calculateQuote(new Set(['villa', 'forest', 'workshop']), 2, 1, lang);

  return (
    <>
      {/* Curated Packages Catalog */}
      <section id="paket" className="py-18 lg:py-24 bg-[#F3ECE4] border-b border-[#E6D6C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#8E0002]">
              {tp.kicker}
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-[#1D1D1D] tracking-tight text-balance">
              {tp.heading}
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1D]/75 leading-relaxed">
              {tp.subheading}
            </p>

            {/* Maroon-Wine Gradient Highlight Card */}
            <div className="mt-7 rounded-2xl bg-maroon-wine-v text-[#FBF7F2] p-6 sm:p-7 border border-[#541F2B]">
              <h3 className="font-display text-base font-bold text-[#E5A04B]">
                {tp.savingsTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F3ECE4]/90">
                {tp.savingsBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#E5A04B] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onOpenBooking(['villa', 'forest', 'workshop'])}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#FBF7F2] hover:bg-[#FFF4E6] text-[#541F2B] font-display font-bold text-sm px-5 py-3 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#8E0002]" />
                {tp.customCta}
              </button>
            </div>
          </div>

          {/* Right Package Accordion List */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* Featured Weekend Bundle */}
            <div className="rounded-2xl bg-white border-2 border-[#8E0002] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenPkg(openPkg === 'weekend' ? '' : 'weekend')}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                aria-expanded={openPkg === 'weekend'}
              >
                <div className="min-w-0">
                  <div className="font-display text-xs font-bold text-[#C0700F]">
                    ★ {tp.popularLabel}
                  </div>
                  <div className="mt-1 font-display text-lg sm:text-xl font-extrabold text-[#1D1D1D]">
                    {tp.weekendTitle}
                  </div>
                  <div className="text-xs sm:text-sm text-[#7D6D57] mt-0.5">
                    {tp.weekendSub}
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="block text-[11px] text-[#7D6D57]">
                      2 {lang === 'id' ? 'tamu · 1 malam' : 'guests · 1 night'}
                    </span>
                    <span className="font-display text-lg font-extrabold text-[#8E0002] tabular-nums">
                      {formatIdr(weekendQuote.total)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#541F2B] transition-transform duration-200 ${
                      openPkg === 'weekend' ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {openPkg === 'weekend' && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E6D6C8] bg-[#FFF4E6]/45">
                  <p className="text-xs font-medium text-[#7D6D57] mb-3">{tp.weekendMeta}</p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#1D1D1D]/85">
                    {tp.weekendFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#8E0002] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="sm:hidden font-display text-lg font-extrabold text-[#8E0002] tabular-nums">
                      {formatIdr(weekendQuote.total)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(['villa', 'forest', 'workshop'])}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white font-display font-semibold text-sm px-5 py-2.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {tp.bookPkgBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Individual Experience Packages */}
            {PACKAGE_ORDER.map((key, idx) => {
              const item = BOOKING_ITEMS[key];
              const loc = item[lang];
              const isOpen = openPkg === key;

              return (
                <div
                  key={key}
                  className="rounded-2xl bg-white border border-[#E6D6C8] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenPkg(isOpen ? '' : key)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-[#F3ECE4] border border-[#E6D6C8] text-[#A94332] font-display text-xs font-bold inline-flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display text-base sm:text-lg font-bold text-[#1D1D1D]">
                          {loc.title}
                        </div>
                        <div className="text-xs sm:text-sm text-[#7D6D57] mt-0.5">
                          {loc.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="block text-[11px] text-[#7D6D57]">{loc.unit}</span>
                        <span className="font-display text-base font-extrabold text-[#541F2B] tabular-nums">
                          {formatIdr(item.price)}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#7D6D57] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-3 border-t border-[#E6D6C8] bg-[#FBF7F2]">
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#1D1D1D]/85">
                        {loc.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#A94332] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="sm:hidden font-display text-base font-extrabold text-[#541F2B] tabular-nums">
                          {formatIdr(item.price)}{' '}
                          <span className="text-xs font-normal text-[#7D6D57]">
                            / {loc.unit}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenBooking([key])}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#541F2B] hover:bg-[#8E0002] text-white font-display font-semibold text-xs sm:text-sm px-4 py-2.5 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {tp.bookPkgBtn}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practical Visitor FAQ */}
      <section id="faq" className="py-18 lg:py-22 bg-[#FBF7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#A94332]">
              {tf.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[#1D1D1D] tracking-tight">
              {tf.heading}
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#E6D6C8] border-y border-[#E6D6C8]">
            {tf.items.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-bold text-[#1D1D1D]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8E0002] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-[14.5px] text-[#1D1D1D]/80 leading-relaxed pr-8">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
