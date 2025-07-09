import { createSlice } from "@reduxjs/toolkit";

// Initial state for cart
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart (if exists, increase quantity)
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Remove product from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    // Increase quantity
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Decrease quantity (remove if 1)
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    // Clear cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
