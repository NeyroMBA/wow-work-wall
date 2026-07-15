import { useMemo } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, X } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  scriptId: string;
  scriptSrc: string;
};

const buildSrcDoc = (scriptId: string, scriptSrc: string) => `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; background: transparent; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      body { padding: 0; }
    </style>
  </head>
  <body>
    <script id="${scriptId}" src="${scriptSrc}"><\/script>
    <script>
      (function () {
        var fire = function () {
          try { window.dispatchEvent(new CustomEvent('StartWidget')); } catch (e) {}
        };
        if (document.readyState === 'complete') {
          setTimeout(fire, 50);
        } else {
          window.addEventListener('load', function () { setTimeout(fire, 50); });
        }
      })();
    <\/script>
  </body>
</html>`;

const GetCourseWidgetDialog = ({ open, onOpenChange, title, scriptId, scriptSrc }: Props) => {
  const srcDoc = useMemo(() => buildSrcDoc(scriptId, scriptSrc), [scriptId, scriptSrc]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 border-0 flex flex-col gap-0 w-[calc(100vw-1.5rem)] max-w-none h-[92dvh] max-h-[92dvh] rounded-2xl sm:w-[calc(100vw-2rem)] sm:max-w-xl sm:h-[90vh] sm:max-h-[90vh] sm:rounded-lg overflow-hidden [&>button.absolute]:hidden"
        style={{ backgroundColor: "#F3F3F3" }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="relative w-full h-full flex-1 min-h-0" style={{ backgroundColor: "#F3F3F3" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground pointer-events-none z-0">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="text-sm">Форма загружается</p>
          </div>

          {open && (
            <iframe
              key={scriptId}
              title={title}
              srcDoc={srcDoc}
              className="relative w-full h-full border-0 bg-transparent z-10"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            />
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Закрыть"
            className="absolute top-2 right-2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full text-foreground/70 hover:text-foreground hover:bg-black/10 transition-colors"
            style={{ backgroundColor: "rgba(243,243,243,0.85)" }}
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GetCourseWidgetDialog;
