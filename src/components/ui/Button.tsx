import Link from 'next/link'

/* Pill, solid and outline. Hover is CSS only and under 200ms, no GSAP.
   Inside .on-dark the colours flip so the outline stays visible on a tone. */

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  className?: string
}

const base =
  'inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] ' +
  'border px-[22px] no-underline caption transition-[background-color,color,border-color] duration-150'

const variants = {
  solid:
    'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] ' +
    'hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] ' +
    '[.on-dark_&]:border-[var(--color-paper)] [.on-dark_&]:bg-[var(--color-paper)] [.on-dark_&]:text-[var(--color-ink)] ' +
    '[.on-dark_&]:hover:bg-transparent [.on-dark_&]:hover:text-[var(--color-paper)]',
  outline:
    'border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] ' +
    'hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] ' +
    '[.on-dark_&]:border-[var(--color-paper)] [.on-dark_&]:text-[var(--color-paper)] ' +
    '[.on-dark_&]:hover:bg-[var(--color-paper)] [.on-dark_&]:hover:text-[var(--color-ink)]',
} as const

export function Button({ href, children, variant = 'solid', className = '' }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
