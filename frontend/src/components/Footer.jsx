import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Globe,
  Share2,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';

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
    href: '/contact',
    label: 'Wholesale Enquiry',
    Icon: MessageCircle,
  },
  {
    href: '/collections',
    label: 'Browse Collections',
    Icon: Globe,
  },
  {
    href: '/about',
    label: 'About LOMEKA',
    Icon: Share2,
  },
];

function FooterLinks({ id, title, links }) {
  return (
    <nav aria-labelledby={id} className="min-w-0">
      <h2
        id={id}
        className="!font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#123f32]"
      >
        {title}
      </h2>

      <span
        aria-hidden="true"
        className="mt-2 block h-px w-8 bg-[#123f32]/40"
      />

      <ul className="mt-3.5 space-y-2">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              to={href}
              className="group inline-flex items-start gap-1.5 text-[13px] leading-snug text-[#234536] underline-offset-4 transition-colors hover:text-[#082f24] hover:underline"
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
      className="relative isolate mt-8 overflow-hidden bg-[#e1be82] text-[#123f32]
        [&_a:focus-visible]:rounded-sm
        [&_a:focus-visible]:outline-2
        [&_a:focus-visible]:outline-offset-4
        [&_a:focus-visible]:outline-[#123f32]"
    >
      {/* Soft background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.24),transparent_65%)]"
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
          className="block h-5 w-full sm:h-7"
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
        <span className="whitespace-nowrap font-display text-[clamp(4.5rem,16vw,15rem)] leading-none tracking-[0.12em] text-[#123f32]/[0.045]">
          LOMEKA
        </span>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-10 sm:pt-8 lg:px-12">
        <div className="grid grid-cols-1 gap-7 pb-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-8 lg:pb-9">
          {/* Brand and address */}
          <div className="min-w-0">
            <Link
              to="/"
              aria-label="LOMEKA home"
              className="inline-block"
            >
              <span className="block font-display text-[30px] leading-none tracking-[0.12em] text-[#123f32] sm:text-[34px]">
                LOMEKA
              </span>

              <span className="mt-1.5 block text-[9px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-[#234536]">
                MNF – Garment Manufacturing
              </span>
            </Link>

            <p className="mt-3.5 max-w-sm text-[13px] leading-[1.65] text-[#234536]">
              Led by Ms. Neetu Kushwaha, LOMEKA manufactures and supplies
              all types of men’s and women’s T-shirts, lowers, hoodies,
              tracksuits and custom bulk designs.
            </p>

            <div className="mt-4 space-y-2.5 border-t border-[#123f32]/15 pt-3.5">
              <a
                href="mailto:contact@lomeka.in"
                className="group flex w-fit max-w-full items-center gap-2.5 text-[13px] font-medium text-[#123f32]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#123f32]/15 bg-white/15">
                  <Mail size={13} aria-hidden="true" />
                </span>

                <span className="break-all underline-offset-4 group-hover:underline">
                  contact@lomeka.in
                </span>
              </a>

              <div className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#123f32]/15 bg-white/15">
                  <MapPin size={13} aria-hidden="true" />
                </span>

                <address className="max-w-xs text-xs not-italic leading-[1.6] text-[#234536]">
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

          {/* Connect */}
          <div className="min-w-0">
            <h2 className="!font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#123f32]">
              Connect
            </h2>

            <span
              aria-hidden="true"
              className="mt-2 block h-px w-8 bg-[#123f32]/40"
            />

            <p className="mt-3.5 max-w-xs text-[13px] leading-[1.65] text-[#234536]">
              Connect with LOMEKA for wholesale catalogue updates and bulk
              enquiries.
            </p>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {connectLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  to={href}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#123f32]/25 bg-white/15 text-[#123f32] transition-colors duration-200 hover:border-[#123f32] hover:bg-[#123f32] hover:text-[#fffaf1]"
                >
                  <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-[#123f32]/20 py-4 text-[10px] font-medium uppercase tracking-[0.1em] text-[#234536] sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-relaxed">
            © {new Date().getFullYear()} LOMEKA. All rights reserved.
          </p>

          <nav aria-label="Footer information">
            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <Link
                  to="/about"
                  className="underline-offset-4 transition-colors hover:text-[#082f24] hover:underline"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="underline-offset-4 transition-colors hover:text-[#082f24] hover:underline"
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