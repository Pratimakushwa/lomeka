

// import { Link } from 'react-router-dom';
// import {
//   Mail,
//   MapPin,
//   MessageCircle,
//   ArrowUpRight,
// } from 'lucide-react';

// const envEmail = (import.meta.env.VITE_BUSINESS_EMAIL ?? '').trim();
// const envWhatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();
// const instagramHandle = 'lomeka_fashionh';

// const emailHref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(envEmail)
//   ? `mailto:${envEmail}`
//   : 'mailto:contact@lomeka.in';

// const whatsappHref = /^[1-9]\d{7,14}$/.test(envWhatsapp)
//   ? `https://wa.me/${envWhatsapp}`
//   : '/contact';

// const instagramHref = `https://www.instagram.com/${instagramHandle}/`;

// function InstagramIcon({ size = 16, className = '' }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.75"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//       className={className}
//     >
//       <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
//       <circle cx="12" cy="12" r="4" />
//       <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
//     </svg>
//   );
// }

// const exploreLinks = [
//   { href: '/collections', label: 'All Collections' },
//   { href: '/collections?gender=men', label: 'Men’s Collection' },
//   { href: '/collections?gender=women', label: 'Women’s Collection' },
//   {
//     href: '/manufacturing-wholesale',
//     label: 'Manufacturing & Wholesale',
//   },
//   { href: '/about', label: 'About Us' },
// ];

// const assistanceLinks = [
//   { href: '/contact', label: 'Request a Wholesale Quote' },
//   { href: '/contact', label: 'Custom Design Enquiry' },
//   { href: '/manufacturing-wholesale', label: 'Bulk Order Process' },
//   { href: '/contact', label: 'Contact & Enquiries' },
// ];

// const connectLinks = [
//   {
//     href: emailHref,
//     label: 'Email',
//     renderIcon: () => <Mail size={16} strokeWidth={1.75} aria-hidden="true" />,
//     external: false,
//   },
//   {
//     href: whatsappHref,
//     label: 'WhatsApp',
//     renderIcon: () => (
//       <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
//     ),
//     external: whatsappHref.startsWith('http'),
//   },
//   {
//     href: instagramHref,
//     label: `Instagram (@${instagramHandle})`,
//     renderIcon: () => <InstagramIcon size={16} />,
//     external: true,
//   },
// ];

// function FooterLinks({ id, title, links }) {
//   return (
//     <nav aria-labelledby={id} className="min-w-0">
//       <h2
//         id={id}
//         className="!font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#123f32]"
//       >
//         {title}
//       </h2>

//       <span
//         aria-hidden="true"
//         className="mt-2 block h-px w-8 bg-[#123f32]/40"
//       />

//       <ul className="mt-3 space-y-1.5 sm:mt-3.5 sm:space-y-2">
//         {links.map(({ href, label }) => (
//           <li key={label}>
//             <Link
//               to={href}
//               className="group inline-flex items-start gap-1.5 text-xs leading-snug text-[#234536] underline-offset-4 transition-colors hover:text-[#082f24] hover:underline sm:text-[13px]"
//             >
//               <span>{label}</span>

//               <ArrowUpRight
//                 size={13}
//                 aria-hidden="true"
//                 className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default function Footer() {
//   return (
//     <footer
//       className="relative isolate mt-6 overflow-hidden bg-[#e1be82] text-[#123f32] sm:mt-8
//         [&_a:focus-visible]:rounded-sm
//         [&_a:focus-visible]:outline-2
//         [&_a:focus-visible]:outline-offset-4
//         [&_a:focus-visible]:outline-[#123f32]"
//     >
//       {/* Soft background detail */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.24),transparent_65%)]"
//       />

//       {/* Curved top edge */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none leading-none text-white"
//       >
//         <svg
//           viewBox="0 0 1440 70"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//           className="block h-4 w-full sm:h-7"
//         >
//           <path
//             d="M0 0H1440V15C1170 62 1010 17 740 31C450 46 240 78 0 30V0Z"
//             fill="currentColor"
//           />
//         </svg>
//       </div>

