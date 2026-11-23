import { useState, useEffect, useCallback } from 'react';
import { Lang, PackageItemKey } from './data/content';
import { getMarketState, splitDuration } from './utils/mingguKliwon';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationsSection } from './components/DestinationsSection';
import { OriginCorridorSection } from './components/OriginCorridorSection';
import { PasarTrackerSection } from './components/PasarTrackerSection';
import { TrailMapSection } from './components/TrailMapSection';
import { PackagesFaqSection } from './components/PackagesFaqSection';
import { BookingModal } from './components/BookingModal';
import { FooterAndQuickWa } from './components/FooterAndQuickWa';

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('srawung-lang');
      return saved === 'en' ? 'en' : 'id';
    } catch {
      return 'id';
    }
  });

  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<PackageItemKey[]>(['villa', 'forest']);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('srawung-lang', lang);
    } catch {
      // ignore storage failure in private frames
    }
  }, [lang]);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const notify = useCallback((msg: string) => {
    setToastMsg(msg);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const t = window.setTimeout(() => setToastMsg(null), 2800);
    return () => window.clearTimeout(t);
  }, [toastMsg]);

  const openBooking = useCallback((preset?: PackageItemKey[]) => {
    if (preset && preset.length > 0) {
      setBookingPreset(preset);
    }
    setBookingOpen(true);
  }, []);

  const marketState = getMarketState(nowMs);
  const countdown = splitDuration(marketState.targetMs - nowMs);

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#1D1D1D] flex flex-col">
      <Navbar
        lang={lang}
        onChangeLang={setLang}
        marketState={marketState}
        countdown={countdown}
        onOpenBooking={openBooking}
      />

      <main className="flex-1">
        <HeroSection lang={lang} />
        <DestinationsSection lang={lang} onOpenBooking={openBooking} />
        <OriginCorridorSection lang={lang} />
        <PasarTrackerSection
          lang={lang}
          nowMs={nowMs}
          marketState={marketState}
          countdown={countdown}
          onNotify={notify}
        />
        <TrailMapSection lang={lang} onNotify={notify} />
        <PackagesFaqSection lang={lang} onOpenBooking={openBooking} />
      </main>

      <FooterAndQuickWa
        lang={lang}
        onOpenBooking={openBooking}
        onNotify={notify}
      />

      <BookingModal
        open={bookingOpen}
        preset={bookingPreset}
        lang={lang}
        onClose={() => setBookingOpen(false)}
        onNotify={notify}
      />

      {/* Non-intrusive bottom toast */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-[#1D1D1D] text-[#FBF7F2] font-display text-xs sm:text-sm font-medium px-4 py-2.5 shadow-xl max-w-[90vw] text-center"
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
