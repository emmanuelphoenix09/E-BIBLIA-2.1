/* E-BIBLIA 3.0 — Reader/verse interaction boundary */
(function () {
  function api() {
    if (!window.EBiblia) throw new Error("Le moteur E-BIBLIA n'est pas chargé.");
    return window.EBiblia;
  }
  window.EBibliaReader = {
    render: (...args) => api().renderBibleText(...args),
    getVerseText: (...args) => api().getVerseText(...args),
    toggleBookmark: (...args) => api().toggleBookmark(...args),
    toggleMark: (...args) => api().toggleMark(...args),
    shareSelectedVerses: (...args) => api().shareSelectedVerses(...args),
    addSelectedToVerseNotes: (...args) => api().addSelectedToVerseNotes(...args),
    addSelectedToCult: (...args) => api().addSelectedToCult(...args),
    clearVerseSelection: (...args) => api().clearVerseSelection(...args)
  };
})();