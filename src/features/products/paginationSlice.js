import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: 1,
	perPage: 24,
	total: 0,
	lastPage: 1,
};

const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setPaginationData: (state, action) => {
			state.total = action.payload.total;
			state.lastPage = action.payload.lastPage;
			state.perPage = action.payload.perPage;
		},
	},
});

export const { setPage, setPaginationData } = paginationSlice.actions;
export default paginationSlice.reducer;
