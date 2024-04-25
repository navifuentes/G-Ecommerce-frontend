import { useSelector } from "react-redux";
import ProductCard from "../components/products/ProductCard";
import Sales from "../components/products/Sales";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  if (!products) {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Skeleton className="h-64 w-40" />
          <Skeleton className="h-64 w-40" />
          <Skeleton className="h-64 w-40" />
          <Skeleton className="h-64 w-40" />
          <Skeleton className="h-64 w-40" />
          <Skeleton className="h-64 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col items-center justify-center pb-16">
      {/* MAIN */}
      <h2 className="sm:text-xl  mt-2 mb-5">
        Welcome <span className="text-slate-400">{user.name}</span>!
      </h2>
      <Sales products={products} />
      <div className="flex flex-wrap gap-8 mt-4 mx-auto">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
