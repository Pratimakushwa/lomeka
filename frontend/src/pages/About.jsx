// import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Factory,
//   Shirt,
//   Palette,
//   Truck,
//   MapPin,
//   UserRound,
//   Sparkles,
// } from 'lucide-react';

// const glancePoints = [
//   {
//     label: 'Based in',
//     value: 'Bhopal, Madhya Pradesh',
//   },
//   {
//     label: 'Led by',
//     value: 'Ms. Neetu Kushwaha',
//   },
//   {
//     label: 'Focus',
//     value: 'Men’s & women’s wholesale apparel',
//   },
//   {
//     label: 'Also offers',
//     value: 'Custom & private-label production',
//   },
// ];

// const manufacturingCategories = [
//   {
//     title: 'T-Shirts',
//     tag: 'Everyday essentials',
//     description:
//       'Crew-neck, oversized, boxy, polo, V-neck and custom GSM combed cotton tees for men and women.',
//   },
//   {
//     title: 'Lowers & Joggers',
//     tag: 'Comfort wear',
//     description:
//       'Cotton, fleece, dry-fit and French terry lowers, trackpants and cuffed joggers for daily and active use.',
//   },
//   {
//     title: 'Hoodies & Jackets',
//     tag: 'Winter layering',
//     description:
//       'Heavyweight fleece hoodies, zip-ups, crew sweatshirts, windcheaters and outerwear across GSM options.',
//   },
//   {
//     title: 'Tracksuits & Activewear',
//     tag: 'Set styles',
//     description:
//       'Matching tracksuit sets, gym wear, sportswear, running sets and breathable performance co-ords.',
//   },
//   {
//     title: 'Custom & Private Label',
//     tag: 'Your brand',
//     description:
//       'Buyer designs, prints, embroidery, neck labels and packaging — made to your tech pack or sample photo.',
//   },
//   {
//     title: 'Seasonal Ranges',
//     tag: 'Year-round',
//     description:
//       'Knit and woven bulk production for summer, monsoon and winter collections tailored to wholesale needs.',
//   },
// ];

// const partnerBenefits = [
//   {
//     Icon: Factory,
//     title: 'Direct factory pricing',
//     description:
//       'Competitive wholesale rates from our Bhopal unit — without middlemen in between.',
//   },
//   {
//     Icon: Shirt,
//     title: 'Fabric & stitch checks',
//     description:
//       'GSM accuracy, colourfast dyeing, shrinkage control, seam strength and clean finishing on every batch.',
//   },
//   {
//     Icon: Palette,
//     title: 'Custom branding support',
//     description:
//       'Size charts, colourways, screen/DTF print, embroidery, woven labels and packaging support.',
//   },
//   {
//     Icon: Truck,
//     title: 'Reliable bulk dispatch',
//     description:
//       'Clear production planning and timely bulk delivery across India for wholesale buyers.',
//   },
// ];

// const wholesaleSteps = [
//   {
//     step: '01',
//     title: 'Choose or share a design',
//     description:
//       'Pick from the catalogue or send a sample photo, sketch or tech pack.',
//   },
//   {
//     step: '02',
//     title: 'Share bulk specs',
//     description:
//       'Quantity, size/colour breakup, fabric/GSM, branding and delivery city.',
//   },
//   {
//     step: '03',
//     title: 'Get factory quote',
//     description:
//       'We share wholesale pricing with a clear production and dispatch timeline.',
//   },
// ];

// const companyDetails = [
//   ['Business name', 'LOMEKA'],
//   ['Founder / Owner', 'Ms. Neetu Kushwaha'],
//   [
//     'Business office',
//     'Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple, Kolar Road, Bhopal, Madhya Pradesh',
//   ],
//   [
//     'Who we supply',
//     'Wholesalers, distributors, retail stores, chains and private-label apparel brands across India',
//   ],
// ];

// const factoryDetails = [
//   [
//     'Manufacturing unit',
//     'MNF – Manufacturing Unit of Garments, Kolar Road, Bhopal (Landmark: Next to Aasa Proteins)',
//   ],
//   [
//     'Manufacturing setup',
//     'Direct factory production, bulk manufacturing and custom private-label orders',
//   ],
//   [
//     'Garment range',
//     'Men’s & women’s T-shirts, lowers, joggers, hoodies, jackets, tracksuits, co-ords and custom designs',
//   ],
// ];

// function useReveal(selector = '[data-reveal]') {
//   const ref = useRef(null);

//   useEffect(() => {
//     const root = ref.current;
//     if (
//       !root ||
//       !('IntersectionObserver' in window) ||
//       window.matchMedia('(prefers-reduced-motion: reduce)').matches
//     ) {
//       return;
//     }

