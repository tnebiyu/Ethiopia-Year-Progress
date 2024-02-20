import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import YearProgressBar from "./YearProgressBar";
import EthiopianYearProgress from "./EthiopianYearProgress";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/twitter";
import "react-social-icons/github";
import "react-social-icons/email";

const App = () => {
  return (
    <div>
      <span className="Spacer"></span>
      <h1 className="YearTitle">Gregorian Calendar</h1>
      <YearProgressBar />
      <div className="Spacer"></div>
      <h1 className="YearTitle">Ethiopian Calendar</h1>
      <EthiopianYearProgress />
      <div style={{ marginBottom: "100px" }}></div>
      <footer>
        <div className="social-icons">
          <a href="https://github.com/tnebiyu">
            <SocialIcon
              target="_blank"
              network="github"
              style={{ width: 30, height: 30 }}
            />
          </a>

          <a href="mailto:nebiyu28@gmail.com">
            <SocialIcon
              target="_blank"
              network="email"
              style={{ width: 30, height: 30 }}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
