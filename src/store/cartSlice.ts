import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemInterface } from "../Types";

const getInitial = () => {
  const cartFromStaorage = localStorage.getItem("cart");
  if (!cartFromStaorage) return [];

  return JSON.parse(cartFromStaorage);
};

const initialState: CartItemInterface[] = getInitial();

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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteProduct(state, actions: PayloadAction<{ cartId: string }>) {
      state = state.filter(({ cartId }) => cartId !== actions.payload.cartId);
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
