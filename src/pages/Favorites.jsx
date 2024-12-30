import { useSelector } from "react-redux";
import { FavoriteItemsList, SectionTitle } from "../components";

const Favorites = () => {
	const numItemsInFavorites = useSelector(
		(state) => state.favoritesState.numItemsInFavorites
	);

	if (numItemsInFavorites === 0) {
		return <SectionTitle text="Your favorites is empty" />;
	}

	return (
		<>
			<SectionTitle text="Shopping Favorites" />
			<div className="mt-8 grid gap-8 lg:grid-cols-12">
				<div className="lg:col-span-8">
					<FavoriteItemsList />
				</div>
			</div>
		</>
	);
};
export default Favorites;
