export type MaskId =
  | "glitch"
  | "neon-fox"
  | "spray-artist"
  | "pixel-ghost"
  | "vhs-phantom"
  | "static-monk";

export interface Mask {
  id: MaskId;
  name: string;
  vibe: string;
  color: string;
  emoji: string;
}

export const MASKS: Mask[] = [
  { id: "glitch", name: "GLITCH", vibe: "ошибка в системе", color: "var(--neon-cyan)", emoji: "▓▒░" },
  { id: "neon-fox", name: "NEON FOX", vibe: "тихий наблюдатель", color: "var(--neon-pink)", emoji: "𓃥" },
  { id: "spray-artist", name: "SPRAY", vibe: "ночной художник", color: "var(--neon-green)", emoji: "✷" },
  { id: "pixel-ghost", name: "PIXEL GHOST", vibe: "цифровой призрак", color: "var(--neon-violet)", emoji: "ꙮ" },
  { id: "vhs-phantom", name: "VHS PHANTOM", vibe: "ленты прошлого", color: "var(--neon-yellow)", emoji: "▶︎▮" },
  { id: "static-monk", name: "STATIC MONK", vibe: "шёпот в шуме", color: "var(--neon-cyan)", emoji: "◯⌇" },
];

export const CATEGORIES = [
  "Cursor: с нуля к ИТ-системе",
  "ИИ дашборды",
  "AI + Python для менеджера",
  "Нейросети для бизнеса и карьеры",
  "Профессия Нейро-Аналитик",
  "Архитектор ИИ-агентов",
  "Нейро MBA",
  "Кураторы",
  "Команда и коммуникация",
  "Организация обучения",
  "Атмосфера сообщества",
  "Технические проблемы",
  "Просто хочу высказаться",
  "Есть идея как сделать лучше",
  "Другое",
];

export const MOODS = [
  { id: "😤", label: "Бесит" },
  { id: "😕", label: "Непонятно" },
  { id: "💡", label: "Можно лучше" },
  { id: "🔥", label: "Огонь" },
  { id: "🌙", label: "Устал" },
  { id: "❓", label: "Вопрос" },
];

export function getMask(id: string): Mask | undefined {
  return MASKS.find((m) => m.id === id);
}

export function pickPaletteForCategory(cat: string): string {
  const palette = ["var(--neon-green)", "var(--neon-pink)", "var(--neon-cyan)", "var(--neon-violet)", "var(--neon-yellow)"];
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}
