import { ArrowRight, CalendarDays, Footprints } from 'lucide-react';
import { COPY, Lang, PHOTOS } from '../data/content';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = COPY[lang].hero;

  return (
    <section id="beranda" className="relative bg-[#FBF7F2] border-b border-[#E6D6C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14 lg:pt-14 lg:pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="font-display text-xs sm:text-[13px] font-semibold tracking-wide text-[#A94332]">
                {t.kicker}
              </p>

              <h1 className="mt-4 font-display font-extrabold text-[#1D1D1D] tracking-tight text-balance leading-[1.08] text-[clamp(2.25rem,3.9vw,3.5rem)]">
                {t.titleLine1}
                <span className="block text-[#8E0002] mt-1">{t.titleLine2}</span>
              </h1>

              <p className="mt-6 text-[15.5px] sm:text-base leading-[1.7] text-[#1D1D1D]/80 max-w-xl">
                {t.subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <a
                  href="#paket"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white font-display font-semibold text-sm sm:text-[15px] px-6 py-3.5 transition-colors duration-200 whitespace-nowrap"
                >
                  {t.primaryCta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#pasar"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#541F2B]/30 bg-white hover:border-[#8E0002] hover:text-[#8E0002] text-[#541F2B] font-display font-semibold text-sm sm:text-[15px] px-5 py-3.5 transition-colors duration-200 whitespace-nowrap"
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  {t.secondaryCta}
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E6D6C8]">
              <a
                href="#peta"
                className="group inline-flex items-center gap-3 text-sm font-display font-semibold text-[#541F2B] hover:text-[#8E0002] transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-[#F3ECE4] border border-[#E6D6C8] inline-flex items-center justify-center text-[#8E0002] group-hover:bg-[#8E0002] group-hover:text-white transition-colors">
                  <Footprints className="w-4 h-4" aria-hidden="true" />
                </span>
                <span>{t.walkJump}</span>
                <ArrowRight
                  className="w-4 h-4 text-[#CF7440] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Right Real Photography Anchor */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[340px] sm:min-h-[430px] rounded-2xl overflow-hidden border border-[#E6D6C8] bg-[#F3ECE4]">
              <ResilientImage
                src={PHOTOS.villaPool}
                alt="Villa Ndalem Riyartan Javanese Joglo pavilion and pool surrounded by bamboo in Bulaksalak"
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1D1D1D]/85 via-[#1D1D1D]/40 to-transparent px-5 pt-16 pb-5">
                <p className="font-body text-xs sm:text-[13px] font-medium text-[#FBF7F2]/95">
                  {t.photoCaption}
                </p>
              </div>
            </div>

            {/* Quiet Real Secondary Strip */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-[#E6D6C8]">
                <ResilientImage
                  src={PHOTOS.pasarMarket}
                  alt="Pasar Sor Pring traditional market beneath Bulaksalak bamboo forest"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 py-2">
                  <span className="font-display text-[11px] font-semibold text-white">
                    Pasar Sor Pring
                  </span>
                </div>
              </div>
              <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-[#E6D6C8]">
                <ResilientImage
                  src={PHOTOS.bambooForest}
                  alt="Visitors exploring Bulaksalak Bamboo Forest conservation village"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 py-2">
                  <span className="font-display text-[11px] font-semibold text-white">
                    Hutan Bambu Bulaksalak
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Real Destination Facts Row */}
        <div className="mt-12 pt-8 border-t border-[#E6D6C8] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.stats.map((stat, idx) => (
            <div
              key={idx}
              className={idx > 0 ? 'lg:border-l lg:border-[#E6D6C8] lg:pl-8' : ''}
            >
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#8E0002] tabular-nums">
                {stat.value}
              </div>
              <p className="mt-1 text-xs sm:text-[13px] text-[#7D6D57] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
