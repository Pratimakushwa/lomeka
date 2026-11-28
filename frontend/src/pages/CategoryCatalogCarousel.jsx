// import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const CATALOG_ITEMS = [
//   {
//     label: 'T-Shirts',
//     slug: 't-shirts',
//     image: '/img5.png',
//     alt: 'LOMEKA wholesale T-Shirts',
//   },
//   {
//     label: 'Tracksuits',
//     slug: 'tracksuits',
//     image: '/img2.png',
//     alt: 'LOMEKA wholesale Tracksuits',
//   },
//   {
//     label: 'Hoodies & Jackets',
//     slug: 'hoodies-jackets',
//     image: '/img9.png',
//     alt: 'LOMEKA wholesale Hoodies and Jackets',
//   },
//   {
//     label: 'Activewear',
//     slug: 'activewear',
//     image: '/hero-closeup.png',
//     alt: 'LOMEKA wholesale Activewear',
//   },
//   {
//     label: 'Other',
//     slug: 'other',
//     image: '/img5.png',
//     alt: 'LOMEKA other wholesale apparel',
//   },
// ];

// export default function CategoryCatalogCarousel() {
//   const navigate = useNavigate();
//   const trackRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);

//   function handleNavigate(e, href) {
//     e.preventDefault();
//     navigate(href);
//   }

//   function slideBy(direction = 1) {
//     const track = trackRef.current;
//     if (!track) return;

//     const firstCard = track.querySelector('[data-carousel-card]');
//     const gapPx = window.innerWidth >= 640 ? 8 : 6;
//     const step = firstCard ? firstCard.getBoundingClientRect().width + gapPx : 320;
//     const maxScroll = track.scrollWidth - track.clientWidth;

//     if (direction > 0) {
//       if (track.scrollLeft >= maxScroll - 4) {
//         track.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         track.scrollBy({ left: step, behavior: 'smooth' });
//       }
//     } else if (track.scrollLeft <= 4) {
//       track.scrollTo({ left: maxScroll, behavior: 'smooth' });
//     } else {
//       track.scrollBy({ left: -step, behavior: 'smooth' });
//     }
//   }

//   useEffect(() => {
//     if (isPaused) return;
//     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

//     const timer = window.setInterval(() => {
//       slideBy(1);
//     }, 3200);

//     return () => window.clearInterval(timer);
//   }, [isPaused]);

//   return (
//     <section
//       aria-labelledby="lomeka-catalog-heading"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={() => setIsPaused(true)}
//       onTouchEnd={() => setIsPaused(false)}
//       className="w-full bg-white pt-10 pb-8 sm:pt-14 sm:pb-12"
//     >
//       {/* Heading + Subtitle */}
//       <div className="mx-auto mb-7 max-w-2xl px-4 text-center sm:mb-9">
//         <h2
//           id="lomeka-catalog-heading"
//           className="font-display text-2xl font-normal text-[#c5a46b] sm:text-4xl"
//         >
//           Product Catalog: A Collection of Apparel for Your Business
//         </h2>
//         <p className="mt-2.5 text-xs leading-relaxed text-[#4b5563] sm:text-sm">
//           Explore wholesale styles crafted for bulk buyers, retail stores, and
//           custom branding. Hover any card to view category and click to
//           explore.
//         </p>
//       </div>

//       {/* Full-Width Carousel Track + Bare Left/Right Arrows */}
//       <div className="relative w-full">
//         <button
//           type="button"
//           onClick={() => slideBy(-1)}
//           aria-label="Previous category"
//           className="absolute top-1/2 left-2 z-20 -translate-y-1/2 p-1.5 text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] transition hover:scale-110 hover:text-white sm:left-3"
//         >
//           <ChevronLeft size={28} strokeWidth={1.8} />
//         </button>

//         <div
//           ref={trackRef}
//           className="flex w-full snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden"
//         >
//           {CATALOG_ITEMS.map((item) => {
//             const href = `/collections?category=${item.slug}`;

//             return (
//               <a
//                 key={item.slug}
//                 href={href}
//                 data-carousel-card
//                 onClick={(e) => handleNavigate(e, href)}
//                 className="group relative aspect-[3/4] w-[calc((100%-0.375rem)/2)] shrink-0 snap-start overflow-hidden bg-[#f4efe9] sm:w-[calc((100%-0.5rem)/2)] lg:w-[calc((100%-1.5rem)/4)]"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.alt}
//                   loading="lazy"
//                   decoding="async"
//                   className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//                 />

//                 <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-12 pb-4 opacity-100 transition-opacity duration-300 sm:px-4 sm:pb-5 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
//                   <span className="font-display text-base font-medium tracking-wide text-white sm:translate-y-1 sm:text-xl sm:transition-transform sm:duration-300 sm:group-hover:translate-y-0">
//                     {item.label}
//                   </span>
//                 </div>
//               </a>
//             );
//           })}
//         </div>

