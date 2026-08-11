# REFERENCE.md

Verbindliche Gestaltungsreferenz für die Vereinswebsite. Diese Datei ist die
oberste Autorität für Look and Feel. Bei Widerspruch zu einer Skill oder zu
einem Vorschlag im Chat gilt diese Datei.

---

## 1. Leitreferenz

**Lucid, AI recovery ecosystem** (Dribbble-Konzept)
https://dribbble.com/shots/27524013-Lucid-AI-recovery-ecosystems-Website

Screenshots liegen unter `/reference`:

| Datei | Zeigt |
|---|---|
| `hero_and_topnav.png` | Hero-Zustand mit Navigation und überlappenden Kacheln |
| `herotonextsectionanimation.png` | Übergang Hero zu nächster Sektion, Headline im Masken-Reveal |
| `textcard_start.png` | Bildlose Textkarte, Ausgangszustand |
| `textcard_animation_to_next.png` | Dieselbe Karte, horizontaler Wechsel zum nächsten Eintrag |
| `grid_start.png` | Kachel-Grid, Ausgangszustand mit Zahlen |
| `grid_end.png` | Dasselbe Grid nach Count-up der Zahlen |

**Status: Konzept, keine gebaute Seite.** Die Screenshots zeigen Zielzustände,
keine funktionierende Mechanik. Halb gerenderte Wörter in
`herotonextsectionanimation.png` und `textcard_animation_to_next.png` sind
Keyframes aus einem Motion-Mock, keine Scroll-Zustände. Die Mechanik ist in
Abschnitt 4 definiert und gilt dort, nicht im Screenshot.

---

## 2. Was übernommen wird

- **Typografie trägt die Seite.** Grosse Display-Zeilen, harter Sprung zur
  kleinen Fliesstext-Grösse, keine Zwischenstufen als Füllmaterial.
- **Farbe als Fläche, nie als Detail.** Ganze Sektionen und Kacheln in einem
  Farbton. Keine farbigen Icons, keine farbigen Linien, keine Farbverläufe.
- **Bildlose Textkarte als Sektionstyp.** Grosse Headline oben links,
  Fliesstext im rechten Drittel, Steuerung unten links, Fortschrittslinie am
  unteren Rand.
- **Kachel-Grid mit gemischten Kacheltypen.** Foto-Kacheln und rein
  typografische Kacheln im selben Raster.
- **Zahlen als Gestaltungselement.** Grosse Ziffer, kleine erklärende Zeile
  darunter.
- **Sektionen als eingerückte Flächen** mit grossem Radius und sichtbarem
  Weissraum am Rand, statt randlos durchlaufender Blöcke.
- **Der Sektionsübergang selbst ist gestaltet**, nicht nur der Inhalt.

## 3. Was ausdrücklich NICHT übernommen wird

- Die gesamte Produkt- und App-Sprache: Download-App-CTA, "Try repair mode",
  AI-Badges, Sparkle-Icons, Prozent-KPIs als Leistungsversprechen.
- Die Wellness-Tech-Bildwelt: Mond, Wolken, schlafende Person. Das ist die
  Bildwelt des Konzepts, nicht unsere.
- Die Micro-Widgets im Hero (Karten mit Fortschrittspunkten und Prozentwerten).
  Der Hero trägt hier über Video und Typografie.
- Englische, verkaufende Tonalität. Der Verein spricht Deutsch, sachlich,
  ohne Werbeversprechen.
- Die Farbwelt der Referenz (Grau-Blau, Altrosa). Es gelten ausschliesslich
  die Vereinsfarben, siehe DESIGN.md.

---

## 4. Sektions-Mapping und Motion-Mechanik

Jede Sektion nennt: Referenzquelle, Inhalt, Bewegung. Die Bewegungsangaben sind
verbindlich und vollständig. Was hier nicht steht, wird nicht animiert.

### 4.1 Hero
**Referenz:** `hero_and_topnav.png`
**Inhalt:** `hero_video_scrub.mp4`, Vereinsname als Display-Zeile, ein Satz
Subline, maximal zwei Aktionen.
**Bewegung:**
- Video ist scroll-gescrubbt über 100vh Scrolldistanz, Sektion gepinnt.
- Headline-Zeilen einzeln maskiert von unten beim Laden, Stagger 0.08,
  Dauer 0.9, kein Scrub.
