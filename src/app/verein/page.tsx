import type { Metadata } from 'next'
import { MaskedHeading } from '@/components/motion/MaskedHeading'
import { Button } from '@/components/ui/Button'
import { Hauptversammlung } from '@/components/sections/Hauptversammlung'
import { KontaktCta } from '@/components/sections/KontaktCta'
import { VorstandGrid } from '@/components/sections/VorstandGrid'
import { primaryAction, statutenPdf, verein } from '@/data/site'
import { CO_PRAESIDIUM, vorstand, vorstandGruppenbild } from '@/data/vorstand'

/* Pass B per CLAUDE.md 9.3. Nothing here is new: the masked heading, the
   stagger, the button, the closing call to action and the tokens all come from
   the start page. The only component that did not exist yet is VorstandGrid,
   and DESIGN.md 6 already lists it as the one section that lives on this page.

   Data is read here and only here and reaches the sections through props. */

export const metadata: Metadata = {
  title: 'Verein',
  description:
    'Der Gemeinnützige Frauenverein Büren an der Aare wurde 1953 gegründet. Geschichte, Vorstand und Hauptversammlung des BÜREVEREIN.',
}

export default function VereinPage() {
  const coPraesidium = vorstand.filter((person) => person.funktion === CO_PRAESIDIUM)
  const weitere = vorstand.filter((person) => person.funktion !== CO_PRAESIDIUM)

  return (
    <main id="inhalt">
      {/* Page head. The bar is fixed, so its height is added to the section gap
          rather than baked into a new spacing value. */}
      <section className="pt-[calc(var(--header-h)+var(--section-gap))]">
        <div className="surface bg-[var(--color-paper)] px-[var(--gutter)]">
          <MaskedHeading as="h1" mode="lines" lines={verein.kopf} className="display-xl" />
        </div>
      </section>

      <section aria-labelledby="geschichte-titel" className="pt-[var(--section-gap)]">
        <div className="surface bg-[var(--color-newsprint)] p-[var(--gutter)] pb-[calc(var(--gutter)*1.5)]">
          <h2 id="geschichte-titel" className="display-l">
            {verein.geschichte.headline}
          </h2>

          {/* Single column, 58ch, no picture. */}
          <div className="mt-[var(--section-gap)] space-y-5">
            {verein.geschichte.absaetze.map((absatz) => (
              <p key={absatz} className="measure">
                {absatz}
              </p>
            ))}
          </div>

          {/* Below 768px stacked, membership action first. */}
          <div className="mt-12 flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center">
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
            {/* Renders as soon as the statutes have a URL, see /data/site.ts.
                Opens in a new tab, so the label names the file type. */}
            {statutenPdf ? (
              <Button
                href={statutenPdf}
                variant="brick"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${verein.statutenLabel}, PDF, öffnet in neuem Tab`}
              >
                {verein.statutenLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <VorstandGrid coPraesidium={coPraesidium} weitere={weitere} />

      {/* REFERENCE.md 4.5b: the group picture lives here, not in the committee
          raster. It is one of two tiles of equal height, the text of the
          section carries the other one. */}
      <Hauptversammlung
        headline={verein.hauptversammlung.headline}
        absaetze={verein.hauptversammlung.absaetze}
        gruppenbild={vorstandGruppenbild}
      />

      <KontaktCta />
    </main>
  )
}
