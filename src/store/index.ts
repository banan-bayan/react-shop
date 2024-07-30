import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import sizesSlice from "./sizesSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    sizes: sizesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch