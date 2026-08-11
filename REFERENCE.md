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
  Der Hero trägt hier über Bild und Typografie.
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
**Inhalt:** das statische Bild `/public/images/hero.jpg`, Vereinsname als
Display-Zeile, ein Satz Subline, maximal zwei Aktionen.

**Am 10.08.2026 auf Kundenwunsch geändert: das Scrub-Video ist ersetzt durch ein
statisches Bild.** Video, Scrub-Mechanik, Pin und die zugehörige Scrolldistanz
entfallen ersatzlos, ebenso der frühere Mobil-Sonderfall. Die Komposition,
sämtliche Texte und der Masken-Reveal bleiben unverändert.

**Aufbau:**
- Navigation oben auf `paper`, ausserhalb der Fläche und ausserhalb des
  Smoother-Wrappers.
- Darunter das Hero als eingerückte Fläche mit `--radius`, Rand `--inset` auch
  unten. Das Bild als Hintergrund über `next/image` mit `fill` und `priority`,
  `object-fit: cover`, `object-position: var(--hero-focus)` mit `50% 6%`.
- Über dem Bild ein **flächiger Abdunkler in `ink`**, kein Verlauf, Deckkraft
  `--scrim`. Siehe den Kontrastbefund weiter unten.
- Inhaltsraster in drei Zeilen `1fr / auto / 1.15fr`. Der Textblock sitzt in der
  mittleren Zeile, zentriert: Headline, Subline, zwei Pills.
- Headline in **zwei von Hand gesetzten Zeilen**, nicht automatisch umbrochen.
  Jede Zeile liegt in einer eigenen Maske. Damit kann keine Zeile mitten im Wort
  geschnitten werden.
- Die untere Zeile bleibt leer. Die Statistik-Karten des Referenzbildes werden
  nicht übernommen. Bewusste Setzung.

**Bewegung:**

- **Beim Laden, ohne Scroll:** die beiden Headline-Zeilen fahren maskiert von
  unten ein, `yPercent: 115 → 0`, Dauer `DUR.base`, Stagger `STAG.base`,
  `EASE.out`. Kein Scrub. Subline und Pills werden nicht animiert.
- **Sonst nichts.** Kein Pin, kein Scrub, kein `ScrollTrigger` auf dieser
  Sektion, keine eigene Scrolldistanz. Das Hero scrollt wie jede andere Sektion.
  Die Sektion braucht deshalb kein Client-Bundle, die einzige Bewegung liegt in
  `MaskedHeading`.
- Es gibt **keinen Mobil-Sonderfall mehr**. Das Verhalten ist auf allen Breiten
  identisch, es hängt nur noch an `prefers-reduced-motion`.

**Kontrast, neu gemessen am 11.08.2026. Die Messung vom 10.08.2026 war falsch,
siehe die Korrektur am Ende dieses Abschnitts.**

Das Bild führt hinter dem zentrierten Text den vollen Umfang von nahezu schwarz
bis nahezu weiss. Median der Rohluminanz 0.04 bis 0.10, 99. Perzentil 0.82 bis
0.93. Die hellen Stellen sind der weisse Kirchturm, helle Fassaden und die
Spiegelungen im Wasser.

Gemessen an den echten Textrechtecken für 375, 768 und 1440, aus dem laufenden
DOM geholt und über den `cover`-Beschnitt auf die Quellpixel abgebildet.
Angegeben ist der Wert am **99. Perzentil** der Fläche hinter dem Text, also an
der hellsten Stelle, auf der überhaupt ein Buchstabe liegt. Der Median steht in
Klammern.

| Abdunkler | Durchlass | Headline, Ziel 3.0:1 | Subline, Ziel 4.5:1 |
|---|---|---|---|
| 39 % | 61 % | 2.92 bis 3.13 (12 bis 16) | 3.25 bis 3.38 (9 bis 15) |
| 48 % | 52 % | 3.92 bis 4.18 (13 bis 17) | 4.31 bis 4.47 (11 bis 16) |
| **50 %** | **50 %** | **4.17 bis 4.45 (14 bis 17)** | **4.60 bis 4.76 (11 bis 17)** |
| 58 % | 42 % | 5.58 bis 5.90 (15 bis 18) | 6.09 bis 6.27 (13 bis 18) |
| 70 % | 30 % | 8.83 bis 9.21 | 9.43 bis 9.63 |

Gesetzt ist **`--scrim: 0.50`**, auf Kundenentscheid vom 11.08.2026: das Bild
sollte um weitere 20 % aufgehellt werden. 0.50 lässt die Hälfte des Bildes durch
statt 42 %, das ist Faktor 1.19.

