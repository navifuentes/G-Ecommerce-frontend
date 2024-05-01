import React from "react";

const CartItem = ({ product }) => {
  return (
    <div className="flex my-1 gap-x-4 px-10 product-item rounded-3xl">
      <img className="rounded-3xl size-40" src={product.thumbnail} alt="" />
      <div className="ring-white ring-2 rounded-lg my-1 px-1 bg-slate-900">
        <div className="ring-white border-b-[1px]">{product.title}</div>
        <div className="flex gap-x-1 ring-white border-b-[1px]">
          <p>price :</p> $ {product.price}
        </div>
        <div className="flex gap-x-1 ring-white border-b-[1px]">
          <p>quantity :</p> {product.quantity}
        </div>
        <div className="flex gap-x-1">
          <p>total :</p> $ {product.total}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
