import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, getYear } from "date-fns";
import { fr } from "date-fns/locale";
import { useParams, useNavigate } from "react-router-dom";

import noImage from "../../../images/no-image.svg";
import useStyles from "./styles";
import { getTournament, getTournamentsByQuery } from "../../../actions/tournaments";
import CommentSection from "./CommentSection";

const TournamentDetails = () => {
  const { tournament, tournaments, isLoading } = useSelector((state) => state.tournaments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTournament(id));
  }, [id]);

  useEffect(() => {
    if (tournament) {
      dispatch(getTournamentsByQuery({ location: "none", year: getYear(new Date()) }));
    }
  }, [tournament]);

  if (!tournament) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  const recommandedTournaments = tournaments.filter(({ _id: id }) => id !== tournament.id);

  const openTournament = (id) => {
    navigate(`/tournaments/${id}`);
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>
            {tournament.location}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {tournament.at && format(parseISO(tournament.at), "' at ' MM/dd/yyyy", { locale: fr })}
          </Typography>
          <Typography variant='h6'>Created by: {tournament.name}</Typography>
          <Typography variant='body1'>
            {format(parseISO(tournament.createdAt), "'Created at : ' MM/dd/yyyy", { locale: fr })}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant='body1'>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection tournament={tournament} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={tournament.selectedFile || noImage}
            alt={tournament.location}
          />
        </div>
        {recommandedTournaments.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant='h5'>
              You might also register:
            </Typography>
            <Divider>
              <div className={classes.recommendedTournaments}>
                {recommandedTournaments.map(
                  ({ name, location, at, dueDate, selectedFile, players, _id: id }) => (
                    <div
                      key={id}
                      className={classes.recommendedTournament}
                      onClick={() => openTournament(id)}
                    >
                      <Typography gutterBottom variant='h6'>
                        {location} -{" "}
                        {at && format(parseISO(at), "' at ' MM/dd/yyyy", { locale: fr })}
                      </Typography>
                      <Typography gutterBottom variant='subtitle2'>
                        {name}
                      </Typography>
                      <Typography gutterBottom variant='subtitle2'>
                        {dueDate && format(parseISO(dueDate), "'At ' MM/dd/yyyy", { locale: fr })}
                      </Typography>
                      <Typography gutterBottom variant='subtitle1'>
                        Number of players {players.length}
                      </Typography>
                      <img src={selectedFile || noImage} alt={location} width='200px' />
                    </div>
                  ),
                )}
              </div>
            </Divider>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default TournamentDetails;
