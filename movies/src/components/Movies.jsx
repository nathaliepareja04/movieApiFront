import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Loading } from "./Loading";
import { MovieCard } from "./MovieCard";
import { Search } from "./Search";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [params] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = params.get("q") || "";
    q === "" ? setMovies([]) : getMovies(q);
    setInputSearch(q);
    getMovies();
  }, [params]);

  const getMovies = async (q) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=49565df5&s=${q}`
      );
      setMovies(data.Search);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error en la función getMovies", error.message);
    }
  };

  const search = (e) => {
    if (e.target.value === "") {
      return clean();
    }
    setInputSearch(e.target.value);
    getMovies(e.target.value);
    navigate(`?q=${e.target.value}`);
  };

  const clean = () => {
    setMovies([]);
    setInputSearch("");
    navigate("");
  };

  return (
    <div>
      {/*search*/}
      <Search search={search} inputSearch={inputSearch} />

      {/*movies*/}
      {loading ? (
        <Loading />
      ) : (
        <section className="row">
          {movies ? (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))
          ) : (
            <div className="text-center text-white mt-5">
              <h1>No hay resultado en la busqueda de {inputSearch}</h1>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
