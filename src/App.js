import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import desktopDivider from "./images/pattern-divider-desktop.svg";
import mobileDivider from "./images/pattern-divider-mobile.svg";
import iconDice from "./images/icon-dice.svg";

function App() {
  const [advice, setAdvice] = useState({});
  const [adviceNumber, setAdviceNumber] = useState("");
  const [adviceQuote, setAdviceQuote] = useState("");

  const fetchAdvice = async () => {
    const { data } = await axios.get(`https://api.adviceslip.com/advice`);
    setAdviceNumber(data.slip.id);
    setAdviceQuote(data.slip.advice);
  };

  useEffect(() => {
    axios.get(`https://api.adviceslip.com/advice`).then((result) => {
      const { data } = result;

      setAdvice(data);
      setAdviceNumber(data.slip.id);
      setAdviceQuote(data.slip.advice);
    });
    console.log(adviceNumber);
  }, []);

  return (
    <div className="App">
      <div className="container">
        {" "}
        {advice ? (
          <>
            <div className="advice-number"> {`ADVICE #${adviceNumber}`} </div>{" "}
            <div className="quote-wrap">
              <div className="advice-quote"> {`"${adviceQuote}"`} </div>{" "}
            </div>{" "}
            <div className="desktopDivider">
              <img className="desktop-img" src={desktopDivider} alt="" />
            </div>{" "}
            <div className="mobileDivider">
              <img src={mobileDivider} alt="" />
            </div>
          </>
        ) : (
          <div> Loading... </div>
        )}{" "}
      </div>{" "}
      <div className="dice-button">
        <button onClick={fetchAdvice}>
          <img src={iconDice} alt="" />
        </button>{" "}
      </div>{" "}
    </div>
  );
}

export default App;
