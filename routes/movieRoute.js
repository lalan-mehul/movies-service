const express = require('express')
const { getAllMovies} = require('../controllers/movieController');
const router = express.Router()
const Joi = require('joi');

const getMovieSchema = Joi.object({
    id: Joi.number().min(1),
    name: Joi.string().min(1).max(100),
    director: Joi.string().min(1).max(100),
    imdb_score: Joi.number().min(0).max(10),
    genre: Joi.string().min(1),
    popularity: Joi.number().min(0).max(100),
  });
  

// define the get route
router.get('/', (req, res) => {
    const { error, value } = getMovieSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const movieDetails = {
        id: value.id,
        name: value.name,
        director: value.director,
        imdb_score: value.imdb_score,
        genre: value.genre,
        popularity: value.popularity,
    };
    
    getAllMovies(req, res, movieDetails);
});

module.exports = router