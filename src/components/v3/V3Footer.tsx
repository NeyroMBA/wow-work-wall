const V3Footer = () => (
  <footer className="relative z-10 border-t v3-border mt-24">
    <div className="max-w-[1400px] mx-auto px-8 py-16 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-6">
        <h3 className="v3-display text-6xl md:text-8xl font-light leading-none">
          Until <em className="italic v3-accent">Issue 05</em>.
        </h3>
      </div>
      <div className="col-span-6 md:col-span-3 v3-mono text-xs uppercase tracking-widest space-y-2">
        <div className="v3-muted mb-3">Sections</div>
        <div>Cover Story</div>
        <div>Features</div>
        <div>Index</div>
        <div>Archive</div>
      </div>
      <div className="col-span-6 md:col-span-3 v3-mono text-xs uppercase tracking-widest space-y-2">
        <div className="v3-muted mb-3">Colophon</div>
        <div>Set in Fraunces</div>
        <div>& JetBrains Mono</div>
        <div>Printed on the web</div>
        <div className="pt-3 v3-muted">© 2026</div>
      </div>
    </div>
  </footer>
);

export default V3Footer;
