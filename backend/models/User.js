const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please fill a valid 10-digit Indian phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['Farmer', 'Buyer', 'Seller', 'Mechanic', 'Veterinarian', 'Admin'],
    default: 'Farmer'
  },
  address: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  village: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  profileImage: {
    type: String,
    default: 'default-profile.png'
  }
}, {
  timestamps: true
});

// Create 2dsphere index for geolocation queries
userSchema.index({ location: '2dsphere' });

// Pre-save middleware to hash password and sync coordinates
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Populate GeoJSON location field from lat/lng
  if (this.isModified('latitude') || this.isModified('longitude') || !this.location || !this.location.coordinates.length) {
    const lat = this.latitude !== undefined ? this.latitude : 18.5204; // default Pune lat
    const lng = this.longitude !== undefined ? this.longitude : 73.8567; // default Pune lng
    this.location = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
    // Sync back properties
    this.latitude = lat;
    this.longitude = lng;
  }
  
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
