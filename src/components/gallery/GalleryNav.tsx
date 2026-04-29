const GalleryNav = () => (
  <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg" style={{ background: 'var(--gradient-primary)' }} />
        <span className="font-display font-medium">Atelier · Data</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Галерея</a>
        <a href="#" className="hover:text-foreground transition-colors">Когорты</a>
        <a href="#" className="hover:text-foreground transition-colors">Студенты</a>
        <a href="#" className="hover:text-foreground transition-colors">О школе</a>
      </nav>
      <button className="px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
        Подать работу
      </button>
    </div>
  </header>
);

export default GalleryNav;