- Beim Verlassen des Pins kein Sprung, kein Fade der ganzen Sektion.
- Die Statistik-Karten aus dem Referenzbild werden nicht übernommen. Der untere
  Bereich des Heros bleibt leer. Bewusste Setzung.

### 4.2 Übergang Hero zu Folgesektion
**Referenz:** `herotonextsectionanimation.png`
**Bewegung:**
- Die Folgesektion schiebt sich als eingerückte Fläche mit Radius von unten
  über das auslaufende Hero.
- Deren Headline-Zeilen sind maskiert und werden über dieselbe Scrolldistanz
  eingeblendet, scrub 1, Stagger 0.1.
- Wortweise, nicht buchstabenweise. Nie mitten im Wort geschnitten.

### 4.3 Intro
**Referenz:** `grid_start.png`, `grid_end.png` für die Zahlenkacheln
**Inhalt:** Kurztext zum Verein plus die drei Zahlen als typografische Kacheln:
**1953** (gegründet), **310** (Mitglieder), **8** (Ressorts). Kein Bild.
**Bewegung:**
- Kacheln gestaffelt eingeblendet, Stagger 0.06, kein Scrub.
- Zahlen zählen beim ersten Eintritt hoch, Dauer 1.2, `once: true`.

### 4.4 Ressorts, Startseite
**Referenz:** `textcard_start.png`, `textcard_animation_to_next.png`
**Inhalt:** 8 Ressorts, kein Bildmaterial. Titel, Vorschautext (maximal
30 Wörter), Link zur Ressort-Detailseite.
**Bewegung:**
- Sektion gepinnt, horizontale Spur über die 8 Einträge.
- Scroll-gekoppelt, scrub 1. Zusätzlich Vor- und Zurück-Steuerung unten links.
- Fortschrittslinie am unteren Rand mit 8 Punkten, aktiver Punkt als Ring.
- Beim Wechsel: alter Text raus nach links mit Maske, neuer rein von rechts.
  Headline und Fliesstext mit leichtem Versatz, Stagger 0.06.
- Hintergrundfarbe der Karte zykliert durch die drei Vereinstöne. Die Farbe
  identifiziert kein Ressort.

### 4.5 Vorstand
**Liegt auf `/verein`, nicht auf der Startseite.**
**Referenz:** `grid_start.png` als Rasterlogik
**Inhalt:** Gruppenbild und **7 Portraits**. Keine Zahlenkacheln, die stehen
im Intro der Startseite.
**Aufbau: EIN einziges Raster.** Kein Bannerbild darüber, keine getrennten
Blöcke. Portraits und Farbkachel liegen im selben Grid, identischer Gutter,
identischer Radius. Das Prinzip stammt aus `grid_start.png`: Kacheln
unterschiedlicher Spaltenbreite, Fotokacheln gemischt mit farbigen Flächen.

**Das Gruppenbild gehört NICHT in dieses Raster.** Es steht in der Sektion
Hauptversammlung, siehe 4.5b.

**Rasterbelegung ab 1024px, 10 Spalten:**

| Reihe | Belegung |
|---|---|
| 1 | Farbkachel `span 4` + Co-Präsidentin A `span 3` + Co-Präsidentin B `span 3` |
| 2 | 5 Vorstandsmitglieder, je `span 2` |

- Die Kacheln der Reihe 1 sind dadurch deutlich grösser als die der Reihe 2.
  Die Hierarchie entsteht über die Spaltenspanne, nicht über Zusatzregeln.
- **Die Farbkachel ist genau so hoch wie die beiden Portraits daneben**,
  geändert am 11.08.2026. Sie ist damit im Querformat, aber nicht mehr auf 4:3
  festgelegt: das Verhältnis folgt aus dem Raster. Bei Spaltenbreite c und
  Gutter g ist ein Portrait `(3c + 2g) × 4/3` hoch und die Farbkachel
  `(4c + 3g)` breit, das Verhältnis der beiden liegt über den ganzen Bereich
  ab 1024px zwischen 1.039 und 1.043. Eine Konstante von 1.041 trifft die
  Portraithöhe damit auf zwei Pixel genau und die Zelle behält die feste Höhe,
  die die Kachel-Expansion braucht. Unter 1024px steht die Kachel allein über
  beide Spalten und bleibt bei 4:3.
