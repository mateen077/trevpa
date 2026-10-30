'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SecurityPage() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(false);
    if (form.next.length < 6) { setError('New password must be at least 6 characters'); return; }
    if (form.next !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setOk(true);
    setForm({ current: '', next: '', confirm: '' });
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="font-semibold">Change password</h2>
        <p className="mt-1 text-sm text-ink-muted">Use a strong password that you do not use elsewhere.</p>
        <form onSubmit={submit} className="mt-6 space-y-4 max-w-md">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Current password</label>
            <Input type="password" value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">New password</label>
            <Input type="password" value={form.next} onChange={e => setForm(f => ({ ...f, next: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Confirm new password</label>
            <Input type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} className="mt-1" />
          </div>
          {error && <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
          {ok && <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">Password updated (mock).</div>}
          <Button type="submit" loading={loading}>Update password</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">Sessions</h2>
        <p className="mt-1 text-sm text-ink-muted">Manage devices where you are signed in.</p>
        <div className="mt-4 rounded-md border border-surface-border p-4 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">This device</div>
              <div className="text-xs text-ink-muted">Current session</div>
            </div>
            <span className="text-xs text-green-700">Active</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
