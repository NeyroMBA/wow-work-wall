const GalleryHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent-electric animate-pulse" style={{ background: 'hsl(var(--accent-electric))' }} />
          <span className="text-sm text-muted-foreground">Живая выставка · 2026</span>
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] mb-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
          Не <span className="italic text-gradient font-normal">просто</span><br/>
          дашборды.<br/>
          <span className="text-gradient-electric font-medium">Истории в данных.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.25s', animationFillMode: 'backwards' }}>
          Галерея выпускных работ студентов. Перетаскивайте, исследуйте,
          погружайтесь в каждую работу — как в цифровом музее.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
          <div><span className="font-display text-2xl text-foreground">240+</span> работ</div>
          <div className="w-px h-8 bg-border" />
          <div><span className="font-display text-2xl text-foreground">13</span> когорт</div>
          <div className="w-px h-8 bg-border" />
          <div><span className="font-display text-2xl text-foreground">42</span> страны</div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
