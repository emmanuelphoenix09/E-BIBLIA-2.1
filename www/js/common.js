/* E-BIBLIA 3.0 — Navigation, thème et composants communs */
(function () {
  const THEME_KEY = "ebiblia_theme";
  const FONT_KEY = "ebiblia_font_size";
  const routes = {
    home: "accueil.html",
    reader: "lecture.html",
    favorites: "favoris.html",
    "verse-notes": "notes.html",
    marks: "passages.html",
    notebook: "bloc-notes.html",
    cults: "cultes.html",
    search: "recherche.html",
    plans: "plans.html",
    import: "importer.html",
    ai: "ia.html",
    settings: "parametres.html",
    about: "apropos.html",
    menu: "menu.html",
    compare: "comparer-versions.html"
  };

  function applyTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    document.documentElement.classList.toggle("dark", saved !== "light");
  }

  function injectAppIcon() {
    if (document.querySelector('link[rel="icon"]')) return;
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = "./assets/icon.png";
    document.head?.appendChild(icon);
  }


  function toggleTheme() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    return dark;
  }

  function navigate(page) {
    if (routes[page]) window.location.href = "./" + routes[page];
  }

  function applyFontSize() {
    const saved = Number(localStorage.getItem(FONT_KEY));
    if (Number.isFinite(saved) && saved >= 12 && saved <= 24) {
      document.documentElement.style.setProperty("--ebiblia-font-size", saved + "px");
    }
  }

  function changeFontSize(delta) {
    const current = Number(localStorage.getItem(FONT_KEY)) || 16;
    const next = Math.min(24, Math.max(12, current + delta));
    localStorage.setItem(FONT_KEY, String(next));
    document.documentElement.style.setProperty("--ebiblia-font-size", next + "px");
    if (window.EBiblia?.state) window.EBiblia.state.fontSize = next;
    return next;
  }

  function injectBottomNavigation() {
    if (document.body?.dataset?.page === "ia" || document.getElementById("ebiblia-bottom-nav")) return;

    const page = document.body?.dataset?.page || "";
    const nav = document.createElement("nav");
    nav.id = "ebiblia-bottom-nav";
    nav.className = "ebiblia-bottom-nav";
    nav.setAttribute("aria-label", "Navigation principale");

    const items = [
      ["home", "fa-house", "Accueil", "accueil.html"],
      ["reader", "fa-book-open", "Bible", "lecture.html"],
      ["plans", "fa-list-check", "Plans", "plans.html"],
      ["ai", "fa-sparkles", "Léona", "ia.html"]
    ];

    items.forEach(([key, icon, label, href]) => {
      const a = document.createElement("a");
      a.href = "./" + href;
      a.innerHTML = '<i class="fa-solid ' + icon + '" aria-hidden="true"></i><span>' + label + '</span>';
      if (key === page) a.classList.add("is-active");
      nav.appendChild(a);
    });

    const menu = document.createElement("button");
    menu.type = "button";
    menu.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i><span>Menu</span>';
    menu.classList.toggle("is-active", page === "menu");
    menu.addEventListener("click", () => navigate("menu"));
    nav.appendChild(menu);
    document.body.appendChild(nav);
  }

  function bindNavigation() {
    document.querySelectorAll("[data-app-action]").forEach(btn => {
      if (btn.dataset.ebibliaNavBound) return;
      btn.dataset.ebibliaNavBound = "1";
      btn.addEventListener("click", () => navigate(btn.dataset.appAction));
    });
  }

  /* E-BIBLIA — activation du mode hors connexion */
  function registerOfflineMode() {
    if (!("serviceWorker" in navigator)) return;
    const isLocalFile = window.location.protocol === "file:";
    if (isLocalFile) return;
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
      .then(() => console.info("E-BIBLIA : mode hors connexion activé"))
      .catch(error => console.warn("E-BIBLIA : service worker indisponible", error));
  }

  function updateOfflineStatus() {
    const offline = navigator.onLine === false;
    document.documentElement.classList.toggle("eb-offline", offline);
  }

  window.EBibliaCommon = {
    routes, applyTheme, toggleTheme, navigate, applyFontSize,
    changeFontSize, bindNavigation, injectBottomNavigation, registerOfflineMode, updateOfflineStatus, injectAppIcon
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindNavigation();
      injectBottomNavigation();
      registerOfflineMode();
      updateOfflineStatus();
    });
  } else {
    bindNavigation();
    injectBottomNavigation();
    registerOfflineMode();
    updateOfflineStatus();
  }

  window.addEventListener("online", updateOfflineStatus);
  window.addEventListener("offline", updateOfflineStatus);

  applyTheme();
  applyFontSize();
  injectAppIcon();
})();

