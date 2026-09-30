// ── ТИМиМО статический сайт: тёмная тема + мобильное меню ──
(function () {
  "use strict";

  var root = document.documentElement;

  // ── Тема (логика как в React-хуке useDarkMode) ──
  function getInitialDark() {
    var saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  var dark = getInitialDark();

  function applyTheme() {
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // В светлой теме показываем иконку луны, в тёмной — солнце
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      var moon = btn.querySelector(".icon-moon");
      var sun = btn.querySelector(".icon-sun");
      if (moon) moon.classList.toggle("hidden", dark);
      if (sun) sun.classList.toggle("hidden", !dark);
    });
  }

  function toggleTheme() {
    dark = !dark;
    applyTheme();
  }

  document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
    btn.addEventListener("click", toggleTheme);
  });

  // Синхронизация с системной темой (как в исходном хуке)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        dark = e.matches;
        applyTheme();
      }
    });

  // ── Мобильное меню (бургер) ──
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobile-menu");
  var menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
    menu.classList.toggle("flex", open);
    var lines = burger.querySelectorAll(".burger-line");
    if (lines.length === 3) {
      lines[0].className =
        "burger-line block h-[2px] bg-[#2b2c2e] dark:bg-[#c8cbce] transition-all duration-200" +
        (open ? " rotate-45 translate-y-[7px]" : "");
      lines[1].className =
        "burger-line block h-[2px] bg-[#2b2c2e] dark:bg-[#c8cbce] transition-all duration-200" +
        (open ? " opacity-0" : "");
      lines[2].className =
        "burger-line block h-[2px] bg-[#2b2c2e] dark:bg-[#c8cbce] transition-all duration-200" +
        (open ? " -rotate-45 -translate-y-[7px]" : "");
    }
  }

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(!menuOpen);
    });
  }

  // Закрытие меню при клике по ссылке
  document.querySelectorAll("#mobile-menu .menu-link").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  applyTheme();
})();
