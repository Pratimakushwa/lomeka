// import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import CategoryShowcaseSection from './CategoryShowcaseSection';
// import CategoryCatalogCarousel from './CategoryCatalogCarousel';
// import FeatureStrip from '../components/FeatureStrip';

// const collections = [
//   {
//     title: 'Men’s Collection',
//     href: '/collections#mens',
//     image: '/img5.png',
//     alt: 'Man wearing a charcoal oversized T-shirt',
//   },
//   {
//     title: 'Women’s Collection',
//     href: '/collections#womens',
//     image: '/img2.png',
//     alt: 'Woman wearing a burgundy tracksuit',
//   },
// ];

// function CollectionsSection() {
//   const sectionRef = useRef(null);

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

//       <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
//         {collections.map(({ title, href, image, alt }) => (
//           <Link
//             key={href}
//             to={href}
//             className="brand-card brand-card-hover group block overflow-hidden"
//           >
//             <div className="aspect-[4/3] overflow-hidden bg-[#ebded0] sm:aspect-[3/2]">
//               <img
//                 src={image}
//                 alt={alt}
//                 loading="lazy"
//                 decoding="async"
//                 className="block h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
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
//     </section>
//   );
// }

// function ExploreByStyle() {
//   return (
//     <section
//       aria-labelledby="style-heading"
//       className="w-full pb-8 sm:pb-14"
//     >
//       <div className="grid min-h-[190px] w-full grid-cols-[minmax(0,48fr)_minmax(0,52fr)] overflow-hidden bg-navy text-ivory sm:min-h-[240px] sm:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:min-h-[clamp(300px,24vw,420px)] lg:grid-cols-[minmax(0,41fr)_minmax(0,59fr)]">
//         <div className="flex min-w-0 flex-col justify-center px-3.5 py-4 sm:px-6 lg:py-10 lg:pr-3 lg:pl-[5vw]">
//           <h2
//             id="style-heading"
//             className="font-display text-[clamp(1.25rem,4.6vw,5.25rem)] leading-tight tracking-tight"
//           >
//             Explore by Style
//           </h2>

//           <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2.5 lg:mt-6 lg:gap-4">
//             <Link
//               to="/collections?category=t-shirts"
//               className="inline-flex min-h-9 items-center justify-center rounded-md border border-gold bg-gold px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-navy transition-colors hover:border-ivory hover:bg-ivory focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
//             >
//               View T-Shirts
//             </Link>

//             <Link
//               to="/collections?category=tracksuits"
//               className="inline-flex min-h-9 items-center justify-center rounded-md border border-ivory px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-ivory transition-colors hover:bg-ivory hover:text-navy focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
//             >
//               View Tracksuits
//             </Link>
//           </div>
//         </div>

//         <div className="relative min-w-0 overflow-hidden bg-[#e8d7c2] [clip-path:ellipse(115%_132%_at_115%_50%)]">
//           <img
//             src="/img9.png"
//             alt="Charcoal and ivory T-shirts beside a burgundy tracksuit"
//             loading="lazy"
//             decoding="async"
//             className="absolute inset-0 block h-full w-full object-cover object-center pl-[6%] lg:object-right lg:pl-0"
//           />
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
//       aria-labelledby="why-lomeka-heading"
//       className="border-y border-gold/25 bg-white"
//     >
//       <div className="mx-auto max-w-7xl section-pad">
//         <div className="mx-auto max-w-2xl text-center">
//           <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//             Why buyers choose LOMEKA
//           </p>
//           <h2
//             id="why-lomeka-heading"
//             className="mt-2 font-display text-3xl leading-tight text-navy sm:text-4xl"
//           >
//             Built for wholesale and custom apparel orders
//           </h2>
//           <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
//           LOMEKA manufactures and supplies bulk
//             men’s and women’s wear from Kolar Road, Bhopal.
//           </p>
//         </div>

//         <div className="mt-8 grid gap-4 sm:grid-cols-3">
//           {whyChoose.map(({ title, description }) => (
//             <article key={title} className="brand-card p-5 sm:p-6">
//               <h3 className="font-display text-xl text-navy sm:text-2xl">
//                 {title}
//               </h3>
//               <p className="mt-2 text-sm leading-relaxed text-muted">
//                 {description}
//               </p>
//             </article>
//           ))}
//         </div>

