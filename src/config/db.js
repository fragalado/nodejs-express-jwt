const mysql = require('mysql2/promise');

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'zepxuH-nyzfa5',
      database: 'apijwt'
    });

    // Create the `users` table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    console.log("Connected to the database and ensured `users` table exists.");

    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

// Export a Promise that resolves with the connection
module.exports = createConnection();