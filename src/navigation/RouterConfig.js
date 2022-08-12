import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Tournament from "../pages/Tournament";
import TournamentRegistration from "../pages/TournamentRegistration";
import Tournaments from "../pages/Tournaments";
import PrivateRoute from "./Auth/PrivateRoute";
import { NotFound } from "./NotFound";
import {
  ROOT,
  LOGIN,
  SIGNUP,
  TOURNAMENTS,
  SEARCH_TOURNAMENTS,
  TOURNAMENT_BY_ID,
  TOURNAMENT_REGISTRATION,
} from "./Routes";

export const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route exact path={ROOT} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGNUP} element={<SignUp />} />

        <Route
          path={TOURNAMENTS}
          element={
            <PrivateRoute>
              <Tournaments />
            </PrivateRoute>
          }
        />
        <Route
          path={SEARCH_TOURNAMENTS}
          element={
            <PrivateRoute>
              <Tournaments />
            </PrivateRoute>
          }
        />
        <Route
          path={TOURNAMENT_BY_ID}
          element={
            <PrivateRoute>
              <Tournament />
            </PrivateRoute>
          }
        />
        <Route
          path={TOURNAMENT_REGISTRATION}
          element={
            <PrivateRoute>
              <TournamentRegistration />
            </PrivateRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};
