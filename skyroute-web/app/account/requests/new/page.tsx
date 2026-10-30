'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Paperclip, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS } from '@/lib/mock/account';

const CATEGORIES = ['Booking change', 'Cancellation and refund', 'Baggage', 'Billing', 'Documents', 'Other'];

function NewRequestForm() {
  const sp = useSearchParams();
  const presetBooking = sp.get('booking') ?? '';

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [bookingRef, setBookingRef] = useState(presetBooking);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [createdCase, setCreatedCase] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (subject.trim().length < 3) { setError('Subject is too short'); return; }
    if (description.trim().length < 10) { setError('Please describe your query (10+ characters)'); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setCreatedCase('CASE-' + Math.floor(2402 + Math.random() * 90));
  };

  if (createdCase) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Query submitted</h2>
        <p className="mt-1 text-sm text-ink-muted">Your Case ID is <span className="font-mono font-medium text-ink">{createdCase}</span></p>
        <p className="mt-1 text-xs text-ink-muted">Our team will respond within 24 hours.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/account/requests"><Button variant="secondary">My Requests</Button></Link>
          <Button onClick={() => { setCreatedCase(null); setSubject(''); setDescription(''); setFileName(null); }}>New query</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/account/requests" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to requests
      </Link>

      <Card className="p-6">
        <h2 className="font-semibold">Raise a query</h2>
        <p className="mt-1 text-sm text-ink-muted">We will assign a Case ID and get back to you.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Subject</label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} className="mt-1" placeholder="Brief summary" />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="mt-1 h-11 w-full rounded-md border border-surface-border bg-white px-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Related booking (optional)</label>
            <select value={bookingRef} onChange={e => setBookingRef(e.target.value)}
              className="mt-1 h-11 w-full rounded-md border border-surface-border bg-white px-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100">
              <option value="">None</option>
              {MOCK_BOOKINGS.map(b => <option key={b.id} value={b.reference}>{b.reference} - {b.route}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5}
              className="mt-1 w-full rounded-md border border-surface-border bg-white p-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              placeholder="Explain your query in detail..." />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Attachment (optional)</label>
            <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-surface-border bg-surface-muted px-3 py-3 text-sm text-ink-muted hover:border-brand-300">
              <Paperclip className="h-4 w-4" />
              <span>{fileName ?? 'Attach a file (PDF, image, max 5MB)'}</span>
              <input type="file" className="hidden" onChange={e => setFileName(e.target.files?.[0]?.name ?? null)} />
            </label>
          </div>

          {error && <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

          <Button type="submit" size="lg" loading={submitting} className="w-full sm:w-auto">
            <Send className="h-4 w-4" /> Send
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function NewRequestPage() {
  return (
    <Suspense fallback={<div className="container-page py-8">Loading...</div>}>
      <NewRequestForm />
    </Suspense>
  );
}
