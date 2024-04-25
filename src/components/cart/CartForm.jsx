import React from "react";
import swal from "sweetalert";
import { useField } from "../../hooks/useField";
import { useDispatch, useSelector } from "react-redux";
import { purchaseCart } from "../../reducers/cartReducer";

const CartForm = ({ notify }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [address, resetAddress] = useField("text");
  const [number, resetNumber] = useField("number");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObj = {
      addcress: address.value,
      telNumber: number.value,
    };

    if (cart.products.length === 0) {
      notify(
        "Please add some products to the cart to complete purchase!",
        "error"
      );
      return;
    }
    dispatch(purchaseCart(cart.cartId, formObj));
    notify("Purchase completed!", "success");

    resetAddress();
    resetNumber();
  };

  return (
    <form action="submit" className="flex flex-col gap-y-2 mt-4">
      <div className="flex flex-col text-center">
        Address
        <input {...address} className="text-black" />
      </div>
      <div className="flex flex-col text-center">
        Contact Number:
        <input {...number} className="text-black" />
      </div>
      <button
        className="bg-blue-800 rounded-full ring-white ring-2 mt-4"
        onClick={handleSubmit}
      >
        Comprar
      </button>
    </form>
  );
};

export default CartForm;
