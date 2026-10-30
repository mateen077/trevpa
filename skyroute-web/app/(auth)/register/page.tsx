'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plane, Mail, Lock, User, Phone } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? 'Registration failed');
      return;
    }
    router.push('/account');
  };

  return (
    <>
      <Header />
      <main className="container-page py-12">
        <div className="mx-auto max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-brand-600 text-white">
              <Plane className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold">Create your account</h1>
            <p className="mt-1 text-sm text-ink-muted">Book faster, manage trips in one place.</p>
          </div>

          <Card className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Full name</label>
                <div className="relative mt-1">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="pl-9" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Email</label>
                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                  <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="pl-9" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Phone (optional)</label>
                <div className="relative mt-1">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                  <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="pl-9" placeholder="+92 3XX XXXXXXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Password</label>
                  <div className="relative mt-1">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                    <Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Confirm</label>
                  <div className="relative mt-1">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                    <Input type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} className="pl-9" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
              )}

              <Button type="submit" className="w-full" size="lg" loading={loading}>Create account</Button>
              <p className="text-center text-xs text-ink-subtle">
                By continuing you agree to our Terms and Privacy Policy.
              </p>
            </form>
            <p className="mt-6 text-center text-sm text-ink-muted">
              Already have an account? <Link href="/sign-in" className="font-medium text-brand-700 hover:underline">Sign in</Link>
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
