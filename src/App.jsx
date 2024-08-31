import { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";

const API_URL = `http://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchMovies(title) {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === 'True')
        setMovies(data.Search);
      else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchMovies('avengers');
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
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
            movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
