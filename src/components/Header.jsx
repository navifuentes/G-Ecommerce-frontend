import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../reducers/userReducer";
import { initializeCart } from "../reducers/cartReducer";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [show, setShow] = useState(false);
  const visibility1 = show ? "hidden" : "";
  const visibility2 = show ? "" : "hidden";
  const rounded = show ? "rounded-3xl" : "rounded-full";

  useEffect(() => {
    dispatch(initializeCart(user.cart));
  }, []);

  return (
    <div className="sticky top-0 z-10">
      {/* LARGE QUERY */}
      <nav className=" text-white md:text-2xl hidden sm:flex justify-between gap-x-8 bg-sky-950/80 backdrop-blur-sm border-b border-white-900/10 sm:px-10">
        <Link className="self-center" to="/">
          <p className="text-white flex flex-col sm:block">
            Generic
            <span className="text-black sm:ml-2">E-Commerce</span>
          </p>
        </Link>

        <div className="flex flex-col pt-2">
          <div className="relative flex items-center mb-2">
            <input
              className="mx-auto border-2 border-black text-black"
              type="search"
            />
            <FaSearch className="absolute right-8 text-black" />
          </div>
          <div className="flex self-end gap-x-6">
            <Link className="hover:opacity-40" to="/">
              HOME
            </Link>
            <Link className="hover:opacity-40" to="/categories">
              CATEGORIES
            </Link>
            <Link className="hover:opacity-40" to="/menu">
              PANEL
            </Link>
          </div>
        </div>
        <div className="relative self-center flex gap-x-2">
          <div className="text-sm">
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover mx-auto cursor-pointer"
                src={user.avatar}
                alt="profile picture"
              />
            </Link>
            <button onClick={() => dispatch(deleteUser())}>Log Out</button>
          </div>
          <div className="mx-3">
            <div className="absolute right-0 text-xs font-bold ring-1 ring-red-600 rounded-tr-full rounded-tl-full rounded-br-full bg-red-600 px-1">
              {cart ? cart.products.length : 0}
            </div>
            <Link className="text-3xl" to="/cart">
              &#128722;
            </Link>
          </div>
        </div>
      </nav>
      {/* SMALL QUERY */}
      <nav
        className={`sm:hidden bg-black/50 ${rounded} px-20 py-1 mt-[0.25em] ring-2 ring-white/30`}
      >
        <div className="flex items-center gap-x-10">
          <button
            className={`text-white text-3xl ${visibility1}`}
            onClick={() => setShow(!show)}
          >
            &#9776;
          </button>
          <button
            className={`text-white text-3xl ${visibility2}`}
            onClick={() => setShow(!show)}
          >
            &#9932;
          </button>
        </div>
        <div
          className={`transition-all ease-in duration-500 flex flex-col text-white text-3xl items-center gap-y-2 py-4 ${visibility2}`}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/bestiary"}>Bestiary</Link>
          <Link to={"/map"}>Map</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
