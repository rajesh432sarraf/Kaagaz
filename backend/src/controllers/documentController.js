const Document = require('../models/Document');

// Utility to compute status based on expiryDate
const computeStatus = (expiryDate) => {
  if (!expiryDate) return 'Valid';
  const now = new Date();
  const diffDays = Math.ceil((new Date(expiryDate) - now) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Expired';
  if (diffDays <= 90) return 'Expiring Soon';
  return 'Valid';
};

// @desc   Health check (already in server, but keep for consistency)
exports.healthCheck = (req, res) => {
  res.status(200).json({ success: true, message: 'Kaagaz API is running' });
};

// @desc   Create a document
exports.createDocument = async (req, res, next) => {
  try {
    const { name, category, issueDate, expiryDate, description, fileName, fileUrl } = req.body;
    // Validation
    if (!name) return res.status(400).json({ success: false, message: 'Document name is required' });
    const allowedCategories = ['Identity', 'Travel', 'Vehicle', 'Insurance', 'Health', 'Property', 'Finance', 'Other'];
    if (!category || !allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing category' });
    }
    const status = computeStatus(expiryDate);
    const doc = await Document.create({
      name,
      category,
      issueDate: issueDate ? new Date(issueDate) : undefined,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      description,
      fileName,
      fileUrl,
      status,
    });
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all documents
exports.getAllDocuments = async (req, res, next) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: docs });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single document by ID
exports.getDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

// @desc   Update document
exports.updateDocument = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.expiryDate) {
      updates.status = computeStatus(updates.expiryDate);
    }
    const doc = await Document.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete document
exports.deleteDocument = async (req, res, next) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, message: 'Document deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc   Get documents expiring within next 90 days
exports.getExpiringDocuments = async (req, res, next) => {
  try {
    const now = new Date();
    const limit = new Date();
    limit.setDate(now.getDate() + 90);
    const docs = await Document.find({ expiryDate: { $gte: now, $lte: limit } }).sort({ expiryDate: 1 });
    res.status(200).json({ success: true, data: docs });
  } catch (error) {
    next(error);
  }
};

// @desc   Get statistics
exports.getStats = async (req, res, next) => {
  try {
    const totalDocuments = await Document.countDocuments();
    const now = new Date();
    const limit = new Date();
    limit.setDate(now.getDate() + 90);
    const expiringSoon = await Document.countDocuments({ expiryDate: { $gte: now, $lte: limit } });
    const expired = await Document.countDocuments({ expiryDate: { $lt: now } });
    const categoriesAgg = await Document.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);
    const categories = {};
    categoriesAgg.forEach(c => { categories[c.category] = c.count; });
    res.status(200).json({
      success: true,
      data: { totalDocuments, expiringSoon, expired, categories },
    });
  } catch (error) {
    next(error);
  }
};