**Beide Regeln aus DESIGN.md 2 sind damit eingehalten**, die Subline aber nur
knapp. Sie unterschreitet 4.5:1 bei rund 49 % Deckkraft. **0.50 ist also der
Boden**, weiter aufhellen bricht die Regel. Wer noch mehr Helligkeit will,
braucht einen der beiden Wege aus Abschnitt 7: Text weg aus der Bildmitte oder
ein anderes Motiv.

**Korrektur der Messung vom 10.08.2026.** Die alte Tabelle nannte für 58 %
eine Headline von 2.5 bis 3.1:1 und eine Subline von 3.0 bis 3.2:1 und
begründete damit einen bewussten Regelverstoss. Diese Zahlen sind falsch. Der
Abdunkler wurde dort auf die **Luminanz** multipliziert. Ein `div` in `ink` mit
`opacity` liegt aber im sRGB-Raum über dem Bild, der Browser rechnet also
`Kanal × (1 - Deckkraft)` auf den nicht linearen Werten und erst danach die
Luminanz. Weil die Gamma-Kurve steil ist, dunkelt das viel stärker ab: der Faktor
auf der Luminanz ist rund `(1 - Deckkraft)^2.4`, nicht `(1 - Deckkraft)`.
Zur Probe von Hand: `ink` bei 58 % über einem reinen weissen Pixel ergibt
`#6b6b6b`, und `paper` darauf liegt bei 5.25:1, nicht bei 2.5:1.
Das alte Modell lässt sich mit den alten Zahlen exakt nachrechnen, es ist also
ein Rechenfehler und keine andere Messstelle.

**Der Bildausschnitt ist kein Hebel.** Nachgemessen über jede `object-position`
von 0 bis 100 %: das Bild hat keine ruhige dunkle Zone, die hellen Flächen
ziehen sich durch die ganze Bildhöhe. Der frühere Vorschlag, über den Ausschnitt
zu gehen, bleibt erledigt.

**Reduced Motion:** kein Masken-Reveal, die Headline-Zeilen stehen sofort auf
Endposition. Sonst identisch, es gibt nichts weiter abzuschalten.

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
  Vorschautext unten, darunter die Aufforderung. Der Text steht fest in seiner
  Kachel und bewegt sich nicht relativ zu ihr.
- **Aufforderung, entschieden am 09.08.2026: „Mehr erfahren" als rein
  typografischer Link, kein Button.** `caption`-Grösse, unterstrichen, mit
  einem einfarbigen Inline-Pfeil, unten unter dem Vorschautext.
  Sie erbt die Textfarbe der Kachel und liegt damit immer auf einer geprüften
  Paarung. Hover ist reines CSS über 150ms und ändert die Unterstreichung von
  1px auf 2px, also die Variante Umrissstärke aus DESIGN.md 5. Ein Farbwechsel
  scheidet aus, der Text steht bereits auf vollem Kontrast.
- **Die ganze Kachel ist der Link, die Aufforderung ist ein `span` darin.**
  Damit gibt es ein Fokusziel pro Kachel und kein interaktives Element
  innerhalb eines anderen.
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
  `end: '+=' + distanz()`, `pin: true`, `invalidateOnRefresh: true`.
- `bandDistanz()` ist `strip.scrollWidth - strip.clientWidth`, als Funktion
  ausgewertet, damit Breitenwechsel beim Refresh neu greifen. `distanz()` ist
  `bandDistanz() + 80vh`, die 80vh gehören der Grid-Auflösung weiter unten.
- **Gemessen wird gegen die Inhaltsbreite des Bandes, nicht gegen die Bühne.**
  Die Bühne trägt `--inset` als Polster auf beiden Seiten. Zieht man ihre
  `clientWidth` ab, bleibt das Band zwei Inset-Breiten zu früh stehen und die
  letzte Kachel ist beim Start der Auflösung rechts angeschnitten. Gegen
  `strip.clientWidth` kommt sie mit genau dem Rand zur Ruhe, mit dem die erste
  gestartet ist.
- **Scroll-Pixel zu Band-Pixel bleibt eins zu eins**, das Band läuft ohne
  Stauchung. Weil die Bandstrecke nur noch den vorderen Teil der Pin-Distanz
  ausmacht, wird `x` im `onUpdate` selbst gesetzt statt über ein `scrub` auf
  einem Tween.
- **Das Nachziehen ist `gsap.quickTo` mit Dauer 1 und `ease: 'expo'`.** Das ist
  nicht die Ease der scroll-gekoppelten Bewegung, die bleibt linear, sondern die
  des Aufholens, und es ist genau die Ease, die ScrollTrigger für `scrub: 1`
  intern verwendet. Mit linearem Aufholen holt ein neu gestarteter
  Ein-Sekunden-Tween pro Bild nur rund zwei Prozent der Reststrecke auf, das
  Band hängt dann sichtbar hinter dem Finger.
