import { createSlice } from "@reduxjs/toolkit";

type AuthStateModel = {
  isLoggedIn: boolean;
  idToken: string;
};

const initialAuthState = {
  isLoggedIn: false,
  idToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIdToken(state, action) {
      state.idToken = action.payload;
    },
  },
});

const authActions = authSlice.actions;

export { authActions, authSlice, AuthStateModel };
