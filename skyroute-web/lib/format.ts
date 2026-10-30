export function formatDuration(mins: number) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${h}h ${m}m`;
}
export function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
}
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day:'2-digit', month:'short' });
}
export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-PK', { style:'currency', currency, maximumFractionDigits: 0 }).format(amount);
}
