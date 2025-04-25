const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
}, { timestamps: true });

module.exports = mongoose.model('Section', sectionSchema);
