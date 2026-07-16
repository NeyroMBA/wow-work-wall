import { useEffect, useRef, useState } from "react";

const BASE_PRICE = 120000;
const MIN_PRICE = 84000;
const DEFAULT_PAID = 30000;
const INSTALLMENT_OPTIONS = [12, 9, 6] as const;

const formatNumber = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");

const parsePaid = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  return digits === "" ? 0 : parseInt(digits, 10);
};

function useAnimatedNumber(target: number, duration = 320) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
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
  return value;
}

const PricingCalculator = ({ onSignup }: { onSignup?: () => void }) => {
  const [paidRaw, setPaidRaw] = useState(formatNumber(DEFAULT_PAID));
  const [months, setMonths] = useState<number>(12);

  const paid = parsePaid(paidRaw);
  const rawPrice = BASE_PRICE - paid;
  const yourPrice = Math.max(MIN_PRICE, rawPrice);
  const maxReached = rawPrice < MIN_PRICE;
  const monthly = Math.ceil(yourPrice / months);

  const animatedPrice = useAnimatedNumber(yourPrice);
  const animatedMonthly = useAnimatedNumber(monthly);

  const handlePaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 7);
    setPaidRaw(digits === "" ? "" : formatNumber(parseInt(digits, 10)));
  };

  return (
    <section className="container mx-auto px-6 pb-16 md:pb-24">
      <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 md:p-8">
        <h3 className="text-center font-bold text-foreground text-[clamp(9px,2.8vw,24px)] leading-tight mb-6 md:mb-8 whitespace-nowrap">
          Индивидуальный калькулятор стоимости
        </h3>

        <div className="rounded-2xl border border-border bg-background divide-y divide-border">
          {/* 1. Standard price */}
          <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-2 min-h-12">
            <span className="text-[14px] md:text-[15px] font-normal text-foreground">
              Стандартная цена
            </span>
            <span className="text-[16px] md:text-[18px] font-semibold text-foreground text-right tabular-nums">
              {formatNumber(BASE_PRICE)} ₽
            </span>
          </div>

          {/* 2. Paid before */}
          <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-2 min-h-12">
            <span className="text-[14px] md:text-[15px] font-normal text-foreground">
              Сумма ранее купленных курсов
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={paidRaw}
              onChange={handlePaidChange}
              maxLength={7}
              className="w-[110px] md:w-[130px] h-8 py-0 rounded-lg border border-border bg-background px-3 text-right text-[16px] md:text-[18px] font-semibold text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* 3. Your price */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 md:px-5 py-2 min-h-12">
            <span className="text-[14px] md:text-[15px] font-normal text-foreground">
              Ваша цена
            </span>
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 ml-auto">
              <span
                className={`inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[12px] font-medium transition-opacity duration-200 ${
                  maxReached ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!maxReached}
              >
                Максимальная скидка — 30%
              </span>
              <span className="text-[16px] md:text-[18px] font-semibold text-foreground text-right tabular-nums">
                {formatNumber(animatedPrice)} ₽
              </span>
            </div>
          </div>

          {/* 4. Installment */}
          <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-2 min-h-12">
            <span className="text-[14px] md:text-[15px] font-normal text-foreground">
              Рассрочка, мес.
            </span>
            <select
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value, 10))}
              className="h-8 py-0 rounded-lg border border-border bg-background px-3 text-[16px] md:text-[18px] font-semibold text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {INSTALLMENT_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Monthly */}
          <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-2 min-h-12">
            <span className="text-[14px] md:text-[15px] font-normal text-foreground">
              Ежемесячный платёж
            </span>
            <span className="text-[16px] md:text-[18px] font-semibold text-foreground text-right tabular-nums">
              {formatNumber(animatedMonthly)} ₽
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSignup?.()}
          className="mt-6 inline-block px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all w-full"
        >
          Записаться
        </button>

        <p className="mt-6 text-sm text-muted-foreground leading-relaxed text-center">
          {"Точную стоимость уточним на\u00A0диагностике."}
        </p>
      </div>
    </section>
  );
};

export default PricingCalculator;
