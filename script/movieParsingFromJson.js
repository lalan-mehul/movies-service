const fs = require('fs');
const path = require('path');

// Function to read and parse the JSON file
const generateInsertStatements = async () => {
    // Path to the JSON file
    const filePath = path.join(__dirname, 'imdb.json');

    try {
        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');

        // Parse the JSON data
        const movies = JSON.parse(data);

        // Prepare the SQL insert statement
        const sqlInsert = 'INSERT INTO movies (name, director, imdb_score, popularity, genres) VALUES ';

        // Create an array to hold the value strings
        const values = [];

        // Iterate over each movie and create value strings
        movies.forEach((movie) => {
            const name = movie.name.replace(/'/g, "''"); // Escape single quotes in the movie name
            const director = movie.director.replace(/'/g, "''"); // Escape single quotes in the director's name
            const imdbScore = movie.imdb_score;
            const popularity = movie["99popularity"];
            const genres = JSON.stringify(movie.genre); // Convert genres array to JSON string

            // Push the value string into the array
            values.push(`('${name}', '${director}', ${imdbScore}, ${popularity}, '${genres}')`);
        });

        // Combine the SQL insert statement with the values
        const finalInsertStatement = sqlInsert + values.join(', ') + ';';

        // Output the final SQL insert statement
        console.log(finalInsertStatement);
        
        // Optionally, you can write the output to a file
        // fs.writeFileSync('insertMovies.sql', finalInsertStatement);
        
    } catch (error) {
        console.error('Error:', error);
    }
};

// Run the function
generateInsertStatements();
