const mongoose = require('mongoose');

const allowedCategories = ['Identity', 'Travel', 'Vehicle', 'Insurance', 'Health', 'Property', 'Finance', 'Other'];
const allowedStatuses = ['Valid', 'Critical', 'Expiring Soon', 'Expired'];

const DocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: allowedCategories, required: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    description: { type: String },
    fileName: { type: String },
    fileUrl: { type: String },
    status: { type: String, enum: allowedStatuses },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field for days remaining until expiry
DocumentSchema.virtual('daysRemaining').get(function () {
  if (!this.expiryDate) return null;
  const now = new Date();
  const diff = Math.ceil((this.expiryDate - now) / (1000 * 60 * 60 * 24));
  return diff;
});

module.exports = mongoose.model('Document', DocumentSchema);
