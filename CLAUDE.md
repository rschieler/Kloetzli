# Klötzli – Hinweise für Änderungen

## Aufbau
- `index.html` – Weiche: liest `localStorage['kloetzli.design']` (`retro` | `modern`, Standard `retro`) und leitet auf die Seite weiter.
- `retro.html` – Retro-Design, alles in einer Datei. Zeichnet auf ein 160×144-Pixel-Canvas (4 Grüntöne), skaliert hoch. Eigene Pixel-Schrift (5×7), Gerät mit Steuerkreuz, A/B, Select/Start. Knopf «Einstellungen» unter dem Bildschirm (Design-Umschalter + Hilfe); zusätzlich Zeile DESIGN im Startbildschirm.
- `modern.html` – Modern-Design, alles in einer Datei. SRS-Drehung mit Wall-Kicks, 7er-Beutel, Halten, Schattenstein, Lock-Delay, T-Spin/Combo/B2B, Marathon und Sprint 40, Wischgesten. Design-Umschalter im Menü und im Panel «Einstellungen» (Zahnrad oben rechts, auch aus der Pause erreichbar). Schrift Outfit (Google Fonts, wird vom Service Worker gecacht).
- `sw.js` – Seiten Netz zuerst mit `cache:'no-cache'` (GitHub Pages cacht HTML bis 10 Min.), Installation mit `cache:'reload'`; übrige Dateien und Schrift Cache zuerst. Seiten laden bei neuer SW-Version im Menü automatisch neu.
- Direktlinks `retro.html` / `modern.html` merken sich das Design als neue Wahl. Löscht nur eigene alte Caches (`kloetzli-*`), weil Yatzy, Rotate Rings usw. auf derselben Domain liegen.
- `manifest.webmanifest`, Icons (192, 512, maskable 512, apple-touch 180).

## Hausregeln
- Bei jeder Dateiänderung `CACHE` in `sw.js` hochzählen (`kloetzli-v2`, …), sonst sehen installierte Apps die Änderung erst verzögert.
- Speicher-Schlüssel: Retro `kloetzli.v1`, Modern `kloetzli-modern.v1`, Design `kloetzli.design`. Nicht umbenennen, sonst gehen Bestenlisten verloren.
- Kein Markenname und kein Original-Logo im Spiel; Musik nur das Volkslied Korobeiniki.
- Texte auf Deutsch (Schweiz, «ss» statt «ß»); im Retro-Bildschirm englische Pixel-Labels wie damals.
- Display bleibt während des Spiels an (Wake Lock), Pause bei App-Wechsel.

## Veröffentlichen
GitHub Pages, Branch `main`, Hauptverzeichnis. Hochladen über die GitHub-Weboberfläche (Upload) im Chrome des Besitzers.
