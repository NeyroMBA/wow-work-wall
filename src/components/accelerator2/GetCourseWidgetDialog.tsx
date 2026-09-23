import { useMemo } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, X } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  scriptId: string;
  scriptSrc: string;
  scrollable?: boolean;
};

const buildSrcDoc = (scriptId: string, scriptSrc: string, scrollable: boolean) => `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; background: transparent; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      body { padding: 0; }
      ${scrollable ? `
        html { min-height: 100%; height: auto; overflow-y: auto !important; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
        body { min-height: calc(100% + 1px); height: auto; overflow: visible !important; box-sizing: border-box; }
        body > iframe { display: block; max-width: 100%; }
        body::after { content: ""; display: block; width: 100%; height: calc(128px + env(safe-area-inset-bottom, 0px)); }
      ` : ""}
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

const GetCourseWidgetDialog = ({ open, onOpenChange, title, scriptId, scriptSrc, scrollable = false }: Props) => {
  const srcDoc = useMemo(() => buildSrcDoc(scriptId, scriptSrc, scrollable), [scriptId, scriptSrc, scrollable]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`p-0 border-0 flex flex-col gap-0 w-[calc(100vw-1.5rem)] max-w-none h-[92dvh] max-h-[92dvh] rounded-2xl sm:w-[calc(100vw-2rem)] sm:max-w-xl sm:max-h-[90dvh] sm:rounded-lg overflow-hidden [&>button.absolute]:hidden ${scrollable ? "sm:h-[90dvh]" : "sm:h-auto"}`}
        style={{ backgroundColor: "#F3F3F3" }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className={`relative w-full h-full flex-1 min-h-0 ${scrollable ? "" : "sm:h-auto sm:min-h-[560px]"}`} style={{ backgroundColor: "#F3F3F3" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground pointer-events-none z-0">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="text-sm">Форма загружается</p>
          </div>

          {open && (
            <iframe
              key={scriptId}
              title={title}
              srcDoc={srcDoc}
              scrolling={scrollable ? "yes" : undefined}
              className={`relative w-full border-0 bg-transparent z-10 h-full ${scrollable ? "" : "sm:h-[740px]"}`}
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            />
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Закрыть"
            className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 shadow-md border border-neutral-200 transition-colors"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>
      </DialogContent>

    </Dialog>
  );
};

export default GetCourseWidgetDialog;
