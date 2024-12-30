import { Outlet, useNavigation } from "react-router-dom";
import { Loading, Navbar } from "../components";
const HomeLayout = () => {
	const navigation = useNavigation();
	const isPageLoading = navigation.state === "loading";
	return (
		<>
			<Navbar />
			{isPageLoading ? (
				<Loading />
			) : (
				<section className="align-element py-20">
					<Outlet />
				</section>
			)}
		</>
	);
};
export default HomeLayout;
