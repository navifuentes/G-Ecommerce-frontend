import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, current, update, create } from "../services/users";

const initialState = null;

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;

export const checkLogged = () => {
  return async (dispatch) => {
    const user = await current();
    dispatch(setUser(user));
  };
};
export const initializeUser = (formData) => {
  return async (dispatch) => {
    await logIn(formData);
    const user = await current();
    dispatch(setUser(user));
    //FRONT TEST
    /* const user = await logIn(formData);
    dispatch(setUser(user)); */
  };
};
export const deleteUser = () => {
  return async (dispatch) => {
    await logOut();
    dispatch(setUser(null));
  };
};
export const updateUser = (uid, body) => {
  return async (dispatch) => {
    const user = await update(uid, body);
    dispatch(setUser(user));
  };
};
export const createUser = (user) => {
  return async () => {
    await create(user);
  };
};

export default userReducer.reducer;
