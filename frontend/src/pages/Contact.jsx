

// import { useEffect, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Mail, MessageCircle, Camera, Sparkles, Package } from 'lucide-react';
// import CompanyLocations from './CompanyLocations';

// const email = (import.meta.env.VITE_BUSINESS_EMAIL ?? '').trim();
// const whatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();
// const instagram = 'lomeka_fashionh';

// const emailUrl = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//   ? `mailto:${email}`
//   : '';

// const whatsappUrl = /^[1-9]\d{7,14}$/.test(whatsapp)
//   ? `https://wa.me/${whatsapp}`
//   : '';

// const instagramHandle = instagram.trim().replace(/^@/, '');
// const instagramUrl = /^[a-zA-Z0-9._]{1,30}$/.test(instagramHandle)
//   ? `https://www.instagram.com/${instagramHandle}/`
//   : '';

// const QUICK_QUANTITIES = [50, 100, 250, 500];

// const cards = [
//   {
//     title: 'Email',
//     tag: 'DIRECT QUOTE',
//     Icon: Mail,
//     description: 'Send us your product list and quantities for a wholesale quote.',
//     label: emailUrl ? email : 'Available soon',
//     href: emailUrl,
//   },
//   {
//     title: 'WhatsApp',
//     tag: 'INSTANT REPLY',
//     Icon: MessageCircle,
//     description: 'Ask about garment availability and bulk pricing.',
//     label: whatsappUrl ? 'Chat on WhatsApp' : 'Available soon',
//     href: whatsappUrl,
//   },
//   {
//     title: 'Instagram',
//     tag: 'LOOKBOOK & UPDATES',
//     Icon: Camera,
//     description: 'See new styles and collection updates from LOMEKA.',
//     label: instagramUrl ? `@${instagramHandle}` : 'Available soon',
//     href: instagramUrl,
//   },
// ];

// const fieldClass =
//   'mt-1.5 block w-full min-w-0 rounded-lg border border-gold/40 bg-white px-3 py-2 text-xs font-normal text-navy placeholder:text-muted/75 transition-all focus:border-[#18432f] focus:ring-2 focus:ring-[#18432f]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:px-4 sm:py-3 sm:text-base';

// const buttonClass =
//   'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-xs font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm';

// const nonBlank = String.raw`.*\S.*`;

// function useScrollReveal() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

//     if (
//       !container ||
//       reducedMotion.matches ||
//       !('IntersectionObserver' in window) ||
//       typeof container.animate !== 'function'
//     ) {
//       return;
//     }

//     const animations = new Set();
//     const observer = new IntersectionObserver(
//       (entries) => {
//         for (const entry of entries) {
//           if (!entry.isIntersecting) continue;

//           const element = entry.target;
//           observer.unobserve(element);

//           if (reducedMotion.matches || element.contains(document.activeElement)) {
//             continue;
//           }

//           const animation = element.animate(
//             [
//               { opacity: 0.35, transform: 'translateY(14px)' },
//               { opacity: 1, transform: 'translateY(0)' },
//             ],
//             {
//               duration: 450,
//               easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
//             },
//           );

//           animations.add(animation);
//           animation.finished.then(
//             () => animations.delete(animation),
//             () => animations.delete(animation),
//           );
//         }
//       },
//       { rootMargin: '0px 0px -16px 0px' },
//     );

//     container.querySelectorAll('[data-reveal]').forEach((element) => {
//       if (element.getBoundingClientRect().top >= window.innerHeight - 16) {
//         observer.observe(element);
//       }
//     });

//     const fallbackTimer = window.setTimeout(() => {
//       observer.disconnect();
//     }, 1000);

//     return () => {
//       window.clearTimeout(fallbackTimer);
//       observer.disconnect();
//       animations.forEach((animation) => animation.cancel());
//     };
//   }, []);

//   return containerRef;
// }

// function ContactCard({ title, tag, Icon, description, label, href, isFullSpan }) {
//   return (
//     <div
//       data-reveal
//       className={`min-w-0 ${isFullSpan ? 'col-span-2 lg:col-span-1' : ''}`}
//     >
//       <article
//         className={`brand-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-white via-surface to-[#f7f1e6] p-3.5 text-navy shadow-xs transition-all duration-200 sm:p-6 ${
//           href
//             ? 'hover:-translate-y-0.5 hover:border-gold hover:shadow-md'
//             : ''
//         }`}
//       >
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#18432f] via-gold to-[#18432f]"
//         />

//         <div className="flex items-center justify-between gap-1.5 pt-1">
//           <span
//             aria-hidden="true"
//             className="grid size-9 place-items-center rounded-xl border border-gold/45 bg-[#18432f] text-gold shadow-2xs sm:size-11"
//           >
//             <Icon size={17} strokeWidth={1.9} />
//           </span>

//           <span className="truncate rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[8.5px] font-bold tracking-[0.12em] text-[#18432f] uppercase sm:px-2.5 sm:py-1 sm:text-[10px]">
//             {tag}
//           </span>
//         </div>

//         <h2 className="mt-3 font-display text-lg leading-tight text-[#18432f] sm:mt-5 sm:text-3xl">
//           {title}
//         </h2>

//         <p className="mt-1 flex-1 text-[11px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
//           {description}
//         </p>

//         <div className="mt-3 border-t border-gold/30 pt-2 sm:mt-6 sm:pt-3.5">
//           {href ? (
//             <a
//               href={href}
//               target={href.startsWith('http') ? '_blank' : undefined}
//               rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
//               className="flex min-h-9 items-center justify-between gap-2 rounded-lg px-0.5 text-[11px] font-bold text-[#18432f] transition-colors hover:text-gold sm:min-h-11 sm:gap-3 sm:px-1 sm:text-sm"
//             >
//               <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
//               <span
//                 aria-hidden="true"
//                 className="grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-[11px] text-[#18432f] sm:size-6 sm:text-xs"
//               >
//                 ↗
//               </span>
//             </a>
//           ) : (
//             <div className="flex min-h-9 items-center justify-between gap-2 sm:min-h-11">
//               <span className="text-[11px] text-[#6b7872] sm:text-sm">{label}</span>
//               <span className="rounded-full border border-[#c5a46b]/30 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#6b7872]">
//                 Soon
//               </span>
//             </div>
//           )}
//         </div>
//       </article>
//     </div>
//   );
// }

