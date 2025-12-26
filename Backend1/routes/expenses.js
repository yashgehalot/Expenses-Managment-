const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createExpense, getExpenses } = require('../controllers/expenseController');

// Apply protection to all routes below
router.use(protect);

router.post('/', createExpense);      
router.get('/', getExpenses);         

module.exports = router;