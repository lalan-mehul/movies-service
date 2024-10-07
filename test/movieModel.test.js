const sinon = require('sinon');
const proxyquire = require('proxyquire');

let chai; // Declare chai variable
let should; // Declare should variable
let dbMock; // Mocked database module
let movieModel; // Movie model with mocked db

describe('Movie Model Tests', () => {
  before(async () => {
    // Dynamically import chai and set up 'should'
    chai = await import('chai');
    should = chai.should();
  });

  beforeEach(() => {
    // Mock the db module
    dbMock = {
      execute: sinon.stub(), // Ensure execute is a stub function
    };

    // Use proxyquire to inject the mock into the movie model
    movieModel = proxyquire('../model/movieModel', {
      '../config/db': dbMock, // Replace the db module with the mocked one
    });
  });

  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  it('should return an array of movies on successful database query with searchParams', async () => {
    const mockMovies = [
      { id: 1, name: 'Inception', director: 'Christopher Nolan', imdb_score: 8.8 },
      { id: 2, name: 'Interstellar', director: 'Christopher Nolan', imdb_score: 8.6 }
    ];
    
    const searchParams = { name: 'Inception' };

    // Mock the successful response from db.execute
    dbMock.execute.resolves([mockMovies]);

    const movies = await movieModel.getMovies(searchParams); // Pass searchParams
    movies.should.be.an('array');
    movies.length.should.equal(2);
    movies[0].should.have.property('name', 'Inception'); // Changed to name
  });

  it('should throw an error when the database query fails', async () => {
    const searchParams = { name: 'Inception' };

    // Mock the execute method to reject with an error
    dbMock.execute.rejects(new Error('Database query failed'));

    try {
      await movieModel.getMovies(searchParams); // Pass searchParams
    } catch (err) {
      err.message.should.equal('Database query failed');
    }
  });

  it('should build the SQL query with multiple searchParams', async () => {
    const searchParams = {
      name: 'Inception',
      director: 'Nolan',
      imdb_score: 8.8
    };

    // Expected SQL query and values
    const expectedSql = 'SELECT * FROM movies WHERE 1=1 AND name LIKE ? AND director LIKE ? AND imdb_score = ?';
    const expectedValues = ['%Inception%', '%Nolan%', 8.8];

    dbMock.execute.resolves([[]]); // Mock the response

    // Call the function
    await movieModel.getMovies(searchParams);

    // Assert that db.execute was called with the expected SQL and values
    dbMock.execute.calledOnce.should.be.true;
    dbMock.execute.firstCall.args[0].should.equal(expectedSql);
    dbMock.execute.firstCall.args[1].should.deep.equal(expectedValues);
  });
});