const Mechanic = require('../models/Mechanic');
const calculateDistance = require('../utils/distance');

// @desc    Get all mechanics
// @route   GET /api/mechanics
// @access  Public
exports.getMechanics = async (req, res, next) => {
  try {
    const { availability } = req.query;
    const query = {};

    if (availability !== undefined) {
      query.availability = availability === 'true';
    }

    const mechanics = await Mechanic.find(query);

    res.status(200).json({
      success: true,
      message: 'Mechanics retrieved successfully',
      data: mechanics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single mechanic detail
// @route   GET /api/mechanics/:id
// @access  Public
exports.getMechanicById = async (req, res, next) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({
        success: false,
        message: 'Mechanic not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mechanic details fetched successfully',
      data: mechanic
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create mechanic profile
// @route   POST /api/mechanics
// @access  Private
exports.createMechanic = async (req, res, next) => {
  try {
    const { name, shopName, phone, services, address, latitude, longitude, rating, availability } = req.body;

    const lat = latitude !== undefined ? parseFloat(latitude) : (req.user.latitude || 18.5204);
    const lng = longitude !== undefined ? parseFloat(longitude) : (req.user.longitude || 73.8567);

    const parsedServices = Array.isArray(services) 
      ? services 
      : typeof services === 'string' 
        ? services.split(',').map(s => s.trim()) 
        : ['General Repair'];

    const mechanic = await Mechanic.create({
      name,
      shopName,
      phone,
      services: parsedServices,
      address,
      latitude: lat,
      longitude: lng,
      rating,
      availability
    });

    res.status(201).json({
      success: true,
      message: 'Mechanic service listed successfully',
      data: mechanic
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update mechanic profile
// @route   PUT /api/mechanics/:id
// @access  Private
exports.updateMechanic = async (req, res, next) => {
  try {
    let mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({
        success: false,
        message: 'Mechanic not found'
      });
    }

    // Restriction guard: only admin or the user themselves (if we want to bind mechanic profile to a user. Let's allow edit).
    const { name, shopName, phone, services, address, latitude, longitude, rating, availability } = req.body;
    const updateData = { name, shopName, phone, address, rating, availability };

    if (services) {
      updateData.services = Array.isArray(services) 
        ? services 
        : typeof services === 'string' 
          ? services.split(',').map(s => s.trim()) 
          : services;
    }

    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);

    mechanic = await Mechanic.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Mechanic profile updated successfully',
      data: mechanic
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete mechanic profile
// @route   DELETE /api/mechanics/:id
// @access  Private
exports.deleteMechanic = async (req, res, next) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({
        success: false,
        message: 'Mechanic not found'
      });
    }

    await mechanic.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Mechanic profile deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearest mechanics sorted by proximity
// @route   GET /api/mechanics/nearby
// @access  Public
exports.getNearbyMechanics = async (req, res, next) => {
  try {
    const userLat = parseFloat(req.query.latitude) || (req.user ? req.user.latitude : 18.5204);
    const userLng = parseFloat(req.query.longitude) || (req.user ? req.user.longitude : 73.8567);
    const maxDist = parseInt(req.query.maxDistance, 10) || 50000;

    const mechanics = await Mechanic.find({
      availability: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [userLng, userLat] },
          $maxDistance: maxDist
        }
      }
    });

    const mechanicsWithDistance = mechanics.map(mech => {
      const distance = calculateDistance(userLat, userLng, mech.latitude, mech.longitude);
      return {
        ...mech.toObject(),
        distanceValue: distance,
        distanceText: `${distance.toFixed(1)} km away`
      };
    });

    res.status(200).json({
      success: true,
      message: 'Nearby mechanics fetched successfully',
      data: mechanicsWithDistance
    });
  } catch (error) {
    next(error);
  }
};
