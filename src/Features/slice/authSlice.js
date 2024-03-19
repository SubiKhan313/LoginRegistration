import { createSlice } from "@reduxjs/toolkit";

const userId = localStorage.getItem("user_id");
const apiToken = localStorage.getItem("api_token");

const initialState = {
  api_token: apiToken ? apiToken : null,
  user_id: userId ? userId : null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.api_token = null;
      state.user_id = null;
    },

    setApiToken: (state, action) => {
      state.api_token = action.payload;
    },

    setUserId: (state, action) => {
      state.user_id = action.payload;
    },
  },
});

export const { logoutSuccess, setApiToken, setUserId } = authSlice.actions;

export default authSlice.reducer;
