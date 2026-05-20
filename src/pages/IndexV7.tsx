import { useState } from "react";
import V5Nav from "@/components/v5/V5Nav";
import V5Hero from "@/components/v5/V5Hero";
import V5CourseCTA from "@/components/v5/V5CourseCTA";
import V5Modal from "@/components/v5/V5Modal";
import V7Gallery from "@/components/v7/V7Gallery";
import type { Dashboard } from "@/data/dashboards";
import "@/styles/v5.css";
import "@/styles/v7.css";

const IndexV7 = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);

  const handleSelect = (d: Dashboard) => {
    if (d.link) {
      window.open(d.link, "_blank", "noopener,noreferrer");
    } else {
      setSelected(d);
    }
  };

  return (
    <main className="v5-scope v7-scope relative">
      <V5Nav />
      <V5Hero />
      <V7Gallery onSelect={handleSelect} />
      <V5CourseCTA />
      <footer className="px-8 py-10 text-xs v5-dim flex justify-between border-t" style={{ borderColor: "hsl(0 0% 16%)" }}>
        <div>© 2026 Институт Нейро-Аналитики</div>
      </footer>
      {selected && <V5Modal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV7;
