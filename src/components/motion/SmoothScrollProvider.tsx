'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollSmoother, ScrollTrigger, Observer, MOTION } from '@/lib/gsap'

/* Created once in the root layout, survives route changes.
   Under reduced motion no smoother is created at all, the wrapper markup stays
   in the DOM and native scroll takes over. */

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const wrapper = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* Development only handle, so the scroll states can be driven and
         inspected from the console. Never present in a production build. */
      if (process.env.NODE_ENV === 'development') {
        Object.assign(window, { __gsap: { gsap, ScrollTrigger, ScrollSmoother, Observer } })
      }

      /* Development only: ?nosmooth skips the smoother so pin distances can be
         inspected against plain native scrolling. Never active in production. */
      const skip =
        process.env.NODE_ENV === 'development' &&
        new URLSearchParams(window.location.search).has('nosmooth')

      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        if (skip) return
        const smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.2,
          smoothTouch: false,
          effects: false,
        })
        return () => smoother.kill()
      })
      return () => mm.revert()
    },
    { scope: wrapper },
  )

  /* On a route change: jump to the top without animation, then refresh after
     the new page has rendered. Without this the pin distances on the second
     page are wrong and the page starts halfway down. */
  useGSAP(
    () => {
      ScrollSmoother.get()?.scrollTo(0, false)
      const id = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => cancelAnimationFrame(id)
    },
    { dependencies: [pathname] },
  )

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  )
}
