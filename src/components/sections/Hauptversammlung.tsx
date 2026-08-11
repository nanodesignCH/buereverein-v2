'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Kachel, useKachelExpansion } from '@/components/motion/KachelExpansion'
import type { ImageRef } from '@/types/content'

/* REFERENCE.md 4.5b. The group picture stood alone under the text and read as
   a stray photograph. It is now one of two tiles of equal height: picture left,
   the section's text right on a full terracotta surface.

   Tile treatment, radius and gutter are the ones of the committee raster, and
   literally so: both use the same `Kachel` and the same expansion from
   /components/motion/KachelExpansion.tsx. Two tiles instead of seven, so each
   one is correspondingly wider. */

/* Both tiles share one aspect, which is what makes them equally tall side by
   side. It changes with the breakpoint because the text has to fit inside the
   tile at every width: the narrower the tile, the more lines the same two
   paragraphs take, so the tile gets taller in proportion. The picture is 3:2 at
   the source and stays closest to it where the tiles are widest. */
const ASPECT = 'aspect-[3/4] lg:aspect-[1/1] xl:aspect-[3/2]'

export function Hauptversammlung({
  headline,
  absaetze,
  gruppenbild,
}: {
  headline: string
  absaetze: readonly string[]
  gruppenbild: ImageRef
}) {
  const root = useRef<HTMLElement>(null)
  useKachelExpansion(root)

  return (
    <section
      ref={root}
      aria-labelledby="hauptversammlung-titel"
      className="pt-[var(--section-gap)]"
    >
      <div className="surface bg-[var(--color-paper)] px-[var(--gutter)]">
        {/* The section title keeps its place above the raster. */}
        <h2 id="hauptversammlung-titel" className="display-l">
          {headline}
        </h2>

        {/* One column below 768, picture first, as in the markup order. */}
        <div className="mt-[var(--section-gap)] grid grid-cols-1 items-start gap-[var(--gutter)] md:grid-cols-2">
          <figure className="m-0">
            <Kachel aspect={ASPECT}>
              <Image
                src={gruppenbild.url}
                alt={gruppenbild.alt}
                width={gruppenbild.width}
                height={gruppenbild.height}
                sizes="(min-width: 768px) 45vw, 92vw"
                className="h-full w-full object-cover"
              />
            </Kachel>
          </figure>

          {/* Ink on terracotta per the contrast table in DESIGN.md 2, never
              paper. */}
          <Kachel aspect={ASPECT} innerClassName="bg-[var(--color-terracotta)]">
            <div className="flex h-full items-center p-[var(--inset)] text-[var(--color-ink)]">
              {/* Fluid body size, --text-body-fluid: the tile is 736px wide on
                  a 16 inch display in full screen, where a fixed 16px reads as
                  too small in it. Flat below 1024, so the narrow breakpoints
                  keep the size the tile aspect above was set for. */}
              <div className="space-y-5 text-[length:var(--text-body-fluid)]">
                {absaetze.map((absatz) => (
                  <p key={absatz} className="measure">
                    {absatz}
                  </p>
                ))}
              </div>
            </div>
          </Kachel>
        </div>
      </div>
    </section>
  )
}
