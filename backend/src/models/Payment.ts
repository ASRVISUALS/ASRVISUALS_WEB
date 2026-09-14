import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	bookingId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Booking'
	},
	planType: {
		type: String,
		enum: ['starter', 'pro', 'custom']
	},
	amount: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		default: 'INR'
	},
	gateway: {
		type: String,
		default: 'razorpay'
	},
	status: {
		type: String,
		enum: ['pending', 'paid', 'failed', 'refunded'],
		default: 'pending'
	},
	paymentId: {
		type: String,
		default: ''
	},
	metadata: {
		type: mongoose.Schema.Types.Mixed,
		default: {}
	}
}, {
	timestamps: true
})

export default mongoose.model('Payment', paymentSchema)
