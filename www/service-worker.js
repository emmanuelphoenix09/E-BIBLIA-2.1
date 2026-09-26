/* E-BIBLIA — Service Worker hors connexion */
const CACHE_NAME = "ebiblia-offline-v3";
const CORE = [
  "./",
  "./index.html",
  "./accueil.html",
  "./lecture.html",
  "./comparer-versions.html",
  "./recherche.html",
  "./favoris.html",
  "./notes.html",
  "./passages.html",
  "./bloc-notes.html",
  "./menu.html",
  "./parametres.html",
  "./apropos.html",
  "./importer.html",
  "./plans.html",
  "./cultes.html",
  "./ia.html",
  "./css/tailwind.css",
  "./css/main.css",
  "./offline-assets/fontawesome.css",
  "./offline-assets/google-fonts.css",
  "./js/common.js",
  "./js/config.js",
  "./js/bible-core.js",
  "./js/data.js",
  "./js/reader.js",
  "./js/app.js",
  "./js/ai.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE).catch(() => Promise.all(
        CORE.map(url => cache.add(url).catch(() => null))
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        // Mettre à jour en arrière-plan quand Internet est disponible.
        fetch(request).then(response => {
          if (response && response.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
          }
        }).catch(() => {});
        return cached;
      }

      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        if (request.mode === "navigate") return caches.match("./lecture.html");
        return new Response("", { status: 503, statusText: "Hors connexion" });
      });
    })
  );
});