import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '');

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const fitOptions = ['Regular', 'Oversized', 'Fitted', 'Boxy'];
const pageSize = 12;

const categories = [
  ['', 'All Styles'],
  ['t-shirts', 'T-Shirts'],
  ['tracksuits', 'Tracksuits'],
  ['hoodies-jackets', 'Hoodies & Jackets'],
  ['activewear', 'Activewear'],
  ['other', 'Other'],
];

const genders = [
  ['all', 'All Collections'],
  ['men', 'Men'],
  ['women', 'Women'],
];

const banners = {
  all: {
    title: 'The LOMEKA Collections',
    description:
      'Men’s and women’s apparel manufactured for wholesale buyers, distributors, and retail brands.',
  },
  men: {
    title: 'Men’s Collection',
    description:
      'T-shirts, tracksuits, hoodies, activewear and wholesale styles built for everyday performance.',
  },
  women: {
    title: 'Women’s Collection',
    description:
      'T-shirts, tracksuits, hoodies, activewear and wholesale silhouettes crafted for modern retail.',
  },
};

const colors = {
  charcoal: { label: 'Charcoal', hex: '#444346' },
  navy: { label: 'Navy', hex: '#182541' },
  ivory: { label: 'Ivory', hex: '#eee5d4' },
  burgundy: { label: 'Burgundy', hex: '#652937' },
  'dusty-blue': { label: 'Dusty Blue', hex: '#637e9d' },
  olive: { label: 'Olive', hex: '#6f825a' },
  black: { label: 'Black', hex: '#242424' },
  white: { label: 'White', hex: '#ffffff' },
};

const extraImages = import.meta.glob(
  '../assets/collection-variants/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, import: 'default', query: '?url' },
);

const productData = [
  // Men
  {
    id: 'charcoal-oversized',
    name: 'Oversized T-Shirt',
    gender: 'men',
    category: 't-shirts',
    fit: 'Oversized',
    color: 'charcoal',
    image: '/img5.png',
    hoverImage: '/img3.png',
    sizes,
  },
  {
    id: 'regular-crew-neck',
    name: 'Regular Crew-Neck T-Shirt',
    gender: 'men',
    category: 't-shirts',
    fit: 'Regular',
    color: 'navy',
    image: '/img5.png',
    hoverImage: '/img3.png',
    sizes,
  },
  {
    id: 'navy-tracksuit',
    name: 'Zip Tracksuit',
    gender: 'men',
    category: 'tracksuits',
    fit: 'Regular',
    color: 'navy',
    image: '/img3.png',
    hoverImage: '/img5.png',
    sizes,
  },
  {
    id: 'men-hoodie-jacket',
    name: 'Heavyweight Fleece Hoodie',
    gender: 'men',
    category: 'hoodies-jackets',
    fit: 'Oversized',
    color: 'charcoal',
    image: '/img3.png',
    hoverImage: '/img5.png',
    sizes,
  },
  {
    id: 'men-activewear',
    name: 'Performance Training Set',
    gender: 'men',
    category: 'activewear',
    fit: 'Regular',
    color: 'olive',
    image: '/img5.png',
    hoverImage: '/img3.png',
    sizes,
  },
  {
    id: 'men-other-workwear',
    name: 'Utility Twill Overshirt',
    gender: 'men',
    category: 'other',
    fit: 'Boxy',
    color: 'navy',
    image: '/img3.png',
    hoverImage: '/img5.png',
    sizes,
  },

  // Women
  {
    id: 'ivory-crew-neck',
    name: 'Crew-Neck T-Shirt',
    gender: 'women',
    category: 't-shirts',
    fit: 'Fitted',
    color: 'ivory',
    image: '/img6.png',
    hoverImage: '/img2.png',
    sizes,
  },
  {
    id: 'boxy-fit',
    name: 'Boxy Fit T-Shirt',
    gender: 'women',
    category: 't-shirts',
    fit: 'Boxy',
    color: 'dusty-blue',
    image: '/img6.png',
    hoverImage: '/img2.png',
    sizes,
  },
  {
    id: 'burgundy-tracksuit',
    name: 'Tracksuit',
    gender: 'women',
    category: 'tracksuits',
    fit: 'Regular',
    color: 'burgundy',
    image: '/img2.png',
    hoverImage: '/img6.png',
    sizes,
  },
  {
    id: 'women-hoodie-jacket',
    name: 'Cropped Zip Jacket',
    gender: 'women',
    category: 'hoodies-jackets',
    fit: 'Boxy',
    color: 'ivory',
    image: '/img2.png',
    hoverImage: '/img6.png',
    sizes,
  },
  {
    id: 'women-activewear',
    name: 'Studio Active Co-ord',
    gender: 'women',
    category: 'activewear',
    fit: 'Fitted',
    color: 'olive',
    image: '/img6.png',
    hoverImage: '/img2.png',
    sizes,
  },
  {
    id: 'women-other-resort',
    name: 'Relaxed Linen Blend Set',
    gender: 'women',
    category: 'other',
    fit: 'Regular',
    color: 'ivory',
    image: '/img2.png',
    hoverImage: '/img6.png',
    sizes,
  },
];

