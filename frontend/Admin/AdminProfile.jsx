import { useEffect, useState } from 'react';

const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '');

async function adminApi(endpoint, options = {}) {
  const res = await fetch(`${API_URL}/api/admin${endpoint}`, {
    credentials: 'include',
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || 'Request failed.');
  }
  return data;
}

export default function AdminProfile({ adminEmail, adminName, adminRole }) {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'manager',
  });
  const [passForm, setPassForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadAdmins() {
    try {
      const data = await adminApi('/list');
      setAdmins(Array.isArray(data.admins) ? data.admins : []);
    } catch {
      // ignore if list unavailable
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function handleCreateAdmin(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setMsg('');
    setErr('');

    try {
      await adminApi('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin),
      });
      setNewAdmin({ name: '', email: '', password: '', role: 'manager' });
      setMsg('New admin account created.');
      await loadAdmins();
    } catch (error) {
      setErr(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setMsg('');
    setErr('');

    try {
      await adminApi('/change-password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passForm),
      });
      setPassForm({ currentPassword: '', newPassword: '' });
      setMsg('Password updated successfully.');
    } catch (error) {
      setErr(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoveAdmin(id) {
    if (saving) return;
    setSaving(true);
    setMsg('');
    setErr('');

    try {
      await adminApi(`/${id}`, { method: 'DELETE' });
      setMsg('Admin removed.');
      await loadAdmins();
    } catch (error) {
      setErr(error.message);
    } finally {
      setSaving(false);
    }
  }

  const displayName = adminName || adminEmail?.split('@')[0] || 'Admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#c5a059]/30 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a059]/50 bg-[#f8f4ee] text-base font-bold text-navy">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              {displayName}
            </h2>
            <p className="text-xs text-muted">{adminEmail}</p>
          </div>
        </div>
        <span className="rounded-full bg-[#c5a059]/20 px-3 py-1 text-[11px] font-semibold uppercase text-navy">
          {adminRole || 'Admin'}
        </span>
      </div>

      {err && (
        <p role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          {err}
        </p>
      )}
      {msg && (
        <p role="status" className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
          {msg}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleCreateAdmin} className="space-y-4 rounded-xl border border-[#c5a059]/30 bg-white p-6 shadow-sm">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">Add New Admin</h3>
            <p className="mt-0.5 text-xs text-muted">Create login credentials for another manager</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-navy">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Verma"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin((p) => ({ ...p, name: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy">Email Address</label>
              <input
                type="email"
                required
                placeholder="manager@lomeka.com"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none focus:border-navy"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-navy">Password (min 6 chars)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, password: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none focus:border-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy">Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, role: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none focus:border-navy"
                >
                  <option value="manager">Manager</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-[#f8f4ee] hover:bg-navy/90 disabled:opacity-50"
          >
            {saving ? 'Creating…' : '+ Create Admin Account'}
          </button>
        </form>

        <form onSubmit={handleChangePassword} className="space-y-4 rounded-xl border border-[#c5a059]/30 bg-white p-6 shadow-sm">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">Change My Password</h3>
            <p className="mt-0.5 text-xs text-muted">
              Update password for <span className="font-semibold text-navy">{adminEmail}</span>
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-navy">Current Password</label>
              <input
                type="password"
                required
                value={passForm.currentPassword}
                onChange={(e) => setPassForm((p) => ({ ...p, currentPassword: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy">New Password (min 6 chars)</label>
              <input
                type="password"
                required
                minLength={6}
                value={passForm.newPassword}
                onChange={(e) => setPassForm((p) => ({ ...p, newPassword: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[#c5a059]/35 bg-[#fcfaf7] px-3 py-2 text-xs text-navy outline-none focus:border-navy"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-[#f8f4ee] hover:bg-navy/90 disabled:opacity-50"
          >
            {saving ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#c5a059]/30 bg-white shadow-sm">
        <div className="border-b border-[#c5a059]/20 px-5 py-3.5">
          <h3 className="text-sm font-bold text-navy">
            Registered Admin Accounts ({admins.length})
          </h3>
        </div>
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#c5a059]/25 bg-[#f8f4ee] text-[11px] uppercase text-muted">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c5a059]/15">
            {admins.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 font-semibold text-navy">{item.name}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">
                  <span className="rounded-full bg-[#c5a059]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-navy">
                    {item.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {item.email !== adminEmail ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleRemoveAdmin(item._id)}
                      className="rounded border border-rose-200 px-2.5 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Remove
                    </button>
                  ) : (
                    <span className="text-[11px] text-muted">You</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}