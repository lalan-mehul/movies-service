const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000

const movies = require('./route/movies')
app.use('/movies', movies)

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));