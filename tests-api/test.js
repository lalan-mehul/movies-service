const axios = require('axios');

// Define the base URL of the running service
const baseURL = 'http://localhost:4000'; // Adjust as per your Docker service

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
