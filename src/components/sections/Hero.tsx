import Image from 'next/image'
import { MaskedHeading } from '@/components/motion/MaskedHeading'
import { Button } from '@/components/ui/Button'
import { hero, primaryAction } from '@/data/site'

/* Composition per REFERENCE.md 4.1, variant A from the prototype gate:
   headline centred over the surface, subline and two actions beneath it, the
   lower row deliberately empty.

   The image is static. There is no video, no scrub, no pin and therefore no
   scroll distance of its own, so the section scrolls like any other. The only
   motion belongs to the headline and lives in MaskedHeading, which is why this
   component needs no client bundle at all. */

export function Hero() {
  return (
    <section className="h-svh pb-[var(--inset)] pt-[var(--header-h)]">
      <div className="surface on-dark relative h-full bg-[var(--color-ink)]">
        <Image
          src="/images/hero.jpg"
          alt="Die Altstadt von Büren an der Aare mit Kirchturm und gedeckter Holzbrücke, gespiegelt im Wasser"
          fill
          priority
          sizes="100vw"
          className="hero-media"
        />
        {/* Flat scrim, no gradient. The value is measured, see REFERENCE.md 4.1. */}
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
