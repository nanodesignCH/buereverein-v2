# DESIGN.md

Das Gestaltungssystem. REFERENCE.md sagt, **wie es aussieht**. Diese Datei sagt,
**womit es gebaut wird**. Bei Widerspruch gilt REFERENCE.md.

---

## 1. Haltung

Die Seite trägt über Typografie, Fläche und Raum. Fotografie ist knapp und
kostbar, nicht strukturgebend. Reines Schwarz auf reinem Weiss, dazu drei warme
entsättigte Töne als ganzflächige Bänder.

**Signature-Element:** die horizontale Ressort-Spur. Eine gepinnte Sektion,
durch die man seitlich scrollt, während die Flächenfarbe durch die drei
Vereinstöne zykliert. Das ist das eine Element, an das man sich erinnern soll.
Alles andere bleibt ruhig und diszipliniert.

---

## 2. Farben

```css
:root {
  --color-ink:        #000000;
  --color-paper:      #ffffff;
  --color-newsprint:  #e8e8e8;
  --color-pewter:     #bfbfbf;
  --color-terracotta: #c16a49;
  --color-brick:      #bc4947;
  --color-mauve:      #cd7a9f;
}
```

### Rollen

| Token | Rolle |
|---|---|
| `ink` | Alle Texte, Rahmen, Icon-Striche, Button-Umrisse, Strukturlinien |
| `paper` | Canvas, Kartenflächen, Button-Fills, invertierter Text |
| `newsprint` | Ruhiges alternierendes Band ohne Farbe |
| `pewter` | Ausschliesslich Divider, Rahmen, inaktive Punkte der Fortschrittslinie |
| `terracotta`, `brick`, `mauve` | Vollflächige Bänder und Kacheln, Kategorie-Label, Marker |

### Verbindliche Kontrastregeln

Gerechnet gegen die Hex-Werte. Nicht abweichen, nicht schätzen.

| Fläche | Fliesstext | Grosse Displayzeile |
|---|---|---|
| `brick` | `paper` (ca. 5.0:1) | `paper` |
| `terracotta` | `ink` (ca. 5.4:1) | `ink`, `paper` nur ab 40px |
| `mauve` | `ink` (ca. 6.9:1) | `ink`. **Nie `paper`**, liegt bei ca. 3.0:1 |
| `paper` | `ink` | `ink` |
| `newsprint` | `ink` | `ink` |

**`pewter` ist nie Textfarbe.** Auf Weiss liegt es bei rund 1.8:1. Wenn
gedämpfter Text gebraucht wird, `ink` mit reduzierter Grösse oder Versalien,
nicht mit reduziertem Kontrast.

### Farbeinsatz

- Farbe erscheint nur als **Fläche**. Keine farbigen Icons, keine farbigen
  Linien, keine farbigen Rahmen, keine Farbverläufe, keine farbigen Schatten.
- **Farbe identifiziert kein Ressort.** In der Ressort-Spur zykliert der
  Hintergrund beim Scrollen durch `terracotta → brick → mauve → terracotta …`.
  Das ist ein Bewegungseffekt, keine Zuordnung.
- Die Neutralen bleiben rein. Kein Beige, kein Creme, kein warmes Weiss. Sobald
  `paper` ins Beige driftet, kippt die Seite in einen generischen Look.
- Farbwechsel zwischen Sektionen sind hart, nicht verlaufend, ausser wo
  REFERENCE.md Abschnitt 4 einen Scrub vorgibt.

---

## 3. Typografie

**Display: Clash Display.** **Fliesstext: Satoshi.** Beide von Fontshare,
selbst gehostet über `next/font/local` mit `display: 'swap'` und
`preload: true` für die auf der Startseite verwendeten Schnitte.

Vor dem Build prüfen: `ä ö ü` in allen eingebundenen Schnitten vorhanden.

### Skala

Bewusst mit Lücken. Es gibt keine Zwischengrössen, auch nicht "nur an dieser
einen Stelle".

```css
--text-display-xl: clamp(3.25rem, 9vw, 8.5rem);   /* Hero */
--text-display-l:  clamp(2.25rem, 6vw, 5rem);     /* Sektions-Headlines */
--text-display-m:  clamp(1.75rem, 3.5vw, 3rem);   /* Karten-Headlines, Zahlen */
--text-body-l:     1.25rem;                        /* Hero-Subline, Lead */
--text-body:       1rem;                           /* Fliesstext */
--text-caption:    0.8125rem;                      /* Label, Meta */
```

### Regeln