//       {/* Background wordmark */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-0 bottom-8 -z-10 flex select-none justify-center overflow-hidden"
//       >
//         <span className="whitespace-nowrap font-display text-[clamp(4.5rem,16vw,15rem)] leading-none tracking-[0.12em] text-[#123f32]/[0.045]">
//           LOMEKA
//         </span>
//       </div>

//       <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-10 sm:pt-8 lg:px-12">
//         <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-6 sm:gap-x-8 sm:gap-y-8 sm:pb-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-8 lg:pb-9">
//           {/* Brand and address */}
//           <div className="col-span-2 min-w-0 sm:col-span-1">
//             <Link
//               to="/"
//               aria-label="LOMEKA Fashion home"
//               className="inline-flex items-center gap-3"
//             >
//               <img
//                 src="/lomeka-logo.png"
//                 alt="LOMEKA Fashion"
//                 className="h-20 w-20 rounded-sm p-1 object-contain"
//               />
//             </Link>

//             <span className="mt-1 block text-[9px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-[#234536] sm:mt-1.5">
//               MNF – Garment Manufacturing
//             </span>

//             <p className="mt-2.5 max-w-sm text-xs leading-[1.6] text-[#234536] sm:mt-3.5 sm:text-[13px] sm:leading-[1.65]">
//               LOMEKA manufactures and supplies
//               all types of men’s and women’s T-shirts, lowers, hoodies,
//               tracksuits and custom bulk designs.
//             </p>

//             <div className="mt-3.5 space-y-2 border-t border-[#123f32]/15 pt-3 sm:mt-4 sm:space-y-2.5 sm:pt-3.5">
//               <a
//                 href={emailHref}
//                 className="group flex w-fit max-w-full items-center gap-2 text-xs font-medium text-[#123f32] sm:gap-2.5 sm:text-[13px]"
//               >
//                 <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#123f32]/15 bg-white/15">
//                   <Mail size={13} aria-hidden="true" />
//                 </span>

//                 <span className="break-all underline-offset-4 group-hover:underline">
//                   {envEmail || 'contact@lomeka.in'}
//                 </span>
//               </a>

//               <div className="flex items-start gap-2 sm:gap-2.5">
//                 <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#123f32]/15 bg-white/15">
//                   <MapPin size={13} aria-hidden="true" />
//                 </span>

//                 <address className="max-w-xs text-[11px] not-italic leading-[1.55] text-[#234536] sm:text-xs sm:leading-[1.6]">
//                   Shop No. 2, C-385, Udayanchal Nagar,
//                   Near Amarnath Temple, Kolar Road,
//                   Bhopal, Madhya Pradesh – 462042
//                 </address>
//               </div>
//             </div>
//           </div>

//           {/* Explore */}
//           <FooterLinks
//             id="footer-explore-heading"
//             title="Explore LOMEKA"
//             links={exploreLinks}
//           />

//           {/* Wholesale */}
//           <FooterLinks
//             id="footer-wholesale-heading"
//             title="Wholesale & Orders"
//             links={assistanceLinks}
//           />

//           {/* Connect — Email, WhatsApp, Instagram */}
//           <div className="col-span-2 min-w-0 sm:col-span-1">
//             <h2 className="!font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#123f32]">
//               Connect
//             </h2>

//             <span
//               aria-hidden="true"
//               className="mt-2 block h-px w-8 bg-[#123f32]/40"
//             />

//             <p className="mt-2.5 max-w-xs text-xs leading-[1.6] text-[#234536] sm:mt-3.5 sm:text-[13px] sm:leading-[1.65]">
//               Connect with LOMEKA for wholesale catalogue updates and bulk
//               enquiries.
//             </p>

