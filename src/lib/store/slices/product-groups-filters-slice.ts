import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ProductGroupsSort } from "@/lib/catalog/filter-product-groups";

export type ProductGroupsFiltersState = {
  search: string;
  categories: string[];
  producers: string[];
  certifications: string[];
  sort: ProductGroupsSort;
};

const initialState: ProductGroupsFiltersState = {
  search: "",
  categories: [],
  producers: [],
  certifications: [],
  sort: "featured",
};

export const productGroupsFiltersSlice = createSlice({
  name: "productGroupsFilters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const v = action.payload;
      state.categories = state.categories.includes(v)
        ? state.categories.filter((x) => x !== v)
        : [...state.categories, v];
    },
    toggleProducer(state, action: PayloadAction<string>) {
      const v = action.payload;
      state.producers = state.producers.includes(v)
        ? state.producers.filter((x) => x !== v)
        : [...state.producers, v];
    },
    toggleCertification(state, action: PayloadAction<string>) {
      const v = action.payload;
      state.certifications = state.certifications.includes(v)
        ? state.certifications.filter((x) => x !== v)
        : [...state.certifications, v];
    },
    setSort(state, action: PayloadAction<ProductGroupsSort>) {
      state.sort = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  toggleCategory,
  toggleProducer,
  toggleCertification,
  setSort,
  resetFilters,
} = productGroupsFiltersSlice.actions;