// export default function Contact() {
//   const containerRef = useScrollReveal();
//   const [searchParams] = useSearchParams();
//   const [garment, setGarment] = useState('');
//   const [quantityValue, setQuantityValue] = useState('');
//   const [orderMode, setOrderMode] = useState('custom'); // 'custom' | 'catalog'
//   const [fabricOption, setFabricOption] = useState('Need Recommendation');
//   const [customFabric, setCustomFabric] = useState('');
//   const [hasDesignFile, setHasDesignFile] = useState(false);
//   const [formError, setFormError] = useState('');

//   useEffect(() => {
//     const paramGarment = (searchParams.get('garment') ?? '').trim().slice(0, 120);
//     const type = (searchParams.get('type') ?? '').trim().toLowerCase();

//     if (paramGarment) {
//       setGarment(paramGarment);
//       setOrderMode('catalog');
//     }

//     if (type === 'bulk-order' || type === 'enquiry') {
//       setOrderMode('catalog');
//     } else if (type === 'custom') {
//       setOrderMode('custom');
//     }
//   }, [searchParams]);

//   function handleSubmit(event) {
//     event.preventDefault();
//     setFormError('');

//     const form = event.currentTarget;
//     const fields = new FormData(form);
//     const channel =
//       event.nativeEvent.submitter?.value ?? (whatsappUrl ? 'whatsapp' : 'email');

//     const name = String(fields.get('name') ?? '').trim();
//     const phone = String(fields.get('phone') ?? '').trim();
//     const product = String(fields.get('garment') ?? '').trim();
//     const quantity = Number(quantityValue);
//     const city = String(fields.get('city') ?? '').trim();
//     const purpose = String(fields.get('purpose') ?? '').trim();
//     const finalFabric =
//       fabricOption === 'Custom'
//         ? customFabric.trim() || 'Custom fabric (details below)'
//         : fabricOption;
//     const branding = String(fields.get('branding') ?? '').trim();
//     const sizeColor = String(fields.get('sizeColor') ?? '').trim();
//     const deliveryDate = String(fields.get('deliveryDate') ?? '').trim();
//     const message = String(fields.get('message') ?? '').trim();

//     if (!name || !product || !Number.isSafeInteger(quantity) || quantity < 1) {
//       setFormError(
//         'Please fill in your name, garment/product, and a quantity of at least 1.',
//       );
//       return;
//     }

//     if (phone && phone.replace(/\D/g, '').length < 8) {
//       setFormError('Enter a valid phone number with at least 8 digits, or leave it blank.');
//       return;
//     }

//     if (channel === 'whatsapp' && !whatsappUrl) {
//       setFormError('WhatsApp is not configured yet. Please use email instead.');
//       return;
//     }

//     if (channel === 'email' && !emailUrl) {
//       setFormError('Email is not configured yet. Please use WhatsApp instead.');
//       return;
//     }

//     const lines = [
//       orderMode === 'custom'
//         ? 'Hi LOMEKA, I’d like to request a quote for a Custom / Event Bulk Order:'
//         : 'Hi LOMEKA, I’d like to ask about availability and wholesale pricing:',
//       '',
//       `Name / Organization: ${name}`,
//     ];

//     if (phone) lines.push(`Phone: ${phone}`);
//     if (city) lines.push(`City: ${city}`);
//     if (orderMode === 'custom' && purpose) lines.push(`Occasion / Purpose: ${purpose}`);
//     lines.push(`Garment / Product: ${product}`);
//     lines.push(`Total Quantity: ${quantity} pieces`);
//     if (orderMode === 'custom' && finalFabric) lines.push(`Fabric / GSM: ${finalFabric}`);
//     if (orderMode === 'custom' && branding) lines.push(`Print / Embroidery: ${branding}`);
//     if (sizeColor) lines.push(`Colors & Sizes: ${sizeColor}`);
//     if (orderMode === 'custom' && deliveryDate) lines.push(`Required By Date: ${deliveryDate}`);
//     if (orderMode === 'custom' && hasDesignFile) {
//       lines.push('Design / Logo: Yes, I will share the logo/reference file now.');
//     }
//     if (message) lines.push(`Additional Details: ${message}`);

//     if (channel === 'whatsapp' && whatsappUrl) {
//       window.location.assign(
//         `${whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`,
//       );
//     }

//     if (channel === 'email' && emailUrl) {
//       const subject = encodeURIComponent(
//         orderMode === 'custom'
//           ? 'LOMEKA Custom / Event Bulk Order Enquiry'
//           : 'LOMEKA Wholesale Enquiry',
//       );
//       const body = encodeURIComponent(lines.join('\r\n'));
//       window.location.assign(`${emailUrl}?subject=${subject}&body=${body}`);
//     }
//   }

//   return (
//     <div ref={containerRef} className="overflow-x-clip bg-ivory text-navy">
//       <section
//         aria-labelledby="contact-heading"
//         className="mx-auto max-w-6xl px-3.5 pb-9 pt-10 sm:px-8 sm:pb-14 sm:pt-16"
//       >
//         <header className="mx-auto max-w-2xl text-center">
//           <div
//             aria-hidden="true"
//             className="mx-auto mb-3 h-px w-12 bg-gold sm:mb-4"
//           />

//           <p className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase sm:text-[11px]">
//             WHOLESALE & CUSTOM MANUFACTURING · BHOPAL & DUBAI
//           </p>

//           <h1
//             id="contact-heading"
//             className="mt-1.5 font-display text-3xl leading-tight tracking-tight text-navy sm:mt-2 sm:text-5xl lg:text-6xl"
//           >
//             Get in Touch
//           </h1>

