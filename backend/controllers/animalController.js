const Animal = require('../models/Animal');
const calculateDistance = require('../utils/distance');

// @desc    Get all animal listings
// @route   GET /api/animals
// @access  Public
exports.getAnimals = async (req, res, next) => {
  try {
    const { animalType, seller } = req.query;
    const query = {};

    if (animalType) query.animalType = animalType;
    if (seller) query.seller = seller;

    const animals = await Animal.find(query).populate('seller', 'name phone email profileImage');

    res.status(200).json({
      success: true,
      message: 'Animals retrieved successfully',
      data: animals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single animal detail
// @route   GET /api/animals/:id
// @access  Public
exports.getAnimalById = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('seller', 'name phone email profileImage');
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal listing not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Animal details fetched successfully',
      data: animal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create animal listing
// @route   POST /api/animals
// @access  Private
exports.createAnimal = async (req, res, next) => {
  try {
    const { animalType, breed, age, price, description, latitude, longitude, address } = req.body;

    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    const lat = latitude !== undefined ? parseFloat(latitude) : (req.user.latitude || 18.5204);
    const lng = longitude !== undefined ? parseFloat(longitude) : (req.user.longitude || 73.8567);

    const animal = await Animal.create({
      animalType,
      breed,
      age,
      price,
      description,
      images,
      seller: req.user.id,
      latitude: lat,
      longitude: lng,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Animal listed successfully',
      data: animal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update animal listing
// @route   PUT /api/animals/:id
// @access  Private
exports.updateAnimal = async (req, res, next) => {
  try {
    let animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal listing not found'
      });
    }

    // Verify ownership
    if (animal.seller.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this listing'
      });
    }

    const { animalType, breed, age, price, description, latitude, longitude, address } = req.body;
    const updateData = { animalType, breed, age, price, description, address };

    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);

    if (req.files && req.files.length > 0) {
      const images = [];
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
      updateData.images = images;
    }

    animal = await Animal.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Animal updated successfully',
      data: animal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete animal listing
// @route   DELETE /api/animals/:id
// @access  Private
exports.deleteAnimal = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal listing not found'
      });
    }

    // Verify ownership
    if (animal.seller.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await animal.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Animal listing deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearest animals sorted by proximity
// @route   GET /api/animals/nearby
// @access  Public
exports.getNearbyAnimals = async (req, res, next) => {
  try {
    const userLat = parseFloat(req.query.latitude) || (req.user ? req.user.latitude : 18.5204);
    const userLng = parseFloat(req.query.longitude) || (req.user ? req.user.longitude : 73.8567);
    const maxDist = parseInt(req.query.maxDistance, 10) || 50000;
    const { animalType } = req.query;

    const filter = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [userLng, userLat] },
          $maxDistance: maxDist
        }
      }
    };

    if (animalType) {
      filter.animalType = animalType;
    }

    const animals = await Animal.find(filter).populate('seller', 'name phone email profileImage');

    const animalsWithDistance = animals.map(animal => {
      const distance = calculateDistance(userLat, userLng, animal.latitude, animal.longitude);
      return {
        ...animal.toObject(),
        distanceValue: distance,
        distanceText: `${distance.toFixed(1)} km away`
      };
    });

    res.status(200).json({
      success: true,
      message: 'Nearby animals fetched successfully',
      data: animalsWithDistance
    });
  } catch (error) {
    next(error);
  }
};
