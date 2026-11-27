// import { useEffect, useId, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const CATEGORIES = {
//   men: [
//     ['T-Shirts', 't-shirts'],
//     ['Polo T-Shirts', 'polo-t-shirts'],
//     ['Shirts', 'shirts'],
//     ['Lowers & Joggers', 'lowers-joggers'],
//     ['Shorts', 'shorts'],
//     ['Tracksuits', 'tracksuits'],
//     ['Hoodies', 'hoodies'],
//     ['Sweatshirts', 'sweatshirts'],
//     ['Jackets', 'jackets'],
//     ['Activewear', 'activewear'],
//     ['Co-ord Sets', 'co-ord-sets'],
//     ['Nightwear & Pyjamas', 'nightwear-pyjamas'],
//     ['Other', 'other'],
//   ],

//   women: [
//     ['T-Shirts & Tops', 't-shirts'],
//     ['Polo T-Shirts', 'polo-t-shirts'],
//     ['Shirts', 'shirts'],
//     ['Lowers & Joggers', 'lowers-joggers'],
//     ['Shorts', 'shorts'],
//     ['Tracksuits', 'tracksuits'],
//     ['Hoodies', 'hoodies'],
//     ['Sweatshirts', 'sweatshirts'],
//     ['Jackets', 'jackets'],
//     ['Activewear & Leggings', 'activewear'],
//     ['Co-ord Sets', 'co-ord-sets'],
//     ['Nightwear & Pyjamas', 'nightwear-pyjamas'],
//     ['Other', 'other'],
//   ],
// };

// const LINKS = [
//   ['Home', '/'],
//   ['About Us', '/about'],
//   ['Men', 'men'],
//   ['Women', 'women'],
//   ['Manufacturing & Wholesale', '/manufacturing-wholesale'],

// ];

// const styles = `
//   .ln-header {
//     position: relative;
//     z-index: 40;
//     background: #fff;
//     border-bottom: 1px solid #c5a46b33;
//     color: #104d3c;
//     font-family: var(--font-body, Arial, sans-serif);
//   }

//   .ln-header * {
//     box-sizing: border-box;
//   }

//   .ln-header a {
//     color: inherit;
//     text-decoration: none;
//   }

//   .ln-header button {
//     font: inherit;
//     cursor: pointer;
//   }

//   .ln-header :focus-visible {
//     outline: 2px solid #104d3c;
//     outline-offset: 4px;
//   }

//   .ln-bar {
//     height: 72px;
//     max-width: 1280px;
//     margin: auto;
//     padding: 0 20px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 16px;
//   }

//   .ln-brand {
//     display: inline-flex;
//     align-items: center;
//     flex-shrink: 0;
//   }

//   .ln-brand img {
//     display: block;
//     height: 60px;
//     width: 64px;
//     object-fit: contain;
//   }

//   .ln-desktop {
//     display: none;
//     align-items: center;
//     gap: 26px;
//     margin-left: auto;
//   }

//   .ln-link,
//   .ln-trigger {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     min-height: 44px;
//     padding: 8px 0;
//     border: 0;
//     border-bottom: 2px solid transparent;
//     background: none;
//     color: #104d3c;
//     white-space: nowrap;
//     font-size: 14px !important;
//     font-weight: 500;
//   }

//   .ln-link:hover,
//   .ln-trigger:hover,
//   .ln-link[aria-current="page"],
//   .ln-trigger[data-active="true"] {
//     border-bottom-color: #bd9459;
//   }

//   .ln-header .ln-cta {
//     display: inline-flex;
//     min-height: 44px;
//     align-items: center;
//     justify-content: center;
//     padding: 0 18px;
//     border: 1px solid #104d3c;
//     border-radius: 6px;
//     background: #104d3c;
//     color: white;
//     font-size: 13px;
//     font-weight: 600;
//     white-space: nowrap;
//     transition: background 0.15s;
//   }

//   .ln-header .ln-cta:hover {
//     background: #0a392d;
//   }

//   .ln-actions {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-left: auto;
//   }

//   .ln-icon {
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     width: 44px;
//     height: 44px;
//     flex-shrink: 0;
//     border: 1px solid #104d3c1a;
//     border-radius: 6px;
//     background: white;
//     color: #104d3c;
//   }

//   .ln-icon:hover {
//     background: #faf7f2;
//   }

//   .ln-group {
//     position: relative;
//   }

