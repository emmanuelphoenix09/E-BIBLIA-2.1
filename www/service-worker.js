/* E-BIBLIA — Service Worker hors connexion */
const CACHE_NAME = "ebiblia-offline-v5";
const LSG_BOOKS = [
  "1Chr", "1Cor", "1John", "1Kgs", "1Pet", "1Sam", "1Thess", "1Tim",
  "2Chr", "2Cor", "2John", "2Kgs", "2Pet", "2Sam", "2Thess", "2Tim",
  "3John", "Acts", "Amos", "Col", "Dan", "Deut", "Eccl", "Eph", "Esth",
  "Exod", "Ezek", "Ezra", "Gal", "Gen", "Hab", "Hag", "Heb", "Hos",
  "Isa", "Jas", "Jer", "Job", "Joel", "John", "Jonah", "Josh", "Jude",
  "Judg", "Lam", "Lev", "Luke", "Mal", "Mark", "Matt", "Mic", "Nah",
  "Neh", "Num", "Obad", "Phil", "Phlm", "Prov", "Ps", "Rev", "Rom",
  "Ruth", "Song", "Titus", "Zech", "Zeph"
];
const CORE = [
  ...LSG_BOOKS.map(book => `./bible-data/fr/LSG/books/${book}.json`),
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
  "./assets/icon.png",
  "./offline-assets/fontawesome.css",
  "./offline-assets/google-fonts.css",
  "./bible-data/fr/BFC/BFC.json",
  "./bible-data/fr/DAR/DAR.json",
  "./bible-data/fr/LSG/LSG.json",
  "./bible-data/fr/MRT/MRT.json",
  "./bible-data/fr/OST/OST.json",
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