import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./router";

import store from "./store";
import { useCurencyRates } from "./store/useSelector/useCurency";
import { useDispatchExchangeRates } from "./store/useDispatch/useCurrencyDispatch";
import { apiGetRates } from "./api";
import useAsyncEffect from "./hooks/useAsyncEffect";

import "./index.css";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  const InitStore = () => {
    const rates = useCurencyRates();
    const dispatchExchangeRates = useDispatchExchangeRates();

    useAsyncEffect(async () => {
      const newRates = await apiGetRates(rates);

      dispatchExchangeRates(newRates);
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
}
