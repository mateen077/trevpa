'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <Header />
      <main className="container-page py-12">
        <div className="mx-auto max-w-md">
          <Card className="p-6">
            {sent ? (
              <div className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h1 className="mt-4 text-xl font-semibold">Check your email</h1>
                <p className="mt-2 text-sm text-ink-muted">
                  If an account exists for {email}, we have sent reset instructions.
                </p>
                <Link href="/sign-in">
                  <Button variant="secondary" className="mt-6">
                    <ArrowLeft className="h-4 w-4" /> Back to sign in
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-semibold">Reset your password</h1>
                <p className="mt-1 text-sm text-ink-muted">We will email you a link to reset it.</p>
                <form onSubmit={submit} className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Email</label>
                    <div className="relative mt-1">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" loading={loading}>Send reset link</Button>
                </form>
                <Link href="/sign-in" className="mt-4 flex items-center justify-center gap-1 text-sm text-brand-700 hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Back to sign in
                </Link>
              </>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
