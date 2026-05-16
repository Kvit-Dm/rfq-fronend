import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ProductsSort } from "@/lib/catalog/filter-products";

export type ProductsFiltersState = {
  search: string;
  categorySlugs: string[];
  producerSlugs: string[];
  certifications: string[];
  sort: ProductsSort;
};

const initialState: ProductsFiltersState = {
  search: "",
  categorySlugs: [],
  producerSlugs: [],
  certifications: [],
  sort: "featured",
};

export const productsFiltersSlice = createSlice({
  name: "productsFilters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const v = action.payload;
      state.categorySlugs = state.categorySlugs.includes(v)
        ? state.categorySlugs.filter((x) => x !== v)
        : [...state.categorySlugs, v];
    },
    toggleProducer(state, action: PayloadAction<string>) {
      const v = action.payload;
      state.producerSlugs = state.producerSlugs.includes(v)
        ? state.producerSlugs.filter((x) => x !== v)
        : [...state.producerSlugs, v];
    },
    toggleCertification(state, action: PayloadAction<string>) {
      const v = action.payload;
      state.certifications = state.certifications.includes(v)
        ? state.certifications.filter((x) => x !== v)
        : [...state.certifications, v];
    },
    setSort(state, action: PayloadAction<ProductsSort>) {
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
} = productsFiltersSlice.actions;
