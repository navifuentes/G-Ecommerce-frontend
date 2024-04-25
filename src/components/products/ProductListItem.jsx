import { useNavigate } from "react-router-dom";

const ProductListItem = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <div className="flex text-black gap-4 bg-slate-200 rounded-lg items-center">
      <div>
        <img
          className="h-44 min-w-44 rounded-lg"
          src={product.thumbnail}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 w-full m-2">
        <p className="bg-black/20 text-3xl font-semibold capitalize">
          {product.title}
        </p>
        <p className="bg-black/20 text-sm">{product.description}</p>
        <p className="bg-black/20 text-sm">on stock: {product.stock}</p>
        <p className="bg-black/20 text-xl font-bold">$ {product.price}</p>
        <p className="bg-black/20 text-sm">Who sell this ? "{product.owner}"</p>

        <button
          className="mx-auto capitalize bg-blue-800 rounded-full text-white ring-2 ring-black px-2"
          onClick={() => handleClick(product._id)}
        >
          buy now !
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
