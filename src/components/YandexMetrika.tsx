import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    ym?: (counterId: number, method: string, url: string, options: { referer: string }) => void;
  }
}

/** The HTML snippet records the first visit; this records subsequent SPA pages. */
export default function YandexMetrika() {
  const { pathname, search } = useLocation();
  const previousUrl = useRef(window.location.href);

  useEffect(() => {
    const url = window.location.href;
    if (url === previousUrl.current) return;
    window.ym?.(38912705, "hit", url, { referer: previousUrl.current });
    previousUrl.current = url;
  }, [pathname, search]);

  return null;
}