//     const nodes = root.querySelectorAll(selector);
//     nodes.forEach((node) => {
//       node.classList.add(
//         'motion-safe:translate-y-5',
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
//           entry.target.classList.remove(
//             'motion-safe:translate-y-5',
//             'motion-safe:opacity-0',
//           );
//           observer.unobserve(entry.target);
//         });
//       },
//       { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
//     );

//     nodes.forEach((node, index) => {
//       node.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
//       observer.observe(node);
//     });

//     return () => observer.disconnect();
//   }, [selector]);

//   return ref;
// }

// function DetailsColumn({ title, Icon, details }) {
//   return (
//     <div>
//       <div className="flex items-center gap-2.5">
//         <span className="grid size-9 place-items-center rounded-full border border-gold/40 bg-gold/10 text-navy">
//           <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
//         </span>
//         <h3 className="font-display text-2xl text-navy">{title}</h3>
//       </div>

//       <dl className="mt-4 divide-y divide-gold/25 text-sm sm:text-[15px]">
//         {details.map(([label, value]) => (
//           <div key={label} className="py-3.5">
//             <dt className="text-[11px] font-bold tracking-[0.14em] text-gold uppercase">
//               {label}
//             </dt>
//             <dd className="mt-1.5 leading-relaxed text-muted">{value}</dd>
//           </div>
//         ))}
//       </dl>
//     </div>
//   );
// }

// export default function About() {
//   const pageRef = useReveal();

//   return (
//     <div ref={pageRef} className="bg-ivory text-navy">
//       {/* Hero */}
//       <header className="relative overflow-hidden border-b border-gold/30 bg-navy text-ivory">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,138,80,0.22),transparent_55%)]"
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-8 bottom-0 font-display text-[clamp(6rem,22vw,14rem)] leading-none tracking-[0.06em] text-ivory/[0.05] select-none"
//         >
//           ABOUT
//         </div>

//         <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12 lg:py-20">
//           <div data-reveal>
//             <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
//               The LOMEKA story
//             </p>
//             <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-tight">
//               Apparel made for
//               <span className="mt-1 block text-gold">wholesale buyers</span>
//             </h1>
//             <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/85 sm:text-base">
//               Led by Ms. Neetu Kushwaha, LOMEKA manufactures and supplies men’s
//               and women’s apparel in bulk from Bhopal — plus custom
//               buyer-designed collections for private-label brands.
//             </p>

//             <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
//               <Link to="/collections" className="brand-btn-gold w-full sm:w-auto">
//                 View Collections
//               </Link>
//               <Link
//                 to="/contact"
//                 className="brand-btn w-full border border-ivory/50 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
//               >
//                 Custom Order Enquiry
//               </Link>
//             </div>
//           </div>

//           <div
//             data-reveal
//             className="relative overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-[#163f33]"
//           >
//             <div className="aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
//               <img
//                 src="/img55.png"
//                 alt="LOMEKA wholesale garment manufacturing collection"
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>
//             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent px-4 py-4 sm:px-5 sm:py-5">
//               <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
//                 Kolar Road · Bhopal
//               </p>
//               <p className="mt-1 text-sm text-ivory/90">
//                 Direct factory production for distributors & private labels
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* At a glance */}
//       <section
//         aria-label="LOMEKA at a glance"
//         className="border-b border-gold/25 bg-white"
//       >
//         <div className="mx-auto grid max-w-7xl gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
//           {glancePoints.map(({ label, value }) => (
//             <div
//               key={label}
//               data-reveal
//               className="bg-white px-5 py-6 sm:px-6 sm:py-7"
//             >
//               <p className="text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
//                 {label}
//               </p>
//               <p className="mt-2 font-display text-xl leading-snug text-navy sm:text-2xl">
//                 {value}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Who we are */}
//       <section aria-labelledby="who-heading" className="section-pad">
//         <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
//           <div data-reveal className="grid grid-cols-2 gap-3 lg:col-span-5">
//             <figure className="col-span-2 overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
//               <div className="aspect-[16/10] overflow-hidden">
//                 <img
//                   src="/hero-closeup.png"
//                   alt="Models in LOMEKA forest-green and burgundy apparel"
//                   loading="lazy"
//                   decoding="async"
//                   className="h-full w-full object-cover object-top"
//                 />
//               </div>
//             </figure>
//             <figure className="overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
//               <div className="aspect-[4/5] overflow-hidden">
//                 <img
//                   src="/img5.png"
//                   alt="LOMEKA men’s apparel style"
//                   loading="lazy"
//                   decoding="async"
//                   className="h-full w-full object-cover object-top"
//                 />
//               </div>
//             </figure>
//             <figure className="overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
//               <div className="aspect-[4/5] overflow-hidden">
//                 <img
//                   src="/img2.png"
//                   alt="LOMEKA women’s apparel style"
//                   loading="lazy"
//                   decoding="async"
//                   className="h-full w-full object-cover object-top"
//                 />
//               </div>
//             </figure>
//           </div>

