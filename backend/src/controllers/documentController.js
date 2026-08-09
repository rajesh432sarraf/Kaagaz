const Document = require('../models/Document');
const fs = require('fs/promises');
const path = require('path');

// Utility to compute status based on expiryDate
const computeStatus = (expiryDate) => {
  if (!expiryDate) return 'Valid';
  const now = new Date();
  const diffDays = Math.ceil((new Date(expiryDate) - now) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Expired';
  if (diffDays <= 30) return 'Critical';
  if (diffDays <= 90) return 'Expiring Soon';
  return 'Valid';
};

const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

// @desc   Create a document with an uploaded file
exports.createDocument = async (req, res, next) => {
  try {
    const { name, category, issueDate, expiryDate, description } = req.body;

    if (!name) return res.status(400).json({ success: false, message: 'Document name is required' });
    if (!req.file) return res.status(400).json({ success: false, message: 'A document file is required' });
    const allowedCategories = ['Identity', 'Travel', 'Vehicle', 'Insurance', 'Health', 'Property', 'Finance', 'Other'];
    if (!category || !allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing category' });
    }
    if ((issueDate && !isValidDate(issueDate)) || (expiryDate && !isValidDate(expiryDate))) {
      return res.status(400).json({ success: false, message: 'Issue and expiry dates must be valid dates' });
    }

    const status = computeStatus(expiryDate);

    const doc = await Document.create({
      name,
      category,
      issueDate: issueDate ? new Date(issueDate) : undefined,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      description,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      status,
      userId: req.userId, // attach authenticated user
    });

    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

// @desc   Get all documents for the authenticated user
exports.getAllDocuments = async (req, res, next) => {
  try {
    const docs = await Document.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: docs });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single document by ID (must belong to user)
exports.getDocument = async (req, res, next) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, userId: req.userId });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

// @desc   Update document (must belong to user)
exports.updateDocument = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'category', 'issueDate', 'expiryDate', 'description'];
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => Object.prototype.hasOwnProperty.call(req.body, field))
        .map((field) => [field, req.body[field]])
    );

    if (updates.category) {
      const allowedCategories = ['Identity', 'Travel', 'Vehicle', 'Insurance', 'Health', 'Property', 'Finance', 'Other'];
      if (!allowedCategories.includes(updates.category)) {
        return res.status(400).json({ success: false, message: 'Invalid category' });
      }
    }
    if ((updates.issueDate && !isValidDate(updates.issueDate)) || (updates.expiryDate && !isValidDate(updates.expiryDate))) {
      return res.status(400).json({ success: false, message: 'Issue and expiry dates must be valid dates' });
    }
    if (Object.prototype.hasOwnProperty.call(updates, 'expiryDate')) {
      updates.expiryDate = updates.expiryDate || null;
      updates.status = computeStatus(updates.expiryDate);
    }
    const doc = await Document.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete document (must belong to user)
exports.deleteDocument = async (req, res, next) => {
  try {
    const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

    if (doc.fileUrl) {
      const filePath = path.join(__dirname, '../../uploads', path.basename(doc.fileUrl));
      await fs.unlink(filePath).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
    }
    res.status(200).json({ success: true, message: 'Document deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc   Get documents expiring within next 90 days for user
exports.getExpiringDocuments = async (req, res, next) => {
  try {
    const now = new Date();
    const limit = new Date();
    limit.setDate(now.getDate() + 90);

    // Get all docs for user, compute real-time status
    const allDocs = await Document.find({ userId: req.userId });

    const expiring = allDocs.map(doc => {
      const status = computeStatus(doc.expiryDate);
      const daysRemaining = doc.expiryDate
        ? Math.ceil((new Date(doc.expiryDate) - now) / (1000 * 60 * 60 * 24))
        : null;
      return { ...doc.toObject(), status, daysRemaining };
    }).filter(doc => ['Expired', 'Critical', 'Expiring Soon'].includes(doc.status))
      .sort((a, b) => {
        const da = a.daysRemaining ?? Infinity;
        const db = b.daysRemaining ?? Infinity;
        return da - db;
      });

    res.status(200).json({ success: true, data: expiring });
  } catch (error) {
    next(error);
  }
};

// @desc   Get statistics for the authenticated user
exports.getStats = async (req, res, next) => {
  try {
    const now = new Date();
    const allDocs = await Document.find({ userId: req.userId });

    let totalDocuments = allDocs.length;
    let expired = 0, critical = 0, expiringSoon = 0, valid = 0;
    const categories = {};

    allDocs.forEach(doc => {
      const status = computeStatus(doc.expiryDate);
      if (status === 'Expired') expired++;
      else if (status === 'Critical') critical++;
      else if (status === 'Expiring Soon') expiringSoon++;
      else valid++;

      categories[doc.category] = (categories[doc.category] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: { totalDocuments, expired, critical, expiringSoon, valid, categories },
    });
  } catch (error) {
    next(error);
  }
};
