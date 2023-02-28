import React from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {

  console.log(movie.Poster)
  return (
    <Link
      to={`/description/${movie.imdbID}`}
      key={movie.imdbID}
      className="col-md-4 my-3 text-decoration-none"
    >
      <div className="card-group h-100">
        <div className="card mt-5 d-flex">
          <div className="card-header">
            {movie.Poster === "N/A" ? (
              <img src="/img/movieimg.png" alt="img" />
            ) : (
              <img src={movie.Poster} alt="img" />
            )}
          </div>

          <div className="card-body">
            <h4>{movie.Title}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};
