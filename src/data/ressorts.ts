import type { Ressort } from '@/types/content'

/* Order follows /content/texte/ressorts.txt. It carries no meaning, which is
   why the run is not numbered. Every teaser is condensed from the long text in
   that file and stays under 30 words. */

export const ressorts: Ressort[] = [
  {
    slug: 'brockenstube',
    titel: 'Brockenstube',
    // TODO review
    teaser:
      'Gut erhaltene Gegenstände aus zweiter Hand: Haushaltswaren, Kleidung, Bücher und besondere Einzelstücke. Was Sie weitergeben möchten, nehmen wir gerne entgegen, Möbel ausgenommen.',
  },
  {
    slug: 'ferienplausch',
    titel: 'Ferienplausch',
    // TODO review
    teaser:
      'Ein abwechslungsreiches Freizeitangebot für Schülerinnen und Schüler aus Büren und Oberwil während den Sommerferien: kreative Workshops, sportliche Aktivitäten und Kurse in der Natur.',
  },
  {
    slug: 'familybox',
    titel: 'FamilyBox',
    // TODO review
    teaser:
      'Für alle, die Kinder von null Jahren bis zum Schuleintritt betreuen: Aktivitäten drinnen und draussen, Infoveranstaltungen und das Generatione-Bistro zusammen mit der Aareresidenz.',
  },
  {
    slug: 'grittibaenze-verteilen',
    titel: 'Grittibänze verteilen',
    // TODO review
    teaser:
      'In der Vorweihnachtszeit besuchen wir die Seniorinnen und Senioren im Stedtli und schenken ihnen einen Grittibänz. Eine kleine Geste, die Jahr für Jahr verbindet.',
  },
  {
    slug: 'mithilfe-aareresidenz',
    titel: 'Mithilfe Aareresidenz',
    // TODO review
    teaser:
      'Freiwillige unterstützen die Aareresidenz Büren im Service und schaffen Raum für persönliche Begegnungen. Unter dem Motto: gemeinsam für die Bewohnerinnen und Bewohner.',
  },
  {
    slug: 'geschichten-fuer-die-kleinen',
    titel: 'Geschichten für die Kleinen',
    // TODO review
    teaser:
      'Jeden ersten Samstag im Monat eine Geschichtenstunde in der Bibliothek Büren, für Kinder ab vier Jahren. Zuhören, mitfiebern und die Freude am Lesen entdecken.',
  },
  {
    slug: 'vergabungen',
    titel: 'Vergabungen',
    // TODO review
    teaser:
      'Wir unterstützen Gruppierungen und Institutionen im sozialen Bereich. Gesuche für das Folgejahr nehmen wir bis am 31. Dezember entgegen, die Mitglieder stimmen darüber ab.',
  },
  {
    slug: 'kurse-und-anlaesse',
    titel: 'Kurse und Anlässe',
    // TODO review
    teaser:
      'Gemeinsam lernen und eine gute Zeit verbringen. Offen für alle, auch ohne Mitgliedschaft. Mitglieder profitieren von vergünstigten Teilnahmegebühren.',
  },
]
