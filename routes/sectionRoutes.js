const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  const section = new Section(req.body);
  await section.save();
  res.status(201).json(section);
});

router.get('/', auth, async (req, res) => {
  const sections = await Section.find().populate('mentor');
  res.json(sections);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Section.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
