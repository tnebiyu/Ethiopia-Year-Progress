import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
function nextYearFromNow() {
  const start = new Date();

  start.setFullYear(start.getFullYear() + 1);

  return start.getFullYear();
}
const YearProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState({
    monthsLeft: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateProgress = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
      const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0);
      const totalMilliseconds = endOfYear - startOfYear;
      const currentMilliseconds = currentDate - startOfYear;
      const currentProgress = (currentMilliseconds / totalMilliseconds) * 100;
      setProgress(currentProgress);
    };

    calculateProgress();
    const calculateCountdown = () => {
      const now = new Date();
      const nextYear = nextYearFromNow();
      const endTime = new Date(nextYear, 0, 1, 0, 0).getTime();
      const remainingTime = endTime - now.getTime();

      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const months = 11 - now.getMonth();
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

      setCountdown({
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    };

    calculateCountdown();

    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-wrapper">
      <div className="countdown">
        <span>{countdown.months} months,</span>
        <span>{countdown.days} days,</span>
        <span>{countdown.hours} hours,</span>
        <span>{countdown.minutes} minutes,</span>
        <span>{countdown.seconds} seconds</span>
        <span>left</span>
      </div>
      <div className="progress-year">{new Date().getFullYear()}</div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="progress-text">{progress.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default YearProgressBar;
