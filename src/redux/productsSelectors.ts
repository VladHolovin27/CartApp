import type { RootState } from "./store";

export const getProducts = (state: RootState) => state.products.products;
export const getStatus = (state: RootState) => state.products.status;
export const getError = (state: RootState) => state.products.error;
export const getPage = (state: RootState) => state.products.page;
export const getTotalPages = (state: RootState) => state.products.totalPages;
