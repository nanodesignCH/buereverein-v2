'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, SEEK_EPSILON, MQ } from '@/lib/gsap'
import { MaskedHeading } from '@/components/motion/MaskedHeading'
import { Button } from '@/components/ui/Button'
import { hero, primaryAction } from '@/data/site'

/* Mechanic per REFERENCE.md 4.1, variant A from the prototype gate.

   The video source is deliberately absent from the markup and only assigned
   inside the desktop branch. Below 768px the element therefore never gets a
   src and the browser never requests the 15.75 MB file: scrubbing currentTime
   is not achievable smoothly on touch and fights the native scroll, so there
   is nothing on mobile the video could be used for. The poster carries the
   section instead. */

const VIDEO_SRC = '/video/hero_video_scrub.mp4'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useGSAP(
    () => {
      const section = root.current
      const el = video.current
      if (!section || !el) return

      const mm = gsap.matchMedia()

      mm.add(MQ.desktop, () => {
        el.src = VIDEO_SRC
        const proxy = { time: 0 }
        let tween: gsap.core.Tween | null = null
        let frame = 0

        /* The seek runs in its own frame loop, not in the tween's onUpdate.
           A tick that lands before the file is seekable would otherwise be
           lost for good, because a finished scrub stops ticking. */
        const sync = () => {
          frame = requestAnimationFrame(sync)
          if (el.readyState < 2 || el.seeking || !el.seekable.length) return
          const target = Math.min(proxy.time, el.seekable.end(0))
          if (Math.abs(el.currentTime - target) > SEEK_EPSILON) el.currentTime = target
        }
        frame = requestAnimationFrame(sync)

        const start = () => {
          if (!Number.isFinite(el.duration) || el.duration <= 0) return
          tween = gsap.to(proxy, {
            time: el.duration - 0.05,
            ease: EASE.scrub,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=100%',
              pin: true,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        }

        if (el.readyState >= 1) start()
        else el.addEventListener('loadedmetadata', start, { once: true })

        return () => {
          cancelAnimationFrame(frame)
          el.removeEventListener('loadedmetadata', start)
          tween?.scrollTrigger?.kill()
          tween?.kill()
          /* Crossing below 768px drops the source again, so a resize does not
             leave a decoded video sitting in memory on a phone sized viewport. */
          el.removeAttribute('src')
          el.load()
        }
      })

      /* Mobile and reduced motion share the same answer: no pin, no scrub, no
         video. The poster stands and the section scrolls on normally. The
         headline reveal is not registered here at all, it lives in
         MaskedHeading and runs identically on every width. */

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="h-svh pb-[var(--inset)] pt-[var(--header-h)]">
      <div className="surface on-dark relative h-full bg-[var(--color-ink)]">
        {/* Poster underneath the video. It is the only background on mobile and
            under reduced motion, and on desktop it stands until the first frame
            is decoded. The section is therefore never empty. */}
        <img
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          width={1664}
          height={1248}
          className="hero-media"
        />
        {/* No src attribute on purpose, see the note at the top of the file. */}
        <video
          ref={video}
          muted
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
          className="hero-media"
        />
        {/* Flat scrim, no gradient. 0.39 is measured, see REFERENCE.md 4.1. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--color-ink)]"
          style={{ opacity: 'var(--scrim)' }}
        />

        <div className="relative grid h-full grid-rows-[1fr_auto_1.15fr] justify-items-center p-[var(--gutter)] text-center text-[var(--color-paper)]">
          <div className="row-start-2 grid justify-items-center gap-6">
            <MaskedHeading as="h1" mode="lines" lines={hero.zeilen} className="display-xl" />
            <p className="body-l max-w-[46ch]">{hero.subline}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={primaryAction.href}>{primaryAction.label}</Button>
              <Button href="/ressorts" variant="outline">
                Ressorts
              </Button>
            </div>
          </div>
          {/* The lower row stays empty. Deliberate, per REFERENCE.md 4.1. */}
        </div>
      </div>
    </section>
  )
}
