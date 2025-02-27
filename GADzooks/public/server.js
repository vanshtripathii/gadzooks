const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.get("/denim", (req, res) => res.sendFile(__dirname + "/public/denim.html"));
app.get("/streetknit", (req, res) => res.sendFile(__dirname + "/public/streetknit.html"));

// Fetch products from database
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
