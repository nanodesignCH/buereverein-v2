/* The eight ressorts. Titles are the authoritative spellings, order follows
   /content/texte/ressorts.txt, which carries no meaning, so no numbering.
   Every "teaser" below is condensed from the long text in ressorts.txt and
   stays under 30 words. */

export const RESSORTS = [
  {
    slug: 'brockenstube',
    titel: 'Brockenstube',
    // TODO review
    teaser: 'Gut erhaltene Gegenstände aus zweiter Hand: Haushaltswaren, Kleidung, Bücher und besondere Einzelstücke. Was Sie weitergeben möchten, nehmen wir gerne entgegen, Möbel ausgenommen.',
  },
  {
    slug: 'ferienplausch',
    titel: 'Ferienplausch',
    // TODO review
    teaser: 'Ein abwechslungsreiches Freizeitangebot für Schülerinnen und Schüler aus Büren und Oberwil während den Sommerferien: kreative Workshops, sportliche Aktivitäten und Kurse in der Natur.',
  },
  {
    slug: 'familybox',
    titel: 'FamilyBox',
    // TODO review
    teaser: 'Für alle, die Kinder von null Jahren bis zum Schuleintritt betreuen: Aktivitäten drinnen und draussen, Infoveranstaltungen und das Generatione-Bistro zusammen mit der Aareresidenz.',
  },
  {
    slug: 'grittibaenze-verteilen',
    titel: 'Grittibänze verteilen',
    // TODO review
    teaser: 'In der Vorweihnachtszeit besuchen wir die Seniorinnen und Senioren im Stedtli und schenken ihnen einen Grittibänz. Eine kleine Geste, die Jahr für Jahr verbindet.',
  },
  {
    slug: 'mithilfe-aareresidenz',
    titel: 'Mithilfe Aareresidenz',
    // TODO review
    teaser: 'Freiwillige unterstützen die Aareresidenz Büren im Service und schaffen Raum für persönliche Begegnungen. Unter dem Motto: gemeinsam für die Bewohnerinnen und Bewohner.',
  },
  {
    slug: 'geschichten-fuer-die-kleinen',
    titel: 'Geschichten für die Kleinen',
    // TODO review
    teaser: 'Jeden ersten Samstag im Monat eine Geschichtenstunde in der Bibliothek Büren, für Kinder ab vier Jahren. Zuhören, mitfiebern und die Freude am Lesen entdecken.',
  },
  {
    slug: 'vergabungen',
    titel: 'Vergabungen',
    // TODO review
    teaser: 'Wir unterstützen Gruppierungen und Institutionen im sozialen Bereich. Gesuche für das Folgejahr nehmen wir bis am 31. Dezember entgegen, die Mitglieder stimmen darüber ab.',
  },
  {
    slug: 'kurse-und-anlaesse',
    titel: 'Kurse und Anlässe',
    // TODO review
    teaser: 'Gemeinsam lernen und eine gute Zeit verbringen. Offen für alle, auch ohne Mitgliedschaft. Mitglieder profitieren von vergünstigten Teilnahmegebühren.',
  },
];

export const TONES = ['terracotta', 'brick', 'mauve'];

export const ARROW = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

/* Progress rail with one dot per entry, active dot rendered as a ring. */
export function buildProgress(host, count, onJump) {
  host.innerHTML = '<div class="rail"></div>';
  const rail = host.querySelector('.rail');
  for (let i = 0; i < count; i++) {
    const b = document.createElement('button');
    b.className = 'dot';
    b.type = 'button';
    b.setAttribute('aria-label', `Zu Eintrag ${i + 1} von ${count}`);
    b.addEventListener('click', () => onJump(i));
    rail.appendChild(b);
  }
  const dots = [...rail.querySelectorAll('.dot')];
  return (active) => dots.forEach((d, i) => d.setAttribute('aria-current', String(i === active)));
}
