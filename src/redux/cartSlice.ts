import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const savedCart = localStorage.getItem("cart");
const parsedCart = savedCart ? JSON.parse(savedCart) : [];


export interface CartInfo {
    id: number,
    title: string,
    price: number,
    quantity: number,
    image: string
}

interface CartState {
    cart: CartInfo[],
    totalCount: number,
    totalAmount: number,
}

const initialState: CartState = {
    cart: parsedCart,
    totalAmount: 0,
    totalCount: 0
}


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeFromCart(state, action: PayloadAction<number>) {
            state.cart = state.cart.filter(cart => cart.id !== action.payload);
        },
        addToCart(state, action: PayloadAction<CartInfo>) {
        const item = action.payload;
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            state.cart.push({ ...item });
        }
    },
        calculateTotals(state) {
        let totalAmount = 0;
        let totalCount = 0;

        state.cart.forEach(item => {
            totalAmount += item.price * item.quantity;
            totalCount += item.quantity;
        });

        state.totalAmount = totalAmount;
        state.totalCount = totalCount;
    },
        increaseQuantity(state, action: PayloadAction<number>) {
            const increased = state.cart.find(cartItem => cartItem.id === action.payload)
            if(increased) {
                increased.quantity += 1
            }
    },
        decreaseQuantity(state, action: PayloadAction<number>) {
            const decreased = state.cart.find(cartItem => cartItem.id === action.payload)
            if(decreased && decreased.quantity > 1) {
                decreased.quantity -= 1
            }
    },
    }
})

export const { addToCart, removeFromCart, calculateTotals, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;