- Display-Grössen: `line-height: 0.95`, `letter-spacing: -0.02em`, Gewicht
  Medium oder Semibold. Nie Light in grossen Graden.
- Fliesstext: `line-height: 1.6`, Regular, `max-width: 58ch`.
- Caption: Versalien, `letter-spacing: 0.08em`, `--color-ink`.
- **Nie Display und Fliesstext in aufeinanderfolgenden Grössen.** Der Sprung
  von `display-l` auf `body` ist gewollt und muss ohne Vergleich erkennbar sein.
- Keine Kursiven, keine Unterstreichungen ausser bei Fliesstext-Links.
- Zahlen (1953, 310, 8) werden in `display-m` oder `display-l` gesetzt, mit
  einer `caption`-Zeile darunter.

---

## 4. Layout

```css
--radius:        24px;   /* eingerückte Flächen, Kacheln */
--radius-pill:   999px;  /* Buttons */
--inset:         clamp(12px, 2vw, 32px);  /* Rand um eingerückte Flächen */
--gutter:        clamp(16px, 4vw, 64px);  /* Innenabstand */
--section-gap:   clamp(64px, 10vh, 160px);
--scrim:         0.58;  /* ink-Abdunkler über dem Hero-Bild, Kundenentscheid */
--track-card:    clamp(280px, 62vw, 720px);  /* Kachelbreite der Ressort-Spur */
```

**Eingerückte Flächen sind gesetzt.** Sektionen sitzen als Flächen mit
`--radius` innerhalb eines Rands von `--inset` auf `--color-paper`. Das gilt
für **jede** Sektion ohne Ausnahme, oder für keine. Keine Mischform.

Raster: 12 Spalten, Gutter `--gutter`. Ab 768px zweispaltig, ab 1024px
vollständig.

**Verboten:** identische Sektionshöhen, gleichförmiger vertikaler Rhythmus,
zentrierter Fliesstext, "Bild links Text rechts".

---

## 5. Motion-System

Grundlage: GSAP 3.13+ mit ScrollTrigger, ScrollSmoother, SplitText,
ScrollToPlugin und `@gsap/react`. Keine weitere Library.

### Konstanten

```ts
export const DUR   = { fast: 0.6, base: 0.9, slow: 1.2 } as const
export const EASE  = { out: 'power3.out', inOut: 'power2.inOut', scrub: 'none' } as const
export const STAG  = { tight: 0.06, base: 0.08, loose: 0.1 } as const

// Verschiebungswege in Prozent der eigenen Elementhöhe. Aus dem Prototyp-Gate
// übernommen, damit dieselben Zahlen nicht zweimal im Code stehen.
export const SHIFT = { line: 115, word: 110, tile: 40 } as const

```

`SHIFT.line` gilt für den zeilenweisen Masken-Reveal, `SHIFT.word` für den
wortweisen auf einem Scrub, `SHIFT.tile` für den gestaffelten Eintritt von
Rasterelementen. Andere Werte gibt es nicht.

- Eintritts-Animationen: `EASE.out`, einmalig, `once: true`.
- Scroll-gekoppelte Animationen: `scrub: 1`, `ease: 'none'`. Nie eine Ease auf
  einem Scrub.
- Jede Animation wird in `gsap.matchMedia()` angelegt, mit einem Zweig für
  `(prefers-reduced-motion: reduce)`, in dem Pins und Scrubs entfallen und der
  Inhalt vollständig sichtbar ist.
- Genau ein `ScrollTrigger` pro Sektion, angelegt im Section-Component über
  `useGSAP({ scope: ref })`.
- Plugins genau einmal registrieren, in `/src/lib/gsap.ts`.

### ScrollSmoother-Setup

ScrollSmoother verlangt eine feste Markup-Struktur. Diese steht im Root-Layout:

```tsx
<body>
  <SiteHeader />            {/* fixed, MUSS ausserhalb des Wrappers liegen */}
  <div id="smooth-wrapper">
    <div id="smooth-content">
      {children}
      <SiteFooter />
    </div>
  </div>
</body>
```

- **Alles mit `position: fixed` liegt ausserhalb von `#smooth-wrapper`.** Die
  Navigation, ein späteres Cookie-Banner, jedes Overlay. Innerhalb des Wrappers
  funktioniert `fixed` nicht wie erwartet.
- Erstellt in einem Client-Component über `useGSAP()`:
  `ScrollSmoother.create({ smooth: 1.2, smoothTouch: false, effects: false })`
- `effects: false` ist Absicht. Parallax läuft über explizite ScrollTrigger,
  nicht über Data-Attribute.
