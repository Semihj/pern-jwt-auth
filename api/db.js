const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user:"postgres",
    password:process.env.SQL_PASSWORD,
    host:"localhost",
    port:5432,
    database:"auth"
})

module.exports = pool;