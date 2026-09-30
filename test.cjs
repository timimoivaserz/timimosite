const { JSDOM } = require("jsdom");
const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("main.js", "utf8");

let pass = 0, fail = 0;
const ok = (name, cond) => { console.log((cond ? "✅" : "❌") + " " + name); cond ? pass++ : fail++; };

// --- загрузка страницы с выполнением main.js ---
const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost:8123/", pretendToBeVisual: true });
const { window } = dom;
const doc = window.document;
window.eval(js); // инициализация обработчиков

// 1. Секции — все присутствуют и открываются (есть id + содержимое)
for (const id of ["about", "directions", "publications", "team", "contact"]) {
  const s = doc.getElementById(id);
  ok(`Секция #${id} существует и не пустая`, !!s && s.innerHTML.length > 500);
}

// 2. Навигация — каждая якорная ссылка ведёт на существующую секцию
const navLinks = [...doc.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute("href").length > 1);
ok(`Якорей навигации: ${navLinks.length}, все цели существуют`,
   navLinks.every(a => !!doc.getElementById(a.getAttribute("href").slice(1))));

// 3. Тёмная тема: клик по переключателю
ok("Изначально светлая тема", !doc.documentElement.classList.contains("dark"));
doc.querySelector('[data-action="toggle-theme"]').dispatchEvent(new window.Event("click", { bubbles: true }));
ok("После клика — тёмная тема (класс dark на <html>)", doc.documentElement.classList.contains("dark"));
ok("Тема сохранена в localStorage", window.localStorage.getItem("theme") === "dark");
ok("В тёмной теме показана иконка солнца, луна скрыта",
   !doc.querySelector(".icon-sun").classList.contains("hidden") && doc.querySelector(".icon-moon").classList.contains("hidden"));
doc.querySelector('[data-action="toggle-theme"]').dispatchEvent(new window.Event("click", { bubbles: true }));
ok("Повторный клик — возврат в светлую тему", !doc.documentElement.classList.contains("dark"));

// 4. Мобильное меню: бургер открывает/закрывает dropdown
const menu = doc.getElementById("mobile-menu");
const burger = doc.getElementById("burger");
ok("Меню изначально закрыто", menu.classList.contains("hidden"));
burger.dispatchEvent(new window.Event("click", { bubbles: true }));
ok("Клик по бургеру открыл меню", !menu.classList.contains("hidden") && menu.classList.contains("flex"));
burger.dispatchEvent(new window.Event("click", { bubbles: true }));
ok("Повторный клик закрыл меню", menu.classList.contains("hidden"));

// 5. Клик по ссылке внутри мобильного меню закрывает его
burger.dispatchEvent(new window.Event("click", { bubbles: true }));
menu.querySelector("a.menu-link").dispatchEvent(new window.Event("click", { bubbles: true }));
ok("Клик по ссылке закрывает мобильное меню", menu.classList.contains("hidden"));

// 6. Восстановление темы из localStorage при загрузке
const dom2 = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost:8123/" });
dom2.window.localStorage.setItem("theme", "dark");
dom2.window.eval(js);
ok("Тема из localStorage восстанавливается при загрузке", dom2.window.document.documentElement.classList.contains("dark"));

// 7. Ресурсы и подключение скриптов/стилей
ok("Подключены styles.css и main.js", html.includes('href="styles.css"') && html.includes('src="main.js"'));
ok("Логотип и изображение существуют", fs.existsSync("assets/logo.svg") && fs.existsSync("assets/b0553.png"));

console.log(`\nИТОГ: ${pass} пройдено, ${fail} провалено`);
process.exit(fail ? 1 : 0);
