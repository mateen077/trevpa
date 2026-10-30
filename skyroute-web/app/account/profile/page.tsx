'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? '', phone: user?.phone ?? '' });
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="p-6">
      <h2 className="font-semibold">Profile</h2>
      <p className="mt-1 text-sm text-ink-muted">Update your personal information.</p>
      <form onSubmit={submit} className="mt-6 space-y-4 max-w-md">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Full name</label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Email</label>
          <Input value={user?.email ?? ''} disabled className="mt-1 bg-surface-muted" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Phone</label>
          <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="mt-1" />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm text-green-700">Saved</span>}
        </div>
      </form>
    </Card>
  );
}
