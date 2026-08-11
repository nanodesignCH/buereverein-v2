'use client'

import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, DUR, EASE, STAG, MOTION } from '@/lib/gsap'

/* Tile expansion, DESIGN.md 5, point 5. This used to live inside VorstandGrid.
   It moved here unchanged when the Hauptversammlung section got the same two
   tiles, so both rasters share one implementation rather than two that drift
   apart. Nothing about the behaviour changed in the move.

   Every cell holds its height through `aspect-ratio` and what grows is an
   element inside it, which is why the layout never reflows and no neighbour
   jumps.

   The growing box sits with `align-self: start` in the cell, so its top edge is
   the cell's top edge and stays there through the whole tween: only the bottom
   edge travels. Inside it a second box carries the cell's aspect and full
   width, so its height equals the finished cell at every moment, and it is
   centred in the growing box rather than pinned to it. That is what makes the
   content ride down with the lower edge instead of being scaled. */

const START_HEIGHT = '15%'
const START_RADIUS = 'var(--radius-pill)'

const RADIUS = 'rounded-[var(--radius-surface)]'

export function Kachel({
  aspect,
  className = '',
  innerClassName = '',
  children,
}: {
  aspect: string
  className?: string
  innerClassName?: string
  children: React.ReactNode
}) {
  return (
    /* The cell. `aspect` fixes its height, the single grid area plus
       `self-start` on the child anchors the growing box at the top edge. */
    <div className={`grid ${aspect} ${className}`}>
      <div
        data-grow
        className={`relative col-start-1 row-start-1 h-full w-full self-start overflow-hidden ${RADIUS} ${innerClassName}`}
      >
        <div className={`absolute inset-x-0 top-1/2 w-full -translate-y-1/2 ${aspect}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** Registers the expansion for every `Kachel` inside `root`. One ScrollTrigger
 *  per tile, stagger by column index within a row. */
export function useKachelExpansion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(MOTION, () => {
        const kacheln = gsap.utils.toArray<HTMLElement>('[data-grow]', el)
        if (!kacheln.length) return

        /* Read, not restated, so the token in globals.css stays the only place
           the number lives. */
        const radius =
          getComputedStyle(el).getPropertyValue('--radius-surface').trim() || '24px'

        /* The collapsed state is set outright instead of being handed to a
           `fromTo`, which would only pre-render the start values of the tile
           whose tween runs first. The `to` picks these values up as its start
           when its own trigger fires. */
        gsap.set(kacheln, { height: START_HEIGHT, borderRadius: START_RADIUS })

        /* Column index straight from the live layout, so it is right at every
           breakpoint without the markup repeating the raster. All cells are
           measured in the same frame, so their rectangles are comparable: same
           top means same row, and how many cells of that row start further left
           is the column index. */
        const zellen = kacheln.map((kachel) => kachel.parentElement as HTMLElement)
        const rects = zellen.map((zelle) => zelle.getBoundingClientRect())
        const spalte = (i: number) =>
          rects.filter(
            (r, k) =>
              k !== i && Math.abs(r.top - rects[i]!.top) < 8 && r.left < rects[i]!.left - 1,
          ).length

        /* One ScrollTrigger per tile, per DESIGN.md 5, point 5. Every tile
           starts growing the moment it reaches the lower edge of the viewport,
           so the offset between the rows follows from the raster itself and is
           not scripted anywhere. Within a row the column index adds the
           stagger. The trigger is the cell, not the growing box: the cell keeps
           its height throughout, the growing box does not. */
        const tweens = kacheln.map((kachel, i) =>
          gsap.to(kachel, {
            height: '100%',
            borderRadius: radius,
            duration: DUR.slow,
            ease: EASE.out,
            delay: spalte(i) * STAG.tight,
            scrollTrigger: { trigger: zellen[i], start: 'top bottom', once: true },
          }),
        )

        return () => {
          for (const tween of tweens) {
            tween.scrollTrigger?.kill()
            tween.kill()
          }
          /* The set wrote inline styles, so crossing into reduced motion must
             not leave a collapsed raster behind. */
          gsap.set(kacheln, { clearProps: 'height,borderRadius' })
        }
      })

      /* Reduced motion: no branch at all. Nothing is registered, so no tile is
         ever collapsed and the raster stands in its finished size from the
         first frame, exactly as the markup renders it. */
      return () => mm.revert()
    },
    { scope: root },
  )
}
