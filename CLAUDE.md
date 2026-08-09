# CLAUDE.md

Arbeitsanweisung für dieses Projekt. Gilt für jede Session.

Autoritätsreihenfolge bei Widerspruch:
**REFERENCE.md → DESIGN.md → CLAUDE.md → Skill → eigener Vorschlag.**
Ein Vorschlag aus einer Skill, der REFERENCE.md widerspricht, wird verworfen,
nicht diskutiert.

---

## 1. Projekt

Website für einen Schweizer Verein (Frauenverein, gegründet 1953, rund 310
Mitglieder, 8 Ressorts). Zielgruppe sind Mitglieder und Interessierte aus der
Region. Die Seite ist kein Produkt und keine App. Sie informiert, sie verkauft
nichts.

Sprache der Website: Deutsch, Schweizer Rechtschreibung.
Sprache des Codes und der Kommentare: Englisch.

---

## 2. Stack, verbindlich

- **Next.js** App Router, TypeScript strict
- **Tailwind CSS v4**, Tokens aus DESIGN.md als CSS-Variablen in `globals.css`
- **GSAP 3.13+** als einzige Animation-Engine
  - `gsap`, `ScrollTrigger`, `ScrollSmoother`, `SplitText`, `ScrollToPlugin`
  - `@gsap/react` für `useGSAP()`
- **Schriften**: Clash Display (Display), Satoshi (Fliesstext), beide von
  Fontshare, selbst gehostet über `next/font/local`. Kein CDN, kein
  Google-Fonts-Import.

**Ausdrücklich verboten:**
- Framer Motion, Motion One, react-spring, AOS, Lenis oder jede weitere
  Animation- oder Scroll-Library
- CSS-Animationen oder `@keyframes` für Scroll-Effekte
- UI-Kit-Bibliotheken (shadcn, MUI, Chakra, DaisyUI)
- Icon-Bibliotheken mit dekorativem Einsatz. Wenn ein Icon nötig ist, als
  Inline-SVG, einfarbig in `--color-ink`
- Kalender-Libraries (FullCalendar, react-big-calendar, react-day-picker).
  Die Kalenderansicht wird selbst gebaut.

---

## 3. Verzeichnisse

**Istzustand.** Im Projektordner liegen ausschliesslich:

```
/reference          Screenshots der Leitreferenz. NIE importieren, nur lesen.
/content            Quellmaterial vom Kunden. NIE importieren, nur lesen.
  /texte            Rohtexte
  /bilder           Bilder und hero_video_scrub.mp4
CLAUDE.md  DESIGN.md  REFERENCE.md
```

Es gibt **noch kein Next.js-Projekt**, kein `/src`, kein `/public`, keine
`package.json`. Das entsteht im Setup, Abschnitt 4.

**Zielzustand nach dem Setup.** Das Next.js-Projekt wird im selben Ordner
initialisiert, `/reference` und `/content` bleiben unberührt daneben liegen.

```
/reference          unverändert
/content            unverändert
/public
  /images           Finale, optimierte Bilder
  /video            hero_video_scrub.mp4 (kopiert, nicht neu encodiert)
/src
  /app              Routen
  /components
    /sections       Eine Datei pro Seitensektion
    /ui             Button, Tag, Divider, Zahl
    /motion         SmoothScrollProvider, Motion-Primitives
  /data             Statische Inhalte + Fake-Daten für Events und Flyer
  /lib              Utilities, später payments/ und payload/
  /types            Gemeinsame Typen
```

`/content` und `/reference` sind Quellen für dich, nicht für den Build. Kein
Import daraus, keine Pfade darauf im Code.

---

## 4. Setup und Inventar

### 4.1 Inventar, vor allem anderen

1. `/content/texte` und `/content/bilder` vollständig auflisten und lesen.
2. Bilder den drei erlaubten Fotoplätzen zuordnen (siehe DESIGN.md, Bildbudget):
   Hero-Video, Gruppenbild, Portraits.
