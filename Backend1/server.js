const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv').config();
const connectDB = require('./Config/db'); 
const path = require('path'); 

// Use 5000 locally, but Render will provide its own PORT via environment variables
const port = process.env.PORT || 5000; 

connectDB(); 

const app = express();

// --- MIDDLEWARE ---

// Updated CORS to handle both Local and Production origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://your-backend-name.onrender.com' // Replace with your actual Render URL
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Helpful if you decide to use cookies/sessions later
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- SERVE STATIC FILES ---
// Ensure the path correctly points to your built frontend
app.use(express.static(path.join(__dirname, '../Frontend 1/dist')));

// --- API ROUTES ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expenses'));

app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});

app.post('/api/day2-test', (req, res) => {
    const receivedData = req.body;
    console.log("Day 2 POST Request Received:", receivedData);
    res.status(201).json({
        message: "Data received successfully!",
        data: receivedData
    });
});

// --- CATCH-ALL ROUTE ---
// This serves the React index.html for any route that isn't an /api route
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend 1/dist/index.html'));
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));