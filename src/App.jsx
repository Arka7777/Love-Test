import { useState } from "react";
import { loveConfig as cfg } from "./config.js";
import FloatingHearts from "./components/FloatingHearts.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import FinalScreen from "./components/FinalScreen.jsx";
import HeartConfetti from "./components/HeartConfetti.jsx";

export default function App() {
  const total = cfg.questions.length;
  const [step, setStep] = useState(() => {
    const s = parseInt(localStorage.getItem("loveQuizStep") || "-1", 10);
    return s >= 0 && s < total ? s : -1; // -1 welcome, 0..n-1 questions, n final
  });
  const [burst, setBurst] = useState(0);

  const go = (n) => { setStep(n); try { localStorage.setItem("loveQuizStep", n < total ? n : -1); } catch {} };
  const answer = () => { setBurst((b) => b + 1); setTimeout(() => go(step + 1), 650); };

  return (
    <div className="app" data-mood={Math.max(step, 0) % 4}>
      <FloatingHearts mood={Math.max(step, 0)} />
      <main className="stage">
        {step === -1 && <WelcomeScreen onStart={() => go(0)} />}
        {step >= 0 && step < total && (
          <>
            <ProgressBar current={step} total={total} />
            <QuestionCard key={step} data={cfg.questions[step]} onYes={answer} />
          </>
        )}
        {step === total && <FinalScreen />}
      </main>
      {burst > 0 && step < total && <HeartConfetti key={burst} count={22} mode="burst" />}
    </div>
  );
}
