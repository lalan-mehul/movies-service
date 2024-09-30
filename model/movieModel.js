const db = require('../config/db');

const getMovies = async () => {
    const [rows] = await db.query('SELECT * FROM movies');
    return rows;
};

module.exports = { getMovies };
