const { addMovie, deleteMovieById,updateMovieById } = require('../services/adminMovieService');


// Add a new movie
const createMovie = async (req, res) => {
    const movieData  = req.body;
    try {
        const movie = await addMovie(movieData);
        res.status(201).json({ message: 'Movie added successfully', id: movie.id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add movie' });
    }
};

// Delete a movie by ID
const removeMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await deleteMovieById(id);
        if (deletedCount === 0) {
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
const updateMovie = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const updates = await updateMovieById(id, updatedFields);
        console.log(updates);
        if (updates[1] === 0) {
            res.status(404).json({ message: `Movie with the id ${id} not found or it doesn't need any updates` });
            return;
        }
        res.status(200).json({ message: 'Movie updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
};

module.exports = {createMovie, removeMovie, updateMovie };