- Nach dem Laden der Schriften und der Bilder einmal `ScrollTrigger.refresh()`,
  sonst stimmen die Pin-Distanzen nicht.

### ScrollSmoother und der App Router

ScrollSmoother synchronisiert sich bei Routenwechseln nicht von selbst. Ohne
die folgenden Punkte sind auf der zweiten Seite die Pin-Distanzen falsch und
die Seite startet auf halber Höhe. Das ist die häufigste Fehlerquelle in diesem
Setup und muss von Anfang an sitzen.

- Die Smoother-Instanz wird **einmal** im Root-Layout erzeugt, nicht pro Seite.
  Sie überlebt Routenwechsel.
- Bei jedem Routenwechsel, erkannt über `usePathname()`:
  1. `ScrollSmoother.get()?.scrollTo(0, false)` - ohne Animation an den Anfang
  2. `ScrollTrigger.refresh()` erst **nach** dem Rendern der neuen Seite
- Alle ScrollTrigger einer Seite werden über `useGSAP({ scope })` im jeweiligen
  Section-Component angelegt. Damit räumt der Hook sie beim Unmount selbst auf.
  Kein manuelles `kill()`.
- Bilder mit unbekannter Höhe erzwingen ein `refresh()` nach dem Laden. Deshalb
  auf jedem `next/image` Breite und Höhe setzen, damit die Layouthöhe vor dem
  Laden feststeht.
- `ScrollTrigger.refresh()` niemals in einer Scroll-Handler-Schleife aufrufen.
- Bei `prefers-reduced-motion: reduce` wird **kein** Smoother erzeugt. Die
  Wrapper-Struktur bleibt im DOM, der native Scroll übernimmt.

### Hero-Bild

Quelle: `/public/images/hero.jpg`, aufbereitet aus `content/bilder/hero-poster.jpg`.
1664 x 1248, also 4:3.

**Am 10.08.2026 auf Kundenwunsch:** das frühere Scrub-Video ist ersatzlos
entfernt, samt Pin, Scrolldistanz, Ladezuständen und Mobil-Sonderfall.
`hero_video_scrub.mp4` liegt nicht mehr unter `/public`.

```tsx
<Image
  src="/images/hero.jpg"
  alt="Die Altstadt von Büren an der Aare mit Kirchturm und gedeckter Holzbrücke, gespiegelt im Wasser"
  fill
  priority
  sizes="100vw"
  className="hero-media"
/>
```

Mechanik:

- **Keine.** Das Hero hat keinen `ScrollTrigger`, keinen Pin, keinen Scrub und
  keine eigene Scrolldistanz. Es scrollt wie jede andere Sektion.
- `priority` sorgt dafür, dass das Bild nicht nachlädt. Es ist das einzige Bild
  über der Falz.
- Die einzige Bewegung ist der Masken-Reveal der Headline-Zeilen beim Laden, und
  die liegt in `MaskedHeading`. Die Hero-Komponente selbst braucht deshalb kein
  Client-Bundle.
- Bei `prefers-reduced-motion: reduce` entfällt der Reveal, sonst ändert sich
  nichts. Es gibt nichts weiter abzuschalten.
- `.hero-media` trägt nur noch den Beschnitt, `object-fit` und
  `object-position`. Position und Grösse liefert `next/image` mit `fill`.

**Platzierung nach `reference/hero_and_topnav.png`:**

- Navigation oben, ausserhalb der Fläche, auf `paper`. **Vereinslogo links**
  (`/images/logo_buereverein.png`, gestapelte Lockup-Fassung), Links mittig,
  eine hervorgehobene Aktion rechts als Pill in `ink`.
  Die Höhe der Leiste ist die feste Grösse, das Logo richtet sich danach:
  52px Logo neben 72px Leiste, 42px neben 64px. Das Bild trägt rundum 15px
  transparenten Rand, sichtbar sind davon rund 92 Prozent.
- Darunter das Hero als eingerückte Fläche mit `--radius`, das Bild als
  Hintergrund, `object-fit: cover`.
- **`object-position: var(--hero-focus)`, gesetzt auf `50% 6%`.** Das Bild ist
  4:3, die Hero-Fläche deutlich breiter als hoch, `cover` schneidet also immer
  Höhe weg. Zentriert fallen je nach Fenster 12 bis 18 Prozent oben weg, genau
  dort steht der Kirchturm: gemessen liegt der oberste Nicht-Himmel-Pixel bei
  3.0 Prozent der Bildhöhe, die durchgehende Dachlinie bei 22 Prozent.
  Bei 6 Prozent bleibt der Beschnitt oben über alle Fensterbreiten unter
  2.5 Prozent, der Turm bleibt stehen, der Rest geht unten ab, dort ist Wasser.
