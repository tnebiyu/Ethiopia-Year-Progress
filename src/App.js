import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import YearProgressBar from "./YearProgressBar";
import EthiopianYearProgress from "./EthiopianYearProgress";

const App = () => {
  return (
    <div>
      <h1 className="YearTitle">Gregorian Calendar</h1>
      <YearProgressBar />
      <div className="Spacer"></div>
      <h1 className="YearTitle">Ethiopian Calendar</h1>
      <EthiopianYearProgress />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
