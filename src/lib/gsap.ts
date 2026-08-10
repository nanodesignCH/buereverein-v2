'use client'

/* The only place where GSAP plugins are registered. Import from here, never
   from 'gsap/ScrollTrigger' directly, otherwise a second registration slips in. */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin, Observer)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin, Observer }

/* Constants per DESIGN.md 5. There is no second source for these numbers. */

export const DUR = { fast: 0.6, base: 0.9, slow: 1.2 } as const
export const EASE = { out: 'power3.out', inOut: 'power2.inOut', scrub: 'none' } as const
export const STAG = { tight: 0.06, base: 0.08, loose: 0.1 } as const

/* Travel distances in percent of the element's own size. */
export const SHIFT = { line: 115, word: 110, tile: 40 } as const

export const MOTION = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'

/* Breakpoint between the mobile and the desktop mechanic, the same 768px that
   Tailwind's md: uses. The two queries are written so that they can never both
   match: 767.98 and 768 leave no gap and no overlap, so at exactly 768px only
   the desktop branch runs and no section ever holds two ScrollTriggers. */
export const MQ = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
  reduced: REDUCED,
} as const