//           <div data-reveal className="lg:col-span-7">
//             <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//               Who we are
//             </p>
//             <h2
//               id="who-heading"
//               className="mt-2 font-display text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
//             >
//               A Bhopal-based garment manufacturer built for bulk buyers
//             </h2>

//             <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
//               <p>
//                 <strong className="text-navy">LOMEKA</strong> is a dedicated
//                 garment manufacturing and wholesale enterprise led by{' '}
//                 <strong className="text-navy">Ms. Neetu Kushwaha</strong>. From
//                 our Kolar Road unit in Bhopal, we produce and supply apparel in
//                 bulk for wholesalers, distributors, retail chains and
//                 private-label brands across India.
//               </p>
//               <p>
//                 Need ready wholesale stock — or garments in{' '}
//                 <strong className="text-navy">
//                   your own design, fabric, fit and branding
//                 </strong>
//                 ? Our team handles every stage with care, from fabric selection
//                 to finishing and dispatch.
//               </p>
//               <p>
//                 From cotton T-shirts and joggers to heavyweight hoodies,
//                 jackets and tracksuits, each batch is checked for GSM accuracy,
//                 colourfast dyeing, shrinkage control, stitching durability and
//                 clean finishing before it leaves the unit.
//               </p>
//             </div>

//             <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
//               <Link
//                 to="/manufacturing-wholesale"
//                 className="text-sm font-semibold underline decoration-gold underline-offset-4"
//               >
//                 Manufacturing & Wholesale <span aria-hidden="true">→</span>
//               </Link>
//               <Link
//                 to="/collections"
//                 className="text-sm font-semibold underline decoration-gold underline-offset-4"
//               >
//                 Browse Catalogue <span aria-hidden="true">→</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What we manufacture */}
//       <section
//         aria-labelledby="apparel-heading"
//         className="border-y border-gold/25 bg-white"
//       >
//         <div className="mx-auto max-w-7xl section-pad">
//           <div
//             data-reveal
//             className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
//           >
//             <div className="max-w-2xl">
//               <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//                 Product range
//               </p>
//               <h2
//                 id="apparel-heading"
//                 className="mt-2 font-display text-3xl text-navy sm:text-4xl"
//               >
//                 What we manufacture
//               </h2>
//               <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
//                 Complete men’s and women’s everyday, winter and active apparel —
//                 including custom buyer-designed orders made to your
//                 specifications.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 to="/collections?gender=men"
//                 className="text-sm font-semibold underline decoration-gold underline-offset-4"
//               >
//                 Men’s Wear →
//               </Link>
//               <Link
//                 to="/collections?gender=women"
//                 className="text-sm font-semibold underline decoration-gold underline-offset-4"
//               >
//                 Women’s Wear →
//               </Link>
//             </div>
//           </div>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {manufacturingCategories.map(({ title, tag, description }, index) => (
//               <article
//                 key={title}
//                 data-reveal
//                 className="brand-card brand-card-hover group relative overflow-hidden p-5 sm:p-6"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <span className="font-display text-3xl leading-none text-gold/35 transition-colors group-hover:text-gold/60">
//                     {String(index + 1).padStart(2, '0')}
//                   </span>
//                   <span className="rounded-sm bg-surface-alt px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-muted uppercase">
//                     {tag}
//                   </span>
//                 </div>
//                 <h3 className="mt-4 font-display text-xl text-navy sm:text-2xl">
//                   {title}
//                 </h3>
//                 <p className="mt-2 text-sm leading-relaxed text-muted">
//                   {description}
//                 </p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why partner */}
//       <section aria-labelledby="partner-heading" className="section-pad">
//         <div className="mx-auto max-w-7xl">
//           <div data-reveal className="mx-auto max-w-2xl text-center">
//             <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//               Why partner with LOMEKA
//             </p>
//             <h2
//               id="partner-heading"
//               className="mt-2 font-display text-3xl text-navy sm:text-4xl"
//             >
//               Built for serious wholesale relationships
//             </h2>
//             <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
//               Clear pricing, careful quality checks and practical support for
//               custom branding — from brief to bulk dispatch.
//             </p>
//           </div>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2">
//             {partnerBenefits.map(({ Icon, title, description }) => (
//               <article
//                 key={title}
//                 data-reveal
//                 className="brand-card flex gap-4 p-5 sm:gap-5 sm:p-6"
//               >
//                 <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-navy">
//                   <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
//                 </span>
//                 <div>
//                   <h3 className="font-display text-xl text-navy sm:text-2xl">
//                     {title}
//                   </h3>
//                   <p className="mt-1.5 text-sm leading-relaxed text-muted">
//                     {description}
//                   </p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Leadership & unit */}
//       <section
//         aria-labelledby="company-heading"
//         className="border-y border-gold/25 bg-surface-alt"
//       >
//         <div className="mx-auto max-w-7xl section-pad">
//           <div data-reveal className="mb-8 max-w-2xl">
//             <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//               Leadership & unit
//             </p>
//             <h2
//               id="company-heading"
//               className="mt-2 font-display text-3xl text-navy sm:text-4xl"
//             >
//               The people and place behind every order
//             </h2>
//           </div>

