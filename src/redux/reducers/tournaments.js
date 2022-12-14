import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_QUERY,
  CREATE,
  FETCH_TOURNAMENT,
  UPDATE,
  DELETE,
} from "../constants/actions";

export default (state = { isLoading: true, tournaments: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      // TODO add pagination
      return { ...state, tournaments: action.payload };
    case FETCH_BY_QUERY:
      return { ...state, tournaments: action.payload };
    case CREATE:
      return { ...state, tournaments: [...state.tournaments, action.payload] };
    case FETCH_TOURNAMENT:
      return { ...state, tournament: action.payload };
    case UPDATE:
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament._id === action.payload._id) {
            return action.payload;
          }
          return tournament;
        }),
      };
    case DELETE:
      return {
        ...state,
        tournaments: state.tournaments.filter((tournament) => tournament._id !== action.payload),
      };
    default:
      return state;
  }
};