//   .ln-dropdown {
//     position: absolute;
//     top: 100%;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 500px;
//     padding-top: 8px;
//   }

//   .ln-dropdown-inner {
//     background: white;
//     border: 1px solid #c5a46b40;
//     border-radius: 12px;
//     padding: 12px;
//     box-shadow: 0 14px 35px #103c2f1a;
//     max-height: min(580px, calc(100dvh - 110px));
//     overflow-y: auto;
//     overscroll-behavior: contain;
//   }

//   .ln-eyebrow {
//     margin: 0;
//     padding: 6px 10px 10px;
//     font-size: 10px;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: #66756e;
//   }

//   .ln-category-grid {
//     display: grid;
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//     gap: 4px 8px;
//   }

//   .ln-mobile-categories .ln-category-grid {
//     grid-template-columns: minmax(0, 1fr);
//   }

//   .ln-category {
//     display: flex;
//     align-items: center;
//     min-height: 44px;
//     padding: 10px 12px;
//     border-radius: 6px;
//     font-size: 13px;
//     line-height: 1.5;
//   }

//   .ln-category:hover,
//   .ln-category[aria-current="page"] {
//     background: #f7f3ec;
//   }

//   .ln-category[aria-current="page"] {
//     font-weight: 700;
//   }

//   .ln-all {
//     margin-top: 6px;
//     border-top: 1px solid #c5a46b33;
//     border-radius: 0;
//     font-weight: 600;
//   }

//   .ln-drawer {
//     position: fixed;
//     inset: 0 0 0 auto;
//     margin: 0;
//     width: min(360px, 100%);
//     max-width: 100%;
//     height: 100dvh;
//     max-height: 100dvh;
//     padding: 0;
//     border: 0;
//     background: white;
//     color: #104d3c;
//     font: inherit;
//     box-shadow: -12px 0 45px #0002;
//   }

//   .ln-drawer::backdrop {
//     background: #092c2359;
//   }

//   .ln-drawer[open] {
//     display: flex;
//     flex-direction: column;
//   }

//   .ln-drawer-top {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     min-height: 72px;
//     padding: 0 20px;
//     border-bottom: 1px solid #c5a46b33;
//     flex-shrink: 0;
//   }

//   .ln-drawer-title {
//     font-size: 17px;
//     font-weight: 600;
//     margin: 0;
//   }

//   .ln-drawer-nav {
//     padding: 14px 20px 24px;
//     overflow-y: auto;
//     overscroll-behavior: contain;
//     flex: 1;
//     min-height: 0;
//   }

//   .ln-mobile-link,
//   .ln-accordion > summary {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 12px;
//     min-height: 52px;
//     padding: 12px 8px;
//     border-bottom: 1px solid #c5a46b26;
//     font-size: 15px;
//     font-weight: 500;
//     line-height: 1.5;
//     cursor: pointer;
//     list-style: none;
//   }

//   .ln-accordion > summary::-webkit-details-marker {
//     display: none;
//   }

//   .ln-accordion[open] > summary svg {
//     transform: rotate(180deg);
//   }

//   .ln-mobile-link[aria-current="page"],
//   .ln-accordion[data-active="true"] > summary {
//     color: #104d3c;
//     font-weight: 700;
//     background: #faf7f2;
//   }

//   .ln-mobile-categories {
//     padding: 6px 0 8px 10px;
//   }

//   .ln-drawer-nav > .ln-cta {
//     display: flex;
//     margin-top: 24px;
//     width: 100%;
//   }

//   @media (min-width: 640px) {
//     .ln-bar {
//       padding: 0 32px;
//     }

//     .ln-actions {
//       gap: 14px;
//     }

//     .ln-brand img {
//       height: 64px;
//       width: 72px;
//     }
//   }

//   @media (min-width: 1280px) {
//     .ln-bar {
//       height: 80px;
//     }

//     .ln-brand img {
//       height: 70px;
//       width: 80px;
//     }

//     .ln-desktop {
//       display: flex;
//     }

//     .ln-actions {
//       display: none;
//     }
//   }
// `;

// function Icon({ type }) {
//   const iconPath =
//     type === 'close'
//       ? 'M6 6l12 12M6 18L18 6'
//       : type === 'chevron'
//         ? 'm6 9 6 6 6-6'
//         : 'M4 6h16M4 12h16M4 18h16';

