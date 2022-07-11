import { AUTH, LOGOUT } from "../constants/actionTypes";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      // localStorage.removeItem('profile');
      return { ...state, authData: null };
    default:
      return state;
  }
};
