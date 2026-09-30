import { Link } from "react-router";

const assetPathPrefix = "/assets";
const imgContainer = `${assetPathPrefix}/b0553.png`;

export default function Home() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#f5f7f8] dark:bg-[#141720] flex justify-center"
      style={{ minHeight: "calc(100dvh - 76px)" }}
    >
      {/* Subtle pattern bg */}
      <div
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `url("${imgContainer}")`,
          backgroundSize: "60.5px 69.85px",
          backgroundPosition: "top left",
        }}
      />
      <div className="relative flex flex-col justify-center w-full max-w-[1180px] px-8 py-24 md:py-32">
        <h1
          className="text-[36px] sm:text-[44px] md:text-[54px] leading-[1.12] tracking-[-0.54px] max-w-[640px]"
          style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
        >
          <span className="text-[#20c5f5]">строим умные решения</span>{" "}
          <span className="text-[#2b2c2e] dark:text-[#e8e9ea]">на стыке инженерии и данных</span>
        </h1>
        <p
          className="mt-6 text-[#5b6266] dark:text-[#9a9d9f] text-[17px] md:text-[18px] leading-[1.65] max-w-[520px]"
          style={{ fontFamily: "'Montserrat:Regular',sans-serif", fontWeight: 400 }}
        >
          ТИМиМО — лаборатория технологий информационного моделирования и машинного обучения при университете. Разрабатываем, обучаем, внедряем.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
          <Link
            to="/directions"
            className="bg-[#0aa8d6] px-7 py-4 text-white text-[14.5px] leading-normal whitespace-nowrap hover:bg-[#0997c0] transition-colors text-center"
            style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
          >
            Смотреть направления
          </Link>
          <Link
            to="/contact"
            className="border border-black/30 dark:border-white/20 px-7 py-4 text-[#22262a] dark:text-[#c8cbce] text-[14.5px] leading-normal whitespace-nowrap hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
            style={{ fontFamily: "'Montserrat:SemiBold',sans-serif", fontWeight: 600 }}
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </section>
  );
}