//           <p className="mt-3 text-xs leading-relaxed text-muted sm:mt-4 sm:text-base">
//             Whether you need ready wholesale stock or custom-made T-shirts and
//             tracksuits for a school function, event, or brand — tell us every
//             detail below.
//           </p>

//           <a
//             href="#wholesale-enquiry"
//             className={`${buttonClass} mt-4 border border-[#18432f] bg-[#18432f] text-white shadow-sm hover:bg-[#123324] sm:mt-6`}
//           >
//             Build Your Order Enquiry <span aria-hidden="true">↓</span>
//           </a>
//         </header>

//         <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
//           {cards.map((card, index) => (
//             <ContactCard
//               key={card.title}
//               {...card}
//               isFullSpan={index === cards.length - 1}
//             />
//           ))}
//         </div>
//       </section>

//       <section
//         id="wholesale-enquiry"
//         aria-labelledby="enquiry-heading"
//         className="scroll-mt-20 border-y border-[#c5a46b]/35 bg-[#f5efe6] px-3.5 py-8 sm:px-8 sm:py-14"
//       >
//         <div className="mx-auto max-w-4xl rounded-2xl border border-gold/45 bg-[#fdfaf5] p-3.5 shadow-sm sm:p-9">
//           <div className="text-center">
//             <span
//               aria-hidden="true"
//               className="mx-auto mb-2.5 block h-px w-10 bg-gold"
//             />
//             <p className="text-[10px] font-bold tracking-[0.2em] text-[#6f825a] uppercase sm:text-[11px]">
//               EASY STEP-BY-STEP QUOTE BUILDER
//             </p>
//             <h2
//               data-reveal
//               id="enquiry-heading"
//               className="mt-1 font-display text-2xl leading-tight text-[#18432f] sm:mt-1.5 sm:text-4xl"
//             >
//               Describe Your Order
//             </h2>
//             <p className="mx-auto mt-1.5 max-w-xl text-xs leading-relaxed text-[#4d5d55] sm:mt-2 sm:text-sm">
//               Pick your order type, tap a quick bulk quantity or enter your
//               own numbers, and send directly on WhatsApp or Email.
//             </p>
//           </div>

//           {/* Order Mode Switcher */}
//           <div
//             role="tablist"
//             aria-label="Order requirement type"
//             className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-2 rounded-2xl border border-gold/40 bg-[#f5efe6] p-1.5 sm:mt-7 sm:gap-2.5 sm:p-2"
//           >
//             <button
//               type="button"
//               role="tab"
//               aria-selected={orderMode === 'custom'}
//               onClick={() => setOrderMode('custom')}
//               className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold leading-tight tracking-wide transition-all sm:gap-2 sm:px-4 sm:py-3 sm:text-sm ${
//                 orderMode === 'custom'
//                   ? 'bg-[#18432f] text-white shadow-xs'
//                   : 'text-[#102d47] hover:bg-white/80'
//               }`}
//             >
//               <Sparkles size={15} className="shrink-0" />
//               <span>Custom / Event Bulk</span>
//             </button>

//             <button
//               type="button"
//               role="tab"
//               aria-selected={orderMode === 'catalog'}
//               onClick={() => setOrderMode('catalog')}
//               className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold leading-tight tracking-wide transition-all sm:gap-2 sm:px-4 sm:py-3 sm:text-sm ${
//                 orderMode === 'catalog'
//                   ? 'bg-[#18432f] text-white shadow-xs'
//                   : 'text-[#102d47] hover:bg-white/80'
//               }`}
//             >
//               <Package size={15} className="shrink-0" />
//               <span>Catalogue Wholesale</span>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
//             <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
//               <label
//                 data-reveal
//                 className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//               >
//                 Name / School or Org *
//                 <input
//                   name="name"
//                   autoComplete="name"
//                   placeholder="Rahul Sharma / St. Xavier"
//                   pattern={nonBlank}
//                   maxLength={120}
//                   required
//                   className={fieldClass}
//                 />
//               </label>

//               <label
//                 data-reveal
//                 className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//               >
//                 Phone / WhatsApp{' '}
//                 <span className="font-normal text-[#6b7872]">(opt.)</span>
//                 <input
//                   name="phone"
//                   type="tel"
//                   autoComplete="tel"
//                   placeholder="+91 98260 XXXXX"
//                   maxLength={25}
//                   className={fieldClass}
//                 />
//               </label>

//               {orderMode === 'custom' && (
//                 <label
//                   data-reveal
//                   className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//                 >
//                   Occasion / Purpose
//                   <select
//                     name="purpose"
//                     defaultValue="School / College Event"
//                     className={fieldClass}
//                   >
//                     <option value="School / College Event">
//                       School / College Function
//                     </option>
//                     <option value="Sports / Tournament">
//                       Sports Day / Team Kit
//                     </option>
//                     <option value="Corporate / Staff Uniform">
//                       Corporate / Staff Uniform
//                     </option>
//                     <option value="Brand Private Label">
//                       Own Brand / Private Label
//                     </option>
//                     <option value="Other Custom Event">
//                       Other Event / Custom Requirement
//                     </option>
//                   </select>
//                 </label>
//               )}

//               <label
//                 data-reveal
//                 className={`block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm ${
//                   orderMode === 'catalog' ? 'col-span-2 sm:col-span-1' : ''
//                 }`}
//               >
//                 {orderMode === 'custom' ? 'Garment type *' : 'Product name *'}
//                 <input
//                   name="garment"
//                   value={garment}
//                   onChange={(event) => setGarment(event.target.value)}
//                   list="garment-suggestions"
//                   placeholder={
//                     orderMode === 'custom'
//                       ? 'T-Shirt, Polo, Tracksuit'
//                       : 'e.g. Oversized T-Shirt'
//                   }
//                   pattern={nonBlank}
//                   maxLength={120}
//                   required
//                   className={fieldClass}
//                 />
//                 <datalist id="garment-suggestions">
//                   <option value="Round Neck T-Shirt" />
//                   <option value="Collar / Polo T-Shirt" />
//                   <option value="Oversized T-Shirt" />
//                   <option value="Full Tracksuit Set" />
//                   <option value="Sports Jersey & Shorts" />
//                   <option value="Hoodie / Sweatshirt" />
//                 </datalist>
//               </label>

