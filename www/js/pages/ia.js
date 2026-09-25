/*
 * E-BIBLIA 3.0 — Contrôleur de la page Léona
 * ------------------------------------------------------------
 * Ce fichier relie uniquement les boutons de ia.html au moteur
 * IA situé dans js/ai.js.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Met à jour l'état/configuration de l'assistant lorsqu'il est disponible.
  window.EBiblia?.updateGeminiStatus();

  // Lance une analyse lorsque l'utilisateur clique sur le bouton.
  document
    .getElementById("btn-ai-submit")
    ?.addEventListener("click", () => {
      window.EBiblia?.runGeminiAnalysis();
    });
});
