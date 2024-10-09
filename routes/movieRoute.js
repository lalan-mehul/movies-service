const express = require('express')
const { getAllMovies} = require('../controllers/movieController');

const router = express.Router()

// define the get route
router.get('/', getAllMovies);

module.exports = router