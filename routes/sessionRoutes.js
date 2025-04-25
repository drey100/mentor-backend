const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.status(201).json(session);
});

router.get('/', auth, async (req, res) => {
  const sessions = await Session.find().populate('user section');
  res.json(sessions);
});

module.exports = router;
