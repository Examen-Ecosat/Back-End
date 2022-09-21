const MySQL = require('mysql');
require('dotenv').config();

const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'db_examen',
    password: ''
});

connection.connect((err) => {
    if (err) return console.log(err);

    console.log('Conexión establecida con la base de datos');
});

module.exports = connection;