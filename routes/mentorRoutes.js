const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, async (req, res) => {
  const mentors = await Mentor.find().populate('user');
  res.json(mentors);
});

router.get('/:id', auth, async (req, res) => {
  const mentor = await Mentor.findById(req.params.id).populate('user');
  if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
  res.json(mentor);
});

module.exports = router;
