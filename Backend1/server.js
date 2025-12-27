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

// --- API ROUTES (Define these BEFORE static files) ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

// Test Route for submission
app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

// --- SERVE STATIC FILES (PRODUCTION) ---
// Use path.resolve to ensure Render finds the folder correctly
const frontendPath = path.resolve(__dirname, '../Frontend 1/dist');
app.use(express.static(frontendPath));

// --- CATCH-ALL: COMPATIBLE WITH NODE v25 ---
// This serves the React app for any route that is NOT /api
app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));