/*
 * E-BIBLIA 3.0 — Fonctions de lecture et sélection
 * ------------------------------------------------------------
 * Ce fichier gère la sélection de versets et les actions liées
 * aux versets sélectionnés.
 *
 * Pour modifier les actions "Favori", "Note", "Culte", "IA", etc. :
 * recherchez les fonctions bookmarkSelectedVerses(), addSelectedToVerseNotes(),
 * addSelectedToCult() et openAIForSelection().
 */
(function () {
function verseSelectionKey(book, chapter, verse, version) {
            return `${version}|${book}|${chapter}|${verse}`;
        }

        function isVerseSelected(book, chapter, verse, version) {
            const key = verseSelectionKey(book, chapter, verse, version);
            return window.EBiblia.state.selectedVerses.some(x => verseSelectionKey(x.book, x.chapter, x.verse, x.version) === key);
        }

        function toggleVerseSelection(book, chapter, verse, version) {
            const key = verseSelectionKey(book, chapter, verse, version);
            const idx = window.EBiblia.state.selectedVerses.findIndex(x => verseSelectionKey(x.book, x.chapter, x.verse, x.version) === key);
            if (idx >= 0) {
                window.EBiblia.state.selectedVerses.splice(idx, 1);
            } else {
                window.EBiblia.state.selectedVerses.push({
                    book, chapter, verse, version,
                    text: window.EBiblia.getVerseText(version, book, chapter, verse)
                });
            }
            updateVerseSelectionToolbar();
            window.EBiblia.renderBibleText();
            setTimeout(renderUnifiedSelectionActions, 0);
        }

        function clearVerseSelection() {
            window.EBiblia.state.selectedVerses = [];
            updateVerseSelectionToolbar();
            window.EBiblia.renderBibleText();
        }

        function getSelectedVersesText() {
            return [...window.EBiblia.state.selectedVerses]
                .sort((a,b) => Number(a.verse) - Number(b.verse))
                .map(v => {
                    const bookName = window.EBiblia.BIBLE_DATA.books.find(b => b.id === v.book)?.name || v.book;
                    return `${bookName} ${v.chapter}:${v.verse} (${window.EBibliaData.versionName(v.version)})\n${v.text}`;
                }).join("\n\n");
        }
        function updateInlineVerseActions() {
            renderUnifiedSelectionActions();
        }

        function updateVerseSelectionToolbar() {
            renderUnifiedSelectionActions();
        }
        async function shareSelectedVerses() {
            if (!window.EBiblia.state.selectedVerses.length) return;
            const bookName = window.EBiblia.BIBLE_DATA.books.find(b => b.id === window.EBiblia.state.selectedVerses[0].book)?.name || window.EBiblia.state.selectedVerses[0].book;
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
                window.EBiblia.showToast("Versets copiés. Vous pouvez les coller dans l'application de partage de votre choix.");
            } catch (e) {
                window.prompt("Copiez ces versets :", text);
            }
        }

        function addSelectedToVerseNotes() {
            if (!window.EBiblia.state.selectedVerses.length) return;
            window.EBibliaData.appData.verseNotes.push({
                book: window.EBiblia.state.selectedVerses[0].book,
                chapter: window.EBiblia.state.selectedVerses[0].chapter,
                verse: window.EBiblia.state.selectedVerses.map(v => v.verse).join(","),
                version: window.EBiblia.state.selectedVerses[0].version,
                note: "",
                text: getSelectedVersesText(),
                selectedVerses: window.EBiblia.state.selectedVerses.map(v => v.verse),
                createdAt: new Date().toISOString()
            });
            window.EBibliaData.saveAppData();
            window.EBibliaData.renderVerseNotes();
            window.EBiblia.openAppModal("modal-verse-notes");
            window.EBiblia.showToast("Versets ajoutés aux notes.");
        }

        function addSelectedToCult() {
            if (!window.EBiblia.state.selectedVerses.length) return;
            const refs = [...window.EBiblia.state.selectedVerses]
                .sort((a,b) => Number(a.verse) - Number(b.verse))
                .map(v => {
                    const n = window.EBiblia.BIBLE_DATA.books.find(b => b.id === v.book)?.name || v.book;
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
            window.EBiblia.openAppModal("modal-cults");
            window.EBiblia.showToast("Versets ajoutés au culte. Complétez les informations puis enregistrez.");
        }

        // One compact action group for the whole current selection.
        function renderUnifiedSelectionActions() {
            document.querySelectorAll(".verse-inline-selection-actions").forEach(el => el.remove());

            if (!window.EBiblia.state.selectedVerses.length || window.EBiblia.state.viewMode !== "single") return;

            const selected = [...window.EBiblia.state.selectedVerses]
                .filter(v => v.book === window.EBiblia.state.currentBook && Number(v.chapter) === Number(window.EBiblia.state.currentChapter) && v.version === window.EBiblia.state.version1)
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
            if (!window.EBiblia.state.selectedVerses.length) return;
            window.EBiblia.state.selectedVerses.forEach(v => {
                if (!window.EBiblia.isVerseBookmarked(v.book, v.chapter, v.verse, v.version)) {
                    window.EBiblia.state.bookmarks.push(v);
                }
            });
            localStorage.setItem("ebiblia_bookmarks", JSON.stringify(window.EBiblia.state.bookmarks));
            window.EBiblia.renderBookmarks();
            window.EBiblia.showToast("Sélection enregistrée dans les favoris.");
        }

        function highlightSelectedVerses() {
            if (!window.EBiblia.state.selectedVerses.length) return;
            window.EBiblia.state.selectedVerses.forEach(v => {
                const existing = window.EBibliaData.appData.marks.findIndex(m =>
                    m.book === v.book && m.chapter === v.chapter && m.verse === v.verse && m.version === v.version
                );
                if (existing < 0) {
                    window.EBibliaData.appData.marks.push({
                        book: v.book, chapter: v.chapter, verse: v.verse,
                        version: v.version, text: v.text, createdAt: new Date().toISOString()
                    });
                }
            });
            window.EBibliaData.saveAppData();
            window.EBibliaData.renderMarks();
            window.EBiblia.renderBibleText();
            window.EBiblia.showToast("Sélection surlignée.");
        }

        async function copySelectedVerses() {
            if (!window.EBiblia.state.selectedVerses.length) return;
            const text = getSelectedVersesText();
            try {
                await navigator.clipboard.writeText(text);
                window.EBiblia.showToast("Sélection copiée.");
            } catch (e) {
                window.prompt("Copiez les versets :", text);
            }
        }

        async function openAIForSelection() {
            if (!window.EBiblia.state.selectedVerses.length) return;
            const reference = getSelectedVersesText();
            const modalReference = document.getElementById("ai-modal-reference");
            const questionInput = document.getElementById("ai-question");
            const result = document.getElementById("ai-result");
            if (modalReference) modalReference.textContent = reference;
            if (questionInput) questionInput.value = "";
            if (result) result.innerHTML = `<div class="flex items-center justify-center gap-2 text-gray-500 py-8"><i class="fa-solid fa-spinner fa-spin"></i> L'IA étudie le passage dans son contexte…</div>`;
            window.EBiblia.openAppModal("modal-ai");
            await window.EBiblia.runGeminiAnalysis(true);
            setTimeout(() => questionInput?.focus(), 50);
        }

        
  window.EBibliaReader = {
    render: (...args) => window.EBiblia.renderBibleText(...args),
    getVerseText: (...args) => window.EBiblia.getVerseText(...args),
    verseSelectionKey,
    isVerseSelected,
    toggleVerseSelection,
    clearVerseSelection,
    getSelectedVersesText,
    updateInlineVerseActions,
    updateVerseSelectionToolbar,
    shareSelectedVerses,
    addSelectedToVerseNotes,
    addSelectedToCult,
    renderUnifiedSelectionActions,
    bookmarkSelectedVerses,
    highlightSelectedVerses,
    copySelectedVerses,
    openAIForSelection
  };
  window.EBiblia = window.EBiblia || {};
  Object.assign(window.EBiblia, window.EBibliaReader);
})();