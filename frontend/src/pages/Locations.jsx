import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Navigation,
  Phone,
  UserCheck,
  Briefcase,
  Plus,
  Minus,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Landmark,
} from 'lucide-react';

const LOMEKA_UNIT = {
  id: 'lomeka-mnf-unit',
  name: 'LOMEKA Fashion — MNF Unit',
  cityLabel: 'Kolar Road, Bhopal',
  address:
    'Shop No. 2, C-385, Udayanchal Nagar, Near Amarnath Temple, Kolar Road, Bhopal, Madhya Pradesh.',
  landmark: 'Next to Aasa Proteins',
  concernPerson: 'Ms Neetu',
  business: 'MNF – Manufacturing Unit of Garments',
  latitude: 23.185831,
  longitude: 77.409462,
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=23.185831,77.409462',
};

export default function Locations() {
  const [mapZoom, setMapZoom] = useState(16);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    unit: 'MNF – Manufacturing Unit of Garments',
    city: 'Bhopal',
    message: '',
    agreed: false,
  });

  const googleMapEmbedSrc = `https://www.google.com/maps?q=${LOMEKA_UNIT.latitude},${LOMEKA_UNIT.longitude}&z=${mapZoom}&output=embed`;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.agreed) {
      return;
    }
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#faf7fd] text-[#24103a]">
      {/* 1. Exact Bhopal Unit Details + Interactive Google Map (Top Section) */}
      <section
        aria-label="LOMEKA Bhopal manufacturing location and map"
        className="border-b border-[#9b6bc7]/20 bg-white px-4 py-8 sm:px-8 sm:py-14"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#9b6bc7] uppercase">
                VERIFIED MANUFACTURING LOCATION
              </p>
              <h1 className="mt-1 font-display text-3xl text-[#24103a] sm:text-5xl">
                {LOMEKA_UNIT.name}
              </h1>
            </div>

            <Link
              to="/collections"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6f3fa1] underline decoration-[#9b6bc7] underline-offset-4 transition-colors hover:text-[#24103a] sm:text-sm"
            >
              <span>Explore LOMEKA collections</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,43fr)_minmax(0,57fr)] lg:items-stretch lg:gap-7">
            {/* Left Exact Location Card */}
            <article className="flex h-full flex-col justify-between rounded-2xl border border-[#9b6bc7]/30 border-l-4 border-l-[#3b185f] bg-white p-5 shadow-md sm:p-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#f4ecfc] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#6f3fa1] uppercase">
                    {LOMEKA_UNIT.cityLabel}
                  </span>
                  <span className="text-xs font-medium text-[#7c6f8c]">
                    Map Zoom: {mapZoom}x
                  </span>
                </div>

                <h2 className="mt-3 font-display text-2xl text-[#24103a] sm:text-3xl">
                  {LOMEKA_UNIT.business}
                </h2>

                <div className="mt-5 space-y-3.5 text-xs text-[#4f3e63] sm:text-sm">
                  <div className="flex items-start gap-3 rounded-xl bg-[#faf7fd] p-3.5">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-[#6f3fa1]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.14em] text-[#7c6f8c] uppercase">
                        Address
                      </p>
                      <p className="mt-0.5 leading-relaxed font-medium text-[#24103a]">
                        {LOMEKA_UNIT.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-[#faf7fd] p-3.5">
                    <Landmark
                      size={18}
                      className="mt-0.5 shrink-0 text-[#6f3fa1]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.14em] text-[#7c6f8c] uppercase">
                        Landmark
                      </p>
                      <p className="mt-0.5 font-semibold text-[#3b185f]">
                        {LOMEKA_UNIT.landmark}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2.5 rounded-xl border border-[#9b6bc7]/15 p-3">
                      <UserCheck
                        size={17}
                        className="shrink-0 text-[#6f3fa1]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.12em] text-[#7c6f8c] uppercase">
                          Concern Person
                        </p>
                        <p className="font-semibold text-[#24103a]">
                          {LOMEKA_UNIT.concernPerson}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-xl border border-[#9b6bc7]/15 p-3">
                      <Briefcase
                        size={17}
                        className="shrink-0 text-[#6f3fa1]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.12em] text-[#7c6f8c] uppercase">
                          Business Unit
                        </p>
                        <p className="font-semibold text-[#24103a]">
                          MNF Unit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#9b6bc7]/15 pt-5">
                <Link
                  to="/contact?location=bhopal-mnf-unit"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#3b185f] px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#24103a]"
                >
                  <span>REQUEST VISIT DETAILS</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <a
                  href={LOMEKA_UNIT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6f3fa1] transition-colors hover:text-[#24103a] sm:text-sm"
                >
                  <Navigation size={14} aria-hidden="true" />
                  <span>Get Directions →</span>
                </a>
              </div>
            </article>

            {/* Right Google Map Panel */}
            <div className="relative overflow-hidden rounded-2xl border border-[#9b6bc7]/25 bg-[#efe9f5] shadow-md">
              <div className="relative h-[360px] w-full sm:h-[460px]">
                <iframe
                  key={`lomeka-map-${mapZoom}`}
                  title="Google Map of LOMEKA Fashion MNF Unit, Udayanchal Nagar, Kolar Road, Bhopal"
                  src={googleMapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />

                {/* Top-Right Zoom Controls */}
                <div className="absolute top-3.5 right-3.5 z-10 flex flex-col overflow-hidden rounded-lg border border-[#9b6bc7]/30 bg-white shadow-sm">
                  <button
                    type="button"
                    aria-label="Zoom in map"
                    onClick={() => setMapZoom((z) => Math.min(19, z + 1))}
                    className="flex h-8 w-8 items-center justify-center border-b border-[#9b6bc7]/20 text-[#24103a] transition-colors hover:bg-[#faf7fd]"
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label="Zoom out map"
                    onClick={() => setMapZoom((z) => Math.max(12, z - 1))}
                    className="flex h-8 w-8 items-center justify-center text-[#24103a] transition-colors hover:bg-[#faf7fd]"
                  >
                    <Minus size={15} />
                  </button>
                </div>

                {/* Bottom-Left Verified Badge */}
                <div className="absolute bottom-3.5 left-3.5 z-10 rounded-md border border-[#9b6bc7]/25 bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#5e4d72] uppercase shadow-2xs backdrop-blur-xs">
                  UDAYANCHAL NAGAR · KOLAR ROAD, BHOPAL
                </div>

                {/* Bottom-Right Open in Google Maps */}
                <a
                  href={LOMEKA_UNIT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3.5 bottom-3.5 z-10 hidden items-center gap-1.5 rounded-md border border-[#9b6bc7]/25 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#3b185f] shadow-2xs backdrop-blur-xs transition-colors hover:bg-[#faf7fd] sm:flex"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Location Assistance + Form with Visual Cards (Second Section) */}
      <section
        aria-labelledby="location-assistance-heading"
        className="relative overflow-hidden bg-gradient-to-br from-[#230e3d] via-[#1b0a30] to-[#130623] px-4 py-10 text-white sm:px-8 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-24 h-96 w-96 rounded-full bg-[#9b6bc7]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 font-display text-[clamp(6rem,20vw,13rem)] leading-none tracking-[0.08em] text-white/[0.03] select-none"
        >
          LOMEKA
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-white/12 pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d5b4f7]/30 bg-white/[0.07] px-3.5 py-1 text-[10px] font-bold tracking-[0.2em] text-[#e3c8fc] uppercase">
                <Sparkles size={12} aria-hidden="true" />
                LOCATION ASSISTANCE · BHOPAL
              </span>

              <h2
                id="location-assistance-heading"
                className="mt-3 font-display text-3xl leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Let’s find the{' '}
                <span className="text-[#d5b4f7]">right place.</span>
              </h2>
            </div>

            {/* <p className="max-w-md text-xs leading-relaxed text-[#dfd3ec] sm:text-sm lg:text-right">
              Visit LOMEKA’s garment manufacturing unit on Kolar Road, Bhopal,
              or connect with{' '}
              <span className="font-semibold text-white">Ms Neetu</span> for
              factory visits and bulk orders.
            </p> */}
          </div>

          {/* Main Grid: Left Visual Showcase + Right Enquiry Form */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-8">
            {/* Left Visual Showcase Column */}
            <div className="flex flex-col justify-between gap-4">
              <figure className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#2a1244] shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/stage-material-v1.png"
                    alt="LOMEKA wholesale apparel samples and bulk garments"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#120521]/95 via-[#120521]/65 to-transparent p-4 sm:p-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#d5b4f7] uppercase">
                      {LOMEKA_UNIT.business}
                    </p>
                    <p className="mt-0.5 font-display text-lg text-white sm:text-xl">
                      Udayanchal Nagar, Kolar Road
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-xs">
                    Bhopal, MP
                  </span>
                </figcaption>
              </figure>

              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                <figure className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#2a1244] shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/stage-material-v1.png"
                      alt="LOMEKA fabric rolls and textile sourcing"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#120521]/90 to-transparent px-3.5 py-2.5">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-[#e3c8fc] uppercase">
                      Concern Person
                    </p>
                    <p className="text-xs font-semibold text-white">Ms Neetu</p>
                  </div>
                </figure>

                <div className="flex flex-col justify-between rounded-2xl border border-[#d5b4f7]/25 bg-white/[0.06] p-4 backdrop-blur-xs sm:p-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#d5b4f7] uppercase">
                      Key Landmark
                    </p>
                    <p className="mt-1.5 font-display text-base leading-snug text-white sm:text-lg">
                      {LOMEKA_UNIT.landmark}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#d7cae6]">
                      Near Amarnath Temple, Kolar Road, Bhopal.
                    </p>
                  </div>

                  <a
                    href={LOMEKA_UNIT.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e3c8fc] transition-colors hover:text-white"
                  >
                    <Navigation size={13} aria-hidden="true" />
                    <span>Directions →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Location Enquiry Form Card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#9b6bc7]/25 bg-white p-5 text-[#24103a] shadow-2xl sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#3b185f] via-[#9b6bc7] to-[#e3c8fc]" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#f4ecfc] px-3 py-0.5 text-[10px] font-bold tracking-[0.15em] text-[#6f3fa1] uppercase">
                    Where would you like to connect?
                  </span>
                  <span className="text-[11px] font-medium text-[#7c6f8c]">
                    MNF Garments Unit
                  </span>
                </div>

                <h3 className="mt-2.5 font-display text-2xl text-[#24103a] sm:text-3xl">
                  Schedule a visit or location enquiry
                </h3>
                <p className="mt-1 text-xs text-[#675878]">
                  Share your details to connect with us
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-xl border border-[#9b6bc7]/30 bg-[#faf7fd] p-6 text-center">
                    <CheckCircle2
                      className="mx-auto text-[#6f3fa1]"
                      size={36}
                      aria-hidden="true"
                    />
                    <h4 className="mt-2.5 font-display text-xl text-[#24103a]">
                      Location enquiry received
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#5e4d72] sm:text-sm">
                      Thank you, {formData.name}. Our team (Concern Person:{' '}
                      <span className="font-semibold text-[#24103a]">
                        Ms Neetu
                      </span>
                      ) will assist you for{' '}
                      <span className="font-semibold text-[#3b185f]">
                        {LOMEKA_UNIT.business}
                      </span>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          mobile: '',
                          unit: 'MNF – Manufacturing Unit of Garments',
                          city: 'Bhopal',
                          message: '',
                          agreed: false,
                        });
                      }}
                      className="mt-4 inline-flex items-center justify-center rounded-lg border border-[#9b6bc7]/45 bg-white px-4 py-2 text-xs font-semibold text-[#3b185f] transition-colors hover:bg-[#f4ecfc]"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#24103a]">
                          Your name <span className="text-[#9b6bc7]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="mt-1.5 w-full rounded-xl border border-[#9b6bc7]/25 bg-[#fcfaff] px-3.5 py-2.5 text-sm text-[#24103a] placeholder:text-[#9c8eab] transition-colors focus:border-[#3b185f] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#24103a]">
                          Mobile number <span className="text-[#9b6bc7]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Your contact number"
                          className="mt-1.5 w-full rounded-xl border border-[#9b6bc7]/25 bg-[#fcfaff] px-3.5 py-2.5 text-sm text-[#24103a] placeholder:text-[#9c8eab] transition-colors focus:border-[#3b185f] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#24103a]">
                          Business / Unit
                        </label>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="mt-1.5 w-full rounded-xl border border-[#9b6bc7]/25 bg-[#fcfaff] px-3.5 py-2.5 text-sm text-[#24103a] transition-colors focus:border-[#3b185f] focus:bg-white focus:outline-none"
                        >
                          <option value="MNF – Manufacturing Unit of Garments">
                            MNF – Manufacturing Unit of Garments
                          </option>
                          <option value="Wholesale & Custom Garment Orders">
                            Wholesale & Custom Garment Orders
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#24103a]">
                          Your city
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          className="mt-1.5 w-full rounded-xl border border-[#9b6bc7]/25 bg-[#fcfaff] px-3.5 py-2.5 text-sm text-[#24103a] placeholder:text-[#9c8eab] transition-colors focus:border-[#3b185f] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#24103a]">
                        What do you need help with?
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ask about visit timing at Udayanchal Nagar, Kolar Road Bhopal, fabric samples, or garment manufacturing..."
                        className="mt-1.5 w-full rounded-xl border border-[#9b6bc7]/25 bg-[#fcfaff] px-3.5 py-2.5 text-sm text-[#24103a] placeholder:text-[#9c8eab] transition-colors focus:border-[#3b185f] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#5e4d72]">
                      <input
                        type="checkbox"
                        name="agreed"
                        required
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="size-4 rounded border-[#9b6bc7]/40 text-[#3b185f] focus:ring-[#9b6bc7]"
                      />
                      <span>
                        I agree to share these details for a response to my
                        enquiry.
                      </span>
                    </label>

                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[11px] italic text-[#7c6f8c]">
                        Location details are subject to confirmation.
                      </p>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#3b185f] to-[#6f3fa1] px-5 py-3 text-xs font-bold tracking-[0.15em] text-white uppercase shadow-md transition-all hover:from-[#24103a] hover:to-[#4c2478]"
                      >
                        <span>SEND LOCATION ENQUIRY</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dark Banner Strip */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-[#24103a] via-[#1b0a30] to-[#120521] px-4 py-10 text-white sm:px-8 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#9b6bc7]/20 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#d5b4f7] uppercase">
              LOMEKA FASHION · BHOPAL
            </p>
            <h2 className="mt-1.5 font-display text-3xl leading-tight sm:text-5xl">
              Building what matters,{' '}
              <span className="text-[#e3c8fc]">together.</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-xl bg-[#9b6bc7] px-5 py-3.5 text-xs font-bold tracking-[0.15em] text-white uppercase shadow-md transition-all hover:bg-[#b287dc]"
          >
            <Phone size={15} aria-hidden="true" />
            <span>START A CONVERSATION</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}