3. `/reference` ansehen.
4. **Drei Prüfungen, die einen Pass kippen können. Ergebnis immer berichten:**
   - **Hero-Video:** Länge, Auflösung, Seitenverhältnis, dominante Helligkeit
     im oberen und mittleren Bildbereich. Trägt eine Headline darüber Kontrast,
     mit oder ohne flächigen Abdunkler? Scrubbt es sauber, also ist die
     Keyframe-Dichte hoch genug?
   - **Textmengen:** Wortzahl pro Quelltext, zugeordnet zur vorgesehenen
     Sektion. Melden, wo ein Text die vorgesehene Fläche deutlich sprengt.
   - **Portraits:** Anzahl, Format, Ausrichtung. Davon hängt das Raster der
     Vorstands-Sektion ab.
5. Melden, was fehlt, doppelt ist oder mehrdeutig. Nicht raten, nicht ersetzen.

### 4.2 Setup, einmalig

1. Next.js mit App Router und TypeScript im Projekt-Root initialisieren, ohne
   die bestehenden Ordner `/reference` und `/content` zu überschreiben.
2. Tailwind v4 einrichten, Tokens aus DESIGN.md als CSS-Variablen in
   `globals.css`.
3. GSAP-Pakete installieren, Plugins genau einmal in `/src/lib/gsap.ts`
   registrieren.
4. Clash Display und Satoshi als lokale Schriftdateien einbinden. Falls die
   Dateien noch nicht im Projekt liegen, melden statt einen CDN-Import zu
   setzen.
5. Assets aufbereiten:
   - `hero_video_scrub.mp4` von `/content/bilder` nach `/public/video`
     kopieren. **Nicht neu encodieren.**
   - Fotos optimiert nach `/public/images`, sprechende Dateinamen.
   - Aus dem Hero-Video einen Frame als `/public/images/hero-poster.jpg`
     extrahieren. Das ist der Fallback bei reduced motion und bei Ladefehler.
6. `SmoothScrollProvider` und die Layout-Struktur aus DESIGN.md, Abschnitt 5,
   anlegen.

### 4.3 Erst danach bauen.

---

## 5. Harte Regeln

**Inhalt**
- Alle Texte stammen aus `/content/texte`. Inhalte werden nicht erfunden.
- **Keine erfundenen Zahlen.** Nur Zahlen, die in den Quelltexten stehen. Die
  Referenz zeigt Prozent-Kacheln, das sind Produkt-KPI und werden nicht
  übernommen.
- Ressort-Vorschautexte für die Startseite darfst du aus den Langtexten
  verdichten. **Maximal 30 Wörter.** Jeder generierte Text wird in der Datei
  mit `// TODO review` markiert.
- Kein englisches Wort auf der Website ausser Eigennamen. Auch nicht in
  Buttons.

**Schweizer Rechtschreibung, ohne Ausnahme**
- Nie `ß`, immer `ss`.
- Keine Geviertstriche. Stattdessen Komma, Doppelpunkt oder Bindestrich mit
  Leerzeichen.
- Keine Werbefloskeln, keine Superlative, kein "rundet das Gesamtpaket ab".

**Animation**
- Jede Animation muss einem Punkt aus REFERENCE.md Abschnitt 4 entsprechen.
  Was dort nicht steht, wird nicht animiert.
- Kein Fade-up beim Sektionseintritt als Standardlösung.
- Ein `ScrollTrigger` pro Sektion, angelegt im jeweiligen Section-Component
  über `useGSAP()` mit `scope`.
- Alles in `gsap.matchMedia()`, inklusive `(prefers-reduced-motion: reduce)`.
  Bei reduced motion: keine Pins, keine Scrubs, Inhalt vollständig sichtbar.

**Bilder**
- Bildbudget ist drei Fotos auf der gesamten Seite. Keine Stockfotos, keine
  Platzhalterbilder, keine generierten Bilder.
