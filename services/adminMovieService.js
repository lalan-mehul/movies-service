const movie = require('../models/movie');

// Method to add a new movie
async function addMovie(movieData) {
    try {
      const movie = await movie.addMovies(movieData);
      return movie; // Return the added movie object
    } catch (error) {
      throw new Error('Error in MovieService.addMovie: ' + error.message);
    }
  };

 async function deleteMovieById(id) {
    try {
      const deletedCount = await movie.deleteMovie(id);
      return deletedCount;
    } catch (error) {
      throw new Error('Error in MovieService.deleteMovieById: ' + error.message);
    }
  }

  async function updateMovieById(id, updatedMovie) {
    try {
      const updates = await movie.updateMovie(id, updatedMovie);
      return updates;
    } catch (error) {
      throw new Error('Error in MovieService.updateMovieById: ' + error.message);
    }
  }
  
module.exports = {addMovie, deleteMovieById,updateMovieById};