'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Globe, User, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useAuth } from '@/lib/auth/AuthContext';

const nav = [
  { href:'/flights', label:'Flights' },
  { href:'/hotels', label:'Hotels' },
  { href:'/packages', label:'Packages' },
  { href:'/about', label:'About' },
  { href:'/contact', label:'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-brand-600 text-white font-bold">S</div>
          <span className="text-lg font-semibold tracking-tight">SkyRoute</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:bg-surface-muted hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-md px-2 py-2 text-sm text-ink-muted hover:text-ink">
            <Globe className="h-4 w-4" /> EN
          </button>
          <a href="tel:+920000000000" className="flex items-center gap-1 rounded-md px-2 py-2 text-sm text-ink-muted hover:text-ink">
            <Phone className="h-4 w-4" /> 24/7
          </a>
          <Link href="/retrieve-booking" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink">
            <Ticket className="h-4 w-4" /> Retrieve
          </Link>
          {user ? (
            <Link href="/account">
              <Button size="sm" variant="secondary"><User className="h-4 w-4" /> {user.name.split(' ')[0]}</Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button size="sm" variant="secondary"><User className="h-4 w-4" /> Sign in</Button>
            </Link>
          )}
        </div>

        <button className="lg:hidden rounded-md p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn('lg:hidden border-t border-surface-border bg-white', open ? 'block' : 'hidden')}>
        <div className="container-page py-3 flex flex-col gap-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-surface-muted">
              {n.label}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link href="/retrieve-booking"><Button variant="secondary" className="w-full">Retrieve</Button></Link>
            {user ? (
              <Link href="/account"><Button className="w-full">My Account</Button></Link>
            ) : (
              <Link href="/sign-in"><Button className="w-full">Sign in</Button></Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
