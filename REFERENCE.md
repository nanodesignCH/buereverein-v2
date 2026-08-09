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
  **Eine Ausnahme, entschieden am 09.08.2026: das Vereinslogo.**
  `logo_buereverein.png` ist eine mehrfarbige Strichzeichnung und steht seit
  diesem Entscheid links in der Kopfzeile, an Stelle der typografischen
  Wortmarke. Es ist das einzige farbige Grafikelement der Seite. Die Regel gilt
  weiterhin für alles andere, insbesondere für Icons, Linien und Rahmen.
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

**Gewählt im Prototyp-Gate am 09.08.2026: Variante A, zentrierte Komposition.**
Die folgende Beschreibung ist die Mechanik dieses Prototyps und ersetzt jede
frühere Angabe.

**Referenz:** `hero_and_topnav.png`
**Inhalt:** `hero_video_scrub.mp4`, Vereinsname als Display-Zeile, ein Satz
Subline, maximal zwei Aktionen.

**Aufbau:**
- Navigation oben auf `paper`, ausserhalb der Fläche und ausserhalb des
  Smoother-Wrappers.
- Darunter das Hero als eingerückte Fläche mit `--radius`, Rand `--inset` auch
  unten. Video als Hintergrund, `object-fit: cover`.
- Über dem Video ein **flächiger Abdunkler in `ink` mit 39 % Deckkraft**, kein
  Verlauf. Der Wert ist gemessen, nicht geschätzt: das Video führt in jedem
  waagrechten Band gleichzeitig nahezu weisse und nahezu schwarze Flächen, ohne
  Abdunkler liegt `paper` bei 1.11:1. Bei 39 % erreicht die Displayzeile 3.02:1.
- Inhaltsraster in drei Zeilen `1fr / auto / 1.15fr`. Der Textblock sitzt in der
  mittleren Zeile, zentriert: Headline, Subline, zwei Pills.
- Headline in **zwei von Hand gesetzten Zeilen**, nicht automatisch umbrochen.
  Jede Zeile liegt in einer eigenen Maske. Damit kann keine Zeile mitten im Wort
  geschnitten werden.
- Die untere Zeile bleibt leer. Die Statistik-Karten des Referenzbildes werden
  nicht übernommen. Bewusste Setzung.

**Bewegung, Reihenfolge der Teilanimationen:**

1. **Beim Laden, ohne Scroll:** die beiden Headline-Zeilen fahren maskiert von
   unten ein, `yPercent: 115 → 0`, Dauer `DUR.base`, Stagger `STAG.base`,
   `EASE.out`. Kein Scrub. Subline und Pills werden nicht animiert.
2. **Beim Scrollen:** ein einziger `ScrollTrigger` auf der Hero-Sektion,
   `start: 'top top'`, `end: '+=100%'`, `pin: true`, `pinSpacing: true`,
   `scrub: true`, `invalidateOnRefresh: true`.
3. Dieser Trigger fährt ein Proxy-Objekt `{ time: 0 }` von 0 auf
   `duration - 0.05`, `ease: 'none'`.
4. **`video.currentTime` wird nicht im `onUpdate` des Tweens gesetzt**, sondern
   in einer eigenen `requestAnimationFrame`-Schleife, die den Proxy ausliest.
   Sie setzt nur, wenn `readyState >= 2`, nicht `seeking`, `seekable.length > 0`
   und die Abweichung grösser als `1/48` Sekunde ist. Grund: ein Tick, der
   feuert bevor die Datei seekbar ist, geht sonst dauerhaft verloren, weil ein
   fertig gescrubbter Tween nicht mehr tickt. Das war im Prototyp der einzige
   Fehler, der das Scrubbing vollständig lahmlegte.
5. Beim Verlassen des Pins kein Sprung, kein Fade der ganzen Sektion.

**Reduced Motion:** kein Video, `src` wird entfernt, das Poster steht. Kein Pin,
kein Scrub, kein Smoother. Die Headline-Zeilen stehen sofort auf Endposition.

### 4.2 Übergang Hero zu Folgesektion
**Referenz:** `herotonextsectionanimation.png`

