// Main Imports
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import cartReducer from "./slices/cartSlice";
import sharedSlice from "./slices/shared/sharedSlice";
// Middlewares
import { cartSession } from "./slices/cartMiddleware";
import { langSession } from "./slices/shared/sharedMiddleware";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shared: sharedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSession, langSession),
});
