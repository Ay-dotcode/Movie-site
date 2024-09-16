import { createContext, useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";
import Toggle from './Components/Toggle/Toggle';

const API_URL = `https://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

export const Theme = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  async function searchMovies(title, inputRef) {
    setLoading(true);
    setError("");

    // Close the keyboard by blurring the input field
    if (inputRef && inputRef.current) {
      inputRef.current.blur();
    }

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
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
    searchMovies("movie");

    // Set the theme based on the user's system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes to the system preference
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <nav>
          <Toggle />
        </nav>
        <h1>Muvie Land</h1>
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
