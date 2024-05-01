import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductListItem from "../components/products/ProductListItem";

const Categories = () => {
  const products = useSelector((state) => state.products);

  const filteredProducts = products
    ? products.filter((p) => p.status !== false)
    : [];
  const [prodFilter, setProdFilter] = useState(undefined);

  useEffect(() => {
    setProdFilter("all");
  }, []);

  const handleSelect = (e) => {
    setProdFilter(e.target.value);
  };

  if (!products) return <div>Loading...</div>;

  const categoryProducts =
    prodFilter === "all"
      ? filteredProducts
      : filteredProducts.filter((p) => p.category === prodFilter);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <p className=" text-white font-semibold">Select a category:</p>
        <select
          onChange={handleSelect}
          value={prodFilter}
          className="mx-auto my-2 rounded-3xl bg-blue-200 px-2"
        >
          <option value="all">All</option>
          <option value="technology">Technology</option>
          <option value="photography">Photography</option>
          <option value="furniture">Furniture</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>
      <div className="flex flex-col justify-center gap-8 mb-14 min-w-3/4">
        {categoryProducts.map((p) => (
          <ProductListItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
