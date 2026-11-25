import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LOMEKA_CATEGORIES = [
  {
    number: '01',
    label: 'T-Shirts',
    slug: 't-shirts',
    image: '/img5.png',
    alt: 'LOMEKA wholesale T-Shirts',
    tagline: 'Everyday essentials',
    detail:
      'Crew-neck, oversized, polo and custom GSM tees for men and women — ready for bulk and private label.',
  },
  {
    number: '02',
    label: 'Tracksuits',
    slug: 'tracksuits',
    image: '/img99.png',
    alt: 'LOMEKA wholesale Tracksuits',
    tagline: 'Matching set styles',
    detail:
      'Coordinated jackets and lowers built for wholesale, events, clubs and custom branding runs.',
  },
  {
    number: '03',
    label: 'Hoodies & Jackets',
    slug: 'hoodies-jackets',
    image: '/img6.png',
    alt: 'LOMEKA wholesale Hoodies and Jackets',
    tagline: 'Winter layering',
    detail:
      'Fleece hoodies, zip-ups, sweatshirts and outerwear across practical GSM options for bulk buyers.',
  },
  {
    number: '04',
    label: 'Activewear',
    slug: 'activewear',
    image: '/hero-closeup.png',
    alt: 'LOMEKA wholesale Activewear',
    tagline: 'Performance ready',
    detail:
      'Gym wear, sports sets and breathable styles for retail, fitness and custom team orders.',
  },
  {
    number: '05',
    label: 'Other',
    slug: 'other',
    image: '/img55.png',
    alt: 'LOMEKA other wholesale apparel',
    tagline: 'Custom & seasonal',
    detail:
      'Co-ords, special requests and seasonal bulk styles manufactured to your brief from Bhopal.',
  },
];

const TOTAL = LOMEKA_CATEGORIES.length;

