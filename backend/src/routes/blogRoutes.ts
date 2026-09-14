import { Router } from 'express'
import {
	getBlogPosts,
	getBlogPostBySlug,
	getAllBlogPosts,
	createBlogPost,
	updateBlogPost,
	deleteBlogPost,
	generateBlogCoverImageController
} from '../controllers/blogController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.get('/', getBlogPosts)
router.get('/slug/:slug', getBlogPostBySlug)

router.get('/admin', protect, authorize('admin'), getAllBlogPosts)
router.post('/', protect, authorize('admin'), createBlogPost)
router.put('/:id', protect, authorize('admin'), updateBlogPost)
router.delete('/:id', protect, authorize('admin'), deleteBlogPost)

// Image generation endpoint
router.post('/generate-image', protect, authorize('admin'), generateBlogCoverImageController)

export default router
