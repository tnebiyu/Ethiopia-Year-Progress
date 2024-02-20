import React, { useState, useEffect } from "react";
import "./EthiopianYearProgress.css";
import { EtDatetime } from "abushakir";
function ThisYear() {
  const start = new Date();

  start.setFullYear(start.getFullYear());

  return start.getFullYear();
}

const EthiopianYearProgress = () => {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateProgress = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear() - 1, 8, 11);
      const endOfYear = new Date(currentDate.getFullYear(), 8, 11);
      const totalMilliseconds = endOfYear - startOfYear;
      const currentMilliseconds = currentDate - startOfYear;
      const currentProgress = (currentMilliseconds / totalMilliseconds) * 100;
      setProgress(currentProgress);
    };

    const calculateCountdown = () => {
      const now = new EtDatetime();
      const month = now.month;
      const endOfMonth = new Date(now.year, month + 1, 0);

      const thiYear = ThisYear();
      const endTime = new Date(thiYear, 8, 11, 0, 0).getTime();
      const gregorianNow = new Date(now.moment);
      const remainingTime = endTime - gregorianNow.getTime();

      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const months = now.month;
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

      setCountdown({
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    };

    calculateProgress();
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
      <div className="progress-year">{new EtDatetime().year}</div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="progress-text">{progress.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default EthiopianYearProgress;
