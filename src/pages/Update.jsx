import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks/useField";
import { putProduct } from "../reducers/productsReducer";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Update = ({ notify }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [product, setProduct] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [thumbnail, setThumbnail] = useState(undefined);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const ownedProducts = products.filter((p) => p.owner === user.email);
  const [title, setTitle, resetTitle] = useField("text");
  const [description, setDescription, resetDescription] = useField("text");
  const [stock, setStock, resetStock] = useField("number");
  const [price, setPrice, sresetPrice] = useField("number");

  // Firebase storage
  /*  allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
    }*/

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    setTitle(product.title);
    setDescription(product.description);
    setStock(product.stock);
    setPrice(product.price);
  }, [product]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setThumbnail(downloadUrl);
        });
      }
    );
  };

  const handleSelect = (e) => {
    if (e.target.value === "") return null;
    setProduct(products.find((p) => p._id === e.target.value));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const update = {
      title: title.value,
      description: description.value,
      stock: stock.value,
      price: price.value,
      thumbnail: thumbnail || product.thumbnail,
    };

    notify("Product updated successfully!", "success");

    dispatch(putProduct(product._id, update));
  };

  if (ownedProducts.length === 0) return <div>No products</div>;

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-white text-3xl">Update a product :</h2>
      <div className="flex gap-4 self-center my-4">
        <span className="text-white font-bold">
          Select a product to update :
        </span>
        <select onChange={handleSelect}>
          <option value="">--choose a product--</option>
          {ownedProducts.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-20 border-2 border-white rounded-3xl my-4 text-center text-white items-center sm:justify-center">
        <div className="m-2">
          <img
            className="max-h-64 min-h-60 rounded-3xl"
            src={
              thumbnail ||
              product.thumbnail ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fplaceholder-image-icon%2Fplaceholder-image-icon-19.jpg&f=1&nofb=1&ipt=04215fddeda235d34ebda5bccafb91abb3bc5e06caaf3f5f1e935ca0cb406648&ipo=images"
            }
            alt={product.description || ""}
          />
          <button className="my-4 px-2 rounded-3xl ring-2 ring-white bg-slate-500">
            Change image
          </button>
        </div>
        <form className="flex flex-col gap-2 mb-2" action="">
          <div className="flex flex-col">
            Title:
            <input {...title} className="border-black border-2 text-black" />
          </div>
          <div className="flex flex-col">
            Description:
            <input
              {...description}
              className="border-black border-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            Stock:
            <input {...stock} className="border-black border-2 text-black" />
          </div>
          <div className="flex flex-col">
            Price:
            <input {...price} className="border-black border-2 text-black" />
          </div>
          <button
            className="capitalize bg-blue-800 rounded-full ring-2 ring-white px-2 my-2"
            onClick={handleUpdate}
          >
            update product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
