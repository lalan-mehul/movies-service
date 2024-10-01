const express = require('express')
const { getAllMovies, createMovie, removeMovie, modifyMovie } = require('../controllers/movieController');

const router = express.Router()

// define the get route
router.get('/', getAllMovies);

router.patch('/', (req, res) => {
    res.send('Movies patch')
});

// Add movie endpoint
router.post('/', createMovie);

// Delete movie endpoint
router.delete('/:id', removeMovie);

router.patch('/:id', modifyMovie);

module.exports = router