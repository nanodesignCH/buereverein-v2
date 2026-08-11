'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Kachel, useKachelExpansion } from '@/components/motion/KachelExpansion'
import { verein } from '@/data/site'
import type { Vorstandsmitglied } from '@/types/content'

/* REFERENCE.md 4.5. One grid, ten columns from 1024px.

     row 1  colour tile span 4 + co-president span 3 + co-president span 3
     row 2  the five remaining members, span 2 each

   Motion is the tile expansion of DESIGN.md 5, point 5. It lives in
   /components/motion/KachelExpansion.tsx, together with the tile markup, since
   the Hauptversammlung section uses the same two pieces.

   Every portrait carries the motivation overlay of REFERENCE.md 4.5. Its states
   are CSS, in globals.css; the only thing kept here is which tile a tap has
   opened, because that is the one state CSS cannot hold on its own. */

/* The colour tile has to end up exactly as tall as the two portraits beside it.
   Its aspect follows from the raster rather than from taste: with column width
   c and gutter g, a portrait spans 3 columns and is 4/3 as tall as it is wide,
   so its height is (3c + 2g) * 4/3, while the colour tile is (4c + 3g) wide.
   The quotient of the two is 1.043 at 1440 and 1.039 at 1024, so it barely
   moves across the whole range and one constant covers it to within two pixels.
   Below 1024 the tile stands alone across both columns and keeps the landscape
   4:3 of REFERENCE.md 4.5. */
const ASPECT_FARBE = 'aspect-[4/3] lg:aspect-[1.041]'
const ASPECT_PORTRAIT = 'aspect-[3/4]'

/* The three club tones with the text colour the contrast table in DESIGN.md 2
   prescribes for each: ink on terracotta and mauve, paper on brick. Index
   modulo three walks the seven portraits in reading order, which keeps two
   equal tones apart both side by side and one above the other, in the ten
   column raster as well as in the two column one. Checked against both. The
   colour carries no meaning, exactly as in the ressort track. */
const OVERLAY_TOENE = [
  { flaeche: 'bg-[var(--color-terracotta)]', text: 'text-[var(--color-ink)]', dunkel: false },
  { flaeche: 'bg-[var(--color-brick)]', text: 'text-[var(--color-paper)]', dunkel: true },
  { flaeche: 'bg-[var(--color-mauve)]', text: 'text-[var(--color-ink)]', dunkel: false },
] as const

/* The overlay text sits at the fluid caption size, --text-caption-fluid. The
   caption step is the only one that fits at all: at 1024px the smallest portrait
   tile is 147 x 197px, where the body size holds about 75 characters against
   roughly 110 at this one. The caption treatment itself, uppercase and
   letterspaced, is not applied, that is for labels.

   Fluid rather than fixed because the tile grows with the viewport and a fixed
   13px reads as too small on a wide display. The curve is flat up to 1024, so
   the tightest tile keeps exactly the size the character limit was measured at.

   Padding is a share of the tile width rather than --inset, because --inset
   grows with the viewport while these tiles are at their smallest exactly at
   1024px, where every pixel of padding costs a line of text. Seven percent
   gives 10px on the smallest tile and 24px on the largest. */
const OVERLAY_PADDING = 'p-[7%]'

function Portrait({
  person,
  ton,
  sizes,
  offen,
  aufTippen,
  className = '',
}: {
  person: Vorstandsmitglied
  ton: (typeof OVERLAY_TOENE)[number]
  sizes: string
  offen: boolean
  aufTippen: () => void
  className?: string
}) {
  const textId = `motivation-${person.slug}`

  return (
    <figure className={`m-0 ${className}`}>
      <Kachel aspect={ASPECT_PORTRAIT}>
        <div
          className={`portrait-kachel relative h-full w-full ${ton.dunkel ? 'on-dark' : ''}`}
          data-offen={offen}
        >
          <Image
            src={person.portrait.url}
            alt={person.portrait.alt}
            width={person.portrait.width}
            height={person.portrait.height}
            sizes={sizes}
            className="h-full w-full object-cover"
          />

          {/* Carries the keyboard focus that reveals the overlay and the tap
              that opens it below 768px. It has to stand before the overlay,
              because the focus rule in globals.css reaches the overlay as a
              following sibling. The overlay takes no pointer events, so lying
              over the button costs it nothing. */}
          <button
            type="button"
            onClick={aufTippen}
            aria-controls={textId}
            className="portrait-schalter absolute inset-0 h-full w-full cursor-pointer"
          >
            <span className="sr-only">Motivation von {person.name} zeigen</span>
          </button>

          {/* Colour as a surface, per DESIGN.md 2. Name and function are not
              repeated in here: they stand permanently in the figcaption right
              below the tile, so the attribution never depends on the overlay
              being open. That also buys the motivation two more lines.

              The label is a paragraph, not a heading. It reads as one, but the
              same words seven times in the heading outline would be noise for a
              screen reader, and the section already has its h2. */}
          <div
            id={textId}
            className={`portrait-overlay flex flex-col gap-2 ${OVERLAY_PADDING} ${ton.flaeche} ${ton.text}`}
          >
            <p className="text-[length:var(--text-caption-fluid)] leading-[1.3] font-medium">
              Meine Motivation
            </p>
            <p className="text-[length:var(--text-caption-fluid)] leading-[1.45]">
              {person.motivation}
            </p>
          </div>
        </div>
      </Kachel>

      {/* Caption under the picture. It sits outside the growing frame, so it is
          never clipped, and outside the overlay, so the name is readable even
          while the portrait is covered. */}
      <figcaption className="mt-4">
        <span className="block">{person.name}</span>
        <span className="mt-1 block caption">{person.funktion}</span>
      </figcaption>
    </figure>
  )
}

