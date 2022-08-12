import { AUTH, LOGOUT } from "../constants/actions";
import * as api from "../../services";
import { LOGIN, ROOT } from "../../navigation/Routes";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });

    navigate(ROOT);
  } catch (error) {
    console.log(error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    navigate(LOGIN);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: data });

    navigate(ROOT);
  } catch (error) {
    console.log(error);
  }
};
