const express = require('express');
const router = express.Router();
const {
  createDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  getExpiringDocuments,
  getStats,
} = require('../controllers/documentController');

// Create a document
router.post('/', createDocument);

// Get all documents
router.get('/', getAllDocuments);

// Get expiring documents
router.get('/expiring', getExpiringDocuments);

// Get statistics
router.get('/stats', getStats);

// Get a single document by ID
router.get('/:id', getDocument);

// Update a document
router.put('/:id', updateDocument);

// Delete a document
router.delete('/:id', deleteDocument);

module.exports = router;
