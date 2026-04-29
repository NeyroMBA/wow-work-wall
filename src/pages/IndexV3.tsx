import { useState } from "react";
import "@/styles/v3.css";
import V3Nav from "@/components/v3/V3Nav";
import V3Hero from "@/components/v3/V3Hero";
import V3Showcase from "@/components/v3/V3Showcase";
import V3Stream from "@/components/v3/V3Stream";
import V3Grid from "@/components/v3/V3Grid";
import V3Modal from "@/components/v3/V3Modal";
import type { Dashboard } from "@/data/dashboards";

const IndexV3Page = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);
  const [debug, setDebug] = useState("...");
  if (typeof window !== "undefined") {
    setTimeout(() => {
      setDebug(`scrollH=${document.documentElement.scrollHeight}, innerH=${window.innerHeight}, bodyH=${document.body.scrollHeight}`);
    }, 500);
  }
  return (
    <main className="v3-scope min-h-screen">
      <div style={{ position: "fixed", top: 60, left: 10, zIndex: 9999, background: "red", color: "white", padding: 8, fontSize: 12 }}>{debug}</div>
      <V3Nav />
      <V3Hero />
      <V3Showcase onSelect={setSelected} />
      <V3Stream onSelect={setSelected} />
      <V3Grid onSelect={setSelected} />
      <footer className="border-t py-12 px-8 text-center v3-mono text-xs uppercase tracking-widest v3-muted" style={{ borderColor: "hsl(222 30% 14%)" }}>
        Galaxy of Works · 2026 · Школа аналитики
      </footer>
      {selected && <V3Modal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV3Page;
