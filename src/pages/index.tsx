import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrencyRatesInterface } from "src/store/types";

import useCurencyRates from "src/store/useSelector/useCurency";

// 4 слова в ключевой фразе
const PIECES_COUNT = 4;

function check(rates: CurrencyRatesInterface, pieces: string[]) {
  const value = {
    firstCurrency: "",
    secondCurrency: "",
    sum: 0
  };

  const currenciesNames = Object.keys(rates);

  pieces.every((piece: string, index: number) => {
    switch (index) {
      case 0: {
        value.sum = Number(piece) || undefined;

        return Boolean(value.sum);
      }

      case 1: {
        value.firstCurrency =
          currenciesNames.indexOf(piece.toUpperCase()) >= 0
            ? piece.toUpperCase()
            : undefined;

        return Boolean(value.firstCurrency);
      }

      case 2:
        return piece === "in" ? true : false;

      case 3: {
        value.secondCurrency =
          currenciesNames.indexOf(piece.toUpperCase()) >= 0
            ? piece.toUpperCase()
            : undefined;

        return Boolean(value.secondCurrency);
      }

      default:
        return;
    }
  });

  return value;
}

const CurrencyExchange = ({}) => {
  const rates = useCurencyRates();

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<number>();

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const targetValue = e.target.value;

    setInputValue(targetValue);

    const pieces = targetValue.split(" ");

    if (pieces.length !== PIECES_COUNT) {
      return setError(true);
    }

    const value = check(rates, pieces);

    // если нет secondCurrency значит поле заполнено с ошибкой
    if (!value.secondCurrency) {
      return setError(true);
    }

    if (value.firstCurrency === value.secondCurrency) {
      setResult(value.sum);
    } else {
      setResult(value.sum * rates[value.firstCurrency][value.secondCurrency]);
    }

    setError(false);
  };

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
