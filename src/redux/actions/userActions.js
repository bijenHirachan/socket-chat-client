import axios from "axios";
import { server } from "../../main";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { withCredentials: true, credentials: "include" }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const logout = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "allUsersRequest" });
    const { data } = await axios.get(`${server}/users`, {
      withCredentials: true,
    });
    dispatch({ type: "allUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({ type: "allUsersFail", payload: error.response.data.message });
  }
};
