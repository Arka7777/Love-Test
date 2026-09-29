import { useRef, useState } from "react";
import { loveConfig as cfg } from "../config.js";

const MAX = cfg.texts.noMessages.length + 1; // after this many dodges it turns into "fine"

export default function MovingNoButton({ arenaRef, yesRef, label, onGiveUp }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(null); // null = use static CSS position, always visible
  const [tries, setTries] = useState(0);
  const gaveUp = tries >= MAX;

  const place = () => {
    const a = arenaRef.current, b = ref.current, y = yesRef.current;
    if (!a || !b || !y) return;
    const aw = a.clientWidth, ah = a.clientHeight;
    const bw = b.offsetWidth || 120, bh = b.offsetHeight || 50;
    const yes = y.getBoundingClientRect(), ar = a.getBoundingClientRect();
    let best = null;
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * Math.max(aw - bw, 0);
      const yy = Math.random() * Math.max(ah - bh, 0);
      const r = { l: ar.left + x, t: ar.top + yy };
      const overlap = r.l < yes.right + 8 && r.l + bw > yes.left - 8 && r.t < yes.bottom + 8 && r.t + bh > yes.top - 8;
      const far = !pos || Math.hypot(x - pos.x, yy - pos.y) > 60;
      if (!overlap && far) { best = { x, y: yy }; break; }
      best = best || { x, y: yy };
    }
    setPos(best);
  };

  const dodge = (e) => {
    if (gaveUp) return;
    e.preventDefault();
    setTries((t) => t + 1);
    place();
  };

  const text = gaveUp ? cfg.texts.fine : tries > 0 ? cfg.texts.noMessages[(tries - 1) % cfg.texts.noMessages.length] : label;
  const scale = gaveUp ? 1.05 : Math.max(0.7, 1 - tries * 0.05);

  const dynamicStyle = pos
    ? { left: pos.x, top: pos.y, transform: `scale(${scale})` }
    : { transform: `translateY(-50%) scale(${scale})` };

  return (
    <button
      ref={ref}
      className={`btn no-btn ${gaveUp ? "yes" : "ghost"} ${pos ? "" : "no-btn-static"}`}
      style={dynamicStyle}
      onPointerEnter={(e) => e.pointerType === "mouse" && dodge(e)}
      onPointerDown={dodge}
      onTouchStart={dodge}
      onClick={(e) => (gaveUp ? onGiveUp() : dodge(e))}
      onKeyDown={(e) => e.key === "Enter" && !gaveUp && dodge(e)}
    >{text}</button>
  );
}
