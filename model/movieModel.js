const db = require('../config/db');

const getMovies = async (searchParams) => {
    let sql = 'SELECT * FROM movies WHERE 1=1';
    const values = [];

    if (searchParams.name) {
        sql += ' AND name LIKE ?';
        values.push(`%${searchParams.name}%`);
    }

    if (searchParams.director) {
        sql += ' AND director LIKE ?';
        values.push(`%${searchParams.director}%`);
    }

    if (searchParams.imdb_score) {
        sql += ' AND imdb_score = ?';
        values.push(searchParams.imdb_score);
    }

    // Search for genres (JSON column)
    if (searchParams.genre) {
        sql += ' AND JSON_CONTAINS(genre, ?)';
        values.push(`"${searchParams.genre}"`);
    }
    console.log(values);
    console.log(sql);
    const [rows] = await db.execute(sql, values);
    return rows;
};

// Add a new movie
const addMovie = async (name, director, imdb_score,popularity, genre) => {
    const sql = 'INSERT INTO movies (name, director, imdb_score,popularity, genre) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [name, director, imdb_score,popularity, JSON.stringify(genre)]);
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

module.exports = { getMovies, addMovie, deleteMovieById, updateMovieById };
