import { Link } from 'react-router-dom';

const images = {
  floorRight: '/woman-w.jpg',
  bannerOne: '/img13.jpg',
  specLeft: '/stage-make-v1.png',
  bannerTwo: '/male.jpg',
  dispatchRight: '/side-vie.jpg',
};

const apparel = [
  {
    name: 'T-Shirts (Men’s & Women’s)',
    tag: 'Everyday',
    description:
      'Crew-neck, oversized, boxy-fit, drop-shoulder, polo, round-neck, graphic printed and custom GSM combed cotton T-shirts.',
    href: '/collections?category=t-shirts',
  },
  {
    name: 'Lowers, Trackpants & Joggers',
    tag: 'Comfort',
    description:
      'Cotton, fleece, dry-fit, French terry, cargo-style, straight-fit and cuffed joggers for everyday and active wear.',
    href: '/collections?category=lowers-trackpants',
  },
  {
    name: 'Hoodies, Sweatshirts & Jackets',
    tag: 'Winter',
    description:
      'Heavyweight fleece pullover & zip-up hoodies, crew sweatshirts, windcheaters and winter outerwear in multiple GSM options.',
    href: '/collections?category=hoodies-jackets',
  },
  {
    name: 'Tracksuits & Activewear',
    tag: 'Set styles',
    description:
      'Matching men’s and women’s tracksuit sets, gym wear, sportswear, running sets and breathable performance co-ords.',
    href: '/collections?category=tracksuits',
  },
  {
    name: 'Custom Designs & Private Label',
    tag: 'Your brand',
    description:
      'Share your own design, sample photo or tech pack — we manufacture custom cuts, fabrics, colourways, prints, embroidery and woven brand labels.',
    href: '/contact',
  },
];

const manufacturingHighlights = [
  {
    title: 'Direct Factory Pricing',
    description:
      'Competitive wholesale rates straight from our Bhopal manufacturing unit with zero middlemen.',
  },
  {
    title: 'Fabric & Stitching Quality Checks',
    description:
      'Consistent GSM accuracy, colourfast dyeing, shrinkage control, seam durability and clean finishing on every bulk batch.',
  },
  {
    title: 'Custom Design & Branding Support',
    description:
      'End-to-end production for buyer-provided designs, custom size charts, screen/DTF printing, embroidery and custom packaging.',
  },
];

const orderSteps = [
  {
    step: '01',
    title: 'Share styles or design',
    description:
      'Send garment type, quantity, size/colour breakup and delivery city — or attach your reference photo or tech pack.',
  },
  {
    step: '02',
    title: 'Review quote & specs',
    description:
      'We review fabric/GSM preferences and branding details to share direct factory pricing and dispatch timeline.',
  },
  {
    step: '03',
    title: 'Production & dispatch',
    description:
      'Once approved, manufacturing starts at our Bhopal unit with regular updates until bulk dispatch.',
  },
];

const questions = [
  {
    question: 'Can I get garments manufactured in my own custom design?',
    answer:
      'Yes. Share a reference photo, sketch or tech pack along with your preferred fabric, GSM and fit. We manufacture custom designs as well as private-label orders with your own neck labels and packaging.',
  },
  {
    question: 'What types of men’s and women’s garments do you manufacture?',
    answer:
      'We manufacture all types of men’s and women’s T-shirts (oversized, crew-neck, polo), cotton and fleece lowers, trackpants, joggers, hoodies, sweatshirts, jackets, tracksuits and activewear sets.',
  },
  {
    question: 'Can I mix different sizes, colours or styles in one bulk order?',
    answer:
      'Yes. Share your size-wise and colour-wise quantity breakdown in your enquiry, and we will prepare a combined wholesale quote accordingly.',
  },
  {
    question: 'How do I get wholesale pricing and an estimated delivery timeline?',
    answer:
      'Send the garment category or design reference, total quantity in pieces, fabric/GSM preference (if any) and delivery city. We’ll share a tailored factory quote and production schedule.',
  },
];

