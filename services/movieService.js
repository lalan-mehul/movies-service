const movie = require('../models/movie');

const getMovies = async (searchParams) => {
    try {
        const movies = await movie.getMovies(searchParams);
        return movies;
      } catch (error) {
        throw new Error('Error in getting movies: ' + error.message);
      }
};

module.exports = { getMovies };