'use client'

import { useRef, type ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, DUR, EASE, STAG, SHIFT, MOTION, REDUCED } from '@/lib/gsap'

type Common = {
  className?: string
  as?: ElementType
  id?: string
}

type LinesProps = Common & {
  /* One entry per line, hand set. Never auto wrapped, so a line can never be
     cut mid word. Reveal runs on load, without scrub. */
  mode: 'lines'
  lines: readonly string[]
}

type WordsProps = Common & {
  /* Word wise reveal riding a scrub, for the section that follows the hero. */
  mode: 'words'
  text: string
  trigger?: React.RefObject<HTMLElement | null>
  start?: string
  end?: string
}

export function MaskedHeading(props: LinesProps | WordsProps) {
  const root = useRef<HTMLElement>(null)
  const Tag = (props.as ?? 'h2') as ElementType

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const mm = gsap.matchMedia()

      if (props.mode === 'lines') {
        const spans = gsap.utils.toArray<HTMLElement>('.mask-line > span', el)

        mm.add(MOTION, () => {
          el.classList.remove('js-mask-pending')
          const tween = gsap.fromTo(
            spans,
            { yPercent: SHIFT.line },
            {
              yPercent: 0,
              duration: DUR.base,
              stagger: STAG.base,
              ease: EASE.out,
            },
          )
          return () => tween.kill()
        })

        mm.add(REDUCED, () => {
          el.classList.remove('js-mask-pending')
          gsap.set(spans, { yPercent: 0 })
        })

        return () => mm.revert()
      }

      const triggerEl = props.trigger?.current ?? el

      mm.add(MOTION, () => {
        const split = SplitText.create(el, {
          type: 'words',
          mask: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: SHIFT.word,
              ease: EASE.scrub,
              stagger: STAG.loose,
              scrollTrigger: {
                trigger: triggerEl,
                start: props.start ?? 'top 85%',
                end: props.end ?? 'top 35%',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }),
        })
        return () => split.revert()
      })

      /* Reduced motion: no split, no scrub, the heading simply stands. */
      return () => mm.revert()
    },
    { scope: root, dependencies: [props.mode] },
  )

  if (props.mode === 'words') {
    return (
      <Tag ref={root} id={props.id} className={props.className}>
        {props.text}
      </Tag>
    )
  }

  return (
    <Tag ref={root} id={props.id} className={`js-mask-pending ${props.className ?? ''}`}>
      {props.lines.map((line) => (
        <span className="mask-line" key={line}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
