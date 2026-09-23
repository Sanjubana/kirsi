const Tool = require('../models/Tool');
const calculateDistance = require('../utils/distance');

// @desc    Get all tools
// @route   GET /api/tools
// @access  Public
exports.getTools = async (req, res, next) => {
  try {
    const { category, buyOrSell, owner } = req.query;
    const query = {};

    if (category) query.category = category;
    if (buyOrSell) query.buyOrSell = buyOrSell;
    if (owner) query.owner = owner;

    const tools = await Tool.find(query).populate('owner', 'name phone email profileImage');

    res.status(200).json({
      success: true,
      message: 'Tools retrieved successfully',
      data: tools
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tool detail
// @route   GET /api/tools/:id
// @access  Public
exports.getToolById = async (req, res, next) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('owner', 'name phone email profileImage');
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tool details fetched successfully',
      data: tool
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new tool listing
// @route   POST /api/tools
// @access  Private
exports.createTool = async (req, res, next) => {
  try {
    const { toolName, category, buyOrSell, price, description, latitude, longitude, address } = req.body;

    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    const lat = latitude !== undefined ? parseFloat(latitude) : (req.user.latitude || 18.5204);
    const lng = longitude !== undefined ? parseFloat(longitude) : (req.user.longitude || 73.8567);

    const tool = await Tool.create({
      toolName,
      category,
      buyOrSell,
      price,
      description,
      images,
      owner: req.user.id,
      latitude: lat,
      longitude: lng,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Tool listing created successfully',
      data: tool
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a tool listing
// @route   PUT /api/tools/:id
// @access  Private
exports.updateTool = async (req, res, next) => {
  try {
    let tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }

    // Verify ownership
    if (tool.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this listing'
      });
    }

    const { toolName, category, buyOrSell, price, description, latitude, longitude, address } = req.body;
    const updateData = { toolName, category, buyOrSell, price, description, address };

    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);

    if (req.files && req.files.length > 0) {
      const images = [];
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
      updateData.images = images;
    }

    tool = await Tool.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Tool updated successfully',
      data: tool
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a tool listing
// @route   DELETE /api/tools/:id
// @access  Private
exports.deleteTool = async (req, res, next) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }

    // Verify ownership
    if (tool.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await tool.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tool listing deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearest tools sorted by proximity
// @route   GET /api/tools/nearby
// @access  Public
exports.getNearbyTools = async (req, res, next) => {
  try {
    const userLat = parseFloat(req.query.latitude) || (req.user ? req.user.latitude : 18.5204);
    const userLng = parseFloat(req.query.longitude) || (req.user ? req.user.longitude : 73.8567);
    const maxDist = parseInt(req.query.maxDistance, 10) || 50000;
    const { buyOrSell } = req.query;

    const filter = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [userLng, userLat] },
          $maxDistance: maxDist
        }
      }
    };

    if (buyOrSell) {
      filter.buyOrSell = buyOrSell;
    }

    const tools = await Tool.find(filter).populate('owner', 'name phone email profileImage');

    const toolsWithDistance = tools.map(tool => {
      const distance = calculateDistance(userLat, userLng, tool.latitude, tool.longitude);
      return {
        ...tool.toObject(),
        distanceValue: distance,
        distanceText: `${distance.toFixed(1)} km away`
      };
    });

    res.status(200).json({
      success: true,
      message: 'Nearby tools fetched successfully',
      data: toolsWithDistance
    });
  } catch (error) {
    next(error);
  }
};