function normalizeCategorySlug(raw = '') {
  const cleaned = String(raw)
    .trim()
    .toLowerCase()
    .replaceAll('&', '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-');

  if (cleaned === 'hoodies-jackets' || cleaned === 'hoodies--jackets') {
    return 'hoodies-jackets';
  }
  return cleaned;
}

const staticProducts = productData.flatMap((product) => {
  const variants = new Map();

  if (product.image) {
    variants.set(product.color, product.image);
  }

  for (const [path, image] of Object.entries(extraImages)) {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    const [productId, color] = filename.split('--');

    if (productId === product.id && Object.hasOwn(colors, color)) {
      variants.set(color, image);
    }
  }

  if (!variants.size) return [];

  const gallery = [product.image];
  if (product.hoverImage && product.hoverImage !== product.image) {
    gallery.push(product.hoverImage);
  } else if (variants.size > 1) {
    for (const img of variants.values()) {
      if (img && !gallery.includes(img)) {
        gallery.push(img);
        break;
      }
    }
  }

  return [
    {
      ...product,
      gallery,
      variants: Array.from(variants, ([id, image]) => ({
        id,
        image,
        ...colors[id],
      })),
    },
  ];
});

function mapApiProductToCollectionItem(item, index = 0) {
  const imgs = [];
  if (item?.imageUrl) imgs.push(item.imageUrl);
  if (item?.secondaryImageUrl && !imgs.includes(item.secondaryImageUrl)) {
    imgs.push(item.secondaryImageUrl);
  }
  if (Array.isArray(item?.images)) {
    for (const img of item.images) {
      if (img && !imgs.includes(img)) imgs.push(img);
    }
  }

  const primaryImg = imgs[0] || '/img5.png';
  const hoverImg = imgs[1] || primaryImg;
  const rawGender = String(item?.gender || '').toLowerCase();
  const gender = ['men', 'women'].includes(rawGender) ? rawGender : 'men';
  const category = normalizeCategorySlug(item?.category || 't-shirts');

  return {
    id: item?._id || item?.id || `api-${index}-${item?.title || 'item'}`,
    name: item?.title || item?.name || 'Wholesale Style',
    gender,
    category,
    fit: item?.fit || 'Regular',
    color: 'charcoal',
    image: primaryImg,
    hoverImage: hoverImg,
    gallery: imgs.length ? imgs : [primaryImg],
    moq: item?.moq || 50,
    pricePerUnit: item?.pricePerUnit ?? null,
    gsm: item?.gsm || '',
    fabric: item?.fabric || '',
    sizes,
    variants: [
      {
        id: 'charcoal',
        image: primaryImg,
        ...colors.charcoal,
      },
    ],
  };
}

function extractProductsList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  return [];
}

function normalizeCategoryParam(rawCategory = '') {
  const slug = normalizeCategorySlug(rawCategory);
  const matched = categories.find(
    ([id, label]) => id === slug || normalizeCategorySlug(label) === slug,
  );
  return matched ? matched[0] : '';
}