//         <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
//           <Link to="/manufacturing-wholesale" className="brand-btn-primary">
//             Manufacturing & Wholesale
//           </Link>
//           <Link to="/contact" className="brand-btn-secondary">
//             Request a Quote
//           </Link>
//         </div>
//       </div>
//     </section>
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
//       ref={sectionRef}
//       aria-labelledby="atelier-heading"
//       className="relative overflow-hidden bg-navy text-ivory"
//     >
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,138,80,0.18),transparent_55%)]"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-24 -left-16 font-display text-[clamp(8rem,28vw,18rem)] leading-none tracking-[0.08em] text-ivory/[0.04] select-none"
//       >
//         LOMEKA
//       </div>

//       <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20">
//         <div data-atelier-item>
//           <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
//             Private label · Custom bulk
//           </p>

//           <h2
//             id="atelier-heading"
//             className="mt-3 max-w-xl font-display text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
//           >
//             Your design.
//             <span className="mt-1 block text-gold">Our factory.</span>
//           </h2>

//           <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/80 sm:text-base">
//             Bring a reference photo, tech pack or catalogue pick. LOMEKA turns
//             it into wholesale-ready men’s and women’s apparel — with your
//             colours, prints, embroidery and labels.
//           </p>

//           <ol className="mt-8 space-y-0 border-t border-ivory/15">
//             {atelierSteps.map(({ step, title, detail }) => (
//               <li
//                 key={step}
//                 data-atelier-item
//                 className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 border-b border-ivory/15 py-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-5"
//               >
//                 <span className="font-display text-2xl leading-none text-gold sm:text-3xl">
//                   {step}
//                 </span>
//                 <div>
//                   <h3 className="font-display text-xl text-ivory sm:text-2xl">
//                     {title}
//                   </h3>
//                   <p className="mt-1 text-sm leading-relaxed text-ivory/70">
//                     {detail}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ol>

//           <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
//             <Link
//               to="/contact?type=custom"
//               className="brand-btn-gold w-full sm:w-auto"
//             >
//               Start a Custom Enquiry
//             </Link>
//             <Link
//               to="/manufacturing-wholesale"
//               className="brand-btn w-full border border-ivory/45 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
//             >
//               See Manufacturing Process
//             </Link>
//           </div>
//         </div>

//         <div
//           data-atelier-item
//           className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
//         >
//           <figure className="group relative col-span-2 overflow-hidden rounded-[var(--radius-card)] bg-[#1a3d32]">
//             <div className="aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
//               <img
//                 src="/img55.png"
//                 alt="LOMEKA wholesale apparel samples on display"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
//               />
//             </div>
//             <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-4 py-4 text-xs font-semibold tracking-wide text-ivory sm:px-5 sm:text-sm">
//               Catalogue styles & custom bulk runs
//             </figcaption>
//           </figure>

//           <figure className="group overflow-hidden rounded-[var(--radius-card)] bg-[#1a3d32]">
//             <div className="aspect-[4/5] overflow-hidden">
//               <img
//                 src="/img6.png"
//                 alt="LOMEKA men’s apparel style close-up"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//               />
//             </div>
//           </figure>

//           <figure className="group relative overflow-hidden rounded-[var(--radius-card)] bg-[#1a3d32]">
//             <div className="aspect-[4/5] overflow-hidden">
//               <img
//                 src="/img1.png"
//                 alt="LOMEKA women’s and activewear style detail"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//               />
//             </div>
//             <div className="absolute inset-x-3 bottom-3 rounded-sm border border-gold/35 bg-navy/75 px-3 py-2 backdrop-blur-sm sm:inset-x-4 sm:bottom-4">
//               <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
//                 From Bhopal
//               </p>
//               <p className="mt-0.5 text-xs leading-snug text-ivory/90 sm:text-sm">
//                 Direct factory production for distributors & private labels
//               </p>
//             </div>
//           </figure>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function Home() {
//   return (
//     <>
//       <section className="bg-[#f8f3ed]">
//         <div className="mx-auto grid max-w-[100rem] lg:grid-cols-[44fr_56fr]">
//           <div className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 lg:min-h-[clamp(24rem,32vw,33rem)] lg:px-[9%]">
//             <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//               Apparel manufacturing · Bhopal
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

