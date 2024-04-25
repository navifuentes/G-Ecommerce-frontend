import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col text-white bg-add-product bg-cover h-[80vh]">
      <h2 className="bg-black/50 rounded-full my-4 px-4 py-1 self-center  text-3xl">Choose an option :</h2>
      <div className="flex justify-around py-10">
        <div
          onClick={() => navigate("/upload")}
          className="flex flex-col bg-black/50 text-black items-center border-4 border-black rounded-3xl cursor-pointer hover:scale-110"
        >
          <h3 className="text-2xl font-extrabold ">Add product</h3>

          <img
            className="h-64"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fecommerce-outline-version%2F32%2Fadd_product_new_product_item_ecommerceproduct-512.png&f=1&nofb=1&ipt=fee68282904a86f944866e43f390b3ed8b9b7d915d9ab7a986be45402e851a3b&ipo=images"
            alt=""
          />
        </div>
        <div
          onClick={() => navigate("/update")}
          className="flex flex-col bg-black/50 text-black items-center border-4 border-black rounded-3xl cursor-pointer hover:scale-110"
        >
          <h3 className="text-2xl font-extrabold">Update product</h3>

          <img
            className="h-64"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fproducts-icon%2Fproducts-icon-15.jpg&f=1&nofb=1&ipt=ec58ea38a08a25bcd9b536a38785b18f1dd1e9b2e0c8b17ea4d915160fae16d9&ipo=images"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