//   return (
//     <svg
//       width={type === 'chevron' ? 16 : 22}
//       height={type === 'chevron' ? 16 : 22}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d={iconPath} />
//     </svg>
//   );
// }

// export default function Navbar() {
//   const id = useId();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [query, setQuery] = useState({
//     gender: '',
//     category: '',
//   });

//   const [openMenu, setOpenMenu] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const navRef = useRef(null);
//   const dialogRef = useRef(null);
//   const toggleRef = useRef(null);

//   const path =
//     location.pathname.replace(/\/+$/, '') || '/';

//   function closeDrawer() {
//     dialogRef.current?.close();
//     setDrawerOpen(false);
//   }

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     setQuery({
//       gender: (params.get('gender') || '').toLowerCase(),
//       category: (params.get('category') || '').toLowerCase(),
//     });

//     setOpenMenu(null);
//     closeDrawer();
//   }, [location.pathname, location.search]);

//   useEffect(() => {
//     function outside(event) {
//       if (!navRef.current?.contains(event.target)) {
//         setOpenMenu(null);
//       }
//     }

//     function escape(event) {
//       if (event.key === 'Escape' && openMenu) {
//         navRef.current
//           ?.querySelector(`[data-gender="${openMenu}"]`)
//           ?.focus();

//         setOpenMenu(null);
//       }
//     }

//     document.addEventListener('pointerdown', outside);
//     document.addEventListener('keydown', escape);

//     return () => {
//       document.removeEventListener('pointerdown', outside);
//       document.removeEventListener('keydown', escape);
//     };
//   }, [openMenu]);

//   useEffect(() => {
//     const desktop = window.matchMedia('(min-width: 1280px)');

//     function resize() {
//       setOpenMenu(null);

//       if (desktop.matches) {
//         closeDrawer();
//       }
//     }

//     desktop.addEventListener('change', resize);

//     return () => {
//       desktop.removeEventListener('change', resize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!drawerOpen) return;

//     const previous = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';

//     return () => {
//       document.body.style.overflow = previous;
//     };
//   }, [drawerOpen]);

//   function handleNavigate(event, href) {
//     if (
//       event.defaultPrevented ||
//       event.button !== 0 ||
//       event.metaKey ||
//       event.ctrlKey ||
//       event.shiftKey ||
//       event.altKey
//     ) {
//       return;
//     }

//     event.preventDefault();
//     setOpenMenu(null);
//     closeDrawer();

//     const url = new URL(href, window.location.origin);

//     setQuery({
//       gender: url.searchParams.get('gender') || '',
//       category: url.searchParams.get('category') || '',
//     });

//     navigate(`${url.pathname}${url.search}${url.hash}`);
//   }

//   function renderLink(label, href, className) {
//     return (
//       <a
//         key={href}
//         href={href}
//         className={className}
//         aria-current={path === href ? 'page' : undefined}
//         onClick={(event) => handleNavigate(event, href)}
//       >
//         {label}
//       </a>
//     );
//   }

//   function renderCategories(gender) {
//     return (
//       <>
//         <div className="ln-category-grid">
//           {(CATEGORIES[gender] || []).map(([label, slug]) => {
//             const href =
//               `/collections?gender=${gender}&category=${slug}`;

//             const isActive =
//               path === '/collections' &&
//               query.gender === gender &&
//               query.category === slug;

//             return (
//               <a
//                 key={slug}
//                 href={href}
//                 className="ln-category"
//                 aria-current={isActive ? 'page' : undefined}
//                 onClick={(event) => handleNavigate(event, href)}
//               >
//                 {label}
//               </a>
//             );
//           })}
//         </div>

//         <a
//           className="ln-category ln-all"
//           href={`/collections?gender=${gender}`}
//           onClick={(event) =>
//             handleNavigate(event, `/collections?gender=${gender}`)
//           }
//         >
//           All {gender === 'men' ? 'Men’s' : 'Women’s'} Collection →
//         </a>
//       </>
//     );
//   }

//   return (
//     <header className="ln-header">
//       <style>{styles}</style>

//       <div className="ln-bar">
//         <a
//           className="ln-brand"
//           href="/"
//           aria-label="LOMEKA Fashion home"
//           onClick={(event) => handleNavigate(event, '/')}
//         >
//           <img
//             src="/logo.png"
//             alt="LOMEKA Fashion"
//             width="80"
//             height="70"
//           />
//         </a>

//         {/* Desktop navigation */}
//         <nav
//           ref={navRef}
//           className="ln-desktop"
//           aria-label="Main navigation"
//           onBlur={(event) => {
//             if (
//               !event.currentTarget.contains(event.relatedTarget)
//             ) {
//               setOpenMenu(null);
//             }
//           }}
//         >
//           {LINKS.map(([label, href]) => {
//             if (href.startsWith('/')) {
//               return renderLink(label, href, 'ln-link');
//             }

//             const active =
//               path === '/collections' && query.gender === href;

//             return (
//               <div
//                 key={href}
//                 className="ln-group"
//                 onPointerEnter={(event) => {
//                   if (event.pointerType === 'mouse') {
//                     setOpenMenu(href);
//                   }
//                 }}
//                 onPointerLeave={(event) => {
//                   if (
//                     event.pointerType === 'mouse' &&
//                     !event.currentTarget.contains(
//                       document.activeElement,
//                     )
//                   ) {
//                     setOpenMenu(null);
//                   }
//                 }}
//               >
//                 <button
//                   type="button"
//                   className="ln-trigger"
//                   data-gender={href}
//                   data-active={active || openMenu === href}
//                   aria-expanded={openMenu === href}
//                   aria-controls={`${id}-${href}`}
//                   onClick={() => setOpenMenu(href)}
//                 >
//                   {label}
//                   <Icon type="chevron" />
//                 </button>

//                 <div
//                   id={`${id}-${href}`}
//                   className="ln-dropdown"
//                   hidden={openMenu !== href}
//                 >
//                   <div className="ln-dropdown-inner">
//                     <p className="ln-eyebrow">
//                       {label} · Categories
//                     </p>

//                     {renderCategories(href)}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {renderLink('Enquire', '/contact', 'ln-cta')}
//         </nav>

//         {/* Mobile and tablet actions */}
//         <div className="ln-actions">
//           {renderLink('Enquire', '/contact', 'ln-cta')}

//           <button
//             ref={toggleRef}
//             type="button"
//             className="ln-icon"
//             aria-label="Open navigation menu"
//             aria-expanded={drawerOpen}
//             aria-controls={`${id}-drawer`}
//             onClick={() => {
//               setOpenMenu(null);
//               dialogRef.current?.showModal();
//               setDrawerOpen(true);
//             }}
//           >
//             <Icon type="menu" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile and tablet drawer */}
//       <dialog
//         ref={dialogRef}
//         id={`${id}-drawer`}
//         className="ln-drawer"
//         aria-labelledby={`${id}-title`}
//         onClose={() => {
//           setDrawerOpen(false);
//           toggleRef.current?.focus();
//         }}
//         onClick={(event) => {
//           if (event.target !== event.currentTarget) return;

//           const rect =
//             event.currentTarget.getBoundingClientRect();

//           const clickedOutside =
//             event.clientX < rect.left ||
//             event.clientX > rect.right ||
//             event.clientY < rect.top ||
//             event.clientY > rect.bottom;

//           if (clickedOutside) {
//             closeDrawer();
//           }
//         }}
//       >
//         <div className="ln-drawer-top">
//           <h2
//             id={`${id}-title`}
//             className="ln-drawer-title"
//           >
//             Explore LOMEKA
//           </h2>

//           <button
//             type="button"
//             className="ln-icon"
//             aria-label="Close navigation menu"
//             onClick={closeDrawer}
//           >
//             <Icon type="close" />
//           </button>
//         </div>

//         <nav
//           className="ln-drawer-nav"
//           aria-label="Mobile and tablet navigation"
//         >
//           {LINKS.map(([label, href]) =>
//             href.startsWith('/') ? (
//               renderLink(label, href, 'ln-mobile-link')
//             ) : (
//               <details
//                 key={href}
//                 className="ln-accordion"
//                 data-active={
//                   path === '/collections' &&
//                   query.gender === href
//                 }
//               >
//                 <summary>
//                   {label}
//                   <Icon type="chevron" />
//                 </summary>

//                 <div className="ln-mobile-categories">
//                   {renderCategories(href)}
//                 </div>
//               </details>
//             ),
//           )}

//           {renderLink(
//             'Request a Wholesale Quote',
//             '/contact',
//             'ln-cta',
//           )}
//         </nav>
//       </dialog>
//     </header>
//   );
// }

import { useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CATEGORIES = {
  men: [
    ['T-Shirts', 't-shirts'],
    ['Polo T-Shirts', 'polo-t-shirts'],
    ['Shirts', 'shirts'],
    ['Lowers & Joggers', 'lowers-joggers'],
    ['Shorts', 'shorts'],
    ['Tracksuits', 'tracksuits'],
    ['Hoodies', 'hoodies'],
    ['Sweatshirts', 'sweatshirts'],
    ['Jackets', 'jackets'],
    ['Activewear', 'activewear'],
    ['Co-ord Sets', 'co-ord-sets'],
    ['Nightwear & Pyjamas', 'nightwear-pyjamas'],
    ['Other', 'other'],
  ],

  women: [
    ['T-Shirts & Tops', 't-shirts'],
    ['Polo T-Shirts', 'polo-t-shirts'],
    ['Shirts', 'shirts'],
    ['Lowers & Joggers', 'lowers-joggers'],
    ['Shorts', 'shorts'],
    ['Tracksuits', 'tracksuits'],
    ['Hoodies', 'hoodies'],
    ['Sweatshirts', 'sweatshirts'],
    ['Jackets', 'jackets'],
    ['Activewear & Leggings', 'activewear'],
    ['Co-ord Sets', 'co-ord-sets'],
    ['Nightwear & Pyjamas', 'nightwear-pyjamas'],
    ['Other', 'other'],
  ],
};

const LINKS = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Men', 'men'],
  ['Women', 'women'],
  ['Manufacturing & Wholesale', '/manufacturing-wholesale'],
];

const styles = `
  .ln-header {
    position: relative;
    z-index: 40;
    background: #fff;
    border-bottom: 1px solid #9b6bc733;
    color: #3b185f;
    font-family: var(--font-body, Arial, sans-serif);
  }

  .ln-header * {
    box-sizing: border-box;
  }

  .ln-header a {
    color: inherit;
    text-decoration: none;
  }

  .ln-header button {
    font: inherit;
    cursor: pointer;
  }

  .ln-header :focus-visible {
    outline: 2px solid #3b185f;
    outline-offset: 4px;
  }

  .ln-bar {
    height: 72px;
    max-width: 1280px;
    margin: auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .ln-brand {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  .ln-brand img {
    display: block;
    height: 60px;
    width: 64px;
    object-fit: contain;
  }

  .ln-desktop {
    display: none;
    align-items: center;
    gap: 26px;
    margin-left: auto;
  }

  .ln-link,
  .ln-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    padding: 8px 0;
    border: 0;
    border-bottom: 2px solid transparent;
    background: none;
    color: #3b185f;
    white-space: nowrap;
    font-size: 14px !important;
    font-weight: 500;
  }

  .ln-link:hover,
  .ln-trigger:hover,
  .ln-link[aria-current="page"],
  .ln-trigger[data-active="true"] {
    border-bottom-color: #9b6bc7;
  }

  .ln-header .ln-cta {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    border: 1px solid #3b185f;
    border-radius: 6px;
    background: #3b185f;
    color: white;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    transition: background 0.15s;
  }

  .ln-header .ln-cta:hover {
    background: #2b1047;
  }

  .ln-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }

  .ln-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border: 1px solid #3b185f1a;
    border-radius: 6px;
    background: white;
    color: #3b185f;
  }

  .ln-icon:hover {
    background: #faf7fd;
  }

  .ln-group {
    position: relative;
  }

  .ln-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    padding-top: 8px;
  }

  .ln-dropdown-inner {
    background: white;
    border: 1px solid #9b6bc740;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 14px 35px #3b185f1a;
    max-height: min(580px, calc(100dvh - 110px));
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .ln-eyebrow {
    margin: 0;
    padding: 6px 10px 10px;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #675878;
  }

  .ln-category-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px 8px;
  }

  .ln-mobile-categories .ln-category-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .ln-category {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.5;
  }

  .ln-category:hover,
  .ln-category[aria-current="page"] {
    background: #f5effb;
  }

  .ln-category[aria-current="page"] {
    font-weight: 700;
  }

  .ln-all {
    margin-top: 6px;
    border-top: 1px solid #9b6bc733;
    border-radius: 0;
    font-weight: 600;
  }

  .ln-drawer {
    position: fixed;
    inset: 0 0 0 auto;
    margin: 0;
    width: min(360px, 100%);
    max-width: 100%;
    height: 100dvh;
    max-height: 100dvh;
    padding: 0;
    border: 0;
    background: white;
    color: #3b185f;
    font: inherit;
    box-shadow: -12px 0 45px #0002;
  }

  .ln-drawer::backdrop {
    background: #230d3a59;
  }

  .ln-drawer[open] {
    display: flex;
    flex-direction: column;
  }

  .ln-drawer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    padding: 0 20px;
    border-bottom: 1px solid #9b6bc733;
    flex-shrink: 0;
  }

  .ln-drawer-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
  }

  .ln-drawer-nav {
    padding: 14px 20px 24px;
    overflow-y: auto;
    overscroll-behavior: contain;
    flex: 1;
    min-height: 0;
  }

  .ln-mobile-link,
  .ln-accordion > summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 52px;
    padding: 12px 8px;
    border-bottom: 1px solid #9b6bc726;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    cursor: pointer;
    list-style: none;
  }

  .ln-accordion > summary::-webkit-details-marker {
    display: none;
  }

  .ln-accordion[open] > summary svg {
    transform: rotate(180deg);
  }

  .ln-mobile-link[aria-current="page"],
  .ln-accordion[data-active="true"] > summary {
    color: #3b185f;
    font-weight: 700;
    background: #faf7fd;
  }

  .ln-mobile-categories {
    padding: 6px 0 8px 10px;
  }

  .ln-drawer-nav > .ln-cta {
    display: flex;
    margin-top: 24px;
    width: 100%;
  }

  @media (min-width: 640px) {
    .ln-bar {
      padding: 0 32px;
    }

    .ln-actions {
      gap: 14px;
    }

    .ln-brand img {
      height: 64px;
      width: 72px;
    }
  }

  @media (min-width: 1280px) {
    .ln-bar {
      height: 80px;
    }

    .ln-brand img {
      height: 70px;
      width: 80px;
    }

    .ln-desktop {
      display: flex;
    }

    .ln-actions {
      display: none;
    }
  }
`;

function Icon({ type }) {
  const iconPath =
    type === 'close'
      ? 'M6 6l12 12M6 18L18 6'
      : type === 'chevron'
        ? 'm6 9 6 6 6-6'
        : 'M4 6h16M4 12h16M4 18h16';

  return (
    <svg
      width={type === 'chevron' ? 16 : 22}
      height={type === 'chevron' ? 16 : 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPath} />
    </svg>
  );
}

export default function Navbar() {
  const id = useId();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState({
    gender: '',
    category: '',
  });

  const [openMenu, setOpenMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navRef = useRef(null);
  const dialogRef = useRef(null);
  const toggleRef = useRef(null);

  const path =
    location.pathname.replace(/\/+$/, '') || '/';

  function closeDrawer() {
    dialogRef.current?.close();
    setDrawerOpen(false);
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setQuery({
      gender: (params.get('gender') || '').toLowerCase(),
      category: (params.get('category') || '').toLowerCase(),
    });

    setOpenMenu(null);
    closeDrawer();
  }, [location.pathname, location.search]);

  useEffect(() => {
    function outside(event) {
      if (!navRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    function escape(event) {
      if (event.key === 'Escape' && openMenu) {
        navRef.current
          ?.querySelector(`[data-gender="${openMenu}"]`)
          ?.focus();

        setOpenMenu(null);
      }
    }

    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);

    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [openMenu]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');

    function resize() {
      setOpenMenu(null);

      if (desktop.matches) {
        closeDrawer();
      }
    }

    desktop.addEventListener('change', resize);

    return () => {
      desktop.removeEventListener('change', resize);
    };
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  function handleNavigate(event, href) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setOpenMenu(null);
    closeDrawer();

    const url = new URL(href, window.location.origin);

    setQuery({
      gender: url.searchParams.get('gender') || '',
      category: url.searchParams.get('category') || '',
    });

    navigate(`${url.pathname}${url.search}${url.hash}`);
  }

  function renderLink(label, href, className) {
    return (
      <a
        key={href}
        href={href}
        className={className}
        aria-current={path === href ? 'page' : undefined}
        onClick={(event) => handleNavigate(event, href)}
      >
        {label}
      </a>
    );
  }

  function renderCategories(gender) {
    return (
      <>
        <div className="ln-category-grid">
          {(CATEGORIES[gender] || []).map(([label, slug]) => {
            const href =
              `/collections?gender=${gender}&category=${slug}`;

            const isActive =
              path === '/collections' &&
              query.gender === gender &&
              query.category === slug;

            return (
              <a
                key={slug}
                href={href}
                className="ln-category"
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => handleNavigate(event, href)}
              >
                {label}
              </a>
            );
          })}
        </div>

        <a
          className="ln-category ln-all"
          href={`/collections?gender=${gender}`}
          onClick={(event) =>
            handleNavigate(event, `/collections?gender=${gender}`)
          }
        >
          All {gender === 'men' ? 'Men’s' : 'Women’s'} Collection →
        </a>
      </>
    );
  }

  return (
    <header className="ln-header">
      <style>{styles}</style>

      <div className="ln-bar">
        <a
          className="ln-brand"
          href="/"
          aria-label="LOMEKA Fashion home"
          onClick={(event) => handleNavigate(event, '/')}
        >
          <img
            src="/logo.png"
            alt="LOMEKA Fashion"
            width="80"
            height="70"
          />
        </a>

        {/* Desktop navigation */}
        <nav
          ref={navRef}
          className="ln-desktop"
          aria-label="Main navigation"
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              setOpenMenu(null);
            }
          }}
        >
          {LINKS.map(([label, href]) => {
            if (href.startsWith('/')) {
              return renderLink(label, href, 'ln-link');
            }

            const active =
              path === '/collections' && query.gender === href;

            return (
              <div
                key={href}
                className="ln-group"
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') {
                    setOpenMenu(href);
                  }
                }}
                onPointerLeave={(event) => {
                  if (
                    event.pointerType === 'mouse' &&
                    !event.currentTarget.contains(
                      document.activeElement,
                    )
                  ) {
                    setOpenMenu(null);
                  }
                }}
              >
                <button
                  type="button"
                  className="ln-trigger"
                  data-gender={href}
                  data-active={active || openMenu === href}
                  aria-expanded={openMenu === href}
                  aria-controls={`${id}-${href}`}
                  onClick={() => setOpenMenu(href)}
                >
                  {label}
                  <Icon type="chevron" />
                </button>

                <div
                  id={`${id}-${href}`}
                  className="ln-dropdown"
                  hidden={openMenu !== href}
                >
                  <div className="ln-dropdown-inner">
                    <p className="ln-eyebrow">
                      {label} · Categories
                    </p>

                    {renderCategories(href)}
                  </div>
                </div>
              </div>
            );
          })}

          {renderLink('Enquire', '/contact', 'ln-cta')}
        </nav>

        {/* Mobile and tablet actions */}
        <div className="ln-actions">
          {renderLink('Enquire', '/contact', 'ln-cta')}

          <button
            ref={toggleRef}
            type="button"
            className="ln-icon"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls={`${id}-drawer`}
            onClick={() => {
              setOpenMenu(null);
              dialogRef.current?.showModal();
              setDrawerOpen(true);
            }}
          >
            <Icon type="menu" />
          </button>
        </div>
      </div>

      {/* Mobile and tablet drawer */}
      <dialog
        ref={dialogRef}
        id={`${id}-drawer`}
        className="ln-drawer"
        aria-labelledby={`${id}-title`}
        onClose={() => {
          setDrawerOpen(false);
          toggleRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;

          const rect =
            event.currentTarget.getBoundingClientRect();

          const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

          if (clickedOutside) {
            closeDrawer();
          }
        }}
      >
        <div className="ln-drawer-top">
          <h2
            id={`${id}-title`}
            className="ln-drawer-title"
          >
            Explore LOMEKA
          </h2>

          <button
            type="button"
            className="ln-icon"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
          >
            <Icon type="close" />
          </button>
        </div>

        <nav
          className="ln-drawer-nav"
          aria-label="Mobile and tablet navigation"
        >
          {LINKS.map(([label, href]) =>
            href.startsWith('/') ? (
              renderLink(label, href, 'ln-mobile-link')
            ) : (
              <details
                key={href}
                className="ln-accordion"
                data-active={
                  path === '/collections' &&
                  query.gender === href
                }
              >
                <summary>
                  {label}
                  <Icon type="chevron" />
                </summary>

                <div className="ln-mobile-categories">
                  {renderCategories(href)}
                </div>
              </details>
            ),
          )}

          {renderLink(
            'Request a Wholesale Quote',
            '/contact',
            'ln-cta',
          )}
        </nav>
      </dialog>
    </header>
  );
}