//         <button
//           type="button"
//           onClick={() => slideBy(1)}
//           aria-label="Next category"
//           className="absolute top-1/2 right-2 z-20 -translate-y-1/2 p-1.5 text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] transition hover:scale-110 hover:text-white sm:right-3"
//         >
//           <ChevronRight size={28} strokeWidth={1.8} />
//         </button>
//       </div>
//     </section>
//   );
// }
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PROCESS_STEPS = [
  {
    id: 'material',
    label: 'Material',
    image: '/stage-material-v1.png',
    alt: 'LOMEKA fabric rolls and wholesale garments in studio',
    summary:
      'Fabric is reviewed for the feel, drape and consistency the finished garment needs.',
    detail:
      'Each choice guides the work that follows — checking fabric GSM, weave, colour fastness and trim quality for bulk orders.',
  },
  {
    id: 'cut-build',
    label: 'Cut & build',
    image: '/stage-cut-v1.png',
    alt: 'LOMEKA oversized and regular cut apparel sample',
    summary:
      'Patterns are placed with care before each piece is cut.',
    detail:
      'Precision here shapes comfort, fit and consistency later across men’s and women’s size runs.',
  },
  {
    id: 'make',
    label: 'Make',
    image: '/stage-make-v1.png',
    alt: 'LOMEKA stitched tracksuit and activewear construction',
    summary:
      'Pieces are joined with careful stitching and steady attention to shape.',
    detail:
      'Seams, panels and construction are handled cleanly so garments hold their structure in daily wear.',
  },
  {
    id: 'check-finish',
    label: 'Check & finish',
    image: '/stage-check-v1.png',
    alt: 'LOMEKA finished wholesale apparel styles ready for dispatch',
    summary:
      'The finished garment is inspected, refined and packed for dispatch.',
    detail:
      'Every batch goes through final quality checks, neat folding and bulk dispatch readiness.',
  },
];

export default function CategoryCatalogCarousel() {
  const [expandedSteps, setExpandedSteps] = useState({});

  function toggleStep(id) {
    setExpandedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <section
      aria-labelledby="lomeka-process-heading"
      className="w-full bg-white py-10 sm:py-14"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#9b6bc7] uppercase">
          FROM MATERIAL TO MADE
        </p>

        <div className="mt-2 flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="lomeka-process-heading"
            className="font-display text-3xl font-normal tracking-tight text-[#24103a] sm:text-4xl lg:text-5xl"
          >
            Every detail has a{' '}
            <span className="text-[#9b6bc7]">direction.</span>
          </h2>

          <p className="max-w-sm text-xs leading-relaxed text-[#675878] sm:text-sm lg:text-right">
            Follow the points where material becomes a finished garment.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          {PROCESS_STEPS.map((step, index) => {
            const isExpanded = Boolean(expandedSteps[step.id]);
            const isLast = index === PROCESS_STEPS.length - 1;

            return (
              <div key={step.id} className="relative min-w-0">
                <div className="relative flex items-start py-3.5 lg:block lg:py-0">
                  {/* Mobile/Tablet: Image + right-edge dot & vertical connector line */}
                  <div className="relative flex w-[36%] shrink-0 items-center sm:w-[28%] lg:w-full">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#f5effb]">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>

                    {/* Mobile vertical line along image right edge */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 -right-3 -bottom-7 w-[1.5px] -translate-x-1/2 bg-[#9b6bc7]/35 lg:hidden"
                      />
                    )}

                    {/* Mobile dot on image right edge */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 -right-3 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9b6bc7] lg:hidden"
                    />

                    {/* Desktop dot between cards */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none hidden h-2.5 w-2.5 shrink-0 rounded-full bg-[#9b6bc7] lg:z-10 lg:ml-1 lg:-mr-2 lg:block"
                      />
                    )}
                  </div>

                  {/* Title + '+'/'−' toggle + summary/detail */}
                  <div className="min-w-0 flex-1 pl-6 lg:mt-3.5 lg:pl-0">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display text-xl font-normal text-[#24103a] sm:text-2xl lg:text-xs lg:font-bold lg:tracking-[0.14em] lg:uppercase">
                        {step.label}
                      </span>

                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${step.label}`}
                        onClick={() => toggleStep(step.id)}
                        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                          isExpanded
                            ? 'border-[#3b185f] bg-[#3b185f] text-white'
                            : 'border-[#9b6bc7] text-[#9b6bc7] hover:border-[#3b185f] hover:text-[#3b185f]'
                        }`}
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>

                    <p className="mt-1.5 text-xs leading-relaxed text-[#4f3e63] sm:text-sm">
                      {isExpanded ? `${step.summary} ${step.detail}` : step.summary}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mt-8">
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-between border border-[#9b6bc7]/45 bg-white px-5 py-3.5 text-xs font-bold tracking-[0.14em] text-[#3b185f] uppercase transition-colors hover:border-[#3b185f] hover:bg-[#faf7fd] sm:w-auto sm:min-w-[300px] sm:gap-4"
          >
            <span>EXPLORE THE LOMEKA PROCESS</span>
            <span aria-hidden="true">→</span>
          </Link>

          <p className="text-xs text-[#7c6f8c]">
            Wholesale & custom manufacturing notes.
          </p>
        </div>
      </div>
    </section>
  );
}