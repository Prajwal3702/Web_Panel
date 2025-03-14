import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      <div className="content">
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="info">
          <h1>{movie.title}</h1>
          <div className="meta">
            <span className="release-date">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="runtime">{movie.runtime} min</span>
          </div>
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="additional-info">
            <p>
              <strong>Status:</strong> {movie.status}
            </p>
            <p>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </p>
            <p>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
