import { Router } from 'express'
import { getUsers } from '../controllers/userController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.get('/', protect, authorize('admin'), getUsers)

export default router
