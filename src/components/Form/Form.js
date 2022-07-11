import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { createTournament, updateTournament } from "../../actions/tournaments";
import { useNavigate } from "react-router-dom";

const Form = ({ currentTournamentId, setCurrentTournamentId }) => {
  const classes = useStyles();
  const [tournamentData, setTournamentData] = useState({
    location: "",
    at: "",
    dueDate: "",
    players: [],
    vehicules: [],
    playerCount: 0,
    selectedFile: "",
  });
  const tournament = useSelector((state) =>
    currentTournamentId ? state.tournaments.find((t) => t._id === currentTournamentId) : null,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (tournament) setTournamentData(tournament);
  }, [tournament]);

  const clear = () => {
    setCurrentTournamentId(null);
    setTournamentData({
      location: "",
      at: "",
      dueDate: "",
      players: [],
      vehicules: [],
      playerCount: 0,
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTournamentId) {
      dispatch(
        updateTournament(currentTournamentId, { ...tournamentData, name: user?.result?.name }),
      );
    } else {
      dispatch(createTournament({ ...tournamentData, name: user?.result?.name }, navigate));
    }

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentTournamentId ? "Editing" : "Creating"} a Tournament
        </Typography>
        <TextField
          name='location'
          variant='outlined'
          label='Location'
          fullWidth
          value={tournamentData.location}
          onChange={(e) => setTournamentData({ ...tournamentData, location: e.target.value })}
        />
        <TextField
          type='date'
          name='at'
          variant='outlined'
          label='At'
          fullWidth
          value={tournamentData.at}
          onChange={(e) => {
            // const atParsed = parse(e.target.value)
            // setTournamentData({ ...tournamentData, at: atParsed})
            setTournamentData({ ...tournamentData, at: e.target.value });
          }}
        />
        <TextField
          type='date'
          name='dueDate'
          variant='outlined'
          label='Due date'
          fullWidth
          value={tournamentData.dueDate}
          onChange={(e) => {
            // const dueDateParsed = parse(e.target.value)
            // setTournamentData({ ...tournamentData, dueDate: dueDateParsed})
            setTournamentData({ ...tournamentData, dueDate: e.target.value });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setTournamentData({ ...tournamentData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
