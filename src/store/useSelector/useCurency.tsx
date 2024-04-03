import { useSelector } from "react-redux";

import { StateType } from "src/store";

export const useCurencyRates = () => {
  return useSelector((state: StateType) => state.currency.rates);
};

export default useCurencyRates;
