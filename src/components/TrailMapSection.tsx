import { useState, useRef, useEffect, PointerEvent as ReactPointerEvent } from 'react';
import {
  Footprints,
  Plus,
  Minus,
  RotateCcw,
  Check,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { CONTACT, COPY, Lang, PHOTOS } from '../data/content';
import { ResilientImage } from './ResilientImage';

interface TrailMapSectionProps {
  lang: Lang;
  onNotify: (msg: string) => void;
}

type PinId = 'villa' | 'bambu' | 'pasar' | 'parkir' | 'fasilitas';

interface MapPinConfig {
  id: PinId;
  x: number;
  y: number;
  code: string;
  color: string;
  labelOffsetY: number;
}

const MAP_PINS: MapPinConfig[] = [
  { id: 'villa', x: 226, y: 150, code: 'V', color: '#8E0002', labelOffsetY: 18 },
  { id: 'bambu', x: 454, y: 300, code: 'B', color: '#541F2B', labelOffsetY: 18 },
  { id: 'pasar', x: 372, y: 226, code: 'P', color: '#CF7440', labelOffsetY: -44 },
  { id: 'parkir', x: 146, y: 102, code: 'PK', color: '#7D6D57', labelOffsetY: 18 },
  { id: 'fasilitas', x: 316, y: 118, code: 'M', color: '#A94332', labelOffsetY: 18 },
];

const WALK_PATH_D = 'M226 178 C 242 238, 298 248, 344 262 S 414 298, 450 304';

export function TrailMapSection({ lang, onNotify }: TrailMapSectionProps) {
  const t = COPY[lang].trail;
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const [checkedPins, setCheckedPins] = useState<Set<PinId>>(() => new Set(['villa']));
  const [selectedPin, setSelectedPin] = useState<PinId>('villa');
  const [walking, setWalking] = useState(false);
  const [walkDone, setWalkDone] = useState(false);
  const [walkProgress, setWalkProgress] = useState(0); // 0..1
  const [walkerPos, setWalkerPos] = useState({ x: 226, y: 178 });
  const [pathLen, setPathLen] = useState(290);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLen(len);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const clampPan = (x: number, y: number, z: number) => {
    const maxX = 300 * (z - 1);
    const maxY = 200 * (z - 1);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleZoom = (delta: number) => {
    setZoom((prev) => {
      const next = Math.max(1, Math.min(2.2, +(prev + delta).toFixed(2)));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (zoom <= 1) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragRef.current || !svgRef.current) return;
    const scale = 600 / svgRef.current.clientWidth;
    const dx = (e.clientX - dragRef.current.startX) * scale;
    const dy = (e.clientY - dragRef.current.startY) * scale;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      dragRef.current.moved = true;
    }
    setPan(clampPan(dragRef.current.originX + dx, dragRef.current.originY + dy, zoom));
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const togglePin = (id: PinId, forceOn?: boolean) => {
    setSelectedPin(id);
    setCheckedPins((prev) => {
      const next = new Set(prev);
      const isOn = forceOn !== undefined ? forceOn : !next.has(id);
      if (isOn) next.add(id);
      else next.delete(id);

      if (forceOn === undefined) {
        const label = t.pins[id].label;
        if (isOn && next.size === MAP_PINS.length) {
          onNotify(t.allCheckedToast);
        } else if (isOn) {
          onNotify(`${label} ✓`);
        }
      }
      return next;
    });
  };

  const startWalkSimulation = () => {
    if (walking || !pathRef.current) return;
    setWalking(true);
    setWalkDone(false);
    togglePin('villa', true);

    const len = pathRef.current.getTotalLength();
    setPathLen(len);
    const startTime = performance.now();
    const duration = 5600;

    const tick = (now: number) => {
      const raw = Math.min(1, (now - startTime) / duration);
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      if (pathRef.current) {
        const pt = pathRef.current.getPointAtLength(eased * len);
        setWalkerPos({ x: pt.x, y: pt.y });
      }
      setWalkProgress(eased);

      if (raw < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setWalking(false);
        setWalkDone(true);
        togglePin('bambu', true);
        onNotify(t.walkCompleteToast);
      }
    };

    animRef.current = requestAnimationFrame(tick);
  };

  const meters = Math.round(walkProgress * 87);
  const steps = Math.round((walkProgress * 87) / 0.72);

  return (
    <section id="peta" className="py-18 lg:py-24 bg-[#FBF7F2] border-b border-[#E6D6C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#A94332]">
            {t.kicker}
          </p>
          <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-[#1D1D1D] tracking-tight text-balance">
            {t.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[#7D6D57] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Restyled Interactive 87m Village Trail Map */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E6D6C8] p-4 sm:p-5">
            <div className="relative rounded-xl overflow-hidden border border-[#E6D6C8] bg-[#F3ECE4]">
              <svg
                ref={svgRef}
                viewBox="0 0 600 400"
                className={`block w-full h-auto select-none ${
                  zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                role="img"
                aria-label="Interactive 87m walking trail map from Villa Ndalem Riyartan to Bulaksalak Bamboo Forest"
              >
                <g
                  transform={`translate(${300 + pan.x} ${200 + pan.y}) scale(${zoom}) translate(-300 -200)`}
                >
                  {/* Warm parchment ground */}
                  <rect x="-250" y="-250" width="1100" height="900" fill="#F3ECE4" />

                  {/* Bamboo Forest Zone (Warm Sand / Soft Clay contour) */}
                  <path
                    d="M326 246 C 358 208, 474 200, 548 232 C 602 258, 596 346, 535 374 C 468 404, 366 394, 330 352 C 304 320, 306 276, 326 246Z"
                    fill="#E6D6C8"
                    stroke="#CF7440"
                    strokeWidth="1.4"
                    strokeDasharray="6 5"
                  />
                  {/* Subtle bamboo canopy circles */}
                  {[
                    [365, 290, 8],
                    [395, 335, 11],
                    [445, 250, 9],
                    [492, 282, 12],
                    [515, 335, 10],
                    [420, 360, 8],
                    [548, 296, 9],
                    [352, 330, 7],
                  ].map(([cx, cy, r], i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="#CF7440"
                      fillOpacity="0.18"
                    />
                  ))}
                  <text
                    x="468"
                    y="383"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#541F2B"
                    opacity="0.7"
                    fontFamily="Poppins, sans-serif"
                    letterSpacing="1.2"
                  >
                    HUTAN BAMBU (3 HA)
                  </text>

                  {/* Terraced Village Farmlands */}
                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={148 + c * 52}
                        y={282 + r * 36}
                        width="46"
                        height="30"
                        rx="4"
                        fill={(r + c) % 2 === 0 ? '#EFE6DD' : '#FBF7F2'}
                        stroke="#D8C7B6"
                        strokeWidth="1"
                      />
                    ))
                  )}

                  {/* Village Stream */}
                  <path
                    d="M-20 302 C 58 292, 88 340, 148 372 S 240 392, 262 430"
                    stroke="#D8C7B6"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M-20 302 C 58 292, 88 340, 148 372 S 240 392, 262 430"
                    stroke="#FBF7F2"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Village Houses Footprint */}
                  {[
                    [20, 92, 46, 26],
                    [78, 18, 52, 28],
                    [180, 16, 56, 28],
                    [284, 18, 44, 24],
                    [424, 16, 58, 28],
                    [518, 92, 48, 30],
                    [26, 150, 52, 34],
                    [518, 152, 46, 28],
                    [438, 102, 52, 32],
                  ].map(([x, y, w, h], idx) => (
                    <rect
                      key={idx}
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="4"
                      fill="#EAE0D5"
                      stroke="#D8C7B6"
                    />
                  ))}

                  {/* Village Road & Main Road */}
                  <path
                    d="M118 66 C 114 150, 128 250, 102 430"
                    stroke="#D9D4CF"
                    strokeWidth="14"
                    fill="none"
                  />
                  <path
                    d="M118 66 C 114 150, 128 250, 102 430"
                    stroke="#FBF7F2"
                    strokeWidth="10"
                    fill="none"
                  />

                  <path
                    id="bulaksalakRoad"
                    d="M-20 70 C 150 58, 260 84, 380 68 S 520 50, 620 62"
                    stroke="#D9D4CF"
                    strokeWidth="20"
                    fill="none"
                  />
                  <path
                    d="M-20 70 C 150 58, 260 84, 380 68 S 520 50, 620 62"
                    stroke="#FFFFFF"
                    strokeWidth="15"
                    fill="none"
                  />
                  <path
                    d="M-20 70 C 150 58, 260 84, 380 68 S 520 50, 620 62"
                    stroke="#E5A04B"
                    strokeWidth="1.4"
                    strokeDasharray="8 7"
                    fill="none"
                  />
                  <text
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#7D6D57"
                    fontFamily="Poppins, sans-serif"
                  >
                    <textPath href="#bulaksalakRoad" startOffset="60%">
                      Jl. Dusun Bulaksalak · Wukirsari
                    </textPath>
                  </text>

                  {/* Villa Ndalem Riyartan Compound */}
                  <rect
                    x="182"
                    y="116"
                    width="90"
                    height="62"
                    rx="7"
                    fill="#FFF4E6"
                    stroke="#A94332"
                    strokeWidth="1.6"
                  />
                  <path d="M194 128 h66 M194 166 h66" stroke="#E6D6C8" strokeWidth="1.5" />

                  {/* 87m Walking Path */}
                  <path
                    d={WALK_PATH_D}
                    stroke="#E6D6C8"
                    strokeWidth="13"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    ref={pathRef}
                    d={WALK_PATH_D}
                    stroke="#CF7440"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    className="walk-dots"
                  />
                  {/* Progressed Walk Trail */}
                  <path
                    d={WALK_PATH_D}
                    stroke="#8E0002"
                    strokeWidth="4.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={pathLen}
                    strokeDashoffset={pathLen * (1 - walkProgress)}
                  />

                  {/* Distance marker on path */}
                  <g transform="translate(318 270)">
                    <rect x="-24" y="-11" width="48" height="21" rx="6" fill="#541F2B" />
                    <text
                      y="3.5"
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="700"
                      fill="#FBF7F2"
                      fontFamily="Poppins, sans-serif"
                    >
                      87 m
                    </text>
                  </g>

                  {/* Interactive Landmark Pins */}
                  {MAP_PINS.map((pin) => {
                    const isChecked = checkedPins.has(pin.id);
                    const isSelected = selectedPin === pin.id;
                    return (
                      <g
                        key={pin.id}
                        transform={`translate(${pin.x} ${pin.y})`}
                        onClick={() => {
                          if (!dragRef.current?.moved) togglePin(pin.id);
                        }}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={t.pins[pin.id].label}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            togglePin(pin.id);
                          }
                        }}
                      >
                        <ellipse rx="7" ry="2.5" fill="#1D1D1D" opacity="0.18" />
                        <path
                          d="M0 0C-3-9-14-14-14-24a14 14 0 1 1 28 0C14-14 3-9 0 0Z"
                          fill={isChecked ? '#8E0002' : pin.color}
                          stroke={isSelected ? '#E5A04B' : '#FFFFFF'}
                          strokeWidth={isSelected ? '2.6' : '2'}
                        />
                        <circle cy="-24" r="9.5" fill="#FBF7F2" />
                        <text
                          y="-20.5"
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight="800"
                          fill={isChecked ? '#8E0002' : '#541F2B'}
                          fontFamily="Poppins, sans-serif"
                        >
                          {isChecked ? '✓' : pin.code}
                        </text>
                        <text
                          y={pin.labelOffsetY}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="700"
                          fill="#1D1D1D"
                          stroke="#FBF7F2"
                          strokeWidth="3.5"
                          paintOrder="stroke"
                          fontFamily="Poppins, sans-serif"
                        >
                          {t.pins[pin.id].label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Animated Walker Indicator */}
                  <g transform={`translate(${walkerPos.x} ${walkerPos.y})`}>
                    <circle
                      r="9"
                      fill="#F78F34"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    <circle r="3" fill="#541F2B" />
                  </g>
                </g>
              </svg>

              {/* Map Controls */}
              <div className="absolute top-3 right-3 flex flex-col rounded-lg bg-white/95 border border-[#E6D6C8] overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleZoom(0.3)}
                  className="w-9 h-9 inline-flex items-center justify-center text-[#541F2B] hover:bg-[#F3ECE4] transition-colors cursor-pointer"
                  aria-label="Zoom in"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="h-px bg-[#E6D6C8]" />
                <button
                  type="button"
                  onClick={() => handleZoom(-0.3)}
                  className="w-9 h-9 inline-flex items-center justify-center text-[#541F2B] hover:bg-[#F3ECE4] transition-colors cursor-pointer"
                  aria-label="Zoom out"
                >
                  <Minus className="w-4 h-4" />
                </button>
                {zoom > 1 && (
                  <>
                    <div className="h-px bg-[#E6D6C8]" />
                    <button
                      type="button"
                      onClick={resetView}
                      className="w-9 h-9 inline-flex items-center justify-center text-[#8E0002] hover:bg-[#F3ECE4] transition-colors cursor-pointer"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute bottom-3 left-3 rounded-md bg-white/95 border border-[#E6D6C8] px-2.5 py-1 text-[10.5px] font-medium text-[#7D6D57] flex items-center gap-2">
                <span className="block w-10 h-1.5 border-x border-b border-[#7D6D57]" />
                <span>{t.scaleNote}</span>
              </div>
            </div>

            {/* Walk Simulation Bar */}
            <div className="mt-5 grid sm:grid-cols-[auto_1fr] gap-4 items-center">
              <button
                type="button"
                onClick={startWalkSimulation}
                disabled={walking}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8E0002] hover:bg-[#541F2B] disabled:opacity-65 text-white font-display font-semibold text-sm px-5 py-3 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Footprints className="w-4 h-4" aria-hidden="true" />
                {walking ? t.walkingBtn : walkDone ? t.replayBtn : t.simulateBtn}
              </button>

              <div>
                <div className="flex items-center justify-between text-xs font-display font-semibold">
                  <span className="text-[#7D6D57] truncate pr-2">{t.routeLabel}</span>
                  <span className="text-[#541F2B] tabular-nums shrink-0">
                    {meters} / 87 m · {steps} {t.stepsUnit}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#F3ECE4] border border-[#E6D6C8] overflow-hidden">
                  <div
                    className="h-full bg-wine-maroon-h transition-[width] duration-75"
                    style={{ width: `${Math.round(walkProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Selected Pin Real Description */}
            <div className="mt-4 pt-4 border-t border-[#E6D6C8] flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-display font-bold text-[#541F2B]">
                  {t.pins[selectedPin].label}
                </span>
                <span className="mx-2 text-[#D9D4CF]">·</span>
                <span className="text-[#7D6D57]">{t.pins[selectedPin].desc}</span>
              </div>
              <span className="font-display font-bold text-[#8E0002] tabular-nums shrink-0">
                {checkedPins.size}/{MAP_PINS.length}
              </span>
            </div>
          </div>

          {/* Right: Checklist + Real Trail Photography + Direct Google Maps Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Visit Checklist */}
            <div className="rounded-2xl bg-white border border-[#E6D6C8] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-[#1D1D1D]">
                  {t.checkinsTitle}
                </h3>
                <span className="font-display text-xs font-bold text-[#8E0002] tabular-nums">
                  {checkedPins.size}/{MAP_PINS.length}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#7D6D57]">{t.checkinsHint}</p>

              <div className="mt-4 space-y-2">
                {MAP_PINS.map((pin) => {
                  const isOn = checkedPins.has(pin.id);
                  return (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => togglePin(pin.id)}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors cursor-pointer ${
                        isOn
                          ? 'bg-[#FFF4E6] border-[#CF7440] text-[#541F2B]'
                          : 'bg-[#FBF7F2] border-[#E6D6C8] text-[#1D1D1D] hover:border-[#A94332]'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md inline-flex items-center justify-center shrink-0 text-xs font-display font-bold ${
                          isOn
                            ? 'bg-[#8E0002] text-white'
                            : 'bg-white border border-[#E6D6C8] text-[#7D6D57]'
                        }`}
                      >
                        {isOn ? <Check className="w-3.5 h-3.5" /> : pin.code}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-xs font-bold truncate">
                          {t.pins[pin.id].label}
                        </span>
                        <span className="block text-[11px] text-[#7D6D57] truncate">
                          {t.pins[pin.id].desc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real Trail Photos + Official Google Maps Directions */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-[#E6D6C8] aspect-[4/3]">
                <ResilientImage
                  src={PHOTOS.bambooTrail}
                  alt="Visitors walking along the green bamboo canopy trail in Bulaksalak"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E6D6C8] aspect-[4/3]">
                <ResilientImage
                  src={PHOTOS.heritageWalk}
                  alt="Guided heritage walk through Bulaksalak village bamboo forest"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-[#F3ECE4] border border-[#E6D6C8] p-5">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#541F2B]">
                {t.realMapsTitle}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: 'Villa Ndalem Riyartan', href: CONTACT.maps.villa },
                  { label: 'Hutan Bambu Bulaksalak', href: CONTACT.maps.bamboo },
                  { label: 'Pasar Sor Pring', href: CONTACT.maps.pasar },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#E6D6C8] hover:border-[#8E0002] px-3 py-2 text-xs font-display font-semibold text-[#541F2B] hover:text-[#8E0002] transition-colors whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#A94332]" />
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-65" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
