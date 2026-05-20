import { useState } from "react";
import V5Nav from "@/components/v5/V5Nav";
import V5Hero from "@/components/v5/V5Hero";
import V5Gallery from "@/components/v5/V5Gallery";
import V5CourseCTA from "@/components/v5/V5CourseCTA";
import V5Modal from "@/components/v5/V5Modal";
import V5Footer from "@/components/v5/V5Footer";
import type { Dashboard } from "@/data/dashboards";
import "@/styles/v5.css";

const IndexV5 = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);

  const handleSelect = (d: Dashboard) => {
    if (d.link) {
      window.open(d.link, "_blank", "noopener,noreferrer");
    } else {
      setSelected(d);
    }
  };

  return (
    <main className="v5-scope relative">
      <V5Nav />
      <V5Hero />
      <V5Gallery onSelect={handleSelect} />
      <V5CourseCTA />
      <V5Footer />
      {selected && <V5Modal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV5;
