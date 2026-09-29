import { loveConfig as cfg } from "../config.js";
export default function WelcomeScreen({ onStart }) {
  return (
    <section className="card welcome" aria-label="Welcome">
      <h1 className="rise d1">Hey {cfg.girlfriendName} ❤️</h1>
      <p className="rise d2">I made a tiny little test for you...</p>
      <p className="rise d3 soft">But there's only one correct way to finish it 😌💕</p>
      <p className="rise d4 ready">Ready, {cfg.girlfriendName}? ❤️</p>
      <button className="btn yes pulse rise d5" onClick={onStart}>{cfg.texts.start}</button>
    </section>
  );
}
