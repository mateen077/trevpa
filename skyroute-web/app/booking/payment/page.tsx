'use client';
import { useState } from 'react';
import { CreditCard, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useRouter } from 'next/navigation';

type Method = 'card' | 'easypaisa' | 'jazzcash' | 'sadapay';

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>('card');
  const [msisdn, setMsisdn] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'success'>('idle');

  const methods: { id: Method; label: string; sub: string; icon: any }[] = [
    { id: 'card', label: 'Card / Bank', sub: 'Visa, Mastercard, Bank transfer', icon: CreditCard },
    { id: 'easypaisa', label: 'EasyPaisa', sub: 'Pay from your EasyPaisa wallet', icon: Smartphone },
    { id: 'jazzcash', label: 'JazzCash', sub: 'Approve on your phone', icon: Smartphone },
    { id: 'sadapay', label: 'SadaPay', sub: 'Fast wallet checkout', icon: Smartphone },
  ];

  const pay = () => {
    setStatus('pending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => router.push('/booking/confirmation?ref=SR-7H2K9Q'), 800);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="container-page py-8">
        <h1 className="text-2xl font-semibold">Payment</h1>
        <p className="mt-1 text-sm text-ink-muted">Your booking is confirmed only after the gateway approves payment.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {methods.map(m => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                className={cn('flex w-full items-center gap-4 rounded-lg border bg-white p-5 text-left transition',
                  method === m.id ? 'border-brand-600 ring-2 ring-brand-100' : 'border-surface-border hover:border-brand-300')}>
                <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{m.label}</div>
                  <div className="text-xs text-ink-muted">{m.sub}</div>
                </div>
                <div className={cn('h-4 w-4 rounded-full border-2', method === m.id ? 'border-brand-600 bg-brand-600' : 'border-surface-border')} />
              </button>
            ))}

            {(method === 'easypaisa' || method === 'jazzcash' || method === 'sadapay') && (
              <Card className="p-5">
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Wallet mobile number</label>
                <input value={msisdn} onChange={e => setMsisdn(e.target.value)} placeholder="+92 3XX XXXXXXX"
                  className="mt-1 h-11 w-full rounded-md border border-surface-border px-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
                <p className="mt-2 text-xs text-ink-muted">You will receive a prompt on your phone to approve the payment.</p>
              </Card>
            )}
          </div>

          <Card className="h-fit p-6">
            <h2 className="font-semibold">Order total</h2>
            <div className="mt-3 text-3xl font-semibold text-brand-700">PKR 78,000</div>
            <Button className="mt-6 w-full" size="lg" onClick={pay} loading={status === 'pending'} disabled={status !== 'idle'}>
              {status === 'pending' ? 'Waiting for approval' : 'Pay now'}
            </Button>
            <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> Secured by PCI-compliant gateway
            </div>
            {status === 'pending' && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Payment pending - waiting for gateway confirmation
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
