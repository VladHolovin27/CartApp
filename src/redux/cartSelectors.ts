import type { RootState } from "./store";

export const getCart = (state: RootState) => state.cart.cart;
export const getTotalAmount = (state: RootState) => state.cart.totalAmount;
export const getTotalCount = (state: RootState) => state.cart.totalCount;
