const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const express = require('express'); // ייבוא של express

const app = express();
app.use(cookieParser()); // הוספת

function createToken(req, res, next) {
    const token = jwt.sign(
        {
            password: req.body.password,
            email: req.params.email,
            role: req.params.role
        },
        process.env.SECRET,
        { expiresIn: "2h" } // תוקף של שעתיים - מומלץ להוסיף
    );
    req.token = token;
    next();
}

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"]; // חשוב: lowercase!
        console.log("Authorization Header:", authHeader);

        if (!authHeader){
            return res.status(401).send("No token provided");
        }

        const token = authHeader.split(" ")[1]; // ציפייה ל-"Bearer xxx"
        if (!token) {
            return res.status(401).send("Token missing in header");
        }

        const user = jwt.verify(token, process.env.SECRET);
        console.log("Decoded user:", user);

        if (user.role !== "Administrator") {
            return res.status(403).send("Access denied. Admins only.");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(400).send("Invalid token");
    }
}


module.exports = { createToken, verifyToken };
