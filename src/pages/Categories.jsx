import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductListItem from "../components/products/ProductListItem";

const Categories = () => {
  const products = useSelector((state) => state.products).filter(
    (p) => p.status !== false
  );
  const [filter, setFilter] = useState(undefined);

  useEffect(() => {
    setFilter("all");
  }, []);

  const handleSelect = (e) => {
    setFilter(e.target.value);
  };

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  if (!products) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <p className=" text-white font-semibold">Select a category:</p>
        <select
          onChange={handleSelect}
          value={filter}
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
        {filteredProducts.map((p) => (
          <ProductListItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Categories;

/* import { useSelector } from "react-redux";
import ProductCard from "../components/products/ProductCard";
import { useEffect, useState } from "react";

const Categories = () => {
  const products = useSelector((state) => state.products);
  const [filter, setFilter] = useState(null);
  let filteredProducts = [];

  const handleSelect = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    if (products) {
      let mapedProducts = products.filter((p) => p.category === filter);
      if (mapedProducts.length === 0) {
        filteredProducts = products;
      }
      filteredProducts = mapedProducts;
    }
  }, [filter]);

  if (!products) return <div>Loading...</div>;

  console.log(filteredProducts);

  return (
    <div className="flex flex-col">
      <select
        onChange={handleSelect}
        className="mx-auto my-2 rounded-3xl bg-blue-200 px-2"
      >
        <option value="all">All</option>
        <option value="technology">Technology</option>
        <option value="photography">Photography</option>
        <option value="furniture">Furniture</option>
        <option value="outdoor">Outdoor</option>
      </select>
      <div className="flex justify-center gap-8 mb-14">
        {filter === null || filter == "all"
          ? products.map((p) => <ProductCard product={p} />)
          : filteredProducts.map((p) => <ProductCard product={p} />)}
      </div>
    </div>
  );
};

export default Categories;
 */
