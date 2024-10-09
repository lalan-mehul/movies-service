const db = require('../config/db');

// Add a new movie
const addMovie = async (name, director, imdb_score, popularity, genre) => {
    const sql = 'INSERT INTO movies (name, director, imdb_score,popularity, genre) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [name, director, imdb_score, popularity, JSON.stringify(genre)]);
    return result;
};

// Delete a movie by ID
const deleteMovieById = async (id) => {
    const sql = 'DELETE FROM movies WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result;
};

// Update (PATCH) a movie by ID
const updateMovieById = async (id, updatedFields) => {
    const updates = Object.keys(updatedFields)
        .map(key => `${key} = ?`)
        .join(', ');

    const values = Object.values(updatedFields);
    values.push(id);

    const sql = `UPDATE movies SET ${updates} WHERE id = ?`;
    const [result] = await db.execute(sql, values);
    return result;
};

module.exports = {addMovie, deleteMovieById, updateMovieById };