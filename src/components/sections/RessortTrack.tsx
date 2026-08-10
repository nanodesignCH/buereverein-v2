'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollSmoother, ScrollTrigger, Observer, EASE, MQ } from '@/lib/gsap'
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
  const [active, setActive] = useState(0)

  /* Both branches fill this with their own way of reaching an entry. The
     arrows and the progress dots call it and do not need to know which
     mechanic is currently running. */
  const gotoRef = useRef<((index: number) => void) | null>(null)
  const jumpTo = useCallback((index: number) => gotoRef.current?.(index), [])

  const count = ressorts.length

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

        const st = tween.scrollTrigger
        gotoRef.current = (index) => {
          if (!st) return
          const clamped = gsap.utils.clamp(0, count - 1, index)
          const y = st.start + (st.end - st.start) * (clamped / (count - 1))
          const smoother = ScrollSmoother.get()
          if (smoother) smoother.scrollTo(y, true)
          else gsap.to(window, { scrollTo: y, duration: 0.6, ease: EASE.inOut })
        }

        return () => {
          gotoRef.current = null
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      /* Below 768px: discrete stepping through Observer, following the official
         GreenSock pattern for switching sections.

         The animation is no longer tied to the scroll position at all. That
         coupling was the reason for the stutter: a scrubbed animation has to
         follow the scroll offset, and during momentum scrolling a touch device
         does not deliver that offset continuously, so the animation always ran
         against the momentum. Here a gesture only decides a direction, and the
         card change afterwards is an ordinary timeline with its own duration
         that no longer cares about the finger. */
      mm.add(MQ.mobile, () => {
        const cards = gsap.utils.toArray<HTMLElement>(':scope > li', rail)
        if (cards.length < 2) return

        let current = 0
        let animating = false
        let observer: ReturnType<typeof Observer.create> | null = null
        let gate: ReturnType<typeof ScrollTrigger.create> | null = null

        /* Resting state: exactly one card in the render tree, everything else
           display:none, and no will-change lingering on anything. */
        const rest = (i: number) => {
          for (let k = 0; k < cards.length; k++) {
            const card = cards[k]!
            card.style.display = k === i ? '' : 'none'
            card.style.willChange = ''
          }
          gsap.set(cards, { clearProps: 'transform,opacity' })
        }
        rest(0)

        const goto = (index: number) => {
          if (animating) return
          const target = gsap.utils.clamp(0, cards.length - 1, index)
          if (target === current) return

          const direction = target > current ? 1 : -1
          const from = cards[current]!
          const to = cards[target]!

          animating = true
          setActive(target)

          /* Only the two cards taking part exist while the timeline runs. */
          to.style.display = ''
          from.style.willChange = 'transform, opacity'
          to.style.willChange = 'transform, opacity'

          gsap
            .timeline({
              defaults: { duration: 0.7, ease: EASE.inOut, force3D: true },
              onComplete: () => {
                current = target
                rest(target)
                animating = false
              },
            })
            .fromTo(to, { yPercent: 100 * direction, opacity: 1 }, { yPercent: 0 }, 0)
            .fromTo(from, { yPercent: 0, opacity: 1 }, { yPercent: -30 * direction, opacity: 0 }, 0)
        }

        /* One place decides who owns the gestures, so enabling and releasing can
           never drift apart. No shadow flag for it: the observer already knows
           whether it is enabled, and a second copy of that truth drifts.

           The smoother is deliberately not switched off. ScrollSmoother in GSAP
           3.15 has no paused() at all, and it is not needed here: smoothTouch is
           false, so there is no smoothing on touch to begin with, and while the
           observer holds preventDefault no new scroll input arrives anyway. */
        /* Taking over means the section stops moving, so it has to be in the
           right place first. A real swipe always overshoots the exact top by a
           hundred pixels or more, and since the observer then swallows all
           further input, that offset would simply stay. One pixel past the
           start on purpose: exactly on it ScrollTrigger reports isActive as
           false, which would switch the observer straight back off.
           The target comes from the trigger, not from the rectangle, because
           the rectangle lags behind the smoother while a scroll is running. */
        const snapToStart = () => {
          if (!gate) return
          const y = gate.start + 1
          const smoother = ScrollSmoother.get()
          if (smoother) smoother.scrollTo(y, true)
          else gsap.to(window, { scrollTo: y, duration: 0.4, ease: EASE.inOut })
        }

        const own = (next: boolean) => {
          if (!observer || observer.isEnabled === next) return
          if (next) {
            /* Without this the browser starts its own scroll gesture before
               JavaScript ever sees touchmove, and preventDefault comes too late.
               It is set together with the observer and taken off together with
               it, never as a static rule: while the observer is off, the page
               has to be able to scroll past this section normally, and a
               permanent touch-action none would trap the reader here. */
            section.style.touchAction = 'none'
            observer.enable()
            snapToStart()
          } else {
            observer.disable()
            section.style.touchAction = ''
          }
        }

        /* Handing the section back: from here on the page scrolls normally
           again. It takes a further gesture in the same direction, so leaving
           is deliberate and never happens by accident mid run. */
        const release = () => own(false)

        observer = Observer.create({
          target: section,
          type: 'wheel,touch,pointer',
          preventDefault: true,
          tolerance: 10,
          onUp: () => {
            if (animating) return
            if (current === cards.length - 1) release()
            else goto(current + 1)
          },
          onDown: () => {
            if (animating) return
            if (current === 0) release()
            else goto(current - 1)
          },
        })
        observer.disable()

        /* The observer only owns the gestures while the section occupies the
           viewport, and the trigger's own state is what decides that.

           An earlier version measured the section's rectangle instead. That was
           wrong twice over: ScrollTrigger switches on the scroll offset while
           ScrollSmoother moves the content by transform with a lag, so at the
           moment the toggle fired the rectangle still reported the full
           distance away. And any real swipe overshoots the exact top by a
           hundred pixels or more, so a tight tolerance can never be met. The
           result was a gate that fired correctly and an activation that threw
           the result away, which is why only the buttons worked. */
        gate = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          onToggle: (self) => own(self.isActive),
        })

        /* One exception where geometry is the better signal: when the scroll
           position sits exactly on the start, ScrollTrigger reports isActive as
           false. That happens when the section is already in place on load, and
           only then, with no scrolling under way, is the rectangle reliable. */
        own(gate.isActive === true || Math.abs(section.getBoundingClientRect().top) <= 2)

        gotoRef.current = goto

        return () => {
          gotoRef.current = null
          own(false)
          /* own() only clears this when it was the one that set it, so the
             cleanup repeats it: crossing the breakpoint must never leave the
             desktop branch with a section that swallows touch. */
          section.style.touchAction = ''
          observer?.kill()
          gate?.kill()
          for (const card of cards) {
            card.style.display = ''
            card.style.willChange = ''
          }
          gsap.set(cards, { clearProps: 'transform,opacity' })
        }
      })

      mm.add(MQ.reduced, () => {
        /* No observer, no pin. The eight surfaces stand underneath each other
           as ordinary cards, controls and progress line disappear. */
        gotoRef.current = null
      })

      return () => mm.revert()
    },
    { scope: root, dependencies: [count] },
  )

  /* Under 768px the section itself fills the viewport, so the observer can take
     over the gestures without a pin and without any scroll distance. From 768px
     nothing changes: the stage keeps its own height and the section flows. */
  return (
    <section
      ref={root}
      aria-labelledby="ressorts-titel"
      className="pt-[var(--section-gap)]
                 motion-safe:max-md:flex motion-safe:max-md:h-svh motion-safe:max-md:flex-col
                 motion-safe:max-md:overflow-hidden motion-safe:max-md:pt-[var(--header-h)] motion-safe:max-md:pb-[var(--inset)]"
    >
      <h2 id="ressorts-titel" className="display-l px-[var(--inset)] pb-[var(--gutter)] motion-safe:max-md:shrink-0">
        {ressortTrack.headline}
      </h2>

      <div className="grid gap-6 motion-safe:grid-rows-[1fr_auto_auto]
                      motion-safe:md:h-[calc(100svh-var(--header-h)-2*var(--inset))]
                      motion-safe:max-md:min-h-0 motion-safe:max-md:flex-1">
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
