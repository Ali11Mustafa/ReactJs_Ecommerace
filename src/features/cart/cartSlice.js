import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 0,
  orderTotal: 0,
};
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      // Validate product.amount and product.price
      const amount = product.amount ?? 1; // Default to 1 if undefined
      const price = product.price ?? 0; // Default to 0 if undefined

      if (isNaN(price) || price < 0) {
        console.error("Invalid product price:", price);
        toast.error("Invalid product price. Please try again.");
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        console.error("Invalid product amount:", amount);
        toast.error("Invalid product amount. Please try again.");
        return;
      }

      // Check if the product is already in the cart
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += amount; // Increment the amount
      } else {
        state.cartItems.push({ ...product, amount }); // Add the product with a valid amount
      }

      // Recalculate cart totals
      state.numItemsInCart = state.cartItems.reduce(
        (total, item) => total + item.amount,
        0
      );
      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to cart");
    },

    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.orderTotal = state.cartTotal;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
