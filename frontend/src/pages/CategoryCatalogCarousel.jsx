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
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATALOG_ITEMS = [
  {
    label: 'T-Shirts',
    slug: 't-shirts',
    image: '/img5.png',
    alt: 'LOMEKA wholesale T-Shirts',
  },
  {
    label: 'Tracksuits',
    slug: 'tracksuits',
    image: '/img2.png',
    alt: 'LOMEKA wholesale Tracksuits',
  },
  {
    label: 'Hoodies & Jackets',
    slug: 'hoodies-jackets',
    image: '/img9.png',
    alt: 'LOMEKA wholesale Hoodies and Jackets',
  },
  {
    label: 'Activewear',
    slug: 'activewear',
    image: '/hero-closeup.png',
    alt: 'LOMEKA wholesale Activewear',
  },
  {
    label: 'Other',
    slug: 'other',
    image: '/img5.png',
    alt: 'LOMEKA other wholesale apparel',
  },
];

export default function CategoryCatalogCarousel() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  function handleNavigate(e, href) {
    e.preventDefault();
    navigate(href);
  }

  function slideBy(direction = 1) {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('[data-carousel-card]');
    const gapPx = window.innerWidth >= 640 ? 8 : 6;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gapPx : 320;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction > 0) {
      if (track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else if (track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      slideBy(1);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      aria-labelledby="lomeka-catalog-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className="w-full bg-white pt-10 pb-8 sm:pt-14 sm:pb-12"
    >
      {/* Heading + Subtitle */}
      <div className="mx-auto mb-7 max-w-2xl px-4 text-center sm:mb-9">
        <h2
          id="lomeka-catalog-heading"
          className="font-display text-2xl font-normal text-[#9b6bc7] sm:text-4xl"
        >
          Product Catalog: A Collection of Apparel for Your Business
        </h2>
        <p className="mt-2.5 text-xs leading-relaxed text-[#675878] sm:text-sm">
          Explore wholesale styles crafted for bulk buyers, retail stores, and
          custom branding. Hover any card to view category and click to
          explore.
        </p>
      </div>

      {/* Full-Width Carousel Track + Bare Left/Right Arrows */}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => slideBy(-1)}
          aria-label="Previous category"
          className="absolute top-1/2 left-2 z-20 -translate-y-1/2 p-1.5 text-white/90 drop-shadow-[0_1px_4px_rgba(30,11,52,0.75)] transition hover:scale-110 hover:text-white sm:left-3"
        >
          <ChevronLeft size={28} strokeWidth={1.8} />
        </button>

        <div
          ref={trackRef}
          className="flex w-full snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden"
        >
          {CATALOG_ITEMS.map((item) => {
            const href = `/collections?category=${item.slug}`;

            return (
              <a
                key={item.slug}
                href={href}
                data-carousel-card
                onClick={(e) => handleNavigate(e, href)}
                className="group relative aspect-[3/4] w-[calc((100%-0.375rem)/2)] shrink-0 snap-start overflow-hidden bg-[#f5effb] sm:w-[calc((100%-0.5rem)/2)] lg:w-[calc((100%-1.5rem)/4)]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-[#1e0b34]/85 via-[#3b185f]/35 to-transparent px-3 pt-12 pb-4 opacity-100 transition-opacity duration-300 sm:px-4 sm:pb-5 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <span className="font-display text-base font-medium tracking-wide text-white sm:translate-y-1 sm:text-xl sm:transition-transform sm:duration-300 sm:group-hover:translate-y-0">
                    {item.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => slideBy(1)}
          aria-label="Next category"
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2 p-1.5 text-white/90 drop-shadow-[0_1px_4px_rgba(30,11,52,0.75)] transition hover:scale-110 hover:text-white sm:right-3"
        >
          <ChevronRight size={28} strokeWidth={1.8} />
        </button>
      </div>
    </section>
  );
}