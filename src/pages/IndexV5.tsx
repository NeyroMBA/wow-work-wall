import { useState } from "react";
import V5Nav from "@/components/v5/V5Nav";
import V5Hero from "@/components/v5/V5Hero";
import V5Gallery from "@/components/v5/V5Gallery";
import V5CourseCTA from "@/components/v5/V5CourseCTA";
import V5Modal from "@/components/v5/V5Modal";
import V5IframeModal from "@/components/v5/V5IframeModal";
import V5Footer from "@/components/v5/V5Footer";
import type { Dashboard } from "@/data/dashboards";
import "@/styles/v5.css";

const IndexV5 = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);

  const handleSelect = (d: Dashboard) => {
    setSelected(d);
  };

  return (
    <main className="v5-scope relative">
      <V5Nav />
      <V5Hero />
      <V5Gallery onSelect={handleSelect} />
      <V5CourseCTA />
      <V5Footer />
      {selected && (selected.link
        ? <V5IframeModal dashboard={selected} onClose={() => setSelected(null)} />
        : <V5Modal dashboard={selected} onClose={() => setSelected(null)} />)}
    </main>
  );
};

export default IndexV5;
