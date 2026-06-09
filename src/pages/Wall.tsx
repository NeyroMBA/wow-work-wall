import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { WallHero } from "@/components/wall/WallHero";
import { WallCompose } from "@/components/wall/WallCompose";
import { LiveWall, type WallSpray } from "@/components/wall/LiveWall";
import { HeardBlock } from "@/components/wall/HeardBlock";
import { MASKS, type Mask } from "@/lib/wall-data";
import "@/styles/wall.css";

const Wall = () => {
  const [mask, setMask] = useState<Mask | null>(null);
  const [entered, setEntered] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sprays, setSprays] = useState<WallSpray[]>([]);

  const handleSprayToWall = (dataUrl: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setSprays((prev) => [
      ...prev.slice(-9),
      {
        id,
        dataUrl,
        x: 10 + Math.random() * 80,
        y: 12 + Math.random() * 76,
        rot: (Math.random() - 0.5) * 18,
        scale: 0.7 + Math.random() * 0.6,
      },
    ]);
    document.getElementById("wall")?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll lock on the body while in clean-office state
  useEffect(() => {
    const body = document.body;
    if (!entered) body.classList.add("wall-no-scroll");
    else body.classList.remove("wall-no-scroll");
    return () => body.classList.remove("wall-no-scroll");
  }, [entered]);

  const handleEnter = () => {
    const m = mask ?? MASKS[Math.floor(Math.random() * MASKS.length)];
    setMask(m);
    setEntered(true);
    setTimeout(() => {
      document.getElementById("compose")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const enterAndScrollTo = (id: string) => {
    setEntered(true);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <div className={`wall-root ${entered ? "" : "lights-on"}`}>
      <main className="relative z-10 min-h-screen text-foreground">
        <Toaster
          theme={entered ? "dark" : "light"}
          position="bottom-center"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            },
          }}
        />

        <WallHero
          onEnter={handleEnter}
          hasMask={entered}
          onWrite={() => enterAndScrollTo("compose")}
          onRead={() => enterAndScrollTo("wall")}
        />

        {mask && entered && (
          <>
            <WallCompose mask={mask} onSent={() => setRefreshKey((k) => k + 1)} onSubmitToWall={handleSprayToWall} />
            <LiveWall refreshKey={refreshKey} sprays={sprays} />
            <HeardBlock />
          </>
        )}
      </main>
    </div>
  );
};

export default Wall;
