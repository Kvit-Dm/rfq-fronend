import { configureStore } from "@reduxjs/toolkit";

import { productGroupsFiltersSlice } from "@/lib/store/slices/product-groups-filters-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      [productGroupsFiltersSlice.name]: productGroupsFiltersSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
