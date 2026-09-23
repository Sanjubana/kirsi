const jwt = require('jsonwebtoken');

// Get JWT token from model, create cookie and send response
const sendToken = (user, statusCode, res, message) => {
  // Create token payload
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || 'kirsi_secret_jwt_token_development_only_key_12345',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  // Cookie settings
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE || '30', 10);
  const options = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  };

  // Response properties
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      latitude: user.latitude,
      longitude: user.longitude,
      address: user.address,
      state: user.state,
      district: user.district,
      village: user.village,
      pincode: user.pincode
    }
  });
};

module.exports = sendToken;
