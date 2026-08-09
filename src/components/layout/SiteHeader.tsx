import Link from 'next/link'
import { nav, primaryAction } from '@/data/site'
import { Button } from '@/components/ui/Button'

/* Fixed, therefore it must sit outside #smooth-wrapper. Inside the wrapper
   position fixed does not behave as expected. */

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center gap-[var(--gutter)] bg-[var(--color-paper)] px-[var(--inset)] max-lg:justify-between">
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)] no-underline"
      >
        BÜREVEREIN
      </Link>

      <nav aria-label="Hauptnavigation" className="mx-auto flex gap-[clamp(16px,2.5vw,36px)] max-lg:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="caption text-[var(--color-ink)] no-underline hover:underline hover:underline-offset-4"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Button href={primaryAction.href}>{primaryAction.label}</Button>
    </header>
  )
}
