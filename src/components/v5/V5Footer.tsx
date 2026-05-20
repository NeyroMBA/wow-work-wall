import logo from "@/assets/ina-logo-dark.svg";

const linkCls =
  "text-sm underline decoration-[hsl(0_0%_30%)] underline-offset-4 hover:decoration-[hsl(var(--v5-fg))] transition-colors";
const dim = { color: "hsl(0 0% 67%)" };
const fg = { color: "hsl(0 0% 95%)" };

const V5Footer = () => (
  <footer className="px-6 md:px-10 pt-16 pb-10 v5-scope">
    <div
      className="max-w-[1600px] mx-auto rounded-2xl border p-8 md:p-10"
      style={{
        borderColor: "hsl(0 0% 16%)",
        background: "hsl(0 0% 6%)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        {/* Logo */}
        <div className="flex md:block items-center">
          <img src={logo} alt="ИНА" className="h-12 w-auto" />
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3" style={dim}>
          <a href="https://neyro.mba/privacy" target="_blank" rel="noreferrer" className={linkCls} style={dim}>
            Политика конфиденциальности
          </a>
          <a href="https://neyro.mba/osnovnie_svedeniya" target="_blank" rel="noreferrer" className={linkCls} style={dim}>
            Сведения об организации
          </a>
          <a href="https://neyro.mba/oferta" target="_blank" rel="noreferrer" className={linkCls} style={dim}>
            Публичная оферта
          </a>
          <div className="mt-4 text-xs" style={dim}>© Институт Бизнес-аналитики, 2026</div>
        </div>

        {/* Contacts */}
        <div className="flex flex-col gap-2">
          <a href="tel:+74993807078" className="text-2xl md:text-3xl font-medium" style={fg}>
            +7 499 380-70-78
          </a>
          <div className="text-xs mb-2" style={dim}>Бесплатно по России</div>
          <a
            href="mailto:info@alexkolokolov.ru"
            className="text-xl md:text-2xl font-medium break-all"
            style={fg}
          >
            info@alexkolokolov.ru
          </a>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3" style={dim}>
          <a href="https://neyro.mba/study" target="_blank" rel="noreferrer" style={dim} className="hover:text-white transition-colors">
            Каталог курсов
          </a>
          <a href="https://neyro.mba/book_ai" target="_blank" rel="noreferrer" style={dim} className="hover:text-white transition-colors">
            Книга «Синергия Интеллектов»
          </a>
          <a href="https://neyro.mba/corp" target="_blank" rel="noreferrer" style={dim} className="hover:text-white transition-colors">
            Корпоративное обучение
          </a>
          <div className="mt-4">
            <a href="https://neyro.mba/club-an" target="_blank" rel="noreferrer" style={dim} className="hover:text-white transition-colors">
              Клуб Нейро МВА
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default V5Footer;
