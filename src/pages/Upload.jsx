import { useEffect, useRef, useState } from "react";
import { useField } from "../hooks/useField";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../reducers/productsReducer";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Upload = ({ notify }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [formValidation, setFormValidation] = useState(false);
  const [title, setTitle, resetTitle] = useField("text");
  const [description, setDescription, resetDescription] = useField("text");
  const [code, setCode, resetCode] = useField("text");
  const [price, setPrice, resetPrice] = useField("number");
  const [stock, setStock, resetStock] = useField("stock");
  const [category, setCategory] = useState("");

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
  const resetForm = () => {
    resetTitle();
    resetDescription();
    resetCode();
    resetPrice();
    resetStock();
    resetCategory();
    setThumbnail("");
  };
  const handleUploadImage = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const productForm = {
      thumbnail,
      title: title.value,
      description: description.value,
      code: code.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      owner: user.email,
    };

    if (!formValidation) {
      return notify("error with product", "error");
    }
    console.log(productForm);

    resetForm();
    notify("Product added successfully!", "success");

    dispatch(postProduct(productForm));
  };
  const handleFormValidation = () => {
    if (
      thumbnail === "" ||
      title.value === "" ||
      description.value === "" ||
      code.value === "" ||
      price.value === "" ||
      stock.value === "" ||
      category.value === ""
    ) {
      return setFormValidation(false);
    }
    return setFormValidation(true);
  };
  const handleSelect = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div className="pb-14">
      <h2 className="text-center text-white text-3xl">Upload a product:</h2>
      <div className="flex border-2 border-white rounded-3xl my-4 items-center justify-around text-center text-white">
        {thumbnail ? (
          <div className="flex flex-col gap-4">
            <img
              className="size-80 object-fit rounded-3xl"
              src={thumbnail}
              alt="product image"
            />

            <p className="text-small self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        ) : null}
        <form
          action="/api/products"
          method="post"
          encType="multipart/form-data"
          onFocus={handleFormValidation}
        >
          <div className="flex flex-col">
            Product Title:
            <input {...title} className="border-2 border-black text-black" />
          </div>
          <div className="flex flex-col">
            Product Description:
            <input
              {...description}
              className="border-2 border-black text-black"
            />
          </div>
          <div className="flex flex-col">
            Code:
            <input {...code} className="border-2 border-black text-black" />
          </div>
          <div className="flex flex-col">
            Price:
            <input {...price} className="border-2 border-black text-black" />
          </div>
          <div className="flex flex-col">
            Stock:
            <input {...stock} className="border-2 border-black text-black" />
          </div>
          <select className="text-black mt-4 border-2 border-black" onChange={handleSelect}>
            <option value="">--Select a category--</option>
            <option value="photography">Photography</option>
            <option value="technology">Technology</option>
            <option value="furniture">Furniture</option>
            <option value="outdoor">Outdoor</option>
          </select>
          <div className="flex flex-col mt-4">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileRef}
              hidden
              type="file"
              accept="image/*"
            />
            <button
              onClick={handleUploadImage}
              className="rounded-3xl ring-2 ring-white bg-slate-500"
            >
              upload an image
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-800 ring-2 ring-white rounded-full px-4 my-4 text-white disabled:opacity-50 capitalize"
            type="submit"
            disabled={!formValidation}
          >
            upload product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