//             <div className="mt-5 flex flex-col gap-2.5 xs:flex-row sm:mt-6 sm:flex-row sm:gap-3">
//               <Link
//                 to="/collections"
//                 className="brand-btn-primary w-full sm:w-auto"
//               >
//                 View Collections
//               </Link>

//               <Link
//                 to="/contact"
//                 className="brand-btn-secondary w-full bg-white/70 sm:w-auto"
//               >
//                 Wholesale Enquiry
//               </Link>
//             </div>
//           </div>

//           <Link
//             to="/collections"
//             aria-label="Explore men’s and women’s collections"
//             className="relative block aspect-[4/3] overflow-hidden bg-[#ebe2d6] sm:aspect-[3/2] lg:aspect-auto"
//           >
//             <img
//               src="/hero-closeup.png"
//               alt="Two models wearing forest-green and burgundy track jackets over ivory T-shirts"
//               fetchPriority="high"
//               className="absolute inset-0 h-full w-full object-cover object-top"
//             />
//           </Link>
//         </div>
//       </section>

//       <FeatureStrip />

//       <CollectionsSection />

//       <YourDesignOurFactory />

//       <WhyChooseLomeka />

//       <CategoryShowcaseSection />

//       <CategoryCatalogCarousel />

//       <ExploreByStyle />
//     </>
//   );
// }

// import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import CategoryShowcaseSection from './CategoryShowcaseSection';
// import CategoryCatalogCarousel from './CategoryCatalogCarousel';
// import FeatureStrip from '../components/FeatureStrip';

// const collections = [
//   {
//     title: ' Collections',
//     href: '/collections#mens',
//     image: '/img78.png',
//     alt: 'Man wearing a charcoal oversized T-shirt',
//   },
//   {
//     title: 'Collections',
//     href: '/collections#womens',
//     image: '/img87.png',
//     alt: 'Woman wearing a burgundy tracksuit',
//   },
// ];

// function CollectionsSection() {
//   const sectionRef = useRef(null);

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

//       <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
//         {collections.map(({ title, href, image, alt }) => (
//           <Link
//             key={href}
//             to={href}
//             className="brand-card brand-card-hover group block overflow-hidden"
//           >
//             <div className="aspect-[4/3] overflow-hidden bg-[#ebded0] sm:aspect-[3/2]">
//               <img
//                 src={image}
//                 alt={alt}
//                 loading="lazy"
//                 decoding="async"
//                 className="block h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
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
//     </section>
//   );
// }

// function ExploreByStyle() {
//   return (
//     <section
//       aria-labelledby="style-heading"
//       className="w-full pb-8 sm:pb-14"
//     >
//       <div className="grid min-h-[190px] w-full grid-cols-[minmax(0,48fr)_minmax(0,52fr)] overflow-hidden bg-navy text-ivory sm:min-h-[240px] sm:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:min-h-[clamp(300px,24vw,420px)] lg:grid-cols-[minmax(0,41fr)_minmax(0,59fr)]">
//         <div className="flex min-w-0 flex-col justify-center px-3.5 py-4 sm:px-6 lg:py-10 lg:pr-3 lg:pl-[5vw]">
//           <h2
//             id="style-heading"
//             className="font-display text-[clamp(1.25rem,4.6vw,5.25rem)] leading-tight tracking-tight"
//           >
//             Explore by Style
//           </h2>

//           <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2.5 lg:mt-6 lg:gap-4">
//             <Link
//               to="/collections?category=t-shirts"
//               className="inline-flex min-h-9 items-center justify-center rounded-md border border-gold bg-gold px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-navy transition-colors hover:border-ivory hover:bg-ivory focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
//             >
//               View T-Shirts
//             </Link>

//             <Link
//               to="/collections?category=tracksuits"
//               className="inline-flex min-h-9 items-center justify-center rounded-md border border-ivory px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-ivory transition-colors hover:bg-ivory hover:text-navy focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
//             >
//               View Tracksuits
//             </Link>
//           </div>
//         </div>

