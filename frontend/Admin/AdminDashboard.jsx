import {
  Package,
  ShoppingBag,
  FlaskConical,
  MessageSquareQuote,
  Plus,
  ArrowUpRight,
  Factory,
  Sparkles,
} from 'lucide-react';

const STATUS_STYLES = {
  'In Production':
    'border-amber-200 bg-amber-50 text-amber-800',
  'Quality Check':
    'border-sky-200 bg-sky-50 text-sky-800',
  Dispatched:
    'border-emerald-200 bg-emerald-50 text-emerald-800',
};

export default function AdminDashboard({
  products = [],
  orders = [],
  samples = [],
  enquiries = [],
  onNavigate,
  onOpenAddProduct,
}) {
  const activeProducts = products.filter((p) => p.isActive).length;
  const draftProducts = products.length - activeProducts;

  const kpiCards = [
    {
      label: 'TOTAL PRODUCTS',
      value: products.length,
      sub: `${activeProducts} Active • ${draftProducts} Draft`,
      Icon: Package,
      accent: 'from-[#0b132b] to-[#1c2b54] text-[#e8c97e]',
      onClick: () => onNavigate?.('/admin/products'),
    },
    {
      label: 'BULK ORDERS',
      value: orders.length,
      sub: 'Production & dispatch',
      Icon: ShoppingBag,
      accent: 'from-[#9a762e] to-[#c5a059] text-[#0b132b]',
      onClick: () => onNavigate?.('/admin/orders'),
    },
    {
      label: 'SAMPLES',
      value: samples.length,
      sub: 'Buyer sample requests',
      Icon: FlaskConical,
      accent: 'from-[#16324f] to-[#274c77] text-[#f8f4ee]',
      onClick: () => onNavigate?.('/admin/samples'),
    },
    {
      label: 'ENQUIRIES',
      value: enquiries.length,
      sub: 'Bulk quote enquiries',
      Icon: MessageSquareQuote,
      accent: 'from-[#2b2118] to-[#4a3828] text-[#e8c97e]',
      onClick: () => onNavigate?.('/admin/enquiries'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner + Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#c5a059]/30 bg-gradient-to-r from-[#0b132b] via-[#132044] to-[#0b132b] p-6 text-[#f8f4ee] shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/15 px-3 py-0.5 text-[11px] font-medium text-[#e8c97e]">
            <Sparkles size={12} />
            <span>Manufacturing & Wholesale Control</span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard Overview
          </h2>
          <p className="text-xs text-slate-300">
            LOMEKA manufacturing, bulk dispatches, sample tracking, and buyer enquiries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate?.('/admin/products')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#c5a059]/40 bg-white/10 px-4 py-2 text-xs font-semibold text-[#f8f4ee] transition hover:bg-white/15"
          >
            <Factory size={14} className="text-[#e8c97e]" />
            <span>Products</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onOpenAddProduct ? onOpenAddProduct() : onNavigate?.('/admin/products')
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#c5a059] px-4 py-2 text-xs font-bold text-[#0b132b] shadow-sm transition hover:bg-[#d4b26a]"
          >
            <Plus size={15} strokeWidth={2.4} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.Icon;
          return (
            <button
              key={card.label}
              type="button"
              onClick={card.onClick}
              className="group flex flex-col justify-between rounded-xl border border-[#c5a059]/30 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c5a059]/70 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-bold tracking-wider text-muted">
                  {card.label}
                </span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${card.accent} shadow-xs`}
                >
                  <Icon size={17} strokeWidth={2} />
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-2">
                <div>
                  <p className="font-display text-3xl font-bold text-navy">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{card.sub}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Bulk Orders Table */}
      <div className="overflow-hidden rounded-xl border border-[#c5a059]/30 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c5a059]/20 px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">
              Recent Bulk Orders
            </h3>
            <p className="text-xs text-muted">
              Active garment runs across stitching, QC, and dispatch
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate?.('/admin/orders')}
            className="inline-flex items-center gap-1 rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-1.5 text-xs font-semibold text-navy transition hover:bg-[#f8f4ee]"
          >
            <span>View All Orders</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#c5a059]/20 bg-[#f8f4ee] text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Buyer</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5a059]/15">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-muted">
                    No bulk orders found yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const badgeClass =
                    STATUS_STYLES[order.status] ||
                    'border-slate-200 bg-slate-100 text-slate-700';
                  return (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-[#fcfaf7]"
                    >
                      <td className="py-3.5 px-4 font-bold text-navy">
                        {order.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-navy">
                        {order.buyer}
                      </td>
                      <td className="py-3.5 px-4 text-muted">{order.item}</td>
                      <td className="py-3.5 px-4 font-medium text-navy">
                        {order.qty}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-navy">
                        {order.amount}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeClass}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}