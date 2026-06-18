import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Case } from "@/data/cases";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const CaseCard = ({ caseData }: { caseData: Case }) => {
const [open, setOpen] = useState(false);
  const hasVideo = Boolean(caseData.videoUrl);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -2 }}
        className="group h-full text-left rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors flex flex-col"
      >
        {/* Video preview area */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden flex items-center justify-center">
          {caseData.previewImage || caseData.authorPhoto ? (
            <img
              src={caseData.previewImage ?? caseData.authorPhoto}
              alt={caseData.title}
              className="absolute inset-0 w-full h-full object-cover object-left opacity-70 group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
          )}
          {hasVideo && (
            <div className="relative z-10 w-14 h-14 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={22} className="text-primary ml-0.5" fill="currentColor" />
            </div>
          )}
        </div>
        {/* Footer with author */}
        <div className="p-4 border-t border-border min-w-0">
          <p className="text-sm font-semibold text-foreground">{caseData.authorName}</p>
          <p className="text-xs text-muted-foreground">{caseData.authorRole}</p>
        </div>
        <div className="px-4 pb-4 space-y-3 flex flex-col flex-1">
          <p className="text-sm text-foreground font-medium leading-snug min-h-[3.75rem]">
            {caseData.title}
          </p>
          {caseData.kpi && (
            <div className="mt-auto rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
              <p className="text-[10px] font-mono font-semibold text-primary uppercase tracking-wider mb-0.5">
                Результат
              </p>
              <p className="text-xs text-foreground leading-snug">
                {caseData.kpi}
              </p>
            </div>
          )}
        </div>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-theme="accelerator" className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-background text-foreground">
          <div className="p-6 md:p-8">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2 pr-8">
              {caseData.title}
            </DialogTitle>

            {/* Author */}
            <div className="mb-6">
              <p className="font-semibold text-foreground">{caseData.authorName}</p>
              <p className="text-sm text-muted-foreground">{caseData.authorRole}</p>
            </div>

            {/* Video */}
            {caseData.videoUrl && (
              <div className="mb-6 rounded-xl overflow-hidden bg-black aspect-video">
                <video
                  src={caseData.videoUrl}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-4 text-foreground leading-relaxed">
              {caseData.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* KPI */}
            {caseData.kpi && (
              <div className="mt-6 p-4 rounded-xl border border-primary/30 bg-primary/5">
                <p className="text-sm font-mono font-medium text-primary uppercase tracking-wider mb-1">
                  Результат
                </p>
                <p className="text-foreground leading-relaxed">{caseData.kpi}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CaseCard;
