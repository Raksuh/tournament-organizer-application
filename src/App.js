import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import TournamentDetails from "./components/Tournaments/TournamentDetails/TournamentDetails";

const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Navigate to='/tournaments' replace />} />
          <Route path='/tournaments' exact element={<Home />} />
          <Route path='/tournaments/search' exact element={<Home />} />
          <Route path='/tournaments/:id' exact element={<TournamentDetails />} />
          <Route
            path='/auth'
            exact
            element={<Auth />}
            // render={() => (!user ? <Auth /> : <Navigate to='/tournaments' />)}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
