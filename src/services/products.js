import axios from "axios";
//const fbaseUrl = "http://localhost:3000/api/products";
const baseUrl = "/api/products";

export const getProducts = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};
export const getProduct = async (pid) => {
  const result = await axios.get(`${baseUrl}/${pid}`);
  return result.data.payload;
};
export const addProduct = async (product) => {
  const result = await axios.post(baseUrl, product);
  return result.data.payload;
};
export const updateProduct = async (pid, update) => {
  const result = await axios.put(`${baseUrl}/${pid}`, update);
  return result.data.payload;
};
