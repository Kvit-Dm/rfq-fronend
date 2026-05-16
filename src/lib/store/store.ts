import { configureStore } from "@reduxjs/toolkit";

import { productsFiltersSlice } from "@/lib/store/slices/products-filters-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      [productsFiltersSlice.name]: productsFiltersSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
