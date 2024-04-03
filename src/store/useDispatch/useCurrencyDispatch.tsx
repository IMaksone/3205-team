import { useDispatch } from "react-redux";

import { exchangeRatesUpdate } from "src/store/slices/currencySlice";
import { CurrencyRatesInterface } from "../types";

export const useDispatchExchangeRates = () => {
  const dispatch = useDispatch();

  return (newRates: CurrencyRatesInterface) =>
    dispatch(exchangeRatesUpdate(newRates));
};
