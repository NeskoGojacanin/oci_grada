require("dotenv").config();



const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const objavaRoutes = require("./routes/objavaRoutes");
const komentarRoutes = require("./routes/komentarRoutes");
const prijavaRoutes = require("./routes/prijavaRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/objave", objavaRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/komentari", komentarRoutes);
app.use("/api/prijave", prijavaRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
    res.send("Backend radi!");
});



app.get("/api/test-private", authMiddleware, (req, res) => {
    res.json({
        message: "Token je validan.",
        korisnik: req.user
    });
});





const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});


