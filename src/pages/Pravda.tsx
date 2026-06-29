import { PravdaLanding } from "@/components/pravda/PravdaLanding";
import { useEffect } from "react";

export default function PravdaPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Правда — воркшоп по метрикам, дашбордам и ИИ-отчётности";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div data-theme="pravda">
      <PravdaLanding />
    </div>
  );
}