//         <div className="relative min-w-0 overflow-hidden bg-[#e8d7c2] [clip-path:ellipse(115%_132%_at_115%_50%)]">
//           <img
//             src="/img9.png"
//             alt="Charcoal and ivory T-shirts beside a burgundy tracksuit"
//             loading="lazy"
//             decoding="async"
//             className="absolute inset-0 block h-full w-full object-cover object-center pl-[6%] lg:object-right lg:pl-0"
//           />
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
//       aria-labelledby="why-lomeka-heading"
//       className="border-y border-gold/25 bg-white"
//     >
//       <div className="mx-auto max-w-7xl section-pad">
//         <div className="mx-auto max-w-2xl text-center">
//           <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//             Why buyers choose LOMEKA
//           </p>
//           <h2
//             id="why-lomeka-heading"
//             className="mt-2 font-display text-3xl leading-tight text-navy sm:text-4xl"
//           >
//             Built for wholesale and custom apparel orders
//           </h2>
//           <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
//           LOMEKA manufactures and supplies bulk
//             men’s and women’s wear from Kolar Road, Bhopal.
//           </p>
//         </div>

//         <div className="mt-8 grid gap-4 sm:grid-cols-3">
//           {whyChoose.map(({ title, description }) => (
//             <article key={title} className="brand-card p-5 sm:p-6">
//               <h3 className="font-display text-xl text-navy sm:text-2xl">
//                 {title}
//               </h3>
//               <p className="mt-2 text-sm leading-relaxed text-muted">
//                 {description}
//               </p>
//             </article>
//           ))}
//         </div>

//         <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
//           <Link to="/manufacturing-wholesale" className="brand-btn-primary">
//             Manufacturing & Wholesale
//           </Link>
//           <Link to="/contact" className="brand-btn-secondary">
//             Request a Quote
//           </Link>
//         </div>
//       </div>
//     </section>
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
//       ref={sectionRef}
//       aria-labelledby="atelier-heading"
//       className="relative overflow-hidden bg-navy text-ivory"
//     >
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(155,107,199,0.22),transparent_55%)]"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-24 -left-16 font-display text-[clamp(8rem,28vw,18rem)] leading-none tracking-[0.08em] text-ivory/[0.04] select-none"
//       >
//         LOMEKA
//       </div>

//       <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20">
//         <div data-atelier-item>
//           <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
//             Private label · Custom bulk
//           </p>

//           <h2
//             id="atelier-heading"
//             className="mt-3 max-w-xl font-display text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
//           >
//             Your design.
//             <span className="mt-1 block text-gold">Our factory.</span>
//           </h2>

//           <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/80 sm:text-base">
//             Bring a reference photo, tech pack or catalogue pick. LOMEKA turns
//             it into wholesale-ready men’s and women’s apparel — with your
//             colours, prints, embroidery and labels.
//           </p>

//           <ol className="mt-8 space-y-0 border-t border-ivory/15">
//             {atelierSteps.map(({ step, title, detail }) => (
//               <li
//                 key={step}
//                 data-atelier-item
//                 className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 border-b border-ivory/15 py-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-5"
//               >
//                 <span className="font-display text-2xl leading-none text-gold sm:text-3xl">
//                   {step}
//                 </span>
//                 <div>
//                   <h3 className="font-display text-xl text-ivory sm:text-2xl">
//                     {title}
//                   </h3>
//                   <p className="mt-1 text-sm leading-relaxed text-ivory/70">
//                     {detail}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ol>

//           <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
//             <Link
//               to="/contact?type=custom"
//               className="brand-btn-gold w-full sm:w-auto"
//             >
//               Start a Custom Enquiry
//             </Link>
//             <Link
//               to="/manufacturing-wholesale"
//               className="brand-btn w-full border border-ivory/45 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
//             >
//               See Manufacturing Process
//             </Link>
//           </div>
//         </div>

//         <div
//           data-atelier-item
//           className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
//         >
//           <figure className="group relative col-span-2 overflow-hidden rounded-[var(--radius-card)] bg-[#2a1244]">
//             <div className="aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
//               <img
//                 src="/img55.png"
//                 alt="LOMEKA wholesale apparel samples on display"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
//               />
//             </div>
//             <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-4 py-4 text-xs font-semibold tracking-wide text-ivory sm:px-5 sm:text-sm">
//               Catalogue styles & custom bulk runs
//             </figcaption>
//           </figure>

