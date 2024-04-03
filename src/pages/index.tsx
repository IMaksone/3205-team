import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useCurencyRates from "src/store/useSelector/useCurency";

function check(rates, el, i) {
  const currenciesNames = Object.keys(rates);

  switch (i) {
    case 0:
      return Number(el) || undefined;

    case 1:
      return currenciesNames.indexOf(el.toUpperCase()) >= 0
        ? el.toUpperCase()
        : undefined;
    case 2:
      return el === "in" ? el : undefined;

    case 3:
      return currenciesNames.indexOf(el.toUpperCase()) >= 0
        ? el.toUpperCase()
        : undefined;

    default:
      return;
  }
}

const CurrencyExchange = ({  }) => {
  const rates = useCurencyRates()

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(undefined);

  const [error, setError] = useState(false);

  const enter = (e) => {
    if (e.keyCode === 13) {
      const arr = inputValue.split(" ");

      if (arr.length !== 4) {
        setError(true);
        return;
      }

      const value = [];

      for (let i = 0; i < 4; i++) {
        value[i] = check(rates, arr[i], i);

        if (!value[i]) {
          setError(true);
          return;
        }
      }

      if (value[1] === value[3]) {
        setResult(value[0]);
      } else {
        setResult(value[0] * rates[value[1]][value[3]]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", enter);

    return () => {
      window.removeEventListener("keydown", enter);
    };
  });

  const handleChange = (e) => setInputValue(e.target.value);

  return (
    <div className="root">
      <Link to={"/exchange-rates"}>Exchange Rates</Link>
      <div className="currency-exchange">
        <p>{(result || 0).toFixed(2)}</p>
        <input
          placeholder="15 rub in usd"
          value={inputValue}
          onChange={handleChange}
        />
        {error ? (
          <p className="error">Please, enter value as '15 rub in usd'</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CurrencyExchange;
