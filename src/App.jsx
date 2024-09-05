import React, { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";

const API_URL = `https://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

export const Theme = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  async function searchMovies(title) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") setMovies(data.Search);
      else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
    } catch {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <header className="title">
          <img alt="light theme" className="theme" />
          <h1>Movie Land</h1>
          <div className="titleEmptyy"></div>
        </header>
        <SearchBar searchMovies={searchMovies} />
        {loading ? (
          <div className="loading">
            <h2>Loading...</h2>
          </div>
        ) : error ? (
          <div className="empty">
            <h2>{error}</h2>
          </div>
        ) : (
          <div className="container">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </Theme.Provider>
  );
}

export default App;
