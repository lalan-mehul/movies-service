const { getMovies } = require('../services/movieService');

const getAllMovies = async (req, res) => {
    const searchParams = {
        name: req.query.name, // Get name search parameter from query string
        director: req.query.director, // Get director search parameter from query string
        id: req.query.id ? parseInt(req.query.id) : undefined, // Get id search parameter from query string, converted to integer
        imdb_score: req.query.imdb_score ? parseFloat(req.query.imdb_score) : undefined, // Get imdb_score search parameter from query string, converted to float
        genre: req.query.genre
    };
    try {
        const movies = await getMovies(searchParams);
        if (movies.length === 0) {
            res.status(404).json({ message: `Movie with search criteria not found` });
        } else {
            res.status(200).json(movies);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

module.exports = { getAllMovies };
