import { useState, useEffect } from 'react';
import { Menu, X, CalendarDays, MessageCircle } from 'lucide-react';
import { COPY, Lang, PackageItemKey } from '../data/content';
import { CountdownParts, MarketState, pad2 } from '../utils/mingguKliwon';

interface NavbarProps {
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
  marketState: MarketState;
  countdown: CountdownParts;
  onOpenBooking: (preset?: PackageItemKey[]) => void;
}

export function Navbar({
  lang,
  onChangeLang,
  marketState,
  countdown,
  onOpenBooking,
}: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = COPY[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const shortCountdown =
    (countdown.days > 0 ? `${countdown.days}${lang === 'id' ? 'h ' : 'd '}` : '') +
    `${pad2(countdown.hours)}:${pad2(countdown.minutes)}:${pad2(countdown.seconds)}`;

  const navLinks = [
    { href: '#destinasi', label: t.nav.destinations },
    { href: '#kisah', label: t.nav.story },
    { href: '#pasar', label: t.nav.market },
    { href: '#peta', label: t.nav.trail },
    { href: '#paket', label: t.nav.packages },
  ];

  return (
    <>
      {/* Slim Top Utility Strip: Live Minggu Kliwon Countdown + Bilingual ID/EN Switcher */}
      <div className="bg-[#541F2B] text-[#FBF7F2] text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-9 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0 truncate">
            <CalendarDays className="w-3.5 h-3.5 text-[#E5A04B] shrink-0" aria-hidden="true" />
            <span className="truncate font-body">
              {marketState.isOpen ? t.topBar.openLabel : t.topBar.nextLabel}{' '}
              <strong className="font-display font-semibold text-[#E5A04B] tabular-nums">
                {shortCountdown}
              </strong>
            </span>
            <a
              href="#pasar"
              className="hidden md:inline font-display font-semibold text-[#FFF4E6] underline decoration-[#E5A04B]/60 underline-offset-4 hover:text-[#E5A04B] whitespace-nowrap shrink-0 transition-colors"
            >
              {t.topBar.viewSchedule}
            </a>
          </div>

          <div
            className="flex items-center gap-1 bg-black/25 p-0.5 rounded-md shrink-0"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              onClick={() => onChangeLang('id')}
              className={`px-2 py-0.5 rounded text-[11px] font-display font-semibold transition-colors whitespace-nowrap ${
                lang === 'id'
                  ? 'bg-[#FBF7F2] text-[#541F2B]'
                  : 'text-[#D8C7B6] hover:text-white'
              }`}
              aria-pressed={lang === 'id'}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-display font-semibold transition-colors whitespace-nowrap ${
                lang === 'en'
                  ? 'bg-[#FBF7F2] text-[#541F2B]'
                  : 'text-[#D8C7B6] hover:text-white'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Sticky 3-Zone Top Bar */}
      <header
        className={`sticky top-0 z-40 bg-[#FBF7F2]/95 backdrop-blur-md border-b border-[#E6D6C8] transition-shadow duration-200 ${
          scrolled ? 'shadow-[0_6px_24px_-12px_rgba(84,31,43,0.18)]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#beranda"
            className="inline-flex items-center gap-2.5 text-[#8E0002] font-display font-extrabold text-xl tracking-[0.14em] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E0002]"
            aria-label="SRAWUNG Home"
          >
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
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
          </a>

          {/* Zone 2: 5 Concise Single-Line Text Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-display font-semibold text-[#541F2B]"
            aria-label="Primary navigation"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 whitespace-nowrap shrink-0 text-[#541F2B]/85 hover:text-[#8E0002] transition-colors after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-[#8E0002] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking(['villa', 'forest'])}
              className="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white font-display font-semibold text-sm px-5 py-2.5 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E0002]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t.nav.bookCta}
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E6D6C8] bg-white text-[#541F2B] hover:border-[#8E0002] transition-colors"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-[#1D1D1D]/45 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative bg-[#FBF7F2] border-b border-[#E6D6C8] shadow-xl px-5 pt-4 pb-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D6C8]">
              <span className="font-display font-extrabold text-lg tracking-[0.14em] text-[#8E0002]">
                SRAWUNG
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E6D6C8] bg-white text-[#541F2B]"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-4 flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="px-3 py-3 rounded-lg font-display font-semibold text-base text-[#1D1D1D] hover:bg-[#F3ECE4] hover:text-[#8E0002] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 pt-4 border-t border-[#E6D6C8] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenBooking(['villa', 'forest']);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] text-white font-display font-semibold text-sm px-5 py-3 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.nav.bookCta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
