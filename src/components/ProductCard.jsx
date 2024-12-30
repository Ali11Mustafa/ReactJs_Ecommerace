import PropTypes from "prop-types";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem as addToCart } from "../features/cart/cartSlice";
import { addItem as addToFavorites } from "../features/favorites/favoritesSlice";

const ProductCard = ({ product }) => {
	const { name, price, image, id } = product;
	const [heartHovered, setHeartHovered] = useState(false);

	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(
			addToCart({
				product: { ...product, amount: 1, cartID: id },
			})
		);
	};

	const handleAddToFavorites = () => {
		dispatch(
			addToFavorites({
				product: { ...product, favoriteID: id },
			})
		);
	};

	return (
		<div className="relative my-4 flex max-w-xs flex-col overflow-hidden rounded-lg justify-between card w-full shadow-xl hover:shadow-2xl transition duration-300">
			{/* Product Image */}
			<figure className="p-4">
				<Link
					className="relative overflow-hidden rounded-xl"
					to={`/products/${id}`}
				>
					<img
						src={`https://ewaiq.com/public/storage/${image}`}
						alt={`${name} Image`}
					/>
				</Link>
			</figure>

			{/* Product Details */}
			<div className="mt-4 px-5 pb-5">
				<Link to={`/products/${id}`}>
					<h5 className="text-lg tracking-tight card-title">{name}</h5>
				</Link>

				<div className="mt-2 mb-5 flex items-center justify-between card-subtitle">
					<p>
						<span className="text-xl font-bold">${price}</span>
					</p>
					<div className="flex items-center">
						{/* Rating Stars */}
						{[...Array(5)].map((_, index) => (
							<svg
								key={index}
								aria-hidden="true"
								className="h-5 w-5 text-yellow-300 dark:text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
							</svg>
						))}
						<span className="ml-2 rounded bg-yellow-200 text-white dark:text-black px-2.5 py-0.5 text-xs font-semibold">
							5.0
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					{/* Add to Cart Button */}
					<button
						className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
						onClick={handleAddToCart}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						Add to cart
					</button>
					{/* Add to Favorites Button */}
					<button
						onMouseEnter={() => setHeartHovered(true)}
						onMouseLeave={() => setHeartHovered(false)}
						className="focus:outline-none"
						onClick={handleAddToFavorites}
					>
						{heartHovered ? (
							<BsHeartFill className="h-6 w-6" />
						) : (
							<BsHeart className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired,
};

export default ProductCard;
