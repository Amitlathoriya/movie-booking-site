import { useState, useEffect } from 'react';

export default function Hero() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [newMovie, setNewMovie] = useState({ name: '', price: '' });
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleAddMovie = () => {
    if (!newMovie.name.trim() || !newMovie.price.trim()) {
      alert('Please enter both a movie name and a price.');
      return;
    }

    // Add new movie to state
    setMovies([...movies, { ...newMovie, id: Date.now() }]);
    setNewMovie({ name: '', price: '' }); // Clear inputs
  };

  const handleRemoveMovie = (movieId) => {
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="bg-white">
      {isAdmin ? (
        <div className="admin-panel p-4">
          <h2>Admin Panel</h2>
          <input
            type="text"
            placeholder="Movie Name"
            value={newMovie.name}
            onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
            className="border p-2 m-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={newMovie.price}
            onChange={(e) => setNewMovie({ ...newMovie, price: e.target.value })}
            className="border p-2 m-2"
          />
          <button onClick={handleAddMovie} className="bg-blue-500 text-white px-4 py-2">
            Add Movie
          </button>
        </div>
      ) : null}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Movies</h2>
        <div id="movie-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <h3 className="mt-2 text-sm font-semibold text-gray-700">{movie.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{movie.price}</p>
              {isAdmin && (
                <button
                  className="mt-2 text-sm text-red-500 hover:underline"
                  onClick={() => handleRemoveMovie(movie.id)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
