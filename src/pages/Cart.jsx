import React from "react";
import CartItem from "../components/cart/CartItem";
import CartForm from "../components/cart/CartForm";
import { useSelector } from "react-redux";

const Cart = ({ notify }) => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="flex sm:min-h-96 items-center justify-evenly ring-white ring-2 rounded-xl text-white sm:m-4">
      <div className="flex flex-col items-center bg-blue-800/50 rounded-3xl">
        <h3 className="text-2xl">Your products: </h3>
        {cart.products.length === 0 ? (
          <span className="bg-slate-600 px-2 rounded-lg">
            {" "}
            No products in cart{" "}
          </span>
        ) : (
          cart.products.map((p) => <CartItem key={p.id} product={p} />)
        )}
      </div>
      <div className="flex flex-col gap-y-2 items-center p-2 ring-slate-600 ring-2 bg-slate-900 rounded-3xl">
        <div className="flex w-full gap-x-2 border-white border-b-2 px-2 justify-center">
          <p>Total items : </p> {cart.products.length}
        </div>
        <div className="flex w-full gap-x-2 border-white border-b-2 px-2 justify-center">
          <p>Your cart total :</p>$ {cart.cartTotal}
        </div>
        <CartForm notify={notify} />
      </div>
    </div>
  );
};

export default Cart;
