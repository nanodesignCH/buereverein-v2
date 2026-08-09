/* Hairline in pewter. Pewter is only ever a divider, frame or inactive dot,
   never a text colour. */

export function Divider({ className = '' }: { className?: string }) {
  return <hr className={`m-0 h-px border-0 bg-[var(--color-pewter)] ${className}`} />
}
