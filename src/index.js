import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import router from "./router";

import { exchangeRatesUpdate } from "./store/actions";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const InitStore = () => {
  const rates = useSelector((state) => state.currency.rates);

  useEffect(() => {
    (async () => {
      let promises = [];

      Object.keys(rates).forEach((key) =>
        promises.push(fetch("https://open.er-api.com/v6/latest/" + key))
      );

      const responses = await Promise.all(promises).catch((err) =>
        console.log(err)
      );

      if (!responses) return;

      promises = responses.map((res) => res.json());

      const results = await Promise.all(promises).catch((err) =>
        console.log(err)
      );

      if (results) {
        const newRates = { ...rates };

        results.forEach((result) => {
          newRates[result.base_code] = {};

          Object.keys(result.rates).forEach((el) =>
            Object.keys(rates).indexOf(el) >= 0
              ? (newRates[result.base_code][el] = result.rates[el])
              : ""
          );
        });

        store.dispatch(exchangeRatesUpdate(newRates));
      }
    })();
  }, []);

  return <></>;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <InitStore />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
