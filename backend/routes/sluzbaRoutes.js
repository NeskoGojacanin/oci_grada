const express = require("express");
const router = express.Router();

const { sveSluzbe } = require("../controllers/sluzbaController");

router.get("/", sveSluzbe);

module.exports = router;