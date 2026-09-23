const { validationResult, check } = require('express-validator');

// Runs express validation check triggers
exports.validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  next();
};

// Signup Validation Rules
exports.signupValidation = [
  check('name', 'Name is required and must be at least 3 characters')
    .notEmpty()
    .isLength({ min: 3 }),
  check('email', 'Please include a valid email address')
    .isEmail(),
  check('phone', 'Please include a valid 10-digit Indian phone number starting with 6-9')
    .matches(/^[6-9]\d{9}$/),
  check('password', 'Password must contain at least 6 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character')
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),
  check('role', 'Valid user role is required')
    .optional()
    .isIn(['Farmer', 'Buyer', 'Seller', 'Mechanic', 'Veterinarian', 'Admin'])
];

// Login Validation Rules
exports.loginValidation = [
  check('loginIdentifier', 'Email address or 10-digit phone number is required')
    .notEmpty(),
  check('password', 'Password is required')
    .notEmpty()
];

// Crop Listing Validation Rules
exports.cropValidation = [
  check('cropName', 'Crop name is required').notEmpty(),
  check('category', 'Category is required').notEmpty(),
  check('quantity', 'Quantity is required').notEmpty(),
  check('unit', 'Unit is required').notEmpty(),
  check('price', 'Price info is required').notEmpty(),
  check('address', 'Address is required').notEmpty()
];

// Tool Listing Validation Rules
exports.toolValidation = [
  check('toolName', 'Tool name is required').notEmpty(),
  check('category', 'Category is required').notEmpty(),
  check('buyOrSell', 'Transaction mode (buy, sell, or rent) is required').isIn(['buy', 'sell', 'rent']),
  check('price', 'Price details is required').notEmpty(),
  check('address', 'Address is required').notEmpty()
];

// Animal Listing Validation Rules
exports.animalValidation = [
  check('animalType', 'Animal type is required').notEmpty(),
  check('breed', 'Breed is required').notEmpty(),
  check('age', 'Age is required').notEmpty(),
  check('price', 'Price is required').notEmpty(),
  check('address', 'Address is required').notEmpty()
];

// Mechanic Listing Validation Rules
exports.mechanicValidation = [
  check('name', 'Name is required').notEmpty(),
  check('shopName', 'Shop name is required').notEmpty(),
  check('phone', 'Please include a valid 10-digit Indian phone number').matches(/^[6-9]\d{9}$/),
  check('address', 'Address is required').notEmpty()
];
