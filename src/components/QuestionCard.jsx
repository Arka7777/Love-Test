import { useRef } from "react";
import MovingNoButton from "./MovingNoButton.jsx";

export default function QuestionCard({ data, onYes }) {
  const arenaRef = useRef(null), yesRef = useRef(null);
  return (
    <section className="card question enter" aria-live="polite">
      {data.pre && <p className="pre">{data.pre}</p>}
      <h2>{data.q}</h2>
      <div className="arena" ref={arenaRef}>
        <button ref={yesRef} className="btn yes yes-btn" onClick={onYes}>{data.yes}</button>
        <MovingNoButton arenaRef={arenaRef} yesRef={yesRef} label={data.no} onGiveUp={onYes} />
      </div>
    </section>
  );
}
