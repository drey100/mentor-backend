const Mentor = require('../models/Mentor');

exports.createMentor = async (req, res) => {
  try {
    const { bio, expertise, userId } = req.body;
    const mentor = new Mentor({ bio, expertise, user: userId });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('user');
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate('user');
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMentor = async (req, res) => {
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMentor = async (req, res) => {
  try {
    await Mentor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mentor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
