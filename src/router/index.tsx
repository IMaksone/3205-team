import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ExchangeRates from "src/pages/ExchangeRates";
import CurrencyExchange from "src/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CurrencyExchange />
  },
  {
    path: "exchange-rates",
    element: <ExchangeRates />
  }
]);

export default router;