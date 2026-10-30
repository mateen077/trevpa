'use client';
import { useState, useRef, useEffect } from 'react';
import { Users, Minus, Plus } from 'lucide-react';

export interface PassengerState { adults: number; children: number; infants: number; cabin: 'economy'|'premium_economy'|'business'|'first' }
const CABINS = [
  { v:'economy', l:'Economy' }, { v:'premium_economy', l:'Premium Economy' },
  { v:'business', l:'Business' }, { v:'first', l:'First' },
] as const;

interface Props { value: PassengerState; onChange: (v: PassengerState) => void }

export function PassengerSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  const update = (patch: Partial<PassengerState>) => {
    const next = { ...value, ...patch };
    if (next.adults < 1) next.adults = 1;
    if (next.infants > next.adults) next.infants = next.adults;
    onChange(next);
  };
  const total = value.adults + value.children + value.infants;

  return (
    <div ref={ref} className="relative">
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-subtle">Passengers and Class</label>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex h-14 w-full items-center gap-3 rounded-md border border-surface-border bg-white px-3 text-left hover:border-brand-300">
        <Users className="h-4 w-4 shrink-0 text-brand-600" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{total} {total === 1 ? 'traveller' : 'travellers'}</div>
          <div className="truncate text-xs text-ink-muted">{CABINS.find(c => c.v === value.cabin)?.l}</div>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-80 rounded-md border border-surface-border bg-white p-4 shadow-pop">
          {(['adults','children','infants'] as const).map(k => (
            <div key={k} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium capitalize">{k}</div>
                <div className="text-xs text-ink-muted">
                  {k === 'adults' ? '12+ years' : k === 'children' ? '2 to 11 years' : 'Under 2'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => update({ [k]: value[k] - 1 } as any)}
                  className="grid h-8 w-8 place-items-center rounded-md border border-surface-border hover:bg-surface-muted">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-sm font-medium">{value[k]}</span>
                <button type="button" onClick={() => update({ [k]: value[k] + 1 } as any)}
                  className="grid h-8 w-8 place-items-center rounded-md border border-surface-border hover:bg-surface-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-3 border-t border-surface-border pt-3">
            <label className="mb-1 block text-xs font-medium text-ink-muted">Cabin class</label>
            <select value={value.cabin} onChange={e => update({ cabin: e.target.value as any })}
              className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
              {CABINS.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
