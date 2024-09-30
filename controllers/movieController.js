const { getMovies } = require('../model/movieModel');

const getAllMovies = async (req, res) => {
    try {
        const movies = await getMovies();
        res.status(200).json(movies);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

module.exports = { getAllMovies };
