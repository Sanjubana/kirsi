const Crop = require('../models/Crop');
const calculateDistance = require('../utils/distance');

// @desc    Get all crops with filtering
// @route   GET /api/crops
// @access  Public
exports.getCrops = async (req, res, next) => {
  try {
    const { category, sellerId, status } = req.query;
    const query = {};

    if (category) query.category = category;
    if (sellerId) query.sellerId = sellerId;
    if (status) query.status = status;

    const crops = await Crop.find(query).populate('sellerId', 'name phone email profileImage');

    res.status(200).json({
      success: true,
      message: 'Crops retrieved successfully',
      data: crops
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single crop details
// @route   GET /api/crops/:id
// @access  Public
exports.getCropById = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id).populate('sellerId', 'name phone email profileImage');
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Crop details fetched successfully',
      data: crop
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new crop listing
// @route   POST /api/crops
// @access  Private
exports.createCrop = async (req, res, next) => {
  try {
    const { cropName, category, quantity, unit, price, description, latitude, longitude, address } = req.body;

    // Parse uploaded image paths
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    // Default coordinates if not provided ( Pune standard )
    const lat = latitude !== undefined ? parseFloat(latitude) : (req.user.latitude || 18.5204);
    const lng = longitude !== undefined ? parseFloat(longitude) : (req.user.longitude || 73.8567);

    const crop = await Crop.create({
      cropName,
      category,
      quantity,
      unit,
      price,
      description,
      images,
      sellerId: req.user.id,
      latitude: lat,
      longitude: lng,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Crop listing created successfully',
      data: crop
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a crop listing
// @route   PUT /api/crops/:id
// @access  Private
exports.updateCrop = async (req, res, next) => {
  try {
    let crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Verify ownership or admin role
    if (crop.sellerId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this listing'
      });
    }

    const { cropName, category, quantity, unit, price, description, status, latitude, longitude, address } = req.body;
    const updateData = { cropName, category, quantity, unit, price, description, status, address };

    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);

    // Merge new images
    if (req.files && req.files.length > 0) {
      const images = [];
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
      updateData.images = images;
    }

    // Run updates
    crop = await Crop.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Crop updated successfully',
      data: crop
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a crop listing
// @route   DELETE /api/crops/:id
// @access  Private
exports.deleteCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Verify ownership
    if (crop.sellerId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await crop.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Crop listing deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearest crops sorted by proximity
// @route   GET /api/crops/nearby
// @access  Public
exports.getNearbyCrops = async (req, res, next) => {
  try {
    const userLat = parseFloat(req.query.latitude) || (req.user ? req.user.latitude : 18.5204);
    const userLng = parseFloat(req.query.longitude) || (req.user ? req.user.longitude : 73.8567);
    const maxDist = parseInt(req.query.maxDistance, 10) || 50000; // default 50km

    // Queries GeoJSON 2dsphere index sorting nearest-first
    const crops = await Crop.find({
      status: 'Available',
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [userLng, userLat] },
          $maxDistance: maxDist
        }
      }
    }).populate('sellerId', 'name phone email profileImage');

    // Attach calculated distance parameters to payload
    const cropsWithDistance = crops.map(crop => {
      const distance = calculateDistance(userLat, userLng, crop.latitude, crop.longitude);
      return {
        ...crop.toObject(),
        distanceValue: distance,
        distanceText: `${distance.toFixed(1)} km away`
      };
    });

    res.status(200).json({
      success: true,
      message: 'Nearby crops fetched successfully',
      data: cropsWithDistance
    });
  } catch (error) {
    next(error);
  }
};
