import { CountUp } from '@/components/motion/CountUp'

/* Large figure with a small explaining line beneath, per DESIGN.md 3. */

export function StatNumber({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <CountUp
        value={value}
        className="block font-[family-name:var(--font-display)] text-[length:var(--text-display-l)] font-medium leading-[0.95] tracking-[-0.02em] tabular-nums"
      />
      <span className="mt-3 block caption">{label}</span>
    </div>
  )
}
