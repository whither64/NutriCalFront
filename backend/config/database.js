const postgresql = require("pg")
const util = require("util")

const pool = postgresql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "database"
});

pool.query = util.promisify(pool.query);
module.exports = pool;