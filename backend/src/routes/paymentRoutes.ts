import { Router } from 'express'
import { getPayments, updatePayment } from '../controllers/paymentController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.get('/', protect, authorize('admin'), getPayments)
router.put('/:id', protect, authorize('admin'), updatePayment)

export default router
