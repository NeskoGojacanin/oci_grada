const db = require("../config/db");

const sveKategorije = (req, res) => {
    const sql = "SELECT id_kategorije, naziv, opis FROM Kategorija ORDER BY naziv";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Greška pri učitavanju kategorija." });
        }

        res.json(results);
    });
};

module.exports = {
    sveKategorije
};