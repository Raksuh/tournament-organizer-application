import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import TournamentDetails from './components/Tournaments/TournamentDetails/TournamentDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <NavBar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/tournaments' />} />
          <Route path='/tournaments' exact component={Home} />
          <Route path='/tournaments/search' exact component={Home} />
          <Route path='/tournaments/:id' exact component={TournamentDetails} />
          <Route
            path='/auth'
            exact
            component={() => (!user ? <Auth /> : <Redirect to='/tournaments' />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
