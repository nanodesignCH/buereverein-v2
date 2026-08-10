'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollSmoother, ScrollTrigger, EASE, MQ } from '@/lib/gsap'
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

      /* Desktop, from 768px: the horizontal band of REFERENCE.md 4.4.
         One tween, one trigger, scroll distance equals the horizontal travel. */
      mm.add(MQ.desktop, () => {
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

      /* Below 768px: a handover between exactly two cards. Only one card is
         ever visible, the next one slides up over it and takes over fully.
         No stack, no card showing underneath, no scale, no offset, no shadow.

         Performance is the point here, so the whole branch is built around
         three rules:
           - at most two cards exist in the render tree, every other one is
             display:none, not just transparent
           - the only animated property is transform, written as translate3d so
             the work stays on the compositor
           - will-change sits on the two active cards and is taken off again as
             soon as a card leaves the pair

         The colour is not animated at all. Each card carries its fixed tone and
         the change happens because a different card is now on top. */
      mm.add(MQ.mobile, () => {
        const cards = gsap.utils.toArray<HTMLElement>(':scope > li', rail)
        if (cards.length < 2) return
        const last = cards.length - 2

        /* The incoming card paints above the current one through document
           order alone, so no z-index has to be written or animated. */
        let pair = -1
        const showPair = (i: number) => {
          if (pair === i) return
          for (let k = 0; k < cards.length; k++) {
            const card = cards[k]!
            const active = k === i || k === i + 1
            card.style.display = active ? '' : 'none'
            card.style.willChange = active ? 'transform' : ''
          }
          cards[i]!.style.transform = 'translate3d(0,0,0)'
          pair = i
        }

        const proxy = { pos: 0 }
        showPair(0)
        cards[1]!.style.transform = 'translate3d(0,100%,0)'

        const tween = gsap.to(proxy, {
          pos: count - 1,
          ease: EASE.scrub,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${(count - 1) * window.innerHeight * 0.7}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(Math.round(self.progress * (count - 1)))
            },
          },
          onUpdate: () => {
            const pos = gsap.utils.clamp(0, count - 1, proxy.pos)
            const i = Math.min(last, Math.floor(pos))
            showPair(i)
            /* Only the incoming card moves. The one below it stays at zero and
               is written once per pair, not once per frame. */
            cards[i + 1]!.style.transform = `translate3d(0,${(1 - (pos - i)) * 100}%,0)`
          },
        })

        trigger.current = tween.scrollTrigger ?? null

        return () => {
          trigger.current = null
          tween.scrollTrigger?.kill()
          tween.kill()
          for (const card of cards) {
            card.style.display = ''
            card.style.transform = ''
            card.style.willChange = ''
          }
        }
      })

      mm.add(MQ.reduced, () => {
        /* No pin, no stacking. The eight surfaces stand underneath each other
           as ordinary cards, controls and progress line disappear. */
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
          {/* The base layout is the reduced motion one: a plain vertical list.
              motion-safe then switches to the mobile stack, and motion-safe:md
              to the horizontal band. Written in that order so that the safest
              layout is what renders before any script has run. */}
          <ul
            ref={strip}
            className="m-0 flex list-none flex-col gap-5 p-0
                       motion-safe:relative motion-safe:block motion-safe:h-full
                       motion-safe:md:flex motion-safe:md:flex-row motion-safe:md:gap-[var(--gutter)]"
          >
            {ressorts.map((ressort, index) => {
              const tone = tones[index % tones.length]!
              return (
                <li
                  key={ressort.slug}
                  className="w-full
                             motion-safe:absolute motion-safe:inset-0
                             motion-safe:md:static motion-safe:md:inset-auto motion-safe:md:w-[var(--track-card)] motion-safe:md:shrink-0"
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
