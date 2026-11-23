import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { label: 'T-Shirts', slug: 't-shirts' },
  { label: 'Tracksuits', slug: 'tracksuits' },
  { label: 'Hoodies & Jackets', slug: 'hoodies-jackets' },
  { label: 'Activewear', slug: 'activewear' },
  { label: 'Other', slug: 'other' },
];

const GENDER_MENUS = [
  {
    key: 'men',
    label: 'Men',
    baseHref: '/collections?gender=men',
    viewAllLabel: 'All Men Collection',
  },
  {
    key: 'women',
    label: 'Women',
    baseHref: '/collections?gender=women',
    viewAllLabel: 'All Women Collection',
  },
];

function buildCategoryHref(gender, slug) {
  const params = new URLSearchParams({ gender, category: slug });
  return `/collections?${params.toString()}`;
}

export default function Navbar({ currentPath = '/', onNavigate }) {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const mobileDetailsRef = useRef(null);

  useEffect(() => {
    function syncQuery() {
      const query = new URLSearchParams(window.location.search);
      setSelectedGender((query.get('gender') ?? '').toLowerCase());
      setSelectedCategory((query.get('category') ?? '').toLowerCase());
      setOpenMenu(null);
      if (mobileDetailsRef.current) {
        mobileDetailsRef.current.open = false;
      }
    }

    syncQuery();
    window.addEventListener('popstate', syncQuery);

    return () => {
      window.removeEventListener('popstate', syncQuery);
    };
  }, [currentPath]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        if (mobileDetailsRef.current) {
          mobileDetailsRef.current.open = false;
        }
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function handleLinkClick(event, href) {
    setOpenMenu(null);
    if (mobileDetailsRef.current) {
      mobileDetailsRef.current.open = false;
    }
    if (onNavigate) {
      event.preventDefault();
      onNavigate(href);
    }
  }

  const isHomeActive = currentPath === '/';
  const isAboutActive = currentPath === '/about';
  const isBlogActive = currentPath === '/blog';
  const isManufacturingActive = currentPath === '/manufacturing-wholesale';
  const isContactActive = currentPath === '/contact';

  return (
    <header className="relative z-20 border-b border-gold/25 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
        <a
          href="/"
          aria-label="LOMEKA Fashion home"
          aria-current={isHomeActive ? 'page' : undefined}
          onClick={(e) => handleLinkClick(e, '/')}
          className="inline-flex shrink-0 items-center justify-center"
        >
        <img
  src="/lomeka-logo.png"
  alt="LOMEKA Fashion"
  className="block h-14 w-auto max-w-[120px] object-contain md:h-[82px] md:w-[82px] md:max-w-none"
/>
        </a>

        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex lg:gap-7"
        >
          <a
            href="/"
            aria-current={isHomeActive ? 'page' : undefined}
            onClick={(e) => handleLinkClick(e, '/')}
            className={`border-b-2 py-2 font-body text-sm text-[#102d47] transition-colors ${
              isHomeActive
                ? 'border-[#c5a46b] font-semibold'
                : 'border-transparent font-medium hover:border-[#c5a46b]/60'
            }`}
          >
            Home
          </a>

          <a
            href="/about"
            aria-current={isAboutActive ? 'page' : undefined}
            onClick={(e) => handleLinkClick(e, '/about')}
            className={`border-b-2 py-2 font-body text-sm text-[#102d47] transition-colors ${
              isAboutActive
                ? 'border-[#c5a46b] font-semibold'
                : 'border-transparent font-medium hover:border-[#c5a46b]/60'
            }`}
          >
            About Us
          </a>

          {GENDER_MENUS.map((menu) => {
            const isMenuActive =
              currentPath === '/collections' && selectedGender === menu.key;
            const isOpen = openMenu === menu.key;

            return (
              <div
                key={menu.key}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu.key)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={() =>
                    setOpenMenu((prev) => (prev === menu.key ? null : menu.key))
                  }
                  className={`inline-flex items-center gap-1 border-b-2 py-2 font-body text-sm text-[#102d47] transition-colors ${
                    isMenuActive || isOpen
                      ? 'border-[#c5a46b] font-semibold'
                      : 'border-transparent font-medium hover:border-[#c5a46b]/60'
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full z-30 w-64 -translate-x-1/2 pt-1.5 transition-all duration-200 ease-out ${
                    isOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'pointer-events-none invisible -translate-y-1.5 opacity-0'
                  }`}
                >
                  <div
                    role="menu"
                    aria-label={`${menu.label} categories`}
                    className="rounded-xl border border-[#c5a46b]/35 bg-white p-3 shadow-xl"
                  >
                    <p className="px-2.5 pb-2 text-[10px] font-bold tracking-widest text-[#6b7872] uppercase">
                      CATEGORIES
                    </p>

                    <div className="space-y-0.5">
                      {CATEGORIES.map((category) => {
                        const isSelected =
                          isMenuActive && selectedCategory === category.slug;
                        const href = buildCategoryHref(menu.key, category.slug);

                        return (
                          <a
                            key={category.slug}
                            role="menuitem"
                            href={href}
                            onClick={(e) => handleLinkClick(e, href)}
                            className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs leading-5 tracking-wide uppercase transition-colors ${
                              isSelected
                                ? 'bg-[#f8f4ee] font-bold text-[#102d47]'
                                : 'font-medium text-[#102d47] hover:bg-[#f8f4ee]'
                            }`}
                          >
                            <span className="inline-flex items-center gap-2 text-inherit">
                              <span
                                aria-hidden="true"
                                className={`h-3.5 w-[2px] rounded-full transition-all ${
                                  isSelected
                                    ? 'bg-[#c5a46b] opacity-100'
                                    : 'bg-[#18432f] opacity-0 group-hover:opacity-100'
                                }`}
                              />
                              <span>{category.label}</span>
                            </span>
                            {isSelected && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#c5a46b]" />
                            )}
                          </a>
                        );
                      })}
                    </div>

                    <div className="mt-2 border-t border-[#c5a46b]/25 pt-2">
                      <a
                        role="menuitem"
                        href={menu.baseHref}
                        onClick={(e) => handleLinkClick(e, menu.baseHref)}
                        className="block rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#102d47] underline-offset-4 hover:bg-[#f8f4ee] hover:underline"
                      >
                        {menu.viewAllLabel} →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <a
            href="/manufacturing-wholesale"
            aria-current={isManufacturingActive ? 'page' : undefined}
            onClick={(e) => handleLinkClick(e, '/manufacturing-wholesale')}
            className={`border-b-2 py-2 font-body text-sm text-[#102d47] transition-colors ${
              isManufacturingActive
                ? 'border-[#c5a46b] font-semibold'
                : 'border-transparent font-medium hover:border-[#c5a46b]/60'
            }`}
          >
            Manufacturing & Wholesale
          </a>

          <a
            href="/blog"
            aria-current={isBlogActive ? 'page' : undefined}
            onClick={(e) => handleLinkClick(e, '/blog')}
            className={`border-b-2 py-2 font-body text-sm text-[#102d47] transition-colors ${
              isBlogActive
                ? 'border-[#c5a46b] font-semibold'
                : 'border-transparent font-medium hover:border-[#c5a46b]/60'
            }`}
          >
            Blog
          </a>

          <a
            href="/contact"
            aria-current={isContactActive ? 'page' : undefined}
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="inline-flex items-center justify-center rounded-sm bg-[#102d47] px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-[#102d47]/90"
          >
            Enquire
          </a>
        </nav>

        <details ref={mobileDetailsRef} className="md:hidden">
          <summary
  aria-label="Toggle menu"
  className="flex cursor-pointer list-none items-center justify-center rounded-sm p-2.5 text-[#102d47] hover:bg-[#f8f4ee] [&::-webkit-details-marker]:hidden"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</summary>

          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full z-30 space-y-3 border-b border-gold/25 bg-white px-5 py-4 shadow-md"
          >
            <a
              href="/"
              aria-current={isHomeActive ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, '/')}
              className="block rounded-sm px-2 py-2 font-body text-sm font-medium text-[#102d47] hover:bg-[#f8f4ee]"
            >
              Home
            </a>

            <a
              href="/about"
              aria-current={isAboutActive ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, '/about')}
              className="block rounded-sm px-2 py-2 font-body text-sm font-medium text-[#102d47] hover:bg-[#f8f4ee]"
            >
              About Us
            </a>

            {GENDER_MENUS.map((menu) => (
              <details
                key={menu.key}
                className="rounded-sm border border-gold/20 bg-[#fcfaf7] px-3 py-2"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-[#102d47]">
                  {menu.label} Categories
                </summary>
                <div className="mt-2 grid gap-1 border-t border-gold/15 pt-2">
                  {CATEGORIES.map((category) => {
                    const href = buildCategoryHref(menu.key, category.slug);
                    return (
                      <a
                        key={category.slug}
                        href={href}
                        onClick={(e) => handleLinkClick(e, href)}
                        className="rounded-sm px-2 py-1.5 text-xs font-medium text-[#102d47]/85 hover:bg-white"
                      >
                        {category.label}
                      </a>
                    );
                  })}
                  <a
                    href={menu.baseHref}
                    onClick={(e) => handleLinkClick(e, menu.baseHref)}
                    className="rounded-sm px-2 py-1.5 text-xs font-semibold text-[#102d47] underline"
                  >
                    {menu.viewAllLabel}
                  </a>
                </div>
              </details>
            ))}

            <a
              href="/manufacturing-wholesale"
              aria-current={isManufacturingActive ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, '/manufacturing-wholesale')}
              className="block rounded-sm px-2 py-2 font-body text-sm font-medium text-[#102d47] hover:bg-[#f8f4ee]"
            >
              Manufacturing & Wholesale
            </a>

            <a
              href="/blog"
              aria-current={isBlogActive ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, '/blog')}
              className="block rounded-sm px-2 py-2 font-body text-sm font-medium text-[#102d47] hover:bg-[#f8f4ee]"
            >
              Blog
            </a>

            <a
  href="/contact"
  aria-current={isContactActive ? 'page' : undefined}
  onClick={(e) => handleLinkClick(e, '/contact')}
  className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-[#c5a46b] px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-[#b5945b] md:hidden"
>
  Enquire Now
</a>
          </nav>
        </details>

        <a
          href="/contact"
          aria-current={isContactActive ? 'page' : undefined}
          onClick={(e) => handleLinkClick(e, '/contact')}
          className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-[#c5a46b] px-3.5 py-2 font-body text-xs font-semibold text-white transition-colors hover:bg-[#b5945b] md:hidden"
        >
          Enquire Now
        </a>
      </div>
    </header>
  );
}