const GalleryFooter = () => (
  <footer className="relative mt-32 px-6 py-20 border-t border-border">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="font-display text-4xl md:text-6xl font-light mb-6">
        Хочешь увидеть<br/>
        <span className="text-gradient italic">свою работу здесь?</span>
      </h2>
      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
        Мы курируем выставку каждую когорту. Лучшие дашборды попадают в галерею и презентуются перед партнёрами школы.
      </p>
      <button className="px-8 py-4 rounded-full font-medium text-primary-foreground" style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow)' }}>
        Узнать о следующем наборе →
      </button>
      <div className="mt-20 text-xs text-muted-foreground">
        © 2026 Atelier Data Gallery. Сделано с любовью к данным.
      </div>
    </div>
  </footer>
);

export default GalleryFooter;
