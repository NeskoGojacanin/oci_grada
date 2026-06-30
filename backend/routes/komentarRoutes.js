const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    dodajKomentar,
    komentariZaObjavu,
    obrisiKomentar
} = require("../controllers/komentarController");

router.post("/", authMiddleware, dodajKomentar);
router.get("/objava/:id_objave", komentariZaObjavu);
router.delete("/:id", authMiddleware, obrisiKomentar);

module.exports = router;