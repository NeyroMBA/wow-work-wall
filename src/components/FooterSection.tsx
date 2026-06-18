const FooterSection = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href="https://neyro.mba/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Политика конфиденциальности
          </a>
          <a
            href="https://neyro.mba/osnovnie_svedeniya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Сведения об организации
          </a>
          <a
            href="https://neyro.mba/oferta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Публичная оферта
          </a>
        </div>
        <p className="text-muted-foreground text-sm">
          © 2026{" "}
          <a href="https://neyro.mba/study" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">НейроМВА</a>
          {" · "}
          <a href="https://alexkolokolov.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Институт Бизнес-Аналитики</a>
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