- Kein Ein- und Ausblenden einzelner Einträge, kein Stagger, keine Maske.
  Die Bewegung ist eine einzige durchgehende Translation.
- Aktiver Index aus `Math.round(bandFortschritt * (n - 1))`, gesetzt im
  `onUpdate`. Der Bandfortschritt ist der zurückgelegte Anteil der
  Bandstrecke, nicht der Anteil der gesamten Scrolldistanz. Die
  Grid-Auflösung hängt hinten dran und darf den Index nicht verschieben.
- Vor- und Zurück-Steuerung sowie die Punkte springen über ScrollSmoother
  beziehungsweise ScrollToPlugin an die Scrollposition des Ziel-Index.

**Ab 768px, ergänzt am 11.08.2026: Grid-Auflösung nach der letzten Kachel.**

Nach „Kurse und Anlässe" folgt ein Abschlusszustand, in dem alle acht Ressorts
gleichzeitig sichtbar sind. Das Verhalten bis zur letzten Kachel bleibt
unverändert.

- **Die Sektion bleibt für den Übergang gepinnt**, zusätzliche Scrolldistanz
  80vh. Es bleibt bei **einem** ScrollTrigger auf der Sektion, die Auflösung
  hängt am selben Trigger.
- Alle acht Kacheln fahren **von links ausserhalb des Viewports** auf ihre
  Zielposition im Grid, gestaffelt mit `STAG.tight`, `EASE.out`.
- Sie **verkleinern sich dabei auf Gridgrösse**. Animiert werden ausschliesslich
  `x` und `scale`, dazu die Deckkraft des Bandes. **Keine Layout-Eigenschaft**,
  das Grid selbst steht als statisches CSS.
- **Kein Scrub.** Stagger und Ease sind Timeline-Eigenschaften, und DESIGN.md 5
  verbietet eine Ease auf einem Scrub. Die Timeline läuft, sobald das Band durch
  ist, und läuft rückwärts, sobald zurückgescrollt wird. Das ist die saubere
  Umkehr, ohne einen zweiten Trigger.
- Raster: **4 Spalten mal 2 Reihen ab 1024px, 2 mal 4 zwischen 768 und 1024px.**
  Abstand zwischen den Kacheln `--inset`, seitlicher Rand ebenfalls `--inset`.
  Oben und unten schliesst das Grid bündig ab, es besetzt also genau die Fläche,
  die das Band besetzt hat.
- Jede Kachel behält ihren Vereinston aus der Zyklierung, es entsteht ein
  Farbraster. Weiterhin wird keine Farbe interpoliert.
- Jede Kachel bleibt der Link auf ihre Ressort-Detailseite.
- **Fortschrittslinie und Vor-Zurück-Steuerung werden ausgeblendet.** Sie
  behalten ihren Platz und gehen auf `visibility: hidden`, damit die Bühne unter
  einem laufenden Pin nicht die Höhe wechselt.
- Danach gibt die Sektion den Pin frei, die Seite scrollt normal weiter.

**Unter 768px, geändert am 11.08.2026: vier Kacheln pro Ansicht.**

Die Einzelkarten-Mechanik entfällt. Statt acht Zuständen gibt es zwei.

- Kacheln so verkleinert, dass **vier gleichzeitig in den Viewport passen**,
  2 Spalten mal 2 Reihen.
- **Rundum `--inset`, entschieden am 11.08.2026.** Der Rand auf allen vier
  Seiten und der Abstand zwischen den Kacheln tragen denselben Wert, das Viererfeld
  sitzt damit gleichmässig in der Bühne. Die Kacheln bleiben im Hochformat und
  alle vier gleich gross, sie werden nicht auf Quadrate gezwungen: quadratische
  Kacheln und ein rundum gleicher Rand schliessen sich auf einem Hochkant-Display
  geometrisch aus.
- **Zwei Ansichten:** Ressort 1 bis 4, dann 5 bis 8.
- Eine Scroll-Geste wechselt zur nächsten Ansicht. Weiterhin `Observer` mit
  discrete stepping und `animating`-Sperre, **genau eine Animation pro Geste**.
  Die Animation hängt nicht an der Scrollposition, siehe die Begründung im
  Component.
- Übergang: die vier alten Kacheln nach oben raus und `opacity: 0`, die vier
  neuen von unten rein. Gestaffelt mit `STAG.tight`, Dauer 0.7. Der Weg ist die
  **Bühnenhöhe in Pixeln**, nicht `yPercent`: eine Kachel ist ein Viertel der
  Bühne, `yPercent: 100` würde sie nur eine Reihe tiefer setzen statt hinaus.
