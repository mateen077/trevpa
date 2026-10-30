'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftRight, Calendar, Search, SlidersHorizontal, Plus, X, Mic } from 'lucide-react';
import { AirportAutocomplete } from './AirportAutocomplete';
import { PassengerSelector, type PassengerState } from './PassengerSelector';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { Airport } from '@/lib/mock/flights';

type TripType = 'round_trip' | 'one_way' | 'multi_city';
interface Leg { origin: Airport | null; destination: Airport | null; date: string }

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d: string, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

export function SearchWidget() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>('round_trip');
  const [legs, setLegs] = useState<Leg[]>([{ origin: null, destination: null, date: addDays(today(), 7) }]);
  const [returnDate, setReturnDate] = useState(addDays(today(), 14));
  const [passengers, setPassengers] = useState<PassengerState>({ adults:1, children:0, infants:0, cabin:'economy' });
  const [flexible, setFlexible] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advanced, setAdvanced] = useState({ directOnly:false, refundableOnly:false, baggageRequired:false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const swap = (i: number) => {
    const l = [...legs];
    [l[i].origin, l[i].destination] = [l[i].destination, l[i].origin];
    setLegs(l);
  };
  const updateLeg = (i: number, patch: Partial<Leg>) => {
    const l = [...legs]; l[i] = { ...l[i], ...patch }; setLegs(l);
  };
  const addLeg = () => { if (legs.length < 6) setLegs([...legs, { origin:null, destination:null, date:addDays(today(), 20) }]); };
  const removeLeg = (i: number) => { if (legs.length > 2) setLegs(legs.filter((_, idx) => idx !== i)); };

  const validate = (): string | null => {
    for (let i = 0; i < legs.length; i++) {
      const l = legs[i];
      if (!l.origin) return `Please select origin for leg ${i + 1}`;
      if (!l.destination) return `Please select destination for leg ${i + 1}`;
      if (l.origin.code === l.destination.code) return `Origin and destination cannot be the same (leg ${i + 1})`;
      if (!l.date) return `Please pick a departure date for leg ${i + 1}`;
    }
    if (tripType === 'round_trip' && !returnDate) return 'Please pick a return date';
    return null;
  };

  const onSearch = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError(null); setLoading(true);
    const params = new URLSearchParams({
      tripType,
      legs: JSON.stringify(legs.map(l => ({ origin: l.origin!.code, destination: l.destination!.code, date: l.date }))),
      returnDate: tripType === 'round_trip' ? returnDate : '',
      adults: String(passengers.adults),
      children: String(passengers.children),
      infants: String(passengers.infants),
      cabin: passengers.cabin,
      flexible: String(flexible),
      directOnly: String(advanced.directOnly),
      refundableOnly: String(advanced.refundableOnly),
      baggageRequired: String(advanced.baggageRequired),
    });
    router.push(`/flights/results?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border border-surface-border bg-white p-4 shadow-pop sm:p-6">
      <div className="mb-4 flex flex-wrap gap-1">
        {([
          ['round_trip','Round Trip'],['one_way','One Way'],['multi_city','Multi City'],
        ] as const).map(([v,l]) => (
          <button key={v} type="button" onClick={() => {
            setTripType(v);
            if (v === 'one_way') setLegs([legs[0]]);
            if (v === 'multi_city' && legs.length < 2) setLegs([...legs, { origin:null, destination:null, date:addDays(today(), 20) }]);
            if (v === 'round_trip' && legs.length > 1) setLegs([legs[0]]);
          }}
            className={cn('rounded-md px-4 py-2 text-sm font-medium transition-colors',
              tripType === v ? 'bg-brand-600 text-white' : 'text-ink-muted hover:bg-surface-muted')}>
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {legs.map((leg, i) => (
          <div key={i} className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_180px_auto]">
            <AirportAutocomplete label={`From${legs.length > 1 ? ` (Leg ${i + 1})` : ''}`} value={leg.origin}
              onChange={v => updateLeg(i, { origin: v })} exclude={leg.destination?.code} placeholder="Origin city or airport" />
            <div className="flex items-end pb-1 lg:pb-4">
              <button type="button" onClick={() => swap(i)} title="Swap"
                className="grid h-10 w-10 place-items-center rounded-full border border-surface-border bg-white hover:bg-surface-muted">
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
            <AirportAutocomplete label="To" value={leg.destination}
              onChange={v => updateLeg(i, { destination: v })} exclude={leg.origin?.code} placeholder="Destination city or airport" />
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-subtle">Departure</label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-600" />
                <input type="date" value={leg.date} min={today()}
                  onChange={e => updateLeg(i, { date: e.target.value })}
                  className="h-14 w-full rounded-md border border-surface-border bg-white pl-9 pr-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
              </div>
            </div>
            {legs.length > 2 && (
              <div className="flex items-end pb-1 lg:pb-4">
                <button type="button" onClick={() => removeLeg(i)} className="grid h-10 w-10 place-items-center rounded-full border border-surface-border hover:bg-surface-muted" title="Remove leg">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}

        {tripType === 'multi_city' && legs.length < 6 && (
          <button type="button" onClick={addLeg} className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline">
            <Plus className="h-4 w-4" /> Add another flight
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[220px_1fr_auto]">
        {tripType === 'round_trip' && (
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-subtle">Return</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-600" />
              <input type="date" value={returnDate} min={legs[0].date}
                onChange={e => setReturnDate(e.target.value)}
                className="h-14 w-full rounded-md border border-surface-border bg-white pl-9 pr-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
            </div>
          </div>
        )}
        <PassengerSelector value={passengers} onChange={setPassengers} />
        <div className="flex items-end">
          <Button size="lg" onClick={onSearch} loading={loading} className="h-14 w-full lg:w-auto">
            <Search className="h-5 w-5" /> Search Flights
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-surface-border pt-4">
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" checked={flexible} onChange={e => setFlexible(e.target.checked)}
            className="h-4 w-4 rounded border-surface-border text-brand-600 focus:ring-brand-500" />
          Flexible dates +-3 days
        </label>
        <button type="button" onClick={() => setAdvancedOpen(v => !v)}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline">
          <SlidersHorizontal className="h-4 w-4" /> {advancedOpen ? 'Hide' : 'Advanced'} search
        </button>
      </div>

      {advancedOpen && (
        <div className="mt-3 grid gap-3 rounded-md border border-surface-border bg-surface-muted p-4 sm:grid-cols-3">
          {([['directOnly','Direct flights only'],['refundableOnly','Refundable only'],['baggageRequired','Baggage required']] as const).map(([k,l]) => (
            <label key={k} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={(advanced as any)[k]} onChange={e => setAdvanced(a => ({ ...a, [k]: e.target.checked }))}
                className="h-4 w-4 rounded border-surface-border text-brand-600" />
              {l}
            </label>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
        <Mic className="h-3.5 w-3.5 text-accent-600" />
        <span>AI assistant coming soon to search in your own words.</span>
      </div>
    </div>
  );
}
