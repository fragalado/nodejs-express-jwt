const dbConnectionPromise = require('../config/db');

const login = async (username) => {
    const connection = await dbConnectionPromise;

    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows;
}

const register = async (username, password) => {
    const connection = await dbConnectionPromise;

    const [rows] = await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return rows;
}

module.exports = { login, register }