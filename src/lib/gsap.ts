'use client'

/* The only place where GSAP plugins are registered. Import from here, never
   from 'gsap/ScrollTrigger' directly, otherwise a second registration slips in. */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin }

/* Constants per DESIGN.md 5. There is no second source for these numbers. */

export const DUR = { fast: 0.6, base: 0.9, slow: 1.2 } as const
export const EASE = { out: 'power3.out', inOut: 'power2.inOut', scrub: 'none' } as const
export const STAG = { tight: 0.06, base: 0.08, loose: 0.1 } as const

/* Travel distances in percent of the element's own size. */
export const SHIFT = { line: 115, word: 110, tile: 40 } as const

/* Tolerance for setting video.currentTime, in seconds. Below this no seek is
   issued, otherwise the scrub floods the decoder. */
export const SEEK_EPSILON = 1 / 48

export const MOTION = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
