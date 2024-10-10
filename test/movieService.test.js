const { describe, it, before } = require('mocha');
const sinon = require('sinon');
const movie = require('../models/movie');
const movieService = require('../services/movieService');

let expect;

describe('Movie Service', function () {

  // Dynamically import Chai once before all tests
  before(async () => {
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  });

  describe('getMovies', function () {
    it('should get movies successfully', async function () {
      const searchParams = { genre: 'Sci-Fi' };
      const movies = [{ id: 1, name: 'Inception' }, { id: 2, name: 'Interstellar' }];
      const getMoviesStub = sinon.stub(movie, 'getMovies').resolves(movies);

      const result = await movieService.getMovies(searchParams);
      expect(result).to.deep.equal(movies);
      expect(getMoviesStub.calledOnceWith(searchParams)).to.be.true;

      sinon.restore(); // Clean up stub
    });

    it('should throw an error if getting movies fails', async function () {
      const searchParams = { genre: 'Sci-Fi' };
      const errorMessage = 'Failed to get movies';
      sinon.stub(movie, 'getMovies').rejects(new Error(errorMessage));

      try {
        await movieService.getMovies(searchParams);
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).to.equal('Error in getting movies: ' + errorMessage);
      }

      sinon.restore(); // Clean up stub
    });
  });
});