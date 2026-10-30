'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Download, Mail, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function Content() {
  const sp = useSearchParams();
  const ref = sp.get('ref') ?? 'SR-7H2K9Q';
  return (
    <main className="container-page py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Booking confirmed</h1>
            <p className="text-sm text-ink-muted">Confirmation sent to your email.</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-xs text-ink-subtle">Booking ref</div>
              <div className="font-semibold">{ref}</div>
            </div>
            <div>
              <div className="text-xs text-ink-subtle">PNR</div>
              <div className="font-semibold">PNRMOCK1</div>
            </div>
            <div>
              <div className="text-xs text-ink-subtle">Status</div>
              <div className="font-semibold text-green-700">Confirmed</div>
            </div>
          </div>

          <div className="mt-6 border-t border-surface-border pt-6">
            <h3 className="font-medium">Itinerary</h3>
            <div className="mt-3 rounded-md border border-surface-border p-4">
              <div className="text-sm font-medium">Lahore (LHE) to Dubai (DXB)</div>
              <div className="mt-1 text-xs text-ink-muted">EK-102 - 08:30 to 12:15 - 3h 45m - Direct</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary">
              <Download className="h-4 w-4" /> Download receipt
            </Button>
            <Button variant="secondary">
              <Mail className="h-4 w-4" /> Resend email
            </Button>
            <Link href="/retrieve-booking">
              <Button variant="ghost">
                Retrieve booking <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container-page py-10">Loading...</div>}>
        <Content />
      </Suspense>
      <Footer />
    </>
  );
}
