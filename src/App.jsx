import { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";

const API_URL = 'http://www.omdbapi.com?apikey=e76c2580';

function App() {

  const [movies, setMovies] = useState([]);

  async function searchMovies(title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('avengers');
  }, []);

  return (
    <div className="app">
      <h1>Muvie land.</h1>
      <SearchBar searchMovies={searchMovies} />
      {
        movies.length > 0 ? (
          <div className="container">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )

      }
    </div >
  )
}

export default App
