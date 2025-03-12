import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

export const rootReducer = combineReducers({
  cart: cartReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;
