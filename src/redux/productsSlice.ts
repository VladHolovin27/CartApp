import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { fetchProducts } from "./productsOperators"

export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    image: string
}

interface ProductState {
    products: Product[],
    page: number,
    totalPages: number,
    error: string | null,
    status: "idle" | "succeeded" | "failed" | "loading"
}

const initialState: ProductState = {
    products: [],
    page: 1,
    totalPages: 3,
    error: null,
    status: "idle"
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        addProduct(state, action: PayloadAction<Product[]>) {
            state.products.push(...action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading",
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.products = action.payload
                state.error = null
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Something went wrong"
            })
    },
})

export const { setPage, addProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;