export default function CategoryShowcaseSection() {
  const navigate = useNavigate();
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const tabRefs = useRef([]);
  const touchStartX = useRef(null);
  const activeItem = LOMEKA_CATEGORIES[activeIndex];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);

    function onChange(event) {
      setPrefersReducedMotion(event.matches);
    }

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const tab = tabRefs.current[activeIndex];
    if (!tab) return;

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobileLayout) return;

    tab.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeIndex, prefersReducedMotion]);

  function handleNavigate(event, href) {
    event.preventDefault();
    navigate(href);
  }

  function activate(index) {
    const next = ((index % TOTAL) + TOTAL) % TOTAL;
    setActiveIndex(next);
  }

  function goPrev() {
    activate(activeIndex - 1);
  }

  function goNext() {
    activate(activeIndex + 1);
  }

  function onTabKeyDown(event, index) {
    const keys = [
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const last = TOTAL - 1;
    let next = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = index === last ? 0 : index + 1;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = index === 0 ? last : index - 1;
    }
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;

    activate(next);
    tabRefs.current[next]?.focus();
  }

  function onStageTouchStart(event) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function onStageTouchEnd(event) {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 48) return;
    if (delta < 0) goNext();
    else goPrev();
  }

  const collectionHref = `/collections?category=${activeItem.slug}`;

  return (
    <section
      aria-labelledby="lomeka-showcase-heading"
      className="relative overflow-hidden bg-[#0b1512] text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,138,80,0.14),transparent_52%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_center_right,rgba(13,73,56,0.55),transparent_70%)]"
      />

      <div className="h-1 w-full bg-gold" />

      <div className="relative mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
            Signature wholesale categories
          </p>
          <h2
            id="lomeka-showcase-heading"
            className="mt-3 font-display text-[clamp(1.65rem,4.2vw,2.75rem)] leading-[1.15] text-ivory"
          >
            Take your business to the next level with{' '}
            <span className="text-gold">LOMEKA</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ivory/70 sm:text-base">
            Choose a category to preview styles, then open the collection or
            request a bulk quote — made for wholesale buyers from our Bhopal
            unit.
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {activeItem.label}. {activeItem.detail}
        </p>

        <div className="mt-8 grid items-start gap-6 pb-12 md:mt-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-10 md:pb-16 lg:gap-14">
          {/* Stage first on mobile */}
          <div className="relative order-1">
            <div
              className="relative mx-auto flex min-h-[300px] items-end justify-center overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-[#10241e] touch-pan-y sm:min-h-[380px] md:min-h-[460px]"
              onTouchStart={onStageTouchStart}
              onTouchEnd={onStageTouchEnd}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] select-none font-display text-[clamp(7rem,26vw,15rem)] leading-none font-bold tracking-tight"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(184, 138, 80, 0.28)',
                }}
              >
                {activeItem.number}
              </span>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b1512] via-[#0b1512]/40 to-transparent"
              />

              <a
                href={collectionHref}
                onClick={(event) => handleNavigate(event, collectionHref)}
                className="group relative z-10 flex h-full w-full items-end justify-center px-4 pt-10 pb-14 focus-visible:outline-offset-[-6px] sm:pb-16"
                aria-label={`Open ${activeItem.label} collection`}
              >
                <img
                  key={activeItem.slug}
                  src={activeItem.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className={`h-[270px] w-auto max-w-[min(100%,19rem)] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] transition duration-500 group-hover:scale-[1.02] sm:h-[360px] md:h-[420px] ${
                    prefersReducedMotion
                      ? ''
                      : 'motion-safe:animate-[showcaseFade_420ms_ease-out]'
                  }`}
                />
              </a>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
                    {activeItem.tagline}
                  </p>
                  <p className="mt-0.5 truncate font-display text-xl text-ivory sm:text-2xl">
                    {activeItem.label}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-ivory/20 bg-navy/55 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-ivory/85 uppercase backdrop-blur-sm">
                  {activeItem.number} / {String(TOTAL).padStart(2, '0')}
                </span>
              </div>

              <button
                type="button"
                onClick={goPrev}
                className="absolute top-1/2 left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-navy/75 text-ivory shadow-lg backdrop-blur-sm transition hover:border-gold/50 hover:bg-navy hover:text-gold focus-visible:outline-offset-2 sm:left-3"
                aria-label="Previous category"
              >
                <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute top-1/2 right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-navy/75 text-ivory shadow-lg backdrop-blur-sm transition hover:border-gold/50 hover:bg-navy hover:text-gold focus-visible:outline-offset-2 sm:right-3"
                aria-label="Next category"
              >
                <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center gap-2"
                role="group"
                aria-label="Category progress"
              >
                {LOMEKA_CATEGORIES.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => activate(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-offset-2 ${
                        isActive
                          ? 'w-7 bg-gold'
                          : 'w-2.5 bg-ivory/30 hover:bg-ivory/55'
                      }`}
                      aria-label={`Show ${item.label}`}
                      aria-current={isActive ? 'true' : undefined}
                    />
                  );
                })}
              </div>
              <p className="text-[11px] tracking-wide text-ivory/45 md:hidden">
                Swipe image · or tap a category
              </p>
            </div>
          </div>

          {/* Single adaptive tablist + detail */}
          <div className="order-2 flex flex-col">
            <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-gold/90 uppercase">
              Pick a category
            </p>

            <div
              role="tablist"
              aria-label="LOMEKA wholesale categories"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-0 md:overflow-hidden md:rounded-[var(--radius-card)] md:border md:border-ivory/12 md:bg-ivory/[0.03] md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {LOMEKA_CATEGORIES.map((item, index) => {
                const isActive = index === activeIndex;
                const tabId = `${baseId}-tab-${item.slug}`;

                return (
                  <button
                    key={item.slug}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => activate(index)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={`relative min-h-11 shrink-0 rounded-full border px-4 py-2.5 text-left text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-offset-2 md:flex md:w-full md:min-h-[3.25rem] md:items-center md:justify-between md:gap-3 md:rounded-none md:border-0 md:border-b md:border-ivory/10 md:px-5 md:py-3.5 md:text-base md:last:border-b-0 lg:text-lg ${
                      isActive
                        ? 'border-gold bg-gold text-navy md:bg-gold'
                        : 'border-ivory/20 bg-ivory/[0.04] text-ivory/85 hover:border-ivory/40 hover:text-ivory md:bg-transparent md:hover:bg-ivory/[0.06]'
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 hidden w-1 bg-navy/35 md:block"
                      />
                    ) : null}

                    <span className="flex items-baseline gap-2 md:gap-3">
                      <span
                        className={`hidden font-display text-sm tabular-nums md:inline ${
                          isActive ? 'text-navy/55' : 'text-gold/70'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="font-body tracking-wide">
                        {item.label}
                      </span>
                    </span>

                    <ChevronRight
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className={`ml-2 hidden shrink-0 md:inline ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activeItem.slug}`}
              className="mt-5 rounded-[var(--radius-card)] border border-ivory/10 bg-ivory/[0.03] p-4 sm:p-5"
            >
              <p className="text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
                {activeItem.tagline}
              </p>
              <h3 className="mt-1 font-display text-xl text-ivory md:hidden">
                {activeItem.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/75 sm:text-[15px]">
                {activeItem.detail}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={collectionHref}
                  onClick={(event) => handleNavigate(event, collectionHref)}
                  className="brand-btn-gold w-full justify-center sm:w-auto"
                >
                  Explore {activeItem.label}
                </a>
                <a
                  href="/contact?type=wholesale"
                  onClick={(event) =>
                    handleNavigate(event, '/contact?type=wholesale')
                  }
                  className="brand-btn w-full justify-center border border-ivory/35 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
                >
                  Request Bulk Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-ivory/10 bg-[#09110e]"
      >
        <div className="flex w-max animate-[showcaseMarquee_28s_linear_infinite] gap-10 px-6 py-3 font-display text-sm tracking-[0.22em] text-gold/25 uppercase motion-reduce:animate-none sm:gap-14 sm:py-4 sm:text-2xl sm:tracking-[0.18em]">
          {Array.from({ length: 2 }).map((_, loop) => (
            <div key={loop} className="flex gap-10 sm:gap-14">
              {Array.from({ length: 6 }).map((__, index) => (
                <span key={`${loop}-${index}`} className="shrink-0">
                  LOMEKA
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes showcaseFade {
          from {
            opacity: 0.35;
            transform: translateY(8px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes showcaseMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[showcaseMarquee_28s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