//           <figure className="group overflow-hidden rounded-[var(--radius-card)] bg-[#2a1244]">
//             <div className="aspect-[4/5] overflow-hidden">
//               <img
//                 src="/img6.png"
//                 alt="LOMEKA men’s apparel style close-up"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//               />
//             </div>
//           </figure>

//           <figure className="group relative overflow-hidden rounded-[var(--radius-card)] bg-[#2a1244]">
//             <div className="aspect-[4/5] overflow-hidden">
//               <img
//                 src="/img1.png"
//                 alt="LOMEKA women’s and activewear style detail"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//               />
//             </div>
//             <div className="absolute inset-x-3 bottom-3 rounded-sm border border-gold/35 bg-navy/75 px-3 py-2 backdrop-blur-sm sm:inset-x-4 sm:bottom-4">
//               <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
//                 From Bhopal
//               </p>
//               <p className="mt-0.5 text-xs leading-snug text-ivory/90 sm:text-sm">
//                 Direct factory production for distributors & private labels
//               </p>
//             </div>
//           </figure>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function Home() {
//   return (
//     <>
//       <section className="border-b border-gold/25 bg-[#faf7fd]">
//         <div className="mx-auto grid max-w-[100rem] lg:grid-cols-[44fr_56fr]">
//           <div className="flex flex-col justify-center bg-gradient-to-b from-[#fcfafe] to-[#f4ecfa] px-5 py-8 sm:px-10 sm:py-12 lg:min-h-[clamp(24rem,32vw,33rem)] lg:px-[9%]">
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

//             <div className="mt-5 flex flex-col gap-2.5 xs:flex-row sm:mt-6 sm:flex-row sm:gap-3">
//               <Link
//                 to="/collections"
//                 className="brand-btn-primary w-full sm:w-auto"
//               >
//                 View Collections
//               </Link>

//               <Link
//                 to="/contact"
//                 className="brand-btn-secondary w-full bg-white sm:w-auto"
//               >
//                 Wholesale Enquiry
//               </Link>
//             </div>
//           </div>

//           <Link
//             to="/collections"
//             aria-label="Explore men’s and women’s collections"
//             className="group relative block aspect-[4/3] overflow-hidden bg-[#efe6f7] sm:aspect-[3/2] lg:aspect-auto"
//           >
//             <img
//               src="/hero-closeup.png"
//               alt="Two models wearing forest-green and burgundy track jackets over ivory T-shirts"
//               fetchPriority="high"
//               className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
//             />

