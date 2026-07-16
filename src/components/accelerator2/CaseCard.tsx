import { useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Case } from "@/data/accelerator2/cases";

const getInitials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

const CaseCard = ({ caseData }: { caseData: Case }) => {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(caseData.videoUrl);
  const hasAuthor = Boolean(caseData.authorName);
  const initials = hasAuthor ? getInitials(caseData.authorName) : "";

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
        <div className="relative aspect-[4/3] bg-muted overflow-hidden flex items-center justify-center">
          {caseData.previewImage || caseData.authorPhoto ? (
            <img
              src={caseData.previewImage ?? caseData.authorPhoto}
              alt={caseData.title}
              className="absolute inset-0 w-full h-full object-cover object-center md:object-left opacity-70 group-hover:opacity-80 transition-opacity"
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
        {hasAuthor ? (
          <div className="p-4 border-t border-border min-w-0">
            <p className="text-base font-bold text-foreground leading-snug">{caseData.authorName}</p>
            <p className="text-xs text-muted-foreground">{caseData.authorRole || "\u00A0"}</p>
          </div>
        ) : (
          <div className="p-4 border-t border-border min-w-0" aria-hidden="true">
            <p className="text-base font-bold text-foreground leading-snug">&nbsp;</p>
            <p className="text-xs text-muted-foreground">&nbsp;</p>
          </div>
        )}

        <div className="px-4 pb-4 space-y-3 flex flex-col flex-1">
          <p className="text-base text-foreground font-semibold leading-snug min-h-[3.75rem]">
            {caseData.title}
          </p>
          {caseData.kpi && (
            <div className="mt-auto rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
              <p className="text-[10px] font-mono font-semibold text-primary uppercase tracking-wider mb-0.5">
                Результат
              </p>
              <p className="text-xs text-foreground leading-snug">{caseData.kpi}</p>
            </div>
          )}
        </div>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6 md:p-8">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2 pr-8">
              {caseData.title}
            </DialogTitle>

            {hasAuthor && (
              <div className="flex items-center gap-3 mb-6">
                {caseData.authorPhoto ? (
                  <img src={caseData.authorPhoto} alt={caseData.authorName} className="w-12 h-12 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{caseData.authorName}</p>
                  {caseData.authorRole && (
                    <p className="text-sm text-muted-foreground">{caseData.authorRole}</p>
                  )}
                </div>
              </div>
            )}

            {caseData.videoUrl && (
              <div className="mb-6 rounded-xl overflow-hidden bg-black aspect-video">
                <video
                  src={caseData.videoUrl}
                  poster={caseData.posterImage ?? caseData.previewImage}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full"
                />
              </div>
            )}

            {!caseData.videoUrl && caseData.galleryImages && caseData.galleryImages.length > 0 && (
              <Gallery images={caseData.galleryImages} />
            )}

            <div className="space-y-4 text-foreground leading-relaxed">
              {caseData.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {caseData.kpi && (
              <div className="mt-6 p-4 rounded-xl border border-primary/30 bg-primary/5">
                <p className="text-sm font-mono font-medium text-primary uppercase tracking-wider mb-1">Результат</p>
                <p className="text-foreground leading-relaxed">{caseData.kpi}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Gallery = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;
  const go = (n: number) => setIdx((n + total) % total);

  return (
    <div className="mb-6">
      <div
        className="relative rounded-xl overflow-hidden bg-muted aspect-video select-none"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
      >
        <img src={images[idx]} alt={`Скриншот ${idx + 1}`} className="absolute inset-0 w-full h-full object-contain" />
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(idx - 1)} aria-label="Предыдущее" className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => go(idx + 1)} aria-label="Следующее" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Перейти к ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseCard;