function readFilters() {
  if (typeof window === 'undefined') {
    return {
      gender: 'all',
      category: '',
      fits: [],
      size: '',
      color: '',
      q: '',
      page: 1,
    };
  }

  const query = new URLSearchParams(window.location.search);
  const hashGender = { '#mens': 'men', '#womens': 'women' };
  const rawGender = (
    query.get('gender') ??
    hashGender[window.location.hash] ??
    ''
  ).toLowerCase();
  const category = normalizeCategoryParam(query.get('category') ?? '');
  const size = query.get('size') ?? '';
  const color = (query.get('color') ?? '').toLowerCase();
  const q = query.get('q') ?? '';
  const page = Number(query.get('page'));

  return {
    gender: ['men', 'women'].includes(rawGender) ? rawGender : 'all',
    category,
    fits: fitOptions.filter((fit) => query.getAll('fit').includes(fit)),
    size: sizes.includes(size) ? size : '',
    color: Object.hasOwn(colors, color) ? color : '',
    q,
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

function makeUrl(filters) {
  const query = new URLSearchParams();

  if (filters.gender !== 'all') query.set('gender', filters.gender);
  if (filters.category) query.set('category', filters.category);
  if (filters.size) query.set('size', filters.size);
  if (filters.color) query.set('color', filters.color);
  if (filters.q.trim()) query.set('q', filters.q.trim());
  filters.fits.forEach((fit) => query.append('fit', fit));
  if (filters.page > 1) query.set('page', String(filters.page));

  return `/collections${query.size ? `?${query}` : ''}`;
}

function Banner({ gender }) {
  const banner = banners[gender] || banners.all;

  return (
    <section className="lc-banner" aria-labelledby="collection-title">
      <div className="lc-banner-inner">
        <span className="lc-banner-rule" aria-hidden="true" />
        <h1 id="collection-title">{banner.title}</h1>
        <p>{banner.description}</p>
      </div>
    </section>
  );
}

function CollapsibleGroup({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="lc-group">
      <button
        type="button"
        className="lc-group-btn"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className={`lc-caret ${open ? 'is-open' : ''}`} aria-hidden="true">
          ▴
        </span>
      </button>

      {open && <div className="lc-group-body">{children}</div>}
    </div>
  );
}

function Filters({ filters, onChange, onClearAll, suffix, onSearchSubmit }) {
  const [draftQuery, setDraftQuery] = useState(filters.q);

  useEffect(() => {
    setDraftQuery(filters.q);
  }, [filters.q]);

  function toggleFit(fit) {
    onChange({
      fits: filters.fits.includes(fit)
        ? filters.fits.filter((item) => item !== fit)
        : [...filters.fits, fit],
    });
  }

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange({ q: draftQuery });
      onSearchSubmit?.();
    }
  }

  return (
    <div className="lc-filter-content">
      <div className="lc-filter-top">
        <div>
          <div className="lc-filter-title-row">
            <span className="lc-filter-funnel" aria-hidden="true">
              ω
            </span>
            <h2>FILTERS</h2>
          </div>
          <p className="lc-filter-sub">REFINE YOUR LIST</p>
        </div>

        <button
          type="button"
          className="lc-clear-all"
          onClick={() => {
            setDraftQuery('');
            onClearAll();
          }}
        >
          CLEAR ALL
        </button>
      </div>

      <div className="lc-search-wrap">
        <input
          type="search"
          aria-label="Search styles"
          placeholder="Search collection, style... (Enter)"
          value={draftQuery}
          onChange={(e) => setDraftQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="lc-search-input"
        />
      </div>

      <CollapsibleGroup title="COLLECTION" defaultOpen>
        {genders.map(([value, label]) => (
          <label key={value} className="lc-option">
            <input
              type="radio"
              name={`gender-${suffix}`}
              checked={filters.gender === value}
              onChange={() => onChange({ gender: value })}
            />
            <span>{label}</span>
          </label>
        ))}
      </CollapsibleGroup>

      <CollapsibleGroup title="CATEGORY" defaultOpen>
        {categories.map(([value, label]) => (
          <label key={value} className="lc-option">
            <input
              type="radio"
              name={`category-${suffix}`}
              checked={filters.category === value}
              onChange={() => onChange({ category: value })}
            />
            <span>{label}</span>
          </label>
        ))}
      </CollapsibleGroup>

      <CollapsibleGroup title="FIT" defaultOpen>
        {fitOptions.map((fit) => (
          <label key={fit} className="lc-option">
            <input
              type="checkbox"
              checked={filters.fits.includes(fit)}
              onChange={() => toggleFit(fit)}
            />
            <span>{fit}</span>
          </label>
        ))}
      </CollapsibleGroup>

      <CollapsibleGroup title="SIZE" defaultOpen>
        <div className="lc-sizes">
          {['', ...sizes].map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={filters.size === size}
              onClick={() => onChange({ size })}
            >
              {size || 'All'}
            </button>
          ))}
        </div>
      </CollapsibleGroup>

      <CollapsibleGroup title="COLOUR" defaultOpen={false}>
        <div className="lc-color-list">
          <button
            type="button"
            className={`lc-color-chip ${filters.color === '' ? 'is-active' : ''}`}
            onClick={() => onChange({ color: '' })}
          >
            All Colours
          </button>
          {Object.entries(colors).map(([id, info]) => (
            <button
              key={id}
              type="button"
              className={`lc-color-chip ${filters.color === id ? 'is-active' : ''}`}
              onClick={() => onChange({ color: filters.color === id ? '' : id })}
            >
              <span
                className="lc-chip-dot"
                style={{ backgroundColor: info.hex }}
              />
              <span>{info.label}</span>
            </button>
          ))}
        </div>
      </CollapsibleGroup>
    </div>
  );
}

