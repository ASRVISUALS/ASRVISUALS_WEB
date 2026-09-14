import { Router } from 'express'
import { createContact, getContacts, updateContact } from '../controllers/contactController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.post('/', createContact)
router.get('/', protect, authorize('admin'), getContacts)
router.put('/:id', protect, authorize('admin'), updateContact)

export default router
