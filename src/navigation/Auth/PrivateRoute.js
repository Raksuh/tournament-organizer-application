import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../providers/AuthProvider";
import { LOGIN } from "../Routes";

const PrivateRoute = ({ children }) => {
  const { connectedUser } = useAuthenticationContext();

  if (!connectedUser) {
    return (
      <Navigate
        to={{
          pathname: LOGIN,
          state: { prevPath: location.pathname },
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
