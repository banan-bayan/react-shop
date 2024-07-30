import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemInterface } from "../Types";


const initialState: CartItemInterface[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, actions: PayloadAction<CartItemInterface>) {
      const isHaveProduct = state.every(
        ({ cartId }) => cartId !== actions.payload.cartId
      );
      if (isHaveProduct) {
        state.push(actions.payload);

      }
    },
    deleteProduct(state, actions: PayloadAction<{ cartId: string }>) {
      state = state.filter(({ cartId }) => cartId !== actions.payload.cartId);
      return state;
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
