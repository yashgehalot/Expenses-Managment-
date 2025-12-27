const express = require('express');
const cors = require('cors'); 
require('dotenv').config(); 
const connectDB = require('./Config/db'); 
const path = require('path'); 

const port = process.env.PORT || 5000; 

connectDB(); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Safest for submission
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// --- API ROUTES ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

// --- SERVE STATIC FILES (PRODUCTION) ---
app.use(express.static(path.join(__dirname, './Frontend 1/dist')));

// --- CATCH-ALL: FIXED FOR NODE v25 ---
// Changed '*' to '(.*)' to prevent PathError
app.get('(.*)', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, './Frontend 1/dist/index.html'));
    }
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));