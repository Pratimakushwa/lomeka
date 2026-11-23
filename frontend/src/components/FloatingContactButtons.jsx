import { createPortal } from 'react-dom';

function readContactConfig() {
  const runtimeCfg =
    typeof window !== 'undefined' && window.__LOMEKA_CONTACT__
      ? window.__LOMEKA_CONTACT__
      : {};

  const rawWhatsapp = String(
    runtimeCfg.whatsapp ?? import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
  ).trim();

  const rawPhone = String(
    runtimeCfg.phone ??
      import.meta.env.VITE_BUSINESS_PHONE ??
      import.meta.env.VITE_WHATSAPP_NUMBER ??
      '',
  ).trim();

  const rawEmail = String(
    runtimeCfg.email ?? import.meta.env.VITE_BUSINESS_EMAIL ?? '',
  ).trim();

  const whatsappDigits = rawWhatsapp.replace(/\D/g, '').replace(/^0+/, '');
  const validWhatsapp = /^[1-9]\d{7,14}$/.test(whatsappDigits)
    ? whatsappDigits
    : '';

  const phoneDigits = rawPhone.replace(/[^+\d]/g, '');
  const validPhone = phoneDigits.replace(/\D/g, '').length >= 8 ? phoneDigits : '';

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : '';

  return {
    whatsappHref: validWhatsapp
      ? `https://wa.me/${validWhatsapp}?text=${encodeURIComponent(
          'Hi LOMEKA, I would like to enquire about wholesale / custom orders.',
        )}`
      : '',
    telHref: validPhone ? `tel:${validPhone}` : '',
    mailHref: validEmail
      ? `mailto:${validEmail}?subject=${encodeURIComponent(
          'LOMEKA Wholesale / Custom Order Enquiry',
        )}`
      : '/contact',
  };
}

function PhoneSolidIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z" />
    </svg>
  );
}

function WhatsAppSolidIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.52 3.48A11.84 11.84 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.85 11.85 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Z"
        fill="currentColor"
      />
      <path
        d="M17.47 14.38c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.45-.87-.77-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function MailSolidIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

export default function FloatingContactButtons() {
  if (typeof document === 'undefined') return null;

  const { whatsappHref, telHref, mailHref } = readContactConfig();

  const content = (
    <>
      {/* Responsive / Mobile Bottom Bar Only (< md): Phone | WhatsApp | Mail */}
      <nav
        aria-label="Mobile quick actions"
        style={{ transform: 'translateZ(0)' }}
        className="fixed bottom-0 left-0 right-0 z-[2147483647] grid grid-cols-3 border-t border-[#e5e7eb] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] will-change-transform md:hidden"
      >
        {telHref ? (
          <a
            href={telHref}
            aria-label="Call LOMEKA"
            className="flex h-12 items-center justify-center border-r border-[#e5e7eb] text-[#e6a428] transition-colors active:bg-[#fdfaf5]"
          >
            <PhoneSolidIcon size={20} />
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-label="Call coming soon"
            className="flex h-12 cursor-not-allowed items-center justify-center border-r border-[#e5e7eb] text-[#e6a428]/50"
          >
            <PhoneSolidIcon size={20} />
          </button>
        )}

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-12 items-center justify-center border-r border-[#e5e7eb] text-[#25D366] transition-colors active:bg-[#fdfaf5]"
          >
            <WhatsAppSolidIcon size={21} />
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-label="WhatsApp coming soon"
            className="flex h-12 cursor-not-allowed items-center justify-center border-r border-[#e5e7eb] text-[#25D366]/50"
          >
            <WhatsAppSolidIcon size={21} />
          </button>
        )}

        <a
          href={mailHref}
          aria-label="Mail or enquire LOMEKA"
          className="flex h-12 items-center justify-center text-[#e6a428] transition-colors active:bg-[#fdfaf5]"
        >
          <MailSolidIcon size={20} />
        </a>
      </nav>

      {/* Desktop Only (md+): Right-Side Floating Phone & WhatsApp Buttons */}
      <div
        aria-label="Quick contact actions"
        style={{ transform: 'translateZ(0)' }}
        className="fixed bottom-6 right-6 z-[2147483647] hidden flex-col items-center gap-3 will-change-transform md:flex"
      >
        {telHref ? (
          <a
            href={telHref}
            aria-label="Call LOMEKA"
            title="Call us"
            className="group relative flex size-13 items-center justify-center rounded-full bg-[#e6a428] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d39218] hover:shadow-xl"
          >
            <PhoneSolidIcon size={20} />
            <span className="pointer-events-none right-full mr-2.5 hidden whitespace-nowrap rounded-lg border border-[#e6a428]/35 bg-white px-2.5 py-1 text-xs font-semibold text-[#18432f] shadow-md group-hover:block">
              Call Us
            </span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-label="Call coming soon"
            title="Set VITE_WHATSAPP_NUMBER or VITE_BUSINESS_PHONE to enable"
            className="flex size-13 cursor-not-allowed items-center justify-center rounded-full bg-[#e6a428]/75 text-white/85 shadow-md"
          >
            <PhoneSolidIcon size={20} />
          </button>
        )}

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="group relative flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-xl"
          >
            <WhatsAppSolidIcon size={22} />
            <span className="pointer-events-none right-full mr-2.5 hidden whitespace-nowrap rounded-lg border border-[#25D366]/30 bg-white px-2.5 py-1 text-xs font-semibold text-[#128C7E] shadow-md group-hover:block">
              WhatsApp
            </span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-label="WhatsApp coming soon"
            title="Set VITE_WHATSAPP_NUMBER to enable"
            className="flex size-13 cursor-not-allowed items-center justify-center rounded-full bg-[#25D366]/75 text-white/85 shadow-md"
          >
            <WhatsAppSolidIcon size={22} />
          </button>
        )}
      </div>
    </>
  );

  return createPortal(content, document.body);
}