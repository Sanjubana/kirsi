const express = require('express');
const router = express.Router();
const {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getNearbyAnimals
} = require('../controllers/animalController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { animalValidation, validateResults } = require('../middleware/validation');

// Public routes
router.get('/', getAnimals);
router.get('/nearby', getNearbyAnimals);
router.get('/:id', getAnimalById);

// Protected routes
router.post('/', protect, upload.array('images', 4), animalValidation, validateResults, createAnimal);
router.put('/:id', protect, upload.array('images', 4), updateAnimal);
router.delete('/:id', protect, deleteAnimal);

module.exports = router;
