import { useState } from "react";
import "@/styles/v4.css";
import V4Nav from "@/components/v4/V4Nav";
import V4Hero from "@/components/v4/V4Hero";
import V4Wall from "@/components/v4/V4Wall";
import V4Manifest from "@/components/v4/V4Manifest";
import V4Index from "@/components/v4/V4Index";
import V4Modal from "@/components/v4/V4Modal";
import type { Dashboard } from "@/data/dashboards";

const IndexV4 = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);

  return (
    <main className="v4-scope">
      <V4Nav />
      <V4Hero />
      <V4Wall onSelect={setSelected} />
      <V4Manifest />
      <V4Index onSelect={setSelected} />

      <footer className="px-8 py-12">
        <div className="v4-rule mb-8" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="v4-serif text-4xl">Школа<span className="v4-mint">.</span></div>
          <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim">
            издание 04 · 2026 · все права на работы — у авторов
          </div>
        </div>
      </footer>

      {selected && <V4Modal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV4;