//               <div
//                 data-reveal
//                 className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//               >
//                 <label htmlFor="quantity-input">Quantity (pieces) *</label>
//                 <input
//                   id="quantity-input"
//                   name="quantity"
//                   type="number"
//                   inputMode="numeric"
//                   min="1"
//                   max={Number.MAX_SAFE_INTEGER}
//                   step="1"
//                   value={quantityValue}
//                   onChange={(e) => setQuantityValue(e.target.value)}
//                   placeholder="e.g. 250"
//                   required
//                   className={fieldClass}
//                 />
//                 <div className="mt-1.5 flex flex-wrap gap-1">
//                   {QUICK_QUANTITIES.map((qty) => {
//                     const active = Number(quantityValue) === qty;
//                     return (
//                       <button
//                         key={qty}
//                         type="button"
//                         onClick={() => setQuantityValue(String(qty))}
//                         className={`rounded-md border px-2 py-0.5 text-[10px] font-bold transition-colors ${
//                           active
//                             ? 'border-[#18432f] bg-[#18432f] text-white'
//                             : 'border-gold/40 bg-white text-navy hover:bg-gold/10'
//                         }`}
//                       >
//                         {qty}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <label
//                 data-reveal
//                 className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//               >
//                 City / Location{' '}
//                 <span className="font-normal text-[#6b7872]">(opt.)</span>
//                 <input
//                   name="city"
//                   autoComplete="address-level2"
//                   placeholder="Bhopal / Dubai"
//                   maxLength={100}
//                   className={fieldClass}
//                 />
//               </label>

//               {orderMode === 'custom' && (
//                 <>
//                   <div
//                     data-reveal
//                     className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//                   >
//                     <label htmlFor="fabric-select">Fabric & GSM</label>
//                     <select
//                       id="fabric-select"
//                       value={fabricOption}
//                       onChange={(e) => setFabricOption(e.target.value)}
//                       className={fieldClass}
//                     >
//                       <option value="Need Recommendation">
//                         Suggest best fabric
//                       </option>
//                       <option value="100% Cotton (180 GSM)">
//                         100% Cotton (180 GSM)
//                       </option>
//                       <option value="Bio-Wash Cotton (200-220 GSM)">
//                         Bio-Wash (200–220 GSM)
//                       </option>
//                       <option value="Dry-Fit / Polyester">
//                         Dry-Fit / Polyester
//                       </option>
//                       <option value="Cotton Fleece / Terry">
//                         Fleece / Terry (Tracksuit)
//                       </option>
//                       <option value="Custom">
//                         Custom fabric & GSM...
//                       </option>
//                     </select>

//                     {fabricOption === 'Custom' && (
//                       <input
//                         type="text"
//                         value={customFabric}
//                         onChange={(e) => setCustomFabric(e.target.value)}
//                         placeholder="e.g. 240 GSM French Terry"
//                         maxLength={140}
//                         required
//                         className={`${fieldClass} mt-2`}
//                       />
//                     )}
//                   </div>

//                   <label
//                     data-reveal
//                     className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//                   >
//                     Logo / Printing style
//                     <select
//                       name="branding"
//                       defaultValue="Front Logo + Back Print"
//                       className={fieldClass}
//                     >
//                       <option value="Front Logo + Back Print">
//                         Front Logo + Back Print
//                       </option>
//                       <option value="Front Chest Print Only">
//                         Front Chest Print Only
//                       </option>
//                       <option value="Embroidery (Logo/Name)">
//                         Embroidery (Logo/Name)
//                       </option>
//                       <option value="DTF / Multicolor Print">
//                         Multicolor Digital / DTF
//                       </option>
//                       <option value="Plain (No Printing)">
//                         Plain (No Print)
//                       </option>
//                     </select>
//                   </label>

//                   <label
//                     data-reveal
//                     className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:col-span-1 sm:text-sm"
//                   >
//                     Required delivery date{' '}
//                     <span className="font-normal text-[#6b7872]">(optional)</span>
//                     <input
//                       name="deliveryDate"
//                       type="date"
//                       className={fieldClass}
//                     />
//                   </label>

//                   <label
//                     data-reveal
//                     className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:col-span-1 sm:text-sm"
//                   >
//                     Colors & size breakup{' '}
//                     <span className="font-normal text-[#6b7872]">(counts)</span>
//                     <input
//                       name="sizeColor"
//                       placeholder="e.g. Navy + Gold — Kids: 80, S: 50, M: 70, L: 50"
//                       maxLength={220}
//                       className={fieldClass}
//                     />
//                   </label>
//                 </>
//               )}

//               {orderMode !== 'custom' && (
//                 <label
//                   data-reveal
//                   className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//                 >
//                   Colors & size breakup{' '}
//                   <span className="font-normal text-[#6b7872]">
//                     (write your exact counts)
//                   </span>
//                   <input
//                     name="sizeColor"
//                     placeholder="e.g. Navy Blue with Gold collar — Kids (8-12 yrs): 80, S: 50, M: 70, L: 50"
//                     maxLength={220}
//                     className={fieldClass}
//                   />
//                 </label>
//               )}

//               <label
//                 data-reveal
//                 className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
//               >
//                 Describe everything you need in your own words
//                 <textarea
//                   name="message"
//                   rows={3}
//                   maxLength={500}
//                   placeholder="Write any custom details here — e.g. School Annual Function on 20 Dec, need school logo on left chest, event name on back, sleeve stripes, custom neck label, or sample request."
//                   className={`${fieldClass} resize-y`}
//                 />
//               </label>

