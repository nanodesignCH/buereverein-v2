/* Shapes of what Payload will return later. Written by hand now so that
   swapping the static data for a CMS call stays an import swap.
   Payload will manage Events, Flyers, Media, Users and Registrations only. */

export type ImageRef = {
  url: string
  alt: string
  width: number
  height: number
}

export type Event = {
  id: string
  titel: string
  start: string // ISO
  ende?: string // ISO
  ort: string
  beschreibung: string
  bild?: ImageRef
  ressort?: string
  preis?: number // CHF, undefined = kostenlos
  anmeldungNoetig: boolean
}

export type Flyer = {
  id: string
  titel: string
  datei: string // PDF-URL
  /* Optional: a flyer without an uploaded preview appears as a purely
     typographic tile in the same grid. Placeholder images are not allowed. */
  thumbnail?: ImageRef
  reihenfolge: number
}

/* Ressorts stay static in the code, they are not a Payload collection. */
export type Ressort = {
  slug: string
  titel: string
  teaser: string
}
