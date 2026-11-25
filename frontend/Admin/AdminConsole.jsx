import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Layers,
  FlaskConical,
  MessageSquareQuote,
  BarChart3,
  UserCircle,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import AdminDashboard from './AdminDashboard.jsx';
import AdminOrders from './AdminOrders.jsx';
import AdminProducts from './AdminProducts.jsx';
import AdminProfile from './AdminProfile.jsx';
import AdminSections from './AdminSections.jsx';

const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '');

const INITIAL_ORDERS = [
  {
    id: 'ORD-2041',
    buyer: 'NorthStar Apparel Co.',
    item: '240 GSM Combed Cotton Tee',
    qty: '1,200 pcs',
    amount: '₹3,58,800',
    status: 'In Production',
  },
  {
    id: 'ORD-2042',
    buyer: 'Vanguard Fitness Club',
    item: '320 GSM Poly-Fleece Tracksuit',
    qty: '450 pcs',
    amount: '₹2,92,500',
    status: 'Quality Check',
  },
  {
    id: 'ORD-2043',
    buyer: 'Urban Loom Wholesale',
    item: '180 GSM Classic Crew Tee',
    qty: '2,500 pcs',
    amount: '₹4,97,500',
    status: 'Dispatched',
  },
];

const INITIAL_SAMPLES = [
  {
    id: 'SMP-101',
    buyer: 'Apex Retail Pvt Ltd',
    item: '240 GSM Oversized Tee',
    qty: '5 pcs',
    status: 'Dispatched',
  },
  {
    id: 'SMP-102',
    buyer: 'Metro Sports Wear',
    item: '320 GSM Fleece Tracksuit',
    qty: '3 pcs',
    status: 'In Stitching',
  },
];

const INITIAL_ENQUIRIES = [
  {
    id: 'ENQ-88',
    from: 'Rohan Traders, Jaipur',
    requirement: '600 Tracksuits • 300 GSM • Custom Navy/Gold',
    date: 'Today',
  },
  {
    id: 'ENQ-89',
    from: 'Studio Kora, Pune',
    requirement: '400 Oversized Tees • 240 GSM • Bio-wash',
    date: 'Yesterday',
  },
];

const SIDEBAR_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    section: 'OVERVIEW',
    Icon: LayoutDashboard,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    section: 'COMMERCE',
    badge: 'Bulk',
    Icon: ShoppingBag,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    section: 'COMMERCE',
    Icon: Package,
  },
  {
    id: 'buyers',
    label: 'Buyers',
    path: '/admin/buyers',
    section: 'COMMERCE',
    Icon: Users,
  },
  {
    id: 'rate-slabs',
    label: 'Rate Slabs',
    path: '/admin/rate-slabs',
    section: 'COMMERCE',
    Icon: Layers,
  },
  {
    id: 'samples',
    label: 'Samples',
    path: '/admin/samples',
    section: 'COMMERCE',
    Icon: FlaskConical,
  },
  {
    id: 'enquiries',
    label: 'Enquiries',
    path: '/admin/enquiries',
    section: 'COMMERCE',
    Icon: MessageSquareQuote,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/admin/analytics',
    section: 'REWARDS',
    Icon: BarChart3,
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/admin/profile',
    section: 'REWARDS',
    Icon: UserCircle,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/admin/settings',
    section: 'REWARDS',
    Icon: Settings,
  },
];

function normalizeRoute(path = '') {
  return path.replace(/\/+$/, '') || '/admin/dashboard';
}

