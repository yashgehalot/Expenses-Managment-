const express = require('express');
const cors = require('cors'); 
require('dotenv').config(); 
const connectDB = require('./Config/db'); 
const path = require('path'); 

// 1. MUST use process.env.PORT for Render
const port = process.env.PORT || 5000; 

connectDB(); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); //
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// --- API ROUTES ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

// Test Route for submission
app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

// --- SERVE STATIC FILES (PRODUCTION) ---
// This serves your React app from the 'dist' folder
app.use(express.static(path.join(__dirname, './Frontend 1/dist')));

// --- CATCH-ALL: FIXED FOR NODE v25 ---
// Using a named parameter ':path*' to avoid the PathError seen in your logs
// This named parameter syntax is required for Node v25 + Express
app.get('/:path*', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, './Frontend 1/dist/index.html'));
    }
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));