const express = require('express');
const router = express.Router();
const {
  getMechanics,
  getMechanicById,
  createMechanic,
  updateMechanic,
  deleteMechanic,
  getNearbyMechanics
} = require('../controllers/mechanicController');
const { protect } = require('../middleware/auth');
const { mechanicValidation, validateResults } = require('../middleware/validation');

// Public routes
router.get('/', getMechanics);
router.get('/nearby', getNearbyMechanics);
router.get('/:id', getMechanicById);

// Protected routes (Only authorized roles can manage mechanic listings)
router.post('/', protect, mechanicValidation, validateResults, createMechanic);
router.put('/:id', protect, updateMechanic);
router.delete('/:id', protect, deleteMechanic);

module.exports = router;
