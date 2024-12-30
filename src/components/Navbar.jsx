import { BsCart3, BsHeart } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

import { useSelector } from "react-redux";

const Navbar = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const numItemsInFavorite = useSelector(
    (state) => state.favoritesState.numItemsInFavorite
  );

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          {/* <NavLink
						to="/"
						className="hidden lg:flex btn btn-primary text-3xl items-center"
					>
						C
					</NavLink> */}
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  z-[1] p-5 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* CART LINK */}
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span
                className="badge indicator-item"
                style={{ backgroundColor: "#ecb788", color: "#fffff" }}
              >
                {numItemsInCart || 0}
              </span>
            </div>
          </NavLink>
          {/* FAVORITE LINK */}
          <NavLink
            to="/favorites"
            className="btn btn-ghost btn-circle btn-md ml-4"
          >
            <div className="indicator">
              <BsHeart className="h-6 w-6" />
              <span
                className="badge indicator-item"
                style={{ backgroundColor: "#ecb788", text: "#fffff" }}
              >
                {numItemsInFavorite || 0}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
