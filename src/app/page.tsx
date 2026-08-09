import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { RessortTrack } from '@/components/sections/RessortTrack'
import { FlyerGrid } from '@/components/sections/FlyerGrid'
import { EventsPreview } from '@/components/sections/EventsPreview'
import { KontaktCta } from '@/components/sections/KontaktCta'

import { ressorts } from '@/data/ressorts'
import { flyers } from '@/data/flyers'
import { events } from '@/data/events'

/* Data is loaded here and only here, and reaches the sections through props.
   No component fetches for itself. When Payload arrives, the three imports
   above become three awaited calls and nothing below changes. */

export default function StartPage() {
  const kommende = [...events]
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 5)

  return (
    <main>
      <Hero />
      <Intro />
      <RessortTrack ressorts={ressorts} />
      <FlyerGrid flyers={flyers} />
      <EventsPreview events={kommende} />
      <KontaktCta />
    </main>
  )
}
