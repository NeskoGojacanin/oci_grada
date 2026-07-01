const db = require("../config/db");

const sveSluzbe = (req, res) => {
    const sql = "SELECT id_sluzbe, naziv FROM NadleznaSluzba ORDER BY naziv";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Greška pri učitavanju službi." });
        }

        res.json(results);
    });
};

module.exports = { sveSluzbe };