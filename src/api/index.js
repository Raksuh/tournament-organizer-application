import axios from "axios";

// const API = axios.create({ baseURL: "https://niortgaa-toa-backend.herokuapp.com" });
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

export const fetchTournaments = () => API.get("/tournaments");
export const fetchTournamentsByQuery = (searchQuery) =>
  API.get(
    `/tournaments/search?location=${searchQuery.location || "none"}&year=${
      searchQuery.year || "none"
    }`,
  );
export const createTournament = (newTournament) => API.post("/tournaments", newTournament);
export const fetchTournament = (tournamentId) => API.get(`/tournaments/${tournamentId}`);
export const updateTournament = (tournamentId, tournament) =>
  API.patch(`/tournaments/${tournamentId}`, tournament);
export const addComment = (tournamentId, comment) =>
  API.post(`/tournaments/${tournamentId}/addComment`, { comment });
export const addPlayer = (tournamentId) => API.patch(`/tournaments/${tournamentId}/addPlayer`);
export const removePlayer = (tournamentId) =>
  API.patch(`/tournaments/${tournamentId}/removePlayer`);
export const deleteTournament = (tournamentId) => API.delete(`/tournaments/${tournamentId}`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
