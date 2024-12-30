import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemsList, CartTotals, SectionTitle } from "../components";

const Cart = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          <Link
            to="#"
            className="btn btn-block mt-8"
            style={{
              backgroundColor: "#a67a53",
              borderColor: "#a67a53",
              color: "#ffff",
            }}
          >
            Proceed to checkout
          </Link>
          <Link
            to="/products"
            className="btn btn-block mt-2"
            style={{
              backgroundColor: "#a67a53",
              borderColor: "#a67a53",
              color: "#ffff",
            }}
          >
            Go back to shopping
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
