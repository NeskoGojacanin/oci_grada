const express = require("express");
const router = express.Router();

const { sveKategorije } = require("../controllers/kategorijaController");

router.get("/", sveKategorije);

module.exports = router;