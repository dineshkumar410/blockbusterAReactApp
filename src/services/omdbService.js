import axios from "axios";

const API_KEY = "f84fc31d";
const BASE_URL = "https://www.omdbapi.com/";

// Request for search function with type and page number
export const searchMovies = async (query, type = "", page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,
        type,
        page,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching movies");
  }
};

// Request for an individual movie
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: id,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching movie details");
  }
};
