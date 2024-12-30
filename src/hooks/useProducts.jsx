import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationData } from "../features/products/paginationSlice";

const fetchProducts = async (page) => {
	try {
		const response = await axios.post(
			`https://ewaiq.com/public/api/v1/products/all?page=${page}`,
			{}
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching data: ", error);
	}
};

export const useProducts = () => {
	const { currentPage } = useSelector((state) => state.pagination);
	const dispatch = useDispatch();

	const { data, isLoading, isError } = useQuery(
		["products", currentPage],
		() => fetchProducts(currentPage),
		{
			onSuccess: (data) => {
				dispatch(
					setPaginationData({
						total: data.total,
						lastPage: data.last_page,
						perPage: data.per_page,
					})
				);
			},
		}
	);

	return { data, isLoading, isError };
};
