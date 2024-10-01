const { getMovies, addMovie,deleteMovieById, updateMovieById } = require('../model/movieModel');

const getAllMovies = async (req, res) => {
    const searchParams = req.query;

    try {
        const movies = await getMovies(searchParams);
        res.status(200).json(movies);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

// Add a new movie
const createMovie = async (req, res) => {
    const { name, director, imdb_score, popularity, genre } = req.body;
    try {
        result = await addMovie(name, director, imdb_score, popularity, genre);
        res.status(201).json({ message: 'Movie added successfully', id:result.insertId });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add movie' });
    }
};

// Delete a movie by ID
const removeMovie = async (req, res) => {
    const { id } = req.params;
    try {
        result = await deleteMovieById(id);
        console.debug(result);
        if (result.affectedRows == 0) {
            res.status(404).json({ message: `Movie with the id ${id} not found` });    
        } else {
            res.status(200).json({ message: 'Movie deleted successfully' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};

// Update (PATCH) a movie by ID
const modifyMovie = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        await updateMovieById(id, updatedFields);
        res.status(200).json({ message: 'Movie updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
};


module.exports = { getAllMovies,  createMovie, removeMovie, modifyMovie};