//               {orderMode === 'custom' && (
//                 <div data-reveal className="col-span-2 min-w-0">
//                   <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gold/40 bg-white p-3 text-xs text-[#102d47] transition-colors hover:border-gold sm:p-4 sm:text-sm">
//                     <input
//                       type="checkbox"
//                       checked={hasDesignFile}
//                       onChange={(e) => setHasDesignFile(e.target.checked)}
//                       className="mt-0.5 size-4 shrink-0 accent-[#18432f]"
//                     />
//                     <span className="min-w-0">
//                       <strong className="font-semibold">
//                         I have a logo, mockup, or design reference to share
//                       </strong>
//                       <span className="mt-0.5 block text-[11px] text-[#4d5d55] sm:text-xs">
//                         We will include a note in your enquiry so you can attach
//                         your logo/image directly on WhatsApp or Email.
//                       </span>
//                     </span>
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Attractive & User-Friendly WhatsApp + Email Send Box */}
//             <div
//               data-reveal
//               className="mt-6 rounded-2xl border border-gold/45 bg-gradient-to-br from-white via-[#fdfaf4] to-[#f6efe2] p-3.5 shadow-xs sm:mt-7 sm:p-5"
//             >
//               {formError ? (
//                 <p
//                   role="alert"
//                   className="mb-3.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700 sm:mb-4 sm:px-4 sm:py-3 sm:text-sm"
//                 >
//                   {formError}
//                 </p>
//               ) : null}

//               <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/25 pb-2.5">
//                 <div>
//                   <p className="text-[10px] font-bold tracking-[0.16em] text-[#18432f] uppercase sm:text-[11px]">
//                     Ready to Send Your Enquiry
//                   </p>
//                   <p className="mt-0.5 text-[11px] text-[#4d5d55] sm:text-xs">
//                     {garment || quantityValue
//                       ? `Selected: ${garment || 'Garment'}${quantityValue ? ` · ${quantityValue} pcs` : ''}`
//                       : 'Fill name, item & quantity, then tap your preferred app'}
//                   </p>
//                 </div>
//                 <span className="rounded-full bg-[#18432f]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#18432f]">
//                   {orderMode === 'custom' ? 'Custom Bulk' : 'Wholesale'}
//                 </span>
//               </div>

//               <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:mt-3.5 sm:flex sm:flex-wrap sm:gap-3">
//                 <button
//                   type="submit"
//                   name="channel"
//                   value="whatsapp"
//                   disabled={!whatsappUrl}
//                   className={`${buttonClass} w-full border border-[#18432f] bg-[#18432f] text-white shadow-xs enabled:hover:bg-[#123324] sm:w-auto`}
//                 >
//                   <MessageCircle size={16} className="shrink-0" />
//                   <span>WhatsApp Quote</span>
//                 </button>

//                 <button
//                   type="submit"
//                   name="channel"
//                   value="email"
//                   disabled={!emailUrl}
//                   className={`${buttonClass} w-full border border-[#18432f]/35 bg-white text-[#18432f] shadow-2xs enabled:hover:border-[#18432f] enabled:hover:bg-[#18432f]/5 sm:w-auto`}
//                 >
//                   <Mail size={16} className="shrink-0" />
//                   <span>Email Quote</span>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </section>

//       <CompanyLocations heading="Visit Our Locations" subheading="CONNECT WITH US" />
//     </div>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MessageCircle, Camera, Sparkles, Package } from 'lucide-react';
import CompanyLocations from './CompanyLocations';

const email = (import.meta.env.VITE_BUSINESS_EMAIL ?? '').trim();
const whatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();
const instagram = 'lomeka_fashionh';

const emailUrl = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ? `mailto:${email}`
  : '';

const whatsappUrl = /^[1-9]\d{7,14}$/.test(whatsapp)
  ? `https://wa.me/${whatsapp}`
  : '';

const instagramHandle = instagram.trim().replace(/^@/, '');
const instagramUrl = /^[a-zA-Z0-9._]{1,30}$/.test(instagramHandle)
  ? `https://www.instagram.com/${instagramHandle}/`
  : '';

const QUICK_QUANTITIES = [50, 100, 250, 500];

const cards = [
  {
    title: 'Email',
    tag: 'DIRECT QUOTE',
    Icon: Mail,
    description: 'Send us your product list and quantities for a wholesale quote.',
    label: emailUrl ? email : 'Available soon',
    href: emailUrl,
  },
  {
    title: 'WhatsApp',
    tag: 'INSTANT REPLY',
    Icon: MessageCircle,
    description: 'Ask about garment availability and bulk pricing.',
    label: whatsappUrl ? 'Chat on WhatsApp' : 'Available soon',
    href: whatsappUrl,
  },
  {
    title: 'Instagram',
    tag: 'LOOKBOOK & UPDATES',
    Icon: Camera,
    description: 'See new styles and collection updates from LOMEKA.',
    label: instagramUrl ? `@${instagramHandle}` : 'Available soon',
    href: instagramUrl,
  },
];

const fieldClass =
  'mt-1.5 block w-full min-w-0 rounded-lg border border-gold/40 bg-white px-3 py-2 text-xs font-normal text-navy placeholder:text-muted/75 transition-all focus:border-[#18432f] focus:ring-2 focus:ring-[#18432f]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:px-4 sm:py-3 sm:text-base';

const buttonClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-xs font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm';

const nonBlank = String.raw`.*\S.*`;

function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (
      !container ||
      reducedMotion.matches ||
      !('IntersectionObserver' in window) ||
      typeof container.animate !== 'function'
    ) {
      return;
    }

    const animations = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const element = entry.target;
          observer.unobserve(element);

          if (reducedMotion.matches || element.contains(document.activeElement)) {
            continue;
          }

          const animation = element.animate(
            [
              { opacity: 0.35, transform: 'translateY(14px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: 450,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
          );

          animations.add(animation);
          animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation),
          );
        }
      },
      { rootMargin: '0px 0px -16px 0px' },
    );

    container.querySelectorAll('[data-reveal]').forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight - 16) {
        observer.observe(element);
      }
    });

    const fallbackTimer = window.setTimeout(() => {
      observer.disconnect();
    }, 1000);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return containerRef;
}

