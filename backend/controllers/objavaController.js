const db = require("../config/db");



const dodajObjavu = (req, res) => {
    const { id_kategorije, naslov, opis, lokacija } = req.body;
    const id_korisnika = req.user.id_korisnika;

    if (!id_kategorije || !naslov || !opis || !lokacija) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
    }

    const sqlObjava = `
        INSERT INTO Objava 
        (id_korisnika, id_kategorije, naslov, opis, lokacija)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sqlObjava, [id_korisnika, id_kategorije, naslov, opis, lokacija], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri dodavanju objave." });
        }

        const id_objave = result.insertId;

        if (!req.file) {
            return res.status(201).json({
                message: "Objava uspješno dodata bez slike.",
                id_objave
            });
        }

        const sqlSlika = `
            INSERT INTO Slika
            (id_objave, naziv, putanja, tip)
            VALUES (?, ?, ?, ?)
        `;

        const naziv = req.file.originalname;
        const putanja = `/uploads/${req.file.filename}`;
        const tip = req.file.mimetype;

        db.query(sqlSlika, [id_objave, naziv, putanja, tip], (errSlika) => {
            if (errSlika) {
                console.log(errSlika);
                return res.status(500).json({
                    message: "Objava je dodata, ali slika nije sačuvana."
                });
            }

            res.status(201).json({
                message: "Objava i slika uspješno dodate.",
                id_objave,
                slika: putanja
            });
        });
    });
};




const sveObjave = (req, res) => {
    const sql = `
        SELECT 
            o.id_objave,
            o.naslov,
            o.opis,
            o.lokacija,
            o.status,
            o.datum_objave,
            k.naziv AS kategorija,
            korisnik.username AS autor
        FROM Objava o
        JOIN Kategorija k ON o.id_kategorije = k.id_kategorije
        JOIN Korisnik korisnik ON o.id_korisnika = korisnik.id_korisnika
        ORDER BY o.datum_objave DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri učitavanju objava." });
        }

        res.json(results);
    });
};

const jednaObjava = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            o.id_objave,
            o.id_korisnika,
            o.id_kategorije,
            o.naslov,
            o.opis,
            o.lokacija,
            o.status,
            o.datum_objave,
            k.naziv AS kategorija,
            korisnik.username AS autor
        FROM Objava o
        JOIN Kategorija k ON o.id_kategorije = k.id_kategorije
        JOIN Korisnik korisnik ON o.id_korisnika = korisnik.id_korisnika
        WHERE o.id_objave = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri učitavanju objave." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Objava nije pronađena." });
        }

        res.json(results[0]);
    });
};

const izmijeniObjavu = (req, res) => {
    const { id } = req.params;
    const { id_kategorije, naslov, opis, lokacija, status } = req.body;
    const id_korisnika = req.user.id_korisnika;

    const sql = `
        UPDATE Objava
        SET id_kategorije = ?, naslov = ?, opis = ?, lokacija = ?, status = ?
        WHERE id_objave = ? AND id_korisnika = ?
    `;

    db.query(
        sql,
        [id_kategorije, naslov, opis, lokacija, status, id, id_korisnika],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Greška pri izmjeni objave." });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Objava nije pronađena ili nije vaša." });
            }

            res.json({ message: "Objava uspješno izmijenjena." });
        }
    );
};

const obrisiObjavu = (req, res) => {
    const { id } = req.params;
    const id_korisnika = req.user.id_korisnika;

    const sql = "DELETE FROM Objava WHERE id_objave = ? AND id_korisnika = ?";

    db.query(sql, [id, id_korisnika], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška pri brisanju objave." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Objava nije pronađena ili nije vaša." });
        }

        res.json({ message: "Objava uspješno obrisana." });
    });
};

module.exports = {
    dodajObjavu,
    sveObjave,
    jednaObjava,
    izmijeniObjavu,
    obrisiObjavu
};