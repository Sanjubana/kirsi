const express = require('express');
const router = express.Router();
const {
  getTools,
  getToolById,
  createTool,
  updateTool,
  deleteTool,
  getNearbyTools
} = require('../controllers/toolController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { toolValidation, validateResults } = require('../middleware/validation');

// Public routes
router.get('/', getTools);
router.get('/nearby', getNearbyTools);
router.get('/:id', getToolById);

// Protected routes
router.post('/', protect, upload.array('images', 4), toolValidation, validateResults, createTool);
router.put('/:id', protect, upload.array('images', 4), updateTool);
router.delete('/:id', protect, deleteTool);

module.exports = router;
