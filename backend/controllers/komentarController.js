const db = require("../config/db");

const dodajKomentar = (req, res) => {
    const { id_objave, tekst } = req.body;
    const id_korisnika = req.user.id_korisnika;

    if (!id_objave || !tekst) {
        return res.status(400).json({ message: "ID objave i tekst su obavezni." });
    }

    const sql = `
        INSERT INTO Komentar (id_objave, id_korisnika, tekst)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [id_objave, id_korisnika, tekst], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri dodavanju komentara." });
        }

        res.status(201).json({
            message: "Komentar uspješno dodat.",
            id_komentara: result.insertId
        });
    });
};

const komentariZaObjavu = (req, res) => {
    const { id_objave } = req.params;

    const sql = `
        SELECT 
            k.id_komentara,
            k.tekst,
            k.datum,
            korisnik.username AS autor
        FROM Komentar k
        JOIN Korisnik korisnik ON k.id_korisnika = korisnik.id_korisnika
        WHERE k.id_objave = ?
        ORDER BY k.datum DESC
    `;

    db.query(sql, [id_objave], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri učitavanju komentara." });
        }

        res.json(results);
    });
};

const obrisiKomentar = (req, res) => {
    const { id } = req.params;
    const id_korisnika = req.user.id_korisnika;

    const sql = `
        DELETE FROM Komentar
        WHERE id_komentara = ? AND id_korisnika = ?
    `;

    db.query(sql, [id, id_korisnika], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri brisanju komentara." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Komentar nije pronađen ili nije vaš." });
        }

        res.json({ message: "Komentar uspješno obrisan." });
    });
};

module.exports = {
    dodajKomentar,
    komentariZaObjavu,
    obrisiKomentar
};