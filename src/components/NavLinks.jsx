import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "HOME" },
  { id: 3, url: "products", text: "PRODUCTS" },
  //   { id: 4, url: "cart", text: "CART" },
  //   { id: 5, url: "favorites", text: "FAVORITES" },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
