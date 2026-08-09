import Link from 'next/link'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { eventsPreview } from '@/data/site'
import { datumLang, monatKurz, preisText, tagZahl, uhrzeit, wochentagLang } from '@/lib/datum'
import type { Event } from '@/types/content'

/* Minimal motion per REFERENCE.md 4.8: entry of the list only, no pin, no
   scrub. The list works entirely without event images, the image is optional
   and is not used on the start page. */

export function EventsPreview({ events }: { events: Event[] }) {
  return (
    <section aria-labelledby="events-titel" className="pt-[var(--section-gap)]">
      <div className="surface bg-[var(--color-newsprint)] p-[var(--gutter)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 id="events-titel" className="display-l max-w-[16ch]">
            {eventsPreview.headline}
          </h2>
          <Button href="/events" variant="outline">
            Alle Anlässe
          </Button>
        </div>

        <StaggerGroup className="mt-[var(--section-gap)]" selector="li">
          <ul className="m-0 list-none p-0">
            {events.map((event) => (
              <li key={event.id}>
                <Divider />
                <Link
                  href="/events"
                  className="grid grid-cols-12 items-baseline gap-x-[var(--gutter)] gap-y-3 py-7 text-[var(--color-ink)] no-underline hover:underline hover:underline-offset-4"
                >
                  <span className="col-span-3 flex items-baseline gap-2 sm:col-span-2">
                    <time
                      dateTime={event.start}
                      className="font-[family-name:var(--font-display)] text-[length:var(--text-display-m)] font-medium leading-[0.95] tracking-[-0.02em] tabular-nums"
                    >
                      {tagZahl(event.start)}
                    </time>
                    <span className="caption">{monatKurz(event.start)}</span>
                  </span>

                  <span className="col-span-9 sm:col-span-5">
                    <span className="block">{event.titel}</span>
                    <span className="mt-1 block caption">{event.ort}</span>
                  </span>

                  <span className="col-span-12 caption sm:col-span-3">
                    {wochentagLang(event.start)}, {uhrzeit(event.start)} Uhr
                    <span className="sr-only">, {datumLang(event.start)}</span>
                  </span>

                  <span className="col-span-12 caption sm:col-span-2 sm:text-right">
                    {event.anmeldungNoetig ? `Anmeldung, ${preisText(event.preis)}` : preisText(event.preis)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </StaggerGroup>
        <Divider />
      </div>
    </section>
  )
}
