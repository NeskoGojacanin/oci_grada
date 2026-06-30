require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend radi!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});