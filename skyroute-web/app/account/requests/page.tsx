'use client';
import Link from 'next/link';
import { MessageSquare, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_REQUESTS } from '@/lib/mock/account';
import { cn } from '@/lib/cn';

const statusStyle: Record<string, string> = {
  open: 'bg-amber-50 text-amber-700',
  in_progress: 'bg-blue-50 text-blue-700',
  resolved: 'bg-green-50 text-green-700',
  closed: 'bg-surface-muted text-ink-muted',
};

export default function MyRequestsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">My Requests</h2>
        <Link href="/account/requests/new">
          <Button size="sm"><Plus className="h-4 w-4" /> Raise a query</Button>
        </Link>
      </div>

      {MOCK_REQUESTS.length === 0 ? (
        <Card className="p-10 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-ink-subtle" />
          <h3 className="mt-3 font-semibold">No queries yet</h3>
          <p className="mt-1 text-sm text-ink-muted">Raise a query and our team will respond.</p>
        </Card>
      ) : (
        MOCK_REQUESTS.map(r => (
          <Card key={r.caseId} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-ink-subtle">{r.caseId}</span>
                  <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium capitalize', statusStyle[r.status])}>
                    {r.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-1 font-medium">{r.subject}</div>
                <div className="mt-1 text-xs text-ink-muted">
                  {r.bookingRef ? 'Booking ' + r.bookingRef + ' - ' : ''}Last update {new Date(r.lastUpdate).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
              <Link href={'/account/requests/' + r.caseId} className="text-sm font-medium text-brand-700 hover:underline">View</Link>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
