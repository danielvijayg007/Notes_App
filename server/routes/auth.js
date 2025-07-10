const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
const User = require('../models/User'); // make sure this is at the top if not already

// Get all registered users (for demo only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email'); // Only return email field
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
