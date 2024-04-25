import axios from "axios";
//const fbaseUrl = "http://localhost:3000/api/users";
const baseUrl = "/api/users";

export const logIn = async (formData) => {
  const result = await axios.post(`${baseUrl}/login`, formData);
  return result.data;
};
export const logOut = async () => {
  const result = await axios.get(`${baseUrl}/logout`);
  return result.data;
};
export const current = async () => {
  const result = await axios.get(`${baseUrl}/current`);
  return result.data.payload;
};
export const update = async (uid, update) => {
  const result = await axios.put(`${baseUrl}/${uid}`, update);
  return result.data.payload;
};
