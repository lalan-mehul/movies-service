const axios = require('axios');
const { describe, before, it } = require('mocha'); // Import the testing framework

// Define the base URL of the running service
const baseURL = 'http://localhost:4000'; // Localhost
//const baseURL = 'http://ec2-13-232-48-79.ap-south-1.compute.amazonaws.com:4000';

describe('POST /movies', () => {
    let chai; // Declare chai variable
    let expect; // Declare expect variable

    before(async () => {
        // Dynamically import chai and set up 'expect'
        chai = await import('chai');
        expect = chai.expect;
    });

    it('should add a new movie', async () => {
        try {
            const response = await axios.post(`${baseURL}/admin/movies`, {
                name: 'Inception',
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 88,
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(response.status).to.equal(201);
            expect(response.data.message).to.equal('Movie added successfully');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('add without name should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 88,
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"name" is required');
        }
    });

    it('add without genre should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 88,
                name: 'Inception'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"genre" is required');
        }
    });

    it('add with name greater than 100 characters should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 88,
                name: 'FyROgMYcHzhBJOdGnFhlWVmKfoJljWPczxsAkXPybWRgGhlHNDZkEjNVnEzoetiztPTJolBUMqcRdlFcpfHEvXuzNTXWQwDdDlUlxwvkqMzEkARvJMFLUrvK',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"name" length must be less than or equal to 100 characters long');
        }
    });

    it('add with popularity as non number should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: "88a",
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be a number');
        }
    });

    it('add with popularity as negative number should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: -88,
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be greater than or equal to 0');
        }
    });

    it('add with popularity as greater than 100 should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 101,
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be less than or equal to 100');
        }
    });

    it('add with popularity as float should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 88.5,
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be an integer');
        }
    });

    it('add with popularity as string should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: '88',
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be a number');
        }
    });

    it('add with imdb_score as non number should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: "8.8a",
                popularity: 88,
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"imdb_score" must be a number');
        }
    });

    it('add with imdb_score as negative number should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: -8.8,
                popularity: 88,
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"imdb_score" must be greater than or equal to 0');
        }
    });

    it('add with imdb_score as greater than 10 should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 11,
                popularity: 88,
                name: 'Inception',
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"imdb_score" must be less than or equal to 10');
        }
    });

    it('add with genre as string should give bad request', async () => {
        try {
            await axios.post(`${baseURL}/admin/movies`, {
                director: 'Christopher Nolan',
                imdb_score: 8.8,
                popularity: 88,
                name: 'Inception',
                genre: 'Action'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('"genre" must be an array');
        }
    });

});


