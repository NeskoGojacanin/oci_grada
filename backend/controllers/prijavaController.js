const db = require("../config/db");

const dodajPrijavu = (req, res) => {
    const { id_objave } = req.body;
    const id_korisnika = req.user.id_korisnika;

    if (!id_objave) {
        return res.status(400).json({ message: "ID objave je obavezan." });
    }

    const sql = `
        INSERT INTO Prijava (id_objave, id_korisnika)
        VALUES (?, ?)
    `;

    db.query(sql, [id_objave, id_korisnika], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri dodavanju prijave." });
        }

        res.status(201).json({
            message: "Prijava uspješno kreirana.",
            id_prijave: result.insertId
        });
    });
};

const mojePrijave = (req, res) => {
    const id_korisnika = req.user.id_korisnika;

    const sql = `
        SELECT 
            p.id_prijave,
            p.status,
            p.datum_prijave,
            o.naslov,
            o.lokacija
        FROM Prijava p
        JOIN Objava o ON p.id_objave = o.id_objave
        WHERE p.id_korisnika = ?
        ORDER BY p.datum_prijave DESC
    `;

    db.query(sql, [id_korisnika], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri učitavanju prijava." });
        }

        res.json(results);
    });
};

const svePrijave = (req, res) => {
    if (req.user.uloga !== "koordinator") {
        return res.status(403).json({ message: "Nemate dozvolu." });
    }

    const sql = `
        SELECT 
            p.id_prijave,
            p.status,
            p.datum_prijave,
            o.naslov,
            o.lokacija,
            k.username AS korisnik
        FROM Prijava p
        JOIN Objava o ON p.id_objave = o.id_objave
        JOIN Korisnik k ON p.id_korisnika = k.id_korisnika
        ORDER BY p.datum_prijave DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri učitavanju svih prijava." });
        }

        res.json(results);
    });
};

const promijeniStatus = (req, res) => {
    if (req.user.uloga !== "koordinator") {
        return res.status(403).json({ message: "Nemate dozvolu." });
    }

    const { id } = req.params;
    const { status, id_sluzbe } = req.body;
    const id_koordinatora = req.user.id_korisnika;

    const dozvoljeniStatusi = ["predana", "u_obradi", "proslijedjena", "zavrsena", "odbijena"];

    if (!dozvoljeniStatusi.includes(status)) {
        return res.status(400).json({ message: "Neispravan status." });
    }

    const sql = `
        UPDATE Prijava
        SET status = ?, id_sluzbe = ?, id_koordinatora = ?
        WHERE id_prijave = ?
    `;

    db.query(sql, [status, id_sluzbe || null, id_koordinatora, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri promjeni statusa." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Prijava nije pronađena." });
        }

        res.json({ message: "Status prijave uspješno promijenjen." });
    });
};

module.exports = {
    dodajPrijavu,
    mojePrijave,
    svePrijave,
    promijeniStatus
};