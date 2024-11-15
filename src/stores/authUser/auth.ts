import { createSlice } from "@reduxjs/toolkit";
import { auth_user } from "../../types/auth_user/user_profile";

export const userAuthentication = createSlice({
  name: "current-user",
  initialState: {
    value: {
      status: false,
      isLoggedIn: false,
      user: {
      } as auth_user,
      token: ""
    },
  },
  reducers: {
    updateCurrrentAuthUser: (state, action) => {
      state.value.status = true
      state.value.isLoggedIn = true
      state.value.user = action.payload?.user;
      state.value.token = action.payload?.token;
    },
    clearCurrentAuthUser: (state) => {
        state.value.status = false
        state.value.isLoggedIn = false 
        state.value.token = "" 
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const {
    updateCurrrentAuthUser,
    clearCurrentAuthUser,
    updateToken
} = userAuthentication.actions;

export default userAuthentication.reducer;
