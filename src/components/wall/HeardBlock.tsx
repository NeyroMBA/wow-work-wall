import chairMask from "@/assets/wall/chair-mask.jpg";

export function HeardBlock() {
  const items = [
    {
      tag: "FAQ",
      title: "Почему исчез мой комментарий?",
      change: "Если ваш комментарий называет кого-то конкретного, раскрывает чью-то личность и носит оскорбительный характер — он удаляется.",
      color: "var(--neon-green)",
    },
    {
      tag: "FAQ",
      title: "Кто может оставлять и читать надписи?",
      change: "Вообще кто угодно. И сотрудники компании, и руководители, и просто случайно зашедшие в офис люди.",
      color: "var(--neon-cyan)",
    },
    {
      tag: "FAQ",
      title: "Читают ли отзывы люди из команды Клуба анонимных аналитиков?",
      change: "Никто не знает. У них есть к этому доступ, но чем они занимаются в ночном офисе — остаётся тайной.",
      color: "var(--neon-pink)",
    },
    {
      tag: "FAQ",
      title: "Что такое калькулятор?",
      change: "Это такая физическая штука для счёта, которой пользовались до появления нейросетей.",
      color: "var(--neon-violet)",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-center bg-cover opacity-20" style={{ backgroundImage: `url(${chairMask})` }} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 25%, transparent 75%, hsl(var(--background)) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-display text-4xl sm:text-6xl uppercase leading-[1]">
          FAQ{" "}
          <span className="text-glow-green" style={{ color: "var(--neon-green)" }}>раздел</span>
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <article
              key={i}
              className="p-6 rounded-lg border bg-card relative overflow-hidden"
              style={{ borderColor: `color-mix(in oklab, ${it.color} 30%, hsl(var(--border)))` }}
            >
              <span className="tag-chip" style={{ color: it.color, borderColor: `color-mix(in oklab, ${it.color} 55%, transparent)` }}>
                {it.tag}
              </span>
              <h3 className="font-display text-xl uppercase tracking-wide mt-4 text-foreground">{it.title}</h3>
              <div className="my-3 h-px w-12" style={{ background: it.color, boxShadow: `0 0 10px ${it.color}` }} />
              <p className="text-sm text-muted-foreground leading-relaxed">{it.change}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
