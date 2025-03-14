import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Upcoming.css";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
      }
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="upcoming">
      <h2>Upcoming Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="release-badge">
                {new Date(movie.release_date).toLocaleDateString()}
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="overview">{movie.overview.slice(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
