import { useState } from 'react';
import {
  MapPin,
  ChevronDown,
  Check,
  ExternalLink,
  CalendarDays,
  MessageCircle,
} from 'lucide-react';
import {
  BOOKING_ITEMS,
  CONTACT,
  COPY,
  Lang,
  PackageItemKey,
  PHOTOS,
} from '../data/content';
import { formatIdr } from '../utils/booking';
import { ResilientImage } from './ResilientImage';

interface DestinationsSectionProps {
  lang: Lang;
  onOpenBooking: (preset?: PackageItemKey[]) => void;
}

export function DestinationsSection({ lang, onOpenBooking }: DestinationsSectionProps) {
  const t = COPY[lang].destinations;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    villa: true,
    bamboo: false,
    pasar: false,
  });

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section id="destinasi" className="py-18 lg:py-24 bg-[#FBF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E6D6C8]">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#A94332]">
              {t.kicker}
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-[#1D1D1D] tracking-tight text-balance">
              {t.heading}
            </h2>
          </div>
          <p className="text-[15px] text-[#7D6D57] max-w-md leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 01. Marquee Feature Card: Villa Ndalem Riyartan (Asymmetric 2-Col Split) */}
        <article
          id="villa"
          className="mt-10 grid lg:grid-cols-12 rounded-2xl overflow-hidden bg-white border border-[#E6D6C8]"
        >
          <div className="lg:col-span-6 relative min-h-[290px] sm:min-h-[380px] bg-[#F3ECE4] group">
            <ResilientImage
              src={PHOTOS.villaPool}
              alt="Villa Ndalem Riyartan Joglo architecture and swimming pool"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#1D1D1D]/75 backdrop-blur-xs text-[#FBF7F2] px-4 py-2.5 rounded-lg text-xs font-medium">
              <span className="truncate">
                Bulaksalak, Wukirsari, Cangkringan, Sleman
              </span>
              <span className="font-display font-bold text-[#F78F34] shrink-0 ml-3 tabular-nums">
                4.8 ★
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-display font-semibold text-[#A94332]">
                01 · {t.cards.villa.meta}
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-[28px] font-extrabold text-[#1D1D1D]">
                {t.cards.villa.title}
              </h3>
              <p className="mt-3 text-[15px] text-[#1D1D1D]/80 leading-relaxed">
                {t.cards.villa.summary}
              </p>

              <button
                type="button"
                onClick={() => toggle('villa')}
                className="mt-5 inline-flex items-center gap-2 text-xs font-display font-semibold text-[#541F2B] hover:text-[#8E0002] transition-colors cursor-pointer"
                aria-expanded={expanded.villa}
              >
                {expanded.villa ? t.hideDetails : t.showDetails}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expanded.villa ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expanded.villa && (
                <ul className="mt-4 pt-4 border-t border-[#E6D6C8] space-y-2.5 text-sm text-[#1D1D1D]/85">
                  {t.cards.villa.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 text-[#8E0002] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-7 pt-5 border-t border-[#E6D6C8] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#7D6D57]">
                  {t.cards.villa.pricePrefix}
                </span>
                <span className="font-display text-xl font-extrabold text-[#541F2B] tabular-nums">
                  {formatIdr(BOOKING_ITEMS.villa.price)}{' '}
                  <span className="text-xs font-medium text-[#7D6D57]">
                    / {BOOKING_ITEMS.villa[lang].unit}
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={CONTACT.maps.villa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6D6C8] hover:border-[#541F2B] px-3.5 py-2.5 text-xs font-display font-semibold text-[#541F2B] transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#A94332]" />
                  {t.openMaps}
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenBooking(['villa'])}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white px-4 py-2.5 text-xs font-display font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {t.bookThis}
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* 02 & 03: Two Complementary Destination Cards */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {/* 02. Desa Wisata Bambu Bulaksalak */}
          <article
            id="bambu"
            className="rounded-2xl overflow-hidden bg-white border border-[#E6D6C8] flex flex-col"
          >
            <div className="relative h-64 sm:h-72 bg-[#F3ECE4] group overflow-hidden">
              <ResilientImage
                src={PHOTOS.bambooForest}
                alt="Desa Wisata Bambu Bulaksalak 3-hectare bamboo forest"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-display font-semibold text-[#A94332]">
                  02 · {t.cards.bamboo.meta}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-[#1D1D1D]">
                  {t.cards.bamboo.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-[#1D1D1D]/80 leading-relaxed">
                  {t.cards.bamboo.summary}
                </p>

                <button
                  type="button"
                  onClick={() => toggle('bamboo')}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-display font-semibold text-[#541F2B] hover:text-[#8E0002] transition-colors cursor-pointer"
                  aria-expanded={expanded.bamboo}
                >
                  {expanded.bamboo ? t.hideDetails : t.showDetails}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expanded.bamboo ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expanded.bamboo && (
                  <ul className="mt-4 pt-4 border-t border-[#E6D6C8] space-y-2 text-sm text-[#1D1D1D]/85">
                    {t.cards.bamboo.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#A94332] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E6D6C8] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="block text-xs text-[#7D6D57]">
                    {t.cards.bamboo.pricePrefix}
                  </span>
                  <span className="font-display text-lg font-extrabold text-[#541F2B] tabular-nums">
                    {formatIdr(BOOKING_ITEMS.forest.price)}{' '}
                    <span className="text-xs font-medium text-[#7D6D57]">
                      / {BOOKING_ITEMS.forest[lang].unit}
                    </span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={CONTACT.maps.bamboo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6D6C8] hover:border-[#541F2B] px-3 py-2 text-xs font-display font-semibold text-[#541F2B] transition-colors whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#A94332]" />
                    Maps
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenBooking(['forest', 'workshop'])}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white px-4 py-2 text-xs font-display font-semibold transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {t.bookThis}
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* 03. Pasar Sor Pring */}
          <article className="rounded-2xl overflow-hidden bg-white border border-[#E6D6C8] flex flex-col">
            <div className="relative h-64 sm:h-72 bg-[#F3ECE4] group overflow-hidden">
              <ResilientImage
                src={PHOTOS.pasarMarket}
                alt="Pasar Sor Pring bustling traditional culinary and cultural market beneath bamboo trees"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-display font-semibold text-[#C0700F]">
                  03 · {t.cards.pasar.meta}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-[#1D1D1D]">
                  {t.cards.pasar.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-[#1D1D1D]/80 leading-relaxed">
                  {t.cards.pasar.summary}
                </p>

                <button
                  type="button"
                  onClick={() => toggle('pasar')}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-display font-semibold text-[#541F2B] hover:text-[#8E0002] transition-colors cursor-pointer"
                  aria-expanded={expanded.pasar}
                >
                  {expanded.pasar ? t.hideDetails : t.showDetails}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expanded.pasar ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expanded.pasar && (
                  <ul className="mt-4 pt-4 border-t border-[#E6D6C8] space-y-2 text-sm text-[#1D1D1D]/85">
                    {t.cards.pasar.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#CF7440] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E6D6C8] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={CONTACT.maps.pasar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6D6C8] hover:border-[#541F2B] px-3 py-2 text-xs font-display font-semibold text-[#541F2B] transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#A94332]" />
                  {t.openMaps}
                </a>
                <a
                  href="#pasar"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#CF7440] hover:bg-[#A94332] text-white px-4 py-2 text-xs font-display font-semibold transition-colors whitespace-nowrap"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  {t.cards.pasar.scheduleCta}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
