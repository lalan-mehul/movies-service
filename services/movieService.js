const Movie = require('../models/movie');

const getMovies = async (searchParams) => {
    try {
        const movies = await Movie.getMovies(searchParams);
        return movies;
      } catch (error) {
        throw new Error('Error in getting movies: ' + error.message);
      }
};

module.exports = { getMovies };