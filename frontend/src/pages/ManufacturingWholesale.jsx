import { Link } from 'react-router-dom';

const apparel = [
  {
    name: 'T-Shirts (Men’s & Women’s)',
    description:
      'Crew-neck, oversized, boxy-fit, drop-shoulder, polo, round-neck, graphic printed and custom GSM combed cotton T-shirts.',
    href: '/collections?category=t-shirts',
  },
  {
    name: 'Lowers, Trackpants & Joggers',
    description:
      'Cotton, fleece, dry-fit, French terry, cargo-style, straight-fit and cuffed joggers for everyday and active wear.',
    href: '/collections?category=lowers-trackpants',
  },
  {
    name: 'Hoodies, Sweatshirts & Jackets',
    description:
      'Heavyweight fleece pullover & zip-up hoodies, crew sweatshirts, windcheaters and winter outerwear in multiple GSM options.',
    href: '/collections?category=hoodies-jackets',
  },
  {
    name: 'Tracksuits & Activewear',
    description:
      'Matching men’s and women’s tracksuit sets, gym wear, sportswear, running sets and breathable performance co-ords.',
    href: '/collections?category=tracksuits',
  },
  {
    name: 'Custom Designs & Private Label',
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
    title: 'Share styles or your own design',
    description:
      'Send the garment type, required quantity, size/colour breakdown and delivery city — or attach your own reference photo or tech pack.',
  },
  {
    title: 'Review factory quote & specs',
    description:
      'We’ll review your requirements, fabric/GSM preferences and branding details to share direct factory pricing and a dispatch timeline.',
  },
  {
    title: 'Confirm production & dispatch',
    description:
      'Once you approve the quote and specifications, we start manufacturing at our Bhopal unit and keep you updated until bulk dispatch.',
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
    <>
      <section
        aria-labelledby="manufacturing-heading"
        className="border-b border-gold/35 bg-[#f5efe6]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-14">
          <div>
            <div aria-hidden="true" className="mb-5 h-px w-14 bg-gold" />

            <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
              MNF – MANUFACTURING UNIT OF GARMENTS
            </p>

            <h1
              id="manufacturing-heading"
              className="mt-2 font-display text-[clamp(2.35rem,5vw,4.5rem)] leading-[1.03] tracking-tight text-navy"
            >
              Manufacturing & Wholesale
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Led by <strong>Ms. Neetu Kushwaha</strong>, <strong>LOMEKA</strong>{' '}
              manufactures and supplies all types of men’s and women’s
              T-shirts, lowers, hoodies, jackets, tracksuits and custom
              buyer-designed apparel in bulk from Bhopal, Madhya Pradesh.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a
                href="#apparel"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
              >
                Explore Our Apparel Range <span aria-hidden="true">↓</span>
              </a>

              <Link
                to="/collections"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
              >
                Browse Ready Catalogue <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside
            aria-labelledby="quote-heading"
            className="rounded-[var(--radius-card)] border border-gold/50 bg-navy p-6 text-ivory sm:p-8"
          >
            <h2 id="quote-heading" className="font-display text-3xl leading-tight">
              What to Send for a Quote
            </h2>

            <ul className="mt-5 divide-y divide-ivory/20 text-sm text-ivory/90">
              <li className="py-2.5">
                Garment type or your custom design / sample photo
              </li>
              <li className="py-2.5">
                Required quantity & size / colour breakdown
              </li>
              <li className="py-2.5">
                Fabric / GSM or branding needs (if any)
              </li>
              <li className="py-2.5">Delivery city and state / country</li>
            </ul>

            <Link to="/contact" className="brand-btn-gold mt-5">
              Request a Wholesale Quote <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl divide-y divide-gold/35 px-5 sm:px-8">
        <section
          id="apparel"
          aria-labelledby="apparel-heading"
          className="scroll-mt-24 py-9 sm:py-12"
        >
          <div className="max-w-2xl">
            <h2
              id="apparel-heading"
              className="font-display text-3xl text-navy sm:text-4xl"
            >
              Apparel We Manufacture & Supply
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Complete wholesale manufacturing across men’s and women’s everyday,
              winter and activewear — plus custom production made to your own
              designs.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:gap-4">
            {apparel.map(({ name, description, href }) => (
              <Link
                key={name}
                to={href}
                className="brand-card brand-card-hover group flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6"
              >
                <div>
                  <h3 className="font-display text-2xl text-navy">{name}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </div>

                <span className="shrink-0 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                  {href === '/contact' ? 'Enquire Custom Design' : 'View Styles'}{' '}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="standards-heading" className="py-9 sm:py-12">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2
                id="standards-heading"
                className="font-display text-3xl text-navy sm:text-4xl"
              >
                Why Buyers Source From LOMEKA
              </h2>
              <p className="mt-1.5 text-sm text-muted">
                Unit: Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple,
                Kolar Road, Bhopal, Madhya Pradesh
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {manufacturingHighlights.map(({ title, description }) => (
              <article key={title} className="brand-card bg-surface p-5 sm:p-6">
                <h3 className="font-display text-2xl leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="order-heading" className="py-9 sm:py-12">
          <h2 id="order-heading" className="font-display text-3xl text-navy sm:text-4xl">
            From Enquiry to Bulk Dispatch
          </h2>

          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {orderSteps.map(({ title, description }, index) => (
              <li key={title} className="brand-card border-t-2 border-t-gold p-5 sm:p-6">
                <h3 className="font-display text-2xl leading-tight text-navy">
                  {index + 1}. {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Common Buyer Questions */}
        <section aria-labelledby="faq-heading" className="py-9 sm:py-12">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
            <div>
              <h2 id="faq-heading" className="font-display text-3xl text-navy sm:text-4xl">
                Common Buyer Questions
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Have a custom design or bulk requirement? Reach out directly to
                our Bhopal unit for quick support.
              </p>
            </div>

            <div className="divide-y divide-gold/30 border-y border-gold/35">
              {questions.map(({ question, answer }) => (
                <details key={question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-2 py-4 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden sm:text-base">
                    {question}
                    <span aria-hidden="true" className="shrink-0 text-lg group-open:hidden">
                      +
                    </span>
                    <span aria-hidden="true" className="hidden shrink-0 text-lg group-open:inline">
                      −
                    </span>
                  </summary>

                  <p className="px-2 pb-4 text-sm leading-relaxed text-muted">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}