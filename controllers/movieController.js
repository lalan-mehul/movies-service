const { getMovies } = require('../services/movieService');

const getAllMovies = async (req, res) => {
    const searchParams = req.query;

    try {
        const movies = await getMovies(searchParams);
        if (movies.length == 0) {
            res.status(404).json({ message: `Movie with search criteria not found` });
        } else {
            res.status(200).json(movies);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

module.exports = { getAllMovies};
