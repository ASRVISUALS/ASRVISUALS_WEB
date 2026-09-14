import { Router } from 'express'
import { getContentBlock, getAllContentBlocks, upsertContentBlock } from '../controllers/contentController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.get('/:key', getContentBlock)
router.get('/', protect, authorize('admin'), getAllContentBlocks)
router.put('/:key', protect, authorize('admin'), upsertContentBlock)

export default router
