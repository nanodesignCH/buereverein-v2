'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, DUR, EASE, STAG, SHIFT, MOTION } from '@/lib/gsap'

/* Staggered entry of grid elements. One ScrollTrigger, once only.
   Under reduced motion nothing is registered at all, so the children keep
   their normal rendered state and are fully visible. */

export function StaggerGroup({
  children,
  className,
  selector = ':scope > *',
}: {
  children: React.ReactNode
  className?: string
  selector?: string
}) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const items = gsap.utils.toArray<HTMLElement>(selector, el)
      if (!items.length) return

      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const tween = gsap.from(items, {
          yPercent: SHIFT.tile,
          autoAlpha: 0,
          duration: DUR.base,
          ease: EASE.out,
          stagger: STAG.tight,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })
        return () => tween.kill()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
