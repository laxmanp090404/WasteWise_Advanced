const mongoose = require('mongoose');

const ReportingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['bio', 'non-bio'],
    required: true,
  },
  
},{
    timestamps: true,
});

module.exports = mongoose.model('Reporting', ReportingSchema);
