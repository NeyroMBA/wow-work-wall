import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search, X } from "lucide-react";

type Tariff = { id: string; label: string; price: number };
type Course = { id: string; name: string; tariffs: Tariff[] };

const COURSES: Course[] = [
  {
    id: "nn",
    name: "Нейросети\u00A0для бизнеса и\u00A0карьеры",
    tariffs: [
      { id: "nn-self", label: "Тариф «Для\u00A0себя»", price: 75000 },
      { id: "nn-biz", label: "Тариф «Для\u00A0бизнеса»", price: 120000 },
    ],
  },
  {
    id: "py",
    name: "ИИ+Python",
    tariffs: [
      { id: "py-solo", label: "Тариф «Все\u00A0сам»", price: 30000 },
      { id: "py-cur", label: "Тариф «С\u00A0куратором»", price: 60000 },
    ],
  },
  {
    id: "cursor",
    name: "Cursor с\u00A0нуля к\u00A0ИТ-системе",
    tariffs: [
      { id: "cursor-one", label: "Cursor с\u00A0нуля к\u00A0ИТ-системе", price: 30000 },
    ],
  },
  {
    id: "dash",
    name: "ИИ-дашборды на\u00A0стероидах",
    tariffs: [
      { id: "dash-std", label: "Тариф «Стандарт»", price: 30000 },
      { id: "dash-biz", label: "Тариф «Бизнес»", price: 60000 },
    ],
  },
  {
    id: "agents",
    name: "Архитектор ИИ-агентов",
    tariffs: [
      { id: "agents-base", label: "Тариф «Базовый»", price: 19900 },
      { id: "agents-arch", label: "Тариф «Архитектор»", price: 39900 },
    ],
  },
];

const BASE_PRICE = 120000;
const MAX_DISCOUNT = 36000;
const MIN_PRICE = BASE_PRICE - MAX_DISCOUNT;
const MAX_SELECTED = 5;

const formatPrice = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");

function AnimatedPrice({ target, initial, duration = 450 }: { target: number; initial: number; duration?: number }) {
  const [value, setValue] = useState(initial);
  const valueRef = useRef(initial);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const from = valueRef.current;
    const to = target;
    if (from === to) return;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (to - from) * eased;
      valueRef.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return (
    <>
      {formatPrice(value)}{" "}
      <span className="text-2xl md:text-3xl text-muted-foreground font-medium">₽</span>
    </>
  );
}

type Selection = { courseId: string; tariffId: string };

