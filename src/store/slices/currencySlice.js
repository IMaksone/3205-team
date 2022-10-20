import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "counter",
  initialState: {
    defaultCurrencies: "RUB",
    rates: {
      USD: {
        RUB: 0,
      },
      RUB: {
        USD: 0,
      },
    },
  },
  reducers: {
    exchangeRatesUpdate: (state, action) => {
      state.rates = action.payload;
    },
    changeDefaultCurrencies: (state, action) => {
      state.defaultCurrencies = action.payload;
    },
  },
});

export const { exchangeRatesUpdate, changeDefaultCurrencies } =
  currencySlice.actions;
