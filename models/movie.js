const { DataTypes, Op } = require('sequelize');
const {sequelize} = require('../config/db');

const movie = sequelize.define('movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.JSON, // Storing genre as a JSON array
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imdb_score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  popularity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  tableName: 'movies',
  timestamps: false,
});

// Static method to add a movie
movie.addMovies = async function(movieData) {
  try {
    const movie = await this.create(movieData);
    return movie; // Return the created movie object
  } catch (error) {
    throw new Error('Error adding movie: ' + error.message);
  }
};

// Static method to delete a movie by ID
movie.deleteMovie = async function(movieId) {
  try {
    const deletedCount = await this.destroy({
      where: {
        id: movieId,
      },
    });
    
    return deletedCount; // Return the number of deleted records
  } catch (error) {
    throw new Error('Error deleting movie: ' + error.message);
  }
};

movie.getMovies = async function(searchParams) {
  try {
    const whereClause = {};

    // Check if searchParams is provided and contains search criteria
    if (searchParams) {
      // Like search on name
      if (searchParams.name) {
        whereClause.name = {
          [Op.like]: `%${searchParams.name}%`
        };
      }
      // Like search on director
      if (searchParams.director) {
        whereClause.director = {
          [Op.like]: `%${searchParams.director}%`
        };
      }
      // Exact match on id
      if (searchParams.id) {
        whereClause.id = searchParams.id;
      }
      // Exact match on imdb_score
      if (searchParams.imdb_score) {
        whereClause.imdb_score = searchParams.imdb_score;
      }
      // Exact match on popularity
      if (searchParams.popularity) {
        whereClause.popularity = searchParams.popularity;
      }

      // Contains search on genre
      if (searchParams.genre) {
        whereClause.genre = sequelize.where(
          sequelize.fn('JSON_CONTAINS', sequelize.col('genre'), JSON.stringify(searchParams.genre)),
          true
        );
      }
    }
    const movies = await this.findAll({
      where: whereClause, // Apply the where clause based on search parameters
    });
    return movies; // Return an array of movie objects
  } catch (error) {
    throw new Error('Error fetching movies: ' + error.message);
  }
};


movie.updateMovie = async function(movieId, updateData) {
  try {
    const updates = await this.update(updateData, {
      where: {
        id: movieId,
      },
      returning: true, // Return the updated movie details
    });
    return updates; // Return the updated count
  } catch (error) {
    throw new Error('Error updating movie: ' + error.message);
  }
};

module.exports = movie;