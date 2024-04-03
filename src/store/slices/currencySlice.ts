import { createSlice } from "@reduxjs/toolkit";
import { CurrencyStateInterface, CurrencyRatesInterface } from "../types";

const initialState: CurrencyStateInterface = {
  rates: {
    USD: {
      RUB: 0
    },
    RUB: {
      USD: 0
    }
  }
};

const exchangeRatesUpdateReducer = (
  state: CurrencyStateInterface,
  action: { payload: CurrencyRatesInterface }
) => {
  state.rates = action.payload;
};

export const currencySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    exchangeRatesUpdate: exchangeRatesUpdateReducer
  }
});

export const { exchangeRatesUpdate } = currencySlice.actions;
