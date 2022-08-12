import { AUTH, LOGOUT } from "../constants/actions";

export default (state = { connectedUser: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, connectedUser: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, connectedUser: null };
    default:
      return state;
  }
};
