import { Link } from "react-router";

const m = { fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 } as const;
const ms = { fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 } as const;

export default function About() {
  return (
    <div className="bg-white dark:bg-[#0f1114]">

      {/* Hero */}
      <section className="w-full py-20 flex justify-center border-b border-[#e7e9ea] dark:border-[#2e3135]">
        <div className="w-full max-w-[1180px] px-8">
          <h1 className="text-[32px] md:text-[42px] leading-[1.2] tracking-[-0.42px] text-[#2b2c2e] dark:text-[#e8e9ea] max-w-[640px]" style={ms}>
            О лаборатории
          </h1>
          <p className="mt-5 text-[#5b6266] dark:text-[#9a9d9f] text-[17px] leading-[1.65] max-w-[600px]" style={m}>
            ТИМиМО — лаборатория технологий информационного моделирования и машинного обучения. Создана при университете для проведения прикладных исследований, подготовки инженерных кадров и реализации задач индустриальных партнёров.
          </p>
        </div>
      </section>

      {/* Из чего складывается */}
      <section className="w-full py-[88px] flex justify-center">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2 className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]" style={ms}>
              Из чего складывается работа лаборатории
            </h2>
            <p className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6" style={m}>
              Три вещи, которые определяют, как мы ведём проекты и обучаем студентов.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Ведём исследования",
                text: "От постановки задачи до модели: собираем данные, строим и проверяем гипотезы вместе со студентами.",
                link: "Публикации", to: "/publications",
              },
              {
                title: "Готовим инженеров будущего",
                text: "Студенты входят в реальные проекты — от расчётов до внедрения моделей машинного обучения.",
                link: "Для студентов", to: "/contact",
              },
              {
                title: "Работаем с индустрией",
                text: "Решаем прикладные задачи по заказу партнёров — от анализа данных до готовых ML-решений.",
                link: "Наши проекты", to: "/directions",
              },
            ].map(({ title, text, link, to }) => (
              <div key={title} className="flex flex-col items-start">
                <h3 className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[19px] leading-[28.5px] tracking-[-0.19px]" style={ms}>{title}</h3>
                <p className="mt-2.5 mb-4 text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6" style={m}>{text}</p>
                <Link to={to} className="text-[#20c5f5] text-[14px] leading-[21px] border-b border-transparent hover:border-[#20c5f5] transition-colors" style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}>
                  {link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="w-full bg-[#f3f5f6] dark:bg-[#191c20] py-[88px] flex justify-center">
        <div className="w-full max-w-[1180px] px-8">
          <div className="max-w-[640px]">
            <h2 className="text-[#2b2c2e] dark:text-[#e8e9ea] text-[26px] md:text-[30px] leading-[1.5] tracking-[-0.3px]" style={ms}>
              Как мы работаем
            </h2>
            <p className="mt-[15px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6" style={m}>
              Один и тот же путь для учебного и партнёрского проекта.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: "01", title: "Формулируем задачу", text: "Вместе с кафедрой или партнёром определяем, что именно нужно решить." },
              { num: "02", title: "Строим модель", text: "Совмещаем информационное моделирование и машинное обучение." },
              { num: "03", title: "Внедряем и проверяем", text: "Тестируем решение на реальных данных и дорабатываем по результатам." },
            ].map(({ num, title, text }) => (
              <div key={num} className="flex flex-col items-start">
                <p className="text-[#20c5f5] text-[14px] leading-[21px] tracking-[0.56px]" style={{ fontFamily: "'Cygre:Bold','Montserrat:Bold',sans-serif", fontWeight: 700 }}>{num}</p>
                <h3 className="mt-3 text-[#2b2c2e] dark:text-[#e8e9ea] text-[19px] leading-[28.5px] tracking-[-0.19px]" style={ms}>{title}</h3>
                <p className="mt-[9.5px] text-[#606060] dark:text-[#9a9d9f] text-[16px] leading-6" style={m}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
