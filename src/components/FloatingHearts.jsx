import { useMemo } from "react";
export default function FloatingHearts({ mood = 0 }) {
  const items = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    left: Math.random() * 100, size: 10 + Math.random() * 18,
    dur: 14 + Math.random() * 14, delay: -Math.random() * 20, spark: i % 3 === 0,
  })), []);
  return (
    <div className="bg" aria-hidden="true" style={{ "--shift": `${(mood % 4) * 12}deg` }}>
      <div className="glow g1" /><div className="glow g2" />
      {items.map((h, i) => (
        <span key={i} className={h.spark ? "float spark" : "float"}
          style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}>
          {h.spark ? "✦" : "♥"}
        </span>
      ))}
    </div>
  );
}
