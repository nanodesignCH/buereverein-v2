import { notFound } from 'next/navigation'
import { Intro } from '@/components/sections/Intro'
import { RessortTrack } from '@/components/sections/RessortTrack'
import { FlyerGrid } from '@/components/sections/FlyerGrid'
import { EventsPreview } from '@/components/sections/EventsPreview'
import { KontaktCta } from '@/components/sections/KontaktCta'
import { ressorts } from '@/data/ressorts'
import { flyers } from '@/data/flyers'
import { events } from '@/data/events'

/* Scaffolding for visual checks during the design pass: it puts a single
   section at the top of the page so it can be looked at without scrolling.
   Returns 404 in a production build and is deleted once the pass is signed
   off. It renders the same components as the start page, never copies. */

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>
}) {
  if (process.env.NODE_ENV !== 'development') notFound()

  const { s } = await searchParams
  const kommende = [...events].sort((a, b) => a.start.localeCompare(b.start)).slice(0, 5)

  return (
    <main>
      {s === 'intro' && <Intro />}
      {s === 'ressorts' && <RessortTrack ressorts={ressorts} />}
      {s === 'flyer' && <FlyerGrid flyers={flyers} />}
      {s === 'events' && <EventsPreview events={kommende} />}
      {s === 'kontakt' && <KontaktCta />}
    </main>
  )
}
