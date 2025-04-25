const Section = require('../models/Section');

exports.createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find().populate('mentor');
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
