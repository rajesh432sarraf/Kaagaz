const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
  createDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  getExpiringDocuments,
  getStats,
} = require('../controllers/documentController');

// All document routes are protected
router.use(protect);

// Create a document (with optional file upload)
router.post('/', upload.single('file'), createDocument);

// Get all documents for user
router.get('/', getAllDocuments);

// Get expiring documents for user
router.get('/expiring', getExpiringDocuments);

// Get statistics for user
router.get('/stats', getStats);

// Get a single document by ID
router.get('/:id', getDocument);

// Update a document
router.put('/:id', updateDocument);

// Delete a document
router.delete('/:id', deleteDocument);

module.exports = router;