//           <div
//             data-reveal
//             className="grid gap-8 rounded-[var(--radius-card)] border border-gold/30 bg-white p-5 sm:p-8 md:grid-cols-2 md:gap-12"
//           >
//             <DetailsColumn
//               title="Company & leadership"
//               Icon={UserRound}
//               details={companyDetails}
//             />
//             <div className="border-t border-gold/30 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
//               <DetailsColumn
//                 title="Manufacturing unit"
//                 Icon={MapPin}
//                 details={factoryDetails}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How to order */}
//       <section aria-labelledby="order-heading" className="section-pad">
//         <div className="mx-auto max-w-7xl">
//           <div
//             data-reveal
//             className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
//           >
//             <div className="max-w-xl">
//               <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
//                 Simple process
//               </p>
//               <h2
//                 id="order-heading"
//                 className="mt-2 font-display text-3xl text-navy sm:text-4xl"
//               >
//                 How to order in bulk or custom design
//               </h2>
//             </div>
//             <span className="inline-flex items-center gap-2 text-sm text-muted">
//               <Sparkles size={16} className="text-gold" aria-hidden="true" />
//               Catalogue styles or your own design
//             </span>
//           </div>

//           <ol className="mt-8 grid gap-4 md:grid-cols-3">
//             {wholesaleSteps.map(({ step, title, description }) => (
//               <li
//                 key={step}
//                 data-reveal
//                 className="brand-card relative overflow-hidden p-5 sm:p-6"
//               >
//                 <span
//                   aria-hidden="true"
//                   className="font-display text-5xl leading-none text-gold/20"
//                 >
//                   {step}
//                 </span>
//                 <h3 className="mt-3 font-display text-xl text-navy sm:text-2xl">
//                   {title}
//                 </h3>
//                 <p className="mt-2 text-sm leading-relaxed text-muted">
//                   {description}
//                 </p>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </section>

//       {/* Closing CTA */}
//       <section
//         aria-labelledby="about-cta-heading"
//         className="border-t border-gold/25 bg-navy text-ivory"
//       >
//         <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14">
//           <div data-reveal className="max-w-xl">
//             <h2
//               id="about-cta-heading"
//               className="font-display text-3xl leading-tight sm:text-4xl"
//             >
//               Ready to plan your next bulk order?
//             </h2>
//             <p className="mt-3 text-sm leading-relaxed text-ivory/80 sm:text-base">
//               Share the garment type, quantity and delivery city — or attach
//               your design reference for a custom quote.
//             </p>
//           </div>

//           <div data-reveal className="flex flex-col gap-3 sm:flex-row">
//             <Link to="/contact" className="brand-btn-gold w-full sm:w-auto">
//               Request a Quote
//             </Link>
//             <Link
//               to="/collections"
//               className="brand-btn w-full border border-ivory/45 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
//             >
//               Explore Collections
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  Shirt,
  Palette,
  Truck,
  MapPin,
  UserRound,
  Sparkles,
  Award,
} from 'lucide-react';

const glancePoints = [
  {
    label: 'Based in',
    value: 'Bhopal, MP & Dubai, UAE',
  },
  {
    label: 'Our business',
    value: 'Manufacturer, Wholesaler & Supplier',
  },
  {
    label: 'Focus',
    value: 'Men’s & women’s wholesale apparel',
  },
  {
    label: 'Also offers',
    value: 'Custom & private-label production',
  },
];

const manufacturingCategories = [
  {
    title: 'T-Shirts',
    tag: 'Everyday essentials',
    description:
      'Crew-neck, oversized, boxy, polo, V-neck and custom GSM combed cotton tees for men and women.',
  },
  {
    title: 'Lowers & Joggers',
    tag: 'Comfort wear',
    description:
      'Cotton, fleece, dry-fit and French terry lowers, trackpants and cuffed joggers for daily and active use.',
  },
  {
    title: 'Hoodies & Jackets',
    tag: 'Winter layering',
    description:
      'Heavyweight fleece hoodies, zip-ups, crew sweatshirts, windcheaters and outerwear across GSM options.',
  },
  {
    title: 'Tracksuits & Activewear',
    tag: 'Set styles',
    description:
      'Matching tracksuit sets, gym wear, sportswear, running sets and breathable performance co-ords.',
  },
  {
    title: 'Custom & Private Label',
    tag: 'Your brand',
    description:
      'Buyer designs, prints, embroidery, neck labels and packaging — made to your tech pack or sample photo.',
  },
  {
    title: 'Seasonal Ranges',
    tag: 'Year-round',
    description:
      'Knit and woven bulk production for summer, monsoon and winter collections tailored to wholesale needs.',
  },
];

