import { useState } from 'react';

const LOMEKA_CATEGORIES = [
  {
    number: '1',
    label: 'T-Shirts',
    slug: 't-shirts',
    image: '/img99.png',
    alt: 'LOMEKA T-Shirts collection',
    scale: 1.56,
    offsetX: 0,
  },
  {
    number: '2',
    label: 'Tracksuits',
    slug: 'tracksuits',
    image: '/img99.png',
    alt: 'LOMEKA Tracksuits collection',
    scale: 1.68,
    offsetX: 0,
  },
  {
    number: '3',
    label: 'Hoodies & Jackets',
    slug: 'hoodies-jackets',
    image: '/img99.png',
    alt: 'LOMEKA Hoodies and Jackets collection',
    scale: 1.62,
    offsetX: 0,
  },
  {
    number: '4',
    label: 'Activewear',
    slug: 'activewear',
    image: '/img99.png',
    alt: 'LOMEKA Activewear collection',
    scale: 1.58,
    offsetX: 0,
  },
  {
    number: '5',
    label: 'Other',
    slug: 'other',
    image: '/img99.png',
    alt: 'LOMEKA Other wholesale apparel',
    scale: 1.56,
    offsetX: 0,
  },
];

export default function CategoryShowcaseSection({ onNavigate = null }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = LOMEKA_CATEGORIES[activeIndex];

  function handleNavigate(e, href) {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  }

  return (
    <section
      aria-labelledby="lomeka-showcase-heading"
      className="relative overflow-hidden bg-[#0c1001] text-white"
    >
      {/* Top Gold Accent Bar */}
      <div className="h-1.5 w-full bg-[#c5a46b]" />

      {/* Header */}
      <div className="mx-auto max-w-5xl px-4 pt-9 pb-6 text-center sm:px-8 sm:pt-14 sm:pb-8">
        <h2
          id="lomeka-showcase-heading"
          className="font-display text-xl leading-snug font-normal text-white sm:text-3xl lg:text-[2.2rem]"
        >
          Take your Business to the Next Level with LOMEKA -
          <span className="mt-1 block">
            Wholesale & Custom Apparel Manufacturer
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/80 sm:text-sm">
          Elevate Your Wholesale & Event Collection with High-Quality Apparel.
          Built for Bulk Orders, Custom Branding, and Reliable Supply.
        </p>
      </div>

      {/* Main Layout */}
      <div className="mx-auto grid max-w-4xl items-center gap-6 px-4 pb-11 sm:px-8 md:grid-cols-2 md:gap-8 md:pb-16">
        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="LOMEKA wholesale categories"
          className="order-1 mx-auto flex w-full max-w-[280px] flex-col divide-y divide-white/15 md:order-2 md:mx-0"
        >
          {LOMEKA_CATEGORIES.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`w-full px-6 py-3.5 text-left font-body text-base tracking-wide transition-all duration-200 sm:text-lg ${
                  isActive
                    ? 'bg-[#c5a46b] font-semibold text-white'
                    : 'bg-transparent font-normal text-white/90 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Outlined Big Number + Active Category Image */}
        <div className="order-2 relative flex h-[360px] items-center justify-center sm:h-[440px] md:order-1 md:justify-end md:pr-6">
          {/* Outlined Large Number */}
          <span
            aria-hidden="true"
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.22)',
            }}
            className="pointer-events-none select-none font-display text-[220px] leading-none font-bold sm:text-[305px]"
          >
            {activeItem.number}
          </span>

          {/* Model Image */}
          <a
            href={`/collections?category=${activeItem.slug}`}
            onClick={(e) =>
              handleNavigate(e, `/collections?category=${activeItem.slug}`)
            }
            className="group relative z-10 -ml-36 flex h-full items-center justify-center sm:-ml-48"
          >
            <img
              key={activeItem.slug}
              src={activeItem.image}
              alt={activeItem.alt}
              style={{
                transform: `translateX(${activeItem.offsetX}px) scale(${activeItem.scale})`,
              }}
              className="h-[345px] w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.68)] transition-transform duration-300 sm:h-[420px]"
            />
          </a>
        </div>
      </div>

      {/* Bottom Subtle Watermark Strip */}
      <div
        aria-hidden="true"
        className="flex items-center justify-between gap-2 overflow-hidden border-t border-white/10 px-3 py-3 font-display text-[11px] tracking-[0.14em] text-white/12 select-none sm:flex-wrap sm:justify-around sm:gap-6 sm:px-6 sm:py-4 sm:text-3xl sm:tracking-wider"
      >
        <span className="shrink-0">LOMEKA</span>
        <span className="shrink-0">LOMEKA</span>
        <span className="shrink-0">LOMEKA</span>
        <span className="shrink-0">LOMEKA</span>
        <span className="hidden shrink-0 sm:inline">LOMEKA</span>
      </div>
    </section>
  );
}