const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // static files like images, CSS, JS

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/denim", (req, res) => res.sendFile(path.join(__dirname, "public", "denim.html")));
app.get("/streetknit", (req, res) => res.sendFile(path.join(__dirname, "public", "streetknit.html")));

// Fetch products
app.get("/api/products", (req, res) => {
    const category = req.query.category;
    let query = "SELECT * FROM products";
    const params = [];

    if (category) {
        query += " WHERE category = ?";
        params.push(category);
    }

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// Insert product
app.post("/api/products", (req, res) => {
    const { name, price, category, imageUrl } = req.body;
    const query = "INSERT INTO products (name, price, category, image_url) VALUES (?, ?, ?, ?)";
    const values = [name, price, category, imageUrl];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Product added successfully");
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});