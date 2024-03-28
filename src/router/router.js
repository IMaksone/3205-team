import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { CurrencyExchange, ExchangeRates } from "../pages";

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
