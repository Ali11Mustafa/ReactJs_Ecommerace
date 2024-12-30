import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/cart/cartSlice";
import { generateAmountOptions } from "../utils";

const CartItem = ({ cartItem }) => {
	const { cartID, name, price, image, amount } = cartItem;
	const dispatch = useDispatch();

	const removeItemFromTheCart = () => {
		dispatch(removeItem({ cartID }));
	};
	const handleAmount = (e) => {
		dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
	};

	return (
		<article
			key={cartID}
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
			<div className="sm:ml-12">
				{/* AMOUNT */}
				<div className="form-control max-w-xs">
					<label htmlFor="amount" className="label p-0">
						<span className="label-text">Amount</span>
					</label>
					<select
						name="amount"
						id="amount"
						className="mt-2 select select-base select-bordered select-xs"
						value={amount}
						onChange={handleAmount}
					>
						{generateAmountOptions(10)}
					</select>
				</div>
				{/* REMOVE */}
				<button
					className="mt-2 link link-primary link-hover text-sm"
					onClick={removeItemFromTheCart}
				>
					remove
				</button>
			</div>

			{/* PRICE */}
			<p className="font-medium sm:ml-auto">${price}</p>
		</article>
	);
};
export default CartItem;
