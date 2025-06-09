import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./productsSlice";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async() => {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data as Product[];
    }
)