//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f6effb] via-[#f6effb]/35 to-transparent lg:w-1/3"
//             />
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3b185f]/20 via-transparent to-[#9b6bc7]/15 mix-blend-multiply"
//             />
//           </Link>
//         </div>
//       </section>

//       <FeatureStrip />

//       <CollectionsSection />

//       <YourDesignOurFactory />

//       <WhyChooseLomeka />

//       <CategoryShowcaseSection />

//       <CategoryCatalogCarousel />

//       <ExploreByStyle />
//     </>
//   );
// }

import { useEffect, useRef } from 'react';
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
        {collections.map(({ key, title, href, image, alt }) => (
          <Link
            key={key}
            to={href}
            className="brand-card brand-card-hover group block overflow-hidden"
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
            <Link
              to="/collections?category=t-shirts"
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-gold bg-gold px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-navy transition-colors hover:border-ivory hover:bg-ivory focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
            >
              View T-Shirts
            </Link>

            <Link
              to="/collections?category=tracksuits"
              className="inline-flex min-h-9 items-center justify-center rounded-md border border-ivory px-2.5 py-1.5 text-center font-display text-[11px] leading-tight text-ivory transition-colors hover:bg-ivory hover:text-navy focus-visible:outline-gold sm:min-h-11 sm:px-4 sm:text-base lg:px-6 lg:py-2.5 lg:text-xl"
            >
              View Tracksuits
            </Link>
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
      className="border-y border-gold/25 bg-white"
    >
      <div className="mx-auto max-w-7xl section-pad">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
            Why buyers choose LOMEKA
          </p>
          <h2
            id="why-lomeka-heading"
            className="mt-2 font-display text-3xl leading-tight text-navy sm:text-4xl"
          >
            Built for wholesale and custom apparel orders
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          LOMEKA manufactures and supplies bulk
            men’s and women’s wear from Kolar Road, Bhopal.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {whyChoose.map(({ title, description }) => (
            <article key={title} className="brand-card p-5 sm:p-6">
              <h3 className="font-display text-xl text-navy sm:text-2xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/manufacturing-wholesale" className="brand-btn-primary">
            Manufacturing & Wholesale
          </Link>
          <Link to="/contact" className="brand-btn-secondary">
            Request a Quote
          </Link>
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
      className="relative overflow-hidden bg-navy text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(155,107,199,0.22),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 font-display text-[clamp(8rem,28vw,18rem)] leading-none tracking-[0.08em] text-ivory/[0.04] select-none"
      >
        LOMEKA
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20">
        <div data-atelier-item>
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
            Private label · Custom bulk
          </p>

          <h2
            id="atelier-heading"
            className="mt-3 max-w-xl font-display text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
          >
            Your design.
            <span className="mt-1 block text-gold">Our factory.</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/80 sm:text-base">
            Bring a reference photo, tech pack or catalogue pick. LOMEKA turns
            it into wholesale-ready men’s and women’s apparel — with your
            colours, prints, embroidery and labels.
          </p>

          <ol className="mt-8 space-y-0 border-t border-ivory/15">
            {atelierSteps.map(({ step, title, detail }) => (
              <li
                key={step}
                data-atelier-item
                className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 border-b border-ivory/15 py-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-5"
              >
                <span className="font-display text-2xl leading-none text-gold sm:text-3xl">
                  {step}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ivory sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory/70">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/contact?type=custom"
              className="brand-btn-gold w-full sm:w-auto"
            >
              Start a Custom Enquiry
            </Link>
            <Link
              to="/manufacturing-wholesale"
              className="brand-btn w-full border border-ivory/45 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
            >
              See Manufacturing Process
            </Link>
          </div>
        </div>

        <div
          data-atelier-item
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
        >
          <figure className="group relative col-span-2 overflow-hidden rounded-[var(--radius-card)] bg-[#2a1244]">
            <div className="aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
              <img
                src="/img55.png"
                alt="LOMEKA wholesale apparel samples on display"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-4 py-4 text-xs font-semibold tracking-wide text-ivory sm:px-5 sm:text-sm">
              Catalogue styles & custom bulk runs
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-[var(--radius-card)] bg-[#2a1244]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/img6.png"
                alt="LOMEKA men’s apparel style close-up"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </figure>

          <figure className="group relative overflow-hidden rounded-[var(--radius-card)] bg-[#2a1244]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/img1.png"
                alt="LOMEKA women’s and activewear style detail"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-x-3 bottom-3 rounded-sm border border-gold/35 bg-navy/75 px-3 py-2 backdrop-blur-sm sm:inset-x-4 sm:bottom-4">
              <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
                From Bhopal
              </p>
              <p className="mt-0.5 text-xs leading-snug text-ivory/90 sm:text-sm">
                Direct factory production for distributors & private labels
              </p>
            </div>
          </figure>
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

            <div className="mt-5 flex flex-col gap-2.5 xs:flex-row sm:mt-6 sm:flex-row sm:gap-3">
              <Link
                to="/collections"
                className="brand-btn-primary w-full sm:w-auto"
              >
                View Collections
              </Link>

              <Link
                to="/contact"
                className="brand-btn-secondary w-full bg-white sm:w-auto"
              >
                Wholesale Enquiry
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
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f6effb] via-[#f6effb]/35 to-transparent lg:w-1/3"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3b185f]/20 via-transparent to-[#9b6bc7]/15 mix-blend-multiply"
            />
          </Link>
        </div>
      </section>

      <FeatureStrip />

      <CollectionsSection />

      <YourDesignOurFactory />

      <WhyChooseLomeka />

      <CategoryShowcaseSection />

      <CategoryCatalogCarousel />

      <ExploreByStyle />
    </>
  );
}