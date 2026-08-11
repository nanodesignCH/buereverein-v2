'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollSmoother, ScrollTrigger, Observer, DUR, EASE, STAG, MQ } from '@/lib/gsap'
import { NavArrow } from '@/components/ui/NavArrow'
import { ProgressTrack } from '@/components/ui/ProgressTrack'
import { ressortTrack } from '@/data/site'
import type { Ressort } from '@/types/content'

/* Signature element. Mechanic per REFERENCE.md 4.4.

   Three layouts live in this one section and exactly one of them is visible at
   a time, which is why none of them ever needs to hide another one by hand:

   1. The plain vertical list is the markup itself. It is what renders before a
      single line of script has run and it is the whole of the reduced motion
      case.
   2. From 768px `motion-safe` turns that same list into the horizontal band,
      and a second layer holds the eight compact tiles the band resolves into.
   3. Below 768px `motion-safe` hides the list and shows two views of four
      tiles each.

   The band and the tiles carry the same eight links, so whichever layer is not
   in play is taken out of the accessibility tree, either by `display: none`
   from the media query or by `inert`. A reader never meets a title twice. */

const tones = [
  { surface: 'bg-[var(--color-terracotta)]', text: 'text-[var(--color-ink)]', dark: false },
  { surface: 'bg-[var(--color-brick)]', text: 'text-[var(--color-paper)]', dark: true },
  { surface: 'bg-[var(--color-mauve)]', text: 'text-[var(--color-ink)]', dark: false },
] as const

