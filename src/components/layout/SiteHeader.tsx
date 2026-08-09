import Link from 'next/link'
import Image from 'next/image'
import { nav, primaryAction } from '@/data/site'
import { Button } from '@/components/ui/Button'

/* Fixed, therefore it must sit outside #smooth-wrapper. Inside the wrapper
   position fixed does not behave as expected. */

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center gap-[var(--gutter)] bg-[var(--color-paper)] px-[var(--inset)] max-lg:justify-between">
      {/* The logo is a stacked lockup and carries 15px of transparent margin on
          every side, so the visible mark ends up at about 92 percent of the box.
          The bar height is the fixed quantity and the logo adapts to it: 52px
          next to a 72px bar, 42px next to a 64px one, which leaves 10 to 11px
          of air above and below.
          width and height are the display size on purpose, not the intrinsic
          480x327. That is what makes next/image emit a 1x and a 2x candidate;
          with a sizes hint it served a single 80px file, which was visibly soft
          on a retina screen. */}
      <Link href="/" className="flex shrink-0 items-center no-underline">
        <Image
          src="/images/logo_buereverein.png"
          alt="BÜREVEREIN"
          width={76}
          height={52}
          priority
          className="h-[42px] w-auto sm:h-[52px]"
        />
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
