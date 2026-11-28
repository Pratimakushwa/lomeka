
// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import CategoryShowcaseSection from './CategoryShowcaseSection';
// import CategoryCatalogCarousel from './CategoryCatalogCarousel';
// import FeatureStrip from '../components/FeatureStrip';

// const collections = [
//   {
//     key: 'collections-1',
//     title: 'Collections',
//     href: '/collections',
//     image: '/img78.png',
//     alt: 'Apparel rack with garments on hangers',
//   },
//   {
//     key: 'collections-2',
//     title: 'Collections',
//     href: '/collections',
//     image: '/img87.png',
//     alt: 'Wholesale garments arranged on clothing rack',
//   },
// ];

// function CollectionsSection() {
//   const sectionRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (
//       !section ||
//       !('IntersectionObserver' in window) ||
//       window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
//       section.getBoundingClientRect().top < window.innerHeight
//     ) {
//       return;
//     }

//     const hidden = [
//       'motion-safe:translate-y-5',
//       'motion-safe:opacity-0',
//     ];

//     section.classList.add(...hidden);

//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         section.classList.remove(...hidden);
//         observer.disconnect();
//       }
//     });

//     observer.observe(section);

//     return () => {
//       observer.disconnect();
//       section.classList.remove(...hidden);
//     };
//   }, []);

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
//   };

//   const visibleCollections = [
//     collections[activeIndex],
//     collections[(activeIndex + 1) % collections.length],
//   ];

//   return (
//     <section
//       ref={sectionRef}
//       aria-labelledby="collections-heading"
//       className="mx-auto max-w-6xl px-4 py-8 focus-within:translate-y-0 focus-within:opacity-100 motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:ease-out sm:px-8 sm:py-14"
//     >
//       <div className="mb-5 flex items-center gap-3 sm:mb-8 sm:gap-8">
//         <span
//           aria-hidden="true"
//           className="h-px flex-1 bg-gold"
//         />

//         <h2
//           id="collections-heading"
//           className="text-center text-2xl leading-tight sm:text-4xl lg:text-5xl"
//         >
//           Explore Collections
//         </h2>

//         <span
//           aria-hidden="true"
//           className="h-px flex-1 bg-gold"
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
//         {visibleCollections.map(({ key, title, href, image, alt }, idx) => (
//           <Link
//             key={`${key}-${idx}`}
//             to={href}
//             className={`brand-card brand-card-hover group block overflow-hidden ${
//               idx === 1 ? 'hidden sm:block' : 'block'
//             }`}
//           >
//             <div className="h-60 w-full overflow-hidden bg-[#ebded0] sm:h-72 lg:h-80">
//               <img
//                 src={image}
//                 alt={alt}
//                 loading="lazy"
//                 decoding="async"
//                 className="block h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
//               />
//             </div>

//             <div className="flex items-center justify-between gap-3 border-t border-gold/25 px-3.5 py-3.5 sm:px-5 sm:py-4">
//               <h3 className="font-display text-lg leading-tight text-navy sm:text-3xl">
//                 {title}
//               </h3>

//               <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-navy underline-offset-4 group-hover:underline sm:text-sm">
//                 View <span className="hidden sm:inline">Collection</span>{' '}
//                 <span aria-hidden="true">→</span>
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div className="mt-6 flex items-center justify-center gap-3">
//         <button
//           type="button"
//           onClick={handlePrev}
//           aria-label="Previous collection"
//           className="grid size-8 place-items-center rounded-full border border-[#3b185f]/25 bg-white text-sm font-semibold text-[#3b185f] transition hover:border-[#3b185f] hover:bg-[#faf7fd]"
//         >
//           ‹
//         </button>

//         <button
//           type="button"
//           onClick={handleNext}
//           aria-label="Next collection"
//           className="grid size-8 place-items-center rounded-full bg-[#3b185f] text-sm font-semibold text-white transition hover:bg-[#280e44]"
//         >
//           ›
//         </button>
//       </div>
//     </section>
//   );
// }

// function ExploreByStyle() {
//   const pillars = [
//     {
//       tag: 'MATERIAL',
//       image: '/process-material-v1.png',
//       alt: 'LOMEKA fabric cutting and pattern precision',
//       title: 'Fabric & Pattern Precision',
//       caption: 'Clean pattern placement and bulk-ready cut consistency.',
//     },
//     {
//       tag: 'MAKE',
//       image: '/process-make-v1.png',
//       alt: 'LOMEKA structured stitching and garment assembly',
//       title: 'Structured Stitching',
//       caption: 'Balanced seams and reliable fit across every size batch.',
//     },
//     {
//       tag: 'FINISH',
//       image: '/process-finish-v1.png',
//       alt: 'LOMEKA quality check and garment finishing',
//       title: 'Quality Check & Finish',
//       caption: 'Neat finishing and inspection before wholesale dispatch.',
//     },
//   ];

