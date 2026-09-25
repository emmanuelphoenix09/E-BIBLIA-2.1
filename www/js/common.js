/* E-BIBLIA 3.0 — Shared UI utilities */
(function () {
  const KEY = "ebiblia_theme";
  function applyTheme() {
    const saved = localStorage.getItem(KEY);
    const dark = saved === "dark" || (saved !== "light" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  }
  function toggleTheme() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(KEY, dark ? "dark" : "light");
  }
  window.EBibliaCommon = { applyTheme, toggleTheme };
  applyTheme();
})();