import React, { useState, useEffect } from "react";
import { Grow, Container, Grid, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from 'react-router'
import { useNavigate } from "react-router";

import { getTournaments, getTournamentsByQuery } from "../../actions/tournaments";
import Tournaments from "../Tournaments/Tournaments";
import Form from "../Form/Form";

import useStyles from "./styles";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search)
// }

const Home = () => {
  const [currentTournamentId, setCurrentTournamentId] = useState(0);
  const dispatch = useDispatch();
  // const query = useQuery()
  const navigate = useNavigate();
  // const page = query.get('page') || 1
  // const searchLocation = query.get('location')
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    dispatch(getTournaments());
  }, [currentTournamentId, dispatch]);

  const searchTournament = () => {
    if (location.trim() || month.trim()) {
      dispatch(
        getTournamentsByQuery({
          location,
          month,
        }),
      );
      navigate(`/tournaments/search?location=${location || "none"}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchTournament();
    }
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Tournaments setCurrentTournamentId={setCurrentTournamentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name='location'
                variant='outlined'
                label='Search tournaments location'
                fullWidth
                value={location}
                onKeyPress={handleKeyPress}
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                name='month'
                variant='outlined'
                label='Search tournaments month'
                fullWidth
                value={month}
                onKeyPress={handleKeyPress}
                onChange={(e) => setMonth(e.target.value)}
              />
              <Button
                onClick={searchTournament}
                className={classes.searchButton}
                variant='contained'
                color='primary'
              >
                Search
              </Button>
            </AppBar>
            <Form
              currentTournamentId={currentTournamentId}
              setCurrentTournamentId={setCurrentTournamentId}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
