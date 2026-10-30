'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Plane } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function ReviewContent() {
  const sp = useSearchParams();
  const offerId = sp.get('offerId') ?? 'offer-0';
  return (
    <main className="container-page py-8">
      <h1 className="text-2xl font-semibold">Review your itinerary</h1>
      <p className="mt-1 text-sm text-ink-muted">Confirm details before entering passenger information.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">Lahore (LHE) to Dubai (DXB)</div>
              <div className="text-xs text-ink-muted">Ref: {offerId} - Economy</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div><div className="text-xs text-ink-subtle">Departure</div><div className="font-medium">08:30</div></div>
            <div><div className="text-xs text-ink-subtle">Duration</div><div className="font-medium">3h 45m</div></div>
            <div><div className="text-xs text-ink-subtle">Arrival</div><div className="font-medium">12:15</div></div>
          </div>
          <div className="mt-6 rounded-md border border-surface-border bg-surface-muted p-4 text-sm">
            <div className="font-medium">Fare conditions</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-muted">
              <li>Change allowed with fee</li>
              <li>Refundable within 24h of departure</li>
              <li>25kg checked baggage included</li>
            </ul>
          </div>
        </Card>
        <Card className="h-fit p-6">
          <h2 className="font-semibold">Price summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink-muted">Base fare</span><span>PKR 70,000</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">Taxes and fees</span><span>PKR 8,000</span></div>
            <div className="mt-3 flex justify-between border-t border-surface-border pt-3 text-base font-semibold">
              <span>Total</span><span className="text-brand-700">PKR 78,000</span>
            </div>
          </div>
          <Link href="/booking/passengers"><Button className="mt-6 w-full" size="lg">Continue <ArrowRight className="h-4 w-4" /></Button></Link>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> Price will be revalidated before payment
          </p>
        </Card>
      </div>
    </main>
  );
}

export default function ReviewPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container-page py-8">Loading...</div>}>
        <ReviewContent />
      </Suspense>
      <Footer />
    </>
  );
}