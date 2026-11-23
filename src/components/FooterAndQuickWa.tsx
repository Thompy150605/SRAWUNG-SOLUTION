import { useState } from 'react';
import {
  MapPin,
  MessageCircle,
  ExternalLink,
  X,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { CONTACT, COPY, Lang, PackageItemKey } from '../data/content';
import { buildWhatsAppUrl } from '../utils/booking';

interface FooterAndQuickWaProps {
  lang: Lang;
  onOpenBooking: (preset?: PackageItemKey[]) => void;
  onNotify: (msg: string) => void;
}

export function FooterAndQuickWa({
  lang,
  onOpenBooking,
  onNotify,
}: FooterAndQuickWaProps) {
  const tf = COPY[lang].footer;
  const tq = COPY[lang].quickSheet;
  const tn = COPY[lang].nav;
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#541F2B] text-[#FBF7F2] border-t border-[#8E0002]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2.5 font-display font-extrabold text-xl tracking-[0.14em] text-white">
              <svg className="w-7 h-7" viewBox="0 0 48 48" aria-hidden="true">
                <rect width="48" height="48" rx="10" fill="#8E0002" />
                <path
                  d="M16 36V15M24 38V11M32 35V17"
                  stroke="#FBF7F2"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                />
                <path
                  d="M24 16c4-5 8.5-6 12.5-5-2.5 4.2-6.8 6-12.5 5z"
                  fill="#E5A04B"
                />
              </svg>
              SRAWUNG
            </div>
            <p className="mt-2 font-display text-xs font-medium text-[#E5A04B]">
              {tf.tagline}
            </p>
            <p className="mt-4 text-sm text-[#F3ECE4]/85 leading-relaxed max-w-md">
              {tf.quote}
            </p>
            <p className="mt-4 flex items-start gap-2 text-xs text-[#D8C7B6] leading-relaxed">
              <MapPin className="w-4 h-4 text-[#E5A04B] shrink-0 mt-0.5" />
              <span>{CONTACT.address}</span>
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[#E5A04B]">
              {tf.exploreTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-[#F3ECE4]/85">
              <li>
                <a href="#destinasi" className="hover:text-[#E5A04B] transition-colors">
                  {tn.destinations}
                </a>
              </li>
              <li>
                <a href="#kisah" className="hover:text-[#E5A04B] transition-colors">
                  {tn.story}
                </a>
              </li>
              <li>
                <a href="#pasar" className="hover:text-[#E5A04B] transition-colors">
                  {tn.market}
                </a>
              </li>
              <li>
                <a href="#peta" className="hover:text-[#E5A04B] transition-colors">
                  {tn.trail}
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-[#E5A04B] transition-colors">
                  {tn.packages}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[#E5A04B]">
              {tf.visitTitle}
            </h4>
            <button
              type="button"
              onClick={() => onOpenBooking(['villa', 'forest'])}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#FBF7F2] hover:bg-[#FFF4E6] text-[#541F2B] font-display font-semibold text-sm px-5 py-2.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#8E0002]" />
              {tf.waCta}
            </button>

            <div className="mt-5 flex flex-wrap gap-3 text-xs font-display font-medium text-[#D8C7B6]">
              <a
                href={CONTACT.maps.village}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white underline underline-offset-4"
              >
                Google Maps <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={CONTACT.natgeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white underline underline-offset-4"
              >
                National Geographic ID <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#D8C7B6]">
            <span>
              © {new Date().getFullYear()} {tf.copyright}
            </span>
            <span>{CONTACT.domain}</span>
          </div>
        </div>
      </footer>

      {/* Floating Quick WhatsApp Action Button */}
      <button
        type="button"
        onClick={() => setSheetOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#8E0002] hover:bg-[#541F2B] text-white shadow-lg inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E0002]"
        aria-label={tq.title}
        aria-expanded={sheetOpen}
      >
        {sheetOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Quick WhatsApp Sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            className="absolute inset-0 bg-[#1D1D1D]/20 sm:bg-transparent pointer-events-auto"
            onClick={() => setSheetOpen(false)}
          />
          <div className="pointer-events-auto fixed bottom-22 right-4 left-4 sm:left-auto sm:right-5 sm:w-[360px] rounded-2xl bg-white border border-[#E6D6C8] shadow-2xl overflow-hidden">
            <div className="bg-wine-maroon-h text-[#FBF7F2] px-5 py-4 flex items-center justify-between">
              <div>
                <div className="font-display text-sm font-bold">{tq.title}</div>
                <div className="text-[11px] text-[#F3ECE4]/80">{tq.subtitle}</div>
              </div>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 inline-flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 space-y-2">
              {tq.templates.map((tpl) => (
                <a
                  key={tpl.id}
                  href={buildWhatsAppUrl(tpl.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setSheetOpen(false);
                    onNotify(COPY[lang].modal.openingWaToast);
                  }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[#E6D6C8] hover:border-[#8E0002] bg-[#FBF7F2] p-3 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="font-display text-xs font-bold text-[#1D1D1D] group-hover:text-[#8E0002]">
                      {tpl.title}
                    </div>
                    <div className="text-[11px] text-[#7D6D57] truncate mt-0.5">
                      {tpl.preview}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#CF7440] shrink-0" />
                </a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setSheetOpen(false);
                  onOpenBooking(['villa', 'forest']);
                }}
                className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#8E0002] hover:bg-[#541F2B] text-white font-display font-semibold text-xs py-3 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {tq.customBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
