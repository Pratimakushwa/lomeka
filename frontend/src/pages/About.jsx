import { useEffect, useRef, useState } from 'react';

const companyDetails = [
  ['Business name', 'LOMEKA'],
  ['Founder / Owner', 'Ms. Neetu Kushwaha'],
  [
    'Business office',
    'Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple, Kolar Road, Bhopal, Madhya Pradesh',
  ],
  [
    'Who we supply',
    'Wholesalers, distributors, retail stores, chains and private-label apparel brands across India',
  ],
];

const factoryDetails = [
  [
    'Manufacturing unit',
    'MNF – Manufacturing Unit of Garments, Kolar Road, Bhopal, Madhya Pradesh (Landmark: Next to Aasa Proteins)',
  ],
  [
    'Manufacturing setup',
    'Direct factory production, bulk manufacturing & custom private-label orders',
  ],
  [
    'Garment range',
    'Complete range of Men’s & Women’s T-shirts, lowers, trackpants, joggers, hoodies, sweatshirts, jackets, tracksuits, co-ord sets & custom designs',
  ],
];

const manufacturingCategories = [
  {
    title: 'T-Shirts (Men’s & Women’s)',
    description:
      'Crew-neck, oversized, boxy-fit, drop-shoulder, polo, V-neck, round-neck, graphic printed and custom GSM combed cotton tees.',
  },
  {
    title: 'Lowers, Trackpants & Joggers',
    description:
      'Cotton, fleece, dry-fit, French terry, cargo-style, straight-fit, cuffed joggers and everyday comfort lowers for men and women.',
  },
  {
    title: 'Hoodies, Sweatshirts & Jackets',
    description:
      'Heavyweight fleece hoodies, pullover & zip-up hoodies, crew sweatshirts, windcheaters and winter outerwear in multiple GSM options.',
  },
  {
    title: 'Tracksuits, Co-ords & Activewear',
    description:
      'Matching tracksuit sets, gym wear, sportswear, running sets, breathable performance tees and women’s active co-ord sets.',
  },
  {
    title: 'Custom Designs & Private Label',
    description:
      'Bring your own design, tech pack or sample photo — we manufacture custom cuts, colours, prints, embroidery, neck labels and custom packaging.',
  },
  {
    title: 'All Seasonal & Everyday Apparel',
    description:
      'Complete knitwear and woven garment production across summer, monsoon and winter collections tailored to wholesale buyer requirements.',
  },
];

const partnerBenefits = [
  {
    title: 'Direct Factory Pricing',
    description:
      'Competitive wholesale rates straight from our Bhopal manufacturing unit with zero middlemen.',
  },
  {
    title: 'Consistent Fabric & Stitching Quality',
    description:
      'Strict quality checks across fabric GSM, colourfast dyeing, shrinkage control, seam strength and finishing.',
  },
  {
    title: 'Custom Design & Branding Support',
    description:
      'Full support for buyer-provided designs, custom sizing charts, colourways, screen/DTF printing, embroidery, woven labels and packaging.',
  },
  {
    title: 'Reliable Bulk Dispatch',
    description:
      'Streamlined in-house production planning and timely bulk delivery across India.',
  },
];

const wholesaleSteps = [
  {
    title: 'Choose styles or share your design',
    description:
      'Pick from our ready men’s & women’s catalogue or send your own design, sample photo or tech pack.',
  },
  {
    title: 'Share bulk & custom specs',
    description:
      'Tell us your required quantity, size breakdown, fabric/GSM, colourways, branding needs and delivery city.',
  },
  {
    title: 'Get direct factory quote & timeline',
    description:
      'We’ll review your specifications and share wholesale factory pricing along with a clear production and dispatch schedule.',
  },
];

