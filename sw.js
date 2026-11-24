// Klötzli – Service Worker
// Bei jeder Änderung an Dateien die Versionsnummer erhöhen.
const CACHE = 'kloetzli-v2';
const FILES = ['./', './index.html', './retro.html', './modern.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

// Nur eigene alte Caches löschen: Yatzy, Rotate Rings usw. liegen auf derselben Domain.
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('kloetzli-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Selbstheilung: Falls eine andere App auf der Domain unseren Cache gelöscht hat, beim nächsten Start neu füllen.
const heal = () => caches.open(CACHE)
  .then(c => c.match('./modern.html').then(hit => hit || c.addAll(FILES))).catch(() => {});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Seiten: zuerst Netz (für Updates), ohne Netz aus dem Cache
  if (req.mode === 'navigate') {
    e.waitUntil(heal());
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  // Eigene Dateien und Schrift: Cache zuerst, dann Netz
  if (url.href.startsWith(self.registration.scope) || url.host.endsWith('fonts.googleapis.com') || url.host.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    })));
  }
});
