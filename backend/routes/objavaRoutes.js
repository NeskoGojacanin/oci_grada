const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


const {
    dodajObjavu,
    sveObjave,
    jednaObjava,
    izmijeniObjavu,
    obrisiObjavu
} = require("../controllers/objavaController");

router.post("/", authMiddleware, upload.single("slika"), dodajObjavu);
router.get("/", sveObjave);
router.get("/:id", jednaObjava);
router.put("/:id", authMiddleware, izmijeniObjavu);
router.delete("/:id", authMiddleware, obrisiObjavu);

module.exports = router;