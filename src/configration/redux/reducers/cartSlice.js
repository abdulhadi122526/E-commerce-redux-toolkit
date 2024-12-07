import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
    newCart: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
      if(itemIndex === -1){
        state.newCart = {
          ...action.payload,
        };
        state.cartItem.push(action.payload);
        state.cartTotalPrice += parseFloat(action.payload.Price.toFixed(2))
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Add to cart"
        });

      }else{
        Swal.fire({
          icon: "info",
          title: "This item is already in your cart",
          text: "Go to Cart",
          
        });
      }
    },

    increaseQuantity: (state, action) => {
     const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
     if(itemIndex === -1){
      state.newCart = {
        ...action.payload,
      };
      state.cartItem.push(action.payload);
     }else{
      state.cartItem[itemIndex].Quantity += 1
      state.cartItem[itemIndex].Price = parseFloat((state.cartItem[itemIndex].Price += state.cartItem[itemIndex].unitPrice).toFixed(2))
      state.cartTotalPrice += parseFloat(state.cartItem[itemIndex].Price.toFixed(2))
           
              
     }
    },
    
    decreaseQuantity: (state, action) => {
     const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
      if(state.cartItem[itemIndex].Quantity > 1){
        state.cartItem[itemIndex].Quantity -= 1;
        state.cartItem[itemIndex].Price = parseFloat((state.cartItem[itemIndex].Price -= state.cartItem[itemIndex].unitPrice).toFixed(2))
        state.cartTotalPrice -= parseFloat(state.cartItem[itemIndex].Price.toFixed(2))
        
        
        return
        
      } 
    },
    
    deleteCartItem: (state, action) => {
     const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
     state.cartItem.splice(itemIndex , 1)
 
    }
     
      
      
     




    
    
    
      
  },
});

export const { addToCart , increaseQuantity , decreaseQuantity , deleteCartItem} = cartSlice.actions;
export default cartSlice.reducer;
