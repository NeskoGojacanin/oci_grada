const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
    const { username, email, password, ime, prezime, telefon } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email i password su obavezni." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO Korisnik 
            (username, email, password, ime, prezime, telefon, uloga)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, hashedPassword, ime, prezime, telefon, "korisnik"],
            (err, result) => {
                if (err) {
                    console.log(err);

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({ message: "Username ili email već postoji." });
                    }

                    return res.status(500).json({ message: "Greška na serveru." });
                }

                res.status(201).json({
                    message: "Korisnik uspješno registrovan.",
                    id_korisnika: result.insertId
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Greška prilikom registracije." });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email i password su obavezni." });
    }

    const sql = "SELECT * FROM Korisnik WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Greška na serveru." });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Pogrešan email ili lozinka." });
        }

        const korisnik = results[0];

        const isMatch = await bcrypt.compare(password, korisnik.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Pogrešan email ili lozinka." });
        }

        const token = jwt.sign(
            {
                id_korisnika: korisnik.id_korisnika,
                username: korisnik.username,
                uloga: korisnik.uloga
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            message: "Uspješna prijava.",
            token,
            korisnik: {
                id_korisnika: korisnik.id_korisnika,
                username: korisnik.username,
                email: korisnik.email,
                uloga: korisnik.uloga
            }
        });
    });
};

module.exports = {
    register,
    login 
};