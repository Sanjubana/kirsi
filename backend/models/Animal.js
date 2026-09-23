const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  animalType: {
    type: String,
    required: [true, 'Animal type is required'],
    trim: true
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    trim: true
  },
  age: {
    type: String,
    required: [true, 'Age is required'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Price details are required']
  },
  description: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  }
}, {
  timestamps: true
});

// Index location as 2dsphere
animalSchema.index({ location: '2dsphere' });

// Pre-save to sync coordinates
animalSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Animal', animalSchema);
