import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).items
      : [],
    total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0,
    kdv: 8,
  },
  reducers: {
    addProducts: (state, action) => {
      const fincCart = state.items.find(
        (item) => item._id === action.payload._id
      );
      const priceToUse = action.payload.disCount
        ? Number(action.payload.disCount)
        : Number(action.payload.price);
      if (fincCart) {
        fincCart.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += priceToUse;
    },
    deleteProducts: (state, action) => {
      const productToDelete = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (productToDelete) {
        const priceToUse = productToDelete.disCount
          ? Number(productToDelete.disCount)
          : Number(productToDelete.price);
        state.total -= priceToUse * productToDelete.quantity;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    increase: (state, action) => {
      const cartItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      const priceToUse = cartItem.disCount
        ? Number(cartItem.disCount)
        : Number(cartItem.price);
      if (cartItem) {
        cartItem.quantity += 1;
        state.total += priceToUse;
      }
    },
    decrease: (state, action) => {
      const cartItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      const priceToUse = cartItem.disCount
        ? Number(cartItem.disCount)
        : Number(cartItem.price);
      if (cartItem) {
        cartItem.quantity -= 1;
        state.total -= priceToUse;
        if (cartItem.quantity === 0) {
          state.items = state.items.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
    },
  },
});

export const { addProducts, deleteProducts, increase, decrease } =
  cartSlice.actions;

export default cartSlice.reducer;