const toneOf = (index: number) => tones[index % tones.length]!

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
  'inline-flex items-center gap-2 caption underline decoration-1 underline-offset-[6px] ' +
  '[transition:text-decoration-thickness_150ms] group-hover:decoration-2'

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current stroke-[1.5] ${className}`}>
      <path d="M5 12h13M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* The compact tile. A quarter of a phone screen and an eighth of a desktop
   stage is not a surface a 30 word teaser survives on, so the teaser is left
   out rather than set smaller: the type scale has no step below display-m and
   inventing one would break DESIGN.md 3. Title and call to action remain, and
   both keep their full size. Long single words like "Geschichten" are wider
   than the tile at 375px, so the title hyphenates; the document is de-CH, so
   the browser breaks it in the right places. */
function RessortTile({ ressort, index }: { ressort: Ressort; index: number }) {
  const tone = toneOf(index)
  return (
    <Link
      href={`/ressorts/${ressort.slug}`}
      className={`group flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[var(--radius-surface)]
                  p-[var(--inset)] no-underline ${tone.surface} ${tone.text} ${tone.dark ? 'on-dark' : ''}`}
    >
      <h3 className="display-m hyphens-auto break-words">{ressort.titel}</h3>
      <span className={ctaLink}>
        {CTA_LABEL}
        <Arrow className="size-3.5" />
      </span>
    </Link>
  )
}

/* Four tiles per view below 768px, two views for eight ressorts. */
const VIEW_SIZE = 4

export function RessortTrack({ ressorts }: { ressorts: Ressort[] }) {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLUListElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const views = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(0)
  /* How many entries the controls step through: eight cards in the band, two
     views on a phone. The progress line reads this, not the ressort count. */
  const [steps, setSteps] = useState(ressorts.length)
  /* True once the band has resolved into the grid. Controls and progress line
     have nothing left to point at then, and the band hands over its links. */
  const [resolved, setResolved] = useState(false)

  /* Both branches fill this with their own way of reaching an entry. The
     arrows and the progress dots call it and do not need to know which
     mechanic is currently running. */
  const gotoRef = useRef<((index: number) => void) | null>(null)
  const jumpTo = useCallback((index: number) => gotoRef.current?.(index), [])

  const count = ressorts.length
  const viewCount = Math.ceil(count / VIEW_SIZE)

  useGSAP(
    () => {
      const section = root.current
      const view = viewport.current
      const rail = strip.current
      const gridLayer = grid.current
      const viewLayer = views.current
      if (!section || !view || !rail || !gridLayer || !viewLayer) return

      const mm = gsap.matchMedia()

      /* Desktop, from 768px: the horizontal band, and after the last card the
         grid resolution. Both hang off one ScrollTrigger, as DESIGN.md 5
         requires, and the pin simply runs 80vh longer than the band needs. */
      mm.add(MQ.desktop, () => {
        const cards = gsap.utils.toArray<HTMLElement>(':scope > li', rail)
        const tiles = gsap.utils.toArray<HTMLElement>(':scope > a', gridLayer)
        if (!cards.length || !tiles.length) return

        /* Scroll pixels the band needs, and the pixels the resolution gets on
           top. Both are read fresh on every update, so a window resize needs
           nothing beyond ScrollTrigger's own refresh.

           Measured against the strip's own content box, not the stage. The
           stage carries --inset as padding on both sides, so subtracting its
           clientWidth stops the band two insets early and leaves the last card
           clipped at the right edge when the resolution starts. Against
           rail.clientWidth the last card comes to rest with exactly the margin
           the first one started with. */
        const bandDistance = () => Math.max(0, rail.scrollWidth - rail.clientWidth)
        const gridDistance = () => window.innerHeight * 0.8
        const total = () => bandDistance() + gridDistance()

        /* The resting state of a tile: its own grid cell, blown up to the width
           of a band card and pushed off the left edge of the stage. Measured
           with offsetWidth, which unlike a bounding rectangle is not affected
           by the transform that is already on the element.

           Only x and scale ever change, so the layout is the static CSS grid at
           all times. Nothing here touches width, height or a grid property. */
        const startScale = () => {
          const tileWidth = tiles[0]!.offsetWidth
          return tileWidth > 0 ? cards[0]!.offsetWidth / tileWidth : 1
        }
        const startX = () => -(view.clientWidth + cards[0]!.offsetWidth)

        const restGrid = () => gsap.set(tiles, { x: startX(), scale: startScale() })
        restGrid()

        /* Not a scrub. The stagger and the ease this transition is specified
           with are timeline properties, and DESIGN.md 5 rules out an ease on a
           scrub. So the timeline plays once the band is through and reverses
           when the reader scrolls back up, which is the clean reversal asked
           for without putting a second trigger on the section. */
        const gridTL = gsap
          .timeline({ paused: true, onReverseComplete: restGrid })
          .to(rail, { opacity: 0, duration: DUR.fast, ease: EASE.out }, 0)
          .to(tiles, { x: 0, scale: 1, duration: DUR.base, ease: EASE.out, stagger: STAG.tight }, 0)

        /* ScrollTrigger's own scrub is a tween that restarts towards the target
           value on every update, and doing it by hand is what lets the band keep
           its exact one to one mapping while the trigger runs 80vh past the end
           of that mapping.

           `ease: 'expo'` is not a decoration and not a violation of the "never
           an ease on a scrub" rule in DESIGN.md 5. That rule is about the
           animation being scrubbed, and that one stays linear: scroll pixels map
           to band pixels one to one, unchanged. This ease belongs to the catch
           up, and it is the exact ease ScrollTrigger uses for `scrub: 1` itself,
           see ScrollTrigger.js where the scrubTween is created. With a linear
           catch up a restarted one second tween covers barely two percent of the
           remaining distance per frame, so the band visibly drags behind the
           finger. expo.out is heavily front loaded and lands where the built in
           scrub lands. */
        const slide = gsap.quickTo(rail, 'x', { duration: 1, ease: 'expo' })

        let lastActive = -1
        let isResolved = false

        const apply = (progress: number, immediate: boolean) => {
          const band = bandDistance()
          const scrolled = progress * total()
          const bandProgress = band > 0 ? gsap.utils.clamp(0, 1, scrolled / band) : 1

          if (immediate) gsap.set(rail, { x: -band * bandProgress })
          else slide(-band * bandProgress)

          const next = Math.round(bandProgress * (count - 1))
          if (next !== lastActive) {
            lastActive = next
            setActive(next)
          }

          /* One pixel of slack so the boundary itself does not flicker between
             the two states while the scrub settles. */
          const wantsGrid = scrolled > band + 1
          if (wantsGrid !== isResolved) {
            isResolved = wantsGrid
            setResolved(wantsGrid)
            if (wantsGrid) gridTL.play()
            else gridTL.reverse()
          }
        }

        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${total()}`,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => apply(self.progress, false),
          onRefresh: (self) => {
            /* Cell size and band width both moved, so the tween's recorded
               start values are stale. Only worth redoing while the tiles are
               still parked: once they sit in the grid they are at x 0 and
               scale 1 and that holds at any width. */
            if (!isResolved) {
              gridTL.invalidate()
              restGrid()
            }
            apply(self.progress, true)
          },
        })

        setSteps(count)

        gotoRef.current = (index) => {
          const clamped = gsap.utils.clamp(0, count - 1, index)
          const y = st.start + bandDistance() * (clamped / (count - 1))
          const smoother = ScrollSmoother.get()
          if (smoother) smoother.scrollTo(y, true)
          else gsap.to(window, { scrollTo: y, duration: 0.6, ease: EASE.inOut })
        }

        return () => {
          gotoRef.current = null
          setResolved(false)
          st.kill()
          gridTL.kill()
          gsap.set(rail, { clearProps: 'transform,opacity' })
          gsap.set(tiles, { clearProps: 'transform' })
        }
      })

      /* Below 768px: two views of four tiles, stepped through by gesture.

         The animation is not tied to the scroll position at all. That coupling
         was the reason for the stutter: a scrubbed animation has to follow the
         scroll offset, and during momentum scrolling a touch device does not
         deliver that offset continuously, so the animation always ran against
         the momentum. Here a gesture only decides a direction, and the change
         afterwards is an ordinary timeline with its own duration that no longer
         cares about the finger. */
      mm.add(MQ.mobile, () => {
        const panes = gsap.utils.toArray<HTMLElement>(':scope > [data-view]', viewLayer)
        if (panes.length < 2) return

        const tilesOf = (pane: HTMLElement) => gsap.utils.toArray<HTMLElement>(':scope > a', pane)

        let current = 0
        let animating = false
        let observer: ReturnType<typeof Observer.create> | null = null
        let gate: ReturnType<typeof ScrollTrigger.create> | null = null

        /* Resting state: exactly one view in the render tree, everything else
           display:none, and no will-change lingering on anything. */
        const rest = (i: number) => {
          panes.forEach((pane, k) => {
            pane.style.display = k === i ? '' : 'none'
            for (const tile of tilesOf(pane)) tile.style.willChange = ''
          })
          gsap.set(panes.flatMap(tilesOf), { clearProps: 'transform,opacity' })
        }
        rest(0)

        const goto = (index: number) => {
          if (animating) return
          const target = gsap.utils.clamp(0, panes.length - 1, index)
          if (target === current) return

          const direction = target > current ? 1 : -1
          const from = panes[current]!
          const to = panes[target]!

          animating = true
          setActive(target)

          /* Only the two views taking part exist while the timeline runs. */
          to.style.display = ''
          const leaving = tilesOf(from)
          const entering = tilesOf(to)
          for (const tile of [...leaving, ...entering]) tile.style.willChange = 'transform, opacity'

          /* Travel is the stage height in pixels, not a share of the tile's own
             height: a tile is a quarter of the stage, so yPercent 100 would
             only drop it into the row below instead of off the stage. */
          const span = view.clientHeight

          gsap
            .timeline({
              defaults: { duration: 0.7, ease: EASE.inOut, force3D: true },
              onComplete: () => {
                current = target
                rest(target)
                animating = false
              },
            })
            .fromTo(
              entering,
              { y: span * direction, opacity: 1 },
              { y: 0, stagger: STAG.tight },
              0,
            )
            .fromTo(
              leaving,
              { y: 0, opacity: 1 },
              { y: -span * direction, opacity: 0, stagger: STAG.tight },
              0,
            )
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
            if (current === panes.length - 1) release()
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

        setSteps(panes.length)
        setActive(0)
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
          for (const pane of panes) {
            pane.style.display = ''
            for (const tile of tilesOf(pane)) tile.style.willChange = ''
          }
          gsap.set(panes.flatMap(tilesOf), { clearProps: 'transform,opacity' })
        }
      })

      mm.add(MQ.reduced, () => {
        /* No observer, no pin, no resolution. The eight surfaces stand
           underneath each other as ordinary cards, controls and progress line
           disappear. */
        gotoRef.current = null
        setResolved(false)
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
        {/* The stage. Both overlay layers are absolute inside it, so they
            already sit within its padding, and anything travelling in from
            outside is clipped instead of widening the page. */}
        <div ref={viewport} className="relative overflow-hidden px-[var(--inset)]">
          {/* The base layout is the reduced motion one: a plain vertical list.
              motion-safe:md turns it into the horizontal band, motion-safe
              below md takes it out because the tile views take over there. */}
          <ul
            ref={strip}
            inert={resolved}
            className="m-0 flex list-none flex-col gap-5 p-0
                       motion-safe:max-md:hidden
                       motion-safe:md:h-full motion-safe:md:flex-row motion-safe:md:gap-[var(--gutter)]"
          >
            {ressorts.map((ressort, index) => {
              const tone = toneOf(index)
              return (
                <li
                  key={ressort.slug}
                  className="w-full motion-safe:md:w-[var(--track-card)] motion-safe:md:shrink-0"
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
                      <span className={`mt-6 ${ctaLink}`}>
                        {CTA_LABEL}
                        <Arrow className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Grid resolution, from 768px only. Four by two from 1024px, two by
              four below that. The layout is plain CSS grid and stays that way:
              the entry animates x and scale, nothing else. */}
          <div
            ref={grid}
            inert={!resolved}
            aria-label="Alle Ressorts"
            /* px, not p: `inset-0` resolves against the padding box, so this
               layer spans the full width and has to bring the stage's own
               --inset itself, otherwise the tiles sit flush against the window
               edge while the band sits inside the inset. Vertically it stays
               flush, so the grid occupies exactly the box the band occupied. */
            className="absolute inset-0 hidden gap-[var(--inset)] px-[var(--inset)]
                       motion-safe:md:grid motion-safe:md:grid-cols-2 motion-safe:md:grid-rows-4
                       motion-safe:lg:grid-cols-4 motion-safe:lg:grid-rows-2"
          >
            {ressorts.map((ressort, index) => (
              <RessortTile key={ressort.slug} ressort={ressort} index={index} />
            ))}
          </div>

          {/* Below 768px: four tiles per view, two views. */}
          <div ref={views} className="absolute inset-0 hidden motion-safe:max-md:block">
            {Array.from({ length: viewCount }, (_, v) => (
              <div
                key={v}
                data-view={v}
                /* --inset on all four sides and the same value between the
                   tiles, so the outer margin and the inner gap are one rhythm
                   and the block of four sits evenly in the stage. */
                className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[var(--inset)] p-[var(--inset)]"
              >
                {ressorts.slice(v * VIEW_SIZE, v * VIEW_SIZE + VIEW_SIZE).map((ressort, i) => (
                  <RessortTile key={ressort.slug} ressort={ressort} index={v * VIEW_SIZE + i} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Controls exist only where there is something to control. They keep
            their space once the grid has resolved, so the stage does not resize
            underneath a running pin, but visibility:hidden takes them out of
            the tab order and out of the accessibility tree. */}
        <div
          className={`flex items-center gap-[10px] px-[var(--inset)] motion-reduce:hidden ${
            resolved ? 'invisible' : ''
          }`}
        >
          <NavArrow
            direction="prev"
            label={steps === count ? 'Vorheriges Ressort' : 'Vorherige Ansicht'}
            disabled={active === 0}
            onClick={() => jumpTo(active - 1)}
          />
          <NavArrow
            direction="next"
            label={steps === count ? 'Nächstes Ressort' : 'Nächste Ansicht'}
            disabled={active === steps - 1}
            onClick={() => jumpTo(active + 1)}
          />
        </div>

        <div className={`px-[var(--inset)] motion-reduce:hidden ${resolved ? 'invisible' : ''}`}>
          <ProgressTrack
            count={steps}
            active={active}
            onJump={jumpTo}
            labelFor={(i) =>
              steps === count
                ? `Zu ${ressorts[i]?.titel ?? `Eintrag ${i + 1}`}`
                : `Zu den Ressorts ${i * VIEW_SIZE + 1} bis ${Math.min((i + 1) * VIEW_SIZE, count)}`
            }
          />
        </div>
      </div>
    </section>
  )
}
