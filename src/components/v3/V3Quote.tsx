const V3Quote = () => (
  <section className="relative z-10 my-24 px-8">
    <div className="max-w-[1100px] mx-auto text-center">
      <div className="v3-mono text-xs uppercase tracking-[0.3em] v3-accent mb-8">A note from the curator</div>
      <blockquote className="v3-display text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
        "Хороший дашборд не <em className="italic">кричит</em> цифрами —
        он шепчет правду <span className="v3-accent">так тихо</span>, что её
        слышат все."
      </blockquote>
      <div className="v3-rule w-24 mx-auto my-10" />
      <div className="v3-mono text-xs uppercase tracking-widest v3-muted">
        — Editor in chief, Issue 04
      </div>
    </div>
  </section>
);

export default V3Quote;
