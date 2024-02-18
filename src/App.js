import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import YearProgressBar from "./YearProgressBar";

const App = () => {
  return (
    <div>
      <h1 className="yearTitle">Gregorian Calendar</h1>
      <YearProgressBar />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
