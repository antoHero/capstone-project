const Pool = require('pg').Pool
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log("Successfully connected to database");
})



module.exports = pool;