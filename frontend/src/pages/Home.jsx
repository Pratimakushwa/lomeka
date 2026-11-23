import { useEffect, useRef } from 'react';
import CategoryShowcaseSection from './CategoryShowcaseSection';
import CategoryCatalogCarousel from './CategoryCatalogCarousel';
import FeatureStrip from '../components/FeatureStrip';

const collections = [
  {
    title: 'Men’s Collection',
    href: '/collections#mens',
    image: '/img5.png',
    alt: 'Man wearing a charcoal oversized T-shirt',
  },
  {
    title: 'Women’s Collection',
    href: '/collections#womens',
    image: '/img2.png',
    alt: 'Woman wearing a burgundy tracksuit',
  },
];

function CollectionsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      section.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    const hidden = [
      'motion-safe:translate-y-5',
      'motion-safe:opacity-0',
    ];

    section.classList.add(...hidden);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.remove(...hidden);
        observer.disconnect();
      }
    });

    observer.observe(section);

    return () => {
      observer.disconnect();
      section.classList.remove(...hidden);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="collections-heading"
      className="mx-auto max-w-6xl px-4 py-8 focus-within:translate-y-0 focus-within:opacity-100 motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:ease-out sm:px-8 sm:py-14"
    >
      <div className="mb-5 flex items-center gap-3 sm:mb-8 sm:gap-8">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gold"
        />

        <h2
          id="collections-heading"
          className="text-center text-2xl leading-tight sm:text-4xl lg:text-5xl"
        >
          Explore Collections
        </h2>

        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gold"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
        {collections.map(({ title, href, image, alt }) => (
          <a
            key={href}
            href={href}
            className="group block overflow-hidden rounded-md border border-gold/35 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-lg"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#ebded0] sm:aspect-[3/2]">
              <img
                src={image}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-gold/25 px-3.5 py-3.5 sm:px-5 sm:py-4">
              <h3 className="font-display text-lg leading-tight text-navy sm:text-3xl">
                {title}
              </h3>

              <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-navy underline-offset-4 group-hover:underline sm:text-sm">
                View <span className="hidden sm:inline">Collection</span>{' '}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ExploreByStyle() {
  return (
    <section
      aria-labelledby="style-heading"
      className="w-full pb-8 sm:pb-14"
    >
      <div className="grid min-h-[190px] w-full grid-cols-[minmax(0,48fr)_minmax(0,52fr)] overflow-hidden bg-navy text-ivory sm:min-h-[240px] sm:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:min-h-[clamp(300px,24vw,420px)] lg:grid-cols-[minmax(0,41fr)_minmax(0,59fr)]">
        <div className="flex min-w-0 flex-col justify-center px-3.5 py-4 sm:px-6 lg:py-10 lg:pr-3 lg:pl-[5vw]">
          <h2
            id="style-heading"
            className="font-display text-[clamp(1.25rem,4.6vw,5.25rem)] leading-tight tracking-tight"
          >
            Explore by Style
          </h2>

          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2.5 lg:mt-6 lg:gap-4">
            <a
              href="/collections?category=t-shirts"
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-gold bg-gold px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-navy transition-colors hover:border-ivory hover:bg-ivory focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
            >
              View T-Shirts
            </a>

            <a
              href="/collections?category=tracksuits"
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-ivory px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-ivory transition-colors hover:bg-ivory hover:text-navy focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
            >
              View Tracksuits
            </a>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-[#e8d7c2] [clip-path:ellipse(115%_132%_at_115%_50%)]">
          <img
            src="/img9.png"
            alt="Charcoal and ivory T-shirts beside a burgundy tracksuit"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 block h-full w-full object-cover object-center pl-[6%] lg:object-right lg:pl-0"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home({ onNavigate = null }) {
  return (
    <>
      <section className="bg-[#f8f3ed]">
        <div className="mx-auto grid max-w-[100rem] lg:grid-cols-[44fr_56fr]">
          <div className="flex flex-col justify-center px-4 py-7 sm:px-10 sm:py-10 lg:min-h-[clamp(24rem,32vw,33rem)] lg:px-[9%]">
            <h1 className="text-[clamp(2.05rem,8.4vw,4.45rem)] leading-[1.03] tracking-[-0.04em] lg:text-[clamp(2.35rem,4.55vw,4.45rem)] lg:leading-[1.01]">
              <span className="lg:block">Men’s & Women’s</span>{' '}
              <span className="lg:block">Fashion</span>{' '}
              <span className="lg:block">Manufacturing</span>
            </h1>

            <p className="mt-3 max-w-md text-xs leading-relaxed text-navy/85 sm:mt-4 sm:text-sm lg:text-[clamp(0.95rem,1.3vw,1.2rem)]">
              Apparel manufacturing and wholesale for global buyers.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
              <a
                href="/collections"
                className="flex-1 rounded-sm border border-navy bg-navy px-3 py-2.5 text-center text-xs font-semibold text-white hover:bg-navy/90 sm:flex-initial sm:px-4 sm:text-sm lg:px-5"
              >
                View Collections
              </a>

              <a
                href="/contact"
                className="flex-1 rounded-sm border border-navy bg-white/70 px-3 py-2.5 text-center text-xs font-semibold text-navy hover:bg-navy hover:text-white sm:flex-initial sm:bg-transparent sm:px-4 sm:text-sm lg:px-5"
              >
                Wholesale Enquiry
              </a>
            </div>
          </div>

          <a
            href="/collections"
            aria-label="Explore men’s and women’s collections"
            className="relative block aspect-[4/3] overflow-hidden bg-[#ebe2d6] sm:aspect-[3/2] lg:aspect-auto"
          >
            <img
              src="/hero-closeup.png"
              alt="Two models wearing forest-green and burgundy track jackets over ivory T-shirts"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </a>
        </div>
      </section>

      <div className="py-6 sm:py-8 lg:py-10">
        <FeatureStrip />
      </div>

      <CollectionsSection />

      <CategoryShowcaseSection onNavigate={onNavigate} />

      <CategoryCatalogCarousel onNavigate={onNavigate} />

      <ExploreByStyle />
    </>
  );
}