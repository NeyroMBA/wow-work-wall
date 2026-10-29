import { cleanup, render, act } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import YandexMetrika from "../components/YandexMetrika";

afterEach(() => {
  cleanup();
  delete window.ym;
  window.history.replaceState({}, "", "/");
});

it("records client-side page visits with counter 38912705 without duplicating initialization", () => {
  window.history.replaceState({}, "", "/accelerator");
  const hit = vi.fn();
  window.ym = hit;
  render(<BrowserRouter><YandexMetrika /></BrowserRouter>);
  expect(hit).not.toHaveBeenCalled();
  const referer = window.location.href;
  act(() => {
    window.history.pushState({}, "", "/cases?utm_source=test");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(hit).toHaveBeenCalledExactlyOnceWith(38912705, "hit", window.location.href, { referer });
});