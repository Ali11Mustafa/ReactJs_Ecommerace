import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import favoriteReducer from "./features/favorites/favoritesSlice";
import paginationReducer from "./features/products/paginationSlice";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    pagination: paginationReducer,
    favoritesState: favoriteReducer,
  },
});
