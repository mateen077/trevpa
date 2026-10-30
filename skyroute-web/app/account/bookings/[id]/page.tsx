'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, MessageSquare, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS } from '@/lib/mock/account';
import { formatPrice } from '@/lib/format';

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const booking = MOCK_BOOKINGS.find(b => b.id === id);

  if (!booking) {
    return (
      <Card className="p-10 text-center">
        <h2 className="font-semibold">Booking not found</h2>
        <p className="mt-1 text-sm text-ink-muted">This booking does not exist or was removed.</p>
        <Button variant="secondary" className="mt-4" onClick={() => router.push('/account/bookings')}>Back to bookings</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/account/bookings" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to bookings
      </Link>

      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{booking.route}</h2>
            <div className="mt-1 text-sm text-ink-muted">Booking ref {booking.reference} - PNR {booking.pnr}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-ink-subtle">Total paid</div>
            <div className="text-lg font-semibold text-brand-700">{formatPrice(booking.total, booking.currency)}</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-xs text-ink-subtle">Departure</div>
            <div className="font-medium">{new Date(booking.departure).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</div>
          </div>
          <div>
            <div className="text-xs text-ink-subtle">Arrival</div>
            <div className="font-medium">{new Date(booking.arrival).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</div>
          </div>
          <div>
            <div className="text-xs text-ink-subtle">Status</div>
            <div className="font-medium capitalize">{booking.status}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary"><Download className="h-4 w-4" /> Download receipt</Button>
          <Link href={'/account/requests/new?booking=' + booking.reference}>
            <Button variant="secondary"><MessageSquare className="h-4 w-4" /> Raise a query</Button>
          </Link>
          <Button variant="ghost"><XCircle className="h-4 w-4" /> Request cancellation</Button>
        </div>
      </Card>
    </div>
  );
}