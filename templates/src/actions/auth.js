import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../actions/constants";
import Axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../components/util/setAuthToken";

/**
 * REGISTER
 *
 * Accepting params from the UI
 */
export const registerAction =
  ({ name, username, password, phone }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, username, password, phone });
    try {
      const res = await Axios.post("/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUserAction());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };

/**
 * Load User
 * check to see if there is a token, and if yes then put it then gloadbal header
 */
export const loadUserAction = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await Axios.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// LOGIN
export const loginAction =
  ({ username, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });
    try {
      const res = await Axios.post("/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUserAction());
    } catch (error) {
      console.log(error.message);
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: LOGIN_FAILED,
      });
    }
  };
