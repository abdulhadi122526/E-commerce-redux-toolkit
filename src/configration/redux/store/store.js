import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "../reducers/cartSlice"


export const store = configureStore ({
    reducer: {
        cart: cartReducers,
    },
   davTools: true,

})
