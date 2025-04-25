const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
