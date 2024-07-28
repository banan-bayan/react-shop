import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../Types";
const initialState: Product[] = [];

const sizesSlice = createSlice({
  name: 'sizes',
  initialState,
  reducers: {
    addSizes: (state, actions) => {
       state = actions.payload
       return state;
    }
  }
})

export const { addSizes } = sizesSlice.actions
export default sizesSlice.reducer