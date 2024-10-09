const express = require('express')
const {createMovie, removeMovie, updateMovie } = require('../controllers/adminMovieController');

const router = express.Router()

// Add movie endpoint
router.post('/', createMovie);

// Delete movie endpoint
router.delete('/:id', removeMovie);

router.patch('/:id', updateMovie);

module.exports = router