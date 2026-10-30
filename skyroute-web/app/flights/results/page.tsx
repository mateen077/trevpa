'use client';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plane, Filter, ArrowRight, Clock, Briefcase } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';
import { formatDuration, formatPrice, formatTime } from '@/lib/format';
import { cn } from '@/lib/cn';
import axios from 'axios';

export default function ResultsPage() {
  const sp = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<any[]>([]);
  const [sort, setSort] = useState<'price' | 'duration'>('price');
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => {
    const legsRaw = sp.get('legs');
    let legs: any[] = [];
    try { legs = legsRaw ? JSON.parse(legsRaw) : []; } catch {}
    return {
      origin: legs[0]?.origin || 'LHE',
      destination: legs[0]?.destination || 'DXB',
      departureDate: legs[0]?.date || new Date().toISOString().split('T')[0],
      passengers: Number(sp.get('adults') ?? 1),
      cabin: sp.get('cabin') ?? 'economy',
    };
  }, [sp]);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        // YAHAN BACKEND KO CALL KAR RAHE HAIN
        const res = await axios.post('http://localhost:4000/api/flights/search', {
          origin: params.origin,
          destination: params.destination,
          departureDate: params.departureDate,
          passengers: { adults: params.passengers, children: 0, infants: 0 },
          cabin: params.cabin,
        });
        setOffers(res.data);
      } catch (err) {
        setError('Failed to load flights. Make sure backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [params]);

  const sortedOffers = useMemo(() => {
    return [...offers].sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      return 0;
    });
  }, [offers, sort]);

  return (
    <>
      <Header />
      <main className="container-page py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">
              {params.origin} to {params.destination}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {params.passengers} traveller(s) - {params.cabin}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-ink-muted">Sort</label>
            <select value={sort} onChange={e => setSort(e.target.value as any)}
              className="h-10 rounded-md border border-surface-border bg-white px-3 text-sm">
              <option value="price">Price (low to high)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {loading && Array.from({length:3}).map((_,i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-3 h-4 w-full" />
            </Card>
          ))}

          {error && (
            <Card className="p-10 text-center text-red-600">
              <p>{error}</p>
            </Card>
          )}

          {!loading && !error && sortedOffers.length === 0 && (
            <Card className="p-10 text-center">
              <Plane className="mx-auto h-8 w-8 text-ink-subtle" />
              <h3 className="mt-3 font-semibold">No flights found</h3>
            </Card>
          )}

          {!loading && sortedOffers.map(o => (
            <Card key={o.id} className="p-5 hover:shadow-pop transition">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-50 text-xs font-semibold text-brand-700">
                      {o.airline.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{o.airline}</div>
                      <div className="text-xs text-ink-muted">{o.flightNumber} - {o.stops === 0 ? 'Direct' : o.stops + ' stop(s)'}</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div>
                      <div className="text-xl font-semibold">{o.departureTime}</div>
                      <div className="text-xs text-ink-muted">{o.origin}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        <Clock className="h-3 w-3" /> {o.duration}
                      </div>
                      <div className="mt-1 h-px w-24 bg-surface-border" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">{o.arrivalTime}</div>
                      <div className="text-xs text-ink-muted">{o.destination}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between border-t border-surface-border pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <div className="text-right">
                    <div className="text-xs text-ink-subtle">Total price</div>
                    <div className="text-2xl font-semibold text-brand-700">
                      {new Intl.NumberFormat('en-PK', { style: 'currency', currency: o.currency, maximumFractionDigits: 0 }).format(o.price)}
                    </div>
                  </div>
                  <Link href={`/flights/review?offerId=${o.id}`}>
                    <Button size="md" className="mt-4 w-full lg:w-auto">
                      Select <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
