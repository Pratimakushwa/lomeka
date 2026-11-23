import {
  Boxes,
  Ruler,
  MapPin,
  Tags,
  Users,
  Shirt,
} from 'lucide-react';

const features = [
  { Icon: Boxes, label: 'Bulk Orders' },
  { Icon: Ruler, label: 'Custom Designs' },
  { Icon: Tags, label: 'Custom Branding' },
  { Icon: Users, label: 'Men’s & Women’s Wear' },
  { Icon: Shirt, label: 'T-Shirts & Tracksuits' },
  { Icon: MapPin, label: 'Made in India' },
];

function FeatureGroup({ duplicate = false }) {
  return (
    <ul
      className="lomeka-gold-group"
      aria-hidden={duplicate ? true : undefined}
    >
      {features.map(({ Icon, label }) => (
        <li key={label} className="lomeka-gold-item">
          <span className="lomeka-gold-icon">
            <Icon
              size={18}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </span>

          <span className="lomeka-gold-label">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function FeatureStrip() {
  return (
    <section
      aria-label="Manufacturing services"
      tabIndex={0}
      className="lomeka-gold-strip"
    >
      <style>{`
        .lomeka-gold-strip {
          --strip-group-width: max(100vw, 1680px);
          position: relative;
          isolation: isolate;
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(16, 77, 60, 0.16);
          border-bottom: 1px solid rgba(16, 77, 60, 0.16);
          background: #bd9459;
          color: #103c2f;
        }

        .lomeka-gold-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0.14),
            transparent 45%,
            rgba(255, 255, 255, 0.06)
          );
        }

        .lomeka-gold-strip:focus-visible {
          outline: 2px solid #104d3c;
          outline-offset: 4px;
        }

        .lomeka-gold-track {
          position: relative;
          display: flex;
          width: max-content;
          animation: lomeka-gold-scroll 38s linear infinite;
        }

        .lomeka-gold-group {
          display: flex;
          flex: 0 0 var(--strip-group-width);
          width: var(--strip-group-width);
          margin: 0;
          padding: 21px 0;
          list-style: none;
        }

        .lomeka-gold-item {
          display: flex;
          flex: 1 1 0;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 0;
          padding: 0 22px;
          box-sizing: border-box;
        }

        .lomeka-gold-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(16, 77, 60, 0.2);
          border-radius: 8px;
          background: rgba(250, 247, 242, 0.24);
          color: #103c2f;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .lomeka-gold-item:hover .lomeka-gold-icon {
          background: rgba(250, 247, 242, 0.45);
          border-color: rgba(16, 77, 60, 0.4);
        }

        .lomeka-gold-label {
          white-space: nowrap;
          font-family: var(--font-body, Arial, sans-serif);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.015em;
          line-height: 1.4;
        }

        .lomeka-gold-strip:hover .lomeka-gold-track,
        .lomeka-gold-strip:focus-within .lomeka-gold-track {
          animation-play-state: paused;
        }

        @keyframes lomeka-gold-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 639px) {
          .lomeka-gold-strip {
            --strip-group-width: 1440px;
          }

          .lomeka-gold-group {
            padding: 17px 0;
          }

          .lomeka-gold-item {
            gap: 9px;
            padding: 0 16px;
          }

          .lomeka-gold-icon {
            width: 30px;
            height: 30px;
            border-radius: 7px;
          }

          .lomeka-gold-icon svg {
            width: 16px;
            height: 16px;
          }

          .lomeka-gold-label {
            font-size: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lomeka-gold-track {
            width: 100%;
            animation: none;
            transform: none;
          }

          .lomeka-gold-group {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            flex-basis: 100%;
            width: 100%;
            gap: 22px 0;
          }

          .lomeka-gold-group[aria-hidden="true"] {
            display: none;
          }

          .lomeka-gold-item {
            flex-direction: column;
            gap: 8px;
            padding: 0 8px;
            text-align: center;
          }

          .lomeka-gold-label {
            white-space: normal;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="lomeka-gold-track">
        <FeatureGroup />
        <FeatureGroup duplicate />
      </div>
    </section>
  );
}