- Text der Farbkachel, wörtlich:
  "Menschen zusammenbringen, lokale Projekte unterstützen und das Miteinander
  stärken."
- Farbe der Farbkachel aus den drei Vereinstönen, Textfarbe nach den
  Kontrastregeln in DESIGN.md 2.

**768px bis 1024px, 2 Spalten:** Farbkachel `span 2`, Co-Präsidentinnen je
`span 1`, die 5 übrigen je `span 1`, die letzte `span 2`.

**Unter 768px, 2 Spalten:** Farbkachel `span 2`, alle Portraits je `span 1`,
die letzte `span 2`.

**Weitere Regeln:**
- Portraitkacheln einheitlich 3:4.
- Name und Funktion als Caption unter dem Bild. Sie stehen dort dauerhaft und
  ungedeckt, das bleibt die Zuordnung im Ruhezustand.
- Gleicher Radius, gleicher Gutter für alle Kacheln, auch für die farbige.

**Motivations-Overlay auf den Portraitkacheln**, ergänzt am 11.08.2026. Bis
dahin verbot diese Datei jedes Overlay über dem Gesicht. Die Regel gilt
weiterhin für den Ruhezustand: ungefragt liegt nichts über einem Portrait.
Erlaubt ist ausschliesslich das folgende, angeforderte Overlay.

- Inhalt ist der Abschnitt "Motivation" aus `content/texte/verein.txt`, wörtlich.
  Der Abschnitt "Persönlich" wird nicht verwendet.
- Das Overlay deckt die Bildkachel vollflächig ab, gleicher Radius, gleiche
  Kachelgrenzen. Es reicht nie über die Kachel hinaus.
- Hintergrund in einem der drei Vereinstöne, rotierend über die 7 Kacheln, nie
  zweimal derselbe nebeneinander, auch nicht übereinander. Die Farbe bedeutet
  nichts. Textfarbe nach den Kontrastregeln in DESIGN.md 2.
- Über dem Fliesstext steht die Zeile "Meine Motivation" als Überschrift, im
  selben Grad wie der Fliesstext, aber im halbfetten Schnitt.
- **Name und Funktion stehen nicht im Overlay**, geändert am 11.08.2026. Sie
  stehen dauerhaft als Caption unter der Kachel, also auch während das Overlay
  offen ist. Eine Wiederholung im Overlay kostet nur zwei Zeilen, die der
  Motivationstext braucht.
- Ab 768px auf Hover, darunter auf Tap, immer nur eines gleichzeitig offen, Tap
  ausserhalb schliesst. Bei Tastaturfokus auf jeder Breite.
- Der Text ist dauerhaft im DOM und im Accessibility-Baum. Verborgen wird
  ausschliesslich über `opacity`, nie über `display: none`.
- **Textgrenze: rund 125 Zeichen**, gemessen am 11.08.2026 an den echten
  Kacheln. Massgebend ist die Kachel bei 1024px mit 147 × 197px. Mit
  gleichmässig kurzen Wörtern passen dort 160 Zeichen, mit langen
  Zusammensetzungen scheitert schon ein Text mit 129 Zeichen: die Wortlänge
  wiegt schwerer als die Zeichenzahl. 125 ist der Wert, der beides trägt.
  Wer darüber hinaus will, muss vorher das Raster ändern.

**Bewegung des Overlays:** nur CSS, Ein- und Ausblenden über `opacity` unter
200ms. Kein GSAP. Die Kachel-Expansion bleibt unverändert, das Overlay fasst
weder Höhe noch Radius an.

**Bewegung: Kachel-Expansion, siehe DESIGN.md 5.** Kein Fade-up.

### 4.5b Hauptversammlung
**Inhalt:** Text aus `content/texte/verein.txt` und das Gruppenbild
`group_org.jpg`. Das Bild wird hier in das Layout der Sektion eingebunden,
nicht als freistehendes Banner darübergesetzt.
**Bewegung:** Kachel-Expansion für das Bild, Masken-Reveal für die
Textzeilen.
**Bewegung:**
- Gruppenbild und Kacheln gestaffelt eingeblendet, Stagger 0.06, kein Scrub,
  `once: true`.

### 4.6 Ressort-Übersicht, eigene Seite
**Referenz:** `grid_start.png`
**Inhalt:** 8 Ressorts als Grid, rein typografisch, kein Bild.
**Bewegung:** gestaffelter Eintritt, Stagger 0.06. Kein Count-up.

