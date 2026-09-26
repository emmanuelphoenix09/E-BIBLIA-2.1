/*
 * E-BIBLIA 3.0 — Moteur de données bibliques
 * ------------------------------------------------------------
 * Ce fichier s'occupe uniquement du chargement et de la lecture
 * des fichiers JSON de la Bible.
 *
 * Pour modifier les chemins des fichiers Bible : recherchez
 * loadBibleDataFromJSON() ci-dessous.
 * Pour modifier la normalisation des livres : utilisez cleanBookKey().
 */
(function(){
function cleanBookKey(value) {
            if (value === undefined || value === null) return null;
            if (typeof value === "number" || /^\d+$/.test(String(value).trim())) {
                const n = Number(value);
                return window.EBiblia.FULL_BIBLE_BOOKS[n - 1]?.[0] || null;
            }
            const key = String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (window.EBiblia.BOOK_ALIASES?.[key]) return window.EBiblia.BOOK_ALIASES[key];
            return window.EBiblia.FULL_BIBLE_BOOKS.find(b => b[0] === key)?.[0] || null;
        }

function addNormalizedVerse(store, version, book, chapter, verse, text) {
            const bookId = cleanBookKey(book);
            const ch = Number(chapter);
            const vs = Number(verse);
            if (!bookId || !Number.isFinite(ch) || !Number.isFinite(vs) || typeof text !== "string") return;
            if (!store[version]) store[version] = {};
            if (!store[version][bookId]) store[version][bookId] = {};
            if (!store[version][bookId][ch]) store[version][bookId][ch] = {};
            store[version][bookId][ch][vs] = text.trim();
        }

function extractBibleRecords(node, store, version, inheritedBook = null, inheritedChapter = null) {
            if (Array.isArray(node)) {
                node.forEach(item => extractBibleRecords(item, store, version, inheritedBook, inheritedChapter));
                return;
            }
            if (!node || typeof node !== "object") return;

            const book = node.book ?? node.book_id ?? node.bookId ?? node.book_name ?? node.bookName ??
                         node.book_abbr ?? node.abbreviation ?? node.osis ?? inheritedBook;
            const chapter = node.chapter ?? node.chapter_number ?? node.chapterNumber ?? inheritedChapter;
            const verse = node.verse ?? node.verse_number ?? node.verseNumber ?? node.verseId;
            const text = node.text ?? node.verse_text ?? node.verseText ?? node.content;

            if (text !== undefined && verse !== undefined) {
                addNormalizedVerse(store, version, book, chapter, verse, String(text));
            }

            Object.entries(node).forEach(([key, value]) => {
                if (["text","verse_text","verseText","content"].includes(key)) return;
                let nextBook = book;
                let nextChapter = chapter;
                const possibleBook = cleanBookKey(key);
                if (possibleBook) nextBook = possibleBook;
                if (/^\d+$/.test(key) && nextBook && value && typeof value === "object") {
                    if (!verse && chapter === inheritedChapter) nextChapter = Number(key);
                }
                extractBibleRecords(value, store, version, nextBook, nextChapter);
            });
        }

function getVerseCount(version, book, chapter) {
            const verses = window.EBiblia.BIBLE_DATA.textStore[version]?.[book]?.[chapter];
            if (!verses) return 0;
            return Math.max(0, ...Object.keys(verses).map(Number).filter(Number.isFinite));
        }

async function loadBibleDataFromJSON() {
            // Les fichiers Bible sont embarqués dans l'application.
            // Le cache navigateur/service worker permet aussi leur lecture hors connexion.

            const loadedStore = {};
            const loadedVersions = {};
            const results = await Promise.all(Object.entries(window.EBiblia.LOCAL_BIBLE_VERSIONS).map(async ([code, meta]) => {
                try {
                    const response = await fetch(`./bible-data/fr/${meta.file}/${meta.file}.json`, { cache: "default" });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const json = await response.json();
                    const before = JSON.stringify(loadedStore[code] || {});
                    loadedStore[code] = {};
                    extractBibleRecords(json, loadedStore, code);
                    const count = Object.values(loadedStore[code]).reduce((n, book) =>
                        n + Object.values(book).reduce((m, chapter) => m + Object.keys(chapter).length, 0), 0);
                    if (!count) throw new Error("Aucun verset reconnu dans le JSON");
                    loadedVersions[code] = { name: meta.name, code };
                    return { code, ok: true, count };
                } catch (error) {
                    console.warn(`E-BIBLIA: impossible de charger ${code}:`, error);
                    return { code, ok: false, count: 0, error };
                }
            }));

            window.EBiblia.BIBLE_DATA.textStore = loadedStore;
            window.EBiblia.BIBLE_DATA.versions = loadedVersions;

            const bookIds = new Set();
            Object.values(loadedStore).forEach(version =>
                Object.keys(version).forEach(bookId => bookIds.add(bookId))
            );

            window.EBiblia.BIBLE_DATA.books = window.EBiblia.FULL_BIBLE_BOOKS
                .filter(([id]) => bookIds.has(id))
                .map(([id, name, testament]) => {
                    const chapters = Math.max(1, ...Object.values(loadedStore).flatMap(v =>
                        Object.keys(v[id] || {}).map(Number).filter(Number.isFinite)
                    ));
                    return { id, name, testament, chapters };
                });

            if (!window.EBiblia.BIBLE_DATA.books.length) {
                throw new Error("Aucun livre biblique n'a pu être chargé.");
            }

            const firstAvailable = window.EBiblia.BIBLE_DATA.books[0].id;
            if (!window.EBiblia.BIBLE_DATA.books.some(b => b.id === window.EBiblia.state.currentBook)) window.EBiblia.state.currentBook = firstAvailable;

            const versionCodes = Object.keys(loadedVersions);
            if (!versionCodes.includes(window.EBiblia.state.version1)) window.EBiblia.state.version1 = versionCodes[0] || "LSG";
            if (!versionCodes.includes(window.EBiblia.state.version2)) window.EBiblia.state.version2 = versionCodes.find(v => v !== window.EBiblia.state.version1) || window.EBiblia.state.version1;

            const select1 = document.getElementById("select-version-1");
            const select2 = document.getElementById("select-version-2");
            [select1, select2].forEach(select => {
                if (!select) return;
                select.innerHTML = "";
                versionCodes.forEach(code => {
                    const option = document.createElement("option");
                    option.value = code;
                    option.textContent = loadedVersions[code].name;
                    select.appendChild(option);
                });
            });
            select1.value = window.EBiblia.state.version1;
            select2.value = window.EBiblia.state.version2;

            console.info("E-BIBLIA: données bibliques chargées", results);
        }

function getVerseText(version, bookId, chapter, verse) {
            const text = window.EBiblia.BIBLE_DATA.textStore?.[version]?.[bookId]?.[chapter]?.[verse];
            return text || "";
        }
window.EBibliaBible={cleanBookKey,addNormalizedVerse,extractBibleRecords,getVerseCount,loadBibleDataFromJSON,getVerseText};
})();
