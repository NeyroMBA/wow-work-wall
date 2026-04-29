import GalleryNav from "@/components/gallery/GalleryNav";
import GalleryHero from "@/components/gallery/GalleryHero";
import InfiniteCanvas from "@/components/gallery/InfiniteCanvas";
import GalleryFooter from "@/components/gallery/GalleryFooter";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <GalleryNav />
      <GalleryHero />
      <InfiniteCanvas />
      <GalleryFooter />
    </main>
  );
};

export default Index;
