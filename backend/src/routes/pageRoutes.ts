import { Router } from 'express'
import {
  getPages,
  getPage,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  duplicatePage,
  bulkDeletePages
} from '../controllers/pageController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

// Public routes
router.get('/slug/:slug', getPageBySlug)

// Protected admin routes
router.use(protect)
router.use(authorize('admin'))

router.route('/')
  .get(getPages)
  .post(createPage)

router.post('/bulk-delete', bulkDeletePages)
router.post('/:id/duplicate', duplicatePage)

router.route('/:id')
  .get(getPage)
  .put(updatePage)
  .delete(deletePage)

export default router
