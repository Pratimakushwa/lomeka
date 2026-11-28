
import { useEffect, useMemo, useState } from 'react';

const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:9090' : '')
).replace(/\/+$/, '');

const CATEGORY_SUGGESTIONS = [
  'T-Shirts',
  'Polo T-Shirts',
  'Shirts',
  'Lowers & Joggers',
  'Shorts',
  'Tracksuits',
  'Hoodies',
  'Sweatshirts',
  'Jackets',
  'Hoodies & Jackets',
  'Activewear',
  'Co-ord Sets',
  'Nightwear & Pyjamas',
  'Other',
];

const GENDER_OPTIONS = ['Men', 'Women'];

const FIT_OPTIONS = ['Regular', 'Oversized', 'Fitted', 'Boxy'];

const INITIAL_FORM = {
  title: '',
  gender: 'Men',
  category: 'T-Shirts',
  fit: 'Regular',
  imageUrl: '',
  secondaryImageUrl: '',
  isActive: true,
};

const NAV_GROUPS = [
  {
    label: 'OVERVIEW',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
      },
    ],
  },
  {
    label: 'COMMERCE',
    items: [
      {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        badge: 'Bulk',
      },
      {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
      },
      {
        id: 'buyers',
        label: 'Buyers',
        path: '/admin/buyers',
      },
      {
        id: 'rate-slabs',
        label: 'Rate Slabs',
        path: '/admin/rate-slabs',
      },
      {
        id: 'samples',
        label: 'Samples',
        path: '/admin/samples',
      },
      {
        id: 'enquiries',
        label: 'Enquiries',
        path: '/admin/enquiries',
      },
    ],
  },
  {
    label: 'REWARDS',
    items: [
      {
        id: 'analytics',
        label: 'Analytics',
        path: '/admin/analytics',
      },
      {
        id: 'settings',
        label: 'Settings',
        path: '/admin/settings',
      },
    ],
  },
];

function resolveActiveTab(currentPath) {
  const clean = (currentPath || '/admin/products').replace(/\/+$/, '');

  if (clean === '/admin' || clean === '/admin/login') {
    return 'products';
  }

  const matched = NAV_GROUPS.flatMap((g) => g.items).find(
    (item) => item.path === clean,
  );

  return matched ? matched.id : 'products';
}

function getProductImages(product) {
  const list = [];

  if (product?.imageUrl) {
    list.push(product.imageUrl);
  }

  if (
    product?.secondaryImageUrl &&
    !list.includes(product.secondaryImageUrl)
  ) {
    list.push(product.secondaryImageUrl);
  }

  if (Array.isArray(product?.images)) {
    for (const img of product.images) {
      if (img && !list.includes(img)) {
        list.push(img);
      }
    }
  }

  return list.slice(0, 2);
}

