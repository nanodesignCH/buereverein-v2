/* Static site copy. Every sentence is taken from /content/texte, only the
   dashes were converted to Swiss punctuation. Nothing here is invented. */

/* Labels are German, routes stay as DESIGN.md 7 fixes them. The old site said
   "Events" in the menu, but that is an English word and the rule allows none
   outside proper names. The source texts use "Anlässe" themselves, in "Kurse
   und Anlässe" and in "Sei Teil des Anlasses". */
export const nav = [
  { href: '/', label: 'Start' },
  { href: '/verein', label: 'Verein' },
  { href: '/ressorts', label: 'Ressorts' },
  { href: '/events', label: 'Anlässe' },
  { href: '/kontakt', label: 'Kontakt' },
] as const

export const primaryAction = { href: '/mitglied-werden', label: 'Jetzt anmelden' } as const

export const hero = {
  /* Two hand set lines. Never joined into one string, never auto wrapped:
     one mask per line is what keeps a line from being cut mid word. */
  zeilen: ['Willkommen beim', 'BÜREVEREIN'],
  subline:
    'Der BÜREVEREIN bringt Menschen zusammen, fördert das soziale Miteinander und unterstützt Projekte, die unserer Region zugutekommen.',
} as const

export const intro = {
  headline: 'Begegnungen am Puls der Zeit',
  absaetze: [
    'Dank der Erlöse aus unserer Brockenstube und den Mitgliederbeiträgen können wir gemeinnützige Institutionen und soziale Initiativen gezielt fördern.',
    'Wir sind konfessionell und parteipolitisch unabhängig und freuen uns über alle, die sich mit Herz und Engagement für ein lebendiges und solidarisches Stedtli einsetzen möchten.',
  ],
  zahlen: [
    { wert: 1953, label: 'Gegründet' },
    { wert: 310, label: 'Mitglieder' },
    { wert: 8, label: 'Ressorts' },
  ],
} as const

/* The headings below are the words of the source texts, not new copy.
   Where a source has no heading, the plain section noun stands. Inventing a
   claim would be the one thing this project does not allow. */

export const ressortTrack = {
  // struktur.md, navigation entry
  headline: 'Ressorts',
} as const

export const flyerGrid = {
  // struktur.md, type legend "Flyer = PDF-Download"
  headline: 'Flyer',
} as const

export const eventsPreview = {
  // events.txt, line 1. Dash converted to a comma.
  headline: 'Sei Teil des Anlasses, wir freuen uns auf dich',
} as const

/* /verein. Every sentence is verein.txt verbatim, checked against the content
   source, which agrees. Three corrections and nothing else: the missing space
   in "ehem.Frauenverein", the typewriter apostrophe in 3'802 raised to the
   typographic one, and the dash in the first paragraph, which stays a hyphen
   with spaces as CLAUDE.md 5 allows.

   The headings are the words verein.txt uses for its own blocks. The page head
   is the navigation label, because "Begegnungen am Puls der Zeit", the opening
   line of verein.txt, already carries the intro on the start page and a
   heading cannot stand twice on one site. */
export const verein = {
  /* Hand set lines for the masked reveal, one mask per line. */
  kopf: ['Verein'],

  geschichte: {
    headline: 'Geschichte',
    absaetze: [
      'Der Gemeinnützige Frauenverein Büren an der Aare wurde 1953 von engagierten und innovativen Frauen gegründet und ist aus dem Stedtli heute nicht mehr wegzudenken. Rund 310 Mitglieder engagieren sich aktiv oder passiv im Verein - bei einer Einwohnerzahl von 3’802 Personen (Stand 01.03.2026).',
      'Im Jahr 2026 startet der Verein mit neuem Namen und neuem Erscheinungsbild in die Zukunft. Dabei bleiben unsere Werte dieselben: Menschen zusammenbringen, lokale Projekte unterstützen und das Miteinander stärken.',
      'Mit finanziellen Beiträgen fördern wir ortsansässige Vereine, die Schule, den Kindergarten, die Spielgruppe, Kitas sowie weitere gemeinnützige Institutionen. Zu den bedeutenden Projekten der vergangenen Jahre gehören die Skulptur an der Ländti im Rahmen des Skulpturensymposiums 2021 sowie die Erneuerung des Spielplatzes beim Schulhaus.',
      'Finanziert werden diese Beiträge hauptsächlich durch den Erlös der Brockenstube. Seit über 40 Jahren wird die Brockenstube vom BÜREVEREIN (ehem. Frauenverein) geführt. Sie ist nicht nur ein Ort, an dem gut erhaltene Gegenstände ein neues Zuhause finden, sondern auch ein beliebter Treffpunkt für Gespräche und gemütliches Beisammensein.',
    ],
  },

  vorstand: {
    headline: 'Vorstand',
    /* The two colour tiles of REFERENCE.md 4.5. Both lines are verein.txt and
       were picked by the client on 11.08.2026, because the file offers exactly
       two kinds of standalone short lines and neither was an obvious fit.

       "Miteinander" is the first entry of the list the source marks as "USP".
       The line is the part of the second paragraph that follows the colon, word
       for word. It also stands in the running history text above, so on the
       page it reads as a quotation from the association's own words. */
    kachelLabel: 'Miteinander',
    kachelZeile:
      'Menschen zusammenbringen, lokale Projekte unterstützen und das Miteinander stärken.',
  },

  hauptversammlung: {
    headline: 'Hauptversammlung',
    absaetze: [
      'Die Hauptversammlung findet jedes Jahr im ersten Semester statt. Die Mitglieder werden rechtzeitig schriftlich dazu eingeladen.',
      'An der Hauptversammlung informiert der Vorstand über die Aktivitäten und die Entwicklung des Vereins. Zudem werden wichtige Geschäfte behandelt und Beschlüsse gefasst. Die Mitglieder haben die Möglichkeit, ihre Anliegen einzubringen und aktiv an der Gestaltung des Vereins mitzuwirken.',
    ],
  },

  statutenLabel: 'Statuten',
} as const

/* verein.txt asks for a Statuten button next to the membership one. The PDF now
   lies in /public/pdf, so the button renders. Stays optional: once the document
   comes from Payload, only this line changes. */
export const statutenPdf: string | undefined = '/pdf/statuten-2026.pdf'

export const kontaktCta = {
  // jetzt-dabei-sein.txt, line 1 and the first answer, verbatim
  headline: 'Allein ist man stark, gemeinsam unschlagbar',
  text: 'Mit deinem Mitgliederbeitrag unterstützt du den BÜREVEREIN, gehst aber keine Verpflichtungen bezüglich einer Aktivität ein.',
} as const

export const footer = {
  verein: 'BÜREVEREIN',
  adresse: ['Postfach 123', '3294 Büren a/A'],
  mail: 'info@buereverein.ch',
  links: [
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/impressum', label: 'Impressum' },
  ],
  /* Target addresses are not yet known, so the links stay inert. */
  social: [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
  ],
} as const
