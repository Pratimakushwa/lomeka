// import { useEffect } from 'react';
// import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
// import Footer from './components/Footer.jsx';
// import FloatingContactButtons from './components/FloatingContactButtons';
// import AdminConsole from '../Admin/AdminConsole.jsx';

// import Home from './pages/Home.jsx';
// import About from './pages/About.jsx';
// import Collections from './pages/Collections.jsx';
// import Contact from './pages/Contact.jsx';
// import ManufacturingWholesale from './pages/ManufacturingWholesale.jsx';

// const pageMeta = {
//   '/': {
//     title: 'LOMEKA Fashion | Apparel Manufacturing & Wholesale',
//     description:
//       'Explore LOMEKA Fashion’s men’s and women’s apparel and enquire about bulk orders.',
//   },
//   '/about': {
//     title: 'About LOMEKA Fashion | Apparel Manufacturing',
//     description:
//       'Learn about LOMEKA Fashion’s men’s and women’s apparel manufacturing and wholesale business.',
//   },
//   '/collections': {
//     title: 'Men’s & Women’s Apparel Collections | LOMEKA Fashion',
//     description:
//       'Browse men’s and women’s wear from LOMEKA Fashion and enquire about specific garments and bulk availability.',
//   },
//   '/manufacturing-wholesale': {
//     title: 'Manufacturing & Wholesale | LOMEKA Fashion',
//     description:
//       'Find out how to request a wholesale quote from LOMEKA Fashion for men’s and women’s apparel.',
//   },
//   '/contact': {
//     title: 'Contact & Wholesale Enquiries | LOMEKA Fashion',
//     description:
//       'Contact LOMEKA Fashion for bulk apparel orders. Share the garment type, quantity and delivery location to request a quote.',
//   },
// };

// function NotFound() {
//   return (
//     <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
//       <h1 className="text-4xl sm:text-6xl">Page not found</h1>
//       <Link
//         to="/"
//         className="mt-6 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white"
//       >
//         Back to Home
//       </Link>
//     </section>
//   );
// }

// function PublicLayout() {
//   return (
//     <div className="flex min-h-screen flex-col bg-ivory text-navy">
//       <a
//         href="#main-content"
//         className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:px-4 focus:py-2"
//       >
//         Skip to content
//       </a>

//       <Navbar />

//       <main id="main-content" className="page-shell flex-1">
//         <Outlet />
//         <FloatingContactButtons />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// function DocumentMeta() {
//   const { pathname } = useLocation();
//   const isAdminPage =
//     pathname === '/admin' || pathname.startsWith('/admin/');
//   const meta = pageMeta[pathname];

//   useEffect(() => {
//     document.title = isAdminPage
//       ? 'Admin | LOMEKA Fashion'
//       : meta?.title ?? 'Page Not Found | LOMEKA Fashion';

//     const descriptionTag = document.querySelector('meta[name="description"]');
//     descriptionTag?.setAttribute(
//       'content',
//       isAdminPage ? '' : meta?.description ?? '',
//     );

//     const sectionId = window.location.hash.slice(1);
//     if (sectionId) {
//       document.getElementById(sectionId)?.scrollIntoView();
//     }
//   }, [pathname, isAdminPage, meta]);

//   return null;
// }

// export default function App() {
//   return (
//     <>
//       <DocumentMeta />
//       <Routes>
//         <Route path="/admin/*" element={<AdminConsole />} />
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/collections" element={<Collections />} />
//           <Route
//             path="/manufacturing-wholesale"
//             element={<ManufacturingWholesale />}
//           />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }
import { useEffect } from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingContactButtons from './components/FloatingContactButtons';
import AdminConsole from '../Admin/AdminConsole.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Collections from './pages/Collections.jsx';
import Contact from './pages/Contact.jsx';
import ManufacturingWholesale from './pages/ManufacturingWholesale.jsx';

const pageMeta = {
  '/': {
    title: 'LOMEKA Fashion | Apparel Manufacturing & Wholesale',
    description:
      'Explore LOMEKA Fashion’s men’s and women’s apparel and enquire about bulk orders.',
  },
  '/about': {
    title: 'About LOMEKA Fashion | Apparel Manufacturing',
    description:
      'Learn about LOMEKA Fashion’s men’s and women’s apparel manufacturing and wholesale business.',
  },
  '/collections': {
    title: 'Men’s & Women’s Apparel Collections | LOMEKA Fashion',
    description:
      'Browse men’s and women’s wear from LOMEKA Fashion and enquire about specific garments and bulk availability.',
  },
  '/manufacturing-wholesale': {
    title: 'Manufacturing & Wholesale | LOMEKA Fashion',
    description:
      'Find out how to request a wholesale quote from LOMEKA Fashion for men’s and women’s apparel.',
  },
  '/contact': {
    title: 'Contact & Wholesale Enquiries | LOMEKA Fashion',
    description:
      'Contact LOMEKA Fashion for bulk apparel orders. Share the garment type, quantity and delivery location to request a quote.',
  },
};

function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <h1 className="text-4xl sm:text-6xl">Page not found</h1>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-navy">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="page-shell flex-1">
        <Outlet />
        <FloatingContactButtons />
      </main>

      <Footer />
    </div>
  );
}

function DocumentMeta() {
  const { pathname, hash } = useLocation();
  const isAdminPage =
    pathname === '/admin' || pathname.startsWith('/admin/');
  const meta = pageMeta[pathname];

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    document.title = isAdminPage
      ? 'Admin | LOMEKA Fashion'
      : meta?.title ?? 'Page Not Found | LOMEKA Fashion';

    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute(
      'content',
      isAdminPage ? '' : meta?.description ?? '',
    );

    const sectionId = hash.slice(1);
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView();
      return;
    }

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    html.scrollTop = 0;

    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.scrollBehavior = prevScrollBehavior;
    });

    return () => {
      cancelAnimationFrame(rafId);
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, [pathname, hash, isAdminPage, meta]);

  return null;
}

export default function App() {
  return (
    <>
      <DocumentMeta />
      <Routes>
        <Route path="/admin/*" element={<AdminConsole />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/manufacturing-wholesale"
            element={<ManufacturingWholesale />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}