- Keine Sektion darf so gebaut sein, dass sie ohne Foto leer wirkt.

---

## 6. Anti-Muster

Diese Lösungen sind für dieses Projekt gesperrt, auch wenn sie naheliegen:

- Ressorts als gleichförmiges Karten-Raster mit Bildplatz
- Sektionen mit identischer Höhe und identischem vertikalem Rhythmus
- Farbige Icons neben Überschriften
- Sidebar-Navigation
- "Bild links, Text rechts" in jeder Variante
- Gradient-Hintergründe, Glassmorphism, Schlagschatten als Tiefenmittel
- Hero aus grosser Zahl plus kleinem Label plus Gradient-Akzent
- Nummerierung 01 / 02 / 03 als Dekoration. Nummerierung nur, wenn die
  Reihenfolge inhaltlich etwas bedeutet, was bei den Ressorts nicht der Fall ist
- Cremefarbener oder beiger Hintergrund. Die Neutralen bleiben rein.

<!-- ERGÄNZEN: 3 Sätze zu konkreten Mustern aus dem Vorgängerentwurf, die
     nicht wiederkommen dürfen. -->

---

## 7. Vorbereitung auf Payload CMS

Payload wird **nach** dem Design-Pass angebunden. Während des Design-Passes
gibt es **keinen einzigen Payload-Import im Frontend**.

Damit der spätere Tausch ein Import-Tausch bleibt:

- Typen liegen in `/src/types/content.ts` und werden jetzt von Hand definiert.
  Sie beschreiben die spätere Payload-Rückgabe, nicht die Fake-Daten.
- **Auch statische Bilder verwenden den `ImageRef`-Typ** mit `url`, `alt`,
  `width`, `height`. Nicht `string`. Sonst bricht die Bildanbindung später auf.
- Daten fliessen nur über Props in Komponenten. Kein Component holt sich selbst
  Daten. Geladen wird ausschliesslich auf Seitenebene in `page.tsx`.
- Fake-Daten liegen in `/src/data/events.ts` und `/src/data/flyers.ts`,
  mindestens 10 Events über mehrere Monate und 5 Flyer, realistisch formuliert.
  Kein Lorem.

Zielzustand später: Payload verwaltet ausschliesslich **Events**, **Flyers**,
**Media**, **Users** und **Registrations**. Alles andere bleibt statisch im
Code. Keine Pages-Collection, keine Blocks, kein Rich-Text-Renderer.

```ts
// /src/types/content.ts

export type ImageRef = {
  url: string
  alt: string
  width: number
  height: number
}

export type Event = {
  id: string
  titel: string
  start: string          // ISO
  ende?: string          // ISO
  ort: string
  beschreibung: string
  bild?: ImageRef
  ressort?: string
  preis?: number         // CHF, undefined = kostenlos
  anmeldungNoetig: boolean
}

export type Flyer = {
  id: string
  titel: string
  datei: string          // PDF-URL
  thumbnail: ImageRef
  reihenfolge: number
}
```

---

## 8. Vorbereitung auf Zahlungen

Anbieter ist noch nicht entschieden, Stripe und Payrexx stehen beide im Raum.
Deshalb kennt die UI den Anbieter nicht.

- `/src/lib/payments/provider.ts` definiert ein Interface, das eine
  Checkout-Session anlegt und eine Redirect-URL zurückgibt.
- Keine Anbieter-SDKs, keine Anbieter-Namen und keine Anbieter-Logos in
  Komponenten.
- Während des Design-Passes wird nichts davon implementiert. Wo eine Anmeldung
  mit Kosten vorkommt, führt der Button auf eine Route, die noch nicht existiert.

Rahmenbedingungen für später, damit die UI nichts Falsches verspricht:
TWINT läuft nur in CHF, hat eine Obergrenze pro Zahlung und kennt keine
wiederkehrenden Zahlungen. Also keine Abo- oder Mitgliedsbeitrags-Logik im
Zahlungsfluss vorsehen.

