import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  items: [

  ],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.isShow = !state.isShow;
    },
    addToCart: (state, action) => {
      const prevListItem = state.items;
      const item = action.payload;
      const existItem = prevListItem.find((i) => {
        if (i.product.id === item.product.id && i.size === item.size && i.color === item.color) {
          return i;
        }
      })

      if (existItem) {
        const newListItem = prevListItem.map((i) => {
          if (i.product.id === item.product.id && i.size === item.size && i.color === item.color) {
            i.quantity += item.quantity;
            return i;
          } else {
            return i;
          }
        })
        state.items = newListItem;
      } else {
        state.items.push(item);
      }
    },
    addProductQuantity: (state, action) => {
      const indexItem = action.payload.index;
      const quantity = action.payload.quantity;
      const prevListItem = state.items;

      if (quantity < 1) return;

      console.log(indexItem, quantity);
      // Update the quantity the product with index
      const newListItem = prevListItem.map((item, index) => {
        if (index === indexItem) {
          item.quantity = quantity;
          return item;
        } else {
          return item;
        }
      });
      state.items = newListItem;
    },
    removeFromCart: (state, action) => {
      const indexItem = action.payload.index;
      let prevListItem = state.items;
      prevListItem.splice(indexItem, 1);
      state.items = prevListItem;
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, toggleCart, addProductQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;