const { describe, before, beforeEach, afterEach, it } = require('mocha');
const sinon = require('sinon');
const movie = require('../models/movie');
const adminMovieService = require('../services/adminMovieService');

// Declare a variable for expect at the top
let expect;

describe('Admin Movie Service', function () {
  
  // Dynamically import Chai once before all tests
  before(async () => {
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  });

  describe('updateMovieById', function () {
    it('should update a movie by ID', async function () {
      const movieId = 1;
      const updatedMovieData = {
        name: 'Interstellar',
        genre: ['Sci-Fi'],
        director: 'Christopher Nolan',
        imdb_score: 8.6,
        popularity: 9.5
      };
      const updatedMovie = { id: movieId, ...updatedMovieData };
      const updateMovieByIdStub = sinon.stub(movie, 'updateMovie').resolves(updatedMovie);

      const result = await adminMovieService.updateMovieById(movieId, updatedMovieData);
      expect(result).to.deep.equal(updatedMovie);
      expect(updateMovieByIdStub.calledOnceWith(movieId, updatedMovieData)).to.be.true;

      sinon.restore(); // Clean up stub
    });
  });

  describe('addMovie', function () {
    let addMoviesStub;

    beforeEach(() => {
      addMoviesStub = sinon.stub(movie, 'addMovies');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should add a movie', async function () {
      const movieData = { name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 };
      const addedMovie = { id: 1, ...movieData };
      addMoviesStub.resolves(addedMovie);

      const result = await adminMovieService.addMovie(movieData);
      expect(result).to.deep.equal(addedMovie);
      expect(addMoviesStub.calledOnceWith(movieData)).to.be.true;
    });

    it('should throw an error if adding a movie fails', async function () {
      const movieData = { name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 };
      const errorMessage = 'Failed to add movie';
      addMoviesStub.rejects(new Error(errorMessage));

      try {
        await adminMovieService.addMovie(movieData);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).to.equal('Error in MovieService.addMovie: ' + errorMessage);
      }
    });
  });

  describe('deleteMovieById', function () {
    it('should delete a movie by ID', async function () {
      const movieId = 1;
      const deletedCount = 1;
      const deleteMovieStub = sinon.stub(movie, 'deleteMovie').resolves(deletedCount);
  
      const result = await adminMovieService.deleteMovieById(movieId);
      expect(result).to.equal(deletedCount);
      expect(deleteMovieStub.calledOnceWith(movieId)).to.be.true;
  
      sinon.restore(); // Clean up stub
    });
  
    it('should throw an error if deleting a movie fails', async function () {
      const movieId = 1;
      const errorMessage = 'Failed to delete movie';
      sinon.stub(movie, 'deleteMovie').rejects(new Error(errorMessage));
  
      try {
        await adminMovieService.deleteMovieById(movieId);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).to.equal('Error in MovieService.deleteMovieById: ' + errorMessage);
      }
  
      sinon.restore(); // Clean up stub
    });
  });

});