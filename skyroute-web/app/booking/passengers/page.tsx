'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type Pax = {
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;
  passport: string;
};

export default function PassengersPage() {
  const router = useRouter();
  const [pax, setPax] = useState<Pax[]>([
    { type: 'adult', title: 'mr', firstName: '', lastName: '', dob: '', nationality: '', passport: '' },
  ]);
  const [contact, setContact] = useState({ email: '', countryCode: '+92', mobile: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (i: number, patch: Partial<Pax>) => {
    const a = [...pax];
    a[i] = { ...a[i], ...patch };
    setPax(a);
  };

  const submit = () => {
    const e: Record<string, string> = {};
    pax.forEach((p, i) => {
      if (!p.firstName.trim()) e[n- + i] = 'First name required';
      if (!p.lastName.trim()) e[ln- + i] = 'Last name required';
    });
    if (!/.+@.+\..+/.test(contact.email)) e.email = 'Valid email required';
    if (!/^\d{6,}/.test(contact.mobile)) e.mobile = 'Valid mobile required';
    setErrors(e);
    if (Object.keys(e).length) return;
    router.push('/booking/payment');
  };

  return (
    <>
      <Header />
      <main className="container-page py-8">
        <h1 className="text-2xl font-semibold">Passenger details</h1>
        <p className="mt-1 text-sm text-ink-muted">Enter details exactly as they appear on the travel document.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {pax.map((p, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-brand-600" /> Adult {i + 1}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">First name</label>
                    <Input value={p.firstName} onChange={ev => update(i, { firstName: ev.target.value })} className="mt-1" />
                    {errors['fn-' + i] && <p className="mt-1 text-xs text-red-600">{errors['fn-' + i]}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Last name</label>
                    <Input value={p.lastName} onChange={ev => update(i, { lastName: ev.target.value })} className="mt-1" />
                    {errors['ln-' + i] && <p className="mt-1 text-xs text-red-600">{errors['ln-' + i]}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Date of birth</label>
                    <Input type="date" value={p.dob} onChange={ev => update(i, { dob: ev.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Nationality</label>
                    <Input value={p.nationality} onChange={ev => update(i, { nationality: ev.target.value })} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Passport number</label>
                    <Input value={p.passport} onChange={ev => update(i, { passport: ev.target.value })} className="mt-1" />
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Mail className="h-4 w-4 text-brand-600" /> Contact details
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Email</label>
                  <Input type="email" value={contact.email} onChange={ev => setContact(c => ({ ...c, email: ev.target.value }))} className="mt-1" />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Country code</label>
                  <Input value={contact.countryCode} onChange={ev => setContact(c => ({ ...c, countryCode: ev.target.value }))} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Mobile</label>
                  <div className="relative mt-1">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
                    <Input value={contact.mobile} onChange={ev => setContact(c => ({ ...c, mobile: ev.target.value }))} className="pl-9" />
                  </div>
                  {errors.mobile && <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>}
                </div>
              </div>
            </Card>
          </div>

          <Card className="h-fit p-6">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-muted">Fare</span><span>PKR 70,000</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Taxes</span><span>PKR 8,000</span></div>
              <div className="mt-3 flex justify-between border-t border-surface-border pt-3 font-semibold">
                <span>Total</span><span className="text-brand-700">PKR 78,000</span>
              </div>
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={submit}>
              Continue to payment <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href="/flights/review" className="mt-3 block text-center text-xs text-ink-muted hover:underline">
              Back to itinerary
            </Link>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
