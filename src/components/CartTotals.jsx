import { useSelector } from "react-redux";

const CartTotals = () => {
  const { cartTotal, shipping, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">${cartTotal}</span>
        </p>
        {/* SHIPPING */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">$0</span>
        </p>
        {/* Tax */}
        {/* Order Total */}
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Order Total</span>
          <span className="font-medium">${orderTotal}</span>
        </p>
      </div>
    </div>
  );
};
export default CartTotals;
