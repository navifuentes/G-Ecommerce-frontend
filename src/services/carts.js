import axios from "axios";
//const fbaseUrl = "http://localhost:3000/api/carts";
const baseUrl = "/api/carts";

export const getCart = async (cid) => {
  const result = await axios.get(`${baseUrl}/${cid}`);
  return result.data;
};

export const addToCart = async (cid, pid, qty) => {
  const result = await axios.put(`${baseUrl}/${cid}/product/${pid}`, {
    quantity: qty,
  });
  return result.data;
};

export const formatedCart = async (cid) => {
  const result = await axios.get(`${baseUrl}/formated/${cid}`);
  return result.data;
};

export const purchase = async (cid, body) => {
  const result = await axios.put(`${baseUrl}/purchase/${cid}`, body);
  return result.data;
};