function ProductCard({ product, size, index }) {
  const cardRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(product.variants[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const variant =
    product.variants.find((item) => item.id === selectedColor) ||
    product.variants[0];

  const views = [variant.image];
  for (const img of product.gallery || []) {
    if (img && !views.includes(img)) {
      views.push(img);
    }
  }

  const hasMultipleViews = views.length > 1;
  const currentDot = isHovered ? 1 : Math.min(activeSlide, views.length - 1);
  const displayImage = views[currentDot] || variant.image;

  const title = `${variant.label} ${product.name}`;
  const garment = size ? `${title} — Size ${size}` : title;

  useEffect(() => {
    setActiveSlide(0);
  }, [selectedColor]);

  useEffect(() => {
    const card = cardRef.current;

    if (
      !card ||
      !('IntersectionObserver' in window) ||
      !card.animate ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let animation;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      animation = card.animate(
        [
          { opacity: 0.45, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 450,
          delay: (index % 3) * 45,
          easing: 'cubic-bezier(.2,.7,.2,1)',
        },
      );

      observer.disconnect();
    }, { threshold: 0.1 });

    observer.observe(card);

    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="lc-card"
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasMultipleViews) setActiveSlide(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveSlide(0);
      }}
    >
      <div className="lc-product-image">
        <img
          src={displayImage}
          alt={title}
          loading="lazy"
          decoding="async"
        />

        {hasMultipleViews && (
          <div
            className="lc-dots"
            role="group"
            aria-label={`Image views for ${title}`}
          >
            {views.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`View ${dotIndex + 1}`}
                aria-pressed={currentDot === dotIndex}
                className={`lc-dot ${currentDot === dotIndex ? 'is-active' : ''}`}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsHovered(false);
                  setActiveSlide(dotIndex);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovered(false);
                  setActiveSlide(dotIndex);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="lc-card-body">
        <span className="lc-card-meta">
          {product.gender === 'men' ? 'Men' : 'Women'} · {product.fit}
          {product.gsm ? ` · ${product.gsm}` : ''}
        </span>
        <h3>{title}</h3>

        {(product.pricePerUnit != null || product.moq) && (
          <p className="lc-card-pricing">
            {product.pricePerUnit != null ? `₹${product.pricePerUnit}/pc` : ''}
            {product.pricePerUnit != null && product.moq ? ' · ' : ''}
            {product.moq ? `MOQ ${product.moq} pcs` : ''}
          </p>
        )}

        <div
          className="lc-swatches"
          role="group"
          aria-label={`Colours for ${product.name}`}
        >
          {product.variants.map((color) => (
            <button
              key={color.id}
              type="button"
              title={color.label}
              aria-label={color.label}
              aria-pressed={selectedColor === color.id}
              onClick={() => setSelectedColor(color.id)}
            >
              <span style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>

        <div className="lc-card-actions">
          <Link to={`/contact?${new URLSearchParams({ garment, type: 'enquiry' })}`}>
            Wholesale Enquiry <span aria-hidden="true">↗</span>
          </Link>
          <Link
            to={`/contact?${new URLSearchParams({ garment, type: 'bulk-order' })}`}
            className="lc-bulk-link"
          >
            Bulk Order
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Collections() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(readFilters);
  const [apiProducts, setApiProducts] = useState([]);
  const [catalogStatus, setCatalogStatus] = useState('loading');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLiveProducts() {
      setCatalogStatus('loading');

      try {
        const res = await fetch(`${API_URL}/api/products`, {
          signal: controller.signal,
        });
        const data = await res.json().catch(() => null);
        const list = extractProductsList(data);

        if (res.ok && list.length) {
          const mapped = list.map((item, idx) =>
            mapApiProductToCollectionItem(item, idx),
          );
          setApiProducts(mapped);
          setCatalogStatus('ready');
          return;
        }

        setCatalogStatus(res.ok ? 'empty-live' : 'fallback');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setCatalogStatus('fallback');
        }
      }
    }

    fetchLiveProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setFilters(readFilters());
  }, [location.search, location.hash]);

  useEffect(() => {
    if (!mobileFilterOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileFilterOpen]);

  function updateFilters(changes) {
    const next = { ...filters, page: 1, ...changes };
    const url = makeUrl(next);
    const current = `${location.pathname}${location.search}${location.hash}`;

    if (current !== url) navigate(url);
    setFilters(next);
  }

  function handleClearAll() {
    updateFilters({
      gender: 'all',
      category: '',
      fits: [],
      size: '',
      color: '',
      q: '',
    });
  }

  function handleMobileSearchSubmit() {
    setMobileFilterOpen(false);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const allCatalog = [...apiProducts, ...staticProducts];
  const normalizedQuery = filters.q.trim().toLowerCase();

  const filteredProducts = allCatalog.filter((product) => {
    const matchesGender =
      filters.gender === 'all' || product.gender === filters.gender;
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesFit =
      !filters.fits.length || filters.fits.includes(product.fit);
    const matchesSize = !filters.size || product.sizes.includes(filters.size);
    const matchesColor =
      !filters.color ||
      product.color === filters.color ||
      product.variants.some((v) => v.id === filters.color);
    const collectionText =
      product.gender === 'men'
        ? "men men's mens collection"
        : "women women's womens collection";
    const categoryText =
      categories.find(([id]) => id === product.category)?.[1] || '';

    const matchesSearch =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.fit.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      categoryText.toLowerCase().includes(normalizedQuery) ||
      collectionText.includes(normalizedQuery) ||
      product.color.toLowerCase().includes(normalizedQuery) ||
      (product.gsm && product.gsm.toLowerCase().includes(normalizedQuery)) ||
      (product.fabric && product.fabric.toLowerCase().includes(normalizedQuery));

    return (
      matchesGender &&
      matchesCategory &&
      matchesFit &&
      matchesSize &&
      matchesColor &&
      matchesSearch
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const page = Math.min(filters.page, totalPages);
  const start = (page - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(start, start + pageSize);
  const categoryLabel =
    categories.find(([id]) => id === filters.category)?.[1] ?? 'All Styles';

  function changePage(nextPage) {
    updateFilters({ page: nextPage });
    resultsRef.current?.scrollIntoView({ block: 'start' });
  }

  return (
    <div className="lc-page">
      <style>{`
        .lc-page {
          --lc-green: #0d4938;
          --lc-green-soft: #eef5f0;
          --lc-gold: #b88a50;
          --lc-line: rgba(184, 138, 80, 0.32);
          --lc-ink: #14261e;
          color: var(--lc-ink);
          background: #faf7f2;
          overflow-x: clip;
          max-width: 100%;
        }

        .lc-page * { box-sizing: border-box; }

        .lc-page button,
        .lc-page input {
          font: inherit;
        }

        .lc-page button { cursor: pointer; }

        .lc-page :focus-visible {
          outline: 2px solid var(--lc-green);
          outline-offset: 3px;
        }

        /* Center-aligned Green Hero */
        .lc-banner {
          background: var(--lc-green);
          color: #faf7f2;
          padding: 64px 24px;
          text-align: center;
          border-bottom: 1px solid rgba(184, 138, 80, 0.35);
        }

        .lc-banner-inner {
          max-width: 780px;
          margin: 0 auto;
        }

        .lc-banner-rule {
          display: block;
          width: 48px;
          height: 1px;
          background: var(--lc-gold);
          margin: 0 auto 20px;
        }

        .lc-banner h1 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #ffffff;
        }

        .lc-banner p {
          margin: 16px auto 0;
          font-size: 15px;
          line-height: 1.7;
          max-width: 540px;
          color: rgba(250, 247, 242, 0.86);
        }

        /* Layout + Sticky Reference-Style Sidebar */
        .lc-layout {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 32px;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px 56px;
        }

        .lc-sidebar {
          min-width: 0;
          align-self: stretch;
        }

        .lc-sidebar-inner {
          position: sticky;
          top: 24px;
          z-index: 10;
          background: #ffffff;
          border: 1px solid var(--lc-line);
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(24, 67, 47, 0.06);
        }

        .lc-filter-content {
          display: grid;
          gap: 14px;
        }

        .lc-filter-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0e7d8;
        }

        .lc-filter-title-row {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .lc-filter-funnel {
          font-size: 14px;
          color: var(--lc-gold);
          line-height: 1;
        }

        .lc-sidebar h2,
        .lc-mobile-drawer h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--lc-ink);
        }

        .lc-filter-sub {
          margin: 3px 0 0 21px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #7b8882;
          text-transform: uppercase;
        }

        .lc-clear-all {
          padding: 2px 4px;
          border: 0;
          background: transparent;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--lc-green);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .lc-clear-all:hover {
          color: #0e291c;
        }

        .lc-search-wrap {
          padding-bottom: 4px;
        }

        .lc-search-input {
          width: 100%;
          height: 38px;
          padding: 0 12px;
          border: 1px solid #dfd5c5;
          border-radius: 9px;
          background: #f5f3ef;
          font-size: 13px;
          color: var(--lc-ink);
          transition: border-color 140ms ease, background-color 140ms ease;
        }

        .lc-search-input::placeholder {
          color: #7c8782;
        }

        .lc-search-input:focus {
          outline: none;
          border-color: var(--lc-green);
          background: #ffffff;
        }

        .lc-group {
          border-top: 1px solid #f0e7d8;
          padding-top: 12px;
        }

        .lc-group-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0 8px;
          border: 0;
          background: transparent;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #4d5d55;
        }

        .lc-caret {
          font-size: 10px;
          color: #7b8882;
          transition: transform 150ms ease;
        }

        .lc-caret:not(.is-open) {
          transform: rotate(180deg);
        }

        .lc-group-body {
          display: grid;
          gap: 2px;
        }

        .lc-option {
          display: flex;
          align-items: center;
          gap: 9px;
          min-height: 30px;
          padding: 2px 8px;
          margin: 0 -8px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 12.5px;
          color: #36453e;
          transition: background-color 140ms ease;
        }

        .lc-option:hover {
          background: var(--lc-green-soft);
          color: var(--lc-green);
        }

        .lc-option input {
          width: 14px;
          height: 14px;
          margin: 0;
          accent-color: var(--lc-green);
          flex-shrink: 0;
        }

        .lc-sizes {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 2px;
        }

        .lc-sizes button {
          min-width: 36px;
          height: 30px;
          padding: 0 8px;
          background: #faf7f2;
          border: 1px solid var(--lc-line);
          border-radius: 7px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--lc-ink);
          transition: all 140ms ease;
        }

        .lc-sizes button:hover {
          border-color: var(--lc-green);
        }

        .lc-sizes button[aria-pressed="true"] {
          background: var(--lc-green);
          border-color: var(--lc-green);
          color: #ffffff;
          font-weight: 600;
        }

        .lc-color-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 2px;
        }

        .lc-color-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 7px;
          border: 1px solid var(--lc-line);
          background: #faf7f2;
          font-size: 11.5px;
          color: var(--lc-ink);
        }

        .lc-color-chip.is-active {
          border-color: var(--lc-green);
          background: var(--lc-green-soft);
          font-weight: 600;
          color: var(--lc-green);
        }

        .lc-chip-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .lc-clear {
          justify-self: center;
          padding: 8px 14px;
          border: 1px solid var(--lc-line);
          border-radius: 8px;
          background: #faf7f2;
          color: var(--lc-green);
          font-size: 12px;
          font-weight: 600;
        }

        .lc-clear:hover {
          background: var(--lc-green-soft);
        }

        .lc-mobile-trigger-wrap,
        .lc-mobile-drawer {
          display: none;
        }

        /* Results Area */
        .lc-results {
          min-width: 0;
          scroll-margin-top: 24px;
        }

        .lc-results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--lc-line);
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 18px;
        }

        .lc-results-header h2 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--lc-green);
        }

        .lc-results-header p {
          margin: 0;
          font-size: 12px;
          font-weight: 500;
          color: #56695f;
        }

        .lc-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          align-items: stretch;
          width: 100%;
        }

        .lc-card {
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid var(--lc-line);
          border-radius: 8px;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        .lc-card:hover {
          transform: translateY(-2px);
          border-color: rgba(184, 138, 80, 0.55);
          box-shadow: 0 8px 20px rgba(13, 73, 56, 0.07);
        }

        .lc-product-image {
          position: relative;
          width: 100%;
          height: 270px;
          overflow: hidden;
          background: #efe6d8;
          flex-shrink: 0;
        }

        .lc-page .lc-product-image img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          max-width: none;
          height: 100%;
          max-height: none;
          object-fit: cover;
          object-position: center top;
          transition: transform 280ms ease;
        }

        .lc-card:hover .lc-product-image img {
          transform: scale(1.03);
        }

        .lc-dots {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(20, 38, 30, 0.14);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .lc-dot {
          width: 6px;
          height: 6px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: rgba(20, 38, 30, 0.32);
          transition: width 160ms ease, background-color 160ms ease;
        }

        .lc-dot.is-active {
          width: 14px;
          background: var(--lc-green);
        }

        .lc-card-body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 14px 15px 16px;
        }

        .lc-card-meta {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #6f825a;
          margin-bottom: 4px;
        }

        .lc-card h3 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
          font-size: 19px;
          line-height: 1.25;
          color: var(--lc-ink);
          overflow-wrap: anywhere;
        }

        .lc-card-pricing {
          margin: 5px 0 0;
          font-size: 12px;
          font-weight: 600;
          color: var(--lc-green);
        }

        .lc-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin: 8px 0 10px;
        }

        .lc-swatches button {
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
        }

        .lc-swatches button span {
          display: block;
          width: 12px;
          height: 12px;
          border: 1px solid rgba(0, 0, 0, 0.22);
          border-radius: 50%;
        }

        .lc-swatches button[aria-pressed="true"] span {
          outline: 2px solid var(--lc-green);
          outline-offset: 2px;
        }

        .lc-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: auto;
        }

        .lc-card-actions a {
          color: var(--lc-green);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
          text-decoration: underline;
          text-decoration-color: var(--lc-gold);
          text-underline-offset: 4px;
        }

        .lc-card-actions a:hover {
          color: #0f2c1e;
        }

        .lc-card-actions .lc-bulk-link {
          padding: 4px 10px;
          border-radius: 6px;
          background: var(--lc-green);
          color: #ffffff;
          text-decoration: none;
        }

        .lc-card-actions .lc-bulk-link:hover {
          background: #103021;
          color: #ffffff;
        }

        .lc-empty {
          padding: 32px 24px;
          background: #ffffff;
          border: 1px solid var(--lc-line);
          border-radius: 12px;
          text-align: center;
        }

        .lc-empty p {
          margin: 0 0 14px;
          color: #56695f;
        }

        .lc-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
          font-size: 12px;
        }

        .lc-pagination button {
          padding: 9px 14px;
          background: #ffffff;
          color: var(--lc-green);
          font-weight: 600;
          border: 1px solid var(--lc-line);
          border-radius: 8px;
        }

        .lc-pagination button:hover:not(:disabled) {
          background: var(--lc-green-soft);
        }

        .lc-pagination button:disabled {
          cursor: default;
          opacity: 0.4;
        }

        @media (max-width: 1023px) {
          .lc-banner {
            padding: 40px 16px;
          }

          .lc-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
            padding-bottom: 132px;
            max-width: 100%;
          }

          .lc-sidebar {
            display: none;
          }

          .lc-mobile-trigger-wrap {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 72px;
            z-index: 40;
            display: flex;
            justify-content: center;
            pointer-events: none;
            padding: 0 16px;
          }

          .lc-mobile-pill-btn {
            pointer-events: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-width: 164px;
            height: 42px;
            padding: 0 22px;
            border: 1px solid rgba(197, 164, 107, 0.45);
            border-radius: 999px;
            background: var(--lc-green);
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.09em;
            text-transform: uppercase;
            box-shadow: 0 10px 24px rgba(20, 38, 30, 0.24);
          }

          .lc-mobile-drawer.is-open {
            position: fixed;
            inset: 0;
            z-index: 60;
            display: flex;
            flex-direction: column;
            background: #ffffff;
          }

          .lc-mobile-drawer-scroll {
            flex: 1;
            overflow-y: auto;
            padding: 20px 18px 136px;
          }

          .lc-mobile-close-bar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 72px;
            z-index: 65;
            display: flex;
            justify-content: center;
            pointer-events: none;
          }

          .lc-mobile-close-btn {
            pointer-events: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-width: 136px;
            height: 40px;
            padding: 0 22px;
            border: 0;
            border-radius: 999px;
            background: #141414;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.26);
          }

          .lc-product-image { height: 300px; }
        }

        @media (max-width: 900px) {
          .lc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
        }

        @media (max-width: 600px) {
          .lc-banner {
            padding: 32px 16px;
          }

          .lc-banner h1 {
            font-size: clamp(26px, 7vw, 36px);
          }

          .lc-banner p {
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.6;
            max-width: 100%;
            padding: 0;
          }

          .lc-layout { padding: 18px 16px 128px; max-width: 100%; }

          .lc-results-header {
            padding: 12px 14px;
            border-radius: 8px;
          }

          .lc-grid { gap: 16px; }

          .lc-product-image {
            height: clamp(180px, 50vw, 250px);
          }

          .lc-card-body { padding: 12px 11px 14px; }

          .lc-card h3 { font-size: 16px; }

          .lc-card-actions {
            flex-wrap: wrap;
            gap: 6px;
          }

          .lc-card-actions a { font-size: 11px; }
        }

        @media (max-width: 480px) {
          .lc-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .lc-banner {
            padding: 32px 16px;
          }

          .lc-layout {
            padding-left: 16px;
            padding-right: 16px;
          }

          .lc-mobile-pill-btn,
          .lc-mobile-close-btn {
            min-width: 0;
            max-width: calc(100vw - 32px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lc-card,
          .lc-option,
          .lc-sizes button,
          .lc-product-image img,
          .lc-dot {
            transition: none;
          }
        }
      `}</style>

      <Banner key={filters.gender} gender={filters.gender} />

      <div className="lc-layout">
        <aside className="lc-sidebar" aria-label="Collection filters">
          <div className="lc-sidebar-inner">
            <Filters
              filters={filters}
              onChange={updateFilters}
              onClearAll={handleClearAll}
              suffix="desktop"
            />
          </div>
        </aside>

        <div className="lc-mobile-trigger-wrap">
          <button
            type="button"
            className="lc-mobile-pill-btn"
            aria-expanded={mobileFilterOpen}
            onClick={() => setMobileFilterOpen(true)}
          >
            <span aria-hidden="true">▼</span>
            <span>FILTERS</span>
          </button>
        </div>

        <div
          className={`lc-mobile-drawer ${mobileFilterOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile collection filters"
        >
          <div className="lc-mobile-drawer-scroll">
            <Filters
              filters={filters}
              onChange={updateFilters}
              onClearAll={handleClearAll}
              suffix="mobile"
              onSearchSubmit={handleMobileSearchSubmit}
            />
          </div>

          <div className="lc-mobile-close-bar">
            <button
              type="button"
              className="lc-mobile-close-btn"
              onClick={() => setMobileFilterOpen(false)}
            >
              <span>✕</span>
              <span>CLOSE</span>
            </button>
          </div>
        </div>

        <section
          ref={resultsRef}
          className="lc-results"
          aria-labelledby="styles-heading"
        >
          <div className="lc-results-header">
            <h2 id="styles-heading">{categoryLabel}</h2>
            <p aria-live="polite">
              {catalogStatus === 'loading'
                ? 'Updating catalogue…'
                : filteredProducts.length
                  ? `${start + 1}–${start + visibleProducts.length} of ${filteredProducts.length} styles`
                  : '0 styles'}
            </p>
          </div>

          {visibleProducts.length ? (
            <div className="lc-grid">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  size={filters.size}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="lc-empty">
              <p>No styles match these filters.</p>
              <button
                type="button"
                className="lc-clear"
                onClick={handleClearAll}
              >
                Clear all filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="lc-pagination" aria-label="Collection pages">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => changePage(page + 1)}
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}