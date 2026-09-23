const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateMe,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { signupValidation, loginValidation, validateResults } = require('../middleware/validation');

router.post('/register', upload.single('profileImage'), signupValidation, validateResults, registerUser);
router.post('/login', loginValidation, validateResults, loginUser);
router.get('/logout', logoutUser);
router.get('/me', protect, getMe);
router.put('/me', protect, upload.single('profileImage'), updateMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
