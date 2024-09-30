const express = require('express')

const router = express.Router()

// define the get route
router.get('/', (req, res) => {
  res.send('movies get page')
})

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