const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    dodajKategoriju,
    dodajSluzbu,
    postaviKoordinatora
} = require("../controllers/adminController");

router.post("/kategorije", authMiddleware, dodajKategoriju);
router.post("/sluzbe", authMiddleware, dodajSluzbu);
router.put("/korisnici/:id/koordinator", authMiddleware, postaviKoordinatora);

module.exports = router;