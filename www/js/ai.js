/* E-BIBLIA 3.0 — AI boundary */
(function () {
  function api() {
    if (!window.EBiblia) throw new Error("Le moteur E-BIBLIA n'est pas chargé.");
    return apiRef();
  }
  function apiRef() { return window.EBiblia; }
  window.EBibliaAI = {
    run: (...args) => api().runGeminiAnalysis(...args),
    status: (...args) => api().updateGeminiStatus(...args)
  };
})();