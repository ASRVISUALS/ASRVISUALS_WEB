const express = require('express');
const blogController = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', protect, authorize('owner', 'admin'), blogController.createBlog);
router.patch('/:id', protect, authorize('owner', 'admin'), blogController.updateBlog);
router.delete('/:id', protect, authorize('owner', 'admin'), blogController.deleteBlog);

module.exports = router;
