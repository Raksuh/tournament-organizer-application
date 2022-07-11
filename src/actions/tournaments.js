import * as api from "../api";
import {
  FETCH_ALL,
  FETCH_BY_QUERY,
  CREATE,
  FETCH_TOURNAMENT,
  UPDATE,
  ADD_COMMENT,
  ADD_PLAYER,
  REMOVE_PLAYER,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export const getTournaments = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchTournaments();
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTournamentsByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchTournamentsByQuery(searchQuery);
    dispatch({ type: FETCH_BY_QUERY, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTournament = (newTournament, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createTournament(newTournament);

    navigate(`/tournaments/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getTournament = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchTournament(id);

    dispatch({ type: FETCH_TOURNAMENT, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateTournament = (id, tournament) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updateTournament(id, tournament);
    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (tournamentId, comment) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.addComment(tournamentId, comment);

    dispatch({ type: ADD_COMMENT, payload: data });
    dispatch({ type: END_LOADING });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTournament = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    await api.deleteTournament(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const addPlayer = (tournamentId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.addPlayer(tournamentId);
    dispatch({ type: ADD_PLAYER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const removePlayer = (tournamentId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.removePlayer(tournamentId);
    dispatch({ type: REMOVE_PLAYER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