const PricingCalculator = () => {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [countUpKey, setCountUpKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [warn, setWarn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const discountSum = selections.reduce((acc, s) => {
    const c = COURSES.find((x) => x.id === s.courseId);
    const t = c?.tariffs.find((x) => x.id === s.tariffId);
    return acc + (t?.price ?? 0);
  }, 0);
  const cappedDiscount = Math.min(discountSum, MAX_DISCOUNT);
  const finalPrice = Math.max(MIN_PRICE, BASE_PRICE - cappedDiscount);
  const maxReached = discountSum >= MAX_DISCOUNT;

  const showResult = answer === "no" || (answer === "yes" && selections.length > 0);
  const displayPrice = answer === "no" ? BASE_PRICE : finalPrice;



  const chooseAnswer = (val: "yes" | "no") => {
    if (val === answer) return;
    setAnswer(val);
    setSelections([]);
    setOpen(false);
    setSearch("");
    setWarn(false);
    if (val === "no") setCountUpKey((k) => k + 1);
  };

  const toggleTariff = (courseId: string, tariffId: string) => {
    setWarn(false);
    setSelections((prev) => {
      const existing = prev.find((s) => s.courseId === courseId);
      if (existing) {
        if (existing.tariffId === tariffId) {
          return prev.filter((s) => s.courseId !== courseId);
        }
        return prev.map((s) => (s.courseId === courseId ? { courseId, tariffId } : s));
      }
      if (prev.length >= MAX_SELECTED) {
        setWarn(true);
        return prev;
      }
      return [...prev, { courseId, tariffId }];
    });
  };

  const removeSelection = (courseId: string) => {
    setSelections((prev) => prev.filter((s) => s.courseId !== courseId));
    setWarn(false);
  };

  const filteredCourses = COURSES.map((c) => {
    if (!search.trim()) return c;
    const q = search.toLowerCase();
    if (c.name.toLowerCase().includes(q)) return c;
    const tariffs = c.tariffs.filter((t) => t.label.toLowerCase().includes(q));
    return tariffs.length ? { ...c, tariffs } : null;
  }).filter(Boolean) as Course[];

  return (
    <section className="container mx-auto px-6 pb-16 md:pb-24">
      <div className="max-w-2xl mx-auto rounded-2xl border-2 border-primary/30 bg-background p-8 md:p-10">
        <h3 className="text-center font-bold text-foreground text-[28px] md:text-[40px] leading-tight mb-8">
          Индивидуальный калькулятор стоимости
        </h3>

        <div className="text-center">
          <p className="text-foreground font-medium mb-4">Вы уже проходили у нас курсы?</p>
          <div className="flex gap-3 justify-center">
            {(["yes", "no"] as const).map((v) => {
              const selected = answer === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => chooseAnswer(v)}
                  className={`px-8 py-2.5 rounded-xl border font-medium transition-all min-w-[110px] ${
                    selected
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {v === "yes" ? "Да" : "Нет"}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {answer === "yes" && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-visible"
            >
              <div className="pt-8">
                <p className="text-foreground font-medium mb-4 text-center">
                  Какие курсы и тарифы вы уже проходили?
                </p>

                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-foreground hover:border-primary/50 transition-colors"
                  >
                    <span className={selections.length ? "text-foreground" : "text-muted-foreground"}>
                      {selections.length ? `Выбрано: ${selections.length}` : "Выберите курсы и\u00A0тарифы"}
                    </span>
                    <ChevronDown size={18} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 left-0 right-0 mt-2 rounded-xl border border-border bg-background shadow-lg overflow-hidden"
                      >
                        <div className="p-3 border-b border-border flex items-center gap-2">
                          <Search size={16} className="text-muted-foreground shrink-0" />
                          <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Поиск по названию курса"
                            className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                        <div className="max-h-[320px] overflow-y-auto p-2">
                          {filteredCourses.length === 0 && (
                            <p className="text-sm text-muted-foreground p-3">Ничего не\u00A0найдено</p>
                          )}
                          {filteredCourses.map((c) => (
                            <div key={c.id} className="py-2">
                              <p className="px-2 pb-1 text-[16px] font-normal leading-snug text-foreground">
                                {c.name}
                              </p>
                              <div className="flex flex-col">
                                {c.tariffs.map((t) => {
                                  const checked = selections.some(
                                    (s) => s.courseId === c.id && s.tariffId === t.id
                                  );
                                  return (
                                    <button
                                      key={t.id}
                                      type="button"
                                      onClick={() => toggleTariff(c.id, t.id)}
                                      className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-muted/50 text-left"
                                    >
                                      <span
                                        className={`w-[18px] h-[18px] rounded border flex items-center justify-center shrink-0 transition-colors ${
                                          checked
                                            ? "bg-primary border-primary"
                                            : "bg-background border-border"
                                        }`}
                                      >
                                        {checked && <Check size={12} className="text-primary-foreground" />}
                                      </span>
                                      <span className="text-[14px] leading-tight text-muted-foreground">
                                        {t.label}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                        {warn && (
                          <div className="px-4 py-2 text-xs text-primary bg-primary/10 border-t border-border">
                            Можно выбрать не\u00A0более 5\u00A0курсов.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {warn && !open && (
                  <p className="mt-2 text-xs text-primary">Можно выбрать не\u00A0более 5\u00A0курсов.</p>
                )}

                {selections.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selections.map((s) => {
                      const c = COURSES.find((x) => x.id === s.courseId)!;
                      const t = c.tariffs.find((x) => x.id === s.tariffId)!;
                      const label =
                        c.id === "cursor" ? c.name : `${c.name} · ${t.label}`;
                      return (
                        <span
                          key={s.courseId}
                          className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/40 text-primary px-3 py-1 text-[13px]"
                        >
                          {label}
                          <button
                            type="button"
                            onClick={() => removeSelection(s.courseId)}
                            className="hover:opacity-70"
                            aria-label="Удалить"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {showResult && (
            <motion.div
              key={`result-${answer}-${countUpKey}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-8 text-center">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  Ваша индивидуальная стоимость
                </p>
                <p className="text-5xl md:text-6xl font-bold text-foreground">
                  <AnimatedPrice
                    target={displayPrice}
                    initial={answer === "no" ? 0 : displayPrice}
                  />
                </p>
                <AnimatePresence>
                  {answer === "yes" && maxReached && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 inline-flex items-center rounded-lg bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium"
                    >
                      Максимальная скидка 30%
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingCalculator;
