export default function ProgressBar({ current, total }) {
  return (
    <header className="progress">
      <div className="progress-top"><span>❤️ Love Quiz</span><span>Question {current + 1} of {total}</span></div>
      <div className="track" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}>
        <div className="fill" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </header>
  );
}
