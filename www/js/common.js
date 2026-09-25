/* E-BIBLIA 3.0 — Shared UI utilities */
(function () {
  const THEME_KEY = "ebiblia_theme";
  const FONT_KEY = "ebiblia_font_size";
  const routes = {
    reader: "lecture.html", favorites: "favoris.html", "verse-notes": "notes.html",
    marks: "passages.html", notebook: "bloc-notes.html", cults: "cultes.html",
    search: "recherche.html", import: "importer.html", ai: "ia.html",
    settings: "parametres.html", about: "apropos.html"
  };
  function applyTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const dark = saved === "dark" || (saved !== "light" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", !!dark);
  }
  function toggleTheme() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    return dark;
  }
  function navigate(page) { if (routes[page]) window.location.href = "./" + routes[page]; }
  function applyFontSize() {
    const saved = Number(localStorage.getItem(FONT_KEY));
    if (Number.isFinite(saved) && saved >= 12 && saved <= 24) document.documentElement.style.setProperty("--ebiblia-font-size", saved + "px");
  }
  function changeFontSize(delta) {
    const current = Number(localStorage.getItem(FONT_KEY)) || 16;
    const next = Math.min(24, Math.max(12, current + delta));
    localStorage.setItem(FONT_KEY, String(next));
    document.documentElement.style.setProperty("--ebiblia-font-size", next + "px");
    if (window.EBiblia?.state) window.EBiblia.state.fontSize = next;
    return next;
  }
  window.EBibliaCommon = { routes, applyTheme, toggleTheme, navigate, applyFontSize, changeFontSize };
  applyTheme();
  applyFontSize();
})();
