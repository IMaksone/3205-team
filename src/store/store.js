import { configureStore } from "@reduxjs/toolkit";

import { currencySlice } from "./slices";

export default configureStore({
  reducer: {
    currency: currencySlice.reducer,
  },
});
