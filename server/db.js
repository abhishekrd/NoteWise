const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    user:"postgres",
    password:process.env.DB_PASS,
    host:"localhost",
    port:5432,
    database:"notes"
})

module.exports = pool;