//             <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:mt-3.5">
//               {connectLinks.map(({ href, label, renderIcon, external }) =>
//                 href.startsWith('http') || href.startsWith('mailto:') ? (
//                   <a
//                     key={label}
//                     href={href}
//                     target={external ? '_blank' : undefined}
//                     rel={external ? 'noopener noreferrer' : undefined}
//                     aria-label={label}
//                     title={label}
//                     className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#123f32]/30 bg-white/25 text-[#123f32] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#123f32] hover:bg-[#123f32] hover:text-[#fffaf1]"
//                   >
//                     {renderIcon()}
//                   </a>
//                 ) : (
//                   <Link
//                     key={label}
//                     to={href}
//                     aria-label={label}
//                     title={label}
//                     className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#123f32]/30 bg-white/25 text-[#123f32] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#123f32] hover:bg-[#123f32] hover:text-[#fffaf1]"
//                   >
//                     {renderIcon()}
//                   </Link>
//                 ),
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="flex flex-col gap-2.5 border-t border-[#123f32]/20 py-3.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#234536] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-4">
//           <p className="leading-relaxed">
//             © {new Date().getFullYear()} LOMEKA. All rights reserved.
//           </p>

//           <nav aria-label="Footer information">
//             <ul className="flex flex-wrap items-center gap-6">
//               <li>
//                 <Link
//                   to="/about"
//                   className="underline-offset-4 transition-colors hover:text-[#082f24] hover:underline"
//                 >
//                   About Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/contact"
//                   className="underline-offset-4 transition-colors hover:text-[#082f24] hover:underline"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';

const envEmail = (import.meta.env.VITE_BUSINESS_EMAIL ?? '').trim();
const envWhatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();
const instagramHandle = 'lomeka_fashionh';

const emailHref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(envEmail)
  ? `mailto:${envEmail}`
  : 'mailto:contact@lomeka.in';

const whatsappHref = /^[1-9]\d{7,14}$/.test(envWhatsapp)
  ? `https://wa.me/${envWhatsapp}`
  : '/contact';

const instagramHref = `https://www.instagram.com/${instagramHandle}/`;

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const exploreLinks = [
  { href: '/collections', label: 'All Collections' },
  { href: '/collections?gender=men', label: 'Men’s Collection' },
  { href: '/collections?gender=women', label: 'Women’s Collection' },
  {
    href: '/manufacturing-wholesale',
    label: 'Manufacturing & Wholesale',
  },
  { href: '/about', label: 'About Us' },
];

const assistanceLinks = [
  { href: '/contact', label: 'Request a Wholesale Quote' },
  { href: '/contact', label: 'Custom Design Enquiry' },
  { href: '/manufacturing-wholesale', label: 'Bulk Order Process' },
  { href: '/contact', label: 'Contact & Enquiries' },
];

const connectLinks = [
  {
    href: emailHref,
    label: 'Email',
    renderIcon: () => <Mail size={16} strokeWidth={1.75} aria-hidden="true" />,
    external: false,
  },
  {
    href: whatsappHref,
    label: 'WhatsApp',
    renderIcon: () => (
      <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
    ),
    external: whatsappHref.startsWith('http'),
  },
  {
    href: instagramHref,
    label: `Instagram (@${instagramHandle})`,
    renderIcon: () => <InstagramIcon size={16} />,
    external: true,
  },
];

