const express = require('express');
const router = express.Router();
const { register, login, getMe, uploadAvatar, deleteAvatar } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me  (protected)
router.get('/me', protect, getMe);

// PUT /api/auth/avatar (protected)
router.put('/avatar', protect, upload.single('avatar'), uploadAvatar);

// DELETE /api/auth/avatar (protected)
router.delete('/avatar', protect, deleteAvatar);

module.exports = router;