In Variante A **überlappt die Folgesektion das Hero nicht.** Sie steigt mit
Weissraum dazwischen nach, so wie es der Screenshot zeigt: zwei getrennte
eingerückte Flächen, die untere fährt hoch. Die Formulierung "schiebt sich über
das auslaufende Hero" galt der Vermutung, nicht dem Bild.

**Bewegung:**
- Die Folgesektion ist eine eigene eingerückte Fläche mit `--radius`, getrennt
  durch `--section-gap`. Kein negativer Versatz, kein `z-index`-Stapel.
- Ihre Headline wird **wortweise** maskiert eingeblendet, über SplitText mit
  `type: 'words'` und `mask: 'words'`, `yPercent: 110 → 0`, `ease: 'none'`,
  `scrub: 1`, Stagger `STAG.loose`.
- Eigener `ScrollTrigger` auf der Folgesektion, `start: 'top 85%'`,
  `end: 'top 35%'`.
- Wortweise, nie buchstabenweise, nie mitten im Wort geschnitten.

### 4.3 Intro
**Referenz:** `grid_start.png`, `grid_end.png` für die Zahlenkacheln
**Inhalt:** Kurztext zum Verein plus die drei Zahlen als typografische Kacheln:
**1953** (gegründet), **310** (Mitglieder), **8** (Ressorts). Kein Bild.
**Bewegung:**
- Kacheln gestaffelt eingeblendet, Stagger 0.06, kein Scrub.
- Zahlen zählen beim ersten Eintritt hoch, Dauer 1.2, `once: true`.

### 4.4 Ressorts, Startseite

**Gewählt im Prototyp-Gate am 09.08.2026: Spur C, Band mit angeschnittenen
Nachbarn.** Diese Variante weicht deutlich von der bisherigen Beschreibung ab.
Ab jetzt gilt die Variante.

**Referenz:** `textcard_start.png` für die Steuerung am unteren Rand.
Die Wechselmechanik der Textkarte gilt **nicht** mehr.

**Inhalt:** 8 Ressorts, kein Bildmaterial. Titel, Vorschautext (maximal
30 Wörter), Link zur Ressort-Detailseite.

**Aufbau:**
- Kein gemeinsamer Kartenrahmen. Acht eigenständige Flächen mit `--radius`
  liegen als Band nebeneinander, Abstand `--gutter`.
- Kachelbreite `clamp(280px, 62vw, 720px)`. Dadurch ist die nächste Fläche am
  rechten Rand immer angeschnitten sichtbar. Das Angeschnittene ist der Punkt
  der Variante, nicht ein Nebeneffekt.
- Jede Kachel trägt: `caption` mit der Position im Band, Titel in `display-l`,
  Vorschautext unten. Der Text steht fest in seiner Kachel und bewegt sich
  nicht relativ zu ihr.
- Steuerung unten links, Fortschrittslinie darunter über die volle Breite mit
  8 Punkten, aktiver Punkt als Ring.

**Farbe:**
- **Jede Kachel trägt genau einen der drei Vereinstöne**, zyklisch
  `terracotta → brick → mauve → terracotta …`. Es wird **keine Farbe
  interpoliert und keine Fläche umgefärbt.** Die Zyklierung entsteht dadurch,
  dass die Töne vorbeiziehen.
- Textfarbe fest pro Kachel nach der Kontrasttabelle in DESIGN.md: `paper` auf
  `brick`, `ink` auf `terracotta` und `mauve`. Damit gibt es in keinem
  Scroll-Zustand eine ungültige Paarung. Das ist der Grund, weshalb diese
  Variante gegenüber der umfärbenden Textkarte gewählt wurde.
- Die Farbe identifiziert kein Ressort.

**Bewegung:**
- Ein einziger `ScrollTrigger` auf der Sektion, `start: 'top top'`,
  `end: '+=' + distance()`, `pin: true`, `scrub: 1`,
  `invalidateOnRefresh: true`.
- `distance()` ist `strip.scrollWidth - viewport.clientWidth`, als Funktion
  ausgewertet, damit Breitenwechsel beim Refresh neu greifen.
- Ein Tween: `gsap.to(strip, { x: () => -distance(), ease: 'none' })`.
  Die Scrolldistanz entspricht damit exakt der horizontalen Strecke, das Band
  läuft ohne Stauchung.
