const express = require('express')
const { getAllMovies } = require('../controllers/movieController');

const router = express.Router()

// define the get route
router.get('/', getAllMovies)

router.post('/', (req, res) => {
  res.send('movies post page')
})

router.patch('/', (req, res) => {
    res.send('Movies patch')
})

router.delete('/', (req, res) => {
    res.send('Movies delete')
})

module.exports = router