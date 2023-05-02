const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({

    /****** FOR LOCAL DEVELOPMENT ******/

    // user:"postgres",
    // password:process.env.DB_PASS,
    // host:"localhost",
    // port:5432,
    // database:"notes",

    /****** FOR PRODUCTION ******/

    connectionString:process.env.POSTGRES_URL + "?sslmode=require",
    password:process.env.POSTGRES_PASSWORD
})

module.exports = pool;