import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = (pid) => {
    navigate(`/products/${pid}`);
  };
  return (
    <div className="flex flex-col items-center ring-2 ring-white/70 rounded-lg bg-slate-200 min-w-1/3 max-w-36 text-center">
      <img
        className="h-20 sm:h-36 rounded-lg"
        src={product.thumbnail || "https://placehold.co/150"}
        alt={product.description || ""}
      />
      <div className="flex flex-col overflow-hidden max-w-full items-center px-1 text-black">
        <h3 className="text-xl capitalize max-w-full truncate">
          {product.title} 
        </h3>
        <p className="h-10 max-w-full truncate">{product.description}</p>
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
