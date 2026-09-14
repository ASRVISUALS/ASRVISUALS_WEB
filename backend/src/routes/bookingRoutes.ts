import { Router } from 'express'
import { createBooking, getBookings, updateBooking } from '../controllers/bookingController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.post('/', protect, createBooking)
router.get('/', protect, getBookings)
router.put('/:id', protect, authorize('admin'), updateBooking)

export default router
