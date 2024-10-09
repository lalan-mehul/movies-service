const db = require('../config/db');

const getMovies = async (searchParams) => {
    let sql = 'SELECT * FROM movies WHERE 1=1';
    const values = [];

    if (searchParams.name) {
        sql += ' AND name LIKE ?';
        values.push(`%${searchParams.name}%`);
    }

    if (searchParams.id) {
        sql += ' AND id = ?';
        values.push(searchParams.id);
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
    const [rows] = await db.execute(sql, values);
    return rows;
};

module.exports = { getMovies };