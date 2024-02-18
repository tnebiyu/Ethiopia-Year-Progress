import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const YearProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState({
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
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const remainingTime = endOfMonth - now;
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
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
        <span>{countdown.days}d</span>
        <span>{countdown.hours}h</span>
        <span>{countdown.minutes}m</span>
        <span>{countdown.seconds}s</span>
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
