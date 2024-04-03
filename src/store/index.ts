import { Reducer, configureStore } from "@reduxjs/toolkit";

import { currencySlice } from "./slices/currencySlice";
import { CurrencyStateInterface } from "./types";

export interface ReducerInterface {
  currency: Reducer<CurrencyStateInterface>;
}

const reducer: ReducerInterface = {
  currency: currencySlice.reducer
};

export const store =  configureStore({
  reducer
});

export default store;

export type StateType = ReturnType<typeof store.getState>