//   return (
//     <section
//       aria-labelledby="style-heading"
//       className="relative w-full overflow-hidden bg-white py-12 sm:py-16"
//     >
//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <p className="text-[11px] font-bold tracking-[0.18em] text-[#9b6bc7] uppercase">
//           HOW LOMEKA TAKES SHAPE
//         </p>

//         <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//           <div>
//             <h2
//               id="style-heading"
//               className="font-display text-3xl font-normal tracking-tight text-[#24103a] sm:text-5xl"
//             >
//               The standard is in the{' '}
//               <span className="text-[#9b6bc7]">making.</span>
//             </h2>
//             <p className="mt-2 text-sm text-[#4f3e63] sm:text-base">
//               Every decision—material, measurement and finish—is treated as part
//               of the same promise.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2.5">
//             <Link
//               to="/collections?category=t-shirts"
//               className="inline-flex items-center justify-center rounded-md bg-[#9b6bc7] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7f4eb0] sm:text-sm"
//             >
//               View T-Shirts
//             </Link>
//             <Link
//               to="/collections?category=tracksuits"
//               className="inline-flex items-center justify-center rounded-md border border-[#9b6bc7]/50 bg-white px-4 py-2 text-xs font-semibold text-[#3b185f] transition-colors hover:border-[#3b185f] hover:bg-[#faf7fd] sm:text-sm"
//             >
//               View Tracksuits
//             </Link>
//           </div>
//         </div>

//         <div className="relative mt-8 sm:mt-10">
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -top-5 inset-x-0 z-0 overflow-hidden font-display text-[clamp(3.6rem,13.5vw,11.5rem)] leading-none font-bold tracking-[0.06em] text-transparent select-none [-webkit-text-stroke:1.5px_rgba(155,107,199,0.35)]"
//           >
//             PRECISION
//           </div>

//           <div className="relative z-10 grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 sm:gap-5 sm:pt-10 lg:gap-7">
//             {pillars.map((item) => (
//               <figure key={item.tag} className="group relative min-w-0">
//                 <div className="flex items-stretch gap-2">
//                   <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-[#9b6bc7]/20 bg-[#f5effb] shadow-sm">
//                     <img
//                       src={item.image}
//                       alt={item.alt}
//                       loading="lazy"
//                       decoding="async"
//                       className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
//                     />
//                   </div>

//                   <span
//                     aria-hidden="true"
//                     className="hidden items-center text-[10px] font-bold tracking-[0.22em] text-[#7d6896] uppercase [writing-mode:vertical-rl] sm:flex"
//                   >
//                     {item.tag}
//                   </span>
//                 </div>

//                 <figcaption className="mt-3 pr-2">
//                   <span className="mb-1 block text-[10px] font-bold tracking-[0.18em] text-[#9b6bc7] uppercase sm:hidden">
//                     {item.tag}
//                   </span>
//                   <h3 className="font-display text-lg text-[#24103a] sm:text-xl">
//                     {item.title}
//                   </h3>
//                   <p className="mt-1 text-xs leading-relaxed text-[#675878] sm:text-sm">
//                     {item.caption}
//                   </p>
//                 </figcaption>
//               </figure>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// const whyChoose = [
//   {
//     title: 'Direct factory wholesale',
//     description:
//       'Source men’s and women’s apparel straight from our Bhopal manufacturing unit with clear bulk pricing.',
//   },
//   {
//     title: 'Ready styles & custom work',
//     description:
//       'Browse catalogue styles or share your own design, fabric preference, branding and size breakdown.',
//   },
//   {
//     title: 'Practical production support',
//     description:
//       'We help with GSM, colourways, print/embroidery needs and dispatch planning for wholesale buyers.',
//   },
// ];

// function WhyChooseLomeka() {
//   return (
//     <section
//   aria-labelledby="why-lomeka-heading"
//   className="border-y border-[#9b6bc7]/20 bg-white"
// >
//   <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-14 lg:py-16">
//     <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-10">
//       <div>
//         <span className="inline-block rounded-full bg-[#f4ecfc] px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-[#7c45b5] uppercase">
//           Why buyers choose LOMEKA
//         </span>

//         <h2
//           id="why-lomeka-heading"
//           className="mt-3 font-display text-2xl leading-[1.12] text-[#24103a] sm:text-4xl"
//         >
//           Built for wholesale and custom apparel orders
//         </h2>

//         <p className="mt-2.5 text-xs leading-relaxed text-[#5e4d72] sm:text-sm">
//           LOMEKA manufactures and supplies bulk men’s and women’s wear from Kolar
//           Road, Bhopal.
//         </p>

