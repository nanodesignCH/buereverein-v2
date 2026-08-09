import { Button } from '@/components/ui/Button'
import { kontaktCta, primaryAction } from '@/data/site'

/* Closing call to action. No contact details here, those live in the footer
   and on /kontakt. Colour appears as a full surface, never as an accent.

   No motion at all: REFERENCE.md 4 does not describe this section, and what is
   not listed there is not animated. That is also why this is a server
   component with no client bundle. */

export function KontaktCta() {
  return (
    <section aria-labelledby="mitmachen-titel" className="pt-[var(--section-gap)]">
      <div className="surface on-dark bg-[var(--color-brick)] p-[var(--gutter)] py-[calc(var(--gutter)*1.75)] text-[var(--color-paper)]">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10">
          <h2 id="mitmachen-titel" className="display-l col-span-12 max-w-[18ch] lg:col-span-7">
            {kontaktCta.headline}
          </h2>
          <div className="col-span-12 flex flex-col items-start gap-8 lg:col-span-5 lg:justify-end">
            <p className="measure body-l">{kontaktCta.text}</p>
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
