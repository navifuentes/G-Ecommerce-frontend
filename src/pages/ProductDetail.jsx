import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../reducers/cartReducer";

const ProductDetail = ({ notify }) => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const [counter, setCounter] = useState(0);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const product = products.find((p) => p._id === pid);

  const handleSum = () => {
    counter >= 0 && counter < product.stock ? setCounter(counter + 1) : null;
  };
  const handleRest = () => {
    counter > 0 ? setCounter(counter - 1) : null;
  };
  const handleAdd = (cid, pid, qty) => {
    dispatch(updateCart(cid, pid, qty));
    notify("Product added to cart!");
  };

  return (
    <div className="my-10 mx-6 flex self-center items-center bg-slate-200 ring-2 ring-white rounded-xl p-3 text-white">
      <div className="flex flex-col gap-10 items-center mx-auto">
        <img
          className="sm:size-72 self-center rounded-lg shadow-2xl"
          src={product.thumbnail}
          alt={product.description}
        />
        <div className="flex flex-col text-center bg-slate-700 rounded-xl ring-2 ring-slate-900 px-2">
          <p className="text-xl font-bold">{product.title}</p>
          <p>{product.description}</p>
          <p>$ {product.price}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-center p-2 ring-2 ring-white rounded-md bg-slate-700">
        <div className="bg-slate-800/50 px-1 rounded-md">
          <p>Product Owner :</p>
          <p>{product.owner}</p>
        </div>
        <div className="bg-slate-800/50 px-1 rounded-md">
          <p>Code:</p>
          <p>{product.code}</p>
        </div>
        <div className="bg-slate-800/50 px-1 rounded-md">
          <p>Category:</p>
          <p>{product.category}</p>
        </div>
        <div className="bg-slate-800/50 px-1 rounded-md">
          <p>Product Stock :</p>
          <p>{product.stock}</p>
        </div>
        <p className="ring-1 ring-white px-1 rounded-md">
          Total : $ {counter * product.price}
        </p>
        <div className="flex self-center text-sm py-2">
          <button
            className="bg-gray-600 ring-1 ring-white rounded-full px-3"
            onClick={handleRest}
          >
            -
          </button>
          <p className="mx-3 bg-white text-black px-1 rounded-lg">{counter}</p>
          <button
            className="bg-gray-600 ring-1 ring-white rounded-full px-3"
            onClick={handleSum}
          >
            +
          </button>
        </div>
        <button
          className="bg-blue-600 ring-2 ring-white rounded-lg px-2"
          onClick={() => handleAdd(cart.cartId, product._id, counter)}
        >
          Add to cart!
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
