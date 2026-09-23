const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: [true, 'Tool name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  buyOrSell: {
    type: String,
    enum: ['buy', 'sell', 'rent'],
    required: [true, 'Transaction mode (buy, sell, or rent) is required']
  },
  price: {
    type: String,
    required: [true, 'Price is required']
  },
  description: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Index location as 2dsphere
toolSchema.index({ location: '2dsphere' });

// Pre-save to sync coordinates
toolSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Tool', toolSchema);
