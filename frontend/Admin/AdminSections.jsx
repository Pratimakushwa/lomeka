import { useState } from 'react';

export default function AdminSections({
  activeTab,
  products,
  onGoToProducts,
  onOpenCreateProduct,
  adminEmail,
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [samples, setSamples] = useState([
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
  ]);

  const [sampleForm, setSampleForm] = useState({
    buyer: '',
    item: '',
    qty: '3 pcs',
  });

  const bulkOrders = [
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

  const buyers = [
    {
      name: 'NorthStar Apparel Co.',
      city: 'Delhi NCR',
      orders: 8,
      volume: '14,500 pcs',
      tier: 'Wholesale Partner',
    },
    {
      name: 'Vanguard Fitness Club',
      city: 'Mumbai',
      orders: 4,
      volume: '3,200 pcs',
      tier: 'Bulk Client',
    },
    {
      name: 'Urban Loom Wholesale',
      city: 'Bengaluru',
      orders: 11,
      volume: '22,000 pcs',
      tier: 'Key Account',
    },
  ];

  const rateSlabs = [
    {
      slab: '50 – 249 pcs',
      discount: 'Base Bulk Rate',
      turnaround: '10–12 Days',
      note: 'Standard factory MOQ tier',
    },
    {
      slab: '250 – 999 pcs',
      discount: '8% Slab Benefit',
      turnaround: '12–15 Days',
      note: 'Custom neck label included',
    },
    {
      slab: '1,000+ pcs',
      discount: '15% Factory Tier',
      turnaround: '15–20 Days',
      note: 'Priority dye lot & custom GSM',
    },
  ];

  const enquiries = [
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

  const activeCount = products.filter((p) => p.isActive).length;
  const draftCount = products.length - activeCount;

  function handleAddSample(e) {
    e.preventDefault();
    if (!sampleForm.buyer.trim() || !sampleForm.item.trim()) return;

    setSamples((prev) => [
      {
        id: `SMP-${103 + prev.length}`,
        buyer: sampleForm.buyer.trim(),
        item: sampleForm.item.trim(),
        qty: sampleForm.qty.trim() || '3 pcs',
        status: 'Requested',
      },
      ...prev,
    ]);
    setSampleForm({ buyer: '', item: '', qty: '3 pcs' });
  }

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
              Factory Overview
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Quick snapshot of LOMEKA catalog, bulk orders, and production
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onGoToProducts}
              className="rounded-md border border-[#c5a059]/40 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-[#f8f4ee]"
            >
              View Inventory
            </button>
            <button
              type="button"
              onClick={onOpenCreateProduct}
              className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-[#f8f4ee] hover:bg-navy/90"
            >
              + Add New Product
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#c5a059]/30 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Total Catalog Items
            </p>
            <p className="mt-2 text-2xl font-bold text-navy">
              {products.length}
            </p>
            <p className="mt-1 text-xs text-muted">
              {activeCount} Active • {draftCount} Draft
            </p>
          </div>

          <div className="rounded-xl border border-[#c5a059]/30 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Active Bulk Orders
            </p>
            <p className="mt-2 text-2xl font-bold text-navy">
              {bulkOrders.length}
            </p>
            <p className="mt-1 text-xs text-muted">T-shirts & tracksuits</p>
          </div>

          <div className="rounded-xl border border-[#c5a059]/30 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Sample Dispatches
            </p>
            <p className="mt-2 text-2xl font-bold text-navy">
              {samples.length}
            </p>
            <p className="mt-1 text-xs text-muted">Fit & GSM approvals</p>
          </div>

          <div className="rounded-xl border border-[#c5a059]/30 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Open Enquiries
            </p>
            <p className="mt-2 text-2xl font-bold text-navy">
              {enquiries.length}
            </p>
            <p className="mt-1 text-xs text-muted">Wholesale quote requests</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#c5a059]/30 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy">Recent Bulk Orders</h3>
            <button
              type="button"
              onClick={onGoToProducts}
              className="text-xs font-semibold text-navy underline-offset-4 hover:underline"
            >
              Manage Products →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[#c5a059]/25 bg-[#f8f4ee] text-[11px] uppercase text-muted">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Buyer</th>
                  <th className="py-2.5 px-3">Garment</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Value</th>
                  <th className="py-2.5 px-3">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c5a059]/15">
                {bulkOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 px-3 font-semibold text-navy">{o.id}</td>
                    <td className="py-2.5 px-3">{o.buyer}</td>
                    <td className="py-2.5 px-3">{o.item}</td>
                    <td className="py-2.5 px-3">{o.qty}</td>
                    <td className="py-2.5 px-3 font-bold text-navy">{o.amount}</td>
                    <td className="py-2.5 px-3">
                      <span className="rounded-full bg-[#c5a059]/20 px-2.5 py-0.5 text-[10px] font-semibold text-navy">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'orders') {
    const filteredOrders =
      statusFilter === 'All'
        ? bulkOrders
        : bulkOrders.filter((o) => o.status === statusFilter);

    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
              Bulk Orders
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Track factory production lots for T-shirts and tracksuits
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-[#c5a059]/35 bg-white px-3 py-2 text-xs font-medium text-navy outline-none"
          >
            <option value="All">All Stages</option>
            <option value="In Production">In Production</option>
            <option value="Quality Check">Quality Check</option>
            <option value="Dispatched">Dispatched</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#c5a059]/30 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#c5a059]/25 bg-[#f8f4ee] text-[11px] uppercase text-muted">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Buyer</th>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Order Value</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5a059]/15">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 px-4 font-bold text-navy">{order.id}</td>
                  <td className="py-3 px-4">{order.buyer}</td>
                  <td className="py-3 px-4">{order.item}</td>
                  <td className="py-3 px-4">{order.qty}</td>
                  <td className="py-3 px-4 font-bold text-navy">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className="rounded-full bg-[#c5a059]/20 px-2.5 py-0.5 text-[10px] font-semibold text-navy">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'customers') {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Wholesale Buyers
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Registered retail brands and bulk apparel buyers
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {buyers.map((b) => (
            <div
              key={b.name}
              className="rounded-xl border border-[#c5a059]/30 bg-white p-5 shadow-sm"
            >
              <span className="rounded-full bg-[#c5a059]/20 px-2.5 py-0.5 text-[10px] font-semibold text-navy">
                {b.tier}
              </span>
              <h3 className="mt-3 text-sm font-bold text-navy">{b.name}</h3>
              <p className="mt-0.5 text-xs text-muted">{b.city}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#c5a059]/20 pt-3 text-xs">
                <span>{b.orders} Orders</span>
                <span className="font-bold text-navy">{b.volume}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'coupons') {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Bulk Rate Slabs
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Quantity-based pricing tiers and lead times
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {rateSlabs.map((slab) => (
            <div
              key={slab.slab}
              className="rounded-xl border border-[#c5a059]/30 bg-white p-5 shadow-sm"
            >
              <p className="text-base font-bold text-navy">{slab.slab}</p>
              <p className="mt-1 text-xs font-semibold text-[#9a762e]">
                {slab.discount}
              </p>
              <p className="mt-3 text-xs text-muted">{slab.note}</p>
              <p className="mt-3 border-t border-[#c5a059]/20 pt-2.5 text-[11px] font-medium text-navy">
                Lead time: {slab.turnaround}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'reviews') {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Sample Requests
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Log and track pre-production fabric and fit samples
          </p>
        </div>

        <form
          onSubmit={handleAddSample}
          className="grid gap-3 rounded-xl border border-[#c5a059]/30 bg-white p-4 shadow-sm sm:grid-cols-4"
        >
          <input
            type="text"
            placeholder="Buyer / Brand name"
            value={sampleForm.buyer}
            onChange={(e) =>
              setSampleForm((prev) => ({ ...prev, buyer: e.target.value }))
            }
            className="rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none"
          />
          <input
            type="text"
            placeholder="Sample item (e.g. 240 GSM Tee)"
            value={sampleForm.item}
            onChange={(e) =>
              setSampleForm((prev) => ({ ...prev, item: e.target.value }))
            }
            className="rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none"
          />
          <input
            type="text"
            placeholder="Qty (e.g. 3 pcs)"
            value={sampleForm.qty}
            onChange={(e) =>
              setSampleForm((prev) => ({ ...prev, qty: e.target.value }))
            }
            className="rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-[#f8f4ee] hover:bg-navy/90"
          >
            + Add Sample
          </button>
        </form>

        <div className="overflow-x-auto rounded-xl border border-[#c5a059]/30 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#c5a059]/25 bg-[#f8f4ee] text-[11px] uppercase text-muted">
                <th className="py-3 px-4">Sample ID</th>
                <th className="py-3 px-4">Buyer</th>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5a059]/15">
              {samples.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 px-4 font-bold text-navy">{s.id}</td>
                  <td className="py-3 px-4">{s.buyer}</td>
                  <td className="py-3 px-4">{s.item}</td>
                  <td className="py-3 px-4">{s.qty}</td>
                  <td className="py-3 px-4">
                    <span className="rounded-full bg-[#c5a059]/20 px-2.5 py-0.5 text-[10px] font-semibold text-navy">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'newsletter') {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Wholesale Enquiries
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Recent bulk quote messages from prospective buyers
          </p>
        </div>

        <div className="space-y-3">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c5a059]/30 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="text-xs font-bold text-navy">
                  {enq.id} • {enq.from}
                </p>
                <p className="mt-1 text-xs text-muted">{enq.requirement}</p>
              </div>
              <span className="text-[11px] text-muted">{enq.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'analytics') {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Catalog & Production Analytics
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Category distribution across your live catalog
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {['T-Shirts', 'Tracksuits', 'Activewear'].map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <div
                key={cat}
                className="rounded-xl border border-[#c5a059]/30 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold text-muted">{cat}</p>
                <p className="mt-2 text-2xl font-bold text-navy">{count}</p>
                <p className="mt-1 text-[11px] text-muted">
                  Items in inventory
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-5 rounded-xl border border-[#c5a059]/30 bg-white p-6 shadow-sm">
      <div>
        <h2 className="font-display text-2xl font-bold text-navy">
          Admin Settings
        </h2>
        <p className="mt-0.5 text-xs text-muted">
          Session & factory workspace details
        </p>
      </div>

      <div className="space-y-3 border-t border-[#c5a059]/20 pt-4 text-xs">
        <div className="flex justify-between py-1">
          <span className="text-muted">Signed-in Admin</span>
          <span className="font-semibold text-navy">{adminEmail}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted">Brand</span>
          <span className="font-semibold text-navy">LOMEKA Fashion</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted">Default Currency</span>
          <span className="font-semibold text-navy">INR (₹)</span>
        </div>
      </div>
    </div>
  );
}