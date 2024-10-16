import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdbService";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  // Get individual movie details using param passed by router
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (e) {
        setError("Failed to fetch movie details.");
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center pt-[3rem]">
        <img src={movie.Poster} alt={movie.Title} className="w-4rem h-6rem" />
        <div className="flex flex-col justify-between text-[#FFBF01]">
          <h2 className="text-3xl mb-4 text-[#0d3fa9]">
            {movie.Title} ({movie.Year})
          </h2>
          <p>
            <strong className="text-[#0d3fa9]">Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong className="text-[#0d3fa9]">Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong className="text-[#0d3fa9]">Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong className="text-[#0d3fa9]">Ratings:</strong>{" "}
            {movie.Ratings.map((r) => `${r.Source}: ${r.Value}`).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
