'use client';
import { useState } from 'react';
import { Ticket, Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RetrievePage() {
  const [ref, setRef] = useState('');
  const [surname, setSurname] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'notfound' | 'found'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref || !surname) return;
    setState('loading');
    setTimeout(() => {
      const ok = ref.toUpperCase() === 'SR-7H2K9Q' && surname.toLowerCase() === 'khan';
      setState(ok ? 'found' : 'notfound');
    }, 800);
  };

  return (
    <>
      <Header />
      <main className="container-page py-12">
        <div className="mx-auto max-w-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Retrieve your booking</h1>
              <p className="text-sm text-ink-muted">Use your booking reference and last name.</p>
            </div>
          </div>

          <Card className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Booking reference</label>
                <Input value={ref} onChange={e => setRef(e.target.value)} placeholder="SR-XXXXXX" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Last name</label>
                <Input value={surname} onChange={e => setSurname(e.target.value)} className="mt-1" />
              </div>
              <Button type="submit" className="w-full" size="lg" loading={state === 'loading'}>
                <Search className="h-4 w-4" /> Retrieve booking
              </Button>
            </form>

            {state === 'notfound' && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                We could not find a booking with those details. Please check and try again.
              </div>
            )}

            {state === 'found' && (
              <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                Booking found. (Mock retrieval. Backend will load real details.)
              </div>
            )}

            <p className="mt-4 text-xs text-ink-subtle">Demo: use SR-7H2K9Q with surname khan</p>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
