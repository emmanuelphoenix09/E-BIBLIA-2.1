/*
 * E-BIBLIA 3.0 — Fonctions communes
 * ------------------------------------------------------------
 * Navigation, thème sombre et préférences communes à toutes les pages.
 * Pour modifier les liens entre pages : modifiez l'objet routes.
 * Pour modifier le thème ou la taille du texte : utilisez ce fichier.
 */
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
  function injectBottomNavigation() {\n    if (document.body?.dataset?.page === "ia" || document.getElementById("ebiblia-bottom-nav")) return;\n    const page = document.body?.dataset?.page || "reader";\n    const nav = document.createElement("nav");\n    nav.id = "ebiblia-bottom-nav";\n    nav.className = "ebiblia-bottom-nav";\n    nav.setAttribute("aria-label", "Navigation principale");\n    const items = [\n      ["reader", "fa-house", "Accueil", "lecture.html"],\n      ["reader", "fa-book-open", "Bible", "lecture.html"],\n      ["plans", "fa-list-check", "Plans", "bloc-notes.html"],\n      ["ai", "fa-sparkles", "Léona", "ia.html"]\n    ];\n    items.forEach(([key, icon, label, href]) => {\n      const a = document.createElement("a");\n      a.href = "./" + href;\n      a.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${label}</span>`;\n      if ((key === "reader" && page === "reader") || (key === "ai" && page === "ia")) a.classList.add("is-active");\n      nav.appendChild(a);\n    });\n    const menu = document.createElement("button");\n    menu.type = "button";\n    menu.innerHTML = `<i class="fa-solid fa-bars" aria-hidden="true"></i><span>Menu</span>`;\n    menu.addEventListener("click", () => {\n      const sidebar = document.getElementById("sidebar-nav");\n      if (sidebar) sidebar.classList.toggle("-translate-x-full");\n      else navigate("settings");\n    });\n    nav.appendChild(menu);\n    document.body.appendChild(nav);\n  }\n\n  function bindNavigation() {
    document.querySelectorAll("[data-app-action]").forEach(btn => {
      if (btn.dataset.ebibliaNavBound) return;
      btn.dataset.ebibliaNavBound = "1";
      btn.addEventListener("click", () => navigate(btn.dataset.appAction));
    });
  }
  window.EBibliaCommon = { routes, applyTheme, toggleTheme, navigate, applyFontSize, changeFontSize, bindNavigation, injectBottomNavigation };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { bindNavigation(); injectBottomNavigation(); }); else bindNavigation();
  applyTheme();
  applyFontSize();
})();
