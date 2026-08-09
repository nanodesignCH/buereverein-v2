'use client'

import { useRef } from 'react'
import { MaskedHeading } from '@/components/motion/MaskedHeading'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { StatNumber } from '@/components/ui/StatNumber'
import { intro } from '@/data/site'

/* The section that rides the hero transition, REFERENCE.md 4.2 and 4.3.
   No image. The three figures carry the section. */

export function Intro() {
  const root = useRef<HTMLElement>(null)

  return (
    <section ref={root} id="inhalt" className="pt-[var(--section-gap)]">
      <div className="surface bg-[var(--color-newsprint)] p-[var(--gutter)] pb-[calc(var(--gutter)*1.5)]">
        <MaskedHeading
          mode="words"
          text={intro.headline}
          trigger={root}
          className="display-l max-w-[14ch]"
        />

        <div className="mt-[var(--section-gap)] grid grid-cols-12 gap-x-[var(--gutter)]">
          <div className="col-span-12 space-y-5 lg:col-span-7">
            {intro.absaetze.map((absatz) => (
              <p key={absatz} className="measure">
                {absatz}
              </p>
            ))}
          </div>
        </div>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-3">
          {intro.zahlen.map((zahl) => (
            <StatNumber key={zahl.label} value={zahl.wert} label={zahl.label} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
