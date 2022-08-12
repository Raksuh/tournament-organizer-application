import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { getTournament } from "../redux/actions/tournaments";

import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import noImage from "../assets/images/no-image.svg";

const Tournament = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tournament, isLoading } = useSelector((state) => state.tournaments);

  useEffect(() => {
    dispatch(getTournament(id));
  }, [id]);

  const handleClickGoBack = () => {
    navigate(-1);
  };

  if (!tournament) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Grid container spacing={3} sx={{ m: 2 }}>
      <Grid item xs={1}>
        <Button
          onClick={() => handleClickGoBack()}
          startIcon={<ArrowBack fontSize='large' />}
        ></Button>
      </Grid>
      <Grid item xs={11}>
        <Typography component='h1' variant='h4'>
          {tournament.location}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid item container>
          <Grid item xs={3}>
            <img
              src={tournament.selectedFile || "https://picsum.photos/150/150" || noImage}
              alt={tournament.location}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant='body2' component='pre'>
              {JSON.stringify(tournament, undefined, "\t")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tournament;
