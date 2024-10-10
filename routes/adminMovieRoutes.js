const express = require('express')
const { createMovie, removeMovie, updateMovie } = require('../controllers/adminMovieController');

const router = express.Router()

const Joi = require('joi');

const addMovieSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    director: Joi.string().min(1).max(100).required(),
    imdb_score: Joi.number().min(0).max(10).required(),
    genre: Joi.array().items(Joi.string().min(1)).min(1).required(),
    popularity: Joi.number().min(0).max(100).required(),
});

router.post('/', (req, res) => {
    const { error, value } = addMovieSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const movieDetails = {
        name: value.name,
        director: value.director,
        imdb_score: value.imdb_score,
        genre: value.genre,
        popularity: value.popularity,
    };
    createMovie(req, res, movieDetails);
});

// Middleware to validate id parameter
function validateId(req, res, next) {
    const { id } = req.params;
    // the request doesn't reach update/delete endpoint if id is not provided
    // so the first if condition is not necessary
    if (!id) {
        return res.status(400).json({ error: 'ID parameter is required' });
    }
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID parameter must be a number' });
    }
    if (id < 0) {
        return res.status(400).json({ error: 'ID parameter must be a positive number' });
    }
    next();
}

// Delete movie endpoint
router.delete('/:id', validateId, removeMovie);


const updateMovieSchema = Joi.object({
    name: Joi.string().min(1).max(100),
    director: Joi.string().min(1).max(100),
    imdb_score: Joi.number().min(0).max(10),
    genre: Joi.array().items(Joi.string().min(1)).min(1),
    popularity: Joi.number().min(0).max(100),
}).or('name', 'director', 'imdb_score', 'genre', 'popularity');

router.patch('/:id', validateId,
    (req, res) => {
        const { error, value } = updateMovieSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const movieDetails = {
            name: value.name,
            director: value.director,
            imdb_score: value.imdb_score,
            genre: value.genre,
            popularity: value.popularity,
        };
    
    updateMovie(req, res, movieDetails);
    });

module.exports = router