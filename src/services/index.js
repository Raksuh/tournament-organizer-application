import axios from "axios";

const API = axios.create({ baseURL: "https://niortgaa-toa-backend.herokuapp.com" });
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
export const deleteTournament = (tournamentId) => API.delete(`/tournaments/${tournamentId}`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
