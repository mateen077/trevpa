import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-surface-border bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-brand-600 text-white font-bold">S</div>
            <span className="text-lg font-semibold">SkyRoute</span>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            Premium flight booking for travellers worldwide. Compare, book and manage with confidence.
          </p>
          <div className="mt-4 flex gap-3 text-ink-muted">
            <Globe className="h-5 w-5" />
            <MessageCircle className="h-5 w-5" />
            <Send className="h-5 w-5" />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-ink">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/legal/privacy" className="hover:text-ink">Privacy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-ink">Terms</Link></li>
            <li><Link href="/legal/refund" className="hover:text-ink">Cancellation and Refund</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +92 000 0000000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@skyroute.test</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Lahore, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-subtle sm:flex-row">
          <span>SkyRoute. All rights reserved.</span>
          <span>Made for travellers, by travellers.</span>
        </div>
      </div>
    </footer>
  );
}
