/* E-BIBLIA 3.0 — Données locales et fonctionnalités utilisateur */
(function () {
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
    return window.EBiblia?.BIBLE_DATA?.versions?.[code]?.name || code;
  }

  function verseLabel(item) {
    const book = window.EBiblia?.BIBLE_DATA?.books?.find(b => b.id === item.book)?.name || item.book;
    return `${book} ${item.chapter}:${item.verse}`;
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  }

  function isVerseMarked(book, chapter, verse, version) {
    return appData.marks.some(m => m.book === book && Number(m.chapter) === Number(chapter) && Number(m.verse) === Number(verse) && m.version === version);
  }

  function toggleMark(book, chapter, verse, version) {
    const idx = appData.marks.findIndex(m => m.book === book && Number(m.chapter) === Number(chapter) && Number(m.verse) === Number(verse) && m.version === version);
    if (idx >= 0) {
      appData.marks.splice(idx, 1);
      window.EBiblia?.showToast("Marquage retiré.");
    } else {
      appData.marks.push({ book, chapter, verse, version, text: window.EBiblia?.getVerseText(version, book, chapter, verse), createdAt: new Date().toISOString() });
      window.EBiblia?.showToast("Passage marqué dans cette traduction.");
    }
    saveAppData();
    window.EBiblia?.renderBibleText();
    renderMarks();
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
            if (!note) return window.EBiblia?.showToast("Écrivez une note avant d'enregistrer.");
            appData.verseNotes.push({
                book: window.EBiblia?.state.currentBook,
                chapter: window.EBiblia?.state.currentChapter,
                verse: window.EBiblia?.state._selectedVerse || 1,
                version: window.EBiblia?.state.version1,
                note,
                text: window.EBiblia?.getVerseText(window.EBiblia?.state.version1, window.EBiblia?.state.currentBook, window.EBiblia?.state.currentChapter, window.EBiblia?.state._selectedVerse || 1),
                createdAt: new Date().toISOString()
            });
            saveAppData();
            document.getElementById("verse-note-input").value = "";
            renderVerseNotes();
            window.EBiblia?.showToast("Note de verset enregistrée.");
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
                window.EBiblia?.renderBibleText();
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

  window.EBibliaData = { appData, saveAppData, versionName, verseLabel, isVerseMarked, toggleMark, renderVerseNotes, saveVerseNote, renderMarks, renderCults, renderNotebook };
  window.EBiblia = window.EBiblia || {};
  Object.assign(window.EBiblia, window.EBibliaData);
})();
