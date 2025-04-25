const Session = require('../models/Session');

exports.createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate('user section');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
