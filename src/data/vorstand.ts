import type { ImageRef, Vorstandsmitglied } from '@/types/content'

/* Names and functions come from /content/texte/verein.txt, checked against
   the content source. Both agree on every entry with one exception, decided on
   11.08.2026: verein.txt writes "Besitz" for Daniela Willi-Otz, the source
   writes "Beisitz", and "Beisitz" is what applies.

   "Social Media" is the function the committee gives itself. Only the missing
   space was corrected. It is the one English term on the site, decided on
   11.08.2026, because renaming somebody's function would be inventing content.

   Order follows verein.txt. The two co-presidents stand first, which is the
   only place order carries meaning here.

   All portraits are cropped to 3:4 from square originals, centred, and the
   crops were checked one by one: nothing is cut off. 768x1024 is the full
   resolution the source files allow, see the note in DESIGN.md 5.

   `motivation` is the "Motivation" paragraph of verein.txt, word for word. The
   "Persönlich" paragraph is deliberately unused. Two of the texts carried an en
   dash, which Swiss orthography does not use: those became a hyphen with spaces
   on either side, per CLAUDE.md 5. Nothing else was touched.

   TEXT LENGTH, measured on the live tiles on 11.08.2026. The smallest portrait
   tile is 147 x 197px at 1024px width. Since name and function left the overlay
   it holds roughly 125 characters at the caption size, up from 110. Word length
   counts for more than character count in a column that narrow: 137 characters
   of short words fit where 129 characters with long compounds do not.

   Two texts are still over and are marked below. They wait on shortened
   versions from the client and are kept in full until those arrive, because
   cutting somebody's own words is not a layout decision. See REFERENCE.md 4.5. */

export const vorstand: Vorstandsmitglied[] = [
  {
    slug: 'anna-lena-nachtsheim',
    name: 'Anna-Lena Nachtsheim',
    funktion: 'Co-Präsidium',
    portrait: {
      url: '/images/vorstand/anna-lena-nachtsheim.jpg',
      alt: 'Anna-Lena Nachtsheim vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* 84 characters, fits at every breakpoint. */
    motivation:
      'Erinnerungen aus der eigenen Kindheit mit den heutigen Lebensgeschichten verknüpfen.',
  },
  {
    slug: 'stefanie-jordi',
    name: 'Stefanie Jordi',
    funktion: 'Co-Präsidium',
    portrait: {
      url: '/images/vorstand/stefanie-jordi.jpg',
      alt: 'Stefanie Jordi vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* 128 characters, fits at every breakpoint. */
    motivation:
      'Ideen teilen, Generationen verbinden und gemeinsam etwas auf die Beine stellen - genau deshalb engagiere ich mich im BÜREVEREIN.',
  },
  {
    slug: 'ruth-hartmann',
    name: 'Ruth Hartmann',
    funktion: 'Kasse',
    portrait: {
      url: '/images/vorstand/ruth-hartmann.jpg',
      alt: 'Ruth Hartmann vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* TODO 169 characters, the longest of the seven. Overflows by 27px at
       1024px and by 3px at 375px. Shortened version pending. */
    motivation:
      'Ich engagiere mich im BÜREVEREIN, weil ich seine Ideen und Projekte unterstützenswert finde. Sie verbinden Menschen jeden Alters und fördern nachhaltig den Zusammenhalt.',
  },
  {
    slug: 'selina-dos-santos-coelho',
    name: 'Selina dos Santos Coelho',
    funktion: 'Administration',
    portrait: {
      url: '/images/vorstand/selina-dos-santos-coelho.jpg',
      alt: 'Selina dos Santos Coelho vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* TODO 129 characters, but "Überzeugung", "Miteinander" and "Verbindungen"
       break badly in a 128px column, so it overflows by 8px at 1024px and 3px
       at 375px where the longer text of Kim Schneider fits. Shortened version
       pending. */
    motivation:
      'Mein Engagement basiert auf der Überzeugung, dass Austausch, Miteinander und menschliche Verbindungen von grosser Bedeutung sind.',
  },
  {
    slug: 'kim-schneider',
    name: 'Kim Schneider',
    funktion: 'Administration',
    portrait: {
      url: '/images/vorstand/kim-schneider.jpg',
      alt: 'Kim Schneider vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* 137 characters and still fits: the words are short. */
    motivation:
      'Ich schätze unsere Traditionen und Werte, sie verbinden Generationen und zeigen, dass Zusammenhalt und Engagement nie aus der Mode kommt.',
  },
  {
    slug: 'larissa-de-martin',
    name: 'Larissa De Martin',
    funktion: 'Social Media',
    portrait: {
      url: '/images/vorstand/larissa-de-martin.jpg',
      alt: 'Larissa De Martin vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* 109 characters, the longest that still fits everywhere. */
    motivation:
      'Menschen miteinander ins Gespräch zu bringen und zu verbinden, ist mir ein Anliegen - im Beruf wie im Verein.',
  },
  {
    slug: 'daniela-willi-otz',
    name: 'Daniela Willi-Otz',
    funktion: 'Beisitz',
    portrait: {
      url: '/images/vorstand/daniela-willi-otz.jpg',
      alt: 'Daniela Willi-Otz vor einer weiss gestrichenen Backsteinwand',
      width: 768,
      height: 1024,
    },
    /* 132 characters, fits at every breakpoint. */
    motivation:
      'Ich engagiere mich, weil mir das Wohl der Bevölkerung, gegenseitiger Respekt und ein starkes Miteinander besonders am Herzen liegen.',
  },
]

/* Which of them hold the presidency is data, not a position in the array, so
   the page does not have to know that the first two entries are special. */
export const CO_PRAESIDIUM = 'Co-Präsidium'

export const vorstandGruppenbild: ImageRef = {
  url: '/images/vorstand-gruppe.jpg',
  alt: 'Die sieben Vorstandsmitglieder des BÜREVEREIN springen vor einer weiss gestrichenen Backsteinwand in die Luft',
  width: 1024,
  height: 683,
}
