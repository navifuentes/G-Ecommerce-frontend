import { decode } from "../services/users";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";

export const useDecoder = async () => {
  const dispatch = useDispatch();
  const result = await decode();
  console.log("result from hook:", result);
  if (result) {
    dispatch(setUser(result));
    return result;
  }
  dispatch(setUser(null));
  return null;
};
