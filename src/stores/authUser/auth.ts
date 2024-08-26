import { createSlice } from "@reduxjs/toolkit";

export const userAuthentication = createSlice({
  name: "user authentication",
  initialState: {
    value: {
      status: false,
      access_token: "",
      refresh_token: "",
    },
  },
  reducers: {
    updateAuthentication: (state, action) => {
      state.value.status = true;
      state.value.access_token = action?.payload?.access_token;
      state.value.refresh_token = action?.payload?.refresh_token;
    },
    clearAuthentication: (state) => {
      state.value.status = false;
      state.value.access_token = "";
      state.value.refresh_token = "";
    },
  },
});

export const { updateAuthentication, clearAuthentication } =
  userAuthentication.actions;

export default userAuthentication.reducer;
