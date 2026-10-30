'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plane, Mail, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/AuthContext';

function SignInForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') ?? '/account';
  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? 'Sign in failed');
      return;
    }
    router.push(next);
  };

  const google = async () => {
    setError(null);
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
    router.push(next);
  };

  return (
    <main className="container-page py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-brand-600 text-white">
            <Plane className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-muted">Sign in to manage your bookings.</p>
        </div>

        <Card className="p-6">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Email</label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand-700 hover:underline">Forgot?</Link>
              </div>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-9" placeholder="Password" />
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>Sign in</Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-surface-border" />
            <span className="text-xs text-ink-subtle">OR</span>
            <div className="h-px flex-1 bg-surface-border" />
          </div>

          <Button type="button" variant="secondary" className="w-full" size="lg" onClick={google} disabled={loading}>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-ink-muted">
            New to SkyRoute? <Link href="/register" className="font-medium text-brand-700 hover:underline">Create an account</Link>
          </p>
        </Card>

        <p className="mt-4 text-center text-xs text-ink-subtle">
          Demo: any email + any password (min 6 chars) works. Try password 'password' for error.
        </p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container-page py-12">Loading...</div>}>
        <SignInForm />
      </Suspense>
      <Footer />
    </>
  );
}
