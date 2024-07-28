import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorProduct, Size } from "../Types";
export interface CartItem {
  cartId: string;
  productId: number;
  productColor: ColorProduct;
  chooseSize: Size;
}

const initialState: CartItem[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, actions: PayloadAction<CartItem>) {
      const isHaveProduct = state.every(
        ({ cartId }) => cartId !== actions.payload.cartId
      );
      if (isHaveProduct) {
        state.push(actions.payload);
      }
    },
    deleteProduct(state, actions: PayloadAction<{ cartId: string }>) {
      return state.filter(({ cartId }) => cartId !== actions.payload.cartId);
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
