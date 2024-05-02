const { Client } = require('pg');
require('dotenv').config();

const database = new Client({
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASS, // Assuming the password is 'root'
});

async function conectarDB() {
    try {
        await database.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

conectarDB();

module.exports = database;