export function VorstandGrid({
  coPraesidium,
  weitere,
}: {
  coPraesidium: Vorstandsmitglied[]
  weitere: Vorstandsmitglied[]
}) {
  const root = useRef<HTMLElement>(null)
  useKachelExpansion(root)

  /* One slug at most, so opening a tile closes whatever was open. Only read
     below 768px, where the CSS rule for it lives. */
  const [offen, setOffen] = useState<string | null>(null)

  useEffect(() => {
    if (!offen) return

    /* pointerdown, not click: it fires before the button's own click, so a tap
       on the open tile is skipped here and then toggled by the button, instead
       of being closed twice and reopening. */
    const beiZeigergeste = (ereignis: PointerEvent) => {
      const ziel = ereignis.target
      if (ziel instanceof Node && root.current?.querySelector(`[data-offen='true']`)?.contains(ziel)) {
        return
      }
      setOffen(null)
    }

    const beiTaste = (ereignis: KeyboardEvent) => {
      if (ereignis.key === 'Escape') setOffen(null)
    }

    document.addEventListener('pointerdown', beiZeigergeste)
    document.addEventListener('keydown', beiTaste)
    return () => {
      document.removeEventListener('pointerdown', beiZeigergeste)
      document.removeEventListener('keydown', beiTaste)
    }
  }, [offen])

  const umschalten = (slug: string) => setOffen((jetzt) => (jetzt === slug ? null : slug))

  return (
    <section ref={root} aria-labelledby="vorstand-titel" className="pt-[var(--section-gap)]">
      <div className="surface bg-[var(--color-paper)] px-[var(--gutter)]">
        <h2 id="vorstand-titel" className="display-l">
          {verein.vorstand.headline}
        </h2>

        {/* items-start keeps every cell on its own aspect ratio. Stretching
            would override it and with it the fixed height the expansion needs. */}
        <div className="mt-[var(--section-gap)] grid grid-cols-2 items-start gap-[var(--gutter)] lg:grid-cols-10">
          <Kachel
            aspect={ASPECT_FARBE}
            className="col-span-2 lg:col-span-4"
            /* Colour as a surface, ink on mauve per the contrast table in
               DESIGN.md 2. Mauve also keeps a tone between this tile and the
               brick of the closing call to action. */
            innerClassName="bg-[var(--color-mauve)]"
          >
            <div className="flex h-full items-center p-[var(--inset)] text-[var(--color-ink)]">
              <p className="display-m hyphens-auto break-words font-[family-name:var(--font-display)] font-medium leading-[0.95] tracking-[-0.02em]">
                {verein.vorstand.kachelZeile}
              </p>
            </div>
          </Kachel>

          {/* The two co-presidents. span 3 of ten makes them the largest
              portrait tiles, nothing is enlarged on top of that. */}
          {coPraesidium.map((person, index) => (
            <Portrait
              key={person.slug}
              person={person}
              ton={OVERLAY_TOENE[index % OVERLAY_TOENE.length]!}
              sizes="(min-width: 1024px) 30vw, 45vw"
              offen={offen === person.slug}
              aufTippen={() => umschalten(person.slug)}
              className="col-span-1 lg:col-span-3"
            />
          ))}

          {/* Row 2. Below 1024 the last one runs across both columns, so seven
              portraits leave no gap in a two column raster. The tone index
              continues through both groups, it does not restart here. */}
          {weitere.map((person, index) => (
            <Portrait
              key={person.slug}
              person={person}
              ton={
                OVERLAY_TOENE[(coPraesidium.length + index) % OVERLAY_TOENE.length]!
              }
              sizes="(min-width: 1024px) 20vw, 45vw"
              offen={offen === person.slug}
              aufTippen={() => umschalten(person.slug)}
              className={
                index === weitere.length - 1 ? 'col-span-2' : 'col-span-1 lg:col-span-2'
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