---

## 9. Arbeitsweise

Die Website entsteht in zwei Durchgängen mit einem Prototyp-Gate dazwischen.
Nicht sektionsweise, aber auch nicht alles auf einmal.

### 9.1 Prototyp-Gate, vor Pass A

Nur für **Hero** und **Ressort-Spur**. Diese beiden Sektionen tragen die Seite
und ihre Mechanik ist aus statischen Referenz-Keyframes rekonstruiert, also
ungeprüft.

- Je 3 Varianten als isoliertes HTML unter `/preview`, ohne Next.js, ohne
  Payload, ohne Fake-Daten. Echte Texte, echte Farben, echte Schriften.
- Die Varianten unterscheiden sich in Komposition und Bewegungsmechanik, nicht
  in Details wie Radius oder Abstand.
- Für die Ressort-Spur muss mindestens eine Variante die Farbzyklierung zeigen
  und mindestens eine ohne sie auskommen.
- Ich wähle visuell aus. Erst danach beginnt Pass A.

### 9.2 Pass A, nur die Startseite

Hero, Intro, Ressort-Spur, Vorstand, Flyer-Grid, Events-Vorschau, Kontakt.
In einem Durchgang, mit der im Gate gewählten Mechanik.

Hier entsteht die vollständige visuelle Sprache: Tokens, Typo-Skala,
Sektionsübergänge, Komponenten-Grundstock. Pass A ist die Referenz für alles
Weitere.

### 9.3 Pass B, die Unterseiten

`/ressorts`, die 8 Ressort-Detailseiten, `/events`, `/verein`, `/kontakt`.

Pass B **erfindet nichts neu**. Er wendet die Komponenten, Tokens und
Motion-Primitives aus Pass A an. Neue Komponenten nur nach Rückfrage. Neue
Farben, Grössen oder Bewegungsprimitive gar nicht.

### 9.4 Abbruch- und Korrekturregeln

- **Kein zweiter Durchgang über dasselbe Material.** Liegt ein Ergebnis
  grundsätzlich daneben, liegt der Fehler in der Vorgabe. Dann wird
  REFERENCE.md oder DESIGN.md korrigiert, nicht der Code nachgebessert.
- **Bei Nachschärfung an einer Sektion:** Komponente löschen und neu schreiben,
  nicht patchen. Keine additiven Korrekturen an Werten, die schon dreimal
  angepasst wurden.
- **Anhalten ist erlaubt und erwünscht**, wenn Quellmaterial die Vorgabe nicht
  trägt. Konkret: wenn das Hero-Video keinen ausreichenden Textkontrast
  hergibt, wenn ein Quelltext die Textgrenze einer Sektion deutlich sprengt,
  wenn die Anzahl Portraits das vorgesehene Raster nicht füllt. In diesen
  Fällen melden statt improvisieren.
- **Während eines Passes keine Rückfragen zu Gestaltungsentscheidungen.** Die
  stehen in den Dateien. Rückfragen nur zu mehrdeutigem Quellmaterial.

---

## 10. Qualitätsboden

Nicht verhandelbar, wird nicht angekündigt, sondern eingehalten:

- Funktioniert ab 375px Breite ohne horizontales Scrollen, auch die gepinnte
  Ressort-Spur
- Sichtbarer Tastaturfokus auf allen interaktiven Elementen
- Die horizontale Ressort-Spur ist per Tastatur über die Vor- und
  Zurück-Buttons bedienbar
- `prefers-reduced-motion` respektiert
- Alt-Texte auf Deutsch, beschreibend, nie "Bild" oder Dateiname
- Semantisches HTML, eine `h1` pro Seite
- Kontrastregeln aus DESIGN.md eingehalten
- Keine Console-Errors, keine Layout-Shifts beim Laden der Schriften
