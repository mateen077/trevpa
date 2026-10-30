import Link from 'next/link';
import { ShieldCheck, Headphones, BadgeCheck, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchWidget } from '@/components/search/SearchWidget';
import { Button } from '@/components/ui/Button';

const benefits = [
  { icon: BadgeCheck, title:'Easy Booking', text:'Book flights in a few clicks with a clean, guided flow.' },
  { icon: Sparkles, title:'Best Price', text:'Compare multiple fare options and pick what fits you.' },
  { icon: Headphones, title:'24/7 Support', text:'Real humans available whenever you need help.' },
  { icon: ShieldCheck, title:'Secure Payment', text:'PCI-compliant gateways and verified confirmations.' },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-25"
          style={{ backgroundImage:'radial-gradient(circle at 20% 20%, rgba(255,255,255,.15), transparent 40%), radial-gradient(circle at 80% 30%, rgba(245,158,11,.25), transparent 45%)' }} />

        <div className="container-page pb-40 pt-20 sm:pb-48 sm:pt-24">
          <div className="max-w-3xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Premium flight booking
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Fly smarter. Book with confidence.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              Search hundreds of airlines, compare real-time fares, and lock in the best deal.
              Simple, transparent, secure from takeoff to landing.
            </p>
          </div>
        </div>

        <div className="container-page -mt-28 sm:-mt-32">
          <SearchWidget />
        </div>
      </section>

      <section className="container-page mt-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Why travel with SkyRoute</h2>
          <p className="mt-2 text-sm text-ink-muted">A booking experience designed around you.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(b => (
            <div key={b.title} className="rounded-lg border border-surface-border bg-white p-6 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Popular routes</h2>
            <p className="mt-1 text-sm text-ink-muted">Handpicked destinations loved by our travellers.</p>
          </div>
          <Link href="/flights"><Button variant="secondary" size="sm">See all flights</Button></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { from:'Lahore', to:'Dubai', price:'PKR 78,500', tag:'From' },
            { from:'Karachi', to:'Istanbul', price:'PKR 112,000', tag:'From' },
            { from:'Islamabad', to:'London', price:'PKR 215,400', tag:'From' },
          ].map(r => (
            <Link key={r.from+r.to} href={`/flights/results?to=${r.to}`}
              className="group rounded-lg border border-surface-border bg-white p-6 shadow-card transition hover:shadow-pop">
              <div className="text-xs font-medium uppercase tracking-wide text-ink-subtle">One-way</div>
              <div className="mt-2 text-lg font-semibold">{r.from} to {r.to}</div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-xs text-ink-subtle">{r.tag}</div>
                  <div className="text-xl font-semibold text-brand-700">{r.price}</div>
                </div>
                <span className="text-sm font-medium text-brand-700 group-hover:underline">Book</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