const partnerBenefits = [
  {
    Icon: Factory,
    title: 'Direct factory pricing',
    description:
      'Competitive wholesale rates from our Bhopal unit with smooth coordination across Bhopal & Dubai.',
  },
  {
    Icon: Shirt,
    title: 'Fabric & stitch checks',
    description:
      'GSM accuracy, colourfast dyeing, shrinkage control, seam strength and clean finishing on every batch.',
  },
  {
    Icon: Palette,
    title: 'Custom branding support',
    description:
      'Size charts, colourways, screen/DTF print, embroidery, woven labels and packaging support.',
  },
  {
    Icon: Truck,
    title: 'Reliable bulk dispatch',
    description:
      'Clear production planning and timely bulk delivery across India and Dubai wholesale buyers.',
  },
];

const wholesaleSteps = [
  {
    step: '01',
    title: 'Choose or share a design',
    description:
      'Pick from the catalogue or send a sample photo, sketch or tech pack.',
  },
  {
    step: '02',
    title: 'Share bulk specs',
    description:
      'Quantity, size/colour breakup, fabric/GSM, branding and Bhopal / Dubai / delivery city.',
  },
  {
    step: '03',
    title: 'Get factory quote',
    description:
      'We share wholesale pricing with a clear production and dispatch timeline.',
  },
];

const companyDetails = [
  ['Business name', 'LOMEKA'],
  ['Business type', 'Garment Manufacturer, Wholesaler & Supplier'],
  [
    'Business office (Bhopal)',
    'Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple, Kolar Road, Bhopal, Madhya Pradesh – 462042, India',
  ],
  [
    'Dubai presence',
    'Near BurJuman Metro Station, Sheikh Zayed Road, Dubai, UAE — wholesale & buyer enquiries',
  ],
  [
    'Who we supply',
    'Wholesalers, distributors, retail stores, chains and private-label apparel brands across Bhopal, India & Dubai',
  ],
];

const factoryDetails = [
  [
    'Manufacturing unit',
    'MNF – Manufacturing Unit of Garments, Kolar Road, Bhopal (Landmark: Next to Aasa Proteins)',
  ],
  [
    'Manufacturing setup',
    'Direct factory production, bulk manufacturing and custom private-label orders for Bhopal, India & Dubai',
  ],
  [
    'Garment range',
    'Men’s & women’s T-shirts, lowers, joggers, hoodies, jackets, tracksuits, co-ords and custom designs',
  ],
];

const teamMembers = [
  {
    name: 'Ms. Neetu Kushwaha',
    role: 'Founder & Owner',
    badge: 'Leadership',
    featured: true,
    description:
      'Leads LOMEKA’s vision, buyer partnerships, wholesale strategy and custom private-label growth across Bhopal, India and Dubai.',
  },
  {
    name: 'Master Mohd Akhtar',
    role: 'Head Tailor & Production Supervisor',
    badge: 'Production',
    featured: false,
    description:
      'Oversees pattern/stitching precision, tailoring team operations and consistent quality across every bulk batch.',
  },
];

