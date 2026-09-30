import { useState, useEffect } from "react";

const assetPathPrefix = "/assets";
const imgContainer = `${assetPathPrefix}/b0553.png`;
const imgVector = `${assetPathPrefix}/c405d.svg`;

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Sync with system preference changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) setDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return [dark, setDark] as const;
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const navLinks = [
  { label: "О лаборатории", href: "#about" },
  { label: "Направления", href: "#directions" },
  { label: "Публикации", href: "#publications" },
  { label: "Команда", href: "#team" },
];

const publications = [
  {
    year: "2024",
    title: "Применение методов машинного обучения в информационном моделировании зданий",
    authors: "Иванов А.А., Петрова М.В.",
    journal: "Вестник строительных технологий",
  },
  {
    year: "2024",
    title: "Автоматизация обработки BIM-данных с использованием нейронных сетей",
    authors: "Сидоров К.Н., Иванов А.А.",
    journal: "Информационные технологии в проектировании",
  },
  {
    year: "2023",
    title: "Интеграция ML-моделей в процессы цифрового двойника промышленного предприятия",
    authors: "Петрова М.В., Козлов Д.С.",
    journal: "Промышленная автоматика",
  },
  {
    year: "2023",
    title: "Классификация дефектов конструкций по данным лазерного сканирования",
    authors: "Козлов Д.С., Сидоров К.Н.",
    journal: "Строительная механика и расчёт сооружений",
  },
  {
    year: "2022",
    title: "Предиктивное обслуживание оборудования на основе данных IoT-сенсоров",
    authors: "Иванов А.А., Козлов Д.С., Петрова М.В.",
    journal: "Автоматизация в промышленности",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useDarkMode();

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="bg-white dark:bg-[#0f1114] flex flex-col items-start w-full min-h-dvh transition-colors duration-200">

      {/* ── Header ── solid, no blur, no pattern */}
      <header className="sticky top-0 z-50 w-full bg-[#ececec] dark:bg-[#1a1d21] border-b border-[#d5d5d5] dark:border-[#2a2d31]">
        <div className="flex justify-center w-full">
          <div className="flex h-[76px] items-center justify-between w-full max-w-[1180px] px-8">

            {/* Logo */}
            <a href="#" className="flex gap-[10px] h-10 items-center shrink-0">
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
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-7 items-center">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[#2b2c2e] dark:text-[#c8cbce] text-[15px] leading-[22.5px] whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-[#20c5f5] rounded-sm px-7 py-3 text-[#0d1a1f] text-[15px] leading-[22.5px] whitespace-nowrap hover:bg-[#12b8e8] transition-colors"
                style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
              >
                Связаться с нами
              </a>
              {/* Theme toggle */}
              <button
                onClick={() => setDark((d) => !d)}
                className="w-9 h-9 flex items-center justify-center rounded-sm text-[#2b2c2e] dark:text-[#c8cbce] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Переключить тему"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
            </nav>

            {/* Mobile: theme toggle + burger */}
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
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="text-[#2b2c2e] dark:text-[#c8cbce] text-[15px] leading-[22.5px] opacity-80 hover:opacity-100"
                style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="bg-[#20c5f5] rounded-sm px-7 py-3 text-[#0d1a1f] text-[15px] leading-[22.5px] text-center hover:bg-[#12b8e8] transition-colors"
              style={{ fontFamily: "'Montserrat:Medium',sans-serif", fontWeight: 500 }}
            >
              Связаться с нами
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── no stats */}
      <section className="relative w-full overflow-hidden bg-[#f5f7f8] dark:bg-[#141720]" style={{ minHeight: 480 }}>
        <div
          className="absolute inset-0 w-full h-full opacity-0"
          style={{
            backgroundImage: `url("${imgContainer}")`,
            backgroundSize: "60.5px 69.85px",
          }}
        />
        <div className="relative flex justify-center w-full">
          <div className="flex flex-col items-start w-full max-w-[1180px] px-8 pt-20 md:pt-28 pb-20 md:pb-28">
            <h1
              className="text-[32px] sm:text-[38px] md:text-[44px] leading-[1.15] tracking-[-0.44px] max-w-[582px]"
              style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
            >
              <span className="text-[#20c5f5]">строим умные решения</span>{" "}
              <span className="text-[#2b2c2e] dark:text-[#e8e9ea]">на стыке инженерии и данных</span>
            </h1>
            <p
              className="mt-5 text-[#5b6266] dark:text-[#9a9d9f] text-[16px] md:text-[18px] leading-normal max-w-[560px]"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              ТИМиМО — лаборатория технологий информационного моделирования и машинного обучения при университете. Разрабатываем, обучаем, внедряем.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <a
                href="#directions"
                className="bg-[#0aa8d6] px-6 py-3.5 text-white text-[14.5px] leading-normal whitespace-nowrap hover:bg-[#0997c0] transition-colors text-center"
                style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
              >
                Смотреть направления
              </a>
              <a
                href="#contact"
                className="border border-black/30 dark:border-white/20 px-6 py-3.5 text-[#22262a] dark:text-[#c8cbce] text-[14.5px] leading-normal whitespace-nowrap hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
                style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── О лаборатории ── */}
      <section id="about" className="w-full py-[88px] flex justify-center bg-white dark:bg-[#0f1114]">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2
              className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]"
              style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
            >
              Из чего складывается работа лаборатории
            </h2>
            <p
              className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              Три вещи, которые определяют, как мы ведём проекты и обучаем студентов.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Ведём исследования",
                text: "От постановки задачи до модели: собираем данные, строим и проверяем гипотезы вместе со студентами.",
                link: "Публикации",
                href: "#publications",
              },
              {
                title: "Готовим инженеров будущего",
                text: "Студенты входят в реальные проекты — от расчётов до внедрения моделей машинного обучения.",
                link: "Для студентов",
                href: "#contact",
              },
              {
                title: "Работаем с индустрией",
                text: "Решаем прикладные задачи по заказу партнёров — от анализа данных до готовых ML-решений.",
                link: "Наши проекты",
                href: "#directions",
              },
            ].map(({ title, text, link, href }) => (
              <div key={title} className="flex flex-col items-start">
                <h3
                  className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[19px] leading-[28.5px] tracking-[-0.19px]"
                  style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2.5 mb-4 text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
                  style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                >
                  {text}
                </p>
                <a
                  href={href}
                  className="text-[#20c5f5] text-[14px] leading-[21px] border-b border-transparent hover:border-[#20c5f5] transition-colors"
                  style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Направления и проекты ── */}
      <section id="directions" className="w-full bg-[#f3f5f6] dark:bg-[#191c20] py-[88px] flex justify-center">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2
              className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]"
              style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
            >
              Направления и проекты
            </h2>
            <p
              className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              Информационное моделирование и машинное обучение — в цифрах.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                numBig: "3",
                numSupLeft: null as number | null,
                title: "научных направления",
                text: "Информационное моделирование, машинное обучение, анализ данных.",
                link: "Все направления",
              },
              {
                numBig: "12",
                numSupLeft: 52,
                title: "проектов в работе",
                text: "От студенческих курсовых до прикладных задач партнёров.",
                link: "Смотреть проекты",
              },
              {
                numBig: "20",
                numSupLeft: 64,
                title: "участников лаборатории",
                text: "Студенты, аспиранты и научные руководители.",
                link: "Команда",
              },
            ].map(({ numBig, numSupLeft, title, text, link }) => (
              <div
                key={title}
                className="bg-white dark:bg-[#1e2226] border border-[#e7e9ea] dark:border-[#2e3135] p-8 flex flex-col gap-[10px]"
                style={{ borderWidth: "0.667px" }}
              >
                <div className="relative h-11 whitespace-nowrap">
                  <span
                    className="text-[#20c5f5] text-[44px] leading-[44px] absolute left-0 top-0"
                    style={{ fontFamily: "'Montserrat:Bold',sans-serif", fontWeight: 700 }}
                  >
                    {numBig}
                  </span>
                  {numSupLeft !== null && (
                    <span
                      className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[16px] leading-4 absolute top-[14px]"
                      style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600, left: numSupLeft }}
                    >
                      +
                    </span>
                  )}
                </div>
                <div className="pb-[9px]">
                  <p
                    className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[18.72px] leading-[28.08px] tracking-[-0.1872px]"
                    style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
                  >
                    {title}
                  </p>
                </div>
                <p
                  className="pb-4 text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
                  style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                >
                  {text}
                </p>
                <a
                  href="#"
                  className="text-[#20c5f5] text-[14px] leading-[21px] border-b border-transparent hover:border-[#20c5f5] transition-colors w-fit"
                  style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Публикации ── */}
      <section id="publications" className="w-full py-[88px] flex justify-center bg-white dark:bg-[#0f1114]">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2
              className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]"
              style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
            >
              Публикации
            </h2>
            <p
              className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              Статьи и материалы конференций участников лаборатории.
            </p>
          </div>
          <div className="mt-12 flex flex-col divide-y divide-[#e7e9ea] dark:divide-[#2e3135]">
            {publications.map(({ year, title, authors, journal }) => (
              <div key={title} className="py-7 flex flex-col md:flex-row md:gap-12">
                <span
                  className="text-[#20c5f5] text-[14px] leading-[21px] tracking-[0.56px] shrink-0 mb-2 md:mb-0 md:w-12"
                  style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
                >
                  {year}
                </span>
                <div className="flex flex-col gap-1.5">
                  <a
                    href="#"
                    className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[17px] leading-[26px] tracking-[-0.17px] hover:text-[#20c5f5] dark:hover:text-[#20c5f5] transition-colors"
                    style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                  >
                    {title}
                  </a>
                  <p
                    className="text-[#606060] dark:text-[#9a9d9f] text-[14px] leading-[21px]"
                    style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                  >
                    {authors}
                  </p>
                  <p
                    className="text-[#9a9d9f] dark:text-[#5b6266] text-[13px] leading-5"
                    style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                  >
                    {journal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Как мы работаем ── */}
      <section className="w-full bg-[#f3f5f6] dark:bg-[#191c20] py-[88px] flex justify-center">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2
              className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]"
              style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
            >
              Как мы работаем
            </h2>
            <p
              className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              Один и тот же путь для учебного и партнёрского проекта.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "Формулируем задачу",
                text: "Вместе с кафедрой или партнёром определяем, что именно нужно решить.",
              },
              {
                num: "02",
                title: "Строим модель",
                text: "Совмещаем информационное моделирование и машинное обучение.",
              },
              {
                num: "03",
                title: "Внедряем и проверяем",
                text: "Тестируем решение на реальных данных и дорабатываем по результатам.",
              },
            ].map(({ num, title, text }) => (
              <div key={num} className="flex flex-col items-start">
                <p
                  className="text-[#20c5f5] text-[14px] leading-[21px] tracking-[0.56px]"
                  style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
                >
                  {num}
                </p>
                <h3
                  className="mt-3 text-[#2b2c2e] dark:text-[#e8e9ea] text-[19px] leading-[28.5px] tracking-[-0.19px]"
                  style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                >
                  {title}
                </h3>
                <p
                  className="mt-[9.5px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
                  style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Команда ── */}
      <section id="team" className="w-full bg-white dark:bg-[#0f1114] py-[88px] flex justify-center">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2
              className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]"
              style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
            >
              Команда
            </h2>
            <p
              className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              Пример карточек — заменить на реальных участников лаборатории.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-7">
            {[
              { role: "Научный руководитель", dept: "Руководитель лаборатории" },
              { role: "Инженер-исследователь", dept: "Информационное моделирование" },
              { role: "ML-инженер", dept: "Машинное обучение" },
              { role: "Студент-исследователь", dept: "Анализ данных" },
            ].map(({ role, dept }) => (
              <div key={role} className="flex flex-col items-start">
                <div
                  className="w-full aspect-square flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(159.99deg, rgb(32,197,245) 8.49%, rgb(102,240,248) 91.51%)",
                  }}
                >
                  <span
                    className="opacity-75 text-[#0d1a1f] text-[13px] leading-[19.5px]"
                    style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                  >
                    фото
                  </span>
                </div>
                <p
                  className="mt-3.5 text-[#2b2c2e] dark:text-[#e8e9ea] text-[16px] leading-6 tracking-[-0.16px]"
                  style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
                >
                  {role}
                </p>
                <p
                  className="mt-0.5 pb-2 text-[#606060] dark:text-[#9a9d9f] text-[13px] leading-[19.5px]"
                  style={{ fontFamily: "'Cygre:Regular','Montserrat:Regular',sans-serif" }}
                >
                  {dept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        className="w-full py-[72px] flex justify-center"
        style={{
          backgroundImage:
            "linear-gradient(156.73deg, rgb(32,197,245) 7.74%, rgb(102,240,248) 92.27%)",
        }}
      >
        <div className="w-full max-w-[1180px] px-8 flex flex-col items-center">
          <h2
            className="text-[#0d1a1f] text-[24px] md:text-[30px] leading-[1.5] tracking-[-0.3px] text-center max-w-[445px]"
            style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
          >
            Хотите присоединиться к лаборатории или обсудить проект?
          </h2>
          <p
            className="mt-3 pb-7 text-[#173038] text-[16px] leading-6 text-center max-w-[509px]"
            style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
          >
            Ответим студентам, кафедрам и индустриальным партнёрам.
          </p>
          <a
            href="mailto:lab.timimo@example.com"
            className="bg-[#0d1a1f] rounded-sm px-7 py-3.5 text-white text-[15px] leading-[22.5px] text-center whitespace-nowrap hover:bg-[#1a2d35] transition-colors"
            style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
          >
            Связаться с нами
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
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
              <p
                className="pt-[18px] text-white text-[14px] leading-[21px]"
                style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
              >
                Разделы
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p
                className="pt-[18px] text-white text-[14px] leading-[21px]"
                style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
              >
                Контакты
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href="mailto:lab.timimo@example.com"
                  className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                >
                  lab.timimo@example.com
                </a>
                <p
                  className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85"
                  style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                >
                  Корпус А, аудитория 2222
                </p>
              </div>
            </div>
            <div>
              <p
                className="pt-[18px] text-white text-[14px] leading-[21px]"
                style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}
              >
                Соцсети
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {["Telegram", "VK"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[#c8cbce] text-[14px] leading-[21px] opacity-85 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            className="mt-10 flex items-start justify-between pt-5 border-t"
            style={{ borderColor: "rgba(255,255,255,0.12)", borderTopWidth: "0.667px" }}
          >
            <p
              className="text-[#8b8e90] text-[12.5px] leading-[18.75px]"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              © Лаборатория ТИМиМО
            </p>
            <p
              className="text-[#8b8e90] text-[12.5px] leading-[18.75px]"
              style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
            >
              Пн–Пт, 10:00–18:00
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
