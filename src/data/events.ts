import type { Event } from '@/types/content'

/* PLACEHOLDER DATA. Replaced by the Payload Events collection later, which is
   why the shape already matches the Event type exactly.
   Titles, places and rhythms come from /content/texte/ressorts.txt and
   verein.txt. The concrete dates are invented, the weekdays are correct:
   the story hour is on the first Saturday, the Generatione-Bistro on the
   third Wednesday of the month. Nothing here may be treated as fact. */

export const events: Event[] = [
  {
    id: 'ev-2026-08-19-bistro',
    titel: 'Generatione-Bistro',
    start: '2026-08-19T14:00:00+02:00',
    ende: '2026-08-19T17:00:00+02:00',
    ort: 'Aareresidenz, Büren an der Aare',
    beschreibung:
      'Kaffee, Kuchen und Zeit füreinander. Alle Generationen sind willkommen, eine Anmeldung braucht es nicht.',
    ressort: 'familybox',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-08-24-brocki',
    titel: 'Brockenstube, Sammeltag für Wintersachen',
    start: '2026-08-24T14:00:00+02:00',
    ende: '2026-08-24T16:00:00+02:00',
    ort: 'Hauptgasse 20, Büren an der Aare',
    beschreibung:
      'Wir nehmen gut erhaltene Winterkleidung entgegen. Möbel können wir aus Platzgründen nicht annehmen.',
    ressort: 'brockenstube',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-09-05-geschichten',
    titel: 'Geschichten für die Kleinen',
    start: '2026-09-05T10:00:00+02:00',
    ende: '2026-09-05T11:00:00+02:00',
    ort: 'Bibliothek Büren an der Aare',
    beschreibung:
      'Geschichtenstunde für Kinder ab vier Jahren. Zuhören, mitfiebern und die Freude am Lesen entdecken.',
    ressort: 'geschichten-fuer-die-kleinen',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-09-16-bistro',
    titel: 'Generatione-Bistro',
    start: '2026-09-16T14:00:00+02:00',
    ende: '2026-09-16T17:00:00+02:00',
    ort: 'Aareresidenz, Büren an der Aare',
    beschreibung:
      'Der Treffpunkt am dritten Mittwoch im Monat, gemeinsam mit der Aareresidenz.',
    ressort: 'familybox',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-10-03-geschichten',
    titel: 'Geschichten für die Kleinen',
    start: '2026-10-03T10:00:00+02:00',
    ende: '2026-10-03T11:00:00+02:00',
    ort: 'Bibliothek Büren an der Aare',
    beschreibung:
      'Geschichtenstunde für Kinder ab vier Jahren, jeden ersten Samstag im Monat.',
    ressort: 'geschichten-fuer-die-kleinen',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-10-10-buerenlauf',
    titel: 'Bürenlauf, wir laufen mit',
    start: '2026-10-10T09:00:00+02:00',
    ort: 'Büren an der Aare',
    beschreibung:
      'Wir stellen ein Team. Wer mitläuft, erhält ein Laufshirt, an der Anmeldegebühr beteiligen wir uns.',
    ressort: 'kurse-und-anlaesse',
    anmeldungNoetig: true,
  },
  {
    id: 'ev-2026-10-21-bistro',
    titel: 'Generatione-Bistro',
    start: '2026-10-21T14:00:00+02:00',
    ende: '2026-10-21T17:00:00+02:00',
    ort: 'Aareresidenz, Büren an der Aare',
    beschreibung: 'Begegnung über die Generationen hinweg, offen für alle.',
    ressort: 'familybox',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-11-07-geschichten',
    titel: 'Geschichten für die Kleinen',
    start: '2026-11-07T10:00:00+02:00',
    ende: '2026-11-07T11:00:00+02:00',
    ort: 'Bibliothek Büren an der Aare',
    beschreibung: 'Geschichtenstunde für Kinder ab vier Jahren.',
    ressort: 'geschichten-fuer-die-kleinen',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-11-14-kurs-kranz',
    titel: 'Kurs, Adventskranz binden',
    start: '2026-11-14T14:00:00+01:00',
    ende: '2026-11-14T17:00:00+01:00',
    ort: 'Kirchgemeindehaus, Büren an der Aare',
    beschreibung:
      'Wir binden gemeinsam einen Adventskranz. Das Material ist im Preis enthalten, Mitglieder zahlen weniger.',
    ressort: 'kurse-und-anlaesse',
    preis: 45,
    anmeldungNoetig: true,
  },
  {
    id: 'ev-2026-11-18-bistro',
    titel: 'Generatione-Bistro',
    start: '2026-11-18T14:00:00+01:00',
    ende: '2026-11-18T17:00:00+01:00',
    ort: 'Aareresidenz, Büren an der Aare',
    beschreibung: 'Der Treffpunkt am dritten Mittwoch im Monat.',
    ressort: 'familybox',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-12-05-geschichten',
    titel: 'Geschichten für die Kleinen',
    start: '2026-12-05T10:00:00+01:00',
    ende: '2026-12-05T11:00:00+01:00',
    ort: 'Bibliothek Büren an der Aare',
    beschreibung: 'Geschichtenstunde für Kinder ab vier Jahren, adventlich.',
    ressort: 'geschichten-fuer-die-kleinen',
    anmeldungNoetig: false,
  },
  {
    id: 'ev-2026-12-12-grittibaenze',
    titel: 'Grittibänze verteilen',
    start: '2026-12-12T09:00:00+01:00',
    ende: '2026-12-12T12:00:00+01:00',
    ort: 'Stedtli Büren an der Aare',
    beschreibung:
      'Wir besuchen die Seniorinnen und Senioren im Stedtli und bringen jedem einen Grittibänz vorbei.',
    ressort: 'grittibaenze-verteilen',
    anmeldungNoetig: true,
  },
  {
    id: 'ev-2027-01-23-kurs-brot',
    titel: 'Kurs, Brot backen im Holzofen',
    start: '2027-01-23T09:00:00+01:00',
    ende: '2027-01-23T13:00:00+01:00',
    ort: 'Backhaus, Büren an der Aare',
    beschreibung:
      'Vom Teig bis zum fertigen Laib. Für alle Interessierten, auch ohne Mitgliedschaft.',
    ressort: 'kurse-und-anlaesse',
    preis: 60,
    anmeldungNoetig: true,
  },
  {
    id: 'ev-2027-03-19-hauptversammlung',
    titel: 'Hauptversammlung',
    start: '2027-03-19T19:00:00+01:00',
    ort: 'Kirchgemeindehaus, Büren an der Aare',
    beschreibung:
      'Der Vorstand informiert über die Aktivitäten und die Entwicklung des Vereins. Die Mitglieder werden schriftlich eingeladen.',
    anmeldungNoetig: false,
  },
]
