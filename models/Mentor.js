const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  expertise: [String]
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);
