import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Tournament from "./Tournament/Tournament";
import useStyles from "./styles";

const Tournaments = ({ setCurrentTournamentId }) => {
  const classes = useStyles();
  const { tournaments, isLoading } = useSelector((state) => state.tournaments);

  if (!tournaments.length && !isLoading) return "No tournaments";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
      {tournaments.map((tournament) => (
        <Grid key={tournament._id} item xs={12} sm={12} md={6} lg={3}>
          <Tournament tournament={tournament} setCurrentTournamentId={setCurrentTournamentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tournaments;
