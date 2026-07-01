const db = require("../config/db");

const dodajKategoriju = (req, res) => {
    if (req.user.uloga !== "admin") {
        return res.status(403).json({ message: "Nemate dozvolu." });
    }

    const { naziv, opis } = req.body;

    const sql = "INSERT INTO Kategorija (naziv, opis) VALUES (?, ?)";

    db.query(sql, [naziv, opis], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Greška pri dodavanju kategorije." });
        }

        res.status(201).json({
            message: "Kategorija dodata.",
            id_kategorije: result.insertId
        });
    });
};

const dodajSluzbu = (req, res) => {
    if (req.user.uloga !== "admin") {
        return res.status(403).json({ message: "Nemate dozvolu." });
    }

    const { naziv, telefon, email } = req.body;

    const sql = "INSERT INTO NadleznaSluzba (naziv, telefon, email) VALUES (?, ?, ?)";

    db.query(sql, [naziv, telefon, email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Greška pri dodavanju službe." });
        }

        res.status(201).json({
            message: "Služba dodata.",
            id_sluzbe: result.insertId
        });
    });
};

const postaviKoordinatora = (req, res) => {
    if (req.user.uloga !== "admin") {
        return res.status(403).json({ message: "Nemate dozvolu." });
    }

    const { id } = req.params;

    const sql = `
        UPDATE Korisnik
        SET uloga = 'koordinator'
        WHERE id_korisnika = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Greška pri promjeni uloge." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Korisnik nije pronađen." });
        }

        res.json({ message: "Korisnik je sada koordinator." });
    });
};

module.exports = {
    dodajKategoriju,
    dodajSluzbu,
    postaviKoordinatora
};