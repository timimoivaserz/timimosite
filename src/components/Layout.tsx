import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router";
import { useDarkMode } from "../hooks/useDarkMode";
import { SunIcon, MoonIcon } from "./Icons";

const assetPathPrefix = "/assets";
const imgVector = `${assetPathPrefix}/c405d.svg`;

const navLinks = [
  { label: "О лаборатории", to: "/about" },
  { label: "Направления", to: "/directions" },
  { label: "Публикации", to: "/publications" },
  { label: "Команда", to: "/team" },
];

const footerLinks = [
  { label: "О лаборатории", to: "/about" },
  { label: "Направления", to: "/directions" },
  { label: "Публикации", to: "/publications" },
  { label: "Команда", to: "/team" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] leading-[22.5px] whitespace-nowrap transition-opacity ${
      isActive
        ? "text-[#20c5f5] opacity-100"
        : "text-[#2b2c2e] dark:text-[#c8cbce] opacity-80 hover:opacity-100"
    }`;

  return (
    <div className="bg-white dark:bg-[#0f1114] flex flex-col w-full min-h-dvh transition-colors duration-200">

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#ececec] dark:bg-[#1a1d21] border-b border-[#d5d5d5] dark:border-[#2a2d31]">
        <div className="flex justify-center w-full">
          <div className="flex h-[76px] items-center justify-between w-full max-w-[1180px] px-8">

            {/* Logo */}
            <Link to="/" className="flex gap-[10px] h-10 items-center shrink-0">
              <div className="h-[37px] w-8 shrink-0">
                <img alt="ТИМиМО" className="block size-full" src={imgVector} />
              </div>
              <div className="flex flex-col items-start">
                <p
                  className="text-[#232427] dark:text-[#9a9d9f] text-[11px] leading-[12.65px] tracking-[0.44px] whitespace-nowrap"
                  style={{ fontFamily: "'Cygre:Regular','Montserrat:Regular',sans-serif" }}
                >
                  Лаборатория
                </p>
                <p
                  className="text-[#252525] dark:text-white text-[17px] leading-[19.55px] whitespace-nowrap"
                  style={{ fontFamily: "'Montserrat:Bold',sans-serif", fontWeight: 700 }}
                >
                  ТИМиМО
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-7 items-center">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={navLinkClass}
                  style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="bg-[#20c5f5] rounded-sm px-7 py-3 text-[#0d1a1f] text-[15px] leading-[22.5px] whitespace-nowrap hover:bg-[#12b8e8] transition-colors"
                style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
              >
                Связаться с нами
              </Link>
              <button
                onClick={() => setDark((d) => !d)}
                className="w-9 h-9 flex items-center justify-center rounded-sm text-[#2b2c2e] dark:text-[#c8cbce] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Переключить тему"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setDark((d) => !d)}
                className="w-9 h-9 flex items-center justify-center rounded-sm text-[#2b2c2e] dark:text-[#c8cbce] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Переключить тему"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                className="flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Меню"
              >
                <span className={`block h-[2px] bg-[#2b2c2e] dark:bg-[#c8cbce] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-[2px] bg-[#2b2c2e] dark:bg-[#c8cbce] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] bg-[#2b2c2e] dark:bg-[#c8cbce] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#ececec] dark:bg-[#1a1d21] border-t border-[#d5d5d5] dark:border-[#2a2d31] px-8 pb-5 pt-2 flex flex-col gap-4">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-[15px] leading-[22.5px] ${isActive ? "text-[#20c5f5]" : "text-[#2b2c2e] dark:text-[#c8cbce] opacity-80"}`
                }
                style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="bg-[#20c5f5] rounded-sm px-7 py-3 text-[#0d1a1f] text-[15px] leading-[22.5px] text-center hover:bg-[#12b8e8] transition-colors"
              style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
            >
              Связаться с нами
            </Link>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#232427] dark:bg-[#0a0c0e] pt-14 pb-7 flex justify-center overflow-hidden">
        <div className="w-full max-w-[1180px] px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <p
                className="pt-[18px] text-white text-[14px] leading-[21px]"
                style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
              >
                Лаборатория ТИМиМО
              </p>
              <p
                className="mt-4 text-[#9a9d9f] text-[13.5px] leading-[20.25px] max-w-[286px]"
                style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
              >
                Технологии информационного моделирования и машинного обучения.
              </p>
            </div>
            <div>
              <p className="pt-[18px] text-white text-[14px] leading-[21px]" style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}>
                Разделы
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {footerLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="pt-[18px] text-white text-[14px] leading-[21px]" style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}>
                Контакты
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a href="mailto:lab.timimo@example.com" className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}>
                  lab.timimo@example.com
                </a>
                <p className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85" style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}>
                  Корпус А, аудитория 2222
                </p>
              </div>
            </div>
            <div>
              <p className="pt-[18px] text-white text-[14px] leading-[21px]" style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}>
                Соцсети
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {["Telegram", "VK"].map((item) => (
                  <a key={item} href="#" className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.12)", borderTopWidth: "0.667px" }}>
            <p className="text-[#8b8e90] text-[12.5px] leading-[18.75px]" style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}>
              © Лаборатория ТИМиМО
            </p>
            <p className="text-[#8b8e90] text-[12.5px] leading-[18.75px]" style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}>
              Пн–Пт, 10:00–18:00
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
