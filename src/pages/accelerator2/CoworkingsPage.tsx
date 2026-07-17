import { useEffect } from "react";
import Navbar from "@/components/accelerator2/Navbar";
import FooterSection from "@/components/accelerator2/FooterSection";

const CoworkingsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div data-theme="accelerator" className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Коворкинги
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Скоро здесь появится подробное описание того, как проходят наши онлайн-коворкинги.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CoworkingsPage;
