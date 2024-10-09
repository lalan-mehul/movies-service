// tests/movie.test.js

const sinon = require('sinon');
const { Sequelize } = require('sequelize'); // Adjust the path as necessary
const movie = require('../models/movie'); // Adjust the path as necessary

describe('Movie Model', function () {
  let createStub, destroyStub, findAllStub, updateStub;

  let expect; // Declare a variable for expect

  before(async () => {
    // Dynamically import Chai
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect; // Assign dynamically imported expect to the variable
  });

  beforeEach(() => {
    // Mocking the create method
    createStub = sinon.stub(movie, 'create');
    // Mocking the destroy method
    destroyStub = sinon.stub(movie, 'destroy');
    // Mocking the findAll method
    findAllStub = sinon.stub(movie, 'findAll');
    // Mocking the update method
    updateStub = sinon.stub(movie, 'update');
  });

  afterEach(() => {
    sinon.restore(); // Restore original functionality
  });

  it('should add a movie', async function () {
    const movieData = { name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 };
    createStub.resolves(movieData);

    const result = await movie.addMovies(movieData);
    expect(result).to.deep.equal(movieData);
    expect(createStub.calledOnce).to.be.true;
  });

  it('should delete a movie by ID', async function () {
    const movieId = 1;
    destroyStub.resolves(1); // Mocking one record deleted

    const result = await movie.deleteMovie(movieId);
    expect(result).to.equal(1);
    expect(destroyStub.calledOnce).to.be.true;
  });

  it('should fetch movies based on search parameters', async function () {
    const searchParams = { id: 1, name: 'Inception', director: 'Nolan', genre: 'Sci-Fi', imdb_score: 8.8, popularity: 10 };
    const mockMovies = [{ id: 1, name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 }];
    findAllStub.resolves(mockMovies);

    const result = await movie.getMovies(searchParams);
    expect(result).to.deep.equal(mockMovies);
    expect(findAllStub.calledOnce).to.be.true;

    // Verify the whereClause
    const whereClause = findAllStub.getCall(0).args[0].where; // Get the first call arguments

    // Check if whereClause is defined
    expect(whereClause).to.not.be.undefined;

    // Check keys
    expect(whereClause).to.include.keys(['name', 'director', 'genre', 'imdb_score']);

    // Check values
    expect(whereClause.name).to.deep.equal({ [Sequelize.Op.like]: `%${searchParams.name}%` });
    expect(whereClause.director).to.deep.equal({ [Sequelize.Op.like]: `%${searchParams.director}%` });
    expect(whereClause.imdb_score).to.equal(searchParams.imdb_score); // Check that imdb_score is included
    expect(whereClause.popularity).to.equal(searchParams.popularity); // Check that popularity is included
    expect(whereClause.genre).to.be.an('object'); // Check that genre is included
    expect(whereClause.id).to.equal(searchParams.id); // Check that imdb_score is included
  });

  it('should return all movies when no search criteria is provided', async function () {
    const mockMovies = [
      { id: 1, name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 },
      { id: 2, name: 'Interstellar', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.6, popularity: 9 },
    ];
    findAllStub.resolves(mockMovies); // Mocking the return of multiple movies

    const result = await movie.getMovies(); // No searchParams provided
    expect(result).to.deep.equal(mockMovies);
    expect(findAllStub.calledOnce).to.be.true;

    // Verify the whereClause
    const whereClause = findAllStub.getCall(0).args[0].where; // Get the first call arguments

    // Check if whereClause is defined
    expect(whereClause).to.not.be.undefined;

    // Check that whereClause is empty
    expect(Object.keys(whereClause).length).to.equal(0); // Ensure there are no keys in whereClause
  });

  it('should fetch a movie by ID when only id is provided', async function () {
    const searchParams = { id: 1 }; // Only searching by ID
    const mockMovies = [{ id: 1, name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 }];
    findAllStub.resolves(mockMovies);

    const result = await movie.getMovies(searchParams);
    expect(result).to.deep.equal(mockMovies);
    expect(findAllStub.calledOnce).to.be.true;

    // Verify the whereClause
    const whereClause = findAllStub.getCall(0).args[0].where; // Get the first call arguments

    // Check if whereClause is defined
    expect(whereClause).to.not.be.undefined;

    // Check that whereClause only contains id
    expect(whereClause).to.include.keys(['id']);
    expect(whereClause.id).to.equal(searchParams.id);
  });

  it('should fetch movies by director when only director is provided', async function () {
    const searchParams = { director: 'Christopher Nolan' }; // Only searching by director
    const mockMovies = [
      { id: 1, name: 'Inception', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.8, popularity: 10 },
      { id: 2, name: 'Interstellar', genre: ['Sci-Fi'], director: 'Christopher Nolan', imdb_score: 8.6, popularity: 9 },
    ];
    findAllStub.resolves(mockMovies);

    const result = await movie.getMovies(searchParams);
    expect(result).to.deep.equal(mockMovies);
    expect(findAllStub.calledOnce).to.be.true;

    // Verify the whereClause
    const whereClause = findAllStub.getCall(0).args[0].where; // Get the first call arguments

    // Check if whereClause is defined
    expect(whereClause).to.not.be.undefined;

    // Check that whereClause only contains director
    expect(whereClause).to.include.keys(['director']);
    expect(whereClause.director).to.deep.equal({ [Op.like]: `%${searchParams.director}%` });
  });


  it('should update a movie by ID', async function () {
    const movieId = 1;
    const updateData = { name: 'Inception Updated' };
    updateStub.resolves([1, [{ id: 1, ...updateData }]]); // Mocking update

    const result = await movie.updateMovie(movieId, updateData);
    expect(result[0]).to.equal(1); // updated count
    expect(updateStub.calledOnce).to.be.true;
  });
});