//         <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-6">
//           <Link
//             to="/manufacturing-wholesale"
//             className="inline-flex items-center justify-center rounded-full bg-[#24103a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3b185f] sm:px-5 sm:py-2.5 sm:text-sm"
//           >
//             Manufacturing & Wholesale
//           </Link>
//           <Link
//             to="/contact"
//             className="inline-flex items-center justify-center rounded-full border border-[#9b6bc7]/50 bg-[#faf7fd] px-4 py-2 text-xs font-semibold text-[#3b185f] transition-colors hover:border-[#9b6bc7] hover:bg-[#f3ebfc] sm:px-5 sm:py-2.5 sm:text-sm"
//           >
//             Request a Quote
//           </Link>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
//         {whyChoose.map(({ title, description }, index) => (
//           <article
//             key={title}
//             className="rounded-2xl border border-[#9b6bc7]/20 bg-[#fcfaff] p-3.5 transition-all duration-300 hover:border-[#9b6bc7]/55 hover:bg-white hover:shadow-sm sm:p-5"
//           >
//             <div className="flex items-center justify-between">
//               <span className="font-display text-lg font-semibold text-[#9b6bc7] sm:text-xl">
//                 0{index + 1}
//               </span>
//               <span className="h-1.5 w-1.5 rounded-full bg-[#9b6bc7]/60" />
//             </div>

//             <h3 className="mt-1.5 font-display text-base leading-snug text-[#24103a] sm:mt-2.5 sm:text-xl">
//               {title}
//             </h3>

//             <p className="mt-1 text-xs leading-relaxed text-[#675878]">
//               {description}
//             </p>
//           </article>
//         ))}
//       </div>
//     </div>
//   </div>
// </section>
//   );
// }

// const atelierSteps = [
//   {
//     step: '01',
//     title: 'Share the brief',
//     detail: 'Style, quantity, fabric/GSM, colours and branding notes.',
//   },
//   {
//     step: '02',
//     title: 'We craft the quote',
//     detail: 'Factory pricing with a clear production timeline from Bhopal.',
//   },
//   {
//     step: '03',
//     title: 'Bulk dispatch',
//     detail: 'Stitching, finishing checks and delivery to your city.',
//   },
// ];

