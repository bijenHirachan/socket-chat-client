import { createAction, createReducer } from "@reduxjs/toolkit";

const loadUserRequest = createAction("loadUserRequest");
const loadUserSuccess = createAction("loadUserSuccess");
const loadUserFail = createAction("loadUserFail");

const loginRequest = createAction("loginRequest");
const loginSuccess = createAction("loginSuccess");
const loginFail = createAction("loginFail");

const logoutRequest = createAction("logoutRequest");
const logoutSuccess = createAction("logoutSuccess");
const logoutFail = createAction("logoutFail");

const allUsersRequest = createAction("allUsersRequest");
const allUsersSuccess = createAction("allUsersSuccess");
const allUsersFail = createAction("allUsersFail");

const clearError = createAction("clearError");
const clearMessage = createAction("clearMessage");

export const userReducer = createReducer({}, (builder) => {
  builder

    .addCase(loadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loadUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loginRequest, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
    })
    .addCase(loginFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(logoutRequest, (state) => {
      state.loading = true;
    })
    .addCase(logoutSuccess, (state, action) => {
      state.loading = false;
      state.user = null;
      state.message = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(logoutFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(allUsersRequest, (state) => {
      state.loading = true;
    })
    .addCase(allUsersSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(allUsersFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.message = null;
    });
});
