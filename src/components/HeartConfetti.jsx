import { useMemo } from "react";
const SYMBOLS = ["♥", "♥", "✦", "❤"];
export default function HeartConfetti({ count = 30, mode = "burst" }) {
  const bits = useMemo(() => Array.from({ length: count }, (_, i) => {
    const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 170;
    return {
      s: SYMBOLS[i % 4], size: 12 + Math.random() * 16, delay: mode === "rain" ? Math.random() * 3 : 0,
      x: mode === "rain" ? Math.random() * 100 : 50, dx: Math.cos(a) * d, dy: Math.sin(a) * d - 60,
      hue: ["#e11d48", "#f472b6", "#c4a1ff", "#fb7185"][i % 4],
    };
  }), [count, mode]);
  return (
    <div className={`confetti ${mode}`} aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} style={{ left: `${b.x}%`, fontSize: b.size, color: b.hue, animationDelay: `${b.delay}s`, "--dx": `${b.dx}px`, "--dy": `${b.dy}px` }}>{b.s}</span>
      ))}
    </div>
  );
}
