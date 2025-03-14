import { useState, useEffect } from "react";
import "./MovieCast.css";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cast details");
        }
        const data = await response.json();
        setCast(data.cast.slice(0, 10)); // Get top 10 cast members
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  if (loading) return <div className="cast-loading">Loading cast...</div>;
  if (error) return <div className="cast-error">Error: {error}</div>;
  if (!cast.length)
    return <div className="no-cast">No cast information available</div>;

  return (
    <div className="movie-cast">
      <h2>Cast</h2>
      <div className="cast-grid">
        {cast.map((member) => (
          <div key={member.id} className="cast-card">
            <div className="cast-image">
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                    : "/placeholder-avatar.png"
                }
                alt={member.name}
              />
            </div>
            <div className="cast-info">
              <h3>{member.name}</h3>
              <p>{member.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
