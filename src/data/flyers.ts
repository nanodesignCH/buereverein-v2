import type { Flyer } from '@/types/content'

/* PLACEHOLDER DATA. Replaced by the Payload Flyers collection later.
   Exactly one real flyer exists in /content/pdf, and its preview is rendered
   from that PDF, not generated. The other four carry no thumbnail on purpose:
   a flyer without a preview renders as a purely typographic tile. Inventing
   images for them is not allowed. Their PDFs are still missing, so they link
   to '#'. */

export const flyers: Flyer[] = [
  {
    id: 'fl-buerenlauf',
    titel: 'Bürenlauf, wir laufen mit',
    datei: '/pdf/39-buerenlauf.pdf',
    thumbnail: {
      url: '/images/flyer-39-buerenlauf.jpg',
      alt: 'Flyer zum Bürenlauf mit gezeichneten Läuferinnen und Läufern vor der gedeckten Holzbrücke von Büren an der Aare',
      width: 744,
      height: 1052,
    },
    reihenfolge: 1,
  },
  {
    id: 'fl-ferienplausch-programm',
    titel: 'Ferienplausch, Programm',
    datei: '#',
    reihenfolge: 2,
  },
  {
    id: 'fl-ferienplausch-kurse',
    titel: 'Ferienplausch, Kursübersicht',
    datei: '#',
    reihenfolge: 3,
  },
  {
    id: 'fl-generatione-bistro',
    titel: 'Generatione-Bistro',
    datei: '#',
    reihenfolge: 4,
  },
  {
    id: 'fl-vergabungen-reglement',
    titel: 'Vergabungen, Reglement und Gesuchsformular',
    datei: '#',
    reihenfolge: 5,
  },
]
