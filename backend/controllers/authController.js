const crypto = require('crypto');
const User = require('../models/User');
const sendToken = require('../utils/sendToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      address,
      state,
      district,
      village,
      pincode,
      latitude,
      longitude
    } = req.body;

    // Check if user already exists
    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).json({
        success: false,
        message: 'Registration failed',
        errors: [{ field: 'email', message: 'Email address is already registered' }]
      });
    }

    const duplicatePhone = await User.findOne({ phone });
    if (duplicatePhone) {
      return res.status(400).json({
        success: false,
        message: 'Registration failed',
        errors: [{ field: 'phone', message: 'Phone number is already registered' }]
      });
    }

    // Set profile image if uploaded
    let profileImage = 'default-profile.png';
    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
      address,
      state,
      district,
      village,
      pincode,
      latitude,
      longitude,
      profileImage
    });

    sendToken(user, 201, res, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    const { loginIdentifier, password } = req.body;

    // Validate loginIdentifier
    if (!loginIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Login credentials missing',
        errors: [{ field: 'loginIdentifier', message: 'Please provide email or phone and password' }]
      });
    }

    // Check if login identifier is email or phone
    const isEmail = loginIdentifier.includes('@');
    const query = isEmail ? { email: loginIdentifier.toLowerCase() } : { phone: loginIdentifier };

    const user = await User.findOne(query).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        errors: [{ field: 'loginIdentifier', message: 'User not found' }]
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        errors: [{ field: 'password', message: 'Incorrect password' }]
      });
    }

    sendToken(user, 200, res, 'User logged in successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logoutUser = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
    data: {}
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
exports.updateMe = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      state: req.body.state,
      district: req.body.district,
      village: req.body.village,
      pincode: req.body.pincode,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    };

    // Remove undefined properties
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    if (req.file) {
      fieldsToUpdate.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password (basic mock)
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { loginIdentifier } = req.body;
    if (!loginIdentifier) {
      return res.status(400).json({
        success: false,
        message: 'Identifier missing',
        errors: [{ field: 'loginIdentifier', message: 'Email or Phone is required' }]
      });
    }

    const isEmail = loginIdentifier.includes('@');
    const query = isEmail ? { email: loginIdentifier.toLowerCase() } : { phone: loginIdentifier };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        errors: [{ field: 'loginIdentifier', message: 'No registered user matches the identifier' }]
      });
    }

    // Generate basic reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Save to user (would hash in production)
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    
    // Set bypass middleware triggers (temporarily bypass validation check on save)
    await user.save({ validateBeforeSave: false });

    // Since mailer configuration is not mandatory, return token in response for local validation
    res.status(200).json({
      success: true,
      message: 'Password reset token generated (local testing mock)',
      data: {
        resetToken,
        resetUrl: `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:resetToken
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token',
        errors: [{ field: 'token', message: 'Reset token is invalid or has expired' }]
      });
    }

    // Set new password
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password validation failed',
        errors: [{ field: 'password', message: 'Password must be at least 6 characters' }]
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res, 'Password reset completed successfully');
  } catch (error) {
    next(error);
  }
};