function FooterLinks({ id, title, links }) {
  return (
    <nav aria-labelledby={id} className="min-w-0">
      <h2
        id={id}
        className="!font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#3b185f]"
      >
        {title}
      </h2>

      <span
        aria-hidden="true"
        className="mt-2 block h-px w-8 bg-[#3b185f]/40"
      />

      <ul className="mt-3 space-y-1.5 sm:mt-3.5 sm:space-y-2">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              to={href}
              className="group inline-flex items-start gap-1.5 text-xs leading-snug text-[#49256e] underline-offset-4 transition-colors hover:text-[#230b3c] hover:underline sm:text-[13px]"
            >
              <span>{label}</span>

              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative isolate mt-6 overflow-hidden bg-[#dfc9f2] text-[#3b185f] sm:mt-8
        [&_a:focus-visible]:rounded-sm
        [&_a:focus-visible]:outline-2
        [&_a:focus-visible]:outline-offset-4
        [&_a:focus-visible]:outline-[#3b185f]"
    >
      {/* Soft background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.34),transparent_65%)]"
      />

      {/* Curved top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none leading-none text-white"
      >
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-4 w-full sm:h-7"
        >
          <path
            d="M0 0H1440V15C1170 62 1010 17 740 31C450 46 240 78 0 30V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Background wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 -z-10 flex select-none justify-center overflow-hidden"
      >
        <span className="whitespace-nowrap font-display text-[clamp(4.5rem,16vw,15rem)] leading-none tracking-[0.12em] text-[#3b185f]/[0.05]">
          LOMEKA
        </span>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-10 sm:pt-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-6 sm:gap-x-8 sm:gap-y-8 sm:pb-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-8 lg:pb-9">
          {/* Brand and address */}
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <Link
              to="/"
              aria-label="LOMEKA Fashion home"
              className="inline-flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="LOMEKA Fashion"
                className="h-20 w-20 rounded-sm p-1 object-contain"
              />
            </Link>

            <span className="mt-1 block text-[9px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-[#49256e] sm:mt-1.5">
              MNF – Garment Manufacturing
            </span>

            <p className="mt-2.5 max-w-sm text-xs leading-[1.6] text-[#49256e] sm:mt-3.5 sm:text-[13px] sm:leading-[1.65]">
              LOMEKA manufactures and supplies
              all types of men’s and women’s T-shirts, lowers, hoodies,
              tracksuits and custom bulk designs.
            </p>

            <div className="mt-3.5 space-y-2 border-t border-[#3b185f]/15 pt-3 sm:mt-4 sm:space-y-2.5 sm:pt-3.5">
              <a
                href={emailHref}
                className="group flex w-fit max-w-full items-center gap-2 text-xs font-medium text-[#3b185f] sm:gap-2.5 sm:text-[13px]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#3b185f]/15 bg-white/25">
                  <Mail size={13} aria-hidden="true" />
                </span>

                <span className="break-all underline-offset-4 group-hover:underline">
                  {envEmail || 'contact@lomeka.in'}
                </span>
              </a>

              <div className="flex items-start gap-2 sm:gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#3b185f]/15 bg-white/25">
                  <MapPin size={13} aria-hidden="true" />
                </span>

                <address className="max-w-xs text-[11px] not-italic leading-[1.55] text-[#49256e] sm:text-xs sm:leading-[1.6]">
                  Shop No. 2, C-385, Udayanchal Nagar,
                  Near Amarnath Temple, Kolar Road,
                  Bhopal, Madhya Pradesh – 462042
                </address>
              </div>
            </div>
          </div>

          {/* Explore */}
          <FooterLinks
            id="footer-explore-heading"
            title="Explore LOMEKA"
            links={exploreLinks}
          />

          {/* Wholesale */}
          <FooterLinks
            id="footer-wholesale-heading"
            title="Wholesale & Orders"
            links={assistanceLinks}
          />

          {/* Connect — Email, WhatsApp, Instagram */}
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <h2
              id="footer-connect-heading"
              className="!font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#3b185f]"
            >
              Connect
            </h2>

            <span
              aria-hidden="true"
              className="mt-2 block h-px w-8 bg-[#3b185f]/40"
            />

            <p className="mt-2.5 max-w-xs text-xs leading-[1.6] text-[#49256e] sm:mt-3.5 sm:text-[13px] sm:leading-[1.65]">
              Connect with LOMEKA for wholesale catalogue updates and bulk
              enquiries.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:mt-3.5">
              {connectLinks.map(({ href, label, renderIcon, external }) =>
                href.startsWith('http') || href.startsWith('mailto:') ? (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#3b185f]/30 bg-white/30 text-[#3b185f] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3b185f] hover:bg-[#3b185f] hover:text-[#faf7fd]"
                  >
                    {renderIcon()}
                  </a>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    aria-label={label}
                    title={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#3b185f]/30 bg-white/30 text-[#3b185f] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3b185f] hover:bg-[#3b185f] hover:text-[#faf7fd]"
                  >
                    {renderIcon()}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2.5 border-t border-[#3b185f]/20 py-3.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#49256e] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-4">
          <p className="leading-relaxed">
            © {new Date().getFullYear()} LOMEKA. All rights reserved.
          </p>

          <nav aria-label="Footer information">
            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <Link
                  to="/about"
                  className="underline-offset-4 transition-colors hover:text-[#230b3c] hover:underline"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="underline-offset-4 transition-colors hover:text-[#230b3c] hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}