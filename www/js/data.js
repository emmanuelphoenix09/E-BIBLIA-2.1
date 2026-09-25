/* E-BIBLIA 3.0 — Data/Application state boundary */
(function () {
  function api() {
    if (!window.EBiblia) throw new Error("Le moteur E-BIBLIA n'est pas chargé.");
    return window.EBiblia;
  }
  window.EBibliaData = {
    get appData() { return api().appData; },
    saveAppData() { return api().saveAppData(); },
    renderVerseNotes() { return api().renderVerseNotes(); },
    saveVerseNote() { return api().saveVerseNote(); },
    renderMarks() { return api().renderMarks(); },
    renderCults() { return api().renderCults(); },
    renderNotebook() { return api().renderNotebook(); },
    toggleMark: (...args) => api().toggleMark(...args)
  };
})();