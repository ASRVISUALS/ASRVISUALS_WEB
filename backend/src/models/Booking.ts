import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planType: {
    type: String,
    enum: ['starter', 'pro', 'custom'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  videosIncluded: {
    type: Number,
    required: true
  },
  videosDelivered: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  requirements: {
    type: String
  },
  revisions: {
    total: Number,
    used: {
      type: Number,
      default: 0
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  files: [{
    name: String,
    url: String,
    uploadedAt: Date
  }]
}, {
  timestamps: true
})

export default mongoose.model('Booking', bookingSchema)