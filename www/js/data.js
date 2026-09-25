/* E-BIBLIA 3.0 — Données locales et fonctionnalités utilisateur */
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



// API publique du module Data
window.EBibliaData = window.EBibliaData || {};
Object.assign(window.EBibliaData, { appData, saveAppData, versionName, verseLabel, isVerseMarked, toggleMark });
