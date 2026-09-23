const express = require('express');
const router = express.Router();
const {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  getNearbyCrops
} = require('../controllers/cropController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { cropValidation, validateResults } = require('../middleware/validation');

// Public routes
router.get('/', getCrops);
router.get('/nearby', getNearbyCrops);
router.get('/:id', getCropById);

// Protected routes (Only logged in users can create/edit crops)
router.post('/', protect, upload.array('images', 4), cropValidation, validateResults, createCrop);
router.put('/:id', protect, upload.array('images', 4), updateCrop);
router.delete('/:id', protect, deleteCrop);

module.exports = router;