async function adminRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}/api/admin${endpoint}`, {
    credentials: 'include',
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      response.status === 404
        ? 'Admin API is not available yet.'
        : data?.message || 'Request failed. Please try again.',
    );
    error.status = response.status;
    throw error;
  }

  if (!data || data.success !== true) {
    throw new Error('The server returned an invalid response.');
  }

  return data;
}

function AdminWorkspace({ admin, currentPath, onNavigate, onLogout, busy, setBusy }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders] = useState(INITIAL_ORDERS);
  const [samples, setSamples] = useState(INITIAL_SAMPLES);
  const [enquiries] = useState(INITIAL_ENQUIRIES);

  useEffect(() => {
    let active = true;

    fetch(`${API_URL}/api/products?all=true`, {
      credentials: 'include',
    })
      .then((res) => res.json().catch(() => null))
      .then((data) => {
        if (active && data?.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const normalized = normalizeRoute(currentPath);
  const activeItem =
    SIDEBAR_ITEMS.find((item) => item.path === normalized) ||
    SIDEBAR_ITEMS.find((item) => item.id === 'dashboard');

  const sections = useMemo(() => {
    return ['OVERVIEW', 'COMMERCE', 'REWARDS'].map((sec) => ({
      label: sec,
      items: SIDEBAR_ITEMS.filter((item) => item.section === sec),
    }));
  }, []);

  const adminEmail = admin?.email || '';
  const adminName = admin?.name || '';
  const adminRole = admin?.role || 'Admin';
  const profileName = adminName || adminEmail.split('@')[0] || 'Admin';
  const todayLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-[#f8f4ee] text-[#0b132b]">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar (Slide-over drawer on mobile, fixed sidebar on desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col justify-between border-r border-[#6f825a]/25 bg-[#0f1517] text-[#dce2d6] transition-all duration-200 md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'md:w-20 w-64' : 'w-64 md:w-60'}`}
      >
        <div className="overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#6f825a]/25 px-4 py-3.5">
            <a
              href="/"
              aria-label="LOMEKA Fashion home"
              aria-current={currentPath === '/' ? 'page' : undefined}
              className="inline-flex shrink-0 items-center justify-center"
            >
              <img
                src="/lomeka-logo.png"
                alt="LOMEKA Fashion"
                className={`block object-contain transition-all duration-200 ${
                  collapsed ? 'h-12 w-12' : 'h-16 w-16 md:h-[74px] md:w-[74px]'
                }`}
              />
            </a>

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setMobileOpen(false)}
              className="rounded-md p-1.5 text-[#b5bfb0] hover:bg-[#6f825a]/15 hover:text-[#f8f4ee] md:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {!collapsed && (
            <div className="px-4 pt-3.5 pb-1 text-[11px] font-semibold tracking-widest text-[#8fa37a]">
              ADMIN CONSOLE
            </div>
          )}

          <nav className="space-y-4 px-2.5 py-2">
            {sections.map((group) => (
              <div key={group.label}>
                {!collapsed && (
                  <p className="px-2.5 pb-1.5 text-[10px] font-semibold tracking-widest text-[#9aa396]">
                    {group.label}
                  </p>
                )}

                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.Icon;
                    const isActive = activeItem.id === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={item.path}
                          title={collapsed ? item.label : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(item.path);
                            setMobileOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            collapsed ? 'md:justify-center md:px-2' : ''
                          } ${
                            isActive
                              ? 'border border-[#6f825a]/50 bg-[#6f825a]/20 font-medium text-[#dce8cf]'
                              : 'text-[#b5bfb0] hover:bg-[#6f825a]/10 hover:text-[#f8f4ee]'
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <Icon
                              size={17}
                              strokeWidth={1.9}
                              className={`shrink-0 ${
                                isActive ? 'text-[#9ab37e]' : 'text-[#7f916b]'
                              }`}
                            />
                            <span
                              className={`truncate ${
                                collapsed ? 'md:hidden' : ''
                              }`}
                            >
                              {item.label}
                            </span>
                          </span>

                          {item.badge && (
                            <span
                              className={`rounded-full bg-[#6f825a] px-2 py-0.5 text-[10px] font-bold text-[#f8f4ee] ${
                                collapsed ? 'md:hidden' : ''
                              }`}
                            >
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

        <div className="space-y-1 border-t border-[#6f825a]/25 p-2.5">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={`hidden w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs text-[#b5bfb0] transition hover:bg-[#6f825a]/10 hover:text-[#f8f4ee] md:flex ${
              collapsed ? 'justify-center px-2' : ''
            }`}
          >
            {collapsed ? (
              <PanelLeftOpen size={16} strokeWidth={1.9} />
            ) : (
              <>
                <PanelLeftClose size={16} strokeWidth={1.9} />
                <span>Collapse</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={onLogout}
            className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-[#d98a7e] transition hover:bg-rose-500/10 disabled:opacity-50 ${
              collapsed ? 'md:justify-center md:px-2' : ''
            }`}
          >
            <LogOut size={16} strokeWidth={1.9} />
            <span className={collapsed ? 'md:hidden' : ''}>
              {busy ? 'Signing out…' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-2 border-b border-[#c5a059]/30 bg-white px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex shrink-0 items-center justify-center rounded-md border border-[#c5a059]/35 bg-[#f8f4ee] p-2 text-[#0b132b] hover:bg-[#c5a059]/15 md:hidden"
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0">
              <p className="hidden truncate text-[11px] text-muted sm:block">
                Admin ›{' '}
                <span className="font-medium text-[#0b132b]">
                  {activeItem.label}
                </span>
              </p>
              <h1 className="truncate text-base font-bold text-[#0b132b] sm:text-lg">
                {activeItem.label}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0b132b] underline-offset-4 hover:text-[#7a5a1e] hover:underline"
            >
              <span className="hidden sm:inline">View website</span>
              <span className="sm:hidden">Site</span>
              <ExternalLink size={13} strokeWidth={2} />
            </a>

            <span className="hidden text-xs text-muted xl:inline">
              {todayLabel}
            </span>

            <a
              href="/admin/profile"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/admin/profile');
              }}
              className="flex items-center gap-2 border-l border-[#c5a059]/30 pl-2.5 sm:gap-2.5 sm:pl-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6f825a]/60 bg-[#0f1517] text-xs font-bold text-[#9ab37e]">
                {profileName.slice(0, 1).toUpperCase()}
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="max-w-[120px] truncate text-xs font-semibold text-[#0b132b]">
                  {profileName}
                </p>
                <p className="text-[11px] text-muted">Admin</p>
              </div>
            </a>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-3.5 sm:p-6">
          {activeItem.id === 'dashboard' && (
            <AdminDashboard
              products={products}
              orders={orders}
              samples={samples}
              enquiries={enquiries}
              onNavigate={onNavigate}
              onOpenAddProduct={() => onNavigate('/admin/products')}
            />
          )}

          {activeItem.id === 'orders' && <AdminOrders orders={orders} />}

          {activeItem.id === 'products' && (
            <AdminProducts
              adminEmail={adminEmail}
              currentPath={normalized}
              onNavigate={onNavigate}
              busy={busy}
              setBusy={setBusy}
              onLogout={onLogout}
              embedded
            />
          )}

          {(activeItem.id === 'profile' || activeItem.id === 'settings') && (
            <AdminProfile
              adminEmail={adminEmail}
              adminName={adminName}
              adminRole={adminRole}
            />
          )}

          {['buyers', 'rate-slabs', 'samples', 'enquiries', 'analytics'].includes(
            activeItem.id,
          ) && (
            <AdminSections
              section={activeItem.id}
              products={products}
              samples={samples}
              setSamples={setSamples}
              enquiries={enquiries}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminConsole() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const onNavigate = (path) => navigate(path);

  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const data = await adminRequest('/me');
        if (!data.admin?.email) {
          throw new Error('The server returned an invalid admin account.');
        }
        if (active) setAdmin(data.admin);
      } catch (requestError) {
        if (active && requestError.status !== 401) {
          setError(
            requestError instanceof TypeError
              ? 'Cannot reach the backend. Check that it is running.'
              : requestError.message,
          );
        }
      } finally {
        if (active) setChecking(false);
      }
    }

    checkSession();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');

    try {
      const data = await adminRequest('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!data.admin?.email) {
        throw new Error('The server returned an invalid admin account.');
      }

      setAdmin(data.admin);
      setPassword('');
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Cannot reach the backend. Check that it is running.'
          : requestError.message,
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setError('');

    try {
      await adminRequest('/logout', { method: 'POST' });
      setAdmin(null);
      setPassword('');
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Cannot reach the backend. Please try again.'
          : requestError.message,
      );
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f8f4ee] p-12 text-center text-[#0b132b]">
        <p role="status">Checking your session…</p>
      </div>
    );
  }

  if (admin) {
    return (
      <AdminWorkspace
        admin={admin}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        busy={busy}
        setBusy={setBusy}
      />
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-navy">
      <header className="border-b border-gold/30 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link
            to="/"
            aria-label="LOMEKA Fashion home"
            className="inline-flex items-center gap-3"
          >
            <img
              src="/lomeka-logo.png"
              alt="LOMEKA Fashion"
              className="h-12 w-12 rounded-sm bg-navy p-1 object-contain"
            />
            <span className="font-display text-2xl tracking-wider text-navy">
              LOMEKA
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-navy underline-offset-4 hover:underline"
          >
            <span>View website</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <section className="brand-card mx-auto max-w-md p-6 sm:p-9">
          <div className="mb-6">
            <span
              aria-hidden="true"
              className="mb-5 block h-1 w-12 rounded-sm bg-gold"
            />
            <h1 className="font-display text-4xl text-navy">Admin Login</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Sign in to your LOMEKA admin account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold">
                Email address
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={254}
                disabled={busy}
                className="mt-2 w-full rounded-[var(--radius-card)] border border-gold/40 bg-surface px-4 py-3 text-sm focus:border-navy focus:ring-1 focus:ring-navy"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold"
              >
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={busy}
                className="mt-2 w-full rounded-[var(--radius-card)] border border-gold/40 bg-surface px-4 py-3 text-sm focus:border-navy focus:ring-1 focus:ring-navy"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-[var(--radius-card)] border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="brand-btn-primary w-full disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}