- Kein Ein- und Ausblenden einzelner Einträge, kein Stagger, keine Maske.
  Die Bewegung ist eine einzige durchgehende Translation.
- Aktiver Index aus `Math.round(progress * (n - 1))`, gesetzt im `onUpdate`.
- Vor- und Zurück-Steuerung sowie die Punkte springen über ScrollSmoother
  beziehungsweise ScrollToPlugin an die Scrollposition des Ziel-Index.

**Reduced Motion:** kein Pin, kein Scrub. Die acht Flächen stehen untereinander,
Steuerung und Fortschrittslinie entfallen, alles ist vollständig sichtbar.

### 4.5 Vorstand
**Referenz:** `grid_start.png` als Rasterlogik
**Inhalt:** Gruppenbild und **7 Portraits**. Keine Zahlenkacheln, die stehen
im Intro.
**Aufbau:**
- Das Gruppenbild eröffnet die Sektion als eine breite Fläche über die volle
  Rasterbreite.
- Darunter die 7 Portraits. Die Präsidentin erhält eine grössere Kachel, die
  übrigen 6 stehen in zwei Reihen zu drei. Die ungleiche Grösse bildet die
  tatsächliche Funktion ab und ist keine Dekoration.
- Jedes Portrait trägt Name und Funktion als Caption unter dem Bild, nicht als
  Overlay über dem Gesicht.
- Alle Portraits werden auf **ein einheitliches Seitenverhältnis 3:4**
  beschnitten. Uneinheitliche Zuschnitte zerstören das Raster.
- Ab 768px: Präsidentin über die volle Breite, darunter 6 in zwei Reihen zu
  drei. Unter 768px: Präsidentin über die volle Breite, darunter 6 in drei
  Reihen zu zwei.
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
   Verläufe. **Ausgenommen ist allein das Vereinslogo in der Kopfzeile**,
   siehe Abschnitt 2.
5. Keine Sektion ist Bild links, Text rechts.
6. **Keine Maske schneidet ein Wort.** Masken-Reveals laufen zeilen- oder
   wortweise, nie buchstabenweise, und eine Zeile wird nie mitten im Wort
   umbrochen oder abgeschnitten.
   Ausgenommen ist der **bewusste Anschnitt der Nachbarfläche in der
   Ressort-Spur**. Dass die nächste Kachel am rechten Rand angeschnitten ist,
   ist der Kern der am 09.08.2026 gewählten Variante C und keine Panne. Die
   ursprüngliche Fassung dieses Punktes zielte auf die halb gerenderten Wörter
   im Motion-Mock, nicht auf eine horizontale Spur.
7. Jede Bewegung lässt sich einem Punkt aus Abschnitt 4 zuordnen.
8. Die Seite enthält kein englisches Wort ausser Eigennamen.
9. Nichts auf der Seite liest sich wie ein Produkt- oder App-Versprechen.
10. Auf 375px Breite funktioniert jede Sektion ohne horizontales Scrollen, die
    Ressort-Spur eingeschlossen.
11. Alle 7 Portraits haben denselben Zuschnitt und innerhalb ihrer Reihe
    dieselbe Kachelhöhe.

---

## 7. Offene Entscheidungen

- [x] Grundton der Seite: **reines Weiss**, `--color-paper`
- [x] Kontrast der Hero-Headline über dem Video: gemessen, flächiger
      `ink`-Abdunkler mit **39 %**. Siehe 4.1.
- [x] Reihenfolge der 8 Ressorts: Quellreihenfolge aus `ressorts.txt`. Sie
      bedeutet inhaltlich nichts, deshalb **keine Nummerierung**.
- [ ] **Subline über dem Video.** Bei 39 % erreicht `body-l` nur rund 2.5:1 und
      verfehlt die geforderten 4.5:1. Entweder Abdunkler auf 52 %, oder die
      Subline verlässt das Video. Bis zum Entscheid steht 39 % und der Mangel
      ist bekannt.
- [ ] **Count-up der Jahreszahl.** 4.3 verlangt, dass alle drei Zahlen
      hochzählen. Bei **1953** liest sich das wie eine Stoppuhr, nicht wie ein
      Gründungsjahr. Umgesetzt ist die Vorgabe. Falls das nicht gewollt ist,
      wird 4.3 geändert, nicht der Code.
