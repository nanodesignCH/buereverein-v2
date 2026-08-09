/* Swiss German date formatting. Fixed locale and fixed time zone so server and
   client render the same string and React does not report a mismatch. */

const ZONE = 'Europe/Zurich'

const tag = new Intl.DateTimeFormat('de-CH', { day: '2-digit', timeZone: ZONE })
const monat = new Intl.DateTimeFormat('de-CH', { month: 'short', timeZone: ZONE })
const wochentag = new Intl.DateTimeFormat('de-CH', { weekday: 'long', timeZone: ZONE })
const zeit = new Intl.DateTimeFormat('de-CH', { hour: '2-digit', minute: '2-digit', timeZone: ZONE })
const voll = new Intl.DateTimeFormat('de-CH', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: ZONE,
})

export function tagZahl(iso: string): string {
  return tag.format(new Date(iso))
}

export function monatKurz(iso: string): string {
  return monat.format(new Date(iso)).replace('.', '')
}

export function wochentagLang(iso: string): string {
  return wochentag.format(new Date(iso))
}

export function uhrzeit(iso: string): string {
  return zeit.format(new Date(iso))
}

export function datumLang(iso: string): string {
  return voll.format(new Date(iso))
}

export function preisText(preis: number | undefined): string {
  return preis === undefined ? 'Kostenlos' : `CHF ${preis}.-`
}
