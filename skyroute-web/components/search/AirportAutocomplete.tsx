'use client';
import { useMemo, useState, useRef, useEffect } from 'react';
import { Plane, MapPin } from 'lucide-react';
import { AIRPORTS, type Airport } from '@/lib/mock/flights';
import { cn } from '@/lib/cn';

interface Props {
  label: string;
  value: Airport | null;
  onChange: (a: Airport | null) => void;
  placeholder?: string;
  exclude?: string;
}

export function AirportAutocomplete({ label, value, onChange, placeholder, exclude }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return AIRPORTS
      .filter(a => a.code !== exclude)
      .filter(a => !term || a.city.toLowerCase().includes(term) || a.code.toLowerCase().includes(term) || a.name.toLowerCase().includes(term))
      .slice(0, 8);
  }, [q, exclude]);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-subtle">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'flex h-14 w-full items-center gap-3 rounded-md border border-surface-border bg-white px-3 text-left',
          'hover:border-brand-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-100',
        )}
      >
        <Plane className="h-4 w-4 shrink-0 text-brand-600" />
        {value ? (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{value.city} <span className="text-ink-subtle">({value.code})</span></div>
            <div className="truncate text-xs text-ink-muted">{value.name}</div>
          </div>
        ) : (
          <span className="text-sm text-ink-subtle">{placeholder ?? 'Select airport'}</span>
        )}
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-md border border-surface-border bg-white shadow-pop">
          <div className="border-b border-surface-border p-2">
            <input
              autoFocus value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search city or airport"
              className="h-9 w-full rounded-sm bg-surface-muted px-3 text-sm focus:outline-none"
            />
          </div>
          <ul className="max-h-72 overflow-auto py-1">
            {results.length === 0 && <li className="px-3 py-4 text-sm text-ink-muted">No matches</li>}
            {results.map(a => (
              <li key={a.code}>
                <button type="button" onClick={() => { onChange(a); setOpen(false); setQ(''); }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-surface-muted">
                  <MapPin className="h-4 w-4 text-ink-subtle" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{a.city} <span className="text-ink-subtle">({a.code})</span></div>
                    <div className="truncate text-xs text-ink-muted">{a.name} {a.country}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
