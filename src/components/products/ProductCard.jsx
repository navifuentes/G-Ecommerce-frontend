import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = (pid) => {
    navigate(`/products/${pid}`);
  };
  return (
    <div
      className="flex flex-col items-center ring-2 ring-white/70 rounded-lg bg-slate-600 min-w-1/3 max-w-36 text-center"
    >
      <h3 className="text-xl">{product.title}</h3>
      <img
        className="h-20 sm:h-36"
        src={product.thumbnail || "https://placehold.co/150"}
        alt={product.description || ""}
      />
      <div className="flex flex-col items-center px-1">
        <p className="h-7 overflow-y-hidden">{product.description}</p>
        <span>$ {product.price}</span>
      </div>
      <button
        className="bg-blue-600 ring-white ring-2 px-2 my-1 rounded-full capitalize"
        onClick={() => handleClick(product._id)}
      >
        buy now !
      </button>
    </div>
  );
};

export default ProductCard;