function ContactCard({ title, tag, Icon, description, label, href, isFullSpan }) {
  return (
    <div
      data-reveal
      className={`min-w-0 ${isFullSpan ? 'col-span-2 lg:col-span-1' : ''}`}
    >
      <article
        className={`brand-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-white via-surface to-[#f7f1e6] p-3.5 text-navy shadow-xs transition-all duration-200 sm:p-6 ${
          href
            ? 'hover:-translate-y-0.5 hover:border-gold hover:shadow-md'
            : ''
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#18432f] via-gold to-[#18432f]"
        />

        <div className="flex items-center justify-between gap-1.5 pt-1">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl border border-gold/45 bg-[#18432f] text-gold shadow-2xs sm:size-11"
          >
            <Icon size={17} strokeWidth={1.9} />
          </span>

          <span className="truncate rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[8.5px] font-bold tracking-[0.12em] text-[#18432f] uppercase sm:px-2.5 sm:py-1 sm:text-[10px]">
            {tag}
          </span>
        </div>

        <h2 className="mt-3 font-display text-lg leading-tight text-[#18432f] sm:mt-5 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-1 flex-1 text-[11px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
          {description}
        </p>

        <div className="mt-3 border-t border-gold/30 pt-2 sm:mt-6 sm:pt-3.5">
          {href ? (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex min-h-9 items-center justify-between gap-2 rounded-lg px-0.5 text-[11px] font-bold text-[#18432f] transition-colors hover:text-gold sm:min-h-11 sm:gap-3 sm:px-1 sm:text-sm"
            >
              <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-[11px] text-[#18432f] sm:size-6 sm:text-xs"
              >
                ↗
              </span>
            </a>
          ) : (
            <div className="flex min-h-9 items-center justify-between gap-2 sm:min-h-11">
              <span className="text-[11px] text-[#6b7872] sm:text-sm">{label}</span>
              <span className="rounded-full border border-[#c5a46b]/30 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#6b7872]">
                Soon
              </span>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default function Contact() {
  const containerRef = useScrollReveal();
  const [searchParams] = useSearchParams();
  const [garment, setGarment] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [orderMode, setOrderMode] = useState('custom'); // 'custom' | 'catalog'
  const [hasDesignFile, setHasDesignFile] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const paramGarment = (searchParams.get('garment') ?? '').trim().slice(0, 120);
    const type = (searchParams.get('type') ?? '').trim().toLowerCase();

    if (paramGarment) {
      setGarment(paramGarment);
      setOrderMode('catalog');
    }

    if (type === 'bulk-order' || type === 'enquiry') {
      setOrderMode('catalog');
    } else if (type === 'custom') {
      setOrderMode('custom');
    }
  }, [searchParams]);

  function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const form = event.currentTarget;
    const fields = new FormData(form);
    const channel =
      event.nativeEvent.submitter?.value ?? (whatsappUrl ? 'whatsapp' : 'email');

    const name = String(fields.get('name') ?? '').trim();
    const phone = String(fields.get('phone') ?? '').trim();
    const product = String(fields.get('garment') ?? '').trim();
    const quantity = Number(quantityValue);
    const city = String(fields.get('city') ?? '').trim();
    const purpose = String(fields.get('purpose') ?? '').trim();
    const finalFabric = String(fields.get('fabric') ?? '').trim();
    const branding = String(fields.get('branding') ?? '').trim();
    const sizeColor = String(fields.get('sizeColor') ?? '').trim();
    const deliveryDate = String(fields.get('deliveryDate') ?? '').trim();
    const message = String(fields.get('message') ?? '').trim();

    if (!name || !product || !Number.isSafeInteger(quantity) || quantity < 1) {
      setFormError(
        'Please fill in your name, garment/product, and a quantity of at least 1.',
      );
      return;
    }

    if (phone && phone.replace(/\D/g, '').length < 8) {
      setFormError('Enter a valid phone number with at least 8 digits, or leave it blank.');
      return;
    }

    if (channel === 'whatsapp' && !whatsappUrl) {
      setFormError('WhatsApp is not configured yet. Please use email instead.');
      return;
    }

    if (channel === 'email' && !emailUrl) {
      setFormError('Email is not configured yet. Please use WhatsApp instead.');
      return;
    }

    const lines = [
      orderMode === 'custom'
        ? 'Hi LOMEKA, I’d like to request a quote for a Custom / Event Bulk Order:'
        : 'Hi LOMEKA, I’d like to ask about availability and wholesale pricing:',
      '',
      `Name / Organization: ${name}`,
    ];

    if (phone) lines.push(`Phone: ${phone}`);
    if (city) lines.push(`City: ${city}`);
    if (orderMode === 'custom' && purpose) lines.push(`Occasion / Purpose: ${purpose}`);
    lines.push(`Garment / Product: ${product}`);
    lines.push(`Total Quantity: ${quantity} pieces`);
    if (orderMode === 'custom' && finalFabric) lines.push(`Fabric / GSM: ${finalFabric}`);
    if (orderMode === 'custom' && branding) lines.push(`Print / Embroidery: ${branding}`);
    if (sizeColor) lines.push(`Colors & Sizes: ${sizeColor}`);
    if (orderMode === 'custom' && deliveryDate) lines.push(`Required By Date: ${deliveryDate}`);
    if (orderMode === 'custom' && hasDesignFile) {
      lines.push('Design / Logo: Yes, I will share the logo/reference file now.');
    }
    if (message) lines.push(`Additional Details: ${message}`);

    if (channel === 'whatsapp' && whatsappUrl) {
      window.location.assign(
        `${whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`,
      );
    }

    if (channel === 'email' && emailUrl) {
      const subject = encodeURIComponent(
        orderMode === 'custom'
          ? 'LOMEKA Custom / Event Bulk Order Enquiry'
          : 'LOMEKA Wholesale Enquiry',
      );
      const body = encodeURIComponent(lines.join('\r\n'));
      window.location.assign(`${emailUrl}?subject=${subject}&body=${body}`);
    }
  }

  return (
    <div ref={containerRef} className="overflow-x-clip bg-ivory text-navy">
      <section
        aria-labelledby="contact-heading"
        className="mx-auto max-w-6xl px-3.5 pb-9 pt-10 sm:px-8 sm:pb-14 sm:pt-16"
      >
        <header className="mx-auto max-w-2xl text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-3 h-px w-12 bg-gold sm:mb-4"
          />

          <p className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase sm:text-[11px]">
            WHOLESALE & CUSTOM MANUFACTURING · BHOPAL & DUBAI
          </p>

          <h1
            id="contact-heading"
            className="mt-1.5 font-display text-3xl leading-tight tracking-tight text-navy sm:mt-2 sm:text-5xl lg:text-6xl"
          >
            Get in Touch
          </h1>

          <p className="mt-3 text-xs leading-relaxed text-muted sm:mt-4 sm:text-base">
            Whether you need ready wholesale stock or custom-made T-shirts and
            tracksuits for a school function, event, or brand — tell us every
            detail below.
          </p>

          <a
            href="#wholesale-enquiry"
            className={`${buttonClass} mt-4 border border-[#18432f] bg-[#18432f] text-white shadow-sm hover:bg-[#123324] sm:mt-6`}
          >
            Build Your Order Enquiry <span aria-hidden="true">↓</span>
          </a>
        </header>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {cards.map((card, index) => (
            <ContactCard
              key={card.title}
              {...card}
              isFullSpan={index === cards.length - 1}
            />
          ))}
        </div>
      </section>

      <section
        id="wholesale-enquiry"
        aria-labelledby="enquiry-heading"
        className="scroll-mt-20 border-y border-[#c5a46b]/35 bg-[#f5efe6] px-3.5 py-8 sm:px-8 sm:py-14"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-gold/45 bg-[#fdfaf5] p-3.5 shadow-sm sm:p-9">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-2.5 block h-px w-10 bg-gold"
            />
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#6f825a] uppercase sm:text-[11px]">
              EASY STEP-BY-STEP QUOTE BUILDER
            </p>
            <h2
              data-reveal
              id="enquiry-heading"
              className="mt-1 font-display text-2xl leading-tight text-[#18432f] sm:mt-1.5 sm:text-4xl"
            >
              Describe Your Order
            </h2>
            <p className="mx-auto mt-1.5 max-w-xl text-xs leading-relaxed text-[#4d5d55] sm:mt-2 sm:text-sm">
              Pick your order type, tap a quick bulk quantity or enter your
              own numbers, and send directly on WhatsApp or Email.
            </p>
          </div>

          {/* Order Mode Switcher */}
          <div
            role="tablist"
            aria-label="Order requirement type"
            className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-2 rounded-2xl border border-gold/40 bg-[#f5efe6] p-1.5 sm:mt-7 sm:gap-2.5 sm:p-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={orderMode === 'custom'}
              onClick={() => setOrderMode('custom')}
              className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold leading-tight tracking-wide transition-all sm:gap-2 sm:px-4 sm:py-3 sm:text-sm ${
                orderMode === 'custom'
                  ? 'bg-[#18432f] text-white shadow-xs'
                  : 'text-[#102d47] hover:bg-white/80'
              }`}
            >
              <Sparkles size={15} className="shrink-0" />
              <span>Custom / Event Bulk</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={orderMode === 'catalog'}
              onClick={() => setOrderMode('catalog')}
              className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold leading-tight tracking-wide transition-all sm:gap-2 sm:px-4 sm:py-3 sm:text-sm ${
                orderMode === 'catalog'
                  ? 'bg-[#18432f] text-white shadow-xs'
                  : 'text-[#102d47] hover:bg-white/80'
              }`}
            >
              <Package size={15} className="shrink-0" />
              <span>Catalogue Wholesale</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
              <label
                data-reveal
                className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
              >
                Name / School or Org *
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Rahul Sharma / St. Xavier"
                  pattern={nonBlank}
                  maxLength={120}
                  required
                  className={fieldClass}
                />
              </label>

              <label
                data-reveal
                className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
              >
                Phone / WhatsApp{' '}
                <span className="font-normal text-[#6b7872]">(opt.)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98260 XXXXX"
                  maxLength={25}
                  className={fieldClass}
                />
              </label>

              {orderMode === 'custom' && (
                <label
                  data-reveal
                  className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
                >
                  Occasion / Purpose
                  <select
                    name="purpose"
                    defaultValue="School / College Event"
                    className={fieldClass}
                  >
                    <option value="School / College Event">
                      School / College Function
                    </option>
                    <option value="Sports / Tournament">
                      Sports Day / Team Kit
                    </option>
                    <option value="Corporate / Staff Uniform">
                      Corporate / Staff Uniform
                    </option>
                    <option value="Brand Private Label">
                      Own Brand / Private Label
                    </option>
                    <option value="Other Custom Event">
                      Other Event / Custom Requirement
                    </option>
                  </select>
                </label>
              )}

              <label
                data-reveal
                className={`block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm ${
                  orderMode === 'catalog' ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                {orderMode === 'custom' ? 'Garment type *' : 'Product name *'}
                <input
                  name="garment"
                  value={garment}
                  onChange={(event) => setGarment(event.target.value)}
                  list="garment-suggestions"
                  placeholder={
                    orderMode === 'custom'
                      ? 'T-Shirt, Polo, Tracksuit'
                      : 'e.g. Oversized T-Shirt'
                  }
                  pattern={nonBlank}
                  maxLength={120}
                  required
                  className={fieldClass}
                />
                <datalist id="garment-suggestions">
                  <option value="Round Neck T-Shirt" />
                  <option value="Collar / Polo T-Shirt" />
                  <option value="Oversized T-Shirt" />
                  <option value="Full Tracksuit Set" />
                  <option value="Sports Jersey & Shorts" />
                  <option value="Hoodie / Sweatshirt" />
                </datalist>
              </label>

              <div
                data-reveal
                className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
              >
                <label htmlFor="quantity-input">Quantity (pieces) *</label>
                <input
                  id="quantity-input"
                  name="quantity"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max={Number.MAX_SAFE_INTEGER}
                  step="1"
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(e.target.value)}
                  placeholder="e.g. 250"
                  required
                  className={fieldClass}
                />
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {QUICK_QUANTITIES.map((qty) => {
                    const active = Number(quantityValue) === qty;
                    return (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setQuantityValue(String(qty))}
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-bold transition-colors ${
                          active
                            ? 'border-[#18432f] bg-[#18432f] text-white'
                            : 'border-gold/40 bg-white text-navy hover:bg-gold/10'
                        }`}
                      >
                        {qty}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label
                data-reveal
                className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
              >
                City / Location{' '}
                <span className="font-normal text-[#6b7872]">(opt.)</span>
                <input
                  name="city"
                  autoComplete="address-level2"
                  placeholder="Bhopal / Dubai"
                  maxLength={100}
                  className={fieldClass}
                />
              </label>

              {orderMode === 'custom' && (
                <>
                  <label
                    data-reveal
                    className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
                  >
                    Fabric & GSM
                    <input
                      name="fabric"
                      type="text"
                      placeholder="e.g. 180-220 GSM Cotton / Fleece"
                      maxLength={140}
                      className={fieldClass}
                    />
                  </label>

                  <label
                    data-reveal
                    className="block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
                  >
                    Logo / Printing style
                    <input
                      name="branding"
                      type="text"
                      placeholder="e.g. Front logo, back print, embroidery"
                      maxLength={140}
                      className={fieldClass}
                    />
                  </label>

                  <label
                    data-reveal
                    className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:col-span-1 sm:text-sm"
                  >
                    Required delivery date{' '}
                    <span className="font-normal text-[#6b7872]">(optional)</span>
                    <input
                      name="deliveryDate"
                      type="date"
                      className={fieldClass}
                    />
                  </label>

                  <label
                    data-reveal
                    className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:col-span-1 sm:text-sm"
                  >
                    Colors & size breakup{' '}
                    <span className="font-normal text-[#6b7872]">(counts)</span>
                    <input
                      name="sizeColor"
                      placeholder="e.g. Navy + Gold — Kids: 80, S: 50, M: 70, L: 50"
                      maxLength={220}
                      className={fieldClass}
                    />
                  </label>
                </>
              )}

              {orderMode !== 'custom' && (
                <label
                  data-reveal
                  className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
                >
                  Colors & size breakup{' '}
                  <span className="font-normal text-[#6b7872]">
                    (write your exact counts)
                  </span>
                  <input
                    name="sizeColor"
                    placeholder="e.g. Navy Blue with Gold collar — Kids (8-12 yrs): 80, S: 50, M: 70, L: 50"
                    maxLength={220}
                    className={fieldClass}
                  />
                </label>
              )}

              <label
                data-reveal
                className="col-span-2 block min-w-0 text-[11px] font-semibold text-[#102d47] sm:text-sm"
              >
                Describe everything you need in your own words
                <textarea
                  name="message"
                  rows={3}
                  maxLength={500}
                  placeholder="Write any custom details here — e.g. School Annual Function on 20 Dec, need school logo on left chest, event name on back, sleeve stripes, custom neck label, or sample request."
                  className={`${fieldClass} resize-y`}
                />
              </label>

              {orderMode === 'custom' && (
                <div data-reveal className="col-span-2 min-w-0">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gold/40 bg-white p-3 text-xs text-[#102d47] transition-colors hover:border-gold sm:p-4 sm:text-sm">
                    <input
                      type="checkbox"
                      checked={hasDesignFile}
                      onChange={(e) => setHasDesignFile(e.target.checked)}
                      className="mt-0.5 size-4 shrink-0 accent-[#18432f]"
                    />
                    <span className="min-w-0">
                      <strong className="font-semibold">
                        I have a logo, mockup, or design reference to share
                      </strong>
                      <span className="mt-0.5 block text-[11px] text-[#4d5d55] sm:text-xs">
                        We will include a note in your enquiry so you can attach
                        your logo/image directly on WhatsApp or Email.
                      </span>
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Attractive & User-Friendly WhatsApp + Email Send Box */}
            <div
              data-reveal
              className="mt-6 rounded-2xl border border-gold/45 bg-gradient-to-br from-white via-[#fdfaf4] to-[#f6efe2] p-3.5 shadow-xs sm:mt-7 sm:p-5"
            >
              {formError ? (
                <p
                  role="alert"
                  className="mb-3.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700 sm:mb-4 sm:px-4 sm:py-3 sm:text-sm"
                >
                  {formError}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/25 pb-2.5">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] text-[#18432f] uppercase sm:text-[11px]">
                    Ready to Send Your Enquiry
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#4d5d55] sm:text-xs">
                    {garment || quantityValue
                      ? `Selected: ${garment || 'Garment'}${quantityValue ? ` · ${quantityValue} pcs` : ''}`
                      : 'Fill name, item & quantity, then tap your preferred app'}
                  </p>
                </div>
                <span className="rounded-full bg-[#18432f]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#18432f]">
                  {orderMode === 'custom' ? 'Custom Bulk' : 'Wholesale'}
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:mt-3.5 sm:flex sm:flex-wrap sm:gap-3">
                <button
                  type="submit"
                  name="channel"
                  value="whatsapp"
                  disabled={!whatsappUrl}
                  className={`${buttonClass} w-full border border-[#18432f] bg-[#18432f] text-white shadow-xs enabled:hover:bg-[#123324] sm:w-auto`}
                >
                  <MessageCircle size={16} className="shrink-0" />
                  <span>WhatsApp Quote</span>
                </button>

                <button
                  type="submit"
                  name="channel"
                  value="email"
                  disabled={!emailUrl}
                  className={`${buttonClass} w-full border border-[#18432f]/35 bg-white text-[#18432f] shadow-2xs enabled:hover:border-[#18432f] enabled:hover:bg-[#18432f]/5 sm:w-auto`}
                >
                  <Mail size={16} className="shrink-0" />
                  <span>Email Quote</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <CompanyLocations heading="Visit Our Locations" subheading="CONNECT WITH US" />
    </div>
  );
}