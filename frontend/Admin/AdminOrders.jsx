import { useMemo, useState } from 'react';

const DEFAULT_ORDERS = [
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

export default function AdminOrders({ orders: initialOrders }) {
  const [orders, setOrders] = useState(
    initialOrders?.length ? initialOrders : DEFAULT_ORDERS,
  );
  const [stageFilter, setStageFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStage =
        stageFilter === 'All' || order.status === stageFilter;
      if (!matchesStage) return false;
      if (!q) return true;
      return (
        order.id.toLowerCase().includes(q) ||
        order.buyer.toLowerCase().includes(q) ||
        order.item.toLowerCase().includes(q)
      );
    });
  }, [orders, stageFilter, search]);

  function handleStatusChange(orderId, nextStatus) {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: nextStatus } : item,
      ),
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Orders
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Manage bulk manufacturing orders and production stages
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID, buyer, item..."
            className="rounded-md border border-[#c5a059]/35 bg-white px-3.5 py-2 text-xs text-navy outline-none focus:border-navy"
          />

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="rounded-md border border-[#c5a059]/35 bg-white px-3 py-2 text-xs font-medium text-navy outline-none focus:border-navy"
          >
            <option value="All">All Stages</option>
            <option value="In Production">In Production</option>
            <option value="Quality Check">Quality Check</option>
            <option value="Dispatched">Dispatched</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#c5a059]/30 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#c5a059]/25 bg-[#f8f4ee] text-[11px] uppercase tracking-wider text-muted">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Buyer</th>
              <th className="py-3 px-4">Garment</th>
              <th className="py-3 px-4">Qty</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c5a059]/15">
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 px-4 text-center text-xs text-muted"
                >
                  No orders match the current filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 px-4 font-bold text-navy">{order.id}</td>
                  <td className="py-3 px-4 font-medium text-navy">
                    {order.buyer}
                  </td>
                  <td className="py-3 px-4 text-muted">{order.item}</td>
                  <td className="py-3 px-4">{order.qty}</td>
                  <td className="py-3 px-4 font-bold text-navy">
                    {order.amount}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      aria-label={`Stage for ${order.id}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="rounded-md border border-[#c5a059]/35 bg-[#f8f4ee] px-2.5 py-1 text-[11px] font-semibold text-navy outline-none"
                    >
                      <option value="In Production">In Production</option>
                      <option value="Quality Check">Quality Check</option>
                      <option value="Dispatched">Dispatched</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}