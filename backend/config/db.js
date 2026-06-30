const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log("Greška pri povezivanju sa bazom!");
        console.log(err);
    } else {
        console.log("Uspješno povezan sa MySQL bazom!");
    }
});

module.exports = connection;