### 4.7 Flyer-Grid, Startseite
**Referenz:** `grid_start.png` als Rasterlogik
**Inhalt:** Flyer-Thumbnails aus dem CMS. Gedruckte Flyer sind eigenständige
Grafikobjekte und dürfen gross auftreten.
**Bewegung:** gestaffelter Eintritt, Stagger 0.06.

### 4.8 Events
**Referenz:** keine direkte, Rasterlogik aus `grid_start.png`
**Inhalt:** Monatsraster plus Listenansicht. Muss ohne Eventbild vollständig
funktionieren, Bild ist optional.
**Bewegung:** minimal. Nur Eintritt der Liste, kein Pin, kein Scrub.

### 4.9 Kontakt-CTA, Abschluss der Startseite
**Referenz:** keine direkte
**Inhalt:** Ein vollflächiges Band in einem der drei Vereinstöne. Eine
Display-Zeile, ein Satz, eine Aktion, die auf `/kontakt` führt.
**Ausdrücklich nicht:** Adresse, Telefonnummer, E-Mail, Öffnungszeiten,
Formular oder Karte. Diese Angaben stehen ausschliesslich auf `/kontakt`.
**Bewegung:** Masken-Reveal der Display-Zeile beim Eintritt, `once: true`.

---

## 5. Harte Regeln

- **Bildbudget: das Hero-Video, das Gruppenbild und 7 Portraits.** Sonst keine
  Fotografie auf der gesamten Website. Kein Stock, keine generierten Bilder,
  keine Platzhalterbilder. Keine Sektion darf so entworfen sein, dass sie ohne
  Foto leer wirkt.
- **Eine Animation-Engine: GSAP mit ScrollTrigger und ScrollSmoother.** Kein
  Framer Motion, kein Lenis, keine weitere Motion-Library.
- **Kein CMS-Import im Frontend während des Design-Passes.** Events und Flyer
  kommen aus statischen Fake-Daten in der späteren Payload-Form.
- **Kein Fade-up beim Sektionseintritt als Standardbewegung.** Jede Bewegung
  ist in Abschnitt 4 benannt oder findet nicht statt.
- **Deutsche Texte in Schweizer Rechtschreibung.** Nie das deutsche Eszett,
  immer ss. Keine Geviertstriche, stattdessen Komma, Doppelpunkt oder
  Bindestrich mit Leerzeichen.
- **Reduced Motion respektiert.** Über `gsap.matchMedia()`, alle Scrubs und
  Pins deaktiviert, kein Smoother, Inhalt vollständig sichtbar.

---

## 6. Akzeptanzkriterien

Am fertigen Ergebnis prüfbar. Jedes "nein" ist ein Fehler, kein Geschmack.

1. Deckt man alle Fotos mit grauen Flächen ab, bleibt jede Sektion ausser dem
   Hero vollständig lesbar und gestaltet.
2. Es gibt keine Sektion mit einem leeren Bildplatz oder Platzhalterbild.
3. Der Typo-Sprung zwischen Display und Fliesstext ist gross genug, dass man
   ihn ohne Vergleich erkennt.
4. Farbe erscheint als Fläche. Es gibt keine farbigen Icons, Linien oder
   Verläufe.
5. Keine Sektion ist Bild links, Text rechts.
6. Kein Text ist mitten im Wort abgeschnitten, in keinem Scroll-Zustand.
7. Jede Bewegung lässt sich einem Punkt aus Abschnitt 4 zuordnen.
8. Die Seite enthält kein englisches Wort ausser Eigennamen.
9. Nichts auf der Seite liest sich wie ein Produkt- oder App-Versprechen.
10. Auf 375px Breite funktioniert jede Sektion ohne horizontales Scrollen, die
    Ressort-Spur eingeschlossen.
11. Alle 7 Portraits haben denselben Zuschnitt und innerhalb ihrer Reihe
    dieselbe Kachelhöhe.

---

## 7. Offene Entscheidungen

- [ ] Grundton der Seite: Weiss oder gebrochenes Weiss
- [ ] Kontrast der Hero-Headline über dem Video, prüfen sobald das Video
      analysiert ist
- [ ] Reihenfolge der 8 Ressorts, falls sie inhaltlich etwas bedeutet
