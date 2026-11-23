import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import AdminConsole from '../Admin/AdminConsole.jsx';
import FloatingContactButtons from './components/FloatingContactButtons';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Collections from './pages/Collections.jsx';
import Contact from './pages/Contact.jsx';

const manufacturingFiles = import.meta.glob(
  './pages/ManufacturingWholesale.jsx',
  { eager: true },
);

function ManufacturingFallback() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-4xl tracking-tight sm:text-6xl">
        Manufacturing & Wholesale
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        For a bulk apparel quote, share the garment type, quantity and delivery
        city and country.
      </p>
      <div className="mt-6">
        <WhatsAppButton />
      </div>
    </section>
  );
}

const ManufacturingWholesale =
  manufacturingFiles['./pages/ManufacturingWholesale.jsx']?.default ??
  ManufacturingFallback;

export const pages = {
  '/': {
    Component: Home,
    title: 'LOMEKA Fashion | Apparel Manufacturing & Wholesale',
    description:
      'Explore LOMEKA Fashion’s men’s and women’s apparel and enquire about bulk orders.',
  },
  '/about': {
    Component: About,
    title: 'About LOMEKA Fashion | Apparel Manufacturing',
    description:
      'Learn about LOMEKA Fashion’s men’s and women’s apparel manufacturing and wholesale business.',
  },
  '/collections': {
    Component: Collections,
    title: 'Men’s & Women’s Apparel Collections | LOMEKA Fashion',
    description:
      'Browse men’s and women’s wear from LOMEKA Fashion and enquire about specific garments and bulk availability.',
  },
  '/manufacturing-wholesale': {
    Component: ManufacturingWholesale,
    title: 'Manufacturing & Wholesale | LOMEKA Fashion',
    description:
      'Find out how to request a wholesale quote from LOMEKA Fashion for men’s and women’s apparel.',
  },
  '/contact': {
    Component: Contact,
    title: 'Contact & Wholesale Enquiries | LOMEKA Fashion',
    description:
      'Contact LOMEKA Fashion for bulk apparel orders. Share the garment type, quantity and delivery location to request a quote.',
  },
};

export function normalizePath(path) {
  return path.replace(/\/+$/, '') || '/';
}

function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <h1 className="text-4xl sm:text-6xl">Page not found</h1>
      <a
        href="/"
        className="mt-6 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white"
      >
        Back to Home
      </a>
    </section>
  );
}

export default function App({ path } = {}) {
  const [browserPath, setBrowserPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    function handlePopState() {
      setBrowserPath(window.location.pathname);
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigate(nextPath) {
    if (typeof window === 'undefined') return;
    const normalized = normalizePath(nextPath);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setBrowserPath(normalized);
  }

  const currentPath = normalizePath(path ?? browserPath);
  const isAdminPage =
    currentPath === '/admin' ||
    currentPath === '/admin/login' ||
    currentPath.startsWith('/admin/');

  const page = Object.hasOwn(pages, currentPath) ? pages[currentPath] : null;
  const Page = page?.Component ?? NotFound;

  useEffect(() => {
    document.title = isAdminPage
      ? 'Admin | LOMEKA Fashion'
      : page?.title ?? 'Page Not Found | LOMEKA Fashion';

    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute(
      'content',
      isAdminPage ? '' : page?.description ?? '',
    );

    const sectionId = window.location.hash.slice(1);
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView();
    }
  }, [page, isAdminPage]);

  if (isAdminPage) {
    return <AdminConsole currentPath={currentPath} onNavigate={navigate} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-navy">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <Navbar currentPath={currentPath} />

      <main id="main-content" className="flex-1">
        <Page />
  <FloatingContactButtons />
      </main>

      <Footer />
    </div>
  );
}