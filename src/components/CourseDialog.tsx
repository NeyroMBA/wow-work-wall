import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import type { CourseDetail } from "@/data/courseDetails";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  detail: CourseDetail | null;
};

const CourseDialog = ({ open, onOpenChange, name, detail }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-theme="accelerator" className="max-w-2xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto p-0 bg-background text-foreground">
        <div className="p-6 md:p-8">
          {detail && (
            <p className="text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-2">
              {detail.tagline}
            </p>
          )}
          <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground mb-4 pr-8">
            {name}
          </DialogTitle>

          {detail ? (
            <>
              <p className="text-muted-foreground leading-relaxed mb-6">{detail.intro}</p>

              <div className="space-y-4">
                {detail.modules.map((m, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border bg-background"
                  >
                    {m.meta && (
                      <p className="text-[11px] font-mono font-semibold text-primary uppercase tracking-wider mb-1">
                        {m.meta}
                      </p>
                    )}
                    <h3 className="text-base font-semibold text-foreground mb-3">
                      {m.title}
                    </h3>
                    <ul className="space-y-2">
                      {m.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Подробности появятся скоро.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
