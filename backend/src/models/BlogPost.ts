import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	excerpt: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	tags: [{
		type: String
	}],
	coverImage: {
		type: String,
		default: ''
	},
	seoDescription: {
		type: String,
		default: ''
	},
	published: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
})

export default mongoose.model('BlogPost', blogPostSchema)
