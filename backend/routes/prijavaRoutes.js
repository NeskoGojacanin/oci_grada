const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    dodajPrijavu,
    mojePrijave,
    svePrijave,
    promijeniStatus
} = require("../controllers/prijavaController");

router.post("/", authMiddleware, dodajPrijavu);
router.get("/moje", authMiddleware, mojePrijave);
router.get("/", authMiddleware, svePrijave);
router.put("/:id/status", authMiddleware, promijeniStatus);

module.exports = router;