function DetailsColumn({ title, details }) {
  return (
    <div>
      <h3 className="font-display text-2xl text-navy">{title}</h3>

      <dl className="mt-3 divide-y divide-gold/25 text-sm sm:text-base">
        {details.map(([label, value]) => (
          <div key={label} className="py-3">
            <dt className="font-semibold text-navy">{label}</dt>
            <dd className="mt-1 leading-relaxed text-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const imgRef = useRef(null);
  const [imgVisible, setImgVisible] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setImgVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImgVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="border-b border-gold/50 bg-navy text-ivory">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <div aria-hidden="true" className="mx-auto mb-5 h-px w-12 bg-gold" />

          <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-tight tracking-tight">
            About LOMEKA
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ivory/90 sm:text-base">
            Led by Ms. Neetu Kushwaha, LOMEKA is a dedicated garment manufacturing
            and wholesale enterprise producing all types of men’s & women’s
            apparel — plus custom buyer-designed collections — from Bhopal,
            Madhya Pradesh.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/collections"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-ivory focus-visible:outline-gold"
            >
              View Collections <span aria-hidden="true">→</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/70 px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-gold hover:text-navy"
            >
              Custom Order Enquiry <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      {/* Top banner ke turant neeche: Animated Image + Who We Are */}
      <section
        aria-label="Who we are"
        className="border-b border-gold/25 bg-white"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-12 md:gap-12 lg:py-14">
          <div
            ref={imgRef}
            className="overflow-hidden rounded-sm bg-[#f5efe6] shadow-sm md:col-span-6"
          >
            <div
              className={`aspect-[4/3] overflow-hidden transition-all duration-1000 ease-out ${
                imgVisible
                  ? 'scale-100 opacity-100'
                  : 'scale-75 opacity-0'
              }`}
            >
              <img
                src="/img55.png"
                alt="LOMEKA wholesale garment manufacturing collection"
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="md:col-span-6">
            <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
              WHO WE ARE
            </p>
            <h2 className="mt-1.5 font-display text-2xl leading-snug font-normal text-navy sm:text-3xl">
              Direct Garment Manufacturer & Wholesale Supplier of Men’s &
              Women’s Wear
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
              <strong>LOMEKA</strong> is a dedicated garment manufacturing and
              wholesale enterprise led by <strong>Ms. Neetu Kushwaha</strong>.
              Operating from our manufacturing unit in Bhopal, Madhya Pradesh, we
              specialize in producing and supplying high-quality apparel in bulk
              for wholesalers, distributors, retail chains, and private-label
              brands across India.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
              Whether you need ready wholesale stock across men’s and women’s
              categories or want garments manufactured in{' '}
              <strong>your own custom design, fabric, fit and branding</strong>,
              our production team handles every stage with precision.
            </p>

            {expanded && (
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                From everyday cotton T-shirts, joggers and trackpants to
                heavyweight winter hoodies, jackets and full tracksuits, every
                batch goes through strict checks for GSM accuracy, colourfast
                dyeing, shrinkage control, stitching durability and clean
                finishing before dispatch from our Kolar Road unit.
              </p>
            )}

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-navy/60 bg-white px-6 py-2 text-sm font-medium text-navy transition hover:bg-[#fdfaf5]"
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-10 sm:px-8 lg:space-y-14 lg:py-14">
        {/* What We Manufacture — Complete Men's, Women's & Custom Range */}
        <section aria-labelledby="apparel-heading">
          <div className="border-l-2 border-gold pl-5">
            <h2 id="apparel-heading" className="font-display text-3xl sm:text-4xl">
              What We Manufacture
            </h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted">
              We manufacture a complete range of <strong>Men’s and Women’s</strong>{' '}
              everyday, casual, winter and active apparel in all styles, fits,
              and fabric grades — including{' '}
              <strong>custom buyer-designed orders</strong> made to your exact
              specifications.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="/collections?gender=men"
                className="text-sm font-semibold underline decoration-gold underline-offset-4"
              >
                Explore Men’s Wear <span aria-hidden="true">→</span>
              </a>
              <a
                href="/collections?gender=women"
                className="text-sm font-semibold underline decoration-gold underline-offset-4"
              >
                Explore Women’s Wear <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturingCategories.map(({ title, description }) => (
              <div
                key={title}
                className="border border-gold/30 bg-white p-5 sm:p-6"
              >
                <h3 className="font-display text-xl text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Partner With LOMEKA */}
        <section aria-labelledby="partner-heading">
          <div className="flex items-center gap-4">
            <h2
              id="partner-heading"
              className="font-display text-3xl leading-tight sm:text-4xl"
            >
              Why Partner With LOMEKA
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-gold/60" />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {partnerBenefits.map(({ title, description }) => (
              <div
                key={title}
                className="border-l-2 border-gold bg-[#fdfaf5] p-5 sm:p-6"
              >
                <h3 className="font-display text-xl text-navy">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership, Company & Manufacturing Unit Details */}
        <section
          aria-labelledby="company-heading"
          className="border border-gold/30 bg-[#f5efe6] p-5 sm:p-8"
        >
          <h2 id="company-heading" className="font-display text-3xl sm:text-4xl">
            Leadership & Unit Details
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
            <DetailsColumn title="Company & Leadership" details={companyDetails} />

            <div className="border-t border-gold/40 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <DetailsColumn title="Manufacturing Unit" details={factoryDetails} />
            </div>
          </div>
        </section>

        {/* How to Order in Bulk / Custom Design */}
        <section aria-labelledby="wholesale-heading">
          <div className="flex items-center gap-4">
            <h2
              id="wholesale-heading"
              className="font-display text-3xl leading-tight sm:text-4xl"
            >
              How to Order in Bulk or Custom Design
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-gold/60" />
          </div>

          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {wholesaleSteps.map(({ title, description }, index) => (
              <li
                key={title}
                className="border border-gold/30 bg-white p-5 sm:p-6"
              >
                <h3 className="font-display text-xl text-navy">
                  {index + 1}. {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </li>
            ))}
          </ol>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            Request a Wholesale or Custom Quote <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </>
  );
}