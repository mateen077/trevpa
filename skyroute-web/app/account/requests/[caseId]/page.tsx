'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_REQUESTS } from '@/lib/mock/account';
import { cn } from '@/lib/cn';

export default function RequestDetailPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const router = useRouter();
  const req = MOCK_REQUESTS.find(r => r.caseId === caseId);

  if (!req) {
    return (
      <Card className="p-10 text-center">
        <h2 className="font-semibold">Request not found</h2>
        <Button variant="secondary" className="mt-4" onClick={() => router.push('/account/requests')}>Back to requests</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/account/requests" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to requests
      </Link>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-ink-subtle">{req.caseId}</span>
          <span className="text-xs font-medium capitalize text-ink-muted">{req.status.replace('_', ' ')}</span>
        </div>
        <h2 className="mt-2 text-lg font-semibold">{req.subject}</h2>
        <p className="mt-1 text-xs text-ink-muted">
          {req.bookingRef ? 'Booking ' + req.bookingRef + ' - ' : ''}
          Opened {new Date(req.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>

        <div className="mt-6 space-y-4">
          {req.messages.map((m, i) => (
            <div key={i} className={cn('flex', m.author === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[80%] rounded-lg px-4 py-2 text-sm',
                m.author === 'user' ? 'bg-brand-600 text-white' : 'bg-surface-muted text-ink')}>
                <div>{m.body}</div>
                <div className={cn('mt-1 text-[10px]', m.author === 'user' ? 'text-white/70' : 'text-ink-subtle')}>
                  {new Date(m.at).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}