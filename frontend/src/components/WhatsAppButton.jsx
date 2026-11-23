import { createElement } from 'react';

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').trim();

export default function WhatsAppButton({ garment = '' }) {
  const hasWhatsApp = /^[1-9]\d{7,14}$/.test(whatsappNumber);

  const message = [
    'Hi LOMEKA, I’d like to request a wholesale quote.',
    '',
    `Garment type: ${garment}`,
    'Quantity:',
    'Delivery city and country:',
  ].join('\n');

  const href = hasWhatsApp
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : '/contact';

  return createElement(
    'a',
    {
      href,
      className:
        'inline-flex items-center justify-center rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90',
    },
    hasWhatsApp ? 'Enquire on WhatsApp' : 'Contact for Wholesale',
  );
}