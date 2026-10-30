'use client';
import Link from 'next/link';
import { Plane, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS } from '@/lib/mock/account';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

const statusStyle: Record<string, string> = {
  confirmed: 'bg-green-50 text-green-700',
  ticketed: 'bg-blue-50 text-blue-700',
  pending: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function MyBookingsPage() {
  if (MOCK_BOOKINGS.length === 0) {
    return (
      <Card className="p-10 text-center">
        <Plane className="mx-auto h-8 w-8 text-ink-subtle" />
        <h2 className="mt-3 font-semibold">No bookings yet</h2>
        <p className="mt-1 text-sm text-ink-muted">Search flights to get started.</p>
        <Link href="/flights" className="mt-5 inline-block"><Button>Search flights</Button></Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {MOCK_BOOKINGS.map(b => (
        <Card key={b.id} className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{b.route}</div>
                <div className="mt-1 text-xs text-ink-muted">
                  {new Date(b.departure).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} - Ref {b.reference} - PNR {b.pnr}
                </div>
                <span className={cn('mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium capitalize', statusStyle[b.status])}>
                  {b.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-ink-subtle">Total</div>
              <div className="font-semibold text-brand-700">{formatPrice(b.total, b.currency)}</div>
              <Link href={'/account/bookings/' + b.id} className="mt-2 inline-block">
                <Button variant="secondary" size="sm">View <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
