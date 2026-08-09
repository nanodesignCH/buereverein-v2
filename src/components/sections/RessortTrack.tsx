'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollSmoother, ScrollTrigger, EASE, MOTION, REDUCED } from '@/lib/gsap'
import { NavArrow } from '@/components/ui/NavArrow'
import { ProgressTrack } from '@/components/ui/ProgressTrack'
import { ressortTrack } from '@/data/site'
import type { Ressort } from '@/types/content'

/* Signature element. Mechanic per REFERENCE.md 4.4, variant C from the gate:
   eight surfaces travel past, the next one always cut off at the right edge.
   Every surface carries one tone and the text colour that belongs to it, so
   the cycling happens by passing by. No colour is ever interpolated and no
   text ever sits on a tone it was not measured against. */

const tones = [
  { surface: 'bg-[var(--color-terracotta)]', text: 'text-[var(--color-ink)]', dark: false },
  { surface: 'bg-[var(--color-brick)]', text: 'text-[var(--color-paper)]', dark: true },
  { surface: 'bg-[var(--color-mauve)]', text: 'text-[var(--color-ink)]', dark: false },
] as const

/* The call to action, chosen on 09.08.2026: a typographic link, no button.
   It inherits the card's text colour, so it is exactly the pairing that was
   already measured per tone and can never land on an unchecked combination.

   The card itself stays the link. This is a span inside it, so there is one
   focus target per card and no interactive element nested in another. The
   hover rides on group-hover, is pure CSS and runs 150ms. Underline thickness
   carries it, which is the "Umrissstärke" option in DESIGN.md 5, because a
   colour change is not available: the text already sits at full contrast. */

const CTA_LABEL = 'Mehr erfahren'

const ctaLink =
  'mt-6 inline-flex items-center gap-2 caption underline decoration-1 underline-offset-[6px] ' +
  '[transition:text-decoration-thickness_150ms] group-hover:decoration-2'

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current stroke-[1.5] ${className}`}>
      <path d="M5 12h13M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function RessortTrack({ ressorts }: { ressorts: Ressort[] }) {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLUListElement>(null)
  const trigger = useRef<InstanceType<typeof ScrollTrigger> | null>(null)
  const [active, setActive] = useState(0)

  const count = ressorts.length

  const jumpTo = useCallback((index: number) => {
    const st = trigger.current
    if (!st) return
    const clamped = gsap.utils.clamp(0, count - 1, index)
    const y = st.start + (st.end - st.start) * (clamped / (count - 1))
    const smoother = ScrollSmoother.get()
    if (smoother) smoother.scrollTo(y, true)
    else gsap.to(window, { scrollTo: y, duration: 0.6, ease: EASE.inOut })
  }, [count])

  useGSAP(
    () => {
      const section = root.current
      const view = viewport.current
      const rail = strip.current
      if (!section || !view || !rail) return

      const mm = gsap.matchMedia()

      mm.add(MOTION, () => {
        const distance = () => Math.max(0, rail.scrollWidth - view.clientWidth)

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: EASE.scrub,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(Math.round(self.progress * (count - 1)))
            },
          },
        })

        trigger.current = tween.scrollTrigger ?? null

        return () => {
          trigger.current = null
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      mm.add(REDUCED, () => {
        /* No pin, no scrub. The surfaces stack, controls disappear. */
        trigger.current = null
      })

      return () => mm.revert()
    },
    { scope: root, dependencies: [count] },
  )

  return (
    <section ref={root} aria-labelledby="ressorts-titel" className="pt-[var(--section-gap)]">
      <h2 id="ressorts-titel" className="display-l px-[var(--inset)] pb-[var(--gutter)]">
        {ressortTrack.headline}
      </h2>

      <div className="grid gap-6 motion-safe:h-[calc(100svh-var(--header-h)-2*var(--inset))] motion-safe:grid-rows-[1fr_auto_auto]">
        <div ref={viewport} className="overflow-hidden px-[var(--inset)]">
          <ul
            ref={strip}
            className="m-0 flex list-none gap-[var(--gutter)] p-0 motion-safe:h-full motion-reduce:flex-col"
          >
            {ressorts.map((ressort, index) => {
              const tone = tones[index % tones.length]!
              return (
                <li
                  key={ressort.slug}
                  className="motion-safe:w-[var(--track-card)] motion-safe:shrink-0 motion-reduce:w-full"
                >
                  <Link
                    href={`/ressorts/${ressort.slug}`}
                    className={`group grid h-full grid-rows-[auto_1fr_auto] gap-5 rounded-[var(--radius-surface)] p-[var(--gutter)] no-underline ${tone.surface} ${tone.text} ${tone.dark ? 'on-dark' : ''}`}
                  >
                    <span className="caption">
                      Ressort {index + 1} von {count}
                    </span>
                    <h3 className="display-l max-w-[11ch] self-start">{ressort.titel}</h3>
                    <div className="self-end">
                      <p className="max-w-[40ch]">{ressort.teaser}</p>
                      <span className={ctaLink}>
                        {CTA_LABEL}
                        <Arrow className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Controls exist only where there is something to control. */}
        <div className="flex items-center gap-[10px] px-[var(--inset)] motion-reduce:hidden">
          <NavArrow
            direction="prev"
            label="Vorheriges Ressort"
            disabled={active === 0}
            onClick={() => jumpTo(active - 1)}
          />
          <NavArrow
            direction="next"
            label="Nächstes Ressort"
            disabled={active === count - 1}
            onClick={() => jumpTo(active + 1)}
          />
        </div>

        <div className="px-[var(--inset)] motion-reduce:hidden">
          <ProgressTrack
            count={count}
            active={active}
            onJump={jumpTo}
            labelFor={(i) => `Zu ${ressorts[i]?.titel ?? `Eintrag ${i + 1}`}`}
          />
        </div>
      </div>
    </section>
  )
}
