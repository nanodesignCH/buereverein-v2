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

/* The committee stays static too. It changes once a year at the general
   meeting, which is not a reason for a collection. */
export type Vorstandsmitglied = {
  slug: string
  name: string
  funktion: string
  portrait: ImageRef
  /* The "Motivation" paragraph from the content source, shown as the overlay on
     the portrait tile. See REFERENCE.md 4.5 for the character limit the tile
     imposes. Not optional: a tile without it would open an empty overlay. */
  motivation: string
}
