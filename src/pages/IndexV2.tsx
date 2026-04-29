import { useState } from "react";
import GalleryNav from "@/components/gallery/GalleryNav";
import GalleryHeroV2 from "@/components/gallery/GalleryHeroV2";
import CollageStrip from "@/components/gallery/CollageStrip";
import DashboardGrid from "@/components/gallery/DashboardGrid";
import DashboardModal from "@/components/gallery/DashboardModal";
import GalleryFooter from "@/components/gallery/GalleryFooter";
import type { Dashboard } from "@/data/dashboards";

const IndexV2 = () => {
  const [selected, setSelected] = useState<Dashboard | null>(null);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <GalleryNav />
      <GalleryHeroV2 />
      <CollageStrip onSelect={setSelected} />
      <DashboardGrid />
      <GalleryFooter />
      {selected && <DashboardModal dashboard={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default IndexV2;
