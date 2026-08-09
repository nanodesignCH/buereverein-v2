import Image from 'next/image'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { flyerGrid } from '@/data/site'
import type { Flyer } from '@/types/content'

/* Mixed tile grid per REFERENCE.md 2 and 4.7. A flyer with a preview gets an
   image tile, a flyer without one gets a purely typographic tile on a club
   tone. Placeholder images are not allowed, and covering every photo with a
   grey rectangle must still leave this section fully designed. */

const tones = [
  { surface: 'bg-[var(--color-terracotta)]', text: 'text-[var(--color-ink)]', dark: false },
  { surface: 'bg-[var(--color-brick)]', text: 'text-[var(--color-paper)]', dark: true },
  { surface: 'bg-[var(--color-mauve)]', text: 'text-[var(--color-ink)]', dark: false },
] as const

export function FlyerGrid({ flyers }: { flyers: Flyer[] }) {
  const sorted = [...flyers].sort((a, b) => a.reihenfolge - b.reihenfolge)

  return (
    <section aria-labelledby="flyer-titel" className="pt-[var(--section-gap)]">
      <div className="surface bg-[var(--color-paper)] px-[var(--gutter)]">
        <h2 id="flyer-titel" className="display-l">
          {flyerGrid.headline}
        </h2>

        <StaggerGroup
          /* Three columns, not four: at four the tile is narrower than a
             display-m headline needs and long words break out of it. The type
             scale has no intermediate size, so the grid gives way, not the
             type. An incomplete last row stays left aligned. */
          className="mt-[var(--section-gap)] grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-3"
          selector=":scope > *"
        >
          {sorted.map((flyer, index) => {
            const tone = tones[index % tones.length]!

            if (flyer.thumbnail) {
              return (
                <a
                  key={flyer.id}
                  href={flyer.datei}
                  className="group block no-underline"
                  {...(flyer.datei !== '#' ? { download: true } : {})}
                >
                  <span className="block overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-pewter)]">
                    <Image
                      src={flyer.thumbnail.url}
                      alt={flyer.thumbnail.alt}
                      width={flyer.thumbnail.width}
                      height={flyer.thumbnail.height}
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="h-auto w-full transition-transform duration-150 group-hover:scale-[1.02]"
                    />
                  </span>
                  <span className="mt-4 block text-[var(--color-ink)]">{flyer.titel}</span>
                  <span className="mt-1 block caption text-[var(--color-ink)]">PDF</span>
                </a>
              )
            }

            return (
              <a
                key={flyer.id}
                href={flyer.datei}
                /* Same aspect ratio as the printed A4 sheet, so image tiles and
                   typographic tiles sit in one even row. */
                className={`flex aspect-[744/1052] flex-col justify-between rounded-[var(--radius-surface)] p-[calc(var(--gutter)*0.75)] no-underline ${tone.surface} ${tone.text} ${tone.dark ? 'on-dark' : ''}`}
              >
                <span className="caption">PDF</span>
                <span className="display-m block text-balance font-[family-name:var(--font-display)] font-medium leading-[0.95] tracking-[-0.02em]">
                  {flyer.titel}
                </span>
              </a>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
