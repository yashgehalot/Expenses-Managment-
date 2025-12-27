const express = require('express');
const cors = require('cors'); 
require('dotenv').config(); //
const connectDB = require('./Config/db'); 
const path = require('path'); 

// 1. MUST use process.env.PORT for Render
const port = process.env.PORT || 5000; 

connectDB(); //

const app = express();

// --- MIDDLEWARE ---

// 2. SIMPLIFIED CORS: This is the safest way to avoid submission errors
app.use(cors()); 

app.use(express.json()); //
app.use(express.urlencoded({ extended: false }));

// --- API ROUTES ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

// Test Route
app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

// --- SERVE STATIC FILES (PRODUCTION) ---
// 3. This serves your React app from the 'dist' folder
app.use(express.static(path.join(__dirname, './Frontend 1/dist')));

// 4. CATCH-ALL: Important for React Router to work after deployment
app.get('*', (req, res) => {
    // If a request is NOT for /api, send the index.html
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, './Frontend 1/dist/index.html'));
    }
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`)); //