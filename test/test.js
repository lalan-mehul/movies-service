const axios = require('axios');
const { expect } = require('chai');

// Define the base URL of the running service
const baseURL = 'http://localhost:4000'; // Adjust as per your Docker service

describe('POST /movies', () => {
    it('should add a new movie', async () => {
        try {
            const response = await axios.post(`${baseURL}/movies`, {
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
    let createdMovieId;

    // First, create a movie that we will delete later
    before(async () => {
        try {
            const response = await axios.post(`${baseURL}/movies`, {
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
            throw new Error('Failed to create movie for deletion test');
        }
    });

    // Test the DELETE endpoint
    it('should delete the movie by ID', async () => {
        try {
            const deleteResponse = await axios.delete(`${baseURL}/movies/${createdMovieId}`);
            
            // Assertions
            expect(deleteResponse.status).to.equal(200);
            expect(deleteResponse.data.message).to.equal('Movie deleted successfully');
        } catch (err) {
            throw new Error('Failed to delete movie');
        }
    });

    // Check that the movie no longer exists
    it('should return 404 for a deleted movie', async () => {
        try {
            const deleteResponse = await axios.get(`${baseURL}/movies/${createdMovieId}`);
            console.log(deleteResponse);
        } catch (err) {
            // The error should be a 404 if the movie no longer exists
            console.log(err)
            expect(err.response.status).to.equal(404);
        }
    });
});
