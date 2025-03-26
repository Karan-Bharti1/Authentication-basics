const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// CORS configuration to allow all origins
const corsOptions = {
    origin: '*', // This allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));
app.use(express.json())

const SECRET_KEY = "supersecretadmin";
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(402).json({ message: "Invalid Token" });
    }
};

app.post("/admin/login", (req, res) => {
    const { secret } = req.body;
    if (secret === SECRET_KEY) {
        const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid Secret" });
    }
});

app.get('/admin/api/data', verifyJWT, (req, res) => {
    res.json({ message: "Protected route accessible" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App Running at port ${PORT}`);
});