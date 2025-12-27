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
app.use(cors()); // Safest for submission
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// --- API ROUTES (Defined BEFORE static files to prevent 404s) ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

// Test Route for submission
app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

// --- SERVE STATIC FILES (PRODUCTION) ---
// Resolve the path relative to the Backend1 folder
const frontendPath = path.resolve(__dirname, '../Frontend 1/dist');
app.use(express.static(frontendPath));

// --- CATCH-ALL: FIXED FOR NODE v25 ---
// Using ':path*' as a named parameter to avoid the "Missing parameter name" error
// --- CATCH-ALL: COMPATIBLE WITH NODE v25 ---
// Using a Regular Expression to avoid the PathError entirely
app.get(/^((?!\/api).)*$/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));