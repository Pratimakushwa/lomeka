import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MessageCircle, Camera, Sparkles, Package } from 'lucide-react';
import CompanyLocations from './CompanyLocations';

const email = (import.meta.env.VITE_BUSINESS_EMAIL ?? '').trim();
const whatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();
const instagram = ''; // Apna Instagram username yahan likho.

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
  'mt-2 block w-full rounded-[var(--radius-card)] border border-gold/40 bg-white px-4 py-3 text-base font-normal text-navy placeholder:text-muted/80 transition-colors focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy';

const buttonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-navy px-6 py-3 text-center text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45';

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
              { opacity: 0.25, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: 520,
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
      { rootMargin: '0px 0px -24px 0px' },
    );

    container.querySelectorAll('[data-reveal]').forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight - 24) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return containerRef;
}

function ContactCard({ title, tag, Icon, description, label, href }) {
  return (
    <div data-reveal className="min-w-0">
      <article
        className={`brand-card relative flex h-full flex-col overflow-hidden bg-surface p-6 text-navy ${
          href ? 'brand-card-hover' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-full border border-gold/45 bg-gold/10 text-navy"
          >
            <Icon size={20} strokeWidth={1.9} />
          </span>

          <span className="rounded-sm bg-surface-alt px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-muted uppercase">
            {tag}
          </span>
        </div>

        <h2 className="mt-5 font-display text-3xl leading-tight">{title}</h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>

        <div className="mt-6 border-t border-[#c5a46b]/25 pt-3.5">
          {href ? (
            <a
              href={href}
              className="flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-[#18432f] underline-offset-4 hover:underline"
            >
              <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
              <span aria-hidden="true" className="shrink-0">
                ↗
              </span>
            </a>
          ) : (
            <div className="flex min-h-11 items-center justify-between gap-2">
              <span className="text-sm text-[#6b7872]">{label}</span>
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
  const [orderMode, setOrderMode] = useState('custom'); // 'custom' | 'catalog'
  const [fabricOption, setFabricOption] = useState('Need Recommendation');
  const [customFabric, setCustomFabric] = useState('');
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
    const quantity = form.elements.namedItem('quantity').valueAsNumber;
    const city = String(fields.get('city') ?? '').trim();
    const purpose = String(fields.get('purpose') ?? '').trim();
    const finalFabric =
      fabricOption === 'Custom'
        ? customFabric.trim() || 'Custom fabric (details below)'
        : fabricOption;
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
    <div ref={containerRef} className="bg-ivory text-navy">
      <section
        aria-labelledby="contact-heading"
        className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-18"
      >
        <header className="mx-auto max-w-2xl text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-4 h-px w-12 bg-gold"
          />

          <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
            WHOLESALE & CUSTOM MANUFACTURING
          </p>

          <h1
            id="contact-heading"
            className="mt-2 font-display text-4xl leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Get in Touch
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Whether you need ready wholesale stock or custom-made T-shirts and
            tracksuits for a school function, event, or brand — tell us every
            detail below.
          </p>

          <a
            href="#wholesale-enquiry"
            className={`${buttonClass} mt-6 border-[#18432f] bg-[#18432f] text-white shadow-xs hover:bg-[#123324]`}
          >
            Build Your Order Enquiry <span aria-hidden="true">↓</span>
          </a>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section
        id="wholesale-enquiry"
        aria-labelledby="enquiry-heading"
        className="scroll-mt-24 border-y border-[#c5a46b]/30 bg-[#f5efe6] px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#c5a46b]/35 bg-[#fdfaf5] p-6 shadow-xs sm:p-10">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-3 block h-px w-10 bg-[#c5a46b]"
            />
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#6f825a] uppercase">
              TELL US YOUR EXACT REQUIREMENT
            </p>
            <h2
              data-reveal
              id="enquiry-heading"
              className="mt-1.5 font-display text-3xl leading-tight text-[#18432f] sm:text-4xl"
            >
              Describe Your Order
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#4d5d55]">
              Choose your order type and fill in fabric, print, colors, sizes,
              or event dates so we can send you an accurate quote.
            </p>
          </div>

          {/* Order Mode Switcher */}
          <div
            role="tablist"
            aria-label="Order requirement type"
            className="mx-auto mt-7 grid max-w-xl grid-cols-1 gap-2.5 rounded-2xl border border-[#c5a46b]/35 bg-[#f5efe6] p-2 sm:grid-cols-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={orderMode === 'custom'}
              onClick={() => setOrderMode('custom')}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold tracking-wide transition-all sm:text-sm ${
                orderMode === 'custom'
                  ? 'bg-[#18432f] text-white shadow-xs'
                  : 'text-[#102d47] hover:bg-white/70'
              }`}
            >
              <Sparkles size={16} />
              <span>Custom / Event Bulk Order</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={orderMode === 'catalog'}
              onClick={() => setOrderMode('catalog')}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold tracking-wide transition-all sm:text-sm ${
                orderMode === 'catalog'
                  ? 'bg-[#18432f] text-white shadow-xs'
                  : 'text-[#102d47] hover:bg-white/70'
              }`}
            >
              <Package size={16} />
              <span>Ready Catalogue Wholesale</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <label
                data-reveal
                className="block text-sm font-semibold text-[#102d47]"
              >
                Your name / School or Company
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. Rahul Sharma / St. Xavier School"
                  pattern={nonBlank}
                  maxLength={120}
                  required
                  className={fieldClass}
                />
              </label>

              <label
                data-reveal
                className="block text-sm font-semibold text-[#102d47]"
              >
                Phone / WhatsApp number{' '}
                <span className="font-normal text-[#6b7872]">(optional)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. +91 98260 XXXXX"
                  maxLength={25}
                  className={fieldClass}
                />
              </label>

              {orderMode === 'custom' && (
                <label
                  data-reveal
                  className="block text-sm font-semibold text-[#102d47]"
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
                className="block text-sm font-semibold text-[#102d47]"
              >
                {orderMode === 'custom'
                  ? 'Garment type (or write custom)'
                  : 'Product name'}
                <input
                  name="garment"
                  value={garment}
                  onChange={(event) => setGarment(event.target.value)}
                  list="garment-suggestions"
                  placeholder={
                    orderMode === 'custom'
                      ? 'e.g. Round Neck T-Shirt, Polo, Tracksuit'
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

              <label
                data-reveal
                className="block text-sm font-semibold text-[#102d47]"
              >
                Total quantity (in pieces)
                <input
                  name="quantity"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max={Number.MAX_SAFE_INTEGER}
                  step="1"
                  placeholder="e.g. 250"
                  required
                  className={fieldClass}
                />
              </label>

              <label
                data-reveal
                className="block text-sm font-semibold text-[#102d47]"
              >
                City / Delivery location{' '}
                <span className="font-normal text-[#6b7872]">(optional)</span>
                <input
                  name="city"
                  autoComplete="address-level2"
                  placeholder="e.g. Bhopal, MP"
                  maxLength={100}
                  className={fieldClass}
                />
              </label>

              {orderMode === 'custom' && (
                <>
                  <div data-reveal className="block text-sm font-semibold text-[#102d47]">
                    <label htmlFor="fabric-select">
                      Fabric & GSM preference
                    </label>
                    <select
                      id="fabric-select"
                      value={fabricOption}
                      onChange={(e) => setFabricOption(e.target.value)}
                      className={fieldClass}
                    >
                      <option value="Need Recommendation">
                        Not sure — suggest best fabric
                      </option>
                      <option value="100% Cotton (180 GSM)">
                        100% Cotton (180 GSM — Standard)
                      </option>
                      <option value="Bio-Wash Cotton (200-220 GSM)">
                        Bio-Wash Cotton (200–220 GSM — Premium)
                      </option>
                      <option value="Dry-Fit / Polyester">
                        Dry-Fit / Sports Polyester
                      </option>
                      <option value="Cotton Fleece / Terry">
                        Cotton Fleece / Loopknit (Tracksuits/Hoodies)
                      </option>
                      <option value="Custom">
                        Write your own fabric & GSM...
                      </option>
                    </select>

                    {fabricOption === 'Custom' && (
                      <input
                        type="text"
                        value={customFabric}
                        onChange={(e) => setCustomFabric(e.target.value)}
                        placeholder="e.g. 240 GSM French Terry or 180 GSM Matty"
                        maxLength={140}
                        required
                        className={`${fieldClass} mt-2.5`}
                      />
                    )}
                  </div>

                  <label
                    data-reveal
                    className="block text-sm font-semibold text-[#102d47]"
                  >
                    Logo / Printing style
                    <select
                      name="branding"
                      defaultValue="Front Logo + Back Print"
                      className={fieldClass}
                    >
                      <option value="Front Logo + Back Print">
                        Front Logo + Back Event Print
                      </option>
                      <option value="Front Chest Print Only">
                        Front Chest Print Only
                      </option>
                      <option value="Embroidery (Logo/Name)">
                        Embroidery (School/Company Logo)
                      </option>
                      <option value="DTF / Multicolor Print">
                        Multicolor Digital / DTF Print
                      </option>
                      <option value="Plain (No Printing)">
                        Plain (No Print / No Embroidery)
                      </option>
                    </select>
                  </label>

                  <label
                    data-reveal
                    className="block text-sm font-semibold text-[#102d47]"
                  >
                    Required delivery date{' '}
                    <span className="font-normal text-[#6b7872]">(optional)</span>
                    <input
                      name="deliveryDate"
                      type="date"
                      className={fieldClass}
                    />
                  </label>
                </>
              )}

              <label
                data-reveal
                className="block text-sm font-semibold text-[#102d47] sm:col-span-2"
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

              <label
                data-reveal
                className="block text-sm font-semibold text-[#102d47] sm:col-span-2"
              >
                Describe everything you need in your own words
                <textarea
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Write any custom details here — e.g. School Annual Function on 20 Dec, need school logo on left chest, event name on back, sleeve stripes, custom neck label, or sample request."
                  className={`${fieldClass} resize-y`}
                />
              </label>

              {orderMode === 'custom' && (
                <div data-reveal className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#c5a46b]/35 bg-white p-4 text-sm text-[#102d47]">
                    <input
                      type="checkbox"
                      checked={hasDesignFile}
                      onChange={(e) => setHasDesignFile(e.target.checked)}
                      className="mt-1 size-4 accent-[#18432f]"
                    />
                    <span>
                      <strong className="font-semibold">
                        I have a logo, mockup, or design reference to share
                      </strong>
                      <span className="mt-0.5 block text-xs text-[#4d5d55]">
                        We will include a note in your enquiry so you can attach
                        your logo/image directly on WhatsApp or Email.
                      </span>
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div
              data-reveal
              className="mt-7 border-t border-gold/25 pt-6"
            >
              {formError ? (
                <p
                  role="alert"
                  className="mb-4 rounded-[var(--radius-card)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {formError}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  name="channel"
                  value="whatsapp"
                  disabled={!whatsappUrl}
                  className={`${buttonClass} w-full border-navy bg-navy text-white enabled:hover:bg-navy/90 sm:w-auto`}
                >
                  Send Full Requirement on WhatsApp
                </button>

                <button
                  type="submit"
                  name="channel"
                  value="email"
                  disabled={!emailUrl}
                  className={`${buttonClass} w-full bg-white text-[#102d47] enabled:hover:bg-[#f8f3ed] sm:w-auto`}
                >
                  Send Full Requirement by Email
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#4d5d55]">
                {whatsappUrl || emailUrl
                  ? 'All your selected details will open pre-filled in WhatsApp or Email — just review and press Send.'
                  : 'Wholesale contact details will be available here soon.'}
              </p>
            </div>
          </form>
        </div>
      </section>

      <CompanyLocations heading="Visit Our Locations" subheading="CONNECT WITH US" />
    </div>
  );
}