import React, { useState, useEffect } from "react";
import "./EthiopianYearProgress.css";

function gregorianToEthiopian(year, month, day) {
  const ethiopianYear = year + 8;
  const ethiopianMonth = month < 9 ? month + 4 : month - 8;
  const ethiopianDay = day;
  return { ethiopianYear, ethiopianMonth, ethiopianDay };
}

function endOfEthiopianYear(ethiopianYear) {
  const endOfYear = new Date(ethiopianYear + 1, 0, 1);
  endOfYear.setDate(endOfYear.getDate() - 1);
  return endOfYear;
}

const nextEthiopianYearFromNow = () => {};

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
      const now = new Date();
      const ethiopianDate = gregorianToEthiopian(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
      const startOfYearEthiopian = new Date(ethiopianDate.ethiopianYear, 0, 1);
      const endOfYearEthiopian = endOfEthiopianYear(
        ethiopianDate.ethiopianYear
      );
      const totalMilliseconds = endOfYearEthiopian - startOfYearEthiopian;
      const currentMilliseconds = now - startOfYearEthiopian;
      const currentProgress = (currentMilliseconds / totalMilliseconds) * 100;
      setProgress(currentProgress);
    };

    const calculateCountdown = () => {
      const now = new Date();
      const nextEthiopianYear = nextEthiopianYearFromNow();
      const endTime = endOfEthiopianYear(nextEthiopianYear).getTime();
      const remainingTime = endTime - now.getTime();

      let totalSeconds = Math.floor(remainingTime / 1000);

      const monthsLeft = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
      totalSeconds -= monthsLeft * (30 * 24 * 60 * 60);

      const daysLeft = Math.floor(totalSeconds / (24 * 60 * 60));
      totalSeconds -= daysLeft * (24 * 60 * 60);

      const hoursLeft = Math.floor(totalSeconds / (60 * 60));
      totalSeconds -= hoursLeft * (60 * 60);

      const minutesLeft = Math.floor(totalSeconds / 60);
      totalSeconds -= minutesLeft * 60;

      const secondsLeft = totalSeconds;

      setCountdown({
        months: monthsLeft,
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
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
      <div className="progress-year">{nextEthiopianYearFromNow()}</div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="progress-text">{progress.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default EthiopianYearProgress;
