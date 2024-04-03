import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ExchangeRates = ({ rates }) => {
  const currenciesNames = Object.keys(rates);
  const [mainCurrency, setMainCurrency] = useState(currenciesNames[0]);

  useEffect(() => {
    const language = window.navigator
      ? window.navigator.language ||
        window.navigator["systemLanguage"] ||
        window.navigator["userLanguage"]
      : "ru";

    if (language === "ru") {
      setMainCurrency("RUB");
    }
  }, []);

  const handleClick = (el) => {
    if (mainCurrency !== el) setMainCurrency(el);
  };

  const renderButtons = (
    <div className="buttons">
      {[...currenciesNames].map((el) => (
        <button
          key={el}
          disabled={mainCurrency === el}
          onClick={() => handleClick(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );

  const renderRates = (
    <div className="rates">
      {Object.keys(rates[mainCurrency]).map((key) => (
        <p key={key}>
          {key}: {rates[mainCurrency][key]}
        </p>
      ))}
    </div>
  );

  return (
    <div className="root">
      <Link to={"/"}>currency-exchange</Link>
      <div className="exchange-rates">
        {renderButtons}
        {renderRates}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { rates: state.currency.rates };
}

export default connect(mapStateToProps)(ExchangeRates);
