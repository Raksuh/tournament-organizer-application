import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { addPlayer, removePlayer, deleteTournament } from '../../../actions/tournaments';
import { useHistory } from 'react-router-dom';

import noImage from '../../../images/no-image.svg';
import useStyles from './styles';

const Tournament = ({ tournament, setCurrentTournamentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const isTournamentCreatorConnected =
    user?.result?.googleId === tournament?.createdBy || user?.result?._id === tournament?.createdBy;
  const history = useHistory();

  const Registration = () => {
    return tournament.players.find(
      (player) => player === (user?.result?.googleId || user?.result?._id),
    ) ? (
      <>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          onClick={() => dispatch(removePlayer(tournament._id))}
        >
          <RemoveIcon fontSize='small' />
          &nbsp;Unregister
        </Button>
      </>
    ) : (
      <>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          onClick={() => dispatch(addPlayer(tournament._id))}
        >
          <AddIcon fontSize='small' />
          &nbsp;Register
        </Button>
      </>
    );
  };

  const openTournamentDetails = (e) => {
    console.log(e.target || e.srcElement);
    history.push(`/tournaments/${tournament._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openTournamentDetails}>
        <CardMedia
          className={classes.media}
          image={tournament.selectedFile || noImage}
          title={tournament.location}
        />

        <div className={classes.overlay}>
          <Typography className={classes.bold} variant='h6'>
            {tournament.location}
            {tournament.at && format(parseISO(tournament.at), "' at ' MM/dd/yyyy", { locale: fr })}
          </Typography>

          <Typography className={classes.bold} variant='body1'>
            {tournament.dueDate &&
              format(parseISO(tournament.dueDate), "'Due date on ' MM/dd/yyyy", { locale: fr })}
          </Typography>

          <Typography variant='body2'>
            By {tournament.name} at{' '}
            {format(parseISO(tournament.createdAt), 'MM/dd/yyyy', { locale: fr })}
          </Typography>
        </div>

        {isTournamentCreatorConnected && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTournamentId(tournament._id);
              }}
            >
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}

        <Typography className={classes.title} variant='h5'>
          Tournoi Majeur
        </Typography>

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' gutterBottom>
            Number of players {tournament.players.length ?? 0}
          </Typography>
        </CardContent>
      </ButtonBase>

      {user && (
        <CardActions className={classes.cardActions}>
          <Registration />
          {isTournamentCreatorConnected && (
            <Button
              size='small'
              variant='outlined'
              color='secondary'
              onClick={() => dispatch(deleteTournament(tournament._id))}
            >
              <DeleteIcon fontSize='small' />
              &nbsp;Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default Tournament;
