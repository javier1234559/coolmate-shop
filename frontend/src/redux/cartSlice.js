import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find((x) => x.product === item.product);
      if (existItem) {
        state.items = state.items.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.items = [...state.items, item];
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.product !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;