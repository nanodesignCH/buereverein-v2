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