- Über dem Bild ein flächiger Abdunkler in `ink` mit **`--scrim: 0.50`**, kein
  Verlauf. Kundenentscheid vom 11.08.2026 zugunsten der Bildhelligkeit. Der Wert
  hält die Kontrastregeln, siehe REFERENCE.md 4.1.
- Headline zentriert, **zwei von Hand gesetzte Zeilen**, `display-xl`, in
  `paper`. Kein automatischer Umbruch, jede Zeile in einer eigenen Maske.
  Sie erreicht 4.17 bis 4.45:1 gegen geforderte 3.0.
- Darunter die Subline in `body-l`. Sie erreicht 4.60 bis 4.76:1 gegen
  geforderte 4.5, hat damit aber fast keine Reserve. **0.50 ist der Boden**,
  siehe REFERENCE.md 4.1.
- Darunter zwei Aktionen als Pills.
- **Die Statistik-Karten aus dem Referenzbild werden nicht übernommen.**
  Der untere Bereich des Heros bleibt leer. Das ist eine bewusste Setzung.

### Erlaubte Bewegungsprimitive

Mehr gibt es nicht:

1. **Masken-Reveal** von Text, zeilen- oder wortweise über SplitText. Nie
   buchstabenweise, nie mitten im Wort geschnitten.
2. **Pin plus Scrub** für den Sektionsübergang und die Ressort-Spur.
   Das Hero hat seit dem 10.08.2026 weder Pin noch Scrub.
3. **Horizontale Spur** in gepinnter Sektion, mit Fortschrittslinie.
4. **Gestaffelter Eintritt** von Rasterelementen.
5. **Count-up** von Zahlen, einmalig beim ersten Eintritt.
6. **Hover** auf Buttons und Links: Farbwechsel oder Umrissstärke, unter 200ms,
   nur CSS, kein GSAP.

---

## 6. Komponenten-Inventar

Mehr wird nicht gebaut, ohne Rückfrage:

**UI:** `Button` (Pill, Varianten solid und outline), `Tag`, `Divider`,
`StatNumber`, `ProgressTrack`, `NavArrow`

**Sections:** `Hero`, `Intro`, `RessortTrack`, `FlyerGrid`, `EventsPreview`,
`KontaktCta`, `VorstandGrid` (nur auf `/verein`)

**Motion:** `SmoothScrollProvider`, `MaskedHeading`, `StaggerGroup`, `CountUp`

---

## 7. Seiten

| Route | Inhalt |
|---|---|
| `/` | Hero, Intro, Ressort-Spur, Flyer-Grid, Events-Vorschau, Kontakt-CTA |
| `/ressorts` | Ressort-Übersicht als typografisches Grid, kein Bild |
| `/ressorts/[slug]` | 8 statische Detailseiten, Langtext aus `/content/texte` |
| `/events` | Monatsraster plus Listenansicht, funktioniert ohne Bilder |
| `/verein` | Geschichte, Vorstand, Zahlen |
| `/mitglied-werden` | Mitgliedschaft, Beiträge, die 6 FAQ. Nav-Label "Jetzt anmelden" |
| `/kontakt` | Kontaktangaben, später Formular |

Auf `/` stehen **kein Vorstand und keine Kontaktangaben**. Die Adresse und die
beiden Social-Links stehen ausschliesslich im Footer.

**Ressort-Detailseite**, da in REFERENCE.md noch nicht spezifiziert: Kopf mit
`display-l` auf einer Vollfläche im zyklierenden Ressort-Ton, darunter Langtext
einspaltig mit `max-width: 58ch` auf `paper`, darunter zugehörige Events als
Liste, kein Bild. Bewegung nur Masken-Reveal der Kopfzeile.

---

## 8. Offene Punkte

- [x] Kontrast Headline über dem Hero-Bild: gemessen, `--scrim: 0.50`
- [x] Reihenfolge der 8 Ressorts: Quellreihenfolge, ohne Bedeutung, ohne
      Nummerierung
- [x] Hero-Abdunkler auf 50 %, Kontrastregeln eingehalten. Die Messung vom
      10.08.2026, die einen Verstoss auswies, war ein Rechenfehler, siehe
      REFERENCE.md 4.1
- [ ] Zahlungsanbieter: Stripe oder Payrexx
- [ ] `Flyer.thumbnail` ist jetzt optional. Flyer ohne Vorschaubild erscheinen
      als rein typografische Kachel im selben Raster.
