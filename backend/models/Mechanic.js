const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  shopName: {
    type: String,
    required: [true, 'Shop name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please fill a valid 10-digit Indian phone number']
  },
  services: {
    type: [String],
    default: ['General Tractor Service']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
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
  rating: {
    type: Number,
    default: 4.0,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  availability: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index location as 2dsphere
mechanicSchema.index({ location: '2dsphere' });

// Pre-save to sync coordinates
mechanicSchema.pre('save', function(next) {
  if (this.isModified('latitude') || this.isModified('longitude') || !this.location || !this.location.coordinates.length) {
    const lat = this.latitude !== undefined ? this.latitude : 18.5204;
    const lng = this.longitude !== undefined ? this.longitude : 73.8567;
    this.location = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
    this.latitude = lat;
    this.longitude = lng;
  }
  next();
});

module.exports = mongoose.model('Mechanic', mechanicSchema);
