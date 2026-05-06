import { useState } from "react";
import V5Nav from "@/components/v5/V5Nav";
import V5Hero from "@/components/v5/V5Hero";
import V5Gallery from "@/components/v5/V5Gallery";
import V5CourseCTA from "@/components/v5/V5CourseCTA";
import V5Modal from "@/components/v5/V5Modal";
import type { Dashboard } from "@/data/dashboards";
import "@/styles/v5.css";

const IndexV5 = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);

  return (
    <main className="v5-scope relative">
      <V5Nav />
      <V5Hero />
      <V5Gallery onSelect={setSelected} />
      <V5CourseCTA />
      <footer className="px-8 py-10 text-xs v5-dim flex justify-between border-t" style={{ borderColor: "hsl(0 0% 16%)" }}>
        <div>© 2026 Институт Нейро-Аналитики</div>
        <div>v5 · ИНА edition</div>
      </footer>
      {selected && <V5Modal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV5;
