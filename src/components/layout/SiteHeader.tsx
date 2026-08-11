import Link from 'next/link'
import Image from 'next/image'
import { nav, primaryAction } from '@/data/site'
import { Button } from '@/components/ui/Button'

/* Fixed, therefore it must sit outside #smooth-wrapper. Inside the wrapper
   position fixed does not behave as expected. */

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center gap-[var(--gutter)] bg-[var(--color-paper)] px-[var(--inset)] max-lg:justify-between">
      {/* Horizontal lockup, measured: box 1100x280, visible mark 1040x207.
          Two things follow from that and neither is guesswork.

          The transparent margin is uneven, 27px above the mark and 46px below,
          so the mark sits 3.57 percent of the box height above the box centre.
          Centring the box would leave visibly more air underneath the logo than
          above it, hence the translate, which is a percentage of the element's
          own height and therefore correct at both bar heights.

          The visible mark is only 74 percent of the box height, against 91
          percent for the stacked lockup, so the same box height would render a
          noticeably smaller mark. Sizes are set on the visible mark instead: it
          reaches 32px in the 72px bar and 28px in the 64px one, which is a good
          40 to 44 percent of the bar and leaves 18 to 20px of air. A horizontal
          lockup carries its presence through width, so it does not need the
          47px of mark height the stacked one had, and at that height it would
          run 238px wide and crowd the navigation at 1024.

          width and height are the display size on purpose, not the intrinsic
          1100x280. That is what makes next/image emit a 1x and a 2x candidate;
          with a sizes hint it served a single small file, which was visibly
          soft on a retina screen. */}
      <Link href="/" className="flex shrink-0 items-center no-underline">
        <Image
          src="/images/logo_buereverein_horizontal.png"
          alt="BÜREVEREIN"
          width={170}
          height={43}
          priority
          className="h-[38px] w-auto translate-y-[3.57%] sm:h-[43px]"
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
