const mongoose = require('mongoose');

const allowedCategories = ['Identity', 'Travel', 'Vehicle', 'Insurance', 'Health', 'Property', 'Finance', 'Other'];
const allowedStatuses = ['Valid', 'Expiring Soon', 'Expired'];

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: allowedCategories, required: true },
  issueDate: { type: Date },
  expiryDate: { type: Date },
  description: { type: String },
  fileName: { type: String },
  fileUrl: { type: String },
  status: { type: String, enum: allowedStatuses },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
