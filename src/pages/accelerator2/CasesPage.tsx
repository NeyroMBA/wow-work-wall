import { Link } from "react-router-dom";
import Navbar from "@/components/accelerator2/Navbar";
import FooterSection from "@/components/accelerator2/FooterSection";
import CaseCard from "@/components/accelerator2/CaseCard";
import { cases } from "@/data/accelerator2/cases";
import { motion } from "framer-motion";

const CasesPage = () => {
  return (
    <div data-theme="accelerator" className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="py-10 bg-background">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Кейсы участников</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Реальные проекты, собранные выпускниками акселератора.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cases.map((c) => (
                <CaseCard key={c.id} caseData={c} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default CasesPage;
