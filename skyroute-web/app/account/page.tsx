'use client';
import Link from 'next/link';
import { Ticket, MessageSquare, Search, ArrowRight, Plane } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS, MOCK_REQUESTS } from '@/lib/mock/account';
import { formatPrice } from '@/lib/format';

export default function AccountOverview() {
  const nextTrip = MOCK_BOOKINGS[0];
  const openQueries = MOCK_REQUESTS.filter(r => r.status !== 'resolved' && r.status !== 'closed').length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-50 text-brand-700">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-ink-subtle">My bookings</div>
              <div className="text-xl font-semibold">{MOCK_BOOKINGS.length}</div>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-amber-50 text-amber-700">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-ink-subtle">Open requests</div>
              <div className="text-xl font-semibold">{openQueries}</div>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-green-50 text-green-700">
              <Search className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-ink-subtle">Ready to plan?</div>
              <Link href="/flights" className="text-sm font-medium text-brand-700 hover:underline">Search flights</Link>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Upcoming trip</h2>
          <Link href="/account/bookings" className="text-sm text-brand-700 hover:underline">All bookings</Link>
        </div>
        {nextTrip ? (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-brand-50 text-brand-700">
              <Plane className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{nextTrip.route}</div>
              <div className="text-xs text-ink-muted">
                {new Date(nextTrip.departure).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} - Ref {nextTrip.reference}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-ink-subtle">Total</div>
              <div className="font-semibold text-brand-700">{formatPrice(nextTrip.total, nextTrip.currency)}</div>
            </div>
            <Link href={'/account/bookings/' + nextTrip.id}>
              <Button variant="secondary" size="sm">View <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 text-sm text-ink-muted">No upcoming trips yet.</div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/flights" className="flex items-center justify-between rounded-md border border-surface-border p-4 hover:border-brand-300">
            <span className="text-sm font-medium">Book a new flight</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/account/requests/new" className="flex items-center justify-between rounded-md border border-surface-border p-4 hover:border-brand-300">
            <span className="text-sm font-medium">Raise a query</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/retrieve-booking" className="flex items-center justify-between rounded-md border border-surface-border p-4 hover:border-brand-300">
            <span className="text-sm font-medium">Retrieve a booking</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/account/profile" className="flex items-center justify-between rounded-md border border-surface-border p-4 hover:border-brand-300">
            <span className="text-sm font-medium">Update profile</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
