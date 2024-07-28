import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../Types";

const initialState: Product[] = [];
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, actions) {
      state = actions.payload;
      return state
    },
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
