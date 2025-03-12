import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(cartItem => cartItem.product_id === item.product_id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.product_id !== productId);
    },
    updateQuantity: (state, action) => {
      const { product_id, quantity } = action.payload;
      const item = state.cart.find(cartItem => cartItem.product_id === product_id);

      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(cartItem => cartItem.product_id !== product_id);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;
