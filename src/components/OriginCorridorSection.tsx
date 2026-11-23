import { ExternalLink, Compass, BookOpen } from 'lucide-react';
import { CONTACT, COPY, Lang, NEARBY_LANDMARKS, PHOTOS } from '../data/content';
import { ResilientImage } from './ResilientImage';

interface OriginCorridorSectionProps {
  lang: Lang;
}

export function OriginCorridorSection({ lang }: OriginCorridorSectionProps) {
  const t = COPY[lang].story;

  return (
    <section id="kisah" className="py-18 lg:py-24 bg-[#F3ECE4] border-y border-[#E6D6C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Narrative + Real Merapi Panorama */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#8E0002]">
              {t.kicker}
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-[#1D1D1D] tracking-tight text-balance">
              {t.heading}
            </h2>
            <p className="mt-5 text-[15px] text-[#1D1D1D]/80 leading-[1.75]">
              {t.lead}
            </p>

            {/* National Geographic Indonesia Editorial Proof Block */}
            <div className="mt-8 rounded-xl bg-[#FBF7F2] border border-[#E6D6C8] p-6">
              <div className="flex items-center gap-2 text-xs font-display font-semibold text-[#C0700F]">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{t.natgeoLabel}</span>
              </div>
              <h3 className="mt-2.5 font-display text-lg font-bold text-[#541F2B] leading-snug">
                {t.natgeoTitle}
              </h3>
              <p className="mt-2.5 text-sm text-[#1D1D1D]/75 leading-relaxed">
                {t.natgeoBody}
              </p>
              <a
                href={CONTACT.natgeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-display font-semibold text-[#8E0002] hover:text-[#541F2B] underline underline-offset-4 transition-colors"
              >
                {t.natgeoCta}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Documentary Photo Mosaic from Bulaksalak */}
          <div className="lg:col-span-7 space-y-4">
            <figure className="rounded-2xl overflow-hidden border border-[#E6D6C8] bg-white">
              <div className="aspect-[16/9] overflow-hidden">
                <ResilientImage
                  src={PHOTOS.merapiCorridor}
                  alt="Mount Merapi towering above green Cangkringan and Bulaksalak corridor"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs text-[#7D6D57] border-t border-[#E6D6C8]">
                {t.galleryCaptions.corridor}
              </figcaption>
            </figure>

            <div className="grid sm:grid-cols-2 gap-4">
              <figure className="rounded-2xl overflow-hidden border border-[#E6D6C8] bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={PHOTOS.villaAerial}
                    alt="Aerial drone view of Villa Ndalem Riyartan surrounded by Bulaksalak bamboo canopy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-2.5 text-xs text-[#7D6D57] border-t border-[#E6D6C8]">
                  {t.galleryCaptions.aerial}
                </figcaption>
              </figure>

              <figure className="rounded-2xl overflow-hidden border border-[#E6D6C8] bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={PHOTOS.pasarCulinary}
                    alt="Sego Jagung Putih and local culinary hosts beneath Bulaksalak bamboo forest"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-2.5 text-xs text-[#7D6D57] border-t border-[#E6D6C8]">
                  {t.galleryCaptions.culinary}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Real Merapi Tourism Corridor Nearby Landmarks */}
        <div className="mt-14 pt-10 border-t border-[#D9D4CF]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-display font-semibold text-[#A94332]">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Cangkringan · Sleman Utara</span>
              </div>
              <h3 className="mt-1.5 font-display text-2xl font-extrabold text-[#1D1D1D]">
                {t.corridorHeading}
              </h3>
            </div>
            <p className="text-sm text-[#7D6D57] max-w-md">{t.corridorSub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {NEARBY_LANDMARKS.map((spot) => (
              <div
                key={spot.name}
                className="rounded-xl bg-[#FBF7F2] border border-[#E6D6C8] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="font-display text-sm font-bold text-[#1D1D1D] leading-snug">
                    {spot.name}
                  </div>
                  <div className="mt-1 text-xs text-[#7D6D57]">
                    {lang === 'id' ? spot.categoryId : spot.categoryEn}
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#E6D6C8] font-display text-xs font-semibold text-[#8E0002] tabular-nums">
                  {lang === 'id' ? spot.distanceId : spot.distanceEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
