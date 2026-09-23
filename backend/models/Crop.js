const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  quantity: {
    type: String,
    required: [true, 'Quantity is required']
  },
  unit: {
    type: String,
    required: [true, 'Unit (e.g. kg, quintal, ton) is required'],
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
  sellerId: {
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
  },
  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available'
  }
}, {
  timestamps: true
});

// Index location as 2dsphere for geospatial sorting
cropSchema.index({ location: '2dsphere' });

// Pre-save to sync coordinates
cropSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Crop', cropSchema);
