import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  calculateTotals,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import {
  getCart,
  getTotalAmount,
  getTotalCount,
} from "../../redux/cartSelectors";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(getCart);
  const totalAmount = useSelector(getTotalAmount);
  const totalCount = useSelector(getTotalCount);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  return (
    <div className="max-w-5xl bg-[#f5f5dc] shadow-xl rounded-lg mx-auto px-12 py-16 mt-20">
      <h2 className="text-3xl text-black font-bold mb-6 text-center">
        🛒 Shopping Cart
      </h2>

      <div className="space-y-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between border p-7 rounded-2xl shadow-sm hover:shadow-md transition gap-x-10 w-full"
          >
            <div className="flex items-center gap-6 w-full sm:w-auto flex-grow">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-xl border"
              />
              <div className="flex flex-col justify-center text-center">
                <h3 className="text-md text-black font-semibold break-words max-w-xs">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">Ціна: ${item.price}</p>
                <p className="text-sm text-gray-600">Кількість: {item.quantity}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold"
              >
                −
              </button>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-4 px-5 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🗑 Видалити
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6 text-right">
        <p className="text-xl text-black font-semibold">
          🧮 Amount of products:
          <span className="text-blue-600 ml-2">{totalCount}</span>
        </p>
        <p className="text-xl text-black font-semibold mt-2">
          💰 Money to pay:
          <span className="text-green-600 ml-2">{Math.round(totalAmount)}$</span>
        </p>
      </div>
    </div>
  );
}
