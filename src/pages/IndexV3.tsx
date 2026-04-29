import { useState } from "react";
import "@/styles/v3.css";
import V3Nav from "@/components/v3/V3Nav";
import V3Hero from "@/components/v3/V3Hero";
import V3Marquee from "@/components/v3/V3Marquee";
import V3Bento from "@/components/v3/V3Bento";
import V3Quote from "@/components/v3/V3Quote";
import V3Index from "@/components/v3/V3Index";
import V3Footer from "@/components/v3/V3Footer";
import V3Modal from "@/components/v3/V3Modal";
import type { Dashboard } from "@/data/dashboards";

const IndexV3Page = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);
  return (
    <main className="v3-scope min-h-screen overflow-x-hidden">
      <V3Nav />
      <V3Hero />
      <V3Marquee />
      <V3Bento onSelect={setSelected} />
      <V3Quote />
      <V3Index onSelect={setSelected} />
      <V3Footer />
      {selected && <V3Modal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV3Page;
