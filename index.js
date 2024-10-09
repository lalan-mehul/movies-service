const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

const PORT = 4000

const movies = require('./routes/movieRoute')
const adminMovies = require('./routes/adminMovieRoutes')

app.use('/movies', movies)
app.use('/admin/movies', adminMovies)

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

module.exports = app;