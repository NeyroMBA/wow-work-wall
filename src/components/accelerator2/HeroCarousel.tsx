import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import hero1 from "@/assets/coworkings/hero_1.jpeg.asset.json";
import hero2 from "@/assets/coworkings/hero_2.png.asset.json";
import hero3 from "@/assets/coworkings/hero_3.jpeg.asset.json";
import hero4 from "@/assets/coworkings/hero_4.png.asset.json";
import hero5 from "@/assets/coworkings/hero_5.png.asset.json";

const slides = [hero1.url, hero2.url, hero3.url, hero4.url, hero5.url];

const AUTOPLAY_MS = 4500;

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused || open) return;
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, open]);

  return (
    <>
      <div
        className="rounded-2xl border border-primary/30 bg-primary/5 p-4 md:p-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative w-full overflow-hidden rounded-xl bg-background"
          style={{ aspectRatio: "16 / 10" }}
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={index}
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center p-3 cursor-zoom-in focus:outline-none"
              aria-label="Открыть скриншот"
            >
              <img
                src={slides[index]}
                alt={`Скриншот проекта ${index + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg border border-border shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]"
                loading="lazy"
              />
            </motion.button>
          </AnimatePresence>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Показать скриншот ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          data-theme="accelerator"
          className="max-w-[75vw] w-[75vw] h-[75vh] p-0 bg-background/95 border-border overflow-hidden flex items-center justify-center"
        >
          <motion.img
            key={index}
            src={slides[index]}
            alt={`Скриншот проекта ${index + 1}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setOpen(false)}
            className="max-h-full max-w-full object-contain cursor-zoom-out"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroCarousel;
