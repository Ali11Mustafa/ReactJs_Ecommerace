import PropTypes from "prop-types";
import { useProducts } from "../hooks/useProducts";

import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductsComponent = () => {
	const { data, isLoading, isError } = useProducts();
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search")?.toLowerCase() || "";
	const price = searchParams.get("price") || "";
	const category = searchParams.get("category") || "";

	if (isLoading)
		return (
			<div>
				<Loading />
			</div>
		);
	if (isError) return <div>Error loading products.</div>;

	const maxPrice = price ? Number(price) : null;

	const filteredProducts = data?.data?.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(search);

		const matchesPrice = maxPrice ? product.price <= maxPrice : true;

		const matchesCategory = product.categories.some(
			(prodCategory) => category === prodCategory.name
		);
		if (category !== "all" && category !== "") {
			return matchesSearch && matchesPrice && matchesCategory;
		} else {
			return matchesSearch && matchesPrice;
		}
	});

	return (
		<div>
			<div className="py-4 border-b-2 my-4">
				<h1 className="text-3xl font-bold">Products</h1>
			</div>
			{/* Conditional Rendering for No Products Found */}
			{filteredProducts.length === 0 ? (
				<div className="text-center py-6">
					<h2 className="text-xl font-semibold">
						No products found on this page.
					</h2>
					<p className="text-gray-500">Try adjusting your search or filters.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
			<Pagination />
		</div>
	);
};

ProductsComponent.propTypes = {
	products: PropTypes.shape({
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
	}).isRequired,
	isLoading: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
};

export default ProductsComponent;
