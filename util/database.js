const mysql = require('mysql2');
const { parseJsonConfigFileContent } = require('typescript');
const config = require('../config/config.json');

const pool = mysql.createPool({
    honst: config.host,
    user:config.user,
    database: config.database,
    password: config.password
})

module.exports = pool.promise();