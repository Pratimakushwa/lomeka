import { useState } from 'react';
import { MapPin, ExternalLink, Building2 } from 'lucide-react';

const COMPANY_LOCATIONS = [
  {
    id: 'company-1',
    label: 'Manufacturing Unit — Kolar Road, Bhopal',
    address:
      'Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple, Kolar Road, Bhopal, Madhya Pradesh – 462042',
    landmark: 'Next to Aasa Proteins',
    concernPerson: 'Ms Neetu',
    business: 'MNF – Manufacturing Unit of Garments',
    query:
      'Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple, Kolar Road, Bhopal, Madhya Pradesh 462042, India',
  },
];

export default function CompanyLocations({
  compact = false,
  heading = 'Our Location',
  subheading = 'MNF – MANUFACTURING UNIT OF GARMENTS',
}) {
  const [selectedId, setSelectedId] = useState(COMPANY_LOCATIONS[0].id);

  const current =
    COMPANY_LOCATIONS.find((item) => item.id === selectedId) ||
    COMPANY_LOCATIONS[0];

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    current.query,
  )}&output=embed`;

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    current.query,
  )}`;

  return (
    <section
      aria-label={heading}
      className={`mx-auto max-w-6xl px-5 sm:px-8 ${
        compact ? 'py-10 sm:py-12' : 'py-14 sm:py-16'
      }`}
    >
      <div className="mb-8 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-3 block h-px w-12 bg-[#c5a46b]"
        />

        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6f825a]">
          {subheading}
        </p>

        <h2 className="mt-1.5 font-display text-3xl font-normal text-[#18432f] sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#c5a46b]/35 bg-[#fdfaf5] p-3 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Select company or factory location"
            className="flex flex-wrap gap-2"
          >
            {COMPANY_LOCATIONS.map((loc) => {
              const active = loc.id === current.id;

              return (
                <button
                  key={loc.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(loc.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    active
                      ? 'border-[#18432f] bg-[#18432f] text-white shadow-xs'
                      : 'border-[#c5a46b]/35 bg-white text-[#102d47] hover:border-[#c5a46b] hover:bg-[#f8f3ed]'
                  }`}
                >
                  <MapPin
                    size={13}
                    aria-hidden="true"
                    className={`shrink-0 ${
                      active ? 'text-[#c5a46b]' : 'text-[#18432f]'
                    }`}
                  />

                  <span>{loc.label}</span>
                </button>
              );
            })}
          </div>

          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#102d47]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#102d47] transition-colors hover:border-[#102d47] hover:bg-[#102d47] hover:text-white"
          >
            <span>Open in Google Maps</span>
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#c5a46b]/25 bg-white">
          <iframe
            key={current.id}
            title={current.label}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`block w-full border-0 ${
              compact ? 'h-72 sm:h-80' : 'h-80 sm:h-[26rem]'
            }`}
          />
        </div>

        <div className="mt-3 flex flex-col gap-3 px-1 pt-1 text-xs text-[#4d5d55] sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="inline-flex items-center gap-2 font-semibold text-[#102d47]">
              <Building2
                size={14}
                aria-hidden="true"
                className="shrink-0 text-[#c5a46b]"
              />
              <span>{current.business}</span>
            </p>

            <address className="pl-5 not-italic leading-relaxed text-[#36453e]">
              {current.address}
            </address>

            <p className="pl-5 leading-relaxed text-[#36453e]">
              <span className="font-semibold">Landmark:</span>{' '}
              {current.landmark}
            </p>
          </div>

          <p className="shrink-0 pl-5 font-medium text-[#18432f] sm:pl-0">
            Contact Person: {current.concernPerson}
          </p>
        </div>
      </div>
    </section>
  );
}