function TeamSection() {
  return (
    <section
      aria-labelledby="team-heading"
      className="border-t border-gold/30 bg-[#f6f2ea] px-4 py-10 sm:px-8 sm:py-14"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-14">
        <div className="min-w-0 lg:pt-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 bg-gold"
            />

            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              The people behind LOMEKA
            </p>
          </div>

          <h2
            id="team-heading"
            className="mt-4 font-display text-4xl leading-tight text-navy sm:text-5xl"
          >
            Our Team
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
            Leadership and hands-on garment craft on every order.
          </p>

          <div
            aria-hidden="true"
            className="mt-7 flex items-center gap-2"
          >
            <span className="h-1 w-12 rounded-full bg-navy" />
            <span className="h-1 w-5 rounded-full bg-gold" />
          </div>
        </div>

        <ul
          aria-label="LOMEKA team members"
          className="m-0 list-none divide-y divide-gold/30 border-y border-gold/30 p-0"
        >
          {teamMembers.map(
            ({ name, role, badge, featured, description }) => (
              <li
                key={name}
                className="grid min-w-0 grid-cols-[40px_minmax(0,1fr)] gap-3 py-6 sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-5 sm:py-7"
              >
                <span
                  className={`grid size-10 place-items-center rounded-full border sm:size-13 ${
                    featured
                      ? 'border-navy bg-navy text-gold'
                      : 'border-gold/45 bg-transparent text-navy'
                  }`}
                >
                  {featured ? (
                    <Award
                      size={21}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ) : (
                    <UserRound
                      size={21}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold sm:text-[11px]">
                    {badge}
                  </p>

                  <h3 className="mt-1.5 font-display text-2xl leading-tight text-navy sm:text-3xl">
                    {name}
                  </h3>

                  <p className="mt-2 text-xs font-semibold leading-relaxed text-navy sm:text-sm">
                    {role}
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

function useReveal(selector = '[data-reveal]') {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;

    if (
      !root ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const nodes = root.querySelectorAll(selector);

    nodes.forEach((node) => {
      node.classList.add(
        'motion-safe:translate-y-4',
        'motion-safe:opacity-0',
        'motion-safe:transition-[opacity,transform]',
        'motion-safe:duration-500',
        'motion-safe:ease-out',
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove(
            'motion-safe:translate-y-4',
            'motion-safe:opacity-0',
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px',
      },
    );

    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
      observer.observe(node);
    });

    const fallbackTimer = window.setTimeout(() => {
      nodes.forEach((node) => {
        node.classList.remove(
          'motion-safe:translate-y-4',
          'motion-safe:opacity-0',
        );

        observer.unobserve(node);
      });
    }, 1000);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();

      nodes.forEach((node) => {
        node.classList.remove(
          'motion-safe:translate-y-4',
          'motion-safe:opacity-0',
        );

        node.style.transitionDelay = '';
      });
    };
  }, [selector]);

  return ref;
}

function DetailsColumn({ title, Icon, details }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-navy sm:size-9">
          <Icon
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>

        <h3 className="font-display text-xl text-navy sm:text-2xl">
          {title}
        </h3>
      </div>

      <dl className="mt-3 divide-y divide-gold/25 text-xs sm:mt-4 sm:text-[15px]">
        {details.map(([label, value]) => (
          <div key={label} className="py-2.5 sm:py-3.5">
            <dt className="text-[10px] font-bold tracking-[0.14em] text-gold uppercase sm:text-[11px]">
              {label}
            </dt>

            <dd className="mt-1 leading-relaxed text-muted">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function About() {
  const pageRef = useReveal();

  return (
    <div
      ref={pageRef}
      className="overflow-x-clip bg-ivory text-navy"
    >
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-gold/30 bg-navy text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,138,80,0.22),transparent_55%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 bottom-0 select-none font-display text-[clamp(5.5rem,20vw,13rem)] leading-none tracking-[0.06em] text-ivory/[0.05]"
        >
          ABOUT
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-9 sm:gap-8 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12 lg:py-16">
          <div data-reveal className="min-w-0">
            <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
              The LOMEKA story · Bhopal & Dubai
            </p>

            <h1 className="mt-2.5 font-display text-[clamp(2.15rem,5.8vw,4.25rem)] leading-[1.03] tracking-tight sm:mt-3">
              Apparel made for
              <span className="mt-1 block text-gold">
                wholesale buyers
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-xs leading-relaxed text-ivory/85 sm:mt-5 sm:text-base">
              LOMEKA manufactures and supplies men’s and women’s apparel
              in bulk from Bhopal with active wholesale presence in Dubai —
              plus custom buyer-designed collections for private-label brands.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                to="/collections"
                className="brand-btn-gold w-full justify-center sm:w-auto"
              >
                View Collections
              </Link>

              <Link
                to="/contact"
                className="brand-btn w-full justify-center border border-ivory/50 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
              >
                Custom Order Enquiry
              </Link>
            </div>
          </div>

          <div
            data-reveal
            className="relative min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-[#163f33]"
          >
            <div className="aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
              <img
                src="/img55.png"
                alt="LOMEKA wholesale garment manufacturing collection"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/75 to-transparent px-4 py-3.5 sm:px-5 sm:py-5">
              <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
                Kolar Road, Bhopal · Dubai, UAE
              </p>

              <p className="mt-0.5 text-xs text-ivory/90 sm:mt-1 sm:text-sm">
                Direct factory production for distributors & private labels
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* At a glance */}
      <section
        aria-label="LOMEKA at a glance"
        className="border-b border-gold/25 bg-white"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gold/20 lg:grid-cols-4">
          {glancePoints.map(({ label, value }) => (
            <div
              key={label}
              data-reveal
              className="min-w-0 bg-white px-3.5 py-4 sm:px-6 sm:py-6"
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-gold uppercase sm:text-[11px] sm:tracking-[0.16em]">
                {label}
              </p>

              <p className="mt-1.5 font-display text-base leading-snug text-navy sm:mt-2 sm:text-2xl">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What we manufacture */}
      <section
        aria-labelledby="apparel-heading"
        className="border-y border-gold/25 bg-white px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="mx-auto max-w-7xl">
          <div
            data-reveal
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
                Product range
              </p>

              <h2
                id="apparel-heading"
                className="mt-1.5 font-display text-2xl text-navy sm:mt-2 sm:text-4xl"
              >
                What we manufacture
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-muted sm:mt-3 sm:text-base">
                Complete men’s and women’s everyday, winter and active
                apparel for Bhopal, India and Dubai buyers — including custom
                orders made to your specifications.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/collections?gender=men"
                className="text-xs font-semibold underline decoration-gold underline-offset-4 sm:text-sm"
              >
                Men’s Wear →
              </Link>

              <Link
                to="/collections?gender=women"
                className="text-xs font-semibold underline decoration-gold underline-offset-4 sm:text-sm"
              >
                Women’s Wear →
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
            {manufacturingCategories.map(
              ({ title, tag, description }, index) => (
                <article
                  key={title}
                  data-reveal
                  className="brand-card brand-card-hover group relative min-w-0 overflow-hidden p-3.5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-2xl leading-none text-gold/35 transition-colors group-hover:text-gold/60 sm:text-3xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="rounded-sm bg-surface-alt px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-muted uppercase sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.14em]">
                      {tag}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-base leading-snug text-navy sm:mt-4 sm:text-2xl">
                    {title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section
        aria-labelledby="partner-heading"
        className="px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="mx-auto max-w-7xl">
          <div
            data-reveal
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              Why partner with LOMEKA
            </p>

            <h2
              id="partner-heading"
              className="mt-1.5 font-display text-2xl text-navy sm:mt-2 sm:text-4xl"
            >
              Built for serious wholesale relationships
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-muted sm:mt-3 sm:text-base">
              Clear pricing, careful quality checks and practical support
              for custom branding across Bhopal, India and Dubai.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            {partnerBenefits.map(({ Icon, title, description }) => (
              <article
                key={title}
                data-reveal
                className="brand-card flex min-w-0 flex-col gap-2.5 p-3.5 sm:flex-row sm:gap-5 sm:p-6"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-navy sm:size-11">
                  <Icon
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-base leading-snug text-navy sm:text-2xl">
                    {title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-muted sm:mt-1.5 sm:text-sm">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Business and locations */}
      <section
        aria-labelledby="company-heading"
        className="border-y border-gold/25 bg-surface-alt px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-5 max-w-2xl sm:mb-8">
            <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              Our business & locations
            </p>

            <h2
              id="company-heading"
              className="mt-1.5 font-display text-2xl text-navy sm:mt-2 sm:text-4xl"
            >
              Where we work — Bhopal & Dubai
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gold/30 bg-white">
            {/* Bhopal and Dubai together */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {[
                {
                  city: 'Bhopal, India',
                  role: 'Manufacturing Unit',
                  address: companyDetails.find(
                    ([label]) => label === 'Business office (Bhopal)',
                  )?.[1],
                  note: 'Landmark: Next to Aasa Proteins',
                },
                {
                  city: 'Dubai, UAE',
                  role: 'Wholesale & Buyer Hub',
                  address:
                    'Near BurJuman Metro Station, Sheikh Zayed Road, Dubai, UAE',
                  note: 'Wholesale coordination & enquiries for Dubai / Gulf buyers',
                },
              ].map(({ city, role, address, note }, index) => (
                <div
                  key={city}
                  data-reveal
                  className={`min-w-0 p-4 sm:p-8 ${
                    index === 1
                      ? 'border-t border-gold/25 sm:border-t-0 sm:border-l'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 text-navy sm:size-10">
                      <MapPin
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                        {role}
                      </p>

                      <h3 className="mt-0.5 font-display text-xl text-navy sm:mt-1 sm:text-2xl">
                        {city}
                      </h3>
                    </div>
                  </div>

                  <address className="mt-3 text-xs not-italic leading-relaxed text-muted sm:mt-4 sm:text-[15px]">
                    {address}
                  </address>

                  {note && (
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted sm:mt-2 sm:text-xs">
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Company and manufacturing details */}
            <div
              data-reveal
              className="grid grid-cols-1 gap-6 border-t border-gold/25 p-4 sm:grid-cols-2 sm:gap-8 sm:p-8 md:gap-12"
            >
              <DetailsColumn
                title="Company details"
                Icon={Factory}
                details={companyDetails.filter(
                  ([label]) => label !== 'Business office (Bhopal)',
                )}
              />

              <div className="border-t border-gold/25 pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                <DetailsColumn
                  title="Manufacturing unit"
                  Icon={MapPin}
                  details={factoryDetails}
                />
              </div>
            </div>

            {/* Shared enquiry button */}
            <div className="flex justify-center border-t border-gold/25 bg-gold/5 px-4 py-3.5 sm:justify-end sm:px-8 sm:py-4">
              <Link
                to="/contact"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gold/40 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white sm:w-auto"
              >
                Wholesale Enquiry (Bhopal & Dubai)
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are — after Where we work */}
      <section
        aria-labelledby="who-heading"
        className="px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12">
          <div
            data-reveal
            className="grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3 lg:col-span-5"
          >
            <figure className="col-span-2 overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/hero-closeup.png"
                  alt="Models in LOMEKA forest-green and burgundy apparel"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </figure>

            <figure className="overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/img5.png"
                  alt="LOMEKA men’s apparel style"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </figure>

            <figure className="overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/img2.png"
                  alt="LOMEKA women’s apparel style"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </figure>
          </div>

          <div data-reveal className="min-w-0 lg:col-span-7">
            <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              Who we are
            </p>

            <h2
              id="who-heading"
              className="mt-1.5 font-display text-2xl leading-tight text-navy sm:mt-2 sm:text-4xl lg:text-[2.6rem]"
            >
              Garment Manufacturer, Wholesaler & Supplier
            </h2>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted sm:mt-5 sm:space-y-4 sm:text-[15px]">
              <p>
                <strong className="text-navy">LOMEKA</strong> is a
                dedicated garment manufacturer, wholesaler and supplier.
                From our Kolar Road unit in Bhopal — along with our wholesale
                presence in Dubai — we produce and supply apparel in bulk for
                wholesalers, distributors, retail chains and private-label
                brands across Bhopal, India and Dubai.
              </p>

              <p>
                Need ready wholesale stock — or garments in{' '}
                <strong className="text-navy">
                  your own design, fabric, fit and branding
                </strong>
                ? Our team handles every stage with care, from fabric
                selection to finishing and dispatch for both Bhopal/India and
                Dubai requirements.
              </p>

              <p>
                From cotton T-shirts and joggers to heavyweight hoodies,
                jackets and tracksuits, each batch is checked for GSM
                accuracy, colourfast dyeing, shrinkage control, stitching
                durability and clean finishing before dispatch.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 sm:mt-7">
              <Link
                to="/manufacturing-wholesale"
                className="text-xs font-semibold underline decoration-gold underline-offset-4 sm:text-sm"
              >
                Manufacturing & Wholesale{' '}
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/collections"
                className="text-xs font-semibold underline decoration-gold underline-offset-4 sm:text-sm"
              >
                Browse Catalogue <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to order */}
      <section
        aria-labelledby="order-heading"
        className="border-t border-gold/25 bg-white/60 px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="mx-auto max-w-7xl">
          <div
            data-reveal
            className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
                Simple process
              </p>

              <h2
                id="order-heading"
                className="mt-1.5 font-display text-2xl text-navy sm:mt-2 sm:text-4xl"
              >
                How to order in bulk or custom design
              </h2>
            </div>

            <span className="inline-flex items-center gap-2 text-xs text-muted sm:text-sm">
              <Sparkles
                size={15}
                className="text-gold"
                aria-hidden="true"
              />
              Catalogue styles or your own design
            </span>
          </div>

          <ol className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
            {wholesaleSteps.map(({ step, title, description }) => (
              <li
                key={step}
                data-reveal
                className="brand-card relative min-w-0 overflow-hidden p-4 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-gold/20 sm:text-5xl"
                >
                  {step}
                </span>

                <h3 className="mt-2 font-display text-lg text-navy sm:mt-3 sm:text-2xl">
                  {title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        aria-labelledby="about-cta-heading"
        className="border-t border-gold/25 bg-navy text-ivory"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14">
          <div data-reveal className="min-w-0 max-w-xl">
            <h2
              id="about-cta-heading"
              className="font-display text-2xl leading-tight sm:text-4xl"
            >
              Ready to plan your next bulk order?
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-ivory/80 sm:mt-3 sm:text-base">
              Share the garment type, quantity and Bhopal, India or Dubai
              delivery details — or attach your design reference for a custom
              quote.
            </p>
          </div>

          <div
            data-reveal
            className="flex flex-col gap-2.5 sm:flex-row sm:gap-3"
          >
            <Link
              to="/contact"
              className="brand-btn-gold w-full justify-center sm:w-auto"
            >
              Request a Quote
            </Link>

            <Link
              to="/collections"
              className="brand-btn w-full justify-center border border-ivory/45 text-ivory hover:bg-ivory hover:text-navy sm:w-auto"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Our Team — final section */}
      <TeamSection />
    </div>
  );
}