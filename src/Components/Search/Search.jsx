import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
        );
        if (!response.ok) {
          throw new Error("Search failed");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchMovies();
    }
  }, [query]);

  if (loading) return <div className="loading">Searching...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!movies.length) return <div className="no-results">No movies found</div>;

  return (
    <div className="search-results">
      <h2>Search Results for: {query}</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onError={(e) => {
                e.target.src = "placeholder-image.jpg";
              }}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="release-date">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
