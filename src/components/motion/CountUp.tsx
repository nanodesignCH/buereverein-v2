'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, DUR, EASE, MOTION } from '@/lib/gsap'

/* Counts up once on first entry, per REFERENCE.md 4.3.
   The final value is what gets rendered, so it is correct without JavaScript,
   correct under reduced motion and causes no layout shift. */

export function CountUp({ value, className }: { value: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const node = el.current
      if (!node) return
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const proxy = { v: 0 }
        const tween = gsap.to(proxy, {
          v: value,
          duration: DUR.slow,
          ease: EASE.out,
          onUpdate: () => {
            node.textContent = String(Math.round(proxy.v))
          },
          onComplete: () => {
            node.textContent = String(value)
          },
          scrollTrigger: { trigger: node, start: 'top 85%', once: true },
        })
        return () => {
          tween.kill()
          node.textContent = String(value)
        }
      })
      return () => mm.revert()
    },
    { scope: el, dependencies: [value] },
  )

  return (
    <span ref={el} className={className}>
      {value}
    </span>
  )
}
