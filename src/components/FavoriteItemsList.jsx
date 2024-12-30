import { useSelector } from "react-redux";
import FavoriteItem from "./FavoriteItem";

const FavoriteItemsList = () => {
	const favoriteItems = useSelector(
		(state) => state.favoritesState.favoriteItems
	);
	return (
		<>
			{favoriteItems.map((item) => {
				return <FavoriteItem key={item.favoriteID} favoriteItem={item} />;
			})}
		</>
	);
};
export default FavoriteItemsList;
