const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get notes
router.get('/notes', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Add note
router.post('/notes', verifyToken, async (req, res) => {
  try {
    const note = new Note({
      user: req.userId,
      content: req.body.content
    });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// Delete note
router.delete('/notes/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
