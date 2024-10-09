const express = require('express')
const {createMovie, removeMovie, modifyMovie } = require('../controllers/adminMovieController');

const router = express.Router()

// Add movie endpoint
router.post('/', createMovie);

// Delete movie endpoint
router.delete('/:id', removeMovie);

router.patch('/:id', modifyMovie);

module.exports = router