import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../services";
import { LOGIN, ROOT } from "../navigation/Routes";

const AuthenticationContext = createContext();

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("Use inside context provider!");
  }
  return context;
};

export const AuthProvider = (props) => {
  const [connectedUser, setConnectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  const handleLogin = (values) => {
    setLoading(true);

    api
      .signIn(values)
      .then(({ data }) => {
        localStorage.setItem("profile", JSON.stringify(data));
        setConnectedUser(data);
        navigate(ROOT);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("The request was made but no response was received");
        } else {
          setError("Something happened in setting up the request");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSignUp = (values) => {
    setLoading(true);

    api
      .signUp(values)
      .then(({ data }) => {
        localStorage.setItem("profile", JSON.stringify(data));
        setConnectedUser(data);
        navigate(ROOT);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("The request was made but no response was received");
        } else {
          setError("Something happened in setting up the request");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    localStorage.clear();
    setConnectedUser(null);
    navigate(LOGIN);
  };

  const memoedValue = useMemo(
    () => ({
      connectedUser,
      loading,
      error,
      handleLogin,
      handleSignUp,
      handleLogout,
    }),
    [connectedUser, loading, error],
  );

  return (
    <AuthenticationContext.Provider value={memoedValue}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
