import React, { useReducer, useEffect } from "react";
import { searchMovies } from "../services/omdbService";
import { Link } from "react-router-dom";
import { initialState, searchReducer } from "../reducers/SearchReducer";

function SearchPage() {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { query, type, movies, page, totalResults, loading, error } = state;

  // Fetch movies whenever query, type, or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      dispatch({ type: "FETCH_MOVIES_START" });

      try {
        const data = await searchMovies(query, type, page);
        if (data.Response === "True") {
          if (page === 1) {
            // First page: replace movies
            dispatch({
              type: "FETCH_MOVIES_SUCCESS",
              payload: { movies: data.Search, totalResults: data.totalResults },
            });
          } else {
            // Additional pages: append new movies to existing list
            dispatch({
              type: "LOAD_MORE_MOVIES",
              payload: { movies: data.Search, totalResults: data.totalResults },
            });
          }
        } else {
          dispatch({ type: "FETCH_MOVIES_FAIL", payload: data.Error });
        }
      } catch (error) {
        dispatch({
          type: "FETCH_MOVIES_FAIL",
          payload: "Failed to fetch movies.",
        });
      }
    };

    fetchMovies();
  }, [query, page, type]);

  // Handle search input change
  const handleSearch = (e) => {
    dispatch({ type: "SET_QUERY", payload: e.target.value });
  };

  // Handle filter type change
  const handleTypeChange = (e) => {
    dispatch({ type: "SET_TYPE", payload: e.target.value });
  };

  // Load more movies
  const loadMoreMovies = () => {
    dispatch({ type: "SET_PAGE", payload: page + 1 });
  };

  return (
    <div className="container h-full mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4 text-[#0d3fa9] placeholder:text-[#FFBF01]">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="border p-2 w-full md:w-2/3"
          placeholder="Search for movies..."
        />

        <select
          value={type}
          onChange={handleTypeChange}
          className="border p-2 w-full md:w-1/3"
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded-sm">
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-80 object-cover"
              />
              <h3 className="text-xl mt-2  text-[#0d3fa9]">{movie.Title}</h3>
              <p className=" text-[#FFBF01]">{movie.Year}</p>
            </Link>
          </div>
        ))}
      </div>

      {loading && <div className="mt-4">Loading...</div>}

      {movies.length < totalResults && !loading && (
        <button
          onClick={loadMoreMovies}
          className="mt-4 bg-[#0d3fa9] text-white px-4 py-2 rounded-md"
        >
          <span className="text-[#FFBF01]">Load More</span>
        </button>
      )}
    </div>
  );
}

export default SearchPage;
