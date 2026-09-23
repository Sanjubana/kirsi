// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error console for development debugging
  console.error('🔴 Express App Error Triggered:', err);

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: `Resource not found with id of ${err.value}`,
      errors: [{ field: 'id', message: 'Invalid database identifier format' }]
    });
  }

  // Mongoose Duplicate Key Error (e.g. unique email / phone)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const val = Object.values(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `Duplicate value entered for ${field}: ${val}`,
      errors: [{ field, message: `This ${field} is already registered` }]
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const formattedErrors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message
    }));
    return res.status(400).json({
      success: false,
      message: 'Database Validation Failed',
      errors: formattedErrors
    });
  }

  // General server fallback error
  res.status(err.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    errors: [{ field: 'server', message: 'Unhandled server execution anomaly' }]
  });
};

module.exports = errorHandler;