// function YourDesignOurFactory() {
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (
//       !section ||
//       !('IntersectionObserver' in window) ||
//       window.matchMedia('(prefers-reduced-motion: reduce)').matches
//     ) {
//       return;
//     }

//     const items = section.querySelectorAll('[data-atelier-item]');
//     items.forEach((el) => {
//       el.classList.add(
//         'motion-safe:translate-y-6',
//         'motion-safe:opacity-0',
//         'motion-safe:transition-[opacity,transform]',
//         'motion-safe:duration-700',
//         'motion-safe:ease-out',
//       );
//     });

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return;
//           const el = entry.target;
//           el.classList.remove(
//             'motion-safe:translate-y-6',
//             'motion-safe:opacity-0',
//           );
//           observer.unobserve(el);
//         });
//       },
//       { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
//     );

//     items.forEach((el, index) => {
//       el.style.transitionDelay = `${index * 90}ms`;
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//   ref={sectionRef}
//   aria-labelledby="atelier-heading"
//   className="relative overflow-hidden bg-gradient-to-br from-[#f6ebd4] via-[#efe0c0] to-[#e6d3ad] text-[#24103a]"
// >
//   {/* Subtle Ambient Glow & Watermark */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[#9b6bc7]/15 blur-3xl"
//   />
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -bottom-24 -left-12 font-display text-[clamp(7rem,24vw,16rem)] leading-none tracking-[0.08em] text-[#3b185f]/[0.05] select-none"
//   >
//     LOMEKA
//   </div>

//   <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:py-22">
//     {/* Top Editorial Header Row */}
//     <div
//       data-atelier-item
//       className="flex flex-col gap-5 border-b border-[#3b185f]/15 pb-8 lg:flex-row lg:items-end lg:justify-between lg:pb-10"
//     >
//       <div>
//         <span className="inline-flex items-center gap-2 rounded-full border border-[#3b185f]/20 bg-white/75 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] text-[#3b185f] uppercase shadow-2xs">
//           <span className="h-1.5 w-1.5 rounded-full bg-[#6f3fa1]" />
//           Private label · Custom bulk
//         </span>

//         <h2
//           id="atelier-heading"
//           className="mt-4 font-display text-[clamp(2.25rem,5.2vw,4.1rem)] leading-[1.03] tracking-tight text-[#24103a]"
//         >
//           Your design.{' '}
//           <span className="block text-[#5c2d91] sm:inline">
//             Our factory.
//           </span>
//         </h2>
//       </div>

//       <p className="max-w-md text-sm leading-relaxed text-[#3d2b52] sm:text-base lg:text-right">
//         Bring a reference photo, tech pack or catalogue pick. LOMEKA turns it
//         into wholesale-ready men’s and women’s apparel — with your colours,
//         prints, embroidery and labels.
//       </p>
//     </div>

//     {/* Main Content Grid: Left Visual Showcase + Right Interactive Step Cards */}
//     <div className="mt-9 grid gap-8 lg:mt-11 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-12">
//       {/* Visual Bento Collage */}
//       <div
//         data-atelier-item
//         className="grid grid-cols-12 gap-3.5 sm:gap-4"
//       >
//         <figure className="group relative col-span-12 overflow-hidden rounded-2xl border border-[#3b185f]/20 bg-white shadow-lg">
//           <div className="aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
//             <img
//               src="/img55.png"
//               alt="LOMEKA wholesale apparel samples on display"
//               loading="lazy"
//               decoding="async"
//               className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//             />
//           </div>
//           <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#1f0d36]/90 via-[#1f0d36]/55 to-transparent px-4 py-4 sm:px-6">
//             <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
//               Catalogue styles & custom bulk runs
//             </span>
//             <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
//               MOQ Friendly
//             </span>
//           </figcaption>
//         </figure>

//         <figure className="group relative col-span-6 overflow-hidden rounded-2xl border border-[#3b185f]/20 bg-white shadow-sm">
//           <div className="aspect-[4/4] overflow-hidden sm:aspect-[5/4]">
//             <img
//               src="/stage-material-v1.png"
//               alt="LOMEKA fabric rolls and material sourcing"
//               loading="lazy"
//               decoding="async"
//               className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
//             />
//           </div>
//           <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f0d36]/90 to-transparent px-3.5 py-3">
//             <p className="text-[10px] font-bold tracking-[0.16em] text-[#e3c8fc] uppercase">
//               Fabric & GSM
//             </p>
//             <p className="text-xs text-white/95">Curated bulk mills</p>
//           </div>
//         </figure>

//         <figure className="group relative col-span-6 overflow-hidden rounded-2xl border border-[#3b185f]/20 bg-white shadow-sm">
//           <div className="aspect-[4/4] overflow-hidden sm:aspect-[5/4]">
//             <img
//               src="/stage-make-v1.png"
//               alt="LOMEKA stitching and garment construction"
//               loading="lazy"
//               decoding="async"
//               className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
//             />
//           </div>
//           <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f0d36]/90 to-transparent px-3.5 py-3">
//             <p className="text-[10px] font-bold tracking-[0.16em] text-[#e3c8fc] uppercase">
//               From Bhopal
//             </p>
//             <p className="text-xs text-white/95">In-house production</p>
//           </div>
//         </figure>
//       </div>

//       {/* Right Column: Elevated Step Cards + CTA */}
//       <div className="flex flex-col justify-between">
//         <ol className="space-y-3.5 sm:space-y-4">
//           {atelierSteps.map(({ step, title, detail }) => (
//             <li
//               key={step}
//               data-atelier-item
//               className="group rounded-2xl border border-[#3b185f]/15 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-[#3b185f]/45 hover:bg-white hover:shadow-md sm:p-5"
//             >
//               <div className="flex items-start gap-4">
//                 <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3b185f]/25 bg-[#f3e6cc] font-display text-lg text-[#24103a] transition-colors group-hover:bg-[#3b185f] group-hover:text-white">
//                   {step}
//                 </span>

//                 <div className="min-w-0 flex-1">
//                   <h3 className="font-display text-xl leading-snug text-[#24103a] sm:text-2xl">
//                     {title}
//                   </h3>
//                   <p className="mt-1 text-sm leading-relaxed text-[#4f3e63]">
//                     {detail}
//                   </p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ol>

//         {/* Trust Strip + Action Buttons */}
//         <div data-atelier-item className="mt-7 pt-2">
//           <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#3d2b52]">
//             <span>✓ Custom labels & neck tags</span>
//             <span>✓ Screen, DTF & embroidery</span>
//             <span>✓ Pan-India & export dispatch</span>
//           </div>

//           <div className="flex flex-col gap-3 sm:flex-row">
//             <Link
//               to="/contact?type=custom"
//               className="inline-flex w-full items-center justify-center rounded-lg bg-[#24103a] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-[#3b185f] sm:w-auto sm:flex-1"
//             >
//               Start a Custom Enquiry →
//             </Link>

//             <Link
//               to="/manufacturing-wholesale"
//               className="inline-flex w-full items-center justify-center rounded-lg border border-[#24103a]/30 bg-white/80 px-6 py-3.5 text-center text-sm font-semibold text-[#24103a] transition-all hover:border-[#24103a] hover:bg-white sm:w-auto sm:flex-1"
//             >
//               See Manufacturing Process
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
//   );
// }

// export default function Home() {
//   return (
//     <>
//       <section className="border-b border-gold/25 bg-[#c4b0d7]">
//         <div className="mx-auto grid max-w-[100rem] lg:grid-cols-[44fr_56fr]">
//           <div className="flex flex-col justify-center bg-gradient-to-b from-[#e9dff2] to-[#f4ecfa] px-5 py-8 sm:px-10 sm:py-12 lg:min-h-[clamp(24rem,32vw,33rem)] lg:px-[9%]">
//             <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//               Apparel manufacturing · Bhopal & Dubai
//             </p>

//             <h1 className="mt-3 text-[clamp(2.05rem,8.4vw,4.45rem)] leading-[1.03] tracking-[-0.04em] lg:text-[clamp(2.35rem,4.55vw,4.45rem)] lg:leading-[1.01]">
//               <span className="lg:block">Men’s & Women’s</span>{' '}
//               <span className="lg:block">Fashion</span>{' '}
//               <span className="lg:block">Manufacturing</span>
//             </h1>

//             <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/85 sm:text-base lg:text-[clamp(0.95rem,1.3vw,1.15rem)]">
//               Wholesale T-shirts, tracksuits, hoodies and custom apparel for
//               distributors, retailers and private-label buyers.
//             </p>

//            <div className="mt-5 flex flex-row flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
//   <Link
//     to="/collections"
//     className="group inline-flex items-center gap-2.5 rounded-lg bg-[#3b185f] px-3.5 py-2 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-colors hover:bg-[#280e44] sm:px-4 sm:text-xs"
//   >
//     <span>View Collections</span>
//     <span
//       aria-hidden="true"
//       className="grid size-5 shrink-0 place-items-center rounded-full bg-white text-[11px] text-[#3b185f] transition-transform duration-200 group-hover:translate-x-0.5 sm:size-6 sm:text-xs"
//     >
//       →
//     </span>
//   </Link>

//   <Link
//     to="/contact"
//     className="group inline-flex items-center gap-2.5 rounded-lg border border-[#3b185f]/30 bg-white px-3.5 py-2 text-[11px] font-semibold tracking-[0.1em] text-[#3b185f] uppercase transition-colors hover:border-[#3b185f] hover:bg-[#faf7fd] sm:px-4 sm:text-xs"
//   >
//     <span>Wholesale Enquiry</span>
//     <span
//       aria-hidden="true"
//       className="grid size-5 shrink-0 place-items-center rounded-full bg-[#3b185f] text-[11px] text-white transition-transform duration-200 group-hover:translate-x-0.5 sm:size-6 sm:text-xs"
//     >
//       →
//     </span>
//   </Link>
// </div>
//           </div>

//           <Link
//   to="/collections"
//   aria-label="Explore men’s and women’s collections"
//   className="group relative block aspect-[4/3] overflow-hidden bg-[#efe6f7] sm:aspect-[3/2] lg:aspect-auto"
// >
//   <img
//     src="/hero-closeup.png"
//     alt="Fabric rolls and wholesale garments on display rack"
//     fetchPriority="high"
//     className="h-full w-full object-cover object-center contrast-[1.03] saturate-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
//   />

//   {/* Left edge blend into hero background without washing out center */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f6effb] to-transparent lg:w-28"
//   />

//   {/* Subtle rich vignette at outer corners only */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_48%,transparent_52%,rgba(36,16,58,0.18)_100%)]"
//   />
// </Link>
//         </div>
//       </section>

//   <div className="mb-5 sm:mb-8">
//   <FeatureStrip />
// </div>


//       <YourDesignOurFactory />
//       <CollectionsSection />
//       <WhyChooseLomeka />

//       <CategoryShowcaseSection />

//       <CategoryCatalogCarousel />

//       <ExploreByStyle />
//     </>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryShowcaseSection from './CategoryShowcaseSection';
import CategoryCatalogCarousel from './CategoryCatalogCarousel';
import FeatureStrip from '../components/FeatureStrip';

const collections = [
  {
    key: 'collections-1',
    title: 'Collections',
    href: '/collections',
    image: '/img78.png',
    alt: 'Apparel rack with garments on hangers',
  },
  {
    key: 'collections-2',
    title: 'Collections',
    href: '/collections',
    image: '/img87.png',
    alt: 'Wholesale garments arranged on clothing rack',
  },
  {
    key: 'collections-3',
    title: 'Collections',
    href: '/collections',
    image: '/img78.png',
    alt: 'Wholesale garments arranged on clothing rack',
  },
  {
    key: 'collections-4',
    title: 'Collections',
    href: '/collections',
    image: '/woman-w.jpg',
    alt: 'Wholesale garments arranged on clothing rack',
  },
];

function CollectionsSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  const visibleCollections = [
    collections[activeIndex],
    collections[(activeIndex + 1) % collections.length],
  ];

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
        {visibleCollections.map(({ key, title, href, image, alt }, idx) => (
          <Link
            key={`${key}-${idx}`}
            to={href}
            className={`brand-card brand-card-hover group block overflow-hidden ${
              idx === 1 ? 'hidden sm:block' : 'block'
            }`}
          >
            <div className="h-60 w-full overflow-hidden bg-[#ebded0] sm:h-72 lg:h-80">
              <img
                src={image}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
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
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous collection"
          className="grid size-8 place-items-center rounded-full border border-[#3b185f]/25 bg-white text-sm font-semibold text-[#3b185f] transition hover:border-[#3b185f] hover:bg-[#faf7fd]"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next collection"
          className="grid size-8 place-items-center rounded-full bg-[#3b185f] text-sm font-semibold text-white transition hover:bg-[#280e44]"
        >
          ›
        </button>
      </div>
    </section>
  );
}

function ExploreByStyle() {
  const pillars = [
    {
      tag: 'MATERIAL',
      image: '/process-material-v1.png',
      alt: 'LOMEKA fabric cutting and pattern precision',
      title: 'Fabric & Pattern Precision',
      caption: 'Clean pattern placement and bulk-ready cut consistency.',
    },
    {
      tag: 'MAKE',
      image: '/process-make-v1.png',
      alt: 'LOMEKA structured stitching and garment assembly',
      title: 'Structured Stitching',
      caption: 'Balanced seams and reliable fit across every size batch.',
    },
    {
      tag: 'FINISH',
      image: '/process-finish-v1.png',
      alt: 'LOMEKA quality check and garment finishing',
      title: 'Quality Check & Finish',
      caption: 'Neat finishing and inspection before wholesale dispatch.',
    },
  ];

  return (
    <section
      aria-labelledby="style-heading"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#9b6bc7] uppercase">
          HOW LOMEKA TAKES SHAPE
        </p>

        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              id="style-heading"
              className="font-display text-3xl font-normal tracking-tight text-[#24103a] sm:text-5xl"
            >
              The standard is in the{' '}
              <span className="text-[#9b6bc7]">making.</span>
            </h2>
            <p className="mt-2 text-sm text-[#4f3e63] sm:text-base">
              Every decision—material, measurement and finish—is treated as part
              of the same promise.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/collections?category=t-shirts"
              className="inline-flex items-center justify-center rounded-md bg-[#9b6bc7] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7f4eb0] sm:text-sm"
            >
              View T-Shirts
            </Link>
            <Link
              to="/collections?category=tracksuits"
              className="inline-flex items-center justify-center rounded-md border border-[#9b6bc7]/50 bg-white px-4 py-2 text-xs font-semibold text-[#3b185f] transition-colors hover:border-[#3b185f] hover:bg-[#faf7fd] sm:text-sm"
            >
              View Tracksuits
            </Link>
          </div>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 inset-x-0 z-0 overflow-hidden font-display text-[clamp(3.6rem,13.5vw,11.5rem)] leading-none font-bold tracking-[0.06em] text-transparent select-none [-webkit-text-stroke:1.5px_rgba(155,107,199,0.35)]"
          >
            PRECISION
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 sm:gap-5 sm:pt-10 lg:gap-7">
            {pillars.map((item) => (
              <figure key={item.tag} className="group relative min-w-0">
                <div className="flex items-stretch gap-2">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-[#9b6bc7]/20 bg-[#f5effb] shadow-sm">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="hidden items-center text-[10px] font-bold tracking-[0.22em] text-[#7d6896] uppercase [writing-mode:vertical-rl] sm:flex"
                  >
                    {item.tag}
                  </span>
                </div>

                <figcaption className="mt-3 pr-2">
                  <span className="mb-1 block text-[10px] font-bold tracking-[0.18em] text-[#9b6bc7] uppercase sm:hidden">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-lg text-[#24103a] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#675878] sm:text-sm">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const whyChoose = [
  {
    title: 'Direct factory wholesale',
    description:
      'Source men’s and women’s apparel straight from our Bhopal manufacturing unit with clear bulk pricing.',
  },
  {
    title: 'Ready styles & custom work',
    description:
      'Browse catalogue styles or share your own design, fabric preference, branding and size breakdown.',
  },
  {
    title: 'Practical production support',
    description:
      'We help with GSM, colourways, print/embroidery needs and dispatch planning for wholesale buyers.',
  },
];

function WhyChooseLomeka() {
  return (
    <section
  aria-labelledby="why-lomeka-heading"
  className="border-y border-[#9b6bc7]/20 bg-white"
>
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-14 lg:py-16">
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-10">
      <div>
        <span className="inline-block rounded-full bg-[#f4ecfc] px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-[#7c45b5] uppercase">
          Why buyers choose LOMEKA
        </span>

        <h2
          id="why-lomeka-heading"
          className="mt-3 font-display text-2xl leading-[1.12] text-[#24103a] sm:text-4xl"
        >
          Built for wholesale and custom apparel orders
        </h2>

        <p className="mt-2.5 text-xs leading-relaxed text-[#5e4d72] sm:text-sm">
          LOMEKA manufactures and supplies bulk men’s and women’s wear from Kolar
          Road, Bhopal.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-6">
          <Link
            to="/manufacturing-wholesale"
            className="inline-flex items-center justify-center rounded-full bg-[#24103a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3b185f] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Manufacturing & Wholesale
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#9b6bc7]/50 bg-[#faf7fd] px-4 py-2 text-xs font-semibold text-[#3b185f] transition-colors hover:border-[#9b6bc7] hover:bg-[#f3ebfc] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
        {whyChoose.map(({ title, description }, index) => (
          <article
            key={title}
            className="rounded-2xl border border-[#9b6bc7]/20 bg-[#fcfaff] p-3.5 transition-all duration-300 hover:border-[#9b6bc7]/55 hover:bg-white hover:shadow-sm sm:p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-[#9b6bc7] sm:text-xl">
                0{index + 1}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#9b6bc7]/60" />
            </div>

            <h3 className="mt-1.5 font-display text-base leading-snug text-[#24103a] sm:mt-2.5 sm:text-xl">
              {title}
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-[#675878]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>
  );
}

const atelierSteps = [
  {
    step: '01',
    title: 'Share the brief',
    detail: 'Style, quantity, fabric/GSM, colours and branding notes.',
  },
  {
    step: '02',
    title: 'We craft the quote',
    detail: 'Factory pricing with a clear production timeline from Bhopal.',
  },
  {
    step: '03',
    title: 'Bulk dispatch',
    detail: 'Stitching, finishing checks and delivery to your city.',
  },
];

function YourDesignOurFactory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const items = section.querySelectorAll('[data-atelier-item]');
    items.forEach((el) => {
      el.classList.add(
        'motion-safe:translate-y-6',
        'motion-safe:opacity-0',
        'motion-safe:transition-[opacity,transform]',
        'motion-safe:duration-700',
        'motion-safe:ease-out',
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.remove(
            'motion-safe:translate-y-6',
            'motion-safe:opacity-0',
          );
          observer.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((el, index) => {
      el.style.transitionDelay = `${index * 90}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
  ref={sectionRef}
  aria-labelledby="atelier-heading"
  className="relative overflow-hidden bg-gradient-to-br from-[#f6ebd4] via-[#efe0c0] to-[#e6d3ad] text-[#24103a]"
>
  {/* Subtle Ambient Glow & Watermark */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[#9b6bc7]/15 blur-3xl"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-24 -left-12 font-display text-[clamp(7rem,24vw,16rem)] leading-none tracking-[0.08em] text-[#3b185f]/[0.05] select-none"
  >
    LOMEKA
  </div>

  <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:py-22">
    {/* Top Editorial Header Row */}
    <div
      data-atelier-item
      className="flex flex-col gap-5 border-b border-[#3b185f]/15 pb-8 lg:flex-row lg:items-end lg:justify-between lg:pb-10"
    >
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3b185f]/20 bg-white/75 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] text-[#3b185f] uppercase shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6f3fa1]" />
          Private label · Custom bulk
        </span>

        <h2
          id="atelier-heading"
          className="mt-4 font-display text-[clamp(2.25rem,5.2vw,4.1rem)] leading-[1.03] tracking-tight text-[#24103a]"
        >
          Your design.{' '}
          <span className="block text-[#5c2d91] sm:inline">
            Our factory.
          </span>
        </h2>
      </div>

      <p className="max-w-md text-sm leading-relaxed text-[#3d2b52] sm:text-base lg:text-right">
        Bring a reference photo, tech pack or catalogue pick. LOMEKA turns it
        into wholesale-ready men’s and women’s apparel — with your colours,
        prints, embroidery and labels.
      </p>
    </div>

    {/* Main Content Grid: Left Visual Showcase + Right Interactive Step Cards */}
    <div className="mt-9 grid gap-8 lg:mt-11 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-12">
      {/* Visual Bento Collage */}
      <div
        data-atelier-item
        className="grid grid-cols-12 gap-3.5 sm:gap-4"
      >
        <figure className="group relative col-span-12 overflow-hidden rounded-2xl border border-[#3b185f]/20 bg-white shadow-lg">
          <div className="aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
            <img
              src="/img55.png"
              alt="LOMEKA wholesale apparel samples on display"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#1f0d36]/90 via-[#1f0d36]/55 to-transparent px-4 py-4 sm:px-6">
            <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
              Catalogue styles & custom bulk runs
            </span>
            <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
              MOQ Friendly
            </span>
          </figcaption>
        </figure>

        <figure className="group relative col-span-6 overflow-hidden rounded-2xl border border-[#3b185f]/20 bg-white shadow-sm">
          <div className="aspect-[4/4] overflow-hidden sm:aspect-[5/4]">
            <img
              src="/stage-material-v1.png"
              alt="LOMEKA fabric rolls and material sourcing"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f0d36]/90 to-transparent px-3.5 py-3">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#e3c8fc] uppercase">
              Fabric & GSM
            </p>
            <p className="text-xs text-white/95">Curated bulk mills</p>
          </div>
        </figure>

        <figure className="group relative col-span-6 overflow-hidden rounded-2xl border border-[#3b185f]/20 bg-white shadow-sm">
          <div className="aspect-[4/4] overflow-hidden sm:aspect-[5/4]">
            <img
              src="/stage-make-v1.png"
              alt="LOMEKA stitching and garment construction"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f0d36]/90 to-transparent px-3.5 py-3">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#e3c8fc] uppercase">
              From Bhopal
            </p>
            <p className="text-xs text-white/95">In-house production</p>
          </div>
        </figure>
      </div>

      {/* Right Column: Elevated Step Cards + CTA */}
      <div className="flex flex-col justify-between">
        <ol className="space-y-3.5 sm:space-y-4">
          {atelierSteps.map(({ step, title, detail }) => (
            <li
              key={step}
              data-atelier-item
              className="group rounded-2xl border border-[#3b185f]/15 bg-white/85 p-4 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-[#3b185f]/45 hover:bg-white hover:shadow-md sm:p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3b185f]/25 bg-[#f3e6cc] font-display text-lg text-[#24103a] transition-colors group-hover:bg-[#3b185f] group-hover:text-white">
                  {step}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl leading-snug text-[#24103a] sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4f3e63]">
                    {detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Trust Strip + Action Buttons */}
        <div data-atelier-item className="mt-7 pt-2">
          <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#3d2b52]">
            <span>✓ Custom labels & neck tags</span>
            <span>✓ Screen, DTF & embroidery</span>
            <span>✓ Pan-India & export dispatch</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact?type=custom"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24103a] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-[#3b185f] sm:w-auto sm:flex-1"
            >
              Start a Custom Enquiry →
            </Link>

            <Link
              to="/manufacturing-wholesale"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[#24103a]/30 bg-white/80 px-6 py-3.5 text-center text-sm font-semibold text-[#24103a] transition-all hover:border-[#24103a] hover:bg-white sm:w-auto sm:flex-1"
            >
              See Manufacturing Process
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default function Home() {
  return (
    <>
      <section className="border-b border-gold/25 bg-[#c4b0d7]">
        <div className="mx-auto grid max-w-[100rem] lg:grid-cols-[44fr_56fr]">
          <div className="flex flex-col justify-center bg-gradient-to-b from-[#e9dff2] to-[#f4ecfa] px-5 py-8 sm:px-10 sm:py-12 lg:min-h-[clamp(24rem,32vw,33rem)] lg:px-[9%]">
            <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              Apparel manufacturing · Bhopal & Dubai
            </p>

            <h1 className="mt-3 text-[clamp(2.05rem,8.4vw,4.45rem)] leading-[1.03] tracking-[-0.04em] lg:text-[clamp(2.35rem,4.55vw,4.45rem)] lg:leading-[1.01]">
              <span className="lg:block">Men’s & Women’s</span>{' '}
              <span className="lg:block">Fashion</span>{' '}
              <span className="lg:block">Manufacturing</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/85 sm:text-base lg:text-[clamp(0.95rem,1.3vw,1.15rem)]">
              Wholesale T-shirts, tracksuits, hoodies and custom apparel for
              distributors, retailers and private-label buyers.
            </p>

           <div className="mt-5 flex flex-row flex-nowrap items-center gap-2 sm:mt-6 sm:gap-3">
  <Link
    to="/collections"
    className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#3b185f] px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#280e44] sm:gap-2.5 sm:px-4 sm:text-xs sm:tracking-[0.1em]"
  >
    <span>View Collections</span>
    <span
      aria-hidden="true"
      className="grid size-4 shrink-0 place-items-center rounded-full bg-white text-[10px] text-[#3b185f] transition-transform duration-200 group-hover:translate-x-0.5 sm:size-6 sm:text-xs"
    >
      →
    </span>
  </Link>

  <Link
    to="/contact"
    className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#3b185f]/30 bg-white px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#3b185f] uppercase transition-colors hover:border-[#3b185f] hover:bg-[#faf7fd] sm:gap-2.5 sm:px-4 sm:text-xs sm:tracking-[0.1em]"
  >
    <span>Wholesale Enquiry</span>
    <span
      aria-hidden="true"
      className="grid size-4 shrink-0 place-items-center rounded-full bg-[#3b185f] text-[10px] text-white transition-transform duration-200 group-hover:translate-x-0.5 sm:size-6 sm:text-xs"
    >
      →
    </span>
  </Link>
</div>
          </div>

          <Link
  to="/collections"
  aria-label="Explore men’s and women’s collections"
  className="group relative block aspect-[4/3] overflow-hidden bg-[#efe6f7] sm:aspect-[3/2] lg:aspect-auto"
>
  <img
    src="/hero-closeup.png"
    alt="Fabric rolls and wholesale garments on display rack"
    fetchPriority="high"
    className="h-full w-full object-cover object-center contrast-[1.03] saturate-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
  />

  {/* Left edge blend into hero background without washing out center */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f6effb] to-transparent lg:w-28"
  />

  {/* Subtle rich vignette at outer corners only */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_48%,transparent_52%,rgba(36,16,58,0.18)_100%)]"
  />
</Link>
        </div>
      </section>

  <div className="mb-5 sm:mb-8">
  <FeatureStrip />
</div>


      <YourDesignOurFactory />
      <CollectionsSection />
      <WhyChooseLomeka />

      <CategoryShowcaseSection />

      <CategoryCatalogCarousel />

      <ExploreByStyle />
    </>
  );
}