export default function AdminProducts({
  adminEmail,
  currentPath = '/admin/products',
  onNavigate,
  onLogout,
  busy,
  setBusy,
  embedded = false,
}) {
  const activeTab = resolveActiveTab(currentPath);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('All Genders');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  function goToRoute(path) {
    if (typeof onNavigate === 'function') {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  async function loadProducts(signal) {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/products?all=true`, {
        credentials: 'include',
        signal,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || 'Could not load products.');
      }

      const list = Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

      setProducts(list);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(
          err instanceof TypeError
            ? 'Cannot reach the backend to load products.'
            : err.message,
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    loadProducts(controller.signal);

    return () => controller.abort();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const catQ = categoryFilter.trim().toLowerCase();

    return products.filter((p) => {
      const matchesGender =
        genderFilter === 'All Genders' ||
        (p.gender || '').toLowerCase() === genderFilter.toLowerCase();

      const matchesCategory =
        !catQ || (p.category || '').toLowerCase().includes(catQ);

      if (!matchesGender || !matchesCategory) return false;
      if (!q) return true;

      return (
        p.title?.toLowerCase().includes(q) ||
        p.gender?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.fit?.toLowerCase().includes(q)
      );
    });
  }, [products, search, genderFilter, categoryFilter]);

  function openCreateModal() {
    setEditingId(null);
    setError('');
    setForm(INITIAL_FORM);
    setShowModal(true);
  }

  function openEditModal(product) {
    const imgs = getProductImages(product);
    const matchedGender =
      GENDER_OPTIONS.find(
        (g) => g.toLowerCase() === (product.gender || '').toLowerCase(),
      ) || 'Men';
    const matchedFit =
      FIT_OPTIONS.find(
        (f) => f.toLowerCase() === (product.fit || '').toLowerCase(),
      ) || 'Regular';

    setEditingId(product._id || product.id);
    setError('');

    setForm({
      title: product.title || '',
      gender: matchedGender,
      category: product.category || 'T-Shirts',
      fit: matchedFit,
      imageUrl: imgs[0] || '',
      secondaryImageUrl: imgs[1] || '',
      isActive: product.isActive !== false,
    });

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function readImageField(e, fieldName) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setError(
        'Each image should be under 1.5 MB so both images save smoothly.',
      );
      return;
    }

    setError('');

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      }
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (busy) return;

    setBusy?.(true);
    setError('');
    setNotice('');

    const primary = form.imageUrl || form.secondaryImageUrl || '';

    const secondary =
      form.secondaryImageUrl && form.secondaryImageUrl !== primary
        ? form.secondaryImageUrl
        : '';

    const images = [primary, secondary].filter(Boolean);

    const payload = {
      title: form.title.trim(),
      gender: form.gender,
      category: form.category.trim() || 'T-Shirts',
      fit: form.fit,
      imageUrl: primary,
      secondaryImageUrl: secondary,
      images,
      isActive: form.isActive,
    };

    try {
      const url = editingId
        ? `${API_URL}/api/products/${editingId}`
        : `${API_URL}/api/products`;

      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.success === false) {
        throw new Error(
          data?.message ||
            (res.status === 413
              ? 'Images size is too large for server upload limit.'
              : 'Failed to save product.'),
        );
      }

      const rawSaved = data?.product || data?.data || {};

      const savedProduct = {
        ...payload,
        ...rawSaved,
        _id:
          rawSaved._id ||
          rawSaved.id ||
          editingId ||
          `local-${Date.now()}`,
        gender: rawSaved.gender || payload.gender,
        category: rawSaved.category || payload.category,
        fit: rawSaved.fit || payload.fit,
        imageUrl: rawSaved.imageUrl || primary,
        secondaryImageUrl:
          rawSaved.secondaryImageUrl ||
          (Array.isArray(rawSaved.images) ? rawSaved.images[1] : '') ||
          secondary,
        images:
          Array.isArray(rawSaved.images) && rawSaved.images.length
            ? rawSaved.images
            : images,
      };

      if (editingId) {
        setProducts((prev) =>
          prev.map((item) =>
            (item._id || item.id) === editingId ? savedProduct : item,
          ),
        );

        setNotice('Product updated for Collection card.');
      } else {
        setProducts((prev) => [savedProduct, ...prev]);
        setNotice('Product added for Collection card.');
      }

      setForm(INITIAL_FORM);
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Cannot reach the backend (check server or payload size).'
          : err.message,
      );
    } finally {
      setBusy?.(false);
    }
  }

  async function handleDelete(product) {
    if (busy) return;

    setBusy?.(true);
    setError('');
    setNotice('');

    try {
      const targetId = product._id || product.id;

      const res = await fetch(`${API_URL}/api/products/${targetId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || 'Failed to delete product.');
      }

      setProducts((prev) =>
        prev.filter((item) => (item._id || item.id) !== targetId),
      );

      setNotice(`Deleted "${product.title}".`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy?.(false);
    }
  }

  const profileName = adminEmail?.split('@')[0] || 'Admin';

  const todayLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const activeTabLabel =
    NAV_GROUPS.flatMap((g) => g.items).find(
      (item) => item.id === activeTab,
    )?.label || 'Products';

  const inventoryContent = (
    <>
      {error && !showModal && (
        <div
          role="alert"
          className="mb-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {error}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="mb-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          {notice}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Product Inventory
          </h2>

          <p className="mt-0.5 text-xs text-muted">
            Manage only the details shown on Collection cards and images
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-[#f8f4ee] shadow-sm transition-colors hover:bg-navy/90"
        >
          + Add New Product
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-[240px] max-w-md flex-1">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, collection, category, or fit..."
            className="w-full rounded-md border border-[#c5a059]/35 bg-white px-3.5 py-2 text-xs text-navy outline-none focus:border-navy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="rounded-md border border-[#c5a059]/35 bg-white px-3 py-2 text-xs font-medium text-navy outline-none focus:border-navy"
          >
            <option value="All Genders">All Genders</option>
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            placeholder="Filter category..."
            className="w-40 rounded-md border border-[#c5a059]/35 bg-white px-3 py-2 text-xs font-medium text-navy outline-none focus:border-navy"
          />

          <div className="flex overflow-hidden rounded-md border border-[#c5a059]/35 bg-white">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-2 text-xs font-semibold ${
                viewMode === 'grid'
                  ? 'bg-[#c5a059]/20 text-navy'
                  : 'text-muted hover:text-navy'
              }`}
            >
              Grid
            </button>

            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`border-l border-[#c5a059]/25 px-2.5 py-2 text-xs font-semibold ${
                viewMode === 'list'
                  ? 'bg-[#c5a059]/20 text-navy'
                  : 'text-muted hover:text-navy'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading products…</p>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#c5a059]/45 bg-white p-10 text-center">
          <p className="text-sm font-medium text-navy">
            No products added yet.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-3 rounded-md bg-navy px-4 py-2 text-xs font-semibold text-[#f8f4ee]"
          >
            + Add New Product
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, idx) => {
            const imgs = getProductImages(product);

            return (
              <article
                key={product._id || product.id || idx}
                className="flex flex-col justify-between rounded-xl border border-[#c5a059]/30 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="relative mb-3 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-[#f8f4ee]">
                    <span
                      className={`absolute top-2.5 right-2.5 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        product.isActive
                          ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border border-slate-200 bg-slate-100 text-slate-600'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Draft'}
                    </span>

                    {imgs[0] ? (
                      <img
                        src={imgs[0]}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-muted">
                        No Image
                      </span>
                    )}

                    {imgs.length > 1 && (
                      <span className="absolute bottom-2 right-2 rounded bg-black/65 px-2 py-0.5 text-[10px] font-medium text-white">
                        2 Views
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-1 text-sm font-bold text-navy">
                      {product.title}
                    </h3>

                    <span className="shrink-0 rounded border border-[#c5a059]/30 bg-[#f8f4ee] px-2 py-0.5 text-[10px] font-medium text-navy">
                      {[product.gender, product.fit]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </div>

                  <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">
                    {product.category || 'T-Shirts'}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-[#c5a059]/20 pt-2.5">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => openEditModal(product)}
                    className="flex-1 rounded-md border border-[#c5a059]/40 py-1.5 text-xs font-semibold text-navy hover:bg-[#f8f4ee] disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => handleDelete(product)}
                    className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#c5a059]/30 bg-white">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#c5a059]/25 bg-[#f8f4ee] text-[11px] uppercase tracking-wider text-muted">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Collection / Fit</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#c5a059]/15">
              {filteredProducts.map((product, idx) => (
                <tr key={product._id || product.id || idx}>
                  <td className="py-3 px-4 font-semibold text-navy">
                    {product.title}
                  </td>

                  <td className="py-3 px-4">
                    {[product.gender, product.fit].filter(Boolean).join(' · ')}
                  </td>

                  <td className="py-3 px-4 text-muted">
                    {product.category || 'T-Shirts'}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        product.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => openEditModal(product)}
                        className="rounded border border-[#c5a059]/40 px-2.5 py-1 font-semibold text-navy hover:bg-[#f8f4ee]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handleDelete(product)}
                        className="rounded border border-rose-200 px-2.5 py-1 font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  const modalNode = showModal && (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b132b]/60 p-4 backdrop-blur-[2px]"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#c5a059]/40 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-navy">
              {editingId ? 'Edit Factory Product' : 'Add Factory Product'}
            </h3>

            <p className="text-xs text-muted">
              Only the details shown on Collection cards and product images
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-md border border-[#c5a059]/30 px-2.5 py-1 text-xs font-semibold text-navy hover:bg-[#f8f4ee]"
          >
            ✕ Close
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy">
                Product Title *
              </label>

              <input
                name="title"
                type="text"
                required
                placeholder="Men's Windcheater Jacket"
                value={form.title}
                onChange={handleChange}
                disabled={busy}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-sm text-navy outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy">
                Collection / For
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={busy}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-sm text-navy outline-none focus:border-navy"
              >
                {GENDER_OPTIONS.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy">
                Category
              </label>

              <input
                name="category"
                type="text"
                list="admin-category-suggestions"
                placeholder="T-Shirts, Tracksuits, Co-ord Sets..."
                value={form.category}
                onChange={handleChange}
                disabled={busy}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-sm text-navy outline-none focus:border-navy"
              />
              <datalist id="admin-category-suggestions">
                {CATEGORY_SUGGESTIONS.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy">
                Fit
              </label>

              <select
                name="fit"
                value={form.fit}
                onChange={handleChange}
                disabled={busy}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-sm text-navy outline-none focus:border-navy"
              >
                {FIT_OPTIONS.map((fit) => (
                  <option key={fit} value={fit}>
                    {fit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy">
                Image 1 — Main View
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => readImageField(e, 'imageUrl')}
                disabled={busy}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-2.5 py-1.5 text-xs text-navy file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#f8f4ee]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy">
                Image 2 — Hover View (Changes on Hover)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => readImageField(e, 'secondaryImageUrl')}
                disabled={busy}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-2.5 py-1.5 text-xs text-navy file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#f8f4ee]"
              />
            </div>
          </div>

          {(form.imageUrl || form.secondaryImageUrl) && (
            <div className="grid gap-3 rounded-lg border border-[#c5a059]/25 bg-[#f8f4ee] p-3 sm:grid-cols-2">
              {form.imageUrl && (
                <div className="flex items-center justify-between rounded-md bg-white p-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={form.imageUrl}
                      alt="Main preview"
                      className="h-12 w-12 rounded object-cover"
                    />

                    <span className="text-xs font-medium text-navy">
                      Main Image
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        imageUrl: '',
                      }))
                    }
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {form.secondaryImageUrl && (
                <div className="flex items-center justify-between rounded-md bg-white p-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={form.secondaryImageUrl}
                      alt="Hover preview"
                      className="h-12 w-12 rounded object-cover"
                    />

                    <span className="text-xs font-medium text-navy">
                      Hover Image
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        secondaryImageUrl: '',
                      }))
                    }
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#c5a059]/20 pt-4">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-navy">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                disabled={busy}
              />
              Active on catalog
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={busy}
                className="rounded-md border border-[#c5a059]/40 px-4 py-2 text-xs font-semibold text-navy hover:bg-[#f8f4ee]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={busy}
                className="rounded-md bg-navy px-5 py-2 text-xs font-semibold text-[#f8f4ee] hover:bg-navy/90 disabled:opacity-50"
              >
                {busy
                  ? 'Saving…'
                  : editingId
                    ? 'Update Product'
                    : 'Save Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <>
        {inventoryContent}
        {modalNode}
      </>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#f8f4ee] text-navy">
      <aside
        className={`flex shrink-0 flex-col justify-between bg-[#0b132b] text-slate-300 transition-all ${
          collapsed ? 'w-20' : 'w-60'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-[#c5a059]/25 px-4 py-4">
            <a href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded border border-[#c5a059]/50 bg-[#c5a059]/15 font-display text-sm font-bold text-[#e2c275]">
                L
              </span>

              {!collapsed && (
                <div className="leading-none">
                  <span className="block font-display text-base tracking-wider text-[#f8f4ee]">
                    LOMEKA
                  </span>
                  <span className="mt-0.5 block text-[9px] tracking-[0.28em] text-[#c5a059]">
                    FASHION
                  </span>
                </div>
              )}
            </a>
          </div>

          {!collapsed && (
            <div className="px-4 pt-4 pb-1 text-[11px] font-semibold tracking-widest text-[#c5a059]/70">
              ADMIN CONSOLE
            </div>
          )}

          <nav className="space-y-4 px-2.5 py-2">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                {!collapsed && (
                  <p className="px-2.5 pb-1.5 text-[10px] font-semibold tracking-widest text-slate-400">
                    {group.label}
                  </p>
                )}

                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;

                    return (
                      <li key={item.id}>
                        <a
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            goToRoute(item.path);
                          }}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? 'border border-[#c5a059]/40 bg-[#c5a059]/15 font-medium text-[#e8c97e]'
                              : 'text-slate-400 hover:bg-white/5 hover:text-[#f8f4ee]'
                          }`}
                        >
                          <span className="truncate">
                            {collapsed ? item.label.slice(0, 2) : item.label}
                          </span>

                          {!collapsed && item.badge && (
                            <span className="rounded-full bg-[#c5a059] px-2 py-0.5 text-[10px] font-bold text-[#0b132b]">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-1 border-t border-[#c5a059]/20 p-2.5">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-[#f8f4ee]"
          >
            <span>{collapsed ? '→ Expand' : '‹ Collapse'}</span>
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 disabled:opacity-50"
          >
            <span>
              {collapsed ? 'Out' : busy ? 'Signing out…' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c5a059]/25 bg-white px-6 py-3">
          <div>
            <p className="text-[11px] text-muted">
              Admin › <span className="text-navy">{activeTabLabel}</span>
            </p>

            <h1 className="text-lg font-bold text-navy">{activeTabLabel}</h1>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-xs font-medium text-navy underline-offset-4 hover:underline"
            >
              View website ↗
            </a>

            <span className="hidden text-xs text-muted xl:inline">
              {todayLabel}
            </span>

            <div className="flex items-center gap-2.5 border-l border-[#c5a059]/25 pl-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c5a059]/50 bg-[#f8f4ee] text-xs font-bold text-navy">
                {profileName.slice(0, 1).toUpperCase()}
              </div>

              <div className="leading-tight">
                <p className="text-xs font-semibold text-navy">
                  {profileName}
                </p>
                <p className="text-[11px] text-muted">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{inventoryContent}</main>
      </div>

      {modalNode}
    </div>
  );
}