describe('DELETE /movies/:id', () => {
    let chai; // Declare chai variable
    let expect; // Declare expect variable
    let createdMovieId;

    before(async () => {
        // Dynamically import chai and set up 'expect'
        chai = await import('chai');
        expect = chai.expect;
    });

    // First, create a movie that we will delete later
    before(async () => {
        try {
            const response = await axios.post(`${baseURL}/admin/movies`, {
                name: 'The Matrix',
                director: 'Wachowskis',
                imdb_score: 8.7,
                popularity: 87,
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            createdMovieId = response.data.id;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to create movie for deletion test');
        }
    });

    // Test the DELETE endpoint
    it('should delete the movie by ID', async () => {
        try {
            const deleteResponse = await axios.delete(`${baseURL}/admin/movies/${createdMovieId}`);

            // Assertions
            expect(deleteResponse.status).to.equal(200);
            expect(deleteResponse.data.message).to.equal('Movie deleted successfully');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete movie');
        }
    });

    // Check that the movie no longer exists
    it('should return 404 for a deleted movie', async () => {
        try {
            await axios.get(`${baseURL}/movies/${createdMovieId}`);
        } catch (err) {
            // The error should be a 404 if the movie no longer exists
            expect(err.response.status).to.equal(404);
        }
    });

    it('should return 400 if id is not integer', async () => {
        try {
            await axios.delete(`${baseURL}/admin/movies/abc`);
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('ID parameter must be a number');
        }
    });

    it('should return 404 if movie does not exist', async () => {
        try {
            await axios.delete(`${baseURL}/admin/movies/999999`);
        } catch (err) {
            expect(err.response.status).to.equal(404);
            expect(err.response.data.message).to.equal('Movie with the id 999999 not found');
        }
    });

    it('should return 400 if id is negative', async () => {
        try {
            await axios.delete(`${baseURL}/admin/movies/-1`);
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('ID parameter must be a positive number');
        }
    });

});

describe('PATCH /movies/:id', () => {
    let chai; // Declare chai variable
    let expect; // Declare expect variable

    before(async () => {
        // Dynamically import chai and set up 'expect'
        chai = await import('chai');
        expect = chai.expect;
    });

    it('patch should fail if the movie ID is less than 0', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/-1`);
        } catch (err) {
            expect(err.status).to.equal(400);
            expect(err.response.data.error).to.equal('ID parameter must be a positive number');}
    });

    it('patch should return 400 if id is not integer', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/abc`);
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('ID parameter must be a number');}
    });

    it('patch should return 404 if movie does not exist', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/999999`,{
                imdb_score: 9.0,
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            expect(err.response.status).to.equal(404);
            expect(err.response.data.message).to.equal('Movie with the id 999999 not found or it doesn\'t need any updates');
        }
    });

    it('patch should return 400 if no data is provided', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/1`);
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('"value" must contain at least one of [name, director, imdb_score, genre, popularity]');
        }
    });

    it('patch should return 400 if name is empty', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/1`, {
                name: '',
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('"name" is not allowed to be empty');
        }
    });

    it('patch should return 400 if genre is empty', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/1`, {
                genre: [],
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('"genre" must contain at least 1 items');
        }
    });

    it('patch should return 400 if name is greater than 100 characters', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/1`, {
                name: 'FyROgMYcHzhBJOdGnFhlWVmKfoJljWPczxsAkXPybWRgGhlHNDZkEjNVnEzoetiztPTJolBUMqcRdlFcpfHEvXuzNTXWQwDdDlUlxwvkqMzEkARvJMFLUrvK',
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('"name" length must be less than or equal to 100 characters long');
        }
    });

    it('patch should return 400 if popularity is negative', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/1`, {
                popularity: -1,
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be greater than or equal to 0');
        }
    });

    it('patch should return 400 if popularity is greater than 100', async () => {
        try {
            await axios.patch(`${baseURL}/admin/movies/1`, {
                popularity: 101,
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            expect(err.response.status).to.equal(400);
            expect(err.response.data.error).to.equal('"popularity" must be less than or equal to 100');
        }
    });

});


describe('Add, Get, Update, and Delete Movie API Test', () => {
    let chai; // Declare chai variable
    let expect; // Declare expect variable
    let createdMovieId;

    before(async () => {
        // Dynamically import chai and set up 'expect'
        chai = await import('chai');
        expect = chai.expect;
    });

    // Step 1: Add a new movie
    it('should add a new movie', async () => {
        try {
            const addResponse = await axios.post(`${baseURL}/admin/movies`, {
                name: 'The Matrix',
                director: 'Wachowskis',
                imdb_score: 8.7,
                popularity: 87,
                genre: ['Action', 'Sci-Fi']
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Assuming the response contains the movie's ID
            createdMovieId = addResponse.data.id;  // Replace with actual response data structure
            expect(addResponse.status).to.equal(201);
            expect(addResponse.data.message).to.equal('Movie added successfully');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to add movie');
        }
    });

    // Step 2: Get the newly added movie to verify creation
    it('should get the newly added movie', async () => {
        try {
            const getResponse = await axios.get(`${baseURL}/movies?id=${createdMovieId}`);

            expect(getResponse.status).to.equal(200);
            expect(getResponse.data[0].name).to.equal('The Matrix');
            expect(getResponse.data[0].director).to.equal('Wachowskis');
        } catch (err) {
            console.log(err);
            throw new Error('Failed to get the newly added movie');
        }
    });

    // Step 3: Update the added movie
    it('should update the newly added movie', async () => {
        try {
            const updateResponse = await axios.patch(`${baseURL}/admin/movies/${createdMovieId}`, {
                imdb_score: 9.0,
                director: 'The Wachowskis'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            expect(updateResponse.status).to.equal(200);
            expect(updateResponse.data.message).to.equal('Movie updated successfully');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update movie');
        }
    });

    // Step 4: Delete the updated movie
    it('should delete the newly updated movie', async () => {
        try {
            const deleteResponse = await axios.delete(`${baseURL}/admin/movies/${createdMovieId}`);

            expect(deleteResponse.status).to.equal(200);
            expect(deleteResponse.data.message).to.equal('Movie deleted successfully');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete movie');
        }
    });

    // Step 5: Verify the movie is deleted by getting it and expecting a 404
    it('should return 404 when trying to get the deleted movie', async () => {
        try {
            await axios.get(`${baseURL}/admin/movies/${createdMovieId}`);
        } catch (err) {
            // The error should be a 404 if the movie no longer exists
            expect(err.response.status).to.equal(404);
        }
    });
});