export default function ManufacturingWholesale() {
  return (
    <div className="mw-page overflow-x-clip bg-[#faf7fd] text-[#24103a]">
      <style>{`
        .mw-page {
          --mw-plum: #3b185f;
          --mw-plum-deep: #280e44;
          --mw-plum-soft: #f3ebf9;
          --mw-lilac: #9b6bc7;
          --mw-lilac-border: rgba(155, 107, 199, 0.34);
          --mw-ink: #24103a;
          --mw-muted: #5d4b73;
        }
      `}</style>

      {/* Compact Hero + Quote Card (Unchanged) */}
      <section
        aria-labelledby="manufacturing-heading"
        className="border-b border-[var(--mw-lilac-border)] bg-[#f3ebf9]"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-3.5 py-7 sm:gap-8 sm:px-8 sm:py-11 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,25rem)] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <div
              aria-hidden="true"
              className="mb-3 h-px w-12 bg-[var(--mw-lilac)] sm:mb-4 sm:w-14"
            />

            <p className="text-[10px] font-bold tracking-[0.2em] text-[#7c4fb0] uppercase sm:text-xs">
              MNF – MANUFACTURING UNIT OF GARMENTS · BHOPAL & DUBAI
            </p>

            <h1
              id="manufacturing-heading"
              className="mt-1.5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.04] tracking-tight text-[var(--mw-plum)]"
            >
              Manufacturing & Wholesale
            </h1>

            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--mw-muted)] sm:mt-4 sm:text-base">
              <strong className="text-[var(--mw-ink)]">LOMEKA</strong>{' '}
              manufactures and supplies all types of men’s and women’s
              T-shirts, lowers, hoodies, jackets, tracksuits and custom
              buyer-designed apparel in bulk from Bhopal, Madhya Pradesh —
              serving buyers across India and Dubai.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-5">
              <a
                href="#apparel"
                className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[var(--mw-plum)] underline decoration-[var(--mw-lilac)] underline-offset-4 hover:text-[var(--mw-plum-deep)] sm:text-sm"
              >
                Explore Apparel Range <span aria-hidden="true">↓</span>
              </a>

              <Link
                to="/collections"
                className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[var(--mw-plum)] underline decoration-[var(--mw-lilac)] underline-offset-4 hover:text-[var(--mw-plum-deep)] sm:text-sm"
              >
                Browse Catalogue <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside
            aria-labelledby="quote-heading"
            className="min-w-0 rounded-[var(--radius-card)] border border-[var(--mw-lilac)]/60 bg-[var(--mw-plum)] p-4 text-[#faf7fd] shadow-sm sm:p-6"
          >
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#d6b8f5] uppercase">
              Quick Checklist
            </p>
            <h2
              id="quote-heading"
              className="mt-1 font-display text-xl leading-tight text-white sm:text-2xl"
            >
              What to Send for a Quote
            </h2>

            <ul className="mt-3 divide-y divide-white/15 text-xs text-[#f5efff] sm:mt-4 sm:text-sm">
              <li className="py-2">
                Garment type or custom design / sample photo
              </li>
              <li className="py-2">
                Required quantity & size / colour breakdown
              </li>
              <li className="py-2">
                Fabric / GSM or branding needs (if any)
              </li>
              <li className="py-2">Delivery city and state / country</li>
            </ul>

            <Link
              to="/contact"
              className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-btn)] bg-white px-4 py-2.5 text-xs font-bold text-[var(--mw-plum)] transition hover:bg-[#f3ebf9] sm:mt-4 sm:text-sm"
            >
              Request a Wholesale Quote <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl divide-y divide-[var(--mw-lilac-border)] px-3.5 sm:px-8">
        {/* Split 1: Text Left, Image Right */}
        <section className="grid grid-cols-1 items-center gap-6 py-7 sm:py-10 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#7c4fb0] uppercase sm:text-[11px]">
              Bhopal Production Floor
            </p>
            <h2 className="mt-1.5 font-display text-2xl text-[var(--mw-plum)] sm:text-4xl">
              Direct from our production floor to your rack
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--mw-muted)] sm:text-base">
              In-house cutting, stitching and finishing at Shop No. 2, C-385,
              Udayanchal Nagar, Kolar Road, Bhopal — built for consistent bulk
              supply.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--mw-lilac-border)] bg-white">
            <img
              src={images.floorRight}
              alt="LOMEKA production floor and garment range"
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>
        </section>

        {/* Single Image Strip 1 */}
        <section className="py-5 sm:py-7">
          <div className="overflow-hidden rounded-2xl border border-[var(--mw-lilac-border)] bg-white">
            <img
              src={images.bannerOne}
              alt="LOMEKA bulk fabric and apparel display"
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover object-top"
            />
          </div>
        </section>

        {/* Apparel Range — 2-col compact cards */}
        <section
          id="apparel"
          aria-labelledby="apparel-heading"
          className="scroll-mt-20 py-6 sm:py-9"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#7c4fb0] uppercase sm:text-[11px]">
                Product Lineup
              </p>
              <h2
                id="apparel-heading"
                className="mt-1 font-display text-2xl text-[var(--mw-plum)] sm:text-3xl"
              >
                Apparel We Manufacture & Supply
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[var(--mw-muted)] sm:text-sm">
              Everyday, winter, activewear & custom buyer-designed bulk
              production.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-4 lg:grid-cols-3">
            {apparel.map(({ name, tag, description, href }, index) => (
              <Link
                key={name}
                to={href}
                className={`group flex min-w-0 flex-col justify-between rounded-[var(--radius-card)] border border-[var(--mw-lilac-border)] bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--mw-lilac)] hover:shadow-sm sm:p-5 ${
                  index === apparel.length - 1 ? 'col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg leading-none text-[#b588df] sm:text-xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-sm bg-[var(--mw-plum-soft)] px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-[var(--mw-plum)] uppercase">
                      {tag}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-base leading-snug text-[var(--mw-ink)] sm:mt-2.5 sm:text-xl">
                    {name}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--mw-muted)] sm:text-sm">
                    {description}
                  </p>
                </div>

                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--mw-plum)] underline decoration-[var(--mw-lilac)] underline-offset-4 group-hover:text-[#7c4fb0] sm:mt-4">
                  {href === '/contact' ? 'Enquire Custom Design' : 'View Styles'}{' '}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Split 2: Image Left, Text Right */}
        <section className="grid grid-cols-1 items-center gap-6 py-7 sm:py-10 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-2xl border border-[var(--mw-lilac-border)] bg-white">
            <img
              src={images.specLeft}
              alt="LOMEKA stitching and quality inspection"
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#7c4fb0] uppercase sm:text-[11px]">
              Quality & Customisation
            </p>
            <h2 className="mt-1.5 font-display text-2xl text-[var(--mw-plum)] sm:text-4xl">
              Tailored to your fabric, fit & label
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--mw-muted)] sm:text-base">
              Whether you order catalogue staples or send your own design and
              GSM requirement, every batch goes through careful checks before
              dispatch.
            </p>
          </div>
        </section>

        {/* Why Buyers Source From LOMEKA */}
        <section aria-labelledby="standards-heading" className="py-6 sm:py-9">
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#7c4fb0] uppercase sm:text-[11px]">
                Factory Advantage
              </p>
              <h2
                id="standards-heading"
                className="mt-1 font-display text-2xl text-[var(--mw-plum)] sm:text-3xl"
              >
                Why Buyers Source From LOMEKA
              </h2>
            </div>
            <p className="text-[11px] text-[var(--mw-muted)] sm:text-xs">
              Unit: Shop No. 2, C-385, Udayanchal Nagar, Kolar Road, Bhopal
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-4">
            {manufacturingHighlights.map(({ title, description }) => (
              <article
                key={title}
                className="min-w-0 rounded-[var(--radius-card)] border border-[var(--mw-lilac-border)] bg-white p-3.5 sm:p-5"
              >
                <h3 className="font-display text-base leading-snug text-[var(--mw-plum)] sm:text-xl">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--mw-muted)] sm:text-sm">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Single Image Strip 2 */}
        <section className="py-5 sm:py-7">
          <div className="overflow-hidden rounded-2xl border border-[var(--mw-lilac-border)] bg-white">
            <img
              src={images.bannerTwo}
              alt="LOMEKA wholesale garment collections"
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover object-top"
            />
          </div>
        </section>

        {/* Order Process — 3 side-by-side steps */}
        <section aria-labelledby="order-heading" className="py-6 sm:py-9">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#7c4fb0] uppercase sm:text-[11px]">
                How It Works
              </p>
              <h2
                id="order-heading"
                className="mt-1 font-display text-2xl text-[var(--mw-plum)] sm:text-3xl"
              >
                From Enquiry to Bulk Dispatch
              </h2>
            </div>
          </div>

          <ol className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-4">
            {orderSteps.map(({ step, title, description }) => (
              <li
                key={title}
                className="min-w-0 rounded-[var(--radius-card)] border border-[var(--mw-lilac-border)] border-t-2 border-t-[var(--mw-plum)] bg-white p-2.5 sm:p-5"
              >
                <span className="font-display text-xl leading-none text-[#b588df] sm:text-3xl">
                  {step}
                </span>
                <h3 className="mt-1.5 font-display text-xs leading-snug text-[var(--mw-ink)] sm:mt-2 sm:text-xl">
                  {title}
                </h3>
                <p className="mt-1 text-[10.5px] leading-relaxed text-[var(--mw-muted)] sm:mt-2 sm:text-sm">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Split 3: Text Left, Image Right */}
        <section className="grid grid-cols-1 items-center gap-6 py-7 sm:py-10 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#7c4fb0] uppercase sm:text-[11px]">
              India & Dubai Coordination
            </p>
            <h2 className="mt-1.5 font-display text-2xl text-[var(--mw-plum)] sm:text-4xl">
              Smooth bulk dispatch from Bhopal
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--mw-muted)] sm:text-base">
              Clear production updates, packed cartons and reliable wholesale
              shipping for distributors, retailers and private labels.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--mw-lilac-border)] bg-white">
            <img
              src={images.dispatchRight}
              alt="LOMEKA bulk dispatch and fabric inventory"
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>
        </section>

        {/* Common Buyer Questions */}
        <section aria-labelledby="faq-heading" className="py-6 sm:py-9">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8">
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#7c4fb0] uppercase sm:text-[11px]">
                FAQ
              </p>
              <h2
                id="faq-heading"
                className="mt-1 font-display text-2xl text-[var(--mw-plum)] sm:text-3xl"
              >
                Common Buyer Questions
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--mw-muted)] sm:text-sm">
                Have a custom design or bulk requirement? Reach out directly to
                our Bhopal & Dubai team for quick support.
              </p>
            </div>

            <div className="min-w-0 divide-y divide-[var(--mw-lilac-border)] border-y border-[var(--mw-lilac-border)]">
              {questions.map(({ question, answer }) => (
                <details key={question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-1.5 py-3 text-xs font-semibold text-[var(--mw-ink)] [&::-webkit-details-marker]:hidden sm:px-2 sm:py-3.5 sm:text-base">
                    <span>{question}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-base text-[var(--mw-lilac)] group-open:hidden sm:text-lg"
                    >
                      +
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden shrink-0 text-base text-[var(--mw-lilac)] group-open:inline sm:text-lg"
                    >
                      −
                    </span>
                  </summary>

                  <p className="px-1.5 pb-3 text-xs leading-relaxed text-[var(--mw-muted)] sm:px-2 sm:pb-4 sm:text-sm">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}