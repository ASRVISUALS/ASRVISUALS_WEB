import { Request, Response } from 'express'
import BlogPost from '../models/BlogPost'
import { generateBlogCoverImage } from '../utils/imageGenerator'

export const getBlogPosts = async (_req: Request, res: Response) => {
	try {
		const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 })
		res.status(200).json({ success: true, data: posts })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error fetching blog posts' })
	}
}

export const getBlogPostBySlug = async (req: Request, res: Response) => {
	try {
		const post = await BlogPost.findOne({ slug: req.params.slug, published: true })
		if (!post) {
			return res.status(404).json({ success: false, message: 'Blog post not found' })
		}
		res.status(200).json({ success: true, data: post })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error fetching blog post' })
	}
}

export const getAllBlogPosts = async (_req: Request, res: Response) => {
	try {
		const posts = await BlogPost.find({}).sort({ createdAt: -1 })
		res.status(200).json({ success: true, data: posts })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error fetching blog posts' })
	}
}

export const createBlogPost = async (req: Request, res: Response) => {
	try {
		const post = await BlogPost.create(req.body)
		res.status(201).json({ success: true, data: post })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error creating blog post' })
	}
}

export const updateBlogPost = async (req: Request, res: Response) => {
	try {
		const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!post) {
			return res.status(404).json({ success: false, message: 'Blog post not found' })
		}
		res.status(200).json({ success: true, data: post })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error updating blog post' })
	}
}

export const deleteBlogPost = async (req: Request, res: Response) => {
	try {
		const post = await BlogPost.findByIdAndDelete(req.params.id)
		if (!post) {
			return res.status(404).json({ success: false, message: 'Blog post not found' })
		}
		res.status(200).json({ success: true, message: 'Blog post deleted' })
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error deleting blog post' })
	}
}

export const generateBlogCoverImageController = async (req: Request, res: Response) => {
	try {
		const { title, slug, category } = req.body

		// Validate required fields
		if (!title || !slug || !category) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields: title, slug, category'
			})
		}

		// Generate image using Gemini AI
		const result = await generateBlogCoverImage({
			title,
			slug,
			category
		})

		res.status(200).json({
			success: true,
			data: {
				imageUrl: result.imageUrl,
				generatedAt: result.generatedAt
			}
		})
	} catch (error) {
		console.error('Error in generateBlogCoverImageController:', error)
		res.status(500).json({
			success: false,
			message: 'Error generating blog cover image'
		})
	}
}
