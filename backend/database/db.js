const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Successfully connected to the database');
});

module.exports = pool;