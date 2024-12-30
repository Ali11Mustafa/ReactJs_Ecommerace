import { useDispatch } from "react-redux";
import { removeItem } from "../features/favorites/favoritesSlice";

const FavoriteItem = ({ favoriteItem }) => {
	const { id, name, price, image } = favoriteItem;
	const dispatch = useDispatch();

	const removeItemFromTheFavorite = () => {
		dispatch(removeItem({ id }));
	};

	return (
		<article
			key={id}
			className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
		>
			{/* IMAGE */}
			<img
				src={`https://ewaiq.com/public/storage/${image}`}
				alt={name}
				className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
			/>
			{/* INFO */}
			<div className="sm:ml-16 sm:w-48">
				{/* TITLE */}
				<h3 className="capitalize font-medium">{name}</h3>
			</div>
			{/* REMOVE */}
			<div className="sm:ml-12">
				<button
					className="mt-2 link link-primary link-hover text-sm"
					onClick={removeItemFromTheFavorite}
				>
					Remove
				</button>
			</div>
			{/* PRICE */}
			<p className="font-medium sm:ml-auto">${price}</p>
		</article>
	);
};

export default FavoriteItem;
