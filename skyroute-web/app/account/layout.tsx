'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Ticket, MessageSquare, User, Shield, LogOut } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { useAuth } from '@/lib/auth/AuthContext';
import { cn } from '@/lib/cn';

const nav = [
  { href: '/account', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/account/bookings', label: 'My Bookings', icon: Ticket },
  { href: '/account/requests', label: 'My Requests', icon: MessageSquare },
  { href: '/account/profile', label: 'Profile', icon: User },
  { href: '/account/security', label: 'Security', icon: Shield },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const logout = () => {
    signOut();
    router.push('/');
  };

  return (
    <>
      <Header />
      <RequireAuth>
        <main className="container-page py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Hi, {user?.name}</h1>
            <p className="text-sm text-ink-muted">{user?.email}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-1">
              {nav.map(n => {
                const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
                return (
                  <Link key={n.href} href={n.href}
                    className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      active ? 'bg-brand-50 text-brand-700' : 'text-ink-muted hover:bg-surface-muted hover:text-ink')}>
                    <n.icon className="h-4 w-4" /> {n.label}
                  </Link>
                );
              })}
              <button onClick={logout}
                className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </aside>

            <div>{children}</div>
          </div>
        </main>
      </RequireAuth>
      <Footer />
    </>
  );
}
