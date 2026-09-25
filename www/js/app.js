/**
         * E-BIBLIA - Main Application Engine
         */

        // Initial Data Structure with Sample Verses for Demonstration & Comparison
        const BIBLE_DATA = {
            versions: {
                "LSG": { name: "Louis Segond (1910)", code: "LSG" },
                "DRB": { name: "Bible Darby", code: "DRB" },
                "MAR": { name: "Bible Martin (1744)", code: "MAR" },
                            },
            books: [
                { id: "GEN", name: "Genèse", testament: "OT", chapters: 50 },
                { id: "EXO", name: "Exode", testament: "OT", chapters: 40 },
                { id: "LEV", name: "Lévitique", testament: "OT", chapters: 27 },
                { id: "NUM", name: "Nombres", testament: "OT", chapters: 36 },
                { id: "DEU", name: "Deutéronome", testament: "OT", chapters: 34 },
                { id: "PSA", name: "Psaumes", testament: "OT", chapters: 150 },
                { id: "PRO", name: "Proverbes", testament: "OT", chapters: 31 },
                { id: "ISA", name: "Ésaïe", testament: "OT", chapters: 66 },
                { id: "MAT", name: "Matthieu", testament: "NT", chapters: 28 },
                { id: "MAR_NT", name: "Marc", testament: "NT", chapters: 16 },
                { id: "LUK", name: "Luc", testament: "NT", chapters: 24 },
                { id: "JOH", name: "Jean", testament: "NT", chapters: 21 },
                { id: "ACT", name: "Actes", testament: "NT", chapters: 28 },
                { id: "ROM", name: "Romains", testament: "NT", chapters: 16 },
                { id: "REV", name: "Apocalypse", testament: "NT", chapters: 22 }
            ],
            // Text Store: textStore[version][bookId][chapterNum][verseNum]
            textStore: {
                "LSG": {
                    "GEN": {
                        1: {
                            1: "Au commencement, Dieu créa les cieux et la terre.",
                            2: "La terre était informe et vide; il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
                            3: "Dieu dit: Que la lumière soit! Et la lumière fut.",
                            4: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.",
                            5: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.",
                            6: "Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.",
                            7: "Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi.",
                            8: "Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour."
                        }
                    },
                    "JOH": {
                        1: {
                            1: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
                            2: "Elle était au commencement avec Dieu.",
                            3: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle.",
                            4: "En elle était la vie, et la vie était la lumière des hommes.",
                            5: "La lumière luit dans les ténèbres, et les ténèbres ne l'ont point reçue."
                        }
                    }
                },
                "DRB": {
                    "GEN": {
                        1: {
                            1: "Au commencement, Dieu créa les cieux et la terre.",
                            2: "Et la terre était désolation et vide, et il y avait des ténèbres sur la face de l'abîme; et l'Esprit de Dieu planait sur la face des eaux.",
                            3: "Et Dieu dit: Que la lumière soit! Et la lumière fut.",
                            4: "Et Dieu vit la lumière, qu'elle était bonne; et Dieu sépara la lumière d'avec les ténèbres.",
                            5: "Et Dieu appela la lumière Jour, et les ténèbres il les appela Nuit. Et il y eut un soir, et il y eut un matin: premier jour.",
                            6: "Et Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.",
                            7: "Et Dieu fit l'étendue, et sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et il en fut ainsi.",
                            8: "Et Dieu appela l'étendue Cieux. Et il y eut un soir, et il y eut un matin: second jour."
                        }
                    },
                    "JOH": {
                        1: {
                            1: "Au commencement était la Parole, et la Parole était auprès de Dieu, et la Parole était Dieu.",
                            2: "Elle était au commencement auprès de Dieu.",
                            3: "Toutes choses furent faites par elle, et sans elle pas une seule chose ne fut faite de ce qui a été fait.",
                            4: "En elle était la vie, et la vie était la lumière des hommes.",
                            5: "Et la lumière luit dans les ténèbres; et les ténèbres ne l'ont pas saisie."
                        }
                    }
                },
                "MAR": {
                    "GEN": {
                        1: {
                            1: "Au commencement Dieu créa les cieux et la terre.",
                            2: "Or la terre était sans forme et vide, et les ténèbres étaient sur la face de l'abîme, et l'Esprit de Dieu se mouvait sur la face des eaux.",
                            3: "Alors Dieu dit : Que la lumière soit ; et la lumière fut.",
                            4: "Et Dieu vit que la lumière était bonne ; et Dieu sépara la lumière d'avec les ténèbres.",
                            5: "Et Dieu appela la lumière Jour, et il appela les ténèbres Nuit. Et il y eut un soir, et il y eut un matin, qui fut le premier jour."
                        }
                    },
                    "JOH": {
                        1: {
                            1: "Au commencement était la Parole, et la Parole était avec Dieu, et cette Parole était Dieu.",
                            2: "Elle était au commencement avec Dieu.",
                            3: "Toutes choses ont été faites par elle, et rien de ce qui a été fait, n'a été fait sans elle.",
                            4: "En elle était la vie, et la vie était la lumière des hommes.",
                            5: "Et la lumière luit dans les ténèbres, et les ténèbres ne l'ont point comprise."
                        }
                    }
                },
                "S21": {
                    "GEN": {
                        1: {
                            1: "Au commencement, Dieu créa le ciel et la terre.",
                            2: "La terre n'était que solitude et chaos. Des ténèbres couvraient l'abîme et l'Esprit de Dieu planait au-dessus des eaux.",
                            3: "Dieu dit: «Qu'il y ait de la lumière!» Et il y eut de la lumière.",
                            4: "Dieu vit que la lumière était bonne, et il sépara la lumière des ténèbres.",
                            5: "Dieu appela la lumière «jour», et il appela les ténèbres «nuit». Il y eut un soir et il y eut un matin: ce fut le premier jour."
                        }
                    },
                    "JOH": {
                        1: {
                            1: "Au commencement, la Parole existait déjà. La Parole était avec Dieu et la Parole était Dieu.",
                            2: "Elle était au commencement avec Dieu.",
                            3: "Tout a été fait par elle et rien de ce qui a été fait n'a été fait sans elle.",
                            4: "En elle il y avait la vie et cette vie était la lumière des êtres humains.",
                            5: "La lumière brille dans les ténèbres et les ténèbres ne l'ont pas étouffée."
                        }
                    }
                },
                "KJV": {
                    "GEN": {
                        1: {
                            1: "Au commencement, Dieu créa les cieux et la terre.",
                            2: "Et la terre était sans forme et vide; et les ténèbres étaient sur la surface de l'abîme, et l'Esprit de Dieu se mouvait sur la surface des eaux.",
                            3: "Et Dieu dit: Que la lumière soit! Et la lumière fut.",
                            4: "Et Dieu vit la lumière, qu'elle était bonne, et Dieu sépara la lumière d'avec les ténèbres.",
                            5: "Et Dieu appela la lumière Jour, et les ténèbres il les appela Nuit. Et le soir et le matin furent le premier jour."
                        }
                    },
                    "JOH": {
                        1: {
                            1: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
                            2: "Le même était au commencement avec Dieu.",
                            3: "Toutes choses ont été faites par elle; et sans elle rien de ce qui a été fait n'a été fait.",
                            4: "En elle était la vie, et la vie était la lumière des hommes.",
                            5: "Et la lumière luit dans les ténèbres; et les ténèbres ne l'ont pas comprise."
                        }
                    }
                }
            }
        };

        // Application State
        const state = {
            currentBook: "GEN",
            currentChapter: 1,
            version1: "LSG",
            version2: "DRB",
            viewMode: "single", // 'single', 'split', 'interlinear'
            fontSize: 17, // px
            syncScroll: true,
            selectedTestament: "ALL",
            bookmarks: JSON.parse(localStorage.getItem("ebiblia_bookmarks") || "[]"),
            _selectedVerse: 1
        };

        // Initialize Application
        document.addEventListener("DOMContentLoaded", async () => {
            try {
                await loadBibleDataFromJSON();
                const page = document.body?.dataset?.page || "reader";
                if (page === "reader") {
                    initBookSelectors();
                    initEventListeners();
                    renderBibleText();
                    renderBookmarks();
                    renderVerseNotes();
                    renderMarks();
                    renderCults();
                    renderNotebook();
                    initApplicationMenu();
                }
                updateGeminiStatus();
            } catch (error) {
                console.error("E-BIBLIA: échec du chargement des données bibliques", error);
                showToast("Impossible de charger les données bibliques.");
            }
        });

        // Populate Book Selectors
        function initBookSelectors() {
            const selectBook = document.getElementById("select-book");
            const selectBookMobile = document.getElementById("select-book-mobile");
            const booksList = document.getElementById("books-list");

            selectBook.innerHTML = "";
            selectBookMobile.innerHTML = "";
            booksList.innerHTML = "";

            BIBLE_DATA.books.forEach(b => {
                if (state.selectedTestament !== "ALL" && b.testament !== state.selectedTestament) return;

                // Desktop & Mobile Dropdown options
                const option = document.createElement("option");
                option.value = b.id;
                option.textContent = b.name;
                selectBook.appendChild(option);

                const optionMob = option.cloneNode(true);
                selectBookMobile.appendChild(optionMob);

                // Sidebar items
                const btn = document.createElement("button");
                const isActive = b.id === state.currentBook;
                btn.className = `w-full text-left px-3 py-2 text-sm rounded-lg transition font-medium flex justify-between items-center ${
                    isActive 
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-bold border-l-4 border-amber-500' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`;
                btn.innerHTML = `<span>${b.name}</span><span class="text-xs text-gray-400 font-normal">${b.chapters} ch.</span>`;
                btn.addEventListener("click", () => {
                    state.currentBook = b.id;
                    state.currentChapter = 1;
                    updateChapterSelector();
                    renderBibleText();
                    updateSidebarActiveState();
                    // Close sidebar on mobile
                    document.getElementById("sidebar-nav").classList.add("-translate-x-full");
                });
                booksList.appendChild(btn);
            });

            selectBook.value = state.currentBook;
            selectBookMobile.value = state.currentBook;

            updateChapterSelector();
        }

        // Update Chapter Dropdown
        function updateChapterSelector() {
            const book = BIBLE_DATA.books.find(b => b.id === state.currentBook);
            const selectChapter = document.getElementById("select-chapter");
            const selectChapterMobile = document.getElementById("select-chapter-mobile");

            selectChapter.innerHTML = "";
            selectChapterMobile.innerHTML = "";

            if (!book) return;

            for (let i = 1; i <= book.chapters; i++) {
                const opt = document.createElement("option");
                opt.value = i;
                opt.textContent = i;
                selectChapter.appendChild(opt);

                const optMob = opt.cloneNode(true);
                selectChapterMobile.appendChild(optMob);
            }

            selectChapter.value = state.currentChapter;
            selectChapterMobile.value = state.currentChapter;
        }

        function updateSidebarActiveState() {
            const buttons = document.querySelectorAll("#books-list button");
            const currentBookObj = BIBLE_DATA.books.find(b => b.id === state.currentBook);
            buttons.forEach(btn => {
                if (currentBookObj && btn.textContent.includes(currentBookObj.name)) {
                    btn.className = "w-full text-left px-3 py-2 text-sm rounded-lg transition font-medium flex justify-between items-center bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-bold border-l-4 border-amber-500";
                } else {
                    btn.className = "w-full text-left px-3 py-2 text-sm rounded-lg transition font-medium flex justify-between items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";
                }
            });
        }


        // ===== E-BIBLIA : CHARGEMENT DES BIBLES JSON =====
        const LOCAL_BIBLE_VERSIONS = {
            BFC: { name: "Bible en français courant", file: "BFC" },
            DAR: { name: "Bible Darby", file: "DAR" },
            LSG: { name: "Louis Segond (1910)", file: "LSG" },
            MRT: { name: "Bible Martin", file: "MRT" },
            OST: { name: "Ostervald", file: "OST" }
        };

        const FULL_BIBLE_BOOKS = [
            ["GEN","Genèse","OT"],["EXO","Exode","OT"],["LEV","Lévitique","OT"],["NUM","Nombres","OT"],
            ["DEU","Deutéronome","OT"],["JOS","Josué","OT"],["JDG","Juges","OT"],["RUT","Ruth","OT"],
            ["1SA","1 Samuel","OT"],["2SA","2 Samuel","OT"],["1KI","1 Rois","OT"],["2KI","2 Rois","OT"],
            ["1CH","1 Chroniques","OT"],["2CH","2 Chroniques","OT"],["EZR","Esdras","OT"],["NEH","Néhémie","OT"],
            ["EST","Esther","OT"],["JOB","Job","OT"],["PSA","Psaumes","OT"],["PRO","Proverbes","OT"],
            ["ECC","Ecclésiaste","OT"],["SNG","Cantique des cantiques","OT"],["ISA","Ésaïe","OT"],["JER","Jérémie","OT"],
            ["LAM","Lamentations","OT"],["EZK","Ézéchiel","OT"],["DAN","Daniel","OT"],["HOS","Osée","OT"],
            ["JOL","Joël","OT"],["AMO","Amos","OT"],["OBA","Abdias","OT"],["JON","Jonas","OT"],
            ["MIC","Michée","OT"],["NAM","Nahum","OT"],["HAB","Habacuc","OT"],["ZEP","Sophonie","OT"],
            ["HAG","Aggée","OT"],["ZEC","Zacharie","OT"],["MAL","Malachie","OT"],
            ["MAT","Matthieu","NT"],["MAR","Marc","NT"],["LUK","Luc","NT"],["JOH","Jean","NT"],
            ["ACT","Actes","NT"],["ROM","Romains","NT"],["1CO","1 Corinthiens","NT"],["2CO","2 Corinthiens","NT"],
            ["GAL","Galates","NT"],["EPH","Éphésiens","NT"],["PHP","Philippiens","NT"],["COL","Colossiens","NT"],
            ["1TH","1 Thessaloniciens","NT"],["2TH","2 Thessaloniciens","NT"],["1TI","1 Timothée","NT"],["2TI","2 Timothée","NT"],
            ["TIT","Tite","NT"],["PHM","Philémon","NT"],["HEB","Hébreux","NT"],["JAS","Jacques","NT"],
            ["1PE","1 Pierre","NT"],["2PE","2 Pierre","NT"],["1JO","1 Jean","NT"],["2JO","2 Jean","NT"],
            ["3JO","3 Jean","NT"],["JUD","Jude","NT"],["REV","Apocalypse","NT"]
        ];

        const BOOK_ALIASES = {
            "GEN":"GEN","GENESE":"GEN","GENESES":"GEN",
            "EXO":"EXO","EXODE":"EXO","LEV":"LEV","LEVITIQUE":"LEV","NUM":"NUM","NOMBRES":"NUM",
            "DEU":"DEU","DEUTERONOME":"DEU","JOS":"JOS","JOSUE":"JOS","JDG":"JDG","JUGES":"JDG","RUT":"RUT","RUTH":"RUT",
            "1SA":"1SA","1SAMUEL":"1SA","2SA":"2SA","2SAMUEL":"2SA","1KI":"1KI","1ROIS":"1KI","2KI":"2KI","2ROIS":"2KI",
            "1CH":"1CH","1CHRONIQUES":"1CH","2CH":"2CH","2CHRONIQUES":"2CH","EZR":"EZR","ESDRAS":"EZR","NEH":"NEH","NEHEMIE":"NEH",
            "EST":"EST","ESTHER":"EST","JOB":"JOB","PSA":"PSA","PS":"PSA","PSAUMES":"PSA","PRO":"PRO","PROVERBES":"PRO",
            "ECC":"ECC","ECCLESIASTE":"ECC","SNG":"SNG","CANTIQUE":"SNG","CANTIQUEDESCANTIQUES":"SNG",
            "ISA":"ISA","ESAIE":"ISA","JER":"JER","JEREMIE":"JER","LAM":"LAM","LAMENTATIONS":"LAM",
            "EZK":"EZK","EZECHIEL":"EZK","DAN":"DAN","DANIEL":"DAN","HOS":"HOS","OSEE":"HOS","JOL":"JOL","JOEL":"JOL",
            "AMO":"AMO","AMOS":"AMO","OBA":"OBA","ABDIAS":"OBA","JON":"JON","JONAS":"JON","MIC":"MIC","MICHEE":"MIC",
            "NAM":"NAM","NAHUM":"NAM","HAB":"HAB","HABACUC":"HAB","ZEP":"ZEP","SOPHONIE":"ZEP","HAG":"HAG","AGGEE":"HAG",
            "ZEC":"ZEC","ZACHARIE":"ZEC","MAL":"MAL","MALACHIE":"MAL",
            "MAT":"MAT","MATTHIEU":"MAT","MAR":"MAR","MARC":"MAR","LUK":"LUK","LUC":"LUK","JOH":"JOH","JEAN":"JOH",
            "ACT":"ACT","ACTES":"ACT","ROM":"ROM","ROMAINS":"ROM","1CO":"1CO","1CORINTHIENS":"1CO","2CO":"2CO","2CORINTHIENS":"2CO",
            "GAL":"GAL","GALATES":"GAL","EPH":"EPH","EPHESIENS":"EPH","PHP":"PHP","PHILIPPIENS":"PHP","COL":"COL","COLOSSIENS":"COL",
            "1TH":"1TH","1THESSALONICIENS":"1TH","2TH":"2TH","2THESSALONICIENS":"2TH","1TI":"1TI","1TIMOTHEE":"1TI","2TI":"2TI","2TIMOTHEE":"2TI",
            "TIT":"TIT","TITE":"TIT","PHM":"PHM","PHILEMON":"PHM","HEB":"HEB","HEBREUX":"HEB","JAS":"JAS","JACQUES":"JAS",
            "1PE":"1PE","1PIERRE":"1PE","2PE":"2PE","2PIERRE":"2PE","1JO":"1JO","1JEAN":"1JO","2JO":"2JO","2JEAN":"2JO",
            "3JO":"3JO","3JEAN":"3JO","JUD":"JUD","JUDE":"JUD","REV":"REV","APOCALYPSE":"REV"
        };

        function cleanBookKey(value) {
            if (value === undefined || value === null) return null;
            if (typeof value === "number" || /^\d+$/.test(String(value).trim())) {
                const n = Number(value);
                return FULL_BIBLE_BOOKS[n - 1]?.[0] || null;
            }
            const key = String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (BOOK_ALIASES[key]) return BOOK_ALIASES[key];
            return FULL_BIBLE_BOOKS.find(b => b[0] === key)?.[0] || null;
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
            const verses = BIBLE_DATA.textStore[version]?.[book]?.[chapter];
            if (!verses) return 0;
            return Math.max(0, ...Object.keys(verses).map(Number).filter(Number.isFinite));
        }

        async function loadBibleDataFromJSON() {
            if (!window.EBibliaBible?.loadBibleDataFromJSON) throw new Error("Le moteur biblique n'est pas chargé.");
            return window.EBibliaBible.loadBibleDataFromJSON();
        }

        // ===== FIN CHARGEMENT DES BIBLES JSON =====

        // Helper to retrieve verse text from the loaded JSON data.
        function getVerseText(version, bookId, chapter, verse) {
            const text = BIBLE_DATA.textStore?.[version]?.[bookId]?.[chapter]?.[verse];
            return text || "";
        }



        // Multi-selection of verses
        state.selectedVerses = state.selectedVerses || [];

        function verseSelectionKey(book, chapter, verse, version) {
            return `${version}|${book}|${chapter}|${verse}`;
        }

        function isVerseSelected(book, chapter, verse, version) {
            const key = verseSelectionKey(book, chapter, verse, version);
            return state.selectedVerses.some(x => verseSelectionKey(x.book, x.chapter, x.verse, x.version) === key);
        }

        function toggleVerseSelection(book, chapter, verse, version) {
            const key = verseSelectionKey(book, chapter, verse, version);
            const idx = state.selectedVerses.findIndex(x => verseSelectionKey(x.book, x.chapter, x.verse, x.version) === key);
            if (idx >= 0) {
                state.selectedVerses.splice(idx, 1);
            } else {
                state.selectedVerses.push({
                    book, chapter, verse, version,
                    text: getVerseText(version, book, chapter, verse)
                });
            }
            updateVerseSelectionToolbar();
            renderBibleText();
            setTimeout(renderUnifiedSelectionActions, 0);
        }

        function clearVerseSelection() {
            state.selectedVerses = [];
            updateVerseSelectionToolbar();
            renderBibleText();
        }

        function getSelectedVersesText() {
            return [...state.selectedVerses]
                .sort((a,b) => Number(a.verse) - Number(b.verse))
                .map(v => {
                    const bookName = BIBLE_DATA.books.find(b => b.id === v.book)?.name || v.book;
                    return `${bookName} ${v.chapter}:${v.verse} (${versionName(v.version)})\n${v.text}`;
                }).join("\n\n");
        }
        function updateInlineVerseActions() {
            renderUnifiedSelectionActions();
        }

        function updateVerseSelectionToolbar() {
            renderUnifiedSelectionActions();
        }
        async function shareSelectedVerses() {
            if (!state.selectedVerses.length) return;
            const bookName = BIBLE_DATA.books.find(b => b.id === state.selectedVerses[0].book)?.name || state.selectedVerses[0].book;
            const text = `E-BIBLIA\n\n${getSelectedVersesText()}`;

            // On Android/modern browsers, navigator.share opens the system share sheet.
            // It can expose WhatsApp, Bluetooth, Wi-Fi/Quick Share and other installed apps
            // according to what the device supports.
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `E-BIBLIA — ${bookName}`,
                        text
                    });
                    return;
                } catch (e) {
                    if (e?.name === "AbortError") return;
                }
            }

            // Fallback for environments without Web Share API.
            try {
                await navigator.clipboard.writeText(text);
                showToast("Versets copiés. Vous pouvez les coller dans l'application de partage de votre choix.");
            } catch (e) {
                window.prompt("Copiez ces versets :", text);
            }
        }

        function addSelectedToVerseNotes() {
            if (!state.selectedVerses.length) return;
            appData.verseNotes.push({
                book: state.selectedVerses[0].book,
                chapter: state.selectedVerses[0].chapter,
                verse: state.selectedVerses.map(v => v.verse).join(","),
                version: state.selectedVerses[0].version,
                note: "",
                text: getSelectedVersesText(),
                selectedVerses: state.selectedVerses.map(v => v.verse),
                createdAt: new Date().toISOString()
            });
            saveAppData();
            renderVerseNotes();
            openAppModal("modal-verse-notes");
            showToast("Versets ajoutés aux notes.");
        }

        function addSelectedToCult() {
            if (!state.selectedVerses.length) return;
            const refs = [...state.selectedVerses]
                .sort((a,b) => Number(a.verse) - Number(b.verse))
                .map(v => {
                    const n = BIBLE_DATA.books.find(b => b.id === v.book)?.name || v.book;
                    return `${n} ${v.chapter}:${v.verse}`;
                }).join(", ");
            const existingDate = document.getElementById("cult-date");
            if (existingDate && !existingDate.value) {
                existingDate.value = new Date().toISOString().slice(0,10);
            }
            const versesInput = document.getElementById("cult-verses");
            if (versesInput) {
                versesInput.value = versesInput.value.trim()
                    ? `${versesInput.value.trim()}, ${refs}`
                    : refs;
            }
            openAppModal("modal-cults");
            showToast("Versets ajoutés au culte. Complétez les informations puis enregistrez.");
        }

        // One compact action group for the whole current selection.
        function renderUnifiedSelectionActions() {
            document.querySelectorAll(".verse-inline-selection-actions").forEach(el => el.remove());

            if (!state.selectedVerses.length || state.viewMode !== "single") return;

            const selected = [...state.selectedVerses]
                .filter(v => v.book === state.currentBook && Number(v.chapter) === Number(state.currentChapter) && v.version === state.version1)
                .sort((a, b) => Number(a.verse) - Number(b.verse));

            if (!selected.length) return;

            const lastVerse = selected[selected.length - 1].verse;
            const verseEl = document.querySelector(`#text-column-single [data-verse="${lastVerse}"]`);
            if (!verseEl) return;

            const actions = document.createElement("div");
            actions.className = "verse-inline-selection-actions";
            actions.innerHTML = `
                <span class="selection-count">${selected.length} sélectionné${selected.length > 1 ? "s" : ""}</span>
                <button class="selection-action-btn" data-selection-action="share" title="Partager la sélection"><i class="fa-solid fa-share-nodes text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="note" title="Ajouter aux notes"><i class="fa-solid fa-note-sticky text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="cult" title="Ajouter à un culte"><i class="fa-solid fa-church text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="favorite" title="Ajouter aux favoris"><i class="fa-solid fa-bookmark text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="highlight" title="Surligner"><i class="fa-solid fa-highlighter text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="ai" title="Analyser avec l'IA"><i class="fa-solid fa-wand-magic-sparkles text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="copy" title="Copier"><i class="fa-solid fa-copy text-[11px]"></i></button>
                <button class="selection-action-btn" data-selection-action="clear" title="Annuler la sélection"><i class="fa-solid fa-xmark text-[11px]"></i></button>
            `;

            actions.addEventListener("click", async (e) => {
                const btn = e.target.closest("[data-selection-action]");
                if (!btn) return;
                e.stopPropagation();

                const action = btn.dataset.selectionAction;
                if (action === "share") await shareSelectedVerses();
                if (action === "note") addSelectedToVerseNotes();
                if (action === "cult") addSelectedToCult();
                if (action === "favorite") bookmarkSelectedVerses();
                if (action === "highlight") highlightSelectedVerses();
                if (action === "ai") openAIForSelection();
                if (action === "copy") copySelectedVerses();
                if (action === "clear") clearVerseSelection();
            });

            const parent = verseEl.parentElement;
            if (parent) parent.insertBefore(actions, verseEl.nextSibling);
        }

        function bookmarkSelectedVerses() {
            if (!state.selectedVerses.length) return;
            state.selectedVerses.forEach(v => {
                if (!isVerseBookmarked(v.book, v.chapter, v.verse, v.version)) {
                    state.bookmarks.push(v);
                }
            });
            localStorage.setItem("ebiblia_bookmarks", JSON.stringify(state.bookmarks));
            renderBookmarks();
            showToast("Sélection enregistrée dans les favoris.");
        }

        function highlightSelectedVerses() {
            if (!state.selectedVerses.length) return;
            state.selectedVerses.forEach(v => {
                const existing = appData.marks.findIndex(m =>
                    m.book === v.book && m.chapter === v.chapter && m.verse === v.verse && m.version === v.version
                );
                if (existing < 0) {
                    appData.marks.push({
                        book: v.book, chapter: v.chapter, verse: v.verse,
                        version: v.version, text: v.text, createdAt: new Date().toISOString()
                    });
                }
            });
            saveAppData();
            renderMarks();
            renderBibleText();
            showToast("Sélection surlignée.");
        }

        async function copySelectedVerses() {
            if (!state.selectedVerses.length) return;
            const text = getSelectedVersesText();
            try {
                await navigator.clipboard.writeText(text);
                showToast("Sélection copiée.");
            } catch (e) {
                window.prompt("Copiez les versets :", text);
            }
        }

        async function openAIForSelection() {
            if (!state.selectedVerses.length) return;
            const reference = getSelectedVersesText();
            const modalReference = document.getElementById("ai-modal-reference");
            const questionInput = document.getElementById("ai-question");
            const result = document.getElementById("ai-result");
            if (modalReference) modalReference.textContent = reference;
            if (questionInput) questionInput.value = "";
            if (result) result.innerHTML = `<div class="flex items-center justify-center gap-2 text-gray-500 py-8"><i class="fa-solid fa-spinner fa-spin"></i> L'IA étudie le passage dans son contexte…</div>`;
            openAppModal("modal-ai");
            await runGeminiAnalysis(true);
            setTimeout(() => questionInput?.focus(), 50);
        }

        function getGeminiConfig() {
            const injected = window.EBIBLIA_CONFIG || {};
            return {
                apiKey: injected.API_KEY || "",
                model: injected.GEMINI_MODEL || "gemini-3-flash-preview"
            };
        }

        async function askGemini(question = "") {
            const config = getGeminiConfig();
            if (!config.apiKey) {
                throw new Error("La configuration interne de l'Assistant IA est introuvable.");
            }

            const biblicalContext = getSelectedVersesText();
            const isInitialExplanation = !question.trim();
            const userRequest = isInitialExplanation
                ? `Explique directement ce passage biblique dans son contexte. Commence par identifier le contexte immédiat du passage, puis présente son contexte historique et culturel lorsque pertinent, explique le sens du texte verset par verset ou par unités de pensée, les notions théologiques importantes et le message principal. Termine par quelques points d'application clairement distingués de ce que le texte dit réellement. Ne demande pas à l'utilisateur de formuler une question : cette réponse est l'explication initiale du passage.`
                : `Réponds précisément à la question de l'utilisateur en t'appuyant d'abord sur le passage sélectionné et son contexte. Si nécessaire, rappelle brièvement le contexte avant de répondre. Question : ${question}`;

            const systemInstruction = {
                parts: [{
                    text: "Tu es l'assistant d'étude biblique E-Biblia. Réponds en français avec rigueur, nuance et clarté. Distingue le texte biblique, le contexte historique et culturel, les interprétations théologiques et les applications pratiques. N'invente pas de versets ni de citations. Lorsque le passage ne permet pas d'établir un point, indique-le clairement. IMPORTANT : utilise un formatage riche mais n'écris JAMAIS les marqueurs Markdown **, ***, __ ou * pour simuler le gras, l'italique ou le souligné. Utilise uniquement du texte normal avec des titres et des listes simples. E-Biblia transformera ensuite certains marqueurs internes si nécessaire."
                }]
            };

            const payload = {
                systemInstruction,
                contents: [{
                    role: "user",
                    parts: [{
                        text: `Passage biblique sélectionné :\n${biblicalContext}\n\n${userRequest}`
                    }]
                }]
            };

            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.error?.message || `Erreur Gemini (${response.status}).`);
            return (data?.candidates?.[0]?.content?.parts || []).map(part => part.text || "").join("").trim() || "Gemini n'a retourné aucun contenu.";
        }

        async function runGeminiAnalysis(initialExplanation = false) {
            const questionInput = document.getElementById("ai-question");
            const question = questionInput?.value.trim() || "";
            const result = document.getElementById("ai-result");
            const button = document.getElementById("btn-ai-submit");
            if (!initialExplanation && !question) {
                showToast("Écrivez votre question.");
                questionInput?.focus();
                return;
            }

            result.innerHTML = `<div class="flex items-center justify-center gap-2 text-gray-500 py-8"><i class="fa-solid fa-spinner fa-spin"></i> ${initialExplanation ? "Explication du passage en cours…" : "Recherche de la réponse…"}</div>`;
            if (button) button.disabled = true;
            try {
                const answer = await askGemini(question);
                result.innerHTML = renderAIResponse(answer);
            } catch (error) {
                result.innerHTML = `<div class="text-red-600 dark:text-red-400">${escapeHtml(error.message)}</div>`;
            } finally {
                if (button) button.disabled = false;
            }
        }

        // Main Render Engine
        function renderBibleText() {
            const book = BIBLE_DATA.books.find(b => b.id === state.currentBook);
            const bookName = book ? book.name : state.currentBook;

            // Title update
            document.getElementById("current-reference-title").textContent = `${bookName} ${state.currentChapter}`;
            document.getElementById("current-reference-subtitle").textContent = 
                state.viewMode === 'single' 
                    ? BIBLE_DATA.versions[state.version1]?.name || state.version1 
                    : `Comparaison : ${state.version1} vs ${state.version2}`;

            // Adjust font size dynamically
            document.querySelectorAll("#text-column-single, #text-column-left, #text-column-right, #text-column-interlinear")
                .forEach(el => el.style.fontSize = `${state.fontSize}px`);

            // 1. Single Column Rendering
            if (state.viewMode === 'single') {
                const singleCol = document.getElementById("text-column-single");
                singleCol.innerHTML = "";

                for (let v = 1, maxVerse = getVerseCount(state.version1, state.currentBook, state.currentChapter); v <= maxVerse; v++) {
                    const verseTxt = getVerseText(state.version1, state.currentBook, state.currentChapter, v);
                    const isBookmarked = isVerseBookmarked(state.currentBook, state.currentChapter, v, state.version1);
                    const verseEl = document.createElement("div");
                    verseEl.className = `group p-2 rounded transition cursor-pointer flex items-start space-x-2 ${isVerseSelected(state.currentBook, state.currentChapter, v, state.version1) ? "bg-amber-100 dark:bg-amber-900/40 ring-2 ring-amber-400" : "hover:bg-amber-50 dark:hover:bg-gray-800/50"}`;
                    verseEl.dataset.verse = v;
                    verseEl.title = "Cliquer pour sélectionner / désélectionner ce verset";
verseEl.addEventListener("click", (event) => {
                        if (event.target.closest("button")) return;
                        toggleVerseSelection(state.currentBook, state.currentChapter, v, state.version1);
                    });
                    verseEl.innerHTML = `
                        <sup class="font-bold text-amber-600 dark:text-amber-400 text-xs select-none mt-1 mr-1">${v}</sup>
                        <span class="flex-1">${verseTxt}</span>
                        <div class="opacity-0 group-hover:opacity-100 flex items-center space-x-1 transition">
                            <button onclick="toggleBookmark('${state.currentBook}', ${state.currentChapter}, ${v}, '${state.version1}')" class="p-1 text-xs ${isBookmarked ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'}" title="Favori">
                                <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
                            </button>
                            <button onclick="toggleMark('${state.currentBook}', ${state.currentChapter}, ${v}, '${state.version1}')" class="p-1 text-xs ${isVerseMarked(state.currentBook, state.currentChapter, v, state.version1) ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}" title="Marquer">
                                <i class="fa-solid fa-highlighter"></i>
                            </button>
                            <button onclick="openVerseNoteForCurrentVerse(${v})" class="p-1 text-xs text-gray-400 hover:text-amber-600" title="Ajouter une note">
                                <i class="fa-solid fa-note-sticky"></i>
                            </button>
                            <button onclick="speakVerse('${escapeQuotes(verseTxt)}')" class="p-1 text-xs text-gray-400 hover:text-amber-600" title="Écouter"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    `;
                    singleCol.appendChild(verseEl);
                }
                renderUnifiedSelectionActions();
            }

            // 2. Split Côte à Côte View
            else if (state.viewMode === 'split') {
                const leftCol = document.getElementById("text-column-left");
                const rightCol = document.getElementById("text-column-right");
                leftCol.innerHTML = "";
                rightCol.innerHTML = "";

                document.getElementById("badge-version-1").querySelector("span").textContent = BIBLE_DATA.versions[state.version1]?.name || state.version1;
                document.getElementById("badge-version-2").querySelector("span").textContent = BIBLE_DATA.versions[state.version2]?.name || state.version2;

                for (let v = 1, maxVerse = Math.max(getVerseCount(state.version1, state.currentBook, state.currentChapter), getVerseCount(state.version2, state.currentBook, state.currentChapter)); v <= maxVerse; v++) {
                    const txt1 = getVerseText(state.version1, state.currentBook, state.currentChapter, v);
                    const txt2 = getVerseText(state.version2, state.currentBook, state.currentChapter, v);

                    const el1 = document.createElement("div");
                    el1.className = "verse-node hover:bg-amber-50 dark:hover:bg-gray-800/50 p-2 rounded transition cursor-pointer";
                    el1.dataset.verse = v;
                    el1.innerHTML = `<sup class="font-bold text-amber-600 dark:text-amber-400 text-xs select-none mr-1">${v}</sup> ${txt1}`;

                    const el2 = document.createElement("div");
                    el2.className = "verse-node hover:bg-blue-50 dark:hover:bg-gray-800/50 p-2 rounded transition cursor-pointer";
                    el2.dataset.verse = v;
                    el2.innerHTML = `<sup class="font-bold text-blue-600 dark:text-blue-400 text-xs select-none mr-1">${v}</sup> ${txt2}`;

                    // Hover Sync Events
                    el1.addEventListener("mouseenter", () => highlightSyncVerses(v, true));
                    el1.addEventListener("mouseleave", () => highlightSyncVerses(v, false));
                    el2.addEventListener("mouseenter", () => highlightSyncVerses(v, true));
                    el2.addEventListener("mouseleave", () => highlightSyncVerses(v, false));

                    leftCol.appendChild(el1);
                    rightCol.appendChild(el2);
                }
            }

            // 3. Interlinear (Verset par Verset) View
            else if (state.viewMode === 'interlinear') {
                const interCol = document.getElementById("text-column-interlinear");
                interCol.innerHTML = "";

                for (let v = 1, maxVerse = Math.max(getVerseCount(state.version1, state.currentBook, state.currentChapter), getVerseCount(state.version2, state.currentBook, state.currentChapter)); v <= maxVerse; v++) {
                    const txt1 = getVerseText(state.version1, state.currentBook, state.currentChapter, v);
                    const txt2 = getVerseText(state.version2, state.currentBook, state.currentChapter, v);

                    const block = document.createElement("div");
                    block.className = "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:border-amber-400 dark:hover:border-amber-600 transition";
                    block.innerHTML = `
                        <div class="flex justify-between items-center mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
                            <span class="font-bold text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full">Verset ${v}</span>
                            <div class="space-x-1">
                                <button onclick="speakVerse('${escapeQuotes(txt1)}')" class="text-xs text-gray-400 hover:text-amber-600 p-1" title="Écouter V1"><i class="fa-solid fa-volume-high"></i> V1</button>
                                <button onclick="speakVerse('${escapeQuotes(txt2)}')" class="text-xs text-gray-400 hover:text-blue-600 p-1" title="Écouter V2"><i class="fa-solid fa-volume-high"></i> V2</button>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="pl-3 border-l-2 border-amber-500">
                                <span class="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">${state.version1}</span>
                                <p class="text-gray-900 dark:text-gray-100">${txt1}</p>
                            </div>
                            <div class="pl-3 border-l-2 border-blue-500">
                                <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-0.5">${state.version2}</span>
                                <p class="text-gray-700 dark:text-gray-300">${txt2}</p>
                            </div>
                        </div>
                    `;
                    interCol.appendChild(block);
                }
            }
        }

        // Highlight corresponding verses in split mode
        function highlightSyncVerses(verseNum, highlight) {
            const leftVerses = document.querySelectorAll(`#text-column-left .verse-node[data-verse="${verseNum}"]`);
            const rightVerses = document.querySelectorAll(`#text-column-right .verse-node[data-verse="${verseNum}"]`);

            [...leftVerses, ...rightVerses].forEach(el => {
                if (highlight) {
                    el.classList.add("verse-active-sync");
                } else {
                    el.classList.remove("verse-active-sync");
                }
            });
        }

        // Text-to-Speech Helper
        function speakVerse(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'fr-FR';
                utterance.rate = 0.95;
                window.speechSynthesis.speak(utterance);
                showToast("Lecture audio en cours...");
            } else {
                showToast("La synthèse vocale n'est pas supportée par votre navigateur.");
            }
        }

        function escapeQuotes(str) {
            return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        }

        // Bookmark Logic
        function isVerseBookmarked(book, chapter, verse, version) {
            return state.bookmarks.some(b => b.book === book && b.chapter === chapter && b.verse === verse && b.version === version);
        }

        function toggleBookmark(book, chapter, verse, version) {
            const index = state.bookmarks.findIndex(b => b.book === book && b.chapter === chapter && b.verse === verse && b.version === version);
            const verseText = getVerseText(version, book, chapter, verse);
            
            if (index > -1) {
                state.bookmarks.splice(index, 1);
                showToast("Verset retiré des favoris.");
            } else {
                state.bookmarks.push({ book, chapter, verse, version, text: verseText });
                showToast("Verset enregistré dans vos favoris!");
            }
            localStorage.setItem("ebiblia_bookmarks", JSON.stringify(state.bookmarks));
            renderBibleText();
            renderBookmarks();
        }

        function renderBookmarks() {
            const container = document.getElementById("bookmarks-list-container");
            container.innerHTML = "";

            if (state.bookmarks.length === 0) {
                container.innerHTML = `<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">Aucun verset sauvegardé pour le moment.</p>`;
                return;
            }

            state.bookmarks.forEach(bm => {
                const bookObj = BIBLE_DATA.books.find(b => b.id === bm.book);
                const bookName = bookObj ? bookObj.name : bm.book;
                const card = document.createElement("div");
                card.className = "p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:border-amber-400 transition cursor-pointer";
                card.innerHTML = `
                    <div class="flex justify-between items-center text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                        <span>${bookName} ${bm.chapter}:${bm.verse}</span>
                        <span class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300 font-normal">${bm.version}</span>
                    </div>
                    <p class="text-xs text-gray-800 dark:text-gray-200 line-clamp-3 mb-2 font-reader">${bm.text}</p>
                    <div class="flex justify-end space-x-2">
                        <button onclick="event.stopPropagation(); toggleBookmark('${bm.book}', ${bm.chapter}, ${bm.verse}, '${bm.version}')" class="text-xs text-red-500 hover:text-red-700">Supprimer</button>
                    </div>
                `;
                card.addEventListener("click", () => {
                    state.currentBook = bm.book;
                    state.currentChapter = bm.chapter;
                    state.version1 = bm.version;
                    document.getElementById("select-version-1").value = bm.version;
                    document.getElementById("select-book").value = bm.book;
                    updateChapterSelector();
                    renderBibleText();
                    document.getElementById("modal-bookmarks").classList.add("hidden");
                });
                container.appendChild(card);
            });
        }

        // Search Mechanism
        function executeSearch(query) {
            const container = document.getElementById("search-results-container");
            container.innerHTML = "";

            if (!query || query.trim().length < 2) {
                container.innerHTML = `<p class="text-sm text-gray-500 text-center py-4">Entrez au moins 2 caractères pour chercher.</p>`;
                return;
            }

            const results = [];
            const qLower = query.toLowerCase();

            // Search ONLY in the currently selected primary translation.
            const selectedVersion = state.version1;
            const verObj = BIBLE_DATA.textStore[selectedVersion] || {};
            Object.keys(verObj).forEach(bk => {
                Object.keys(verObj[bk]).forEach(ch => {
                    Object.keys(verObj[bk][ch]).forEach(vs => {
                        const text = verObj[bk][ch][vs];
                        if (typeof text === "string" && text.toLowerCase().includes(qLower)) {
                            results.push({
                                version: selectedVersion,
                                book: bk,
                                chapter: ch,
                                verse: vs,
                                text: text
                            });
                        }
                    });
                });
            });

            if (results.length === 0) {
                container.innerHTML = `<p class="text-sm text-gray-500 text-center py-8">Aucun résultat trouvé pour "${query}".</p>`;
                return;
            }

            results.forEach(res => {
                const bName = BIBLE_DATA.books.find(b => b.id === res.book)?.name || res.book;
                const card = document.createElement("div");
                card.className = "p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-800 transition cursor-pointer border border-gray-200 dark:border-gray-700";
                card.innerHTML = `
                    <div class="flex justify-between items-center text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                        <span>${bName} ${res.chapter}:${res.verse}</span>
                        <span class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300 font-normal">${res.version}</span>
                    </div>
                    <p class="text-xs md:text-sm text-gray-800 dark:text-gray-200 font-reader">${highlightText(res.text, query)}</p>
                `;
                card.addEventListener("click", () => {
                    state.currentBook = res.book;
                    state.currentChapter = parseInt(res.chapter);
                    state.version1 = res.version;
                    document.getElementById("select-version-1").value = res.version;
                    document.getElementById("select-book").value = res.book;
                    updateChapterSelector();
                    renderBibleText();
                    document.getElementById("modal-search").classList.add("hidden");
                });
                container.appendChild(card);
            });
        }

        function highlightText(text, keyword) {
            const regex = new RegExp(`(${keyword})`, 'gi');
            return text.replace(regex, `<mark class="bg-amber-200 dark:bg-amber-900/60 dark:text-white px-0.5 rounded">$1</mark>`);
        }

        // JSON File Importer Handler
        function handleImportJSON() {
            const codeInput = document.getElementById("import-version-code").value.trim().toUpperCase();
            const titleInput = document.getElementById("import-version-title").value.trim();
            const fileInput = document.getElementById("import-file-input");

            if (!codeInput || !titleInput) {
                showToast("Veuillez renseigner un code et un titre.");
                return;
            }

            if (!fileInput.files || fileInput.files.length === 0) {
                showToast("Veuillez choisir un fichier JSON.");
                return;
            }

            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    
                    // Register Version
                    BIBLE_DATA.versions[codeInput] = { name: titleInput, code: codeInput };
                    
                    // Assign text data structure flexibility
                    BIBLE_DATA.textStore[codeInput] = parsedData;

                    // Update Selectors
                    const select1 = document.getElementById("select-version-1");
                    const select2 = document.getElementById("select-version-2");

                    const opt1 = document.createElement("option");
                    opt1.value = codeInput;
                    opt1.textContent = titleInput;
                    select1.appendChild(opt1);

                    const opt2 = opt1.cloneNode(true);
                    select2.appendChild(opt2);

                    showToast(`La version ${codeInput} a été importée avec succès!`);
                    document.getElementById("modal-import").classList.add("hidden");
                } catch (err) {
                    showToast("Erreur lors de la lecture du fichier JSON : format invalide.");
                }
            };

            reader.readAsText(file);
        }


        // Application-local features
        const appData = {
            marks: JSON.parse(localStorage.getItem("ebiblia_marks") || "[]"),
            verseNotes: JSON.parse(localStorage.getItem("ebiblia_notes") || "[]"),
            cults: JSON.parse(localStorage.getItem("ebiblia_cults") || "[]"),
            notebook: JSON.parse(localStorage.getItem("ebiblia_notebook") || "[]")
        };

        function saveAppData() {
            localStorage.setItem("ebiblia_marks", JSON.stringify(appData.marks));
            localStorage.setItem("ebiblia_notes", JSON.stringify(appData.verseNotes));
            localStorage.setItem("ebiblia_cults", JSON.stringify(appData.cults));
            localStorage.setItem("ebiblia_notebook", JSON.stringify(appData.notebook));
        }

        function versionName(code) {
            return BIBLE_DATA.versions[code]?.name || code;
        }

        function verseLabel(item) {
            const book = BIBLE_DATA.books.find(b => b.id === item.book)?.name || item.book;
            return `${book} ${item.chapter}:${item.verse}`;
        }

        function isVerseMarked(book, chapter, verse, version) {
            return appData.marks.some(m => m.book === book && Number(m.chapter) === Number(chapter) && Number(m.verse) === Number(verse) && m.version === version);
        }

        function toggleMark(book, chapter, verse, version) {
            const idx = appData.marks.findIndex(m => m.book === book && Number(m.chapter) === Number(chapter) && Number(m.verse) === Number(verse) && m.version === version);
            if (idx >= 0) {
                appData.marks.splice(idx, 1);
                showToast("Marquage retiré.");
            } else {
                appData.marks.push({
                    book, chapter, verse, version,
                    text: getVerseText(version, book, chapter, verse),
                    createdAt: new Date().toISOString()
                });
                showToast("Passage marqué dans cette traduction.");
            }
            saveAppData();
            renderBibleText();
            renderMarks();
        }

        function openAppModal(id) {
            document.querySelectorAll(".app-modal").forEach(m => m.classList.add("hidden"));
            const el = document.getElementById(id);
            if (el) el.classList.remove("hidden");
        }

        function closeAllModals() {
            document.querySelectorAll(".app-modal, #modal-search, #modal-import, #modal-bookmarks").forEach(m => m.classList.add("hidden"));
        }

        function renderVerseNotes() {
            const box = document.getElementById("verse-notes-list");
            if (!box) return;
            box.innerHTML = "";
            if (!appData.verseNotes.length) {
                box.innerHTML = `<p class="text-sm text-gray-500 text-center py-8">Aucune note de verset pour le moment.</p>`;
                return;
            }
            [...appData.verseNotes].reverse().forEach((n, reverseIndex) => {
                const realIndex = appData.verseNotes.length - 1 - reverseIndex;
                const card = document.createElement("div");
                card.className = "p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
                card.innerHTML = `
                    <div class="flex justify-between gap-2">
                        <div>
                            <p class="font-semibold text-sm text-amber-700 dark:text-amber-400">${verseLabel(n)}</p>
                            <p class="text-[11px] text-gray-500">${versionName(n.version)}</p>
                        </div>
                        <button class="text-red-500 text-xs" data-delete-note="${realIndex}" title="Supprimer"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <p class="text-sm mt-2 whitespace-pre-wrap">${escapeHtml(n.note)}</p>
                    <p class="text-xs text-gray-500 mt-2">${escapeHtml(n.text || "")}</p>`;
                box.appendChild(card);
            });
            box.querySelectorAll("[data-delete-note]").forEach(btn => btn.addEventListener("click", () => {
                appData.verseNotes.splice(Number(btn.dataset.deleteNote), 1);
                saveAppData();
                renderVerseNotes();
            }));
        }

        function saveVerseNote() {
            const note = document.getElementById("verse-note-input").value.trim();
            if (!note) return showToast("Écrivez une note avant d'enregistrer.");
            appData.verseNotes.push({
                book: state.currentBook,
                chapter: state.currentChapter,
                verse: state._selectedVerse || 1,
                version: state.version1,
                note,
                text: getVerseText(state.version1, state.currentBook, state.currentChapter, state._selectedVerse || 1),
                createdAt: new Date().toISOString()
            });
            saveAppData();
            document.getElementById("verse-note-input").value = "";
            renderVerseNotes();
            showToast("Note de verset enregistrée.");
        }

        function openVerseNoteForCurrentVerse(verse) {
            state._selectedVerse = Number(verse);
            const text = getVerseText(state.version1, state.currentBook, state.currentChapter, state._selectedVerse);
            document.getElementById("verse-note-context").textContent = `${verseLabel({book: state.currentBook, chapter: state.currentChapter, verse: state._selectedVerse})} — ${versionName(state.version1)}`;
            document.getElementById("verse-note-input").value = "";
            openAppModal("modal-verse-notes");
        }

        function renderMarks() {
            const box = document.getElementById("marks-list");
            if (!box) return;
            box.innerHTML = "";
            if (!appData.marks.length) {
                box.innerHTML = `<p class="text-sm text-gray-500 text-center py-8">Aucun passage marqué.</p>`;
                return;
            }
            [...appData.marks].reverse().forEach((m, reverseIndex) => {
                const realIndex = appData.marks.length - 1 - reverseIndex;
                const card = document.createElement("div");
                card.className = "p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800";
                card.innerHTML = `
                    <div class="flex justify-between gap-2">
                        <div>
                            <p class="font-semibold text-sm text-amber-700 dark:text-amber-400">${verseLabel(m)}</p>
                            <p class="text-[11px] text-gray-500">${versionName(m.version)}</p>
                        </div>
                        <button class="text-red-500 text-xs" data-delete-mark="${realIndex}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <p class="text-sm mt-2">${escapeHtml(m.text || "")}</p>`;
                box.appendChild(card);
            });
            box.querySelectorAll("[data-delete-mark]").forEach(btn => btn.addEventListener("click", () => {
                appData.marks.splice(Number(btn.dataset.deleteMark), 1);
                saveAppData();
                renderMarks();
                renderBibleText();
            }));
        }

        function renderCults() {
            const box = document.getElementById("cults-list");
            if (!box) return;
            box.innerHTML = "";
            if (!appData.cults.length) {
                box.innerHTML = `<p class="text-sm text-gray-500 text-center py-8">Aucun culte enregistré.</p>`;
                return;
            }
            [...appData.cults].reverse().forEach((c, reverseIndex) => {
                const realIndex = appData.cults.length - 1 - reverseIndex;
                const card = document.createElement("div");
                card.className = "p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
                card.innerHTML = `
                    <div class="flex justify-between gap-2">
                        <div>
                            <p class="font-semibold text-sm">${escapeHtml(c.theme || "Culte")}</p>
                            <p class="text-xs text-amber-700 dark:text-amber-400">${escapeHtml(c.date || "")} · ${escapeHtml(c.preacher || "Prédicateur non renseigné")}</p>
                        </div>
                        <button class="text-red-500 text-xs" data-delete-cult="${realIndex}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <p class="text-xs mt-2"><strong>Versets :</strong> ${escapeHtml(c.verses || "—")}</p>
                    <p class="text-sm mt-2 whitespace-pre-wrap">${escapeHtml(c.notes || "")}</p>`;
                box.appendChild(card);
            });
            box.querySelectorAll("[data-delete-cult]").forEach(btn => btn.addEventListener("click", () => {
                appData.cults.splice(Number(btn.dataset.deleteCult), 1);
                saveAppData();
                renderCults();
            }));
        }

        function renderNotebook() {
            const box = document.getElementById("notebook-list");
            if (!box) return;
            box.innerHTML = "";
            if (!appData.notebook.length) {
                box.innerHTML = `<p class="text-sm text-gray-500 text-center py-8">Votre bloc-notes est vide.</p>`;
                return;
            }
            [...appData.notebook].reverse().forEach((n, reverseIndex) => {
                const realIndex = appData.notebook.length - 1 - reverseIndex;
                const card = document.createElement("div");
                card.className = "p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
                card.innerHTML = `
                    <div class="flex justify-between gap-2">
                        <p class="font-semibold text-sm">${escapeHtml(n.title || "Sans titre")}</p>
                        <button class="text-red-500 text-xs" data-delete-notebook="${realIndex}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <p class="text-sm mt-2 whitespace-pre-wrap">${escapeHtml(n.content || "")}</p>`;
                box.appendChild(card);
            });
            box.querySelectorAll("[data-delete-notebook]").forEach(btn => btn.addEventListener("click", () => {
                appData.notebook.splice(Number(btn.dataset.deleteNotebook), 1);
                saveAppData();
                renderNotebook();
            }));
        }

        function escapeHtml(value) {
            return String(value ?? "").replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
        }

        // Convertit le Markdown simple produit par Gemini en HTML sûr et lisible.
        // Le texte est d'abord échappé : le modèle ne peut donc pas injecter de HTML/JS.
        function renderAIResponse(markdown) {
            let text = escapeHtml(markdown).replace(/\r\n?/g, "\n");
            const blocks = text.split(/\n{2,}/);

            const formatInline = (value) => {
                // Code inline
                value = value.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">$1</code>');
                // Gras + italique : ***texte***
                value = value.replace(/\*\*\*([^*\n]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
                // Souligné : __texte__
                value = value.replace(/__([^_\n]+?)__/g, '<u>$1</u>');
                // Gras : **texte**
                value = value.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
                // Italique : *texte* ou _texte_
                value = value.replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>');
                value = value.replace(/(^|[^_])_([^_\n]+?)_(?!_)/g, '$1<em>$2</em>');
                // Nettoyage final : aucun marqueur Markdown d'emphase ne doit rester visible.
                // Les puces ont déjà été retirées par le moteur de listes avant cet appel.
                value = value.replace(/\*{1,3}/g, '');
                value = value.replace(/(?<![A-Za-zÀ-ÿ])_{1,2}(?![A-Za-zÀ-ÿ])/g, '');
                return value;
            };

            return blocks.map(block => {
                const lines = block.split("\n");
                const heading = lines[0].match(/^(#{1,3})\s+(.+)$/);
                if (heading && lines.length === 1) {
                    const level = heading[1].length;
                    const sizes = {1:'text-xl',2:'text-lg',3:'text-base'};
                    return `<h${level} class="${sizes[level]} font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100">${formatInline(heading[2])}</h${level}>`;
                }

                const isList = lines.every(line => /^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line));
                if (isList) {
                    const ordered = lines.every(line => /^\s*\d+[.)]\s+/.test(line));
                    const tag = ordered ? 'ol' : 'ul';
                    const cls = ordered ? 'list-decimal' : 'list-disc';
                    const items = lines.map(line => line.replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/, '')).map(formatInline);
                    return `<${tag} class="${cls} pl-6 space-y-1 my-2">${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
                }

                // Gère aussi les listes mélangées avec du texte sur des lignes séparées.
                if (lines.some(line => /^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line))) {
                    let html = '';
                    let listTag = null;
                    let items = [];
                    const flush = () => {
                        if (!items.length) return;
                        const tag = listTag || 'ul';
                        const cls = tag === 'ol' ? 'list-decimal' : 'list-disc';
                        html += `<${tag} class="${cls} pl-6 space-y-1 my-2">${items.map(item => `<li>${formatInline(item)}</li>`).join('')}</${tag}>`;
                        items = []; listTag = null;
                    };
                    lines.forEach(line => {
                        const m = line.match(/^\s*([-*+]\s+|\d+[.)]\s+)(.+)$/);
                        if (m) {
                            const nextTag = /^\d/.test(m[1]) ? 'ol' : 'ul';
                            if (listTag && listTag !== nextTag) flush();
                            listTag = nextTag; items.push(m[2]);
                        } else {
                            flush();
                            html += `<p class="mb-2">${formatInline(line)}</p>`;
                        }
                    });
                    flush();
                    return html;
                }

                return `<p class="mb-3 leading-7">${formatInline(lines.join('<br>'))}</p>`;
            }).join('');
        }


        document.addEventListener("click", (event) => {
            const modal = event.target.closest(".app-modal");
            if (modal && event.target === modal) modal.classList.add("hidden");
        });

        function closeMobileSidebar() {
            const sidebar = document.getElementById("sidebar-nav");
            const backdrop = document.getElementById("sidebar-backdrop");
            if (window.innerWidth >= 768) return;
            sidebar?.classList.add("-translate-x-full");
            backdrop?.classList.add("hidden");
        }

        function syncMobileSidebarBackdrop() {
            const sidebar = document.getElementById("sidebar-nav");
            const backdrop = document.getElementById("sidebar-backdrop");
            if (!sidebar || !backdrop || window.innerWidth >= 768) {
                backdrop?.classList.add("hidden");
                return;
            }
            backdrop.classList.toggle("hidden", sidebar.classList.contains("-translate-x-full"));
        }

        document.getElementById("sidebar-backdrop")?.addEventListener("click", closeMobileSidebar);

        document.addEventListener("click", (event) => {
            if (window.innerWidth >= 768) return;
            const sidebar = document.getElementById("sidebar-nav");
            const toggle = document.getElementById("btn-toggle-sidebar");
            if (!sidebar || sidebar.classList.contains("-translate-x-full")) return;
            if (sidebar.contains(event.target) || toggle?.contains(event.target)) return;
            closeMobileSidebar();
        });

        window.addEventListener("resize", syncMobileSidebarBackdrop);

        function initApplicationMenu() {
            if (window.EBibliaCommon?.bindNavigation) window.EBibliaCommon.bindNavigation();
        }

        function updateGeminiStatus() {
            const status = document.getElementById("gemini-status");
            const input = document.getElementById("gemini-api-key");
            const model = document.getElementById("gemini-model");
            const config = getGeminiConfig();
            if (!status) return;
            status.textContent = config.apiKey ? "Configuré" : "Non configuré";
            status.className = config.apiKey
                ? "text-[10px] font-bold text-green-600"
                : "text-[10px] font-bold text-gray-500";
            if (model && config.model) model.value = config.model;
            if (input && config.apiKey) input.placeholder = "Clé enregistrée — saisir une nouvelle clé pour remplacer";
        }

        // Lance l'écran de démarrage après le chargement du DOM.
        // Durée totale : 4 secondes, puis suppression définitive de l'écran.
        function startEbibliaSplash() {
            const splash = document.getElementById("ebiblia-splash");
            if (!splash || splash.dataset.started === "1") return;
            splash.dataset.started = "1";

            // Force un reflow pour garantir que l'état initial est peint avant l'animation.
            void splash.offsetWidth;
            splash.classList.add("is-running");

            window.setTimeout(() => {
                splash.classList.add("is-finished");
                window.setTimeout(() => splash.remove(), 150);
            }, 4000);
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", startEbibliaSplash, { once: true });
        } else {
            startEbibliaSplash();
        }

        // UI Event Listeners Initialization
        function initEventListeners() {
            // Dark Mode Toggle
            document.getElementById("btn-theme-toggle").addEventListener("click", () => {
                document.documentElement.classList.toggle("dark");
                const icon = document.getElementById("theme-icon");
                if (document.documentElement.classList.contains("dark")) {
                    icon.className = "fa-solid fa-sun text-yellow-400 text-lg";
                } else {
                    icon.className = "fa-solid fa-moon text-lg";
                }
            });

            // Sidebar Toggle
            document.getElementById("btn-toggle-sidebar").addEventListener("click", (event) => {
                event.stopPropagation();
                const sidebar = document.getElementById("sidebar-nav");
                sidebar.classList.toggle("-translate-x-full");
                syncMobileSidebarBackdrop();
            });

            // View Mode Buttons
            const modeSingle = document.getElementById("mode-single");
            const modeSplit = document.getElementById("mode-split");
            const modeInterlinear = document.getElementById("mode-interlinear");
            const containerV2 = document.getElementById("container-version-2");
            const btnSync = document.getElementById("btn-sync-scroll");

            function setActiveModeButton(btn) {
                [modeSingle, modeSplit, modeInterlinear].forEach(b => {
                    b.classList.remove("bg-white", "dark:bg-gray-700", "text-amber-600", "dark:text-amber-400", "shadow-sm");
                    b.classList.add("text-gray-600", "dark:text-gray-400");
                });
                btn.classList.add("bg-white", "dark:bg-gray-700", "text-amber-600", "dark:text-amber-400", "shadow-sm");
            }

            modeSingle.addEventListener("click", () => {
                state.viewMode = 'single';
                setActiveModeButton(modeSingle);
                containerV2.classList.add("hidden");
                btnSync.classList.add("hidden");
                document.getElementById("view-single").classList.remove("hidden");
                document.getElementById("view-split").classList.add("hidden");
                document.getElementById("view-interlinear").classList.add("hidden");
                renderBibleText();
            });

            modeSplit.addEventListener("click", () => {
                state.viewMode = 'split';
                setActiveModeButton(modeSplit);
                containerV2.classList.remove("hidden");
                btnSync.classList.remove("hidden");
                document.getElementById("view-single").classList.add("hidden");
                document.getElementById("view-split").classList.remove("hidden");
                document.getElementById("view-interlinear").classList.add("hidden");
                renderBibleText();
            });

            modeInterlinear.addEventListener("click", () => {
                state.viewMode = 'interlinear';
                setActiveModeButton(modeInterlinear);
                containerV2.classList.remove("hidden");
                btnSync.classList.add("hidden");
                document.getElementById("view-single").classList.add("hidden");
                document.getElementById("view-split").classList.add("hidden");
                document.getElementById("view-interlinear").classList.remove("hidden");
                renderBibleText();
            });

            // Synchronized Scroll feature in Split View
            const colLeft = document.getElementById("col-left");
            const colRight = document.getElementById("col-right");
            let isSyncingLeft = false;
            let isSyncingRight = false;

            colLeft.addEventListener("scroll", () => {
                if (state.syncScroll && !isSyncingLeft) {
                    isSyncingRight = true;
                    colRight.scrollTop = colLeft.scrollTop;
                }
                isSyncingLeft = false;
            });

            colRight.addEventListener("scroll", () => {
                if (state.syncScroll && !isSyncingRight) {
                    isSyncingLeft = true;
                    colLeft.scrollTop = colRight.scrollTop;
                }
                isSyncingRight = false;
            });

            // Book & Chapter Selectors
            document.getElementById("select-book").addEventListener("change", (e) => {
                clearVerseSelection();
                state.currentBook = e.target.value;
                state.currentChapter = 1;
                updateChapterSelector();
                renderBibleText();
                updateSidebarActiveState();
            });

            document.getElementById("select-book-mobile").addEventListener("change", (e) => {
                state.currentBook = e.target.value;
                state.currentChapter = 1;
                updateChapterSelector();
                renderBibleText();
                updateSidebarActiveState();
            });

            document.getElementById("select-chapter").addEventListener("change", (e) => {
                clearVerseSelection();
                state.currentChapter = parseInt(e.target.value);
                renderBibleText();
            });

            document.getElementById("select-chapter-mobile").addEventListener("change", (e) => {
                state.currentChapter = parseInt(e.target.value);
                renderBibleText();
            });

            // Version Selectors
            document.getElementById("select-version-1").addEventListener("change", (e) => {
                state.version1 = e.target.value;
                renderBibleText();
            });

            document.getElementById("select-version-2").addEventListener("change", (e) => {
                state.version2 = e.target.value;
                renderBibleText();
            });

            // Font Resizing
            document.getElementById("btn-font-inc").addEventListener("click", () => {
                if (state.fontSize < 24) {
                    state.fontSize += 1;
                    renderBibleText();
                }
            });

            document.getElementById("btn-font-dec").addEventListener("click", () => {
                if (state.fontSize > 12) {
                    state.fontSize -= 1;
                    renderBibleText();
                }
            });

            // Chapter Navigation
            document.getElementById("btn-prev-chapter").addEventListener("click", () => {
                if (state.currentChapter > 1) {
                    state.currentChapter -= 1;
                    document.getElementById("select-chapter").value = state.currentChapter;
                    renderBibleText();
                }
            });

            document.getElementById("btn-next-chapter").addEventListener("click", () => {
                const book = BIBLE_DATA.books.find(b => b.id === state.currentBook);
                if (book && state.currentChapter < book.chapters) {
                    state.currentChapter += 1;
                    document.getElementById("select-chapter").value = state.currentChapter;
                    renderBibleText();
                }
            });

            // Search Modal Events
            document.getElementById("btn-open-search").addEventListener("click", () => {
                document.getElementById("modal-search").classList.remove("hidden");
                document.getElementById("input-search").focus();
            });

            document.getElementById("btn-execute-search").addEventListener("click", () => {
                executeSearch(document.getElementById("input-search").value);
            });

            document.getElementById("input-search").addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    executeSearch(e.target.value);
                }
            });

            // Import Modal Events
            document.getElementById("btn-open-import").addEventListener("click", () => {
                document.getElementById("modal-import").classList.remove("hidden");
            });

            document.getElementById("btn-process-import").addEventListener("click", handleImportJSON);

            // Bookmarks Drawer Event
            document.getElementById("btn-open-bookmarks").addEventListener("click", () => {
                document.getElementById("modal-bookmarks").classList.remove("hidden");
            });


            // Application menu / feature actions
            document.getElementById("btn-close-sidebar")?.addEventListener("click", () => {
                closeMobileSidebar();
            });

            document.getElementById("btn-save-verse-note")?.addEventListener("click", saveVerseNote);

            document.getElementById("btn-save-cult")?.addEventListener("click", () => {
                const theme = document.getElementById("cult-theme").value.trim();
                if (!theme) return showToast("Indiquez au moins le thème du culte.");
                appData.cults.push({
                    date: document.getElementById("cult-date").value,
                    theme,
                    preacher: document.getElementById("cult-preacher").value.trim(),
                    verses: document.getElementById("cult-verses").value.trim(),
                    notes: document.getElementById("cult-notes").value.trim(),
                    createdAt: new Date().toISOString()
                });
                saveAppData();
                ["cult-theme","cult-preacher","cult-verses","cult-notes"].forEach(id => document.getElementById(id).value = "");
                renderCults();
                showToast("Culte enregistré.");
            });

            document.getElementById("btn-save-notebook")?.addEventListener("click", () => {
                const title = document.getElementById("notebook-title").value.trim();
                const content = document.getElementById("notebook-content").value.trim();
                if (!content) return showToast("Écrivez quelque chose dans le bloc-notes.");
                appData.notebook.push({title, content, createdAt: new Date().toISOString()});
                saveAppData();
                document.getElementById("notebook-title").value = "";
                document.getElementById("notebook-content").value = "";
                renderNotebook();
                showToast("Note ajoutée au bloc-notes.");
            });

            document.getElementById("btn-ai-submit")?.addEventListener("click", runGeminiAnalysis);

            document.getElementById("settings-theme-toggle")?.addEventListener("click", () => {
                document.getElementById("btn-theme-toggle").click();
            });
            document.getElementById("settings-font-inc")?.addEventListener("click", () => {
                document.getElementById("btn-font-inc").click();
            });
            document.getElementById("settings-font-dec")?.addEventListener("click", () => {
                document.getElementById("btn-font-dec").click();
            });
            document.getElementById("btn-reset-local-data")?.addEventListener("click", () => {
                if (!confirm("Voulez-vous vraiment supprimer les favoris, marquages, notes, cultes et bloc-notes de cet appareil ?")) return;
                localStorage.removeItem("ebiblia_bookmarks");
                localStorage.removeItem("ebiblia_marks");
                localStorage.removeItem("ebiblia_notes");
                localStorage.removeItem("ebiblia_cults");
                localStorage.removeItem("ebiblia_notebook");
                state.bookmarks = [];
                appData.marks = [];
                appData.verseNotes = [];
                appData.cults = [];
                appData.notebook = [];
                renderBookmarks();
                renderMarks();
                renderVerseNotes();
                renderCults();
                renderNotebook();
                renderBibleText();
                showToast("Données locales réinitialisées.");
            });


            document.getElementById("btn-share-selected")?.addEventListener("click", shareSelectedVerses);
            document.getElementById("btn-add-selected-note")?.addEventListener("click", addSelectedToVerseNotes);
            document.getElementById("btn-add-selected-cult")?.addEventListener("click", addSelectedToCult);
            document.getElementById("btn-clear-selected")?.addEventListener("click", clearVerseSelection);

            // Close Modals
            document.querySelectorAll(".btn-close-modal").forEach(btn => {
                btn.addEventListener("click", closeAllModals);
            });

            // Filter Testament Buttons
            const btnAll = document.getElementById("filter-all");
            const btnOt = document.getElementById("filter-ot");
            const btnNt = document.getElementById("filter-nt");

            function updateFilterStyle(activeBtn) {
                [btnAll, btnOt, btnNt].forEach(b => {
                    b.className = "px-2 py-0.5 text-xs font-semibold rounded bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-amber-100";
                });
                activeBtn.className = "px-2 py-0.5 text-xs font-semibold rounded bg-amber-600 text-white";
            }

            btnAll?.addEventListener("click", () => {
                state.selectedTestament = "ALL";
                if (btnAll) updateFilterStyle(btnAll);
                initBookSelectors();
            });

            btnOt?.addEventListener("click", () => {
                state.selectedTestament = "OT";
                updateFilterStyle(btnOt);
                initBookSelectors();
            });

            btnNt?.addEventListener("click", () => {
                state.selectedTestament = "NT";
                updateFilterStyle(btnNt);
                initBookSelectors();
            });
        }

        // Custom Toast Notification System
        function showToast(message) {
            const container = document.getElementById("toast-container");
            const toast = document.createElement("div");
            toast.className = "bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-3 rounded-lg shadow-lg text-xs font-medium flex items-center space-x-2 transition transform translate-y-2 opacity-0";
            toast.innerHTML = `<i class="fa-solid fa-circle-info text-amber-500"></i><span>${message}</span>`;
            
            if (!container) return;
            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove("translate-y-2", "opacity-0");
            }, 10);

            setTimeout(() => {
                toast.classList.add("opacity-0");
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }


/* E-BIBLIA 3.0 — Public application API for page modules */
window.EBiblia = window.EBiblia || {};
Object.assign(window.EBiblia, {
    BIBLE_DATA,
    LOCAL_BIBLE_VERSIONS,
    FULL_BIBLE_BOOKS,
    state,
    appData,
    renderBookmarks,
    renderVerseNotes,
    saveVerseNote,
    renderMarks,
    renderCults,
    renderNotebook,
    saveAppData,
    handleImportJSON,
    runGeminiAnalysis,
    updateGeminiStatus,
    executeSearch,
    showToast,
    getVerseText,
    toggleBookmark,
    toggleMark,
    shareSelectedVerses,
    addSelectedToVerseNotes,
    addSelectedToCult,
    clearVerseSelection,
    renderBibleText
});
