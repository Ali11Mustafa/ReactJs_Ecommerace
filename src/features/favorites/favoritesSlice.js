import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
	favoriteItems: [],
	numItemsInFavorite: 0,
};

const getFavoriteFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("favorite")) || defaultState;
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState: getFavoriteFromLocalStorage(),
	reducers: {
		addItem: (state, action) => {
			const { product } = action.payload;

			// Check if the product is already in the favorites
			const existingItem = state.favoriteItems.find(
				(item) => item.id === product.id
			);
			if (existingItem) {
				toast.info("Item is already in your favorites.");
			} else {
				state.favoriteItems.push(product);
				state.numItemsInFavorite = state.favoriteItems.length;
				toast.success("Item added to favorites.");
			}

			// Save updated state to localStorage
			localStorage.setItem("favorite", JSON.stringify(state));
		},

		removeItem: (state, action) => {
			const { id } = action.payload;
			state.favoriteItems = state.favoriteItems.filter(
				(item) => item.id !== id
			);
			state.numItemsInFavorite = state.favoriteItems.length;
			toast.error("Item removed from favorites.");

			// Save updated state to localStorage
			localStorage.setItem("favorite", JSON.stringify(state));
		},

		clearFavorite: () => {
			localStorage.setItem("favorite", JSON.stringify(defaultState));
			toast.info("All items cleared from favorites.");
			return defaultState;
		},
	},
});

export const { addItem, removeItem, clearFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