- **Die Fortschrittslinie zeigt 2 Punkte**, nicht 8. Die Steuerung schaltet
  Ansichten, nicht Ressorts, und heisst entsprechend.
- Nach der zweiten Ansicht gibt die Sektion frei, natives Scrollen läuft weiter.
- **Keine Grid-Auflösung auf Mobil.** Dort ist bereits ein Grid sichtbar.
- Die Farbzyklierung bleibt, jetzt über die acht Kacheln der beiden Ansichten.

**Kachelinhalt im verkleinerten Zustand, beide Zweige: Titel und Link.**
Der Vorschautext entfällt. Er wird **nicht verkleinert**: die Typo-Skala hat
unterhalb von `display-m` keine Stufe, und eine zu erfinden bricht DESIGN.md 3.
Der Titel steht in `display-m` und wird getrennt, sonst ist „Geschichten" bei
375px breiter als die Kachel. Das Dokument ist `de-CH`, der Browser trennt an
den richtigen Stellen.

**Breakpoint und Übergabe:** die beiden Zweige laufen über `gsap.matchMedia()`
mit `(min-width: 768px)` und `(max-width: 767.98px)`, jeweils kombiniert mit
`(prefers-reduced-motion: no-preference)`. Die Queries lassen weder Lücke noch
Überlappung, bei genau 768px greift der Desktop-Zweig. Nachgemessen bei 767,
768, 1000 und beim Wechsel in beide Richtungen ohne Neuladen: nie mehr als **ein
ScrollTrigger pro Sektion**. Beim Verlassen eines Zweigs werden die
Transformationen über `clearProps` zurückgenommen.

**Drei Layouts, immer nur eines sichtbar.** Die vertikale Liste ist das Markup
selbst, `motion-safe:md` macht daraus das Band, `motion-safe` unter 768px nimmt
sie heraus. Band und Kacheln tragen dieselben acht Links, deshalb ist die Ebene,
die gerade nicht spielt, entweder per `display: none` aus dem Dokument oder per
`inert` aus dem Accessibility-Baum genommen. Ein Titel erscheint nie doppelt.

**Reduced Motion:** kein Pin, keine Ansichten, keine Auflösung, kein Scrub. Die
acht Flächen stehen als gewöhnliche Karten untereinander, mit Vorschautext,
Steuerung und Fortschrittslinie entfallen, alles ist vollständig sichtbar. Das
ist zugleich das Grundlayout im Markup, die beiden Bewegungsvarianten werden
erst über `motion-safe` darübergelegt.

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

- **Bildbudget: das Hero-Bild, das Gruppenbild und 7 Portraits.** Sonst keine
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
- [x] Kontrast der Hero-Headline über dem Bild: gemessen, flächiger
      `ink`-Abdunkler. Siehe 4.1.
- [x] Reihenfolge der 8 Ressorts: Quellreihenfolge aus `ressorts.txt`. Sie
      bedeutet inhaltlich nichts, deshalb **keine Nummerierung**.
- [x] **Der Hero-Abdunkler steht auf 50 % und hält die Kontrastregel.**
      Am 11.08.2026 neu gemessen: die Zahlen vom 10.08.2026 beruhten auf einem
      Rechenfehler, der Abdunkler wurde auf die Luminanz statt auf die
      sRGB-Kanäle multipliziert. Es gab nie einen Regelverstoss. Headline 4.17
      bis 4.45:1 gegen 3.0, Subline 4.60 bis 4.76:1 gegen 4.5, jeweils am
      99. Perzentil. Siehe 4.1.
- [ ] **Die Subline hat bei 50 % fast keine Reserve mehr.** Sie unterschreitet
      4.5:1 bei rund 49 % Deckkraft. Wird noch mehr Helligkeit verlangt, bleiben
      zwei Wege, der Bildausschnitt gehört nicht dazu:
      1. **Text weg aus der Bildmitte**, wie in Variante C des Prototyp-Gates.
         Das ändert die Komposition A.
      2. **Anderes Bild.** Ein Motiv mit ruhiger, dunkler Mitte trägt zentrierten
         Text in `paper` ohne nennenswerten Abdunkler.
- [ ] **Count-up der Jahreszahl.** 4.3 verlangt, dass alle drei Zahlen
      hochzählen. Bei **1953** liest sich das wie eine Stoppuhr, nicht wie ein
      Gründungsjahr. Umgesetzt ist die Vorgabe. Falls das nicht gewollt ist,
      wird 4.3 geändert, nicht der Code.
