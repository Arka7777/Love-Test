import { useState } from "react";
import { loveConfig as cfg } from "../config.js";
import HeartConfetti from "./HeartConfetti.jsx";

export default function FinalScreen() {
  const [more, setMore] = useState(false);
  return (
    <section className="card final" aria-label="Finale">
      <HeartConfetti count={36} mode="rain" />
      <div className="bigheart" aria-hidden="true">❤️</div>
      <h1 className="rise d1">Okay... you passed ❤️</h1>
      <p className="rise d2">I think it's officially confirmed...</p>
      <p className="rise d3 big">You + Me = Forever? 🥹❤️</p>
      <p className="rise d4 soft">Thank you for being my favorite person, {cfg.girlfriendName}.</p>
      <blockquote className="rise d5">{cfg.finalMessage}<footer>— {cfg.myName}</footer></blockquote>
      {!more ? (
        <button className="btn yes pulse" onClick={() => setMore(true)}>{cfg.texts.surprise}</button>
      ) : (
        <div className="reveal">
          <HeartConfetti count={40} mode="burst" />
          <p className="big">You're stuck with me now 😌❤️</p>
          <p className="big love">Love youuuuu! ❤️</p>
        </